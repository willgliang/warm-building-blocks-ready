import { BUSINESS_DEFAULTS, type BusinessType } from "@/lib/business-defaults";

interface PreviewServicesProps {
  businessName: string;
  businessType: BusinessType;
  primaryColor: string;
}

const PreviewServices = ({
  businessName,
  businessType,
  primaryColor,
}: PreviewServicesProps) => {
  const defaults = BUSINESS_DEFAULTS[businessType];

  return (
    <section className="py-16 md:py-24 px-6 bg-white" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our full range of services designed just for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaults.services.map((service, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: defaults.accentColor + "20" }}
              >
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: defaults.accentColor }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewServices;
