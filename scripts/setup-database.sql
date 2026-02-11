-- Create Universities table
CREATE TABLE IF NOT EXISTS universities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  rank_world INT,
  description TEXT,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  founded_year INT,
  student_population INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Courses table
CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  university_id BIGINT NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  level VARCHAR(50) NOT NULL,
  duration_years INT,
  description TEXT,
  tuition_fees_international DECIMAL(10, 2),
  intake_months VARCHAR(100),
  entry_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS universities_name_idx ON universities(name);
CREATE INDEX IF NOT EXISTS universities_city_idx ON universities(city);
CREATE INDEX IF NOT EXISTS courses_name_idx ON courses(name);
CREATE INDEX IF NOT EXISTS courses_university_id_idx ON courses(university_id);
CREATE INDEX IF NOT EXISTS courses_level_idx ON courses(level);
