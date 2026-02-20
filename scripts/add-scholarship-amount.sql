-- Add scholarship_amount field to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_amount INTEGER;

-- Add comment to describe the field
COMMENT ON COLUMN courses.scholarship_amount IS 'Scholarship amount available for this course (in same currency as tuition fees)';
