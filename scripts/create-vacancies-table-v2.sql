-- Create vacancies table for the career page
CREATE TABLE IF NOT EXISTS vacancies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  job_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  experience_level VARCHAR(50) NOT NULL DEFAULT 'Mid-level',
  salary_range VARCHAR(100),
  application_deadline DATE NOT NULL,
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  responsibilities JSONB NOT NULL DEFAULT '[]',
  requirements JSONB NOT NULL DEFAULT '[]',
  benefits JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active vacancies
DROP POLICY IF EXISTS "Allow public read access to active vacancies" ON vacancies;
CREATE POLICY "Allow public read access to active vacancies"
  ON vacancies
  FOR SELECT
  USING (is_active = TRUE);
