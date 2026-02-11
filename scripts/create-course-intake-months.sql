-- Create course_intake_months table to store intake months separately
CREATE TABLE IF NOT EXISTS course_intake_months (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  month VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, month)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_course_intake_months_course_id ON course_intake_months(course_id);
CREATE INDEX IF NOT EXISTS idx_course_intake_months_month ON course_intake_months(month);

-- Disable RLS for this public-read table (same as courses)
ALTER TABLE course_intake_months ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on course_intake_months" ON course_intake_months FOR SELECT USING (true);

-- Migrate existing intake_months text data into the new table
-- This parses the comma-separated text and inserts each month as a separate row
INSERT INTO course_intake_months (course_id, month)
SELECT 
  c.id,
  TRIM(unnest(string_to_array(c.intake_months, ','))) AS month
FROM courses c
WHERE c.intake_months IS NOT NULL 
  AND c.intake_months != ''
ON CONFLICT (course_id, month) DO NOTHING;
