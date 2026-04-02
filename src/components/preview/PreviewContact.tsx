import { Mail, Phone, MessageSquare } from 'lucide-react'

interface PreviewContactProps {
  businessName?: string
  phone?: string
  accentColor?: string
}

const PreviewContact = ({
  businessName = 'Your Business',
  phone = '(555) 123-4567',
  accentColor = '#6366f1',
}: PreviewContactProps) => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Phone */}
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Phone className="w-8 h-8" style={{ color: accentColor }} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">{phone}</p>
          </div>

          {/* Email */}
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Mail className="w-8 h-8" style={{ color: accentColor }} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">hello@example.com</p>
          </div>

          {/* Message */}
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <MessageSquare className="w-8 h-8" style={{ color: accentColor }} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Chat With Us</h3>
            <p className="text-gray-600">Available 24/7</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Tell us how we can help..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PreviewContact
