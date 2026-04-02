import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS_DEFAULTS, type BusinessType } from "@/lib/business-defaults";
import { Eye, Plus, Trash2, ExternalLink } from "lucide-react";

interface BusinessLead {
  id: string;
  business_name: string;
  business_type: BusinessType;
  address: string;
  phone: string | null;
  email: string | null;
  contact_name: string | null;
  google_url: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: "barber_shop", label: "Barber Shop" },
  { value: "hair_salon", label: "Hair Salon" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Cafe" },
  { value: "auto_repair", label: "Auto Repair" },
  { value: "gym", label: "Gym / Fitness" },
  { value: "cleaning_service", label: "Cleaning Service" },
  { value: "dental_office", label: "Dental Office" },
  { value: "landscaping", label: "Landscaping" },
  { value: "real_estate", label: "Real Estate" },
  { value: "general_service", label: "General Service" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  preview_sent: "bg-yellow-100 text-yellow-800",
  demo_scheduled: "bg-purple-100 text-purple-800",
  closed_won: "bg-green-100 text-green-800",
  closed_lost: "bg-gray-100 text-gray-600",
};

const Generator = () => {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("general_service");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("business_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading leads:", error);
    } else {
      setLeads((data as BusinessLead[]) || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !address.trim()) {
      alert("Business name and address are required.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("business_leads").insert({
      business_name: businessName.trim(),
      business_type: businessType,
      address: address.trim(),
      phone: phone.trim() || null,
      email: email.trim() || null,
      contact_name: contactName.trim() || null,
      google_url: googleUrl.trim() || null,
      notes: notes.trim() || null,
      status: "new",
    });

    if (error) {
      alert("Error adding lead: " + error.message);
    } else {
      setBusinessName("");
      setBusinessType("general_service");
      setAddress("");
      setPhone("");
      setEmail("");
      setContactName("");
      setGoogleUrl("");
      setNotes("");
      fetchLeads();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("business_leads").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("business_leads")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) {
      alert("Error updating status: " + error.message);
    } else {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Generator</h1>
            <p className="text-gray-500 text-sm mt-1">
              Add businesses, generate preview sites, send outreach
            </p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
            {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Add Lead Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Lead
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Joe's Barber Shop"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {BUSINESS_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Dallas, TX"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@business.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Joe Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Maps / Website URL
                </label>
                <input
                  type="text"
                  value={googleUrl}
                  onChange={(e) => setGoogleUrl(e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="No website, found on Google Maps, busy area..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Lead"}
            </button>
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Leads</h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No leads yet. Add your first one above.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{lead.business_name}</div>
                        {lead.phone && <div className="text-xs text-gray-500">{lead.phone}</div>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                        {lead.business_type.replace(/_/g, " ")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                        {lead.address}
                      </td>
                      <td className="px-6 py-4">
                        {lead.contact_name && <div className="text-sm">{lead.contact_name}</div>}
                        {lead.email && <div className="text-xs text-gray-500">{lead.email}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-medium border-0 ${
                            STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="preview_sent">Preview Sent</option>
                          <option value="demo_scheduled">Demo Scheduled</option>
                          <option value="closed_won">Closed Won</option>
                          <option value="closed_lost">Closed Lost</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/preview/${lead.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-gray-100 rounded text-blue-500"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          {lead.google_url && (
                            <a
                              href={lead.google_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-gray-100 rounded"
                              title="View Google"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 hover:bg-gray-100 rounded text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
