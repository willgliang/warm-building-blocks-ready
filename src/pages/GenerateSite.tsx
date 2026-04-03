import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function GenerateSite() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !desc) return;
    setLoading(true);
    setStatus("Searching for your business...");

    try {
      // Step 1: Call search-business to get real Google Places data
      const { data: businessData, error: fnError } = await supabase.functions.invoke('search-business', {
        body: JSON.stringify({
          businessName: name,
          description: desc || undefined,
          googleUrl: url || undefined,
        })
      });

      if (fnError) {
        console.error('Function error:', fnError);
        setStatus("Error finding business. Trying again...");
        setLoading(false);
        return;
      }

      console.log('Business data received:', businessData);
      setStatus(businessData?.found
        ? `Found: ${businessData.name} (${businessData.rating}★)`
        : "Business not found on Google. Using provided info..."
      );

      // Step 2: Insert lead into database with full business data
      const { data } = await supabase.from("business_leads").insert({
        business_name: businessData?.name || name,
        business_type: businessData?.businessType || "general_service",
        address: businessData?.address || "Local",
        phone: businessData?.phone || "",
        google_url: businessData?.googleUrl || url || null,
        notes: desc,
        status: "new",
        business_data: businessData || null,
      }).select().single();

      if (data) {
        // Store full business data in sessionStorage for BuildProgress
        sessionStorage.setItem(`businessData_${data.id}`, JSON.stringify(businessData));
        setStatus("Starting build...");
        navigate(`/build/${data.id}`);
      } else {
        setStatus("Error saving. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Build Website</h1>
      <form onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Business Name"
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Describe business"
          rows={4}
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="(Optional) Google Maps URL"
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            background: loading ? "#999" : "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Creating..." : "Generate"}
        </button>
        {status && (
          <p style={{
            marginTop: "12px",
            fontSize: "14px",
            color: status.includes("Error") || status.includes("wrong") ? "#e74c3c" : "#666",
            textAlign: "center"
          }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
