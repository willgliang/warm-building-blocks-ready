import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ArrowRight } from "lucide-react";
import type { BusinessType } from "@/lib/business-defaults";

function inferBusinessType(description: string): BusinessType {
  const d = description.toLowerCase();

  if (/barber|fade|haircut.*men|men.*cut/i.test(d)) return "barber_shop";
  if (/salon|hair.*color|stylist|highlights|balayage|blowout/i.test(d)) return "hair_salon";
  if (/restaurant|dining|dine-in|chef|cuisine|food.*menu/i.test(d)) return "restaurant";
  if (/caf[eé]|coffee|espresso|latte|barista/i.test(d)) return "cafe";
  if (/auto.*repair|mechanic|oil.*change|brake|transmission|tire/i.test(d)) return "auto_repair";
  if (/gym|fitness|personal.*train|workout|crossfit|yoga/i.test(d)) return "gym";
  if (/clean|maid|janitorial|housekeep|pressure.*wash/i.test(d)) return "cleaning_service";
  if (/dent|orthodont|tooth|teeth|oral|implant/i.test(d)) return "dental_office";
  if (/landscap|lawn|mow|tree.*trim|garden|irrigation|mulch/i.test(d)) return "landscaping";
  if (/real.*estate|realtor|home.*sale|property|mortgage|listing/i.test(d)) return "real_estate";

  return "general_service";
}

function inferCity(description: string): string {
  const match = description.match(/\bin\s+([A-Z][a-zA-Z\s]+),?\s*([A-Z]{2})?\b/);
  if (match) return match[1].trim();
  return "";
}

const GenerateSite = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !description.trim()) return;

    setLoading(true);
    setError(null);

    const businessType = inferBusinessType(description);
    const city = inferCity(description);
    const address = city ? `${city}` : "Local Area";

    const { data, error: insertError } = await supabase
      .from("business_leads")
      .insert({
        business_name: businessName.trim(),
        business_type: businessType,
        address,
        status: "new",
        notes: description.trim(),
      })
      .select("id")
      .single();

    if (insertError || !data) {
      setError(insertError?.message || "Failed to create site. Try again.");
      setLoading(false);
      return;
    }

    navigate(`/build/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <header className="relative z-10 px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-white font-semibold tracking-tight">
              Calibrated Communication
            </span>
          </div>
          <a
            href="/generator"
            className="text-slate-400 text-sm hover:text-white transition-colors"
          >
            Dashboard →
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium">
                AI-Powered Website Generator
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Build a website in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                {" "}
                minutes
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              Enter a business name and describe what they do. We'll generate a
              full preview site with real sections, booking, and contact — ready
              for your sales call.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business Name"
                required
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-lg placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the business — e.g. &quot;Premium hair salon in Johns Creek, GA specializing in precision haircuts, custom color, highlights, and rejuvenating head spa treatments.&quot;"
                required
                rows={4}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-lg placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !businessName.trim() || !description.trim()}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-lg transition-all"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Generate Website
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-600 text-xs mt-6">
            Preview generates in ~60 seconds. No login required.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GenerateSite;
