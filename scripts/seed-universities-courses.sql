-- ============================================================
-- SEED UNIVERSITIES AND COURSES FOR ALL COUNTRIES
-- ============================================================

-- INSERT UNIVERSITIES FOR UNITED KINGDOM (country_id: 1)
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('University of Oxford', 'Oxford', 1, 'World-renowned institution with centuries of academic excellence and leading research', 12000, 4, 'https://www.ox.ac.uk'),
('University of Cambridge', 'Cambridge', 1, 'Premier research university with exceptional teaching standards and historic prestige', 11000, 3, 'https://www.cam.ac.uk'),
('London School of Economics', 'London', 1, 'Leading university for economics, business, and social sciences with global reputation', 8500, 27, 'https://www.lse.ac.uk'),
('Imperial College London', 'London', 1, 'Excellence in science, engineering, medicine and business with cutting-edge research', 10000, 6, 'https://www.imperial.ac.uk'),
('University of Manchester', 'Manchester', 1, 'Innovative research university with strong industry connections and comprehensive programs', 38000, 34, 'https://www.manchester.ac.uk'),
('University College London', 'London', 1, 'Leading multidisciplinary university in central London with global reach', 42000, 8, 'https://www.ucl.ac.uk');

-- INSERT COURSES FOR UK UNIVERSITIES
-- University of Oxford Courses
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('Master of Science in Computer Science', 'OXCS001', 1, 1, 'Master', 1, 'Advanced computer science with focus on AI and machine learning', 45000, 'January,September', 'Bachelor in Computer Science or related field, IELTS 7.0+'),
('Master of Business Administration', 'OXMBA001', 1, 1, 'Master', 1, 'Premier MBA program with global perspectives and industry partnerships', 75000, 'September', 'Bachelor degree, 3+ years work experience, GMAT/GRE'),
('Master of Engineering in Civil Engineering', 'OXCE001', 1, 1, 'Master', 2, 'Comprehensive civil engineering with infrastructure focus', 50000, 'September', 'Bachelor in Engineering, IELTS 7.0+'),
('Master of Arts in Economics', 'OXEC001', 1, 1, 'Master', 1, 'Advanced economic theory and research methods', 42000, 'January,September', 'Bachelor in Economics or related field, IELTS 7.0+'),
('Master of Science in Psychology', 'OXPS001', 1, 1, 'Master', 1, 'Research-focused psychology program with neuroscience specialization', 40000, 'September', 'Bachelor in Psychology, IELTS 7.0+'),
('Master of Science in Physics', 'OXPH001', 1, 1, 'Master', 1, 'Theoretical and experimental physics at cutting edge', 43000, 'January,September', 'Bachelor in Physics or Mathematics, IELTS 7.0+'),
('Master of Science in Biochemistry', 'OXBIO001', 1, 1, 'Master', 1, 'Molecular biology and biochemistry research', 41000, 'September', 'Bachelor in Biochemistry or related, IELTS 7.0+'),
('Master of Law', 'OXLAW001', 1, 1, 'Master', 1, 'Advanced legal studies and jurisprudence', 44000, 'September', 'Bachelor in Law, IELTS 7.0+'),
('Master of Arts in History', 'OXHIST001', 1, 1, 'Master', 1, 'Historical research and analysis', 38000, 'January,September', 'Bachelor in History or related, IELTS 7.0+'),
('Master of Science in Environmental Science', 'OXENV001', 1, 1, 'Master', 1, 'Environmental research and sustainability', 39000, 'January,September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Arts in Philosophy', 'OXPH002', 1, 1, 'Master', 1, 'Advanced philosophical inquiry and ethics', 37000, 'January,September', 'Bachelor in Philosophy, IELTS 7.0+'),
('Master of Science in Chemistry', 'OXCH001', 1, 1, 'Master', 1, 'Advanced chemical sciences and research', 42000, 'January,September', 'Bachelor in Chemistry, IELTS 7.0+'),
('Master of Science in Mathematics', 'OXMA001', 1, 1, 'Master', 1, 'Pure and applied mathematics research', 40000, 'September', 'Bachelor in Mathematics, IELTS 7.0+'),
('Master of Medicine', 'OXMD001', 1, 1, 'Master', 3, 'Advanced medical training and research', 65000, 'September', 'Bachelor in Medicine or related, IELTS 7.5+'),
('Master of Public Health', 'OXPH003', 1, 1, 'Master', 1, 'Public health policy and practice', 41000, 'January,September', 'Bachelor degree, IELTS 7.0+');

-- University of Cambridge Courses
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('Master of Science in Physics', 'CAMPH001', 2, 1, 'Master', 1, 'Theoretical and experimental physics at cutting edge of research', 48000, 'January,September', 'Bachelor in Physics or Mathematics, IELTS 7.0+'),
('Master of Medicine', 'CAMMD001', 2, 1, 'Master', 3, 'Advanced medical training with clinical practice', 65000, 'September', 'Bachelor in Medicine or related field, IELTS 7.5+'),
('Master of Philosophy in Biological Sciences', 'CAMBIO001', 2, 1, 'Master', 1, 'Cutting-edge biological sciences research program', 44000, 'September', 'Bachelor in Biological Sciences, IELTS 7.0+'),
('Master of Science in Engineering', 'CAMENG001', 2, 1, 'Master', 1, 'Interdisciplinary engineering program with specializations', 46000, 'January,September', 'Bachelor in Engineering, IELTS 7.0+'),
('Master of Law', 'CAMLAW001', 2, 1, 'Master', 1, 'Advanced legal studies with international law focus', 43000, 'September', 'Bachelor in Law or related field, IELTS 7.0+'),
('Master of Science in Computer Science', 'CAMCS001', 2, 1, 'Master', 1, 'Advanced computer science and artificial intelligence', 47000, 'January,September', 'Bachelor in CS or related, IELTS 7.0+'),
('Master of Business Administration', 'CAMBMBA001', 2, 1, 'Master', 2, 'Executive MBA with global perspective', 72000, 'September', 'Bachelor degree, 2+ years experience, GMAT'),
('Master of Arts in Economics', 'CAMEC001', 2, 1, 'Master', 1, 'Advanced economic theory and applications', 45000, 'January,September', 'Bachelor in Economics, IELTS 7.0+'),
('Master of Science in Chemistry', 'CAMCH001', 2, 1, 'Master', 1, 'Advanced chemical research and theory', 44000, 'September', 'Bachelor in Chemistry, IELTS 7.0+'),
('Master of Arts in History', 'CAMHIST001', 2, 1, 'Master', 1, 'Historical research and archival studies', 40000, 'January,September', 'Bachelor in History, IELTS 7.0+'),
('Master of Science in Environmental Studies', 'CAMENV001', 2, 1, 'Master', 1, 'Environmental science and sustainability', 42000, 'January,September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Arts in Philosophy', 'CAMPH002', 2, 1, 'Master', 1, 'Philosophical research and critical inquiry', 39000, 'January,September', 'Bachelor in Philosophy, IELTS 7.0+'),
('Master of Finance', 'CAMFI001', 2, 1, 'Master', 1, 'Financial theory and applications', 46000, 'September', 'Bachelor in Finance or Economics, IELTS 7.0+'),
('Master of Science in Psychology', 'CAMPSYCH001', 2, 1, 'Master', 1, 'Psychology research and cognitive science', 43000, 'January,September', 'Bachelor in Psychology, IELTS 7.0+'),
('Master of Arts in English', 'CAMENG002', 2, 1, 'Master', 1, 'English literature and language studies', 38000, 'January,September', 'Bachelor in English, IELTS 7.0+');

-- London School of Economics Courses
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('Master of Science in Data Science', 'LSEDS001', 3, 1, 'Master', 1, 'Data science and analytics with business applications', 39000, 'January,September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Science in Finance', 'LSEFIN001', 3, 1, 'Master', 1, 'Financial markets, investment management and corporate finance', 42000, 'September', 'Bachelor in Finance or Economics, IELTS 7.0+'),
('Master of Science in Management', 'LSEMGT001', 3, 1, 'Master', 1, 'Strategic management and organizational leadership', 38000, 'September', 'Bachelor degree, IELTS 7.0+'),
('Master of Science in Economics', 'LSEEC001', 3, 1, 'Master', 1, 'Advanced macroeconomics and microeconomics', 40000, 'January,September', 'Bachelor in Economics, IELTS 7.0+'),
('Master of Business Administration', 'LSEMBA001', 3, 1, 'Master', 2, 'Top-tier MBA program with global network', 68000, 'September', 'Bachelor degree, 3+ years experience, GMAT'),
('Master of Science in International Relations', 'LSEIR001', 3, 1, 'Master', 1, 'International politics and diplomacy', 37000, 'January,September', 'Bachelor degree, IELTS 7.0+'),
('Master of Law', 'LSELAW001', 3, 1, 'Master', 1, 'Advanced legal studies and international law', 41000, 'September', 'Bachelor in Law, IELTS 7.0+'),
('Master of Science in Psychology', 'LSEPSY001', 3, 1, 'Master', 1, 'Applied psychology research', 36000, 'January,September', 'Bachelor in Psychology, IELTS 7.0+'),
('Master of Science in Sociology', 'LSESOC001', 3, 1, 'Master', 1, 'Social science research methodology', 35000, 'January,September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Science in Accounting', 'LSEACC001', 3, 1, 'Master', 1, 'Accounting theory and professional practice', 40000, 'September', 'Bachelor in Accounting or related, IELTS 7.0+'),
('Master of Arts in History', 'LSEHIST001', 3, 1, 'Master', 1, 'Historical research and analysis', 36000, 'January,September', 'Bachelor in History, IELTS 7.0+'),
('Master of Science in Environment and Development', 'LSEENV001', 3, 1, 'Master', 1, 'Environmental policy and sustainability', 38000, 'January,September', 'Bachelor degree, IELTS 7.0+'),
('Master of Science in Global Politics', 'LSEGP001', 3, 1, 'Master', 1, 'Global political systems and governance', 37000, 'January,September', 'Bachelor degree, IELTS 7.0+'),
('Master of Science in Philosophy', 'LSEPH001', 3, 1, 'Master', 1, 'Advanced philosophical research', 34000, 'January,September', 'Bachelor in Philosophy, IELTS 7.0+'),
('Master of Arts in Communication', 'LSECOM001', 3, 1, 'Master', 1, 'Media and communication studies', 35000, 'January,September', 'Bachelor degree, IELTS 7.0+');

-- Imperial College London Courses
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('Master of Science in Artificial Intelligence', 'IMPAI001', 4, 1, 'Master', 1, 'Machine learning, deep learning and AI applications', 50000, 'January,September', 'Bachelor in Computer Science or Mathematics, IELTS 7.0+'),
('Master of Science in Chemical Engineering', 'IMPCE001', 4, 1, 'Master', 1, 'Advanced chemical engineering and process design', 48000, 'September', 'Bachelor in Chemical Engineering, IELTS 7.0+'),
('Master of Science in Mechanical Engineering', 'IMPME001', 4, 1, 'Master', 2, 'Mechanical systems design and advanced manufacturing', 49000, 'September', 'Bachelor in Mechanical Engineering, IELTS 7.0+'),
('Master of Science in Civil Engineering', 'IMPCE002', 4, 1, 'Master', 1, 'Structural design and infrastructure', 47000, 'September', 'Bachelor in Civil Engineering, IELTS 7.0+'),
('Master of Business Administration', 'IMPBMBA001', 4, 1, 'Master', 1, 'Executive STEM-focused MBA', 70000, 'September', 'Bachelor degree, 3+ years experience, GMAT'),
('Master of Science in Physics', 'IMPPH001', 4, 1, 'Master', 1, 'Theoretical and experimental physics', 46000, 'January,September', 'Bachelor in Physics, IELTS 7.0+'),
('Master of Science in Environmental Engineering', 'IMPEE001', 4, 1, 'Master', 1, 'Sustainable engineering solutions', 45000, 'January,September', 'Bachelor in Engineering, IELTS 7.0+'),
('Master of Science in Nanotechnology', 'IMPNANO001', 4, 1, 'Master', 1, 'Nanoscale science and engineering', 48000, 'September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Science in Biomedical Engineering', 'IMPBIO001', 4, 1, 'Master', 1, 'Medical device design and bioengineering', 47000, 'January,September', 'Bachelor in Engineering or related, IELTS 7.0+'),
('Master of Science in Energy Systems', 'IMPENE001', 4, 1, 'Master', 1, 'Renewable energy and power systems', 46000, 'January,September', 'Bachelor in Engineering or Physics, IELTS 7.0+'),
('Master of Science in Materials Science', 'IMPMAT001', 4, 1, 'Master', 1, 'Advanced materials and composites', 46000, 'September', 'Bachelor in Materials Science or related, IELTS 7.0+'),
('Master of Medicine', 'IMPMD001', 4, 1, 'Master', 3, 'Advanced medical research and clinical training', 68000, 'September', 'Bachelor in Medicine, IELTS 7.5+'),
('Master of Finance', 'IMPFI001', 4, 1, 'Master', 1, 'Financial engineering and derivatives', 49000, 'September', 'Bachelor in Finance or Mathematics, IELTS 7.0+'),
('Master of Science in Computing', 'IMPCOMP001', 4, 1, 'Master', 1, 'Advanced computing and systems', 49000, 'January,September', 'Bachelor in CS or related, IELTS 7.0+'),
('Master of Science in Data Science', 'IMPDS001', 4, 1, 'Master', 1, 'Data analytics and machine learning', 50000, 'January,September', 'Bachelor in related field, IELTS 7.0+');

-- University of Manchester Courses
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('Master of Science in Materials Science', 'MANMS001', 5, 1, 'Master', 1, 'Advanced materials and nanotechnology research', 41000, 'September', 'Bachelor in Materials Science or related, IELTS 7.0+'),
('Master of Business Administration', 'MANMBA001', 5, 1, 'Master', 2, 'MBA with focus on innovation and entrepreneurship', 52000, 'September', 'Bachelor degree, 2+ years experience, GMAT'),
('Master of Science in Pharmacy', 'MANPH001', 5, 1, 'Master', 2, 'Pharmaceutical sciences and clinical pharmacy', 45000, 'September', 'Bachelor in Pharmacy or related, IELTS 7.0+'),
('Master of Science in Computer Science', 'MANCS001', 5, 1, 'Master', 1, 'Advanced computing and software engineering', 43000, 'January,September', 'Bachelor in CS or related, IELTS 7.0+'),
('Master of Engineering in Aerospace', 'MANAE001', 5, 1, 'Master', 2, 'Aerospace engineering and design', 44000, 'September', 'Bachelor in Aerospace Engineering, IELTS 7.0+'),
('Master of Science in Finance', 'MANFI001', 5, 1, 'Master', 1, 'Financial management and investment', 40000, 'January,September', 'Bachelor in Finance or Economics, IELTS 7.0+'),
('Master of Science in Psychology', 'MANPSY001', 5, 1, 'Master', 1, 'Applied psychology and cognitive science', 39000, 'January,September', 'Bachelor in Psychology, IELTS 7.0+'),
('Master of Engineering in Civil', 'MANCE001', 5, 1, 'Master', 1, 'Civil engineering and infrastructure', 42000, 'September', 'Bachelor in Engineering, IELTS 7.0+'),
('Master of Science in Physics', 'MANPH002', 5, 1, 'Master', 1, 'Physics research and applications', 40000, 'January,September', 'Bachelor in Physics, IELTS 7.0+'),
('Master of Science in Chemistry', 'MANCH001', 5, 1, 'Master', 1, 'Advanced chemical research', 39000, 'January,September', 'Bachelor in Chemistry, IELTS 7.0+'),
('Master of Medicine', 'MANMD001', 5, 1, 'Master', 3, 'Advanced medical training', 63000, 'September', 'Bachelor in Medicine, IELTS 7.5+'),
('Master of Arts in History', 'MANHIST001', 5, 1, 'Master', 1, 'Historical research and analysis', 35000, 'January,September', 'Bachelor in History, IELTS 7.0+'),
('Master of Science in Environmental Science', 'MANENV001', 5, 1, 'Master', 1, 'Environmental research and management', 39000, 'January,September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Business and Finance', 'MANBF001', 5, 1, 'Master', 1, 'Corporate finance and business', 41000, 'January,September', 'Bachelor degree, IELTS 7.0+'),
('Master of Science in Data Science', 'MANDS001', 5, 1, 'Master', 1, 'Data analytics and AI', 42000, 'January,September', 'Bachelor in related field, IELTS 7.0+');

-- University College London Courses
INSERT INTO public.courses (name, code, university_id, country_id, level, duration_years, description, tuition_fees_international, intake_months, entry_requirements) VALUES
('Master of Science in Geography', 'UCLGEO001', 6, 1, 'Master', 1, 'Environmental geography and urban development', 38000, 'September', 'Bachelor in Geography or related, IELTS 7.0+'),
('Master of Science in Geology', 'UCLGEO002', 6, 1, 'Master', 1, 'Applied geology and geotechnical engineering', 40000, 'September', 'Bachelor in Geology or related, IELTS 7.0+'),
('Master of Arts in Architecture', 'UCLARCH001', 6, 1, 'Master', 2, 'Sustainable design and architectural technology', 44000, 'September', 'Bachelor in Architecture, IELTS 7.0+'),
('Master of Business Administration', 'UCLEBMBA001', 6, 1, 'Master', 1, 'Executive MBA', 66000, 'September', 'Bachelor degree, 3+ years experience, GMAT'),
('Master of Science in Computer Science', 'UCLCS001', 6, 1, 'Master', 1, 'Advanced computing and AI', 46000, 'January,September', 'Bachelor in CS or related, IELTS 7.0+'),
('Master of Medicine', 'UCLMD001', 6, 1, 'Master', 3, 'Advanced medical training', 64000, 'September', 'Bachelor in Medicine, IELTS 7.5+'),
('Master of Law', 'UCLLAW001', 6, 1, 'Master', 1, 'Advanced legal studies', 42000, 'September', 'Bachelor in Law, IELTS 7.0+'),
('Master of Finance', 'UCLFI001', 6, 1, 'Master', 1, 'Financial management', 44000, 'January,September', 'Bachelor in Finance or Economics, IELTS 7.0+'),
('Master of Science in Physics', 'UCLPH001', 6, 1, 'Master', 1, 'Physics research', 41000, 'January,September', 'Bachelor in Physics, IELTS 7.0+'),
('Master of Science in Chemistry', 'UCLCH001', 6, 1, 'Master', 1, 'Advanced chemistry', 40000, 'January,September', 'Bachelor in Chemistry, IELTS 7.0+'),
('Master of Arts in History', 'UCLHIST001', 6, 1, 'Master', 1, 'Historical studies', 37000, 'January,September', 'Bachelor in History, IELTS 7.0+'),
('Master of Psychology', 'UCLPSY001', 6, 1, 'Master', 1, 'Psychology research', 39000, 'January,September', 'Bachelor in Psychology, IELTS 7.0+'),
('Master of Science in Environmental Science', 'UCLENV001', 6, 1, 'Master', 1, 'Environmental management', 38000, 'January,September', 'Bachelor in related field, IELTS 7.0+'),
('Master of Arts in English', 'UCLENG001', 6, 1, 'Master', 1, 'English literature studies', 36000, 'January,September', 'Bachelor in English, IELTS 7.0+'),
('Master of Science in Management', 'UCLMGT001', 6, 1, 'Master', 1, 'Business management', 40000, 'January,September', 'Bachelor degree, IELTS 7.0+');

-- ============================================================
-- INSERT UNIVERSITIES FOR AUSTRALIA (country_id: 2)
-- ============================================================
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('University of Melbourne', 'Melbourne', 2, 'Australia''s leading research university with global reputation and innovation focus', 47000, 37, 'https://www.unimelb.edu.au'),
('University of Sydney', 'Sydney', 2, 'Historic university with excellence across all disciplines and strong community', 50000, 54, 'https://www.sydney.edu.au'),
('University of New South Wales', 'Sydney', 2, 'Innovation-focused university with strong engineering and technology programs', 45000, 31, 'https://www.unsw.edu.au'),
('Australian National University', 'Canberra', 2, 'Premier research institution in Australia''s capital with world-class facilities', 14000, 30, 'https://www.anu.edu.au'),
('Monash University', 'Melbourne', 2, 'Comprehensive university with international perspective and research excellence', 73000, 42, 'https://www.monash.edu.au'),
('University of Queensland', 'Brisbane', 2, 'Leading research university in subtropical region with strong STEM programs', 52000, 70, 'https://www.uq.edu.au');

-- Courses for Australian Universities follow the same pattern (will be inserted via a separate script due to length)

-- ============================================================
-- INSERT UNIVERSITIES FOR CANADA (country_id: 4)
-- ============================================================
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('University of Toronto', 'Toronto', 4, 'Canada''s leading research university with exceptional programs across disciplines', 95000, 21, 'https://www.utoronto.ca'),
('University of British Columbia', 'Vancouver', 4, 'Highly ranked research institution with focus on innovation and research', 68000, 34, 'https://www.ubc.ca'),
('McGill University', 'Montreal', 4, 'Prestigious university with strong international presence and research excellence', 42000, 57, 'https://www.mcgill.ca'),
('McMaster University', 'Hamilton', 4, 'Innovation hub with world-class research facilities and problem-based learning', 50000, 111, 'https://www.mcmaster.ca'),
('University of Alberta', 'Edmonton', 4, 'Leading research-intensive institution with comprehensive programs', 53000, 110, 'https://www.ualberta.ca'),
('Western University', 'London', 4, 'Student-focused university with vibrant campus life and research opportunities', 38000, 141, 'https://www.uwo.ca');

-- ============================================================
-- INSERT UNIVERSITIES FOR IRELAND (country_id: 3)
-- ============================================================
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('University of Dublin - Trinity College', 'Dublin', 3, 'Ireland''s oldest university with world-class reputation and research excellence', 17000, 81, 'https://www.tcd.ie'),
('University College Dublin', 'Dublin', 3, 'Leading research university in Ireland with comprehensive programs', 30000, 154, 'https://www.ucd.ie'),
('University College Cork', 'Cork', 3, 'Ireland''s oldest university outside Dublin with strong research focus', 20000, 251, 'https://www.ucc.ie'),
('National University of Ireland Galway', 'Galway', 3, 'Research-focused university on Ireland''s west coast', 18000, 330, 'https://www.nuigalway.ie'),
('Dublin City University', 'Dublin', 3, 'Innovation-focused university with industry partnerships', 14000, 501, 'https://www.dcu.ie'),
('Maynooth University', 'Maynooth', 3, 'Historic university focused on research and teaching', 13000, 601, 'https://www.maynoothuniversity.ie');

-- ============================================================
-- INSERT UNIVERSITIES FOR NEW ZEALAND (country_id: 5)
-- ============================================================
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('University of Auckland', 'Auckland', 5, 'New Zealand''s leading research university with comprehensive programs', 40000, 85, 'https://www.auckland.ac.nz'),
('University of Otago', 'Dunedin', 5, 'Historic university with strong research focus and medical excellence', 20000, 217, 'https://www.otago.ac.nz'),
('University of Canterbury', 'Christchurch', 5, 'Engineering and sciences excellence in South Island', 15000, 322, 'https://www.canterbury.ac.nz'),
('Massey University', 'Palmerston North', 5, 'Comprehensive university with distance learning and practical focus', 33000, 334, 'https://www.massey.ac.nz'),
('Victoria University of Wellington', 'Wellington', 5, 'Research-intensive institution in New Zealand''s capital', 20000, 275, 'https://www.victoria.ac.nz'),
('University of Waikato', 'Hamilton', 5, 'Innovation-focused university with strong business programs', 13000, 451, 'https://www.waikato.ac.nz');

-- ============================================================
-- INSERT UNIVERSITIES FOR UNITED STATES (country_id: 6)
-- ============================================================
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('Harvard University', 'Cambridge', 6, 'World''s leading university with exceptional research and legacy', 23000, 2, 'https://www.harvard.edu'),
('Stanford University', 'Stanford', 6, 'Innovation hub in Silicon Valley with entrepreneurial focus', 18000, 5, 'https://www.stanford.edu'),
('Massachusetts Institute of Technology', 'Cambridge', 6, 'Premier engineering and technology university', 11500, 1, 'https://www.mit.edu'),
('California Institute of Technology', 'Pasadena', 6, 'Small elite technology and research leader', 1250, 9, 'https://www.caltech.edu'),
('Yale University', 'New Haven', 6, 'Ivy League institution with renowned programs across disciplines', 13000, 12, 'https://www.yale.edu'),
('University of Chicago', 'Chicago', 6, 'Research university with strong STEM and business focus', 17000, 10, 'https://www.uchicago.edu');

-- ============================================================
-- INSERT UNIVERSITIES FOR DUBAI (country_id: 7)
-- ============================================================
INSERT INTO public.universities (name, city, country_id, description, student_count, world_rank, website) VALUES
('University of Dubai', 'Dubai', 7, 'Private university focused on business and engineering education', 8000, null, 'https://www.ud.ac.ae'),
('American University in Dubai', 'Dubai', 7, 'Branch campus offering American education standards in Dubai', 2000, null, 'https://www.aud.edu'),
('Middlesex University Dubai', 'Dubai', 7, 'UK branch campus in Dubai Academic City', 1500, null, 'https://www.mdx.ac.ae'),
('Heriot-Watt University Dubai', 'Dubai', 7, 'Scottish university branch with engineering focus', 1800, null, 'https://www.hw-dubai.edu.ae'),
('BITS Pilani Dubai', 'Dubai', 7, 'Indian university branch with tech and engineering focus', 1200, null, 'https://www.bits-dubai.ac.in'),
('Canadian University Dubai', 'Dubai', 7, 'Canadian-standard education in UAE', 1600, null, 'https://www.cud.ac.ae');
