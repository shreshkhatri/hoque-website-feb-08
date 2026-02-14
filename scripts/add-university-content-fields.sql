-- Add new content fields to universities table for detailed university information

-- Why Study Here section (rich text content)
ALTER TABLE universities 
ADD COLUMN IF NOT EXISTS why_study_here TEXT;

-- Highlights (array of key points)
ALTER TABLE universities 
ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]'::jsonb;

-- Required Documents (array of document requirements)
ALTER TABLE universities 
ADD COLUMN IF NOT EXISTS required_documents JSONB DEFAULT '[]'::jsonb;

-- Add comments for documentation
COMMENT ON COLUMN universities.why_study_here IS 'Rich text content explaining why students should study at this university';
COMMENT ON COLUMN universities.highlights IS 'Array of key highlights/features as JSON: [{"title": "Research Excellence", "description": "Top research facilities"}]';
COMMENT ON COLUMN universities.required_documents IS 'Array of required documents as JSON: [{"name": "Passport Copy", "description": "Valid passport", "required": true}]';
