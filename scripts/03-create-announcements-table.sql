-- Create announcements table for university scholarships and announcements
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  announcement_type VARCHAR(50) NOT NULL DEFAULT 'general', -- 'scholarship', 'deadline', 'event', 'general', 'news'
  priority VARCHAR(20) DEFAULT 'medium', -- 'high', 'medium', 'low'
  
  -- Relations (all nullable for flexibility)
  university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE,
  
  -- Scholarship specific fields (optional)
  scholarship_amount INTEGER,
  scholarship_type VARCHAR(20), -- 'full', 'partial', 'amount', 'percentage'
  eligibility_criteria TEXT,
  application_link VARCHAR(500),
  
  -- Timing
  start_date DATE,
  end_date DATE, -- deadline
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  show_as_banner BOOLEAN DEFAULT false,
  external_link VARCHAR(500),
  slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_announcements_university_id ON announcements(university_id);
CREATE INDEX IF NOT EXISTS idx_announcements_course_id ON announcements(course_id);
CREATE INDEX IF NOT EXISTS idx_announcements_country_id ON announcements(country_id);
CREATE INDEX IF NOT EXISTS idx_announcements_type ON announcements(announcement_type);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published_at);
CREATE INDEX IF NOT EXISTS idx_announcements_end_date ON announcements(end_date);
CREATE INDEX IF NOT EXISTS idx_announcements_slug ON announcements(slug);
