-- Create business_leads table
CREATE TABLE IF NOT EXISTS public.business_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  contact_name TEXT,
  google_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'preview_sent', 'demo_scheduled', 'closed_won', 'closed_lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS business_leads_status_idx ON public.business_leads(status);
CREATE INDEX IF NOT EXISTS business_leads_business_type_idx ON public.business_leads(business_type);
CREATE INDEX IF NOT EXISTS business_leads_created_at_idx ON public.business_leads(created_at DESC);

-- Enable RLS
ALTER TABLE public.business_leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Authenticated users can do everything
CREATE POLICY "authenticated_all_access" ON public.business_leads
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Anonymous users can only read (for previews)
CREATE POLICY "anonymous_read_only" ON public.business_leads
  FOR SELECT
  USING (auth.role() = 'anon');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_business_leads_updated_at ON public.business_leads;
CREATE TRIGGER update_business_leads_updated_at
  BEFORE UPDATE ON public.business_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
