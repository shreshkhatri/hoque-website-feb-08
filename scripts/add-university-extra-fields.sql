-- Add extra fields to universities table for all hardcoded values on the detail page
ALTER TABLE universities ADD COLUMN IF NOT EXISTS employment_rate DECIMAL(5,2);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS nationalities_count INT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS partner_universities_count INT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS intakes VARCHAR(255);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS campus_facilities JSONB DEFAULT '[]'::jsonb;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS express_offer_available BOOLEAN DEFAULT false;
