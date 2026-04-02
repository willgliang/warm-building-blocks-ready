import { Phone } from 'lucide-react'

interface StickyMobileCTAProps {
  businessName?: string
  phone?: string
  accentColor?: string
}

const StickyMobileCTA = ({
  businessName = 'Your Business',
  phone = '(555) 123-4567',
  accentColor = '#6366f1',
}: StickyMobileCTAProps) => {
  return (
    <>
      {/* Mobile CTA - only visible on small screens */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 safe-area-inset-bottom">
        <div className="flex gap-3">
          {/* Call Button */}
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="flex-1 py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>

          {/* Book Button */}
          <button
            className="flex-1 py-3 px-4 rounded-lg font-semibold border-2 transition hover:bg-gray-50"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Book Online
          </button>
        </div>
      </div>

      {/* Padding for mobile to prevent content overlap with sticky CTA */}
      <div className="h-20 md:h-0" />
    </>
  )
}

export default StickyMobileCTA
