-- Example SQL for inserting a university with highlights, required_documents, and faqs fields
-- This demonstrates the correct JSON format for each field

INSERT INTO universities (
  name, 
  country, 
  country_id, 
  city, 
  description,
  highlights,
  required_documents,
  faqs
) VALUES (
  'Example University',
  'United Kingdom',
  1,  -- country_id for UK
  'London',
  'A world-class university offering excellent education and research opportunities.',
  
  -- HIGHLIGHTS field (JSONB array)
  '[
    {
      "icon": "Award",
      "title": "Top Ranked",
      "description": "Among the top universities in the UK for student satisfaction"
    },
    {
      "icon": "Briefcase",
      "title": "Career Support",
      "description": "95% of graduates employed within 6 months"
    },
    {
      "icon": "Users",
      "title": "Diverse Community",
      "description": "Students from over 130 countries"
    },
    {
      "icon": "Globe",
      "title": "Global Connections",
      "description": "Partnerships with 200+ universities worldwide"
    }
  ]'::jsonb,
  
  -- REQUIRED_DOCUMENTS field (JSONB array)
  '[
    {
      "name": "Academic Transcripts",
      "description": "Official transcripts from all previously attended institutions"
    },
    {
      "name": "English Language Proficiency",
      "description": "IELTS 6.0 overall (min 5.5 in each band) or equivalent"
    },
    {
      "name": "Personal Statement",
      "description": "A statement explaining your motivation and goals"
    },
    {
      "name": "Passport Copy",
      "description": "Valid passport with at least 6 months validity"
    },
    {
      "name": "Reference Letters",
      "description": "Two academic or professional references"
    },
    {
      "name": "CV/Resume",
      "description": "Updated curriculum vitae highlighting relevant experience"
    }
  ]'::jsonb,
  
  -- FAQS field (JSONB array)
  '[
    {
      "question": "What are the entry requirements?",
      "answer": "Entry requirements vary by program. Generally, you need relevant academic qualifications and English language proficiency (IELTS 6.0 or equivalent)."
    },
    {
      "question": "When are the application deadlines?",
      "answer": "Most programs have multiple intakes throughout the year. We recommend applying at least 3-4 months before your intended start date."
    },
    {
      "question": "Is there scholarship available?",
      "answer": "Yes, the university offers various scholarships for international students based on academic merit and financial need."
    },
    {
      "question": "What is the average processing time?",
      "answer": "Application processing typically takes 2-4 weeks. Visa processing time varies by country."
    },
    {
      "question": "Can I work while studying?",
      "answer": "International students can work up to 20 hours per week during term time and full-time during holidays."
    }
  ]'::jsonb
);

-- Example UPDATE query to add/modify these fields for existing universities
UPDATE universities 
SET 
  highlights = '[{"icon": "Award", "title": "Excellence", "description": "Leading institution"}]'::jsonb,
  required_documents = '[{"name": "Passport", "description": "Valid passport required"}]'::jsonb,
  faqs = '[{"question": "How to apply?", "answer": "Apply through our website"}]'::jsonb
WHERE id = 1;  -- Replace with your university ID
