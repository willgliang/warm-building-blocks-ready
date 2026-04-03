import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS_DEFAULTS, type BusinessType } from "@/lib/business-defaults";
import {
  CheckCircle,
  Loader2,
  Circle,
  ExternalLink,
  Copy,
  Sparkles,
} from "lucide-react";

import PreviewHero from "@/components/preview/PreviewHero";
import PreviewServices from "@/components/preview/PreviewServices";
import PreviewBooking from "@/components/preview/PreviewBooking";
import PreviewAbout from "@/components/preview/PreviewAbout";
import PreviewHours from "@/components/preview/PreviewHours";
import PreviewContact from "@/components/preview/PreviewContact";
import PreviewFooter from "@/components/preview/PreviewFooter";

interface LeadData {
  id: string;
  business_name: string;
  business_type: BusinessType;
  address: string;
  phone: string | null;
  email: string | null;
  hours: string | null;
  google_url: string | null;
  notes: string | null;
}

interface GoogleBusinessData {
  found: boolean;
  name: string;
  address: string;
  city?: string;
  state?: string;
  phone: string;
  website: string;
  googleUrl: string;
  rating: number;
  reviewCount: number;
  reviews: Array<{
    author: string;
    rating: number;
    text: string;
    relativeTime: string;
    profilePhoto: string;
  }>;
  photos: string[];
  hours: Record<string, string>;
  types: string[];
  businessType: string;
}

interface BuildStep {
  id: string;
  label: string;
  thinkingText: string;
  durationMs: number;
  section: string;
}

function createBuildSteps(businessName: string, businessType: string, googleData: GoogleBusinessData | null): BuildStep[] {
  const typeLabel = BUSINESS_DEFAULTS[businessType as BusinessType]?.label || "business";
  const hasData = googleData?.found === true;

  return [
    {
      id: "lookup",
      label: "Looking up business data",
      thinkingText: hasData
        ? `Found "${googleData!.name}" at ${googleData!.address}. Retrieved ${googleData!.reviewCount} reviews (${googleData!.rating}★ average). Downloaded ${googleData!.photos.length} business photos.`
        : `Searching for "${businessName}" — pulling business data, photos, and reviews from Google...`,
      durationMs: 3000,
      section: "none",
    },
    {
      id: "palette",
      label: "Choosing brand colors and typography",
      thinkingText: hasData
        ? `Detected: ${typeLabel}. Applying ${typeLabel.toLowerCase()} industry color palette — selecting colors that match ${googleData!.name}'s brand feel. Choosing fonts that feel professional but approachable.`
        : `This is a ${typeLabel.toLowerCase()}. I'll use a color palette that matches the industry — warm and inviting with strong contrast for CTAs.`,
      durationMs: 2500,
      section: "none",
    },
    {
      id: "header",
      label: "Building the header and navigation",
      thinkingText: hasData
        ? `Creating sticky header with "${googleData!.name}" branding, navigation links, and ${googleData!.phone ? `click-to-call: ${googleData!.phone}` : "contact button"}. Mobile hamburger menu included.`
        : `Creating a sticky header with the business name, navigation links, and a prominent phone number. Mobile-responsive hamburger menu included.`,
      durationMs: 2000,
      section: "hero",
    },
    {
      id: "hero",
      label: "Building the hero section",
      thinkingText: hasData && googleData!.photos.length > 0
        ? `Using real business photo as hero background. Adding gradient overlay, headline, call-to-action buttons, and ${googleData!.rating}★ rating badge from ${googleData!.reviewCount} Google reviews.`
        : `Full-bleed hero with a high-quality background image, gradient overlay, headline, call-to-action buttons, and social proof stats bar. This needs to grab attention in 3 seconds.`,
      durationMs: 3500,
      section: "hero",
    },
    {
      id: "services",
      label: "Adding services section",
      thinkingText: hasData
        ? `Building a services grid with key offerings for this ${typeLabel.toLowerCase()}. Each card gets an icon, title, and description based on what customers mention in reviews.`
        : `Building a services grid with 4 key offerings for this ${typeLabel.toLowerCase()}. Each card gets an icon, title, and description.`,
      durationMs: 3000,
      section: "services",
    },
    {
      id: "booking",
      label: "Building the booking preview",
      thinkingText: `Adding an online booking section — date picker, time slots, service selector. This shows the business owner their customers could book online 24/7. Trust bullets and stats card included.`,
      durationMs: 3500,
      section: "booking",
    },
    {
      id: "about",
      label: "Writing the about section",
      thinkingText: hasData
        ? `Writing personalized about copy for ${googleData!.name}${googleData!.city ? ` in ${googleData!.city}` : ""}. Highlighting key differentiators based on ${googleData!.reviewCount} customer reviews.`
        : `Generating personalized about copy for ${businessName}. Adding the business story, key differentiators, and a professional photo.`,
      durationMs: 2500,
      section: "about",
    },
    {
      id: "hours",
      label: "Adding hours and location",
      thinkingText: hasData && Object.keys(googleData!.hours).length > 0
        ? `Pulling real business hours from Google. ${googleData!.address}. Adding map preview and "Get Directions" link.`
        : `Setting up the hours and location section with a map placeholder, business hours, and quick-access info cards.`,
      durationMs: 2000,
      section: "hours",
    },
    {
      id: "contact",
      label: "Building the contact section",
      thinkingText: hasData
        ? `Adding contact form${googleData!.phone ? `, phone: ${googleData!.phone}` : ""}${googleData!.website ? `, website link` : ""}. Social media links and contact info cards.`
        : `Adding contact form, social media links, and contact info cards.`,
      durationMs: 2500,
      section: "contact",
    },
    {
      id: "footer",
      label: "Finishing with the footer",
      thinkingText: `Professional dark footer with brand info, quick links, contact details, business hours, and social icons. Copyright line with current year.`,
      durationMs: 2000,
      section: "footer",
    },
  ];
}

type StepStatus = "pending" | "active" | "done";

function StepIcon({ status }: { status: StepStatus }) {
  if (status === "done")
    return <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
  if (status === "active")
    return <Loader2 className="w-5 h-5 text-indigo-400 animate-spin flex-shrink-0" />;
  return <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />;
}

const BuildProgress = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lead, setLead] = useState<LeadData | null>(null);
  const [googleData, setGoogleData] = useState<GoogleBusinessData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [buildComplete, setBuildComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const stepsRef = useRef<BuildStep[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  // Load lead + Google business data from sessionStorage
  useEffect(() => {
    if (!id) return;
    const fetchLead = async () => {
      const { data, error } = await supabase
        .from("business_leads")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setLoadError("Lead not found");
      } else {
        setLead(data as LeadData);

        // Parse Google data from sessionStorage
        let parsedGoogleData: GoogleBusinessData | null = null;
        try {
          const stored = sessionStorage.getItem(`businessData_${id}`);
          if (stored) {
            parsedGoogleData = JSON.parse(stored);
            setGoogleData(parsedGoogleData);
          }
        } catch (e) {
          console.error("Failed to parse business data from sessionStorage:", e);
        }

        stepsRef.current = createBuildSteps(
          data.business_name,
          data.business_type,
          parsedGoogleData
        );
        setCurrentStepIndex(0);
      }
    };
    fetchLead();
  }, [id]);

  // Step progression timer
  useEffect(() => {
    if (currentStepIndex < 0) return;
    const steps = stepsRef.current;
    if (currentStepIndex >= steps.length) {
      setBuildComplete(true);
      return;
    }

    const step = steps[currentStepIndex];

    const revealTimer = setTimeout(() => {
      if (step.section !== "none") {
        setVisibleSections((prev) => new Set([...prev, step.section]));
      }
    }, step.durationMs * 0.6);

    const nextTimer = setTimeout(() => {
      setCurrentStepIndex((i) => i + 1);
    }, step.durationMs);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(nextTimer);
    };
  }, [currentStepIndex]);

  // Auto-scroll build log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [currentStepIndex]);

  const previewUrl = `${window.location.origin}/preview/${id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Not Found</h1>
          <p className="text-slate-400">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  const steps = stepsRef.current;
  const defaults =
    BUSINESS_DEFAULTS[lead.business_type] || BUSINESS_DEFAULTS.general_service;
  const primaryColor = defaults.primaryColor;

  // Use curated stock hero for known business types (more visually compelling than random Google photos).
  // Google photos go to about/gallery sections. Fall back to Google photo[0] only for general_service.
  const businessType = lead.business_type as string;
  const hasKnownType = businessType && businessType !== "general_service";
  const heroImage = hasKnownType
    ? defaults.heroImage
    : (googleData?.photos?.[0] || defaults.heroImage);
  const realHours = googleData?.hours && Object.keys(googleData.hours).length > 0
    ? JSON.stringify(googleData.hours)
    : lead.hours || undefined;
  const realPhone = googleData?.phone || lead.phone || undefined;
  const realAddress = googleData?.address || lead.address;
  const realGoogleUrl = googleData?.googleUrl || lead.google_url || undefined;
  const realName = googleData?.name || lead.business_name;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row">
        {/* LEFT PANEL: Build log */}
        <div className="lg:w-[420px] lg:min-w-[420px] bg-slate-950 border-r border-white/5 flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-white font-semibold">Building Website</span>
            </div>
            <p className="text-slate-400 text-sm truncate">{realName}</p>
          </div>

          {/* Steps log */}
          <div ref={logRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
            {steps.map((step, i) => {
              let status: StepStatus = "pending";
              if (i < currentStepIndex) status = "done";
              else if (i === currentStepIndex) status = "active";

              return (
                <div key={step.id}>
                  <div className="flex items-center gap-3 py-2">
                    <StepIcon status={status} />
                    <span
                      className={`text-sm font-medium ${
                        status === "pending"
                          ? "text-slate-600"
                          : status === "active"
                          ? "text-white"
                          : "text-slate-300"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {status !== "pending" && (
                    <div className="ml-8 mb-3 px-3 py-2 bg-white/[0.03] border border-white/5 rounded-lg">
                      <p className="text-xs text-slate-500 font-medium mb-1">Thinking</p>
                      <p
                        className={`text-sm leading-relaxed ${
                          status === "active"
                            ? "text-slate-300"
                            : "text-slate-500"
                        }`}
                      >
                        {step.thinkingText}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {buildComplete && (
              <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-400 font-semibold text-sm mb-1">
                  Website ready
                </p>
                <p className="text-slate-400 text-xs mb-3">
                  Share this preview link with your client:
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-black/30 rounded-lg px-3 py-2 text-xs text-slate-300 truncate font-mono">
                    {previewUrl}
                  </div>
                  <button
                    onClick={copyLink}
                    className="flex-shrink-0 px-3 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-xs text-white transition-colors"
                  >
                    {copied ? "Copied!" : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <a
                    href={`/preview/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-sm text-white font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Full Preview
                  </a>
                  <a
                    href="/generate"
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-slate-300 transition-colors"
                  >
                    Build Another
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4 border-t border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>
                {buildComplete
                  ? "Complete"
                  : `Step ${Math.min(currentStepIndex + 1, steps.length)} of ${steps.length}`}
              </span>
              <span>
                {Math.round(
                  (Math.min(currentStepIndex + 1, steps.length) / steps.length) * 100
                )}
                %
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(Math.min(currentStepIndex + 1, steps.length) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Live preview */}
        <div className="flex-1 bg-white overflow-y-auto">
          {/* Browser chrome mockup */}
          <div className="sticky top-0 z-20 bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono truncate">
              {realName.toLowerCase().replace(/\s+/g, "")}.com
            </div>
          </div>

          {/* Preview sections */}
          <div className="min-h-screen">
            {visibleSections.size === 0 && (
              <div className="flex items-center justify-center h-96 text-slate-300">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-slate-400" />
                  <p className="text-sm">Building your website...</p>
                </div>
              </div>
            )}

            {visibleSections.has("hero") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewHero
                  businessName={realName}
                  businessType={lead.business_type}
                  phone={realPhone}
                  address={realAddress}
                  primaryColor={primaryColor}
                  heroImage={heroImage}
                />
              </div>
            )}

            {visibleSections.has("services") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewServices
                  businessName={realName}
                  businessType={lead.business_type}
                  primaryColor={primaryColor}
                />
              </div>
            )}

            {visibleSections.has("booking") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewBooking
                  businessName={realName}
                  businessType={lead.business_type}
                  primaryColor={primaryColor}
                />
              </div>
            )}

            {visibleSections.has("about") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewAbout
                  businessName={realName}
                  businessType={lead.business_type}
                  address={realAddress}
                  primaryColor={primaryColor}
                />
              </div>
            )}

            {visibleSections.has("hours") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewHours
                  businessName={realName}
                  businessType={lead.business_type}
                  address={realAddress}
                  phone={realPhone}
                  hours={realHours}
                  primaryColor={primaryColor}
                  googleUrl={realGoogleUrl}
                />
              </div>
            )}

            {visibleSections.has("contact") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewContact
                  businessName={realName}
                  businessType={lead.business_type}
                  phone={realPhone}
                  email={lead.email || undefined}
                  address={realAddress}
                  primaryColor={primaryColor}
                />
              </div>
            )}

            {visibleSections.has("footer") && (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <PreviewFooter
                  businessName={realName}
                  businessType={lead.business_type}
                  phone={realPhone}
                  address={realAddress}
                  hours={realHours}
                  primaryColor={primaryColor}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildProgress;
