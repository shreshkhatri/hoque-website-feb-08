-- Add tbc_fields column to courses table
-- This stores an array of field names that are "To Be Confirmed"
-- e.g. ["tuition_fees_international", "campus_id", "intake_months", "scholarships"]

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS tbc_fields jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Add a comment for documentation
COMMENT ON COLUMN courses.tbc_fields IS 'Array of field names whose values are provisional / To Be Confirmed';
