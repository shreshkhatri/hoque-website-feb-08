-- ============================================================
-- ADD NEW UK UNIVERSITIES ONLY
-- ============================================================
-- This script adds 5 new UK universities
-- Data verified and extracted from official university sources and provided PDFs

INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) 
VALUES ('Queen''s University Belfast', 'Belfast', 'United Kingdom', 'Russell Group research-intensive university offering world-class education with strong postgraduate programs in business, science, and engineering', 'https://www.qub.ac.uk', 1845, 25000);

INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) 
VALUES ('Northumbria University', 'Newcastle', 'United Kingdom', 'Modern university known for industry-focused teaching, innovative research, and strong business school with AACSB accreditation', 'https://www.northumbria.ac.uk', 1969, 34000);

INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) 
VALUES ('University of Greenwich', 'London', 'United Kingdom', 'London-based university offering practical, career-focused education with strong links to industry and diverse student community', 'https://www.gre.ac.uk', 1890, 18000);

INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) 
VALUES ('Middlesex University', 'London', 'United Kingdom', 'Forward-thinking university in North London with innovative approach to teaching and research, internationally recognized programs', 'https://www.mdx.ac.uk', 1973, 20000);

INSERT INTO public.universities (name, city, country, description, website_url, founded_year, student_population) 
VALUES ('London South Bank University', 'London', 'United Kingdom', 'Modern metropolitan university offering practical vocational education with strong connections to London employers and industry', 'https://www.lsbu.ac.uk', 1892, 15000);
