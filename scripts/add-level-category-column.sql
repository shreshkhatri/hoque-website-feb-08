-- Add level_category column to courses table
-- This groups individual program levels into broader categories for easier searching/filtering
-- Categories: 'Undergraduate' (Bachelor, Foundation, Diploma, Certificate, etc.)
--             'Postgraduate' (Master, MBA, MPhil, etc.)
--             'Research' (PhD, Doctoral, Research degrees)

-- Add the column if it doesn't exist
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS level_category VARCHAR(50);

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_courses_level_category ON courses(level_category);

-- Update existing courses based on their level field
-- Undergraduate programs
UPDATE courses SET level_category = 'Undergraduate'
WHERE level_category IS NULL AND (
  level ILIKE '%undergraduate%' OR
  level ILIKE '%bachelor%' OR
  level ILIKE '%foundation%' OR
  level ILIKE '%diploma%' OR
  level ILIKE '%certificate%' OR
  level ILIKE '%associate%' OR
  level ILIKE '%pre-university%' OR
  level ILIKE '%a-level%' OR
  level ILIKE '%hnc%' OR
  level ILIKE '%hnd%'
);

-- Research / Doctoral programs (check before Postgraduate since some may have "postgraduate" in name)
UPDATE courses SET level_category = 'Research'
WHERE level_category IS NULL AND (
  level ILIKE '%phd%' OR
  level ILIKE '%doctoral%' OR
  level ILIKE '%doctorate%' OR
  level ILIKE '%dphil%' OR
  level ILIKE '%research%' OR
  level ILIKE '%dba%' OR
  level ILIKE '%edd%' OR
  level ILIKE '%deng%'
);

-- Postgraduate programs
UPDATE courses SET level_category = 'Postgraduate'
WHERE level_category IS NULL AND (
  level ILIKE '%master%' OR
  level ILIKE '%postgraduate%' OR
  level ILIKE '%msc%' OR
  level ILIKE '%mba%' OR
  level ILIKE '%ma %' OR
  level ILIKE '%mphil%' OR
  level ILIKE '%mres%' OR
  level ILIKE '%llm%' OR
  level ILIKE '%med%' OR
  level ILIKE '%meng%' OR
  level ILIKE '%pgdip%' OR
  level ILIKE '%pgcert%' OR
  level ILIKE '%graduate%'
);

-- Default remaining to Undergraduate (most common)
UPDATE courses SET level_category = 'Undergraduate'
WHERE level_category IS NULL;
