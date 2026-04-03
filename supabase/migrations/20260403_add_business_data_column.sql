-- Add business_data JSONB column to store full Google Places response
ALTER TABLE public.business_leads
ADD COLUMN IF NOT EXISTS business_data JSONB;

-- Add index for JSONB queries (GIN index for containment queries)
CREATE INDEX IF NOT EXISTS business_leads_business_data_idx
ON public.business_leads USING GIN (business_data);

-- Fix RLS: Allow anonymous users to INSERT (needed for the generate form which runs without auth)
CREATE POLICY "anonymous_insert" ON public.business_leads
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');
