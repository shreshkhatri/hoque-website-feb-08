-- Add foreign key columns to student_testimonials table
-- This migration converts the text-based country and university fields to proper foreign key relationships

-- First, add the new foreign key columns (separate statements)
ALTER TABLE student_testimonials
ADD COLUMN IF NOT EXISTS country_id BIGINT;

ALTER TABLE student_testimonials
ADD COLUMN IF NOT EXISTS university_id BIGINT;

-- Populate country_id from the country name
UPDATE student_testimonials
SET country_id = countries.id
FROM countries
WHERE LOWER(TRIM(student_testimonials.country)) = LOWER(TRIM(countries.name))
AND student_testimonials.country_id IS NULL;

-- Populate university_id from the university name
UPDATE student_testimonials
SET university_id = universities.id
FROM universities
WHERE LOWER(TRIM(student_testimonials.university)) = LOWER(TRIM(universities.name))
AND student_testimonials.university_id IS NULL;

-- Add foreign key constraints (one at a time)
ALTER TABLE student_testimonials
ADD CONSTRAINT fk_testimonials_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL;

ALTER TABLE student_testimonials
ADD CONSTRAINT fk_testimonials_university FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE SET NULL;

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_testimonials_country_id ON student_testimonials(country_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_university_id ON student_testimonials(university_id);
