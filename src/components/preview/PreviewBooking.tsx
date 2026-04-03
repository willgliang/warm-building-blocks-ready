import { Calendar, Clock, CheckCircle } from "lucide-react";
import { BUSINESS_DEFAULTS, type BusinessType } from "@/lib/business-defaults";

interface PreviewBookingProps {
  businessName: string;
  businessType: BusinessType;
  primaryColor: string;
}

const PreviewBooking = ({
  businessName,
  businessType,
  primaryColor,
}: PreviewBookingProps) => {
  const defaults = BUSINESS_DEFAULTS[businessType] || BUSINESS_DEFAULTS.general_service;

  return (
    <section className="py-16 md:py-24 px-6 bg-gray-50" id="booking">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Trust bullets + stats */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Book Your Appointment Online
            </h2>
            <p className="text-gray-600 mb-8">
              24/7 online booking. Instant confirmation. Never miss an appointment.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "24/7 Online Booking",
                "Instant Confirmation",
                "SMS Reminders",
                "Mobile-Friendly",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats card */}
            <div
              className="p-6 rounded-xl text-white"
              style={{ backgroundColor: defaults.accentColor }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold">40%</div>
                  <div className="text-sm text-white/80">Fewer No-Shows</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">3x</div>
                  <div className="text-sm text-white/80">More Bookings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking form mockup */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Book an Appointment
            </h3>

            {/* Service selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" style={{ "--tw-ring-color": defaults.accentColor } as any}>
                {defaults.services.slice(0, 3).map((s, i) => (
                  <option key={i}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Date picker mockup */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Select Date
              </label>
              <div className="grid grid-cols-7 gap-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <button
                    key={i}
                    className="aspect-square rounded text-sm hover:bg-gray-100 border border-gray-200"
                  >
                    {(i % 7) + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Select Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["9:00", "10:00", "11:00", "2:00", "3:00", "4:00"].map((time) => (
                  <button
                    key={time}
                    className="py-2 px-2 text-xs border border-gray-300 rounded hover:border-gray-400 text-gray-700"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: defaults.accentColor }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewBooking;
