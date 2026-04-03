import { MapPin, Clock } from 'lucide-react'

interface PreviewHoursProps {
  businessName?: string
  accentColor?: string
  primaryColor?: string
  address?: string
  hours?: string | Record<string, string>
  googleUrl?: string
  [key: string]: unknown  // Accept extra props from BuildProgress
}

const DEFAULT_HOURS = [
  { day: 'Monday', time: '9:00 AM - 6:00 PM' },
  { day: 'Tuesday', time: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', time: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', time: '9:00 AM - 8:00 PM' },
  { day: 'Friday', time: '9:00 AM - 8:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function parseHours(hours: string | Record<string, string> | undefined): { day: string; time: string }[] {
  if (!hours) return DEFAULT_HOURS

  try {
    const parsed = typeof hours === 'string' ? JSON.parse(hours) : hours
    if (typeof parsed === 'object' && Object.keys(parsed).length > 0) {
      return DAY_ORDER.map(day => ({
        day,
        time: parsed[day] || 'Closed'
      }))
    }
  } catch {
    // Fall through to defaults
  }
  return DEFAULT_HOURS
}

function formatAddress(address: string): { lines: string[] } {
  const parts = address.split(',').map(p => p.trim())
  if (parts.length >= 3) {
    return { lines: [parts[0], parts.slice(1).join(', ')] }
  }
  return { lines: [address] }
}

const PreviewHours = ({
  businessName = 'Your Business',
  accentColor = '#6366f1',
  address,
  hours,
  googleUrl,
}: PreviewHoursProps) => {
  const parsedHours = parseHours(hours)
  const addressLines = address ? formatAddress(address) : { lines: ['Address coming soon'] }
  const mapsLink = googleUrl || (address ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}` : 'https://maps.google.com')

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Hours */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6" style={{ color: accentColor }} />
              <h2 className="text-3xl font-bold text-gray-900">Hours</h2>
            </div>
            <div className="space-y-4">
              {parsedHours.map((h) => (
                <div key={h.day} className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">{h.day}</span>
                  <span className={h.time === 'Closed' ? 'text-gray-400' : 'text-gray-600'}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6" style={{ color: accentColor }} />
              <h2 className="text-3xl font-bold text-gray-900">Location</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">{businessName}</span>
                {addressLines.lines.map((line, i) => (
                  <span key={i}>
                    <br />
                    {line}
                  </span>
                ))}
              </p>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {address ? (
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(address)}&key=STATIC_MAP_PLACEHOLDER`}
                    alt="Map"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                      ;(e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-gray-400 text-sm">Map Preview</span>'
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Map Preview</span>
                )}
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center py-2 px-4 rounded-lg font-medium text-white transition"
                style={{ backgroundColor: accentColor }}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreviewHours
