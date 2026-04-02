import { MapPin, Clock } from 'lucide-react'

interface PreviewHoursProps {
  businessName?: string
  accentColor?: string
}

const PreviewHours = ({ businessName = 'Your Business', accentColor = '#6366f1' }: PreviewHoursProps) => {
  const hours = [
    { day: 'Monday', time: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', time: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', time: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', time: '9:00 AM - 8:00 PM' },
    { day: 'Friday', time: '9:00 AM - 8:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ]

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
              {hours.map((h) => (
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
                <br />
                123 Main Street
                <br />
                New York, NY 10001
              </p>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">Map Preview</span>
              </div>
              <a
                href="https://maps.google.com"
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
