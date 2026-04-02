import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS_DEFAULTS, type BusinessType } from "@/lib/business-defaults";
import PreviewHero from "@/components/preview/PreviewHero";
import PreviewServices from "@/components/preview/PreviewServices";
import PreviewAbout from "@/components/preview/PreviewAbout";
import PreviewHours from "@/components/preview/PreviewHours";
import PreviewContact from "@/components/preview/PreviewContact";
import PreviewBooking from "@/components/preview/PreviewBooking";
import PreviewFooter from "@/components/preview/PreviewFooter";
import StickyMobileCTA from "@/components/preview/StickyMobileCTA";

interface LeadData {
  id: string;
  business_name: string;
  business_type: BusinessType;
  address: string;
  phone: string | null;
  email: string | null;
  hours: string | null;
  google_url: string | null;
}

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No lead ID provided");
      setLoading(false);
      return;
    }

    const fetchLead = async () => {
      const { data, error: fetchError } = await supabase
        .from("business_leads")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !data) {
        setError("Lead not found");
      } else {
        setLead(data as LeadData);
      }
      setLoading(false);
    };

    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Preview Not Found</h1>
          <p className="text-gray-500">{error || "This lead does not exist."}</p>
        </div>
      </div>
    );
  }

  const defaults = BUSINESS_DEFAULTS[lead.business_type] || BUSINESS_DEFAULTS.general_service;
  const primaryColor = defaults.primaryColor;

  return (
    <div className="min-h-screen bg-white">
      <PreviewHero
        businessName={lead.business_name}
        businessType={lead.business_type}
        phone={lead.phone || undefined}
        address={lead.address}
        primaryColor={primaryColor}
      />
      <PreviewServices
        businessName={lead.business_name}
        businessType={lead.business_type}
        primaryColor={primaryColor}
      />
      <PreviewBooking
        businessName={lead.business_name}
        businessType={lead.business_type}
        primaryColor={primaryColor}
      />
      <PreviewAbout
        businessName={lead.business_name}
        businessType={lead.business_type}
        address={lead.address}
        primaryColor={primaryColor}
      />
      <PreviewHours
        businessName={lead.business_name}
        businessType={lead.business_type}
        address={lead.address}
        phone={lead.phone || undefined}
        hours={lead.hours || undefined}
        primaryColor={primaryColor}
        googleUrl={lead.google_url || undefined}
      />
      <PreviewContact
        businessName={lead.business_name}
        businessType={lead.business_type}
        phone={lead.phone || undefined}
        email={lead.email || undefined}
        address={lead.address}
        primaryColor={primaryColor}
      />
      <PreviewFooter
        businessName={lead.business_name}
        businessType={lead.business_type}
        phone={lead.phone || undefined}
        address={lead.address}
        hours={lead.hours || undefined}
        primaryColor={primaryColor}
      />
      <StickyMobileCTA
        businessName={lead.business_name}
        businessType={lead.business_type}
        phone={lead.phone || undefined}
        primaryColor={primaryColor}
      />
    </div>
  );
};

export default Preview;
