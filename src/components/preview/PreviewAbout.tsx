import { BUSINESS_DEFAULTS, type BusinessType, generateAbout, extractCity } from "@/lib/business-defaults";

interface PreviewAboutProps {
  businessName: string;
  businessType: BusinessType;
  address: string;
  primaryColor: string;
}

const PreviewAbout = ({
  businessName,
  businessType,
  address,
  primaryColor,
}: PreviewAboutProps) => {
  const defaults = BUSINESS_DEFAULTS[businessType] || BUSINESS_DEFAULTS.general_service;
  const city = extractCity(address);
  const aboutText = generateAbout(defaults.aboutTemplate, businessName, city);

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={defaults.heroImage}
              alt={businessName}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: defaults.accentColor + "20", color: defaults.accentColor }}>
              About Us
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {businessName}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {aboutText}
            </p>

            {/* Features */}
            <div className="space-y-3">
              {["Expert Team", "Quality Service", "Customer Focused"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: defaults.accentColor }} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewAbout;
