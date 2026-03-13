-- Add level_category column to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS level_category VARCHAR(50);
