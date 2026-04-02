import { createClient } from '@supabase/supabase-js'

// These will be loaded from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to fetch a business lead by ID
export const fetchLead = async (id: string) => {
  const { data, error } = await supabase.from('business_leads').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

// Helper function to fetch all leads
export const fetchAllLeads = async () => {
  const { data, error } = await supabase.from('business_leads').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Helper function to create a lead
export const createLead = async (lead: {
  businessName: string
  businessType: string
  address?: string
  phone?: string
  email?: string
  contactName?: string
  googleUrl?: string
  notes?: string
}) => {
  const { data, error } = await supabase.from('business_leads').insert({
    business_name: lead.businessName,
    business_type: lead.businessType,
    address: lead.address,
    phone: lead.phone,
    email: lead.email,
    contact_name: lead.contactName,
    google_url: lead.googleUrl,
    notes: lead.notes,
    status: 'new',
  })
  if (error) throw error
  return data
}

// Helper function to update a lead
export const updateLead = async (
  id: string,
  updates: Partial<{
    businessName: string
    businessType: string
    address: string
    phone: string
    email: string
    contactName: string
    googleUrl: string
    notes: string
    status: string
  }>
) => {
  const updateData: any = {}
  if (updates.businessName) updateData.business_name = updates.businessName
  if (updates.businessType) updateData.business_type = updates.businessType
  if (updates.address !== undefined) updateData.address = updates.address
  if (updates.phone !== undefined) updateData.phone = updates.phone
  if (updates.email !== undefined) updateData.email = updates.email
  if (updates.contactName !== undefined) updateData.contact_name = updates.contactName
  if (updates.googleUrl !== undefined) updateData.google_url = updates.googleUrl
  if (updates.notes !== undefined) updateData.notes = updates.notes
  if (updates.status) updateData.status = updates.status

  const { data, error } = await supabase.from('business_leads').update(updateData).eq('id', id)
  if (error) throw error
  return data
}

// Helper function to delete a lead
export const deleteLead = async (id: string) => {
  const { error } = await supabase.from('business_leads').delete().eq('id', id)
  if (error) throw error
}
