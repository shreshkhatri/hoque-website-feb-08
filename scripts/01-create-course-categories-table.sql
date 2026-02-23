-- Create course_categories table
CREATE TABLE IF NOT EXISTS course_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_course_categories_slug ON course_categories(slug);

-- Add category_id column to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES course_categories(id) ON DELETE SET NULL;

-- Create index on category_id for faster joins
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);
