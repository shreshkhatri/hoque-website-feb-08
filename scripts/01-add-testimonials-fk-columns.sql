-- Step 1: Add foreign key columns
ALTER TABLE student_testimonials
ADD COLUMN IF NOT EXISTS country_id BIGINT;

ALTER TABLE student_testimonials
ADD COLUMN IF NOT EXISTS university_id BIGINT;
