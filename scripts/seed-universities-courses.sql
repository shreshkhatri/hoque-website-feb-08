-- Insert Universities for United Kingdom (country_id: 1)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('University of Oxford', 'Oxford', 1, 'World-renowned institution with centuries of academic excellence', 1, 12000, 4, 'https://www.ox.ac.uk'),
('University of Cambridge', 'Cambridge', 1, 'Premier research university with exceptional teaching standards', 2, 11000, 3, 'https://www.cam.ac.uk'),
('London School of Economics', 'London', 1, 'Leading university for economics, business, and social sciences', 3, 8500, 27, 'https://www.lse.ac.uk'),
('Imperial College London', 'London', 1, 'Excellence in science, engineering, medicine and business', 4, 10000, 6, 'https://www.imperial.ac.uk'),
('University of Manchester', 'Manchester', 1, 'Innovative research university with strong industry connections', 5, 38000, 34, 'https://www.manchester.ac.uk'),
('University College London', 'London', 1, 'Leading multidisciplinary university in central London', 6, 42000, 8, 'https://www.ucl.ac.uk');

-- Insert Universities for Australia (country_id: 2)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('University of Melbourne', 'Melbourne', 2, 'Australia''s leading research university with global reputation', 1, 47000, 37, 'https://www.unimelb.edu.au'),
('University of Sydney', 'Sydney', 2, 'Historic university with excellence across all disciplines', 2, 50000, 54, 'https://www.sydney.edu.au'),
('University of New South Wales', 'Sydney', 2, 'Innovation-focused university with strong engineering programs', 3, 45000, 31, 'https://www.unsw.edu.au'),
('Australian National University', 'Canberra', 2, 'Premier research institution in Australia''s capital', 4, 14000, 30, 'https://www.anu.edu.au'),
('Monash University', 'Melbourne', 2, 'Comprehensive university with international perspective', 5, 73000, 42, 'https://www.monash.edu.au'),
('University of Queensland', 'Brisbane', 2, 'Leading research university in subtropical region', 6, 52000, 70, 'https://www.uq.edu.au');

-- Insert Universities for Canada (country_id: 4)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('University of Toronto', 'Toronto', 4, 'Canada''s leading research university', 1, 95000, 21, 'https://www.utoronto.ca'),
('University of British Columbia', 'Vancouver', 4, 'Highly ranked research institution in western Canada', 2, 68000, 34, 'https://www.ubc.ca'),
('McGill University', 'Montreal', 4, 'Prestigious university with strong international presence', 3, 42000, 57, 'https://www.mcgill.ca'),
('McMaster University', 'Hamilton', 4, 'Innovation hub with world-class research facilities', 4, 50000, 111, 'https://www.mcmaster.ca'),
('University of Alberta', 'Edmonton', 4, 'Leading research-intensive institution', 5, 53000, 110, 'https://www.ualberta.ca'),
('Western University', 'London', 4, 'Student-focused university with vibrant campus life', 6, 38000, 141, 'https://www.uwo.ca');

-- Insert Universities for Dubai (country_id: 7)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('University of Dubai', 'Dubai', 7, 'Private university focused on business and engineering', 1, 8000, null, 'https://www.ud.ac.ae'),
('American University in Dubai', 'Dubai', 7, 'Branch campus offering American education standards', 2, 2000, null, 'https://www.aud.edu'),
('Middlesex University Dubai', 'Dubai', 7, 'UK branch campus in Dubai Academic City', 3, 1500, null, 'https://www.mdx.ac.ae'),
('Heriot-Watt University Dubai', 'Dubai', 7, 'Scottish university branch with engineering focus', 4, 1800, null, 'https://www.hw-dubai.edu.ae'),
('BITS Pilani Dubai', 'Dubai', 7, 'Indian university branch with tech and engineering focus', 5, 1200, null, 'https://www.bits-dubai.ac.in'),
('Canadian University Dubai', 'Dubai', 7, 'Canadian-standard education in UAE', 6, 1600, null, 'https://www.cud.ac.ae');

-- Insert Universities for Ireland (country_id: 3)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('University of Dublin - Trinity College', 'Dublin', 3, 'Ireland''s oldest university with world-class reputation', 1, 17000, 81, 'https://www.tcd.ie'),
('University College Dublin', 'Dublin', 3, 'Leading research university in Ireland', 2, 30000, 154, 'https://www.ucd.ie'),
('University College Cork', 'Cork', 3, 'Ireland''s oldest university outside Dublin', 3, 20000, 251, 'https://www.ucc.ie'),
('National University of Ireland Galway', 'Galway', 4, 'Research-focused university on Ireland''s west coast', 4, 18000, 330, 'https://www.nuigalway.ie'),
('Dublin City University', 'Dublin', 3, 'Innovation-focused university with industry partnerships', 5, 14000, 501, 'https://www.dcu.ie'),
('Maynooth University', 'Maynooth', 3, 'Historic university focused on research and teaching', 6, 13000, 601, 'https://www.maynoothuniversity.ie');

-- Insert Universities for New Zealand (country_id: 5)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('University of Auckland', 'Auckland', 5, 'New Zealand''s leading research university', 1, 40000, 85, 'https://www.auckland.ac.nz'),
('University of Otago', 'Dunedin', 5, 'Historic university with strong research focus', 2, 20000, 217, 'https://www.otago.ac.nz'),
('University of Canterbury', 'Christchurch', 5, 'Engineering and sciences excellence', 3, 15000, 322, 'https://www.canterbury.ac.nz'),
('Massey University', 'Palmerston North', 5, 'Comprehensive university with distance learning options', 4, 33000, 334, 'https://www.massey.ac.nz'),
('Victoria University of Wellington', 'Wellington', 5, 'Research-intensive institution in New Zealand''s capital', 5, 20000, 275, 'https://www.victoria.ac.nz'),
('University of Waikato', 'Hamilton', 5, 'Innovation-focused with strong business programs', 6, 13000, 451, 'https://www.waikato.ac.nz');

-- Insert Universities for United States (country_id: 6)
INSERT INTO public.universities (name, city, country_id, description, ranking, student_count, world_rank, website) VALUES
('Harvard University', 'Cambridge', 6, 'World''s leading university with exceptional research', 1, 23000, 2, 'https://www.harvard.edu'),
('Stanford University', 'Stanford', 6, 'Innovation hub in Silicon Valley', 2, 18000, 5, 'https://www.stanford.edu'),
('Massachusetts Institute of Technology', 'Cambridge', 6, 'Premier engineering and technology university', 3, 11500, 1, 'https://www.mit.edu'),
('California Institute of Technology', 'Pasadena', 6, 'Small but mighty technology and research leader', 4, 1250, 9, 'https://www.caltech.edu'),
('Yale University', 'New Haven', 6, 'Ivy League institution with renowned programs', 5, 13000, 12, 'https://www.yale.edu'),
('University of Chicago', 'Chicago', 6, 'Research university with strong STEM and business focus', 6, 17000, 10, 'https://www.uchicago.edu');

-- Insert Courses for University of Oxford (university_id will be retrieved)
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  ('Master of Arts in Economics', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Master', 12, 'Economics', 'Advanced study in economic theory and policy'),
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Master', 12, 'Engineering', 'Comprehensive engineering program'),
  ('Bachelor of Science in Physics', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Undergraduate', 36, 'Physics', 'Fundamental and applied physics studies'),
  ('Master of Philosophy in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Master', 12, 'Computer Science', 'Advanced computer science research and practice'),
  ('Bachelor of Arts in Law', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Undergraduate', 36, 'Law', 'Comprehensive legal education'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Master', 24, 'Business', 'Executive business education'),
  ('Bachelor of Arts in History', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Undergraduate', 36, 'History', 'Historical studies and research'),
  ('Master of Science in Chemistry', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Master', 12, 'Chemistry', 'Advanced chemical sciences'),
  ('Bachelor of Science in Mathematics', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Undergraduate', 36, 'Mathematics', 'Pure and applied mathematics'),
  ('Master of Public Health', (SELECT id FROM public.universities WHERE name = 'University of Oxford'), 'Master', 12, 'Healthcare', 'Public health policy and practice')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for University of Cambridge
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  ('Master of Science in Biological Sciences', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Master', 12, 'Biological Sciences', 'Advanced biological research and applications'),
  ('Bachelor of Science in Natural Sciences', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Undergraduate', 36, 'Natural Sciences', 'Interdisciplinary natural science studies'),
  ('Master of Arts in Philosophy', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Master', 12, 'Philosophy', 'Advanced philosophical inquiry'),
  ('Bachelor of Arts in English', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Undergraduate', 36, 'English', 'Literary studies and analysis'),
  ('Master of Engineering in Information Technology', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Master', 12, 'Computer Science', 'IT engineering and applications'),
  ('Bachelor of Science in Geology', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Undergraduate', 36, 'Geology', 'Earth sciences and geology'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Master', 24, 'Business', 'Advanced business management'),
  ('Bachelor of Arts in Classics', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Undergraduate', 36, 'Classics', 'Ancient literature and history'),
  ('Master of Science in Economics', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Master', 12, 'Economics', 'Advanced economic analysis'),
  ('Bachelor of Science in Materials Science', (SELECT id FROM public.universities WHERE name = 'University of Cambridge'), 'Undergraduate', 36, 'Materials Science', 'Materials engineering and science')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for London School of Economics
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  ('Master of Science in Economics', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Master', 12, 'Economics', 'Advanced economic research and theory'),
  ('Master of Science in International Relations', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Master', 12, 'Social Sciences', 'Global politics and international affairs'),
  ('Bachelor of Science in Accounting and Finance', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Undergraduate', 36, 'Finance', 'Accounting principles and financial management'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Master', 24, 'Business', 'Top-tier executive education'),
  ('Master of Science in Law and Economics', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Master', 12, 'Law', 'Legal and economic analysis'),
  ('Bachelor of Science in Statistics', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Undergraduate', 36, 'Data Science', 'Statistical methods and applications'),
  ('Master of Science in Data Science', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Master', 12, 'Data Science', 'Big data analytics and science'),
  ('Bachelor of Science in Management', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Undergraduate', 36, 'Business', 'Business management fundamentals'),
  ('Master of Science in Sociology', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Master', 12, 'Social Sciences', 'Advanced sociological research'),
  ('Bachelor of Science in Psychology', (SELECT id FROM public.universities WHERE name = 'London School of Economics'), 'Undergraduate', 36, 'Psychology', 'Psychological science and behavior')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for Imperial College London
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  ('Master of Science in Artificial Intelligence', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Master', 12, 'Computer Science', 'Advanced AI and machine learning'),
  ('Bachelor of Science in Chemical Engineering', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Undergraduate', 36, 'Engineering', 'Industrial chemical processes'),
  ('Master of Science in Mechanical Engineering', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Master', 12, 'Engineering', 'Advanced mechanical design and analysis'),
  ('Bachelor of Science in Biomedical Sciences', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Undergraduate', 36, 'Healthcare', 'Medical science and biotechnology'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Master', 24, 'Business', 'Executive STEM-focused MBA'),
  ('Bachelor of Science in Physics', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Undergraduate', 36, 'Physics', 'Theoretical and experimental physics'),
  ('Master of Science in Environmental Engineering', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Master', 12, 'Engineering', 'Sustainable engineering solutions'),
  ('Bachelor of Science in Mathematics', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Undergraduate', 36, 'Mathematics', 'Pure and applied mathematics'),
  ('Master of Science in Nanotechnology', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Master', 12, 'Materials Science', 'Nanoscale science and engineering'),
  ('Bachelor of Science in Geology', (SELECT id FROM public.universities WHERE name = 'Imperial College London'), 'Undergraduate', 36, 'Geology', 'Earth sciences and geophysics')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for University of Manchester
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  ('Master of Science in Business Analytics', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Master', 12, 'Data Science', 'Business intelligence and analytics'),
  ('Bachelor of Science in Aerospace Engineering', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Undergraduate', 36, 'Engineering', 'Aircraft and spacecraft design'),
  ('Master of Science in Advanced Manufacturing', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Master', 12, 'Engineering', 'Modern manufacturing technologies'),
  ('Bachelor of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Undergraduate', 36, 'Computer Science', 'Software and computational systems'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Master', 24, 'Business', 'Professional MBA program'),
  ('Bachelor of Science in Chemistry', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Undergraduate', 36, 'Chemistry', 'Chemical science and synthesis'),
  ('Master of Science in Renewable Energy', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Master', 12, 'Engineering', 'Sustainable energy technologies'),
  ('Bachelor of Arts in English Literature', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Undergraduate', 36, 'English', 'Literary analysis and theory'),
  ('Master of Science in Psychology', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Master', 12, 'Psychology', 'Applied psychology research'),
  ('Bachelor of Science in Pharmacology', (SELECT id FROM public.universities WHERE name = 'University of Manchester'), 'Undergraduate', 36, 'Healthcare', 'Drug development and therapy')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for University College London
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  ('Master of Science in Machine Learning', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Master', 12, 'Computer Science', 'Advanced machine learning techniques'),
  ('Bachelor of Science in Medicine', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Undergraduate', 60, 'Healthcare', 'Medical degree program'),
  ('Master of Science in Urban Planning', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Master', 12, 'Social Sciences', 'City planning and development'),
  ('Bachelor of Science in Physics', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Undergraduate', 36, 'Physics', 'Physical sciences research'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Master', 24, 'Business', 'Top-tier business education'),
  ('Bachelor of Arts in Law', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Undergraduate', 36, 'Law', 'Common law and legal systems'),
  ('Master of Science in Architectural Design', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Master', 24, 'Architecture', 'Advanced architectural practices'),
  ('Bachelor of Science in Neuroscience', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Undergraduate', 36, 'Biological Sciences', 'Brain and nervous system studies'),
  ('Master of Science in Finance', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Master', 12, 'Finance', 'Financial markets and instruments'),
  ('Bachelor of Arts in Business Economics', (SELECT id FROM public.universities WHERE name = 'University College London'), 'Undergraduate', 36, 'Economics', 'Applied economic principles')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for Australian Universities
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  -- University of Melbourne
  ('Master of Science in Data Science', (SELECT id FROM public.universities WHERE name = 'University of Melbourne'), 'Master', 12, 'Data Science', 'Advanced data analytics and science'),
  ('Bachelor of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'University of Melbourne'), 'Undergraduate', 36, 'Engineering', 'Comprehensive engineering education'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Melbourne'), 'Master', 24, 'Business', 'World-class MBA program'),
  
  -- University of Sydney
  ('Master of Science in Business', (SELECT id FROM public.universities WHERE name = 'University of Sydney'), 'Master', 12, 'Business', 'Advanced business studies'),
  ('Bachelor of Science in Medicine', (SELECT id FROM public.universities WHERE name = 'University of Sydney'), 'Undergraduate', 60, 'Healthcare', 'Medical science program'),
  ('Master of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'University of Sydney'), 'Master', 12, 'Engineering', 'Advanced engineering specialization'),
  
  -- UNSW Sydney
  ('Master of Science in Artificial Intelligence', (SELECT id FROM public.universities WHERE name = 'University of New South Wales'), 'Master', 12, 'Computer Science', 'AI and machine learning research'),
  ('Bachelor of Science in IT', (SELECT id FROM public.universities WHERE name = 'University of New South Wales'), 'Undergraduate', 36, 'Computer Science', 'Information technology fundamentals'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of New South Wales'), 'Master', 24, 'Business', 'Professional MBA'),
  
  -- ANU
  ('Master of Science in Environmental Science', (SELECT id FROM public.universities WHERE name = 'Australian National University'), 'Master', 12, 'Environmental Science', 'Sustainability and environment'),
  ('Bachelor of Science in Physics', (SELECT id FROM public.universities WHERE name = 'Australian National University'), 'Undergraduate', 36, 'Physics', 'Advanced physics studies'),
  ('Master of International Relations', (SELECT id FROM public.universities WHERE name = 'Australian National University'), 'Master', 12, 'Social Sciences', 'Global affairs and diplomacy'),
  
  -- Monash
  ('Master of Science in IT', (SELECT id FROM public.universities WHERE name = 'Monash University'), 'Master', 12, 'Computer Science', 'Information technology advanced'),
  ('Bachelor of Engineering', (SELECT id FROM public.universities WHERE name = 'Monash University'), 'Undergraduate', 36, 'Engineering', 'Engineering fundamentals'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Monash University'), 'Master', 24, 'Business', 'Professional business MBA'),
  
  -- UQ
  ('Master of Science in Chemistry', (SELECT id FROM public.universities WHERE name = 'University of Queensland'), 'Master', 12, 'Chemistry', 'Advanced chemistry research'),
  ('Bachelor of Science in Marine Science', (SELECT id FROM public.universities WHERE name = 'University of Queensland'), 'Undergraduate', 36, 'Biological Sciences', 'Ocean and marine studies')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for Canadian Universities
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  -- University of Toronto
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Toronto'), 'Master', 24, 'Business', 'Top-tier Canadian MBA'),
  ('Bachelor of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'University of Toronto'), 'Undergraduate', 36, 'Engineering', 'Engineering specializations'),
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of Toronto'), 'Master', 12, 'Computer Science', 'Advanced CS research'),
  
  -- UBC
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of British Columbia'), 'Master', 24, 'Business', 'Sauder MBA program'),
  ('Bachelor of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of British Columbia'), 'Undergraduate', 36, 'Computer Science', 'CS fundamentals and practice'),
  ('Master of Science in Environmental Science', (SELECT id FROM public.universities WHERE name = 'University of British Columbia'), 'Master', 12, 'Environmental Science', 'Sustainability research'),
  
  -- McGill
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'McGill University'), 'Master', 24, 'Business', 'Desautels MBA program'),
  ('Bachelor of Engineering', (SELECT id FROM public.universities WHERE name = 'McGill University'), 'Undergraduate', 36, 'Engineering', 'Engineering disciplines'),
  ('Master of Science in Medicine', (SELECT id FROM public.universities WHERE name = 'McGill University'), 'Master', 24, 'Healthcare', 'Medical research program'),
  
  -- McMaster
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'McMaster University'), 'Master', 24, 'Business', 'DeGroote MBA'),
  ('Bachelor of Science in Genetics', (SELECT id FROM public.universities WHERE name = 'McMaster University'), 'Undergraduate', 36, 'Biological Sciences', 'Genetics and genomics'),
  ('Master of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'McMaster University'), 'Master', 12, 'Engineering', 'Engineering research'),
  
  -- University of Alberta
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Alberta'), 'Master', 24, 'Business', 'Asper MBA program'),
  ('Bachelor of Science in Software Engineering', (SELECT id FROM public.universities WHERE name = 'University of Alberta'), 'Undergraduate', 36, 'Computer Science', 'Software development'),
  ('Master of Science in Nanotechnology', (SELECT id FROM public.universities WHERE name = 'University of Alberta'), 'Master', 12, 'Materials Science', 'Nanotech research'),
  
  -- Western
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Western University'), 'Master', 24, 'Business', 'Ivey MBA program'),
  ('Bachelor of Arts in Economics', (SELECT id FROM public.universities WHERE name = 'Western University'), 'Undergraduate', 36, 'Economics', 'Economics studies')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for Dubai Universities
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  -- University of Dubai
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Dubai'), 'Master', 24, 'Business', 'Professional MBA'),
  ('Bachelor of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Dubai'), 'Undergraduate', 36, 'Business', 'Business fundamentals'),
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'University of Dubai'), 'Master', 12, 'Engineering', 'Engineering specializations'),
  
  -- AUD
  ('Bachelor of Business Administration', (SELECT id FROM public.universities WHERE name = 'American University in Dubai'), 'Undergraduate', 36, 'Business', 'American-style business education'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'American University in Dubai'), 'Master', 24, 'Business', 'Professional MBA'),
  ('Bachelor of Engineering', (SELECT id FROM public.universities WHERE name = 'American University in Dubai'), 'Undergraduate', 36, 'Engineering', 'Engineering programs'),
  
  -- Middlesex Dubai
  ('Bachelor of Business', (SELECT id FROM public.universities WHERE name = 'Middlesex University Dubai'), 'Undergraduate', 36, 'Business', 'UK-standard business'),
  ('Master of Science in Computing', (SELECT id FROM public.universities WHERE name = 'Middlesex University Dubai'), 'Master', 12, 'Computer Science', 'Computing and IT'),
  
  -- Heriot-Watt Dubai
  ('Bachelor of Engineering', (SELECT id FROM public.universities WHERE name = 'Heriot-Watt University Dubai'), 'Undergraduate', 36, 'Engineering', 'Scottish engineering'),
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'Heriot-Watt University Dubai'), 'Master', 12, 'Engineering', 'Advanced engineering'),
  
  -- BITS Pilani Dubai
  ('Bachelor of Technology', (SELECT id FROM public.universities WHERE name = 'BITS Pilani Dubai'), 'Undergraduate', 36, 'Computer Science', 'Tech-focused education'),
  ('Master of Technology', (SELECT id FROM public.universities WHERE name = 'BITS Pilani Dubai'), 'Master', 12, 'Computer Science', 'Advanced tech studies'),
  
  -- Canadian University Dubai
  ('Bachelor of Business Administration', (SELECT id FROM public.universities WHERE name = 'Canadian University Dubai'), 'Undergraduate', 36, 'Business', 'Canadian business education'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Canadian University Dubai'), 'Master', 24, 'Business', 'Professional MBA')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for Irish Universities
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  -- Trinity College Dublin
  ('Master of Business Studies', (SELECT id FROM public.universities WHERE name = 'University of Dublin - Trinity College'), 'Master', 12, 'Business', 'Advanced business studies'),
  ('Bachelor of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of Dublin - Trinity College'), 'Undergraduate', 36, 'Computer Science', 'CS fundamentals'),
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'University of Dublin - Trinity College'), 'Master', 12, 'Engineering', 'Engineering specialization'),
  
  -- UCD
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University College Dublin'), 'Master', 24, 'Business', 'Michael Smurfit MBA'),
  ('Bachelor of Science in Business', (SELECT id FROM public.universities WHERE name = 'University College Dublin'), 'Undergraduate', 36, 'Business', 'Business fundamentals'),
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University College Dublin'), 'Master', 12, 'Computer Science', 'Advanced CS'),
  
  -- UCC
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'University College Cork'), 'Master', 12, 'Engineering', 'Engineering programs'),
  ('Bachelor of Arts in Commerce', (SELECT id FROM public.universities WHERE name = 'University College Cork'), 'Undergraduate', 36, 'Business', 'Commerce and business'),
  ('Master of Science in Nursing', (SELECT id FROM public.universities WHERE name = 'University College Cork'), 'Master', 12, 'Healthcare', 'Advanced nursing'),
  
  -- NUIG
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'National University of Ireland Galway'), 'Master', 24, 'Business', 'Professional MBA'),
  ('Bachelor of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'National University of Ireland Galway'), 'Undergraduate', 36, 'Engineering', 'Engineering education'),
  
  -- DCU
  ('Master of Science in Computing', (SELECT id FROM public.universities WHERE name = 'Dublin City University'), 'Master', 12, 'Computer Science', 'Advanced computing'),
  ('Bachelor of Engineering', (SELECT id FROM public.universities WHERE name = 'Dublin City University'), 'Undergraduate', 36, 'Engineering', 'Engineering disciplines'),
  
  -- Maynooth
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'Maynooth University'), 'Master', 12, 'Computer Science', 'Advanced CS research'),
  ('Bachelor of Science in Physics', (SELECT id FROM public.universities WHERE name = 'Maynooth University'), 'Undergraduate', 36, 'Physics', 'Physics studies')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for New Zealand Universities
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  -- Auckland
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Auckland'), 'Master', 24, 'Business', 'Auckland Business School MBA'),
  ('Bachelor of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'University of Auckland'), 'Undergraduate', 36, 'Engineering', 'Engineering specializations'),
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of Auckland'), 'Master', 12, 'Computer Science', 'Advanced CS'),
  
  -- Otago
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Otago'), 'Master', 24, 'Business', 'Otago MBA program'),
  ('Bachelor of Science in Medicine', (SELECT id FROM public.universities WHERE name = 'University of Otago'), 'Undergraduate', 60, 'Healthcare', 'Medical degree'),
  ('Master of Science in Dentistry', (SELECT id FROM public.universities WHERE name = 'University of Otago'), 'Master', 24, 'Healthcare', 'Advanced dentistry'),
  
  -- Canterbury
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'University of Canterbury'), 'Master', 12, 'Engineering', 'Engineering research'),
  ('Bachelor of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'University of Canterbury'), 'Undergraduate', 36, 'Computer Science', 'CS fundamentals'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Canterbury'), 'Master', 24, 'Business', 'Professional MBA'),
  
  -- Massey
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Massey University'), 'Master', 24, 'Business', 'Massey MBA program'),
  ('Bachelor of Science in Agriculture', (SELECT id FROM public.universities WHERE name = 'Massey University'), 'Undergraduate', 36, 'Agricultural Science', 'Agriculture studies'),
  ('Master of Science in Veterinary Science', (SELECT id FROM public.universities WHERE name = 'Massey University'), 'Master', 24, 'Healthcare', 'Veterinary studies'),
  
  -- Victoria
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Victoria University of Wellington'), 'Master', 24, 'Business', 'Victoria MBA program'),
  ('Bachelor of Science in Physics', (SELECT id FROM public.universities WHERE name = 'Victoria University of Wellington'), 'Undergraduate', 36, 'Physics', 'Physics education'),
  ('Master of Science in Psychology', (SELECT id FROM public.universities WHERE name = 'Victoria University of Wellington'), 'Master', 12, 'Psychology', 'Advanced psychology'),
  
  -- Waikato
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Waikato'), 'Master', 24, 'Business', 'Waikato MBA program'),
  ('Bachelor of Engineering', (SELECT id FROM public.universities WHERE name = 'University of Waikato'), 'Undergraduate', 36, 'Engineering', 'Engineering programs')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert Courses for US Universities
INSERT INTO public.courses (name, university_id, level, duration_months, field, description) 
SELECT name, id, level, duration_months, field, description 
FROM (VALUES
  -- Harvard
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Harvard University'), 'Master', 24, 'Business', 'Harvard Business School MBA'),
  ('Master of Public Health', (SELECT id FROM public.universities WHERE name = 'Harvard University'), 'Master', 12, 'Healthcare', 'Advanced public health'),
  ('PhD in Computer Science', (SELECT id FROM public.universities WHERE name = 'Harvard University'), 'Doctorate', 48, 'Computer Science', 'Research doctorate program'),
  
  -- Stanford
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Stanford University'), 'Master', 24, 'Business', 'Stanford GSB MBA'),
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'Stanford University'), 'Master', 12, 'Computer Science', 'Advanced CS'),
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'Stanford University'), 'Master', 12, 'Engineering', 'Engineering specialization'),
  
  -- MIT
  ('Master of Engineering', (SELECT id FROM public.universities WHERE name = 'Massachusetts Institute of Technology'), 'Master', 12, 'Engineering', 'Advanced engineering'),
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'Massachusetts Institute of Technology'), 'Master', 12, 'Computer Science', 'MIT Computer Science'),
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Massachusetts Institute of Technology'), 'Master', 24, 'Business', 'Sloan MBA program'),
  
  -- Caltech
  ('PhD in Physics', (SELECT id FROM public.universities WHERE name = 'California Institute of Technology'), 'Doctorate', 48, 'Physics', 'Physics research doctorate'),
  ('Master of Science in Engineering', (SELECT id FROM public.universities WHERE name = 'California Institute of Technology'), 'Master', 12, 'Engineering', 'Advanced engineering'),
  ('PhD in Chemistry', (SELECT id FROM public.universities WHERE name = 'California Institute of Technology'), 'Doctorate', 48, 'Chemistry', 'Chemistry research doctorate'),
  
  -- Yale
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'Yale University'), 'Master', 24, 'Business', 'Yale School of Management MBA'),
  ('Master of Public Health', (SELECT id FROM public.universities WHERE name = 'Yale University'), 'Master', 12, 'Healthcare', 'Advanced public health'),
  ('Master of Science in Computer Science', (SELECT id FROM public.universities WHERE name = 'Yale University'), 'Master', 12, 'Computer Science', 'Advanced CS'),
  
  -- Chicago
  ('Master of Business Administration', (SELECT id FROM public.universities WHERE name = 'University of Chicago'), 'Master', 24, 'Business', 'Booth Business School MBA'),
  ('Master of Science in Data Science', (SELECT id FROM public.universities WHERE name = 'University of Chicago'), 'Master', 12, 'Data Science', 'Advanced data science'),
  ('Master of Public Policy', (SELECT id FROM public.universities WHERE name = 'University of Chicago'), 'Master', 12, 'Social Sciences', 'Public policy studies')
) AS t(name, university_id, level, duration_months, field, description);

-- Insert intake months for all courses (January and September)
INSERT INTO public.course_intake_months (course_id, month)
SELECT id, 'January' FROM public.courses WHERE id >= 1
UNION ALL
SELECT id, 'September' FROM public.courses WHERE id >= 1
ON CONFLICT (course_id, month) DO NOTHING;
