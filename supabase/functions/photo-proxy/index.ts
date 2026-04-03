import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const photoRef = url.searchParams.get("ref")
    const maxWidth = url.searchParams.get("maxwidth") || "1200"

    if (!photoRef) {
      return new Response("Missing photo reference", { status: 400 })
    }

    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY")
    if (!apiKey) {
      return new Response("API key not configured", { status: 500 })
    }

    // Fetch the photo from Google Places
    const googleUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${apiKey}`

    const response = await fetch(googleUrl, { redirect: "follow" })

    if (!response.ok) {
      console.error(`[photo-proxy] Google returned ${response.status}`)
      return new Response("Photo not found", { status: 404 })
    }

    // Stream the image back with proper headers
    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    return new Response(imageData, {
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    })
  } catch (err) {
    console.error(`[photo-proxy] Error: ${err}`)
    return new Response("Internal error", { status: 500 })
  }
})
