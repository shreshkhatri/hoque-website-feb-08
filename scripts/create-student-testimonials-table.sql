-- Create student_testimonials table
CREATE TABLE IF NOT EXISTS student_testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  university VARCHAR(255) NOT NULL,
  program VARCHAR(255) NOT NULL,
  photo_url TEXT,
  university_logo_url TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  display_at_homepage BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster homepage queries
CREATE INDEX IF NOT EXISTS idx_testimonials_homepage ON student_testimonials (display_at_homepage, display_order) WHERE is_active = true;

-- Insert seed data from hardcoded testimonials
INSERT INTO student_testimonials (name, country, university, program, photo_url, university_logo_url, rating, review, display_at_homepage, display_order, is_active) VALUES
(
  'Krishmee Karki',
  'Nepal',
  'University of Greenwich',
  'MSc Digital Marketing',
  '/images/students/student-1.jpg',
  '/images/uni-logos/greenwich.jpg',
  5,
  'Thanks to HOQUE''s incredible and free support, I have successfully completed my chosen course at the University of Greenwich. They made my study-abroad dream come true by guiding me every step of the way. If you''re planning to study overseas, I highly recommend HOQUE as your trusted partner.',
  true,
  1,
  true
),
(
  'MD Najmuj Jakib',
  'Bangladesh',
  'Queen''s University Belfast',
  'MSc Artificial Intelligence',
  '/images/students/student-2.jpg',
  '/images/uni-logos/queens-belfast.jpg',
  5,
  'I have successfully secured admission to Queen''s University Belfast for a Master of Science in Artificial Intelligence with a scholarship. The best part of HOQUE''s support was their expert staff, who guided and motivated me to choose the right university to achieve my academic goals.',
  true,
  2,
  true
),
(
  'Sandra Ori Obasi',
  'Nigeria',
  'University of Bolton',
  'PhD Research',
  '/images/students/student-3.jpg',
  '/images/uni-logos/bolton.jpg',
  5,
  'As a PhD student, I truly appreciate the personalized support I received from HOQUE. Their expertise and guidance made complex processes easier and allowed me to focus on my research with confidence. I just know the entire process was smooth even when I was under pressure due to the timeline to start.',
  true,
  3,
  true
),
(
  'Talha Haider',
  'Pakistan',
  'Middlesex University London',
  'BSc Computer Science',
  '/images/students/student-4.jpg',
  '/images/uni-logos/middlesex.jpg',
  5,
  'My journey with HOQUE began at a Spot Admission Day, where I first learned about their services. They supported me throughout the entire process, from Faisalabad, Pakistan to London, making the transition seamless and stress-free. From receiving a faster offer letter and securing scholarships to arranging airport pick-up, every step was managed with great care - and all at no cost.',
  true,
  4,
  true
),
(
  'Vishnu Muttathu R K',
  'India',
  'Northumbria University',
  'MSc Digital Marketing',
  '/images/students/student-5.jpg',
  '/images/uni-logos/northumbria.jpg',
  5,
  'My name is Vishnu from Kerala, and I have completed my MSc in Digital Marketing at Northumbria University. Without the unwavering, step-by-step support from HOQUE, my dream of studying in the UK might have felt impossible. They believed in me and guided me through every challenge, making my journey truly life-changing.',
  true,
  5,
  true
),
(
  'S Perera',
  'Sri Lanka',
  'University for the Creative Arts',
  'Global MBA',
  '/images/students/student-6.jpg',
  '/images/uni-logos/uca.jpg',
  5,
  'I am grateful to HOQUE for guiding me through the admission process for the Global Master of Business & Management program at University for the Creative Arts. Their knowledge, professionalism, and dedication truly made a difference throughout my journey.',
  true,
  6,
  true
);
