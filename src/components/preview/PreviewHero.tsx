import { Phone, MapPin } from "lucide-react";
import { BUSINESS_DEFAULTS, type BusinessType } from "@/lib/business-defaults";

interface PreviewHeroProps {
  businessName: string;
  businessType: BusinessType;
  phone?: string;
  address: string;
  primaryColor: string;
  heroImage?: string;
}

const PreviewHero = ({
  businessName,
  businessType,
  phone,
  address,
  primaryColor,
  heroImage,
}: PreviewHeroProps) => {
  const defaults = BUSINESS_DEFAULTS[businessType] || BUSINESS_DEFAULTS.general_service;
  const city = address?.split(",")[0] || "Local Area";
  const backgroundImage = heroImage || defaults.heroImage;

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl">
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: defaults.accentColor + "20", color: defaults.accentColor }}>
          {defaults.label}
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          {businessName}
        </h1>

        <p className="text-xl md:text-2xl text-gray-100 mb-8 font-light">
          {defaults.tagline}
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: defaults.accentColor }}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Call Now
            </a>
          )}
          <a
            href="#services"
            className="px-6 py-3 rounded-lg font-semibold text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            Learn More
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {defaults.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-bold text-lg">{stat.value}</div>
              <div className="text-gray-200 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location badge */}
      <div className="absolute bottom-8 left-6 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
        <MapPin className="w-4 h-4" />
        <span>{city}</span>
      </div>
    </div>
  );
};

export default PreviewHero;
