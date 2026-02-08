-- Add new columns to universities table for Edvoy-style page
ALTER TABLE universities ADD COLUMN IF NOT EXISTS acceptance_rate DECIMAL(5,2);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS international_students_percentage DECIMAL(5,2);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS cover_image_url VARCHAR(500);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS campus_type VARCHAR(50);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS accommodation_available BOOLEAN DEFAULT true;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS scholarship_available BOOLEAN DEFAULT true;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS english_requirements TEXT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS application_deadline VARCHAR(255);
ALTER TABLE universities ADD COLUMN IF NOT EXISTS required_documents TEXT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS faqs JSONB;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS highlights JSONB;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS campuses JSONB;

-- Create university_campuses table
CREATE TABLE IF NOT EXISTS university_campuses (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  description TEXT,
  facilities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create university_faqs table
CREATE TABLE IF NOT EXISTS university_faqs (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS university_campuses_university_id_idx ON university_campuses(university_id);
CREATE INDEX IF NOT EXISTS university_faqs_university_id_idx ON university_faqs(university_id);
