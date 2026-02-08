-- Add slug columns to universities table
ALTER TABLE universities ADD COLUMN IF NOT EXISTS slug TEXT;

-- Add slug columns to courses table  
ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT;

-- Add slug columns to countries table
ALTER TABLE countries ADD COLUMN IF NOT EXISTS slug TEXT;

-- Update existing universities with slugs (converts name to lowercase, replaces spaces with hyphens)
UPDATE universities 
SET slug = LOWER(REPLACE(REPLACE(TRIM(name), ' ', '-'), '''', ''))
WHERE slug IS NULL;

-- Update existing courses with slugs
UPDATE courses 
SET slug = LOWER(REPLACE(REPLACE(TRIM(name), ' ', '-'), '''', '')) || '-' || id
WHERE slug IS NULL;

-- Update existing countries with slugs
UPDATE countries 
SET slug = LOWER(REPLACE(REPLACE(TRIM(name), ' ', '-'), '''', ''))
WHERE slug IS NULL;
