-- Insert common course categories based on existing field_of_study data
INSERT INTO course_categories (name, slug, description) VALUES
('Business & Management', 'business-management', 'Programs in business administration, management, finance, accounting, and related fields'),
('Engineering & Technology', 'engineering-technology', 'Programs in engineering disciplines, computer science, IT, and technological fields'),
('Health & Medicine', 'health-medicine', 'Programs in medicine, nursing, healthcare, pharmacy, and medical sciences'),
('Arts & Humanities', 'arts-humanities', 'Programs in literature, languages, history, philosophy, arts, and cultural studies'),
('Sciences', 'sciences', 'Programs in natural sciences including biology, chemistry, physics, mathematics, and environmental sciences'),
('Social Sciences', 'social-sciences', 'Programs in psychology, sociology, political science, economics, and anthropology'),
('Education', 'education', 'Programs in teaching, education administration, and educational development'),
('Law', 'law', 'Programs in legal studies, law practice, and legal administration'),
('Hospitality & Tourism', 'hospitality-tourism', 'Programs in hospitality management, tourism, culinary arts, and event management'),
('Media & Communications', 'media-communications', 'Programs in journalism, media studies, public relations, and communications'),
('Architecture & Design', 'architecture-design', 'Programs in architecture, interior design, graphic design, and related creative fields'),
('Agriculture & Veterinary', 'agriculture-veterinary', 'Programs in agriculture, animal science, veterinary medicine, and food science')
ON CONFLICT (name) DO NOTHING;

-- Update existing courses based on their field_of_study values
-- Business related
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'business-management')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%business%' OR
  field_of_study ILIKE '%management%' OR
  field_of_study ILIKE '%finance%' OR
  field_of_study ILIKE '%accounting%' OR
  field_of_study ILIKE '%mba%' OR
  field_of_study ILIKE '%commerce%' OR
  field_of_study ILIKE '%marketing%' OR
  field_of_study ILIKE '%economics%'
);

-- Engineering & Technology
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'engineering-technology')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%engineering%' OR
  field_of_study ILIKE '%computer%' OR
  field_of_study ILIKE '%technology%' OR
  field_of_study ILIKE '%software%' OR
  field_of_study ILIKE '%IT%' OR
  field_of_study ILIKE '%data science%' OR
  field_of_study ILIKE '%artificial intelligence%'
);

-- Health & Medicine
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'health-medicine')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%medicine%' OR
  field_of_study ILIKE '%medical%' OR
  field_of_study ILIKE '%health%' OR
  field_of_study ILIKE '%nursing%' OR
  field_of_study ILIKE '%pharmacy%' OR
  field_of_study ILIKE '%dental%'
);

-- Arts & Humanities
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'arts-humanities')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%arts%' OR
  field_of_study ILIKE '%literature%' OR
  field_of_study ILIKE '%history%' OR
  field_of_study ILIKE '%philosophy%' OR
  field_of_study ILIKE '%language%' OR
  field_of_study ILIKE '%music%'
);

-- Sciences
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'sciences')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%science%' OR
  field_of_study ILIKE '%biology%' OR
  field_of_study ILIKE '%chemistry%' OR
  field_of_study ILIKE '%physics%' OR
  field_of_study ILIKE '%mathematics%' OR
  field_of_study ILIKE '%environmental%'
);

-- Social Sciences
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'social-sciences')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%psychology%' OR
  field_of_study ILIKE '%sociology%' OR
  field_of_study ILIKE '%political%' OR
  field_of_study ILIKE '%anthropology%' OR
  field_of_study ILIKE '%social%'
);

-- Education
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'education')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%education%' OR
  field_of_study ILIKE '%teaching%'
);

-- Law
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'law')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%law%' OR
  field_of_study ILIKE '%legal%'
);

-- Hospitality & Tourism
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'hospitality-tourism')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%hospitality%' OR
  field_of_study ILIKE '%tourism%' OR
  field_of_study ILIKE '%culinary%' OR
  field_of_study ILIKE '%hotel%'
);

-- Media & Communications
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'media-communications')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%media%' OR
  field_of_study ILIKE '%communication%' OR
  field_of_study ILIKE '%journalism%' OR
  field_of_study ILIKE '%public relations%'
);

-- Architecture & Design
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'architecture-design')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%architecture%' OR
  field_of_study ILIKE '%design%'
);

-- Agriculture & Veterinary
UPDATE courses SET category_id = (SELECT id FROM course_categories WHERE slug = 'agriculture-veterinary')
WHERE category_id IS NULL AND (
  field_of_study ILIKE '%agriculture%' OR
  field_of_study ILIKE '%veterinary%' OR
  field_of_study ILIKE '%animal%'
);
