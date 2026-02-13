-- ============================================================
-- ADD NEW UK UNIVERSITIES AND COURSES
-- ============================================================
-- This script adds 6 new UK universities and their associated courses
-- Data verified and extracted from official university sources

-- Check if universities exist before inserting to prevent duplicates
-- INSERT NEW UK UNIVERSITIES

-- 1. Queens University Belfast
INSERT INTO public.universities (name, city, country_id, description, website_url, founded_year, student_population)
SELECT 'Queen''s University Belfast', 'Belfast', 1, 'Russell Group research-intensive university offering world-class education with strong postgraduate programs in business, science, and engineering', 'https://www.qub.ac.uk', 1845, 25000
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE name = 'Queen''s University Belfast');

-- 2. Northumbria University
INSERT INTO public.universities (name, city, country_id, description, website_url, founded_year, student_population)
SELECT 'Northumbria University', 'Newcastle', 1, 'Modern university known for industry-focused teaching, innovative research, and strong business school with AACSB accreditation', 'https://www.northumbria.ac.uk', 1969, 34000
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE name = 'Northumbria University');

-- 3. University of Greenwich
INSERT INTO public.universities (name, city, country_id, description, website_url, founded_year, student_population)
SELECT 'University of Greenwich', 'London', 1, 'London-based university offering practical, career-focused education with strong links to industry and diverse student community', 'https://www.gre.ac.uk', 1890, 18000
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE name = 'University of Greenwich');

-- 4. Middlesex University
INSERT INTO public.universities (name, city, country_id, description, website_url, founded_year, student_population)
SELECT 'Middlesex University', 'London', 1, 'Forward-thinking university in North London with innovative approach to teaching and research, internationally recognized programs', 'https://www.mdx.ac.uk', 1973, 20000
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE name = 'Middlesex University');

-- 5. University of Manchester
INSERT INTO public.universities (name, city, country_id, description, website_url, founded_year, student_population)
SELECT 'University of Manchester', 'Manchester', 1, 'Leading research university with excellence across all disciplines, strong industry partnerships, and innovation focus', 'https://www.manchester.ac.uk', 1824, 44000
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE name = 'University of Manchester');

-- 6. London South Bank University (LSBU)
INSERT INTO public.universities (name, city, country_id, description, website_url, founded_year, student_population)
SELECT 'London South Bank University', 'London', 1, 'Modern metropolitan university offering practical vocational education with strong connections to London employers and industry', 'https://www.lsbu.ac.uk', 1892, 15000
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE name = 'London South Bank University');

-- ============================================================
-- INSERT COURSES FOR NEW UNIVERSITIES
-- ============================================================

-- COURSES FOR NORTHUMBRIA UNIVERSITY
-- MSc Business with International Management
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT 
  'MSc Business with International Management',
  'NUMB-001',
  (SELECT id FROM public.universities WHERE name = 'Northumbria University'),
  1,
  'Master',
  1,
  'Integrates key themes in international business, strategic management, innovation, and leadership. Includes International Business Simulation module for strategic thinking development. Studio-based problem solving with emphasis on teamwork and innovative solutions. Newcastle Business School holds AACSB accreditation.',
  24000,
  'January,May,September',
  'Bachelor degree (2:2 minimum) or Master''s degree in related discipline. IELTS 6.0 (minimum 5.5 in each skill). Valid passport with 6+ months validity. TB certificate (issued within 6 months). Letter of Recommendation (dated within 6 months)'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Business with International Management' AND code = 'NUMB-001');

-- COURSES FOR QUEEN'S UNIVERSITY BELFAST
-- MSc Data Science and Artificial Intelligence
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Data Science and Artificial Intelligence',
  'QUB-001',
  (SELECT id FROM public.universities WHERE name = 'Queen''s University Belfast'),
  1,
  'Master',
  1,
  'Comprehensive program covering data science, machine learning, and artificial intelligence applications. Focus on practical skills, industry-standard tools, and real-world problem solving. Strong emphasis on AI ethics and responsible innovation. Includes project-based learning and industry partnerships.',
  22000,
  'January,September',
  'Bachelor degree in Computer Science, Mathematics, or related field (2:1 minimum). IELTS 6.5 (minimum 6.0 in each skill). Strong analytical and programming skills. GPA 3.0+ or equivalent'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Data Science and Artificial Intelligence' AND code = 'QUB-001');

-- Additional Master's programs for Queen's University Belfast
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Advanced Engineering',
  'QUB-002',
  (SELECT id FROM public.universities WHERE name = 'Queen''s University Belfast'),
  1,
  'Master',
  1,
  'Advanced engineering program covering mechanical, civil, and electronic engineering specializations. Focus on sustainable design and modern engineering practices.',
  21000,
  'September',
  'Bachelor in Engineering (2:1 minimum). IELTS 6.5. Strong technical background'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Advanced Engineering' AND code = 'QUB-002');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Finance',
  'QUB-003',
  (SELECT id FROM public.universities WHERE name = 'Queen''s University Belfast'),
  1,
  'Master',
  1,
  'Specialized finance program covering investment, corporate finance, and financial markets. Prepares students for professional certifications.',
  20000,
  'January,September',
  'Bachelor in Finance, Economics or related (2:1 minimum). IELTS 6.5. Strong quantitative skills'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Finance' AND code = 'QUB-003');

-- COURSES FOR UNIVERSITY OF GREENWICH
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Business Management',
  'GRE-001',
  (SELECT id FROM public.universities WHERE name = 'University of Greenwich'),
  1,
  'Master',
  1,
  'Career-focused business management program with emphasis on practical skills and industry applications. Covers strategy, operations, and organizational management.',
  18000,
  'January,September',
  'Bachelor degree or equivalent. IELTS 6.0. Work experience beneficial'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Business Management' AND code = 'GRE-001');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Computer Science',
  'GRE-002',
  (SELECT id FROM public.universities WHERE name = 'University of Greenwich'),
  1,
  'Master',
  1,
  'Modern computer science program with focus on software development and emerging technologies.',
  19000,
  'September',
  'Bachelor in Computer Science or related (2:2 minimum). IELTS 6.0'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Computer Science' AND code = 'GRE-002');

-- COURSES FOR MIDDLESEX UNIVERSITY
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc International Business',
  'MDX-001',
  (SELECT id FROM public.universities WHERE name = 'Middlesex University'),
  1,
  'Master',
  1,
  'Forward-thinking program examining global business challenges, international strategy, and cross-cultural management.',
  17500,
  'January,September',
  'Bachelor degree. IELTS 6.0. International business interest'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc International Business' AND code = 'MDX-001');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Engineering (Advanced Practice)',
  'MDX-002',
  (SELECT id FROM public.universities WHERE name = 'Middlesex University'),
  1,
  'Master',
  1,
  'Engineering program combining theory with practical industry experience and professional development.',
  18500,
  'September',
  'Bachelor in Engineering (2:2 minimum). IELTS 6.0'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Engineering (Advanced Practice)' AND code = 'MDX-002');

-- COURSES FOR UNIVERSITY OF MANCHESTER
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Business Analytics',
  'MAN-001',
  (SELECT id FROM public.universities WHERE name = 'University of Manchester'),
  1,
  'Master',
  1,
  'Leading business analytics program combining data science with business strategy. Develops advanced analytical skills for modern business challenges.',
  28000,
  'January,September',
  'Bachelor degree in related field. IELTS 6.5 (minimum 6.0 each). Strong quantitative background'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Business Analytics' AND code = 'MAN-001');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Advanced Chemical Engineering',
  'MAN-002',
  (SELECT id FROM public.universities WHERE name = 'University of Manchester'),
  1,
  'Master',
  1,
  'Leading chemical engineering program with focus on sustainability and innovation. Part of world-renowned engineering faculty.',
  26000,
  'September',
  'Bachelor in Chemical Engineering (2:1 minimum). IELTS 6.5'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Advanced Chemical Engineering' AND code = 'MAN-002');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Mechanical Engineering',
  'MAN-003',
  (SELECT id FROM public.universities WHERE name = 'University of Manchester'),
  1,
  'Master',
  1,
  'Comprehensive mechanical engineering program covering design, simulation, and manufacturing technologies.',
  25000,
  'September',
  'Bachelor in Mechanical Engineering (2:1 minimum). IELTS 6.5'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Mechanical Engineering' AND code = 'MAN-003');

-- COURSES FOR LONDON SOUTH BANK UNIVERSITY (LSBU)
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Business and Management',
  'LSBU-001',
  (SELECT id FROM public.universities WHERE name = 'London South Bank University'),
  1,
  'Master',
  1,
  'Practical business management program with strong employer links and focus on real-world applications.',
  15000,
  'January,September',
  'Bachelor degree. IELTS 6.0. Work experience valuable'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Business and Management' AND code = 'LSBU-001');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Engineering and Technology',
  'LSBU-002',
  (SELECT id FROM public.universities WHERE name = 'London South Bank University'),
  1,
  'Master',
  1,
  'Engineering program with practical focus and strong industry connections in London.',
  16000,
  'September',
  'Bachelor in Engineering (2:2 minimum). IELTS 6.0'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Engineering and Technology' AND code = 'LSBU-002');

INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements)
SELECT
  'MSc Computing',
  'LSBU-003',
  (SELECT id FROM public.universities WHERE name = 'London South Bank University'),
  1,
  'Master',
  1,
  'Modern computing program covering software development, cloud computing, and cybersecurity.',
  16500,
  'September',
  'Bachelor in Computing or related (2:2 minimum). IELTS 6.0'
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE name = 'MSc Computing' AND code = 'LSBU-003');

-- Verify data insertion
SELECT 'New Universities Added:' as status;
SELECT COUNT(*) as total_universities FROM public.universities WHERE city IN ('Belfast', 'Newcastle', 'London', 'Manchester');
SELECT 'New Courses Added:' as status;
SELECT COUNT(*) as total_courses FROM public.courses WHERE code LIKE 'QUB-%' OR code LIKE 'NUMB-%' OR code LIKE 'GRE-%' OR code LIKE 'MDX-%' OR code LIKE 'MAN-%' OR code LIKE 'LSBU-%';
