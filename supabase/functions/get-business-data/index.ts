import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Extract Place ID from Google Maps URL
function extractPlaceId(googleUrl: string): string | null {
  const match = googleUrl.match(/cid=(\d+)/)
  return match ? match[1] : null
}

// Fetch business data from Google Places API
async function fetchGooglePlacesData(placeId: string, googleApiKey: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,rating,reviews,photos`

  const response = await fetch(url)
  const data = await response.json()

  if (!data.result) {
    throw new Error("Place not found")
  }

  return data.result
}

// Generate image using Higgsfield API
async function generateImageWithHighsfield(businessName: string, higgsFieldKey: string): Promise<string | null> {
  try {
    const prompt = `Professional photo of a business called "${businessName}", welcoming storefront, high quality, well-lit, modern aesthetic, 800x1000px`

    const response = await fetch("https://api.higgsfield.ai/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${higgsFieldKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        num_images: 1,
        height: 800,
        width: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`Higgsfield API error: ${response.status}`)
    }

    const data = await response.json()
    return data.images?.[0]?.url || null
  } catch (error) {
    console.error("Higgsfield generation error:", error)
    return null
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
        JSON.stringify({ error: "businessName required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const googleApiKey = Deno.env.get("GOOGLE_PLACES_API_KEY")
    const higgsFieldKey = Deno.env.get("HIGGSFIELD_API_KEY")

    let photos: string[] = []
    let businessData = {
      name: businessName,
      address: "Local",
      phone: "",
      website: "",
      rating: 4.8,
      reviewCount: 0,
      reviews: [] as any[],
    }

    // Try Google Places API first
    if (googleUrl && googleApiKey) {
      try {
        const placeId = extractPlaceId(googleUrl)
        if (placeId) {
          const googleData = await fetchGooglePlacesData(placeId, googleApiKey)

          businessData.name = googleData.name || businessName
          businessData.address = googleData.formatted_address || businessData.address
          businessData.phone = googleData.formatted_phone_number || ""
          businessData.website = googleData.website || ""
          businessData.rating = googleData.rating || 4.8
          businessData.reviewCount = googleData.reviews?.length || 0

          // Extract reviews
          if (googleData.reviews && googleData.reviews.length > 0) {
            businessData.reviews = googleData.reviews.slice(0, 3).map((review: any) => ({
              author: review.author_name || "Reviewer",
              rating: review.rating || 5,
              text: (review.text || "Great experience!").substring(0, 100),
            }))
          }

          // Extract photos from Google
          if (googleData.photos && googleData.photos.length > 0) {
            photos = googleData.photos.slice(0, 3).map((photo: any) =>
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${googleApiKey}`
            )
          }
        }
      } catch (googleError) {
        console.error("Google Places error:", googleError)
        // Continue to fallback
      }
    }

    // If no photos from Google, generate with Higgsfield
    if (photos.length === 0 && higgsFieldKey) {
      try {
        const generatedPhoto = await generateImageWithHighsfield(businessName, higgsFieldKey)
        if (generatedPhoto) {
          // Use generated image 3 times for consistency
          photos = [generatedPhoto, generatedPhoto, generatedPhoto]
        }
      } catch (higgsError) {
        console.error("Higgsfield fallback error:", higgsError)
        // Fall back to mock
      }
    }

    // Final fallback to mock photos
    if (photos.length === 0) {
      photos = [
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800",
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=400",
        "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800",
      ]
    }

    const responseData = {
      ...businessData,
      googleUrl: googleUrl || "https://maps.google.com",
      photos,
      hours: {
        "Sunday": "10:00 AM - 6:00 PM",
        "Monday": "9:00 AM - 9:00 PM",
        "Tuesday": "9:00 AM - 9:00 PM",
        "Wednesday": "9:00 AM - 9:00 PM",
        "Thursday": "9:00 AM - 9:00 PM",
        "Friday": "9:00 AM - 10:00 PM",
        "Saturday": "9:00 AM - 10:00 PM",
      },
    }

    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err: unknown) {
    let message = "Unknown error"
    if (err instanceof Error) {
      message = err.message
    } else if (typeof err === "string") {
      message = err
    }
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
