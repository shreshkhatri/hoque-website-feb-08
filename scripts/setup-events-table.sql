-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  country_id UUID NOT NULL REFERENCES countries(id),
  event_type VARCHAR(50) NOT NULL,
  image_url VARCHAR(500),
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample events with both past and future dates relative to today (Feb 4, 2026)
-- PAST EVENTS (before Feb 4, 2026)
INSERT INTO events (title, description, date, time, location, country_id, event_type, image_url, capacity, registered_count, status) VALUES
('Scholarship Winners Meet-up', 'Celebration event with students who received scholarships. Learn their journeys and success stories.', '2026-02-01', '18:00:00', 'London Central Venue', (SELECT id FROM countries WHERE name = 'United Kingdom' LIMIT 1), 'networking', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 150, 95, 'past'),
('International Student Panel Discussion', 'Panel of current international students sharing their experiences studying in the UK.', '2026-01-28', '14:00:00', 'Karachi Student Centre', (SELECT id FROM countries WHERE name = 'Pakistan' LIMIT 1), 'panel_discussion', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 180, 150, 'past'),
('IELTS Success Stories', 'Hear from students who achieved their target IELTS scores. Tips and motivation for exam preparation.', '2026-01-15', '15:00:00', 'Dhaka Hall', (SELECT id FROM countries WHERE name = 'Bangladesh' LIMIT 1), 'seminar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 200, 180, 'past'),
('Virtual UK University Tour', 'Online tour of leading UK universities with real students. Explore campuses and student life.', '2026-01-10', '09:00:00', 'Online Event', (SELECT id FROM countries WHERE name = 'India' LIMIT 1), 'virtual_event', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 500, 450, 'past'),
('Foundation Year Information Session', 'Learn about foundation year programs and their benefits for international students.', '2025-12-20', '11:00:00', 'Manchester Education Centre', (SELECT id FROM countries WHERE name = 'United Kingdom' LIMIT 1), 'seminar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 120, 110, 'past'),

-- FUTURE EVENTS (from Feb 5, 2026 onwards)
('UK University Fair - London', 'Meet with representatives from top UK universities. Explore your options and learn about admission requirements.', '2026-02-15', '10:00:00', 'London Convention Centre, London', (SELECT id FROM countries WHERE name = 'United Kingdom' LIMIT 1), 'university_fair', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 300, 120, 'upcoming'),
('IELTS Preparation Workshop', 'Comprehensive workshop on IELTS exam preparation strategies and tips. Learn from British Council certified instructors.', '2026-02-20', '14:00:00', 'New Delhi Central Hub', (SELECT id FROM countries WHERE name = 'India' LIMIT 1), 'workshop', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 150, 85, 'upcoming'),
('Student Visa Information Session', 'Everything you need to know about UK student visa application process. Q&A with immigration experts.', '2026-02-25', '11:00:00', 'Dhaka Education Centre', (SELECT id FROM countries WHERE name = 'Bangladesh' LIMIT 1), 'seminar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 200, 145, 'upcoming'),
('Oxford & Cambridge Selection Event', 'Special session on selecting between prestigious UK universities. Learn about their programs and campus life.', '2026-03-05', '15:30:00', 'Karachi Business Plaza', (SELECT id FROM countries WHERE name = 'Pakistan' LIMIT 1), 'selection_event', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 120, 75, 'upcoming'),
('Scholarship & Funding Seminar', 'Discover various scholarships and funding options available for international students in the UK.', '2026-03-10', '10:00:00', 'Colombo Convention Hall', (SELECT id FROM countries WHERE name = 'Sri Lanka' LIMIT 1), 'seminar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 180, 95, 'upcoming'),
('University Application Workshop', 'Step-by-step guide on completing your university application. Interactive session with admission counselors.', '2026-03-15', '16:00:00', 'Bangkok International Centre', (SELECT id FROM countries WHERE name = 'Thailand' LIMIT 1), 'workshop', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 100, 65, 'upcoming'),
('Pre-Arrival Preparation Session', 'Essential information for students arriving in the UK. Accommodation, travel, and settling-in advice.', '2026-03-22', '13:00:00', 'Manila Education Hub', (SELECT id FROM countries WHERE name = 'Philippines' LIMIT 1), 'seminar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 250, 120, 'upcoming'),
('UCAS Application Guidance', 'Detailed guidance on UCAS application portal, course selection, and writing your personal statement.', '2026-04-01', '10:30:00', 'Singapore Business Park', (SELECT id FROM countries WHERE name = 'Singapore' LIMIT 1), 'workshop', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 80, 45, 'upcoming'),
('Accommodation & Student Life Panel', 'Experienced panel discussing accommodation options, student budgets, and living in UK cities.', '2026-04-10', '14:00:00', 'Sydney Conference Hall', (SELECT id FROM countries WHERE name = 'Australia' LIMIT 1), 'panel_discussion', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 160, 110, 'upcoming'),
('Master\'s Degree Information Session', 'Everything you need to know about pursuing a Master\'s degree in the UK.', '2026-04-25', '11:00:00', 'Toronto Business Centre', (SELECT id FROM countries WHERE name = 'Canada' LIMIT 1), 'seminar', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', 140, 88, 'upcoming');
