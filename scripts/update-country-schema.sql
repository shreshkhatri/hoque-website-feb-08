-- Add new columns to countries table for enhanced country pages
ALTER TABLE countries ADD COLUMN IF NOT EXISTS international_students_count VARCHAR(50);
ALTER TABLE countries ADD COLUMN IF NOT EXISTS happiness_ranking INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS employment_rate INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS currency VARCHAR(10);
ALTER TABLE countries ADD COLUMN IF NOT EXISTS min_wage_hourly VARCHAR(20);
ALTER TABLE countries ADD COLUMN IF NOT EXISTS max_work_hours_weekly INT;

-- Cost of living breakdown columns
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_accommodation_min INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_accommodation_max INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_food_min INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_food_max INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_transport_min INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_transport_max INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_utilities_min INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_utilities_max INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_health_insurance_min INT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS cost_health_insurance_max INT;

-- Visa info columns
ALTER TABLE countries ADD COLUMN IF NOT EXISTS student_visa_eligibility TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS student_visa_validity VARCHAR(100);
ALTER TABLE countries ADD COLUMN IF NOT EXISTS post_study_visa_eligibility TEXT;
ALTER TABLE countries ADD COLUMN IF NOT EXISTS post_study_visa_validity VARCHAR(100);

-- Intakes column (comma-separated months)
ALTER TABLE countries ADD COLUMN IF NOT EXISTS intake_months VARCHAR(100);

-- Create country_fun_facts table
CREATE TABLE IF NOT EXISTS country_fun_facts (
  id BIGSERIAL PRIMARY KEY,
  country_id BIGINT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  fact TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create country_faqs table
CREATE TABLE IF NOT EXISTS country_faqs (
  id BIGSERIAL PRIMARY KEY,
  country_id BIGINT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create country_employment_sectors table
CREATE TABLE IF NOT EXISTS country_employment_sectors (
  id BIGSERIAL PRIMARY KEY,
  country_id BIGINT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  sector_name VARCHAR(100) NOT NULL,
  demand_level VARCHAR(20) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS country_fun_facts_country_idx ON country_fun_facts(country_id);
CREATE INDEX IF NOT EXISTS country_faqs_country_idx ON country_faqs(country_id);
CREATE INDEX IF NOT EXISTS country_employment_sectors_country_idx ON country_employment_sectors(country_id);
