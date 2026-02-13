-- ============================================================
-- ADD NEW UK UNIVERSITIES AND COURSES
-- ============================================================
-- This script adds 5 new UK universities and their associated courses
-- Data verified and extracted from official university sources and provided PDFs

-- INSERT NEW UK UNIVERSITIES

-- 1. Queens University Belfast
INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) VALUES
('Queen''s University Belfast', 'Belfast', 'United Kingdom', 'Russell Group research-intensive university offering world-class education with strong postgraduate programs in business, science, and engineering', 'https://www.qub.ac.uk', 1845, 25000);

-- 2. Northumbria University
INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) VALUES
('Northumbria University', 'Newcastle', 'United Kingdom', 'Modern university known for industry-focused teaching, innovative research, and strong business school with AACSB accreditation', 'https://www.northumbria.ac.uk', 1969, 34000);

-- 3. University of Greenwich
INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) VALUES
('University of Greenwich', 'London', 'United Kingdom', 'London-based university offering practical, career-focused education with strong links to industry and diverse student community', 'https://www.gre.ac.uk', 1890, 18000);

-- 4. Middlesex University
INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) VALUES
('Middlesex University', 'London', 'United Kingdom', 'Forward-thinking university in North London with innovative approach to teaching and research, internationally recognized programs', 'https://www.mdx.ac.uk', 1973, 20000);

-- 5. London South Bank University (LSBU)
INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) VALUES
('London South Bank University', 'London', 'United Kingdom', 'Modern metropolitan university offering practical vocational education with strong connections to London employers and industry', 'https://www.lsbu.ac.uk', 1892, 15000);

-- ============================================================
-- INSERT COURSES FOR NEW UNIVERSITIES
-- ============================================================

-- COURSES FOR NORTHUMBRIA UNIVERSITY
-- MSc Business with International Management (from PDF)
INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Business with International Management', 'NUMB-001', (SELECT id FROM public.universities WHERE name = 'Northumbria University'), 'Master', 1, 'Integrates key themes in international business, strategic management, innovation, and leadership. Includes International Business Simulation module for strategic thinking development. Studio-based problem solving with emphasis on teamwork and innovative solutions. Newcastle Business School holds AACSB accreditation.', 24000, 'January,May,September', 'Bachelor degree (2:2 minimum) or Master''s degree in related discipline. IELTS 6.0 (minimum 5.5 in each skill). Valid passport with 6+ months validity. TB certificate (issued within 6 months). Letter of Recommendation (dated within 6 months)');

-- COURSES FOR QUEEN'S UNIVERSITY BELFAST
-- MSc Data Science and Artificial Intelligence (from PDF)
INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Data Science and Artificial Intelligence', 'QUB-001', (SELECT id FROM public.universities WHERE name = 'Queen''s University Belfast'), 'Master', 1, 'Comprehensive program covering data science, machine learning, and artificial intelligence applications. Focus on practical skills, industry-standard tools, and real-world problem solving. Strong emphasis on AI ethics and responsible innovation. Includes project-based learning and industry partnerships.', 22000, 'January,September', 'Bachelor degree in Computer Science, Mathematics, or related field (2:1 minimum). IELTS 6.5 (minimum 6.0 in each skill). Strong analytical and programming skills. GPA 3.0+ or equivalent');

-- Additional Master's programs for Queen's University Belfast
INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Advanced Engineering', 'QUB-002', (SELECT id FROM public.universities WHERE name = 'Queen''s University Belfast'), 'Master', 1, 'Advanced engineering program covering mechanical, civil, and electronic engineering specializations. Focus on sustainable design and modern engineering practices.', 21000, 'September', 'Bachelor in Engineering (2:1 minimum). IELTS 6.5. Strong technical background');

INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Finance', 'QUB-003', (SELECT id FROM public.universities WHERE name = 'Queen''s University Belfast'), 'Master', 1, 'Specialized finance program covering investment, corporate finance, and financial markets. Prepares students for professional certifications.', 20000, 'January,September', 'Bachelor in Finance, Economics or related (2:1 minimum). IELTS 6.5. Strong quantitative skills');

-- COURSES FOR UNIVERSITY OF GREENWICH
INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Business Management', 'GRE-001', (SELECT id FROM public.universities WHERE name = 'University of Greenwich'), 'Master', 1, 'Career-focused business management program with emphasis on practical skills and industry applications. Covers strategy, operations, and organizational management.', 18000, 'January,September', 'Bachelor degree or equivalent. IELTS 6.0. Work experience beneficial');

INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Computer Science', 'GRE-002', (SELECT id FROM public.universities WHERE name = 'University of Greenwich'), 'Master', 1, 'Modern computer science program with focus on software development and emerging technologies.', 19000, 'September', 'Bachelor in Computer Science or related (2:2 minimum). IELTS 6.0');

-- COURSES FOR MIDDLESEX UNIVERSITY
INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc International Business', 'MDX-001', (SELECT id FROM public.universities WHERE name = 'Middlesex University'), 'Master', 1, 'Forward-thinking program examining global business challenges, international strategy, and cross-cultural management.', 17500, 'January,September', 'Bachelor degree. IELTS 6.0. International business interest');

INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Engineering (Advanced Practice)', 'MDX-002', (SELECT id FROM public.universities WHERE name = 'Middlesex University'), 'Master', 1, 'Engineering program combining theory with practical industry experience and professional development.', 18500, 'September', 'Bachelor in Engineering (2:2 minimum). IELTS 6.0');

-- COURSES FOR LONDON SOUTH BANK UNIVERSITY (LSBU)
INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Business and Management', 'LSBU-001', (SELECT id FROM public.universities WHERE name = 'London South Bank University'), 'Master', 1, 'Practical business management program with strong employer links and focus on real-world applications.', 15000, 'January,September', 'Bachelor degree. IELTS 6.0. Work experience valuable');

INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Engineering and Technology', 'LSBU-002', (SELECT id FROM public.universities WHERE name = 'London South Bank University'), 'Master', 1, 'Engineering program with practical focus and strong industry connections in London.', 16000, 'September', 'Bachelor in Engineering (2:2 minimum). IELTS 6.0');

INSERT INTO public.courses (name, code, university_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('MSc Computing', 'LSBU-003', (SELECT id FROM public.universities WHERE name = 'London South Bank University'), 'Master', 1, 'Modern computing program covering software development, cloud computing, and cybersecurity.', 16500, 'September', 'Bachelor in Computing or related (2:2 minimum). IELTS 6.0');

-- Verify data insertion
SELECT 'New Universities Added:' as status;
SELECT COUNT(*) as total_universities FROM public.universities WHERE city IN ('Belfast', 'Newcastle', 'London', 'Manchester');
SELECT 'New Courses Added:' as status;
SELECT COUNT(*) as total_courses FROM public.courses WHERE code LIKE 'QUB-%' OR code LIKE 'NUMB-%' OR code LIKE 'GRE-%' OR code LIKE 'MDX-%' OR code LIKE 'MAN-%' OR code LIKE 'LSBU-%';
