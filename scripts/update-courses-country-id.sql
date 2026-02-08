-- Update courses table to populate country_id from universities table
-- This ensures each course has its country_id set based on its university's country

UPDATE courses
SET country_id = universities.country_id
FROM universities
WHERE courses.university_id = universities.id
AND courses.country_id IS NULL;

-- Create an index on country_id for faster queries
CREATE INDEX IF NOT EXISTS idx_courses_country_id ON courses(country_id);

-- Verify the update
SELECT 
  c.id, 
  c.name as course_name, 
  c.country_id as course_country_id,
  u.name as university_name,
  u.country_id as university_country_id
FROM courses c
JOIN universities u ON c.university_id = u.id
LIMIT 10;
