import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Map Google Place types to our business categories
function mapBusinessType(types: string[]): string {
  const typeMap: Record<string, string> = {
    hair_care: "hair_salon",
    beauty_salon: "hair_salon",
    barber: "barber_shop",
    restaurant: "restaurant",
    cafe: "cafe",
    bakery: "cafe",
    car_repair: "auto_repair",
    car_wash: "auto_repair",
    gym: "gym",
    dentist: "dental_office",
    real_estate_agency: "real_estate",
    laundry: "cleaning_service",
    moving_company: "cleaning_service",
  }
  for (const t of types) {
    if (typeMap[t]) return typeMap[t]
  }
  return "general_service"
}

// Extract Place ID from various Google Maps URL formats
function extractPlaceId(url: string): string | null {
  // Format: /place/.../.../data=...!1s<placeId>
  const dataMatch = url.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/)
  if (dataMatch) return dataMatch[1]

  // Format: ?cid=<number>
  const cidMatch = url.match(/cid=(\d+)/)
  if (cidMatch) return null // CID is NOT a Place ID, skip it

  // Format: place_id=<id>
  const pidMatch = url.match(/place_id=([A-Za-z0-9_-]+)/)
  if (pidMatch) return pidMatch[1]

  return null
}

// Extract search query from Google Maps URL
function extractSearchQuery(url: string): string | null {
  // Format: /maps/place/Business+Name/
  const placeMatch = url.match(/\/place\/([^/@]+)/)
  if (placeMatch) return decodeURIComponent(placeMatch[1].replace(/\+/g, " "))

  // Format: /maps?q=Business+Name
  const qMatch = url.match(/[?&]q=([^&]+)/)
  if (qMatch) return decodeURIComponent(qMatch[1].replace(/\+/g, " "))

  return null
}

// Step 1: Find Place ID via Text Search
async function findPlace(query: string, apiKey: string): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${apiKey}`

  console.log(`[search-business] Finding place: "${query}"`)
  const response = await fetch(url)
  const data = await response.json()

  if (data.candidates && data.candidates.length > 0) {
    console.log(`[search-business] Found place_id: ${data.candidates[0].place_id}`)
    return data.candidates[0].place_id
  }

  console.log(`[search-business] No candidates found for: "${query}"`)
  return null
}

// Step 2: Get full Place Details
async function getPlaceDetails(placeId: string, apiKey: string) {
  const fields = [
    "name",
    "formatted_address",
    "formatted_phone_number",
    "website",
    "rating",
    "user_ratings_total",
    "reviews",
    "photos",
    "opening_hours",
    "types",
    "url",
    "business_status",
  ].join(",")

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`

  console.log(`[search-business] Fetching details for place_id: ${placeId}`)
  const response = await fetch(url)
  const data = await response.json()

  if (data.status !== "OK" || !data.result) {
    console.error(`[search-business] Details API error: ${data.status}`)
    throw new Error(`Place details failed: ${data.status}`)
  }

  return data.result
}

// Step 3: Build photo URLs (proxied through our photo-proxy function)
function buildPhotoUrls(photos: any[], supabaseUrl: string): string[] {
  if (!photos || photos.length === 0) return []

  return photos.slice(0, 5).map((photo: any) => {
    // Proxy through our Edge Function so API key stays server-side
    return `${supabaseUrl}/functions/v1/photo-proxy?ref=${photo.photo_reference}&maxwidth=1200`
  })
}

// Step 4: Parse opening hours into clean format
function parseHours(openingHours: any): Record<string, string> {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const hours: Record<string, string> = {}

  if (openingHours?.weekday_text) {
    for (const entry of openingHours.weekday_text) {
      // Format: "Monday: 9:00 AM – 9:00 PM"
      const colonIndex = entry.indexOf(":")
      if (colonIndex > 0) {
        const day = entry.substring(0, colonIndex).trim()
        const time = entry.substring(colonIndex + 1).trim()
        hours[day] = time
      }
    }
  } else {
    // Fallback if no hours data
    for (const day of days) {
      hours[day] = day === "Sunday" ? "10:00 AM – 6:00 PM" : "9:00 AM – 7:00 PM"
    }
  }

  return hours
}

// Parse address into components
function parseAddress(formatted: string): { city: string; state: string; full: string } {
  const parts = formatted.split(",").map((s: string) => s.trim())
  return {
    city: parts.length >= 3 ? parts[parts.length - 3] : parts[0] || "",
    state: parts.length >= 2 ? parts[parts.length - 2].split(" ")[0] || "" : "",
    full: formatted,
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { businessName, googleUrl } = await req.json()

    if (!businessName) {
      return new Response(
        JSON.stringify({ error: "businessName is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY")
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || ""

    if (!apiKey) {
      console.error("[search-business] GOOGLE_PLACES_API_KEY not set")
      return new Response(
        JSON.stringify({ error: "Google API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // --- STEP 1: Find the Place ID ---
    let placeId: string | null = null

    // Try extracting from URL first
    if (googleUrl) {
      placeId = extractPlaceId(googleUrl)
      console.log(`[search-business] Extracted place_id from URL: ${placeId}`)

      // If URL didn't give us a Place ID, extract search query from URL
      if (!placeId) {
        const searchQuery = extractSearchQuery(googleUrl)
        if (searchQuery) {
          placeId = await findPlace(searchQuery, apiKey)
        }
      }
    }

    // Fallback: search by business name
    if (!placeId) {
      placeId = await findPlace(businessName, apiKey)
    }

    if (!placeId) {
      console.log(`[search-business] Could not find place for: "${businessName}"`)
      // Return minimal response with no Google data
      return new Response(
        JSON.stringify({
          found: false,
          name: businessName,
          address: "",
          phone: "",
          website: "",
          googleUrl: googleUrl || "",
          rating: 0,
          reviewCount: 0,
          reviews: [],
          photos: [],
          hours: {},
          types: [],
          businessType: "general_service",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // --- STEP 2: Get full details ---
    const place = await getPlaceDetails(placeId, apiKey)
    const addressParts = parseAddress(place.formatted_address || "")

    // --- STEP 3: Build photo URLs ---
    const photos = buildPhotoUrls(place.photos || [], supabaseUrl)
    console.log(`[search-business] Got ${photos.length} photos`)

    // --- STEP 4: Parse hours ---
    const hours = parseHours(place.opening_hours)

    // --- STEP 5: Parse reviews ---
    const reviews = (place.reviews || [])
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5)
      .map((r: any) => ({
        author: r.author_name || "Customer",
        rating: r.rating || 5,
        text: r.text || "",
        relativeTime: r.relative_time_description || "",
        profilePhoto: r.profile_photo_url || "",
      }))

    // --- STEP 6: Determine business type ---
    const businessType = mapBusinessType(place.types || [])

    // --- Build response ---
    const responseData = {
      found: true,
      name: place.name || businessName,
      address: place.formatted_address || "",
      city: addressParts.city,
      state: addressParts.state,
      phone: place.formatted_phone_number || "",
      website: place.website || "",
      googleUrl: place.url || googleUrl || "",
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      reviews,
      photos,
      hours,
      types: place.types || [],
      businessType,
      isOpen: place.opening_hours?.open_now ?? null,
      businessStatus: place.business_status || "OPERATIONAL",
    }

    console.log(`[search-business] Success: "${responseData.name}" (${businessType}) - ${photos.length} photos, ${reviews.length} reviews, ${responseData.rating}★`)

    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[search-business] Error: ${message}`)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
