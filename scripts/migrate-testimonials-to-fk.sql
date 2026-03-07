-- Add foreign key columns to student_testimonials table
-- This migration converts the text-based country and university fields to proper foreign key relationships

-- First, add the new foreign key columns
ALTER TABLE student_testimonials
ADD COLUMN IF NOT EXISTS country_id BIGINT,
ADD COLUMN IF NOT EXISTS university_id BIGINT;

-- Populate country_id from the country name
UPDATE student_testimonials t
SET country_id = c.id
FROM countries c
WHERE LOWER(t.country) = LOWER(c.name);

-- Populate university_id from the university name
UPDATE student_testimonials t
SET university_id = u.id
FROM universities u
WHERE LOWER(t.university) = LOWER(u.name);

-- Add foreign key constraints
ALTER TABLE student_testimonials
ADD CONSTRAINT fk_testimonials_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_testimonials_university FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE SET NULL;

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_testimonials_country_id ON student_testimonials(country_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_university_id ON student_testimonials(university_id);
