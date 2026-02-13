-- Create vacancies table for the career page
CREATE TABLE IF NOT EXISTS vacancies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  job_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  experience_level VARCHAR(50) NOT NULL DEFAULT 'Mid-level',
  salary_range VARCHAR(100),
  application_deadline DATE NOT NULL,
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active vacancies
CREATE POLICY "Allow public read access to active vacancies"
  ON vacancies
  FOR SELECT
  USING (is_active = TRUE);

-- Seed with dummy vacancy data
INSERT INTO vacancies (title, department, country, city, job_type, experience_level, salary_range, application_deadline, posted_date, description, responsibilities, requirements, benefits, is_active)
VALUES
(
  'Front Desk Officer',
  'Student Services',
  'United Kingdom',
  'London',
  'Full-time',
  'Entry-level',
  '22,000 - 28,000 GBP',
  '2026-04-15',
  '2026-02-01',
  'We are looking for a friendly and organised Front Desk Officer to be the first point of contact for students, parents, and visitors at our London office. You will manage reception duties, assist with enquiries, schedule appointments, and ensure a welcoming environment for all stakeholders.',
  ARRAY[
    'Greet and assist students, parents, and visitors in a professional and friendly manner',
    'Handle incoming calls, emails, and walk-in enquiries efficiently',
    'Schedule and manage appointments for counsellors and advisors',
    'Maintain the reception area, ensuring it is tidy and presentable',
    'Assist with document collection, verification, and filing',
    'Coordinate with internal teams to relay student queries and follow-ups',
    'Manage incoming and outgoing correspondence',
    'Support event coordination and campus visit arrangements'
  ],
  ARRAY[
    'Minimum A-Levels or equivalent qualification',
    'Excellent communication and interpersonal skills in English',
    'Proficiency in Microsoft Office Suite (Word, Excel, Outlook)',
    'Strong organisational skills with attention to detail',
    'Ability to multitask and work in a fast-paced environment',
    'Previous experience in a reception or customer-facing role is preferred',
    'Knowledge of the international education sector is a plus'
  ],
  ARRAY[
    '25 days annual leave plus bank holidays',
    'Professional development and training opportunities',
    'Friendly and supportive work environment',
    'Pension scheme',
    'Central London office location with excellent transport links'
  ],
  TRUE
),
(
  'Front Desk Officer',
  'Student Services',
  'Bangladesh',
  'Dhaka',
  'Full-time',
  'Entry-level',
  '30,000 - 45,000 BDT',
  '2026-04-10',
  '2026-02-01',
  'We are seeking a dedicated Front Desk Officer for our Dhaka branch to provide excellent front-of-house service. You will assist prospective students with initial queries, manage appointments, and support the smooth daily operations of our office.',
  ARRAY[
    'Welcome and assist prospective students, parents, and visitors',
    'Answer phone calls and respond to email and social media enquiries',
    'Book and manage consultation appointments with counsellors',
    'Maintain visitor logs and ensure office security protocols are followed',
    'Assist with student document collection and preliminary screening',
    'Coordinate with the marketing team for event registrations',
    'Keep the reception area clean, organised, and well-stocked with brochures',
    'Provide general administrative support as needed'
  ],
  ARRAY[
    'Bachelor''s degree or equivalent (any discipline)',
    'Fluent in English and Bengali (written and spoken)',
    'Proficient in MS Office and comfortable with CRM tools',
    'Excellent interpersonal and communication skills',
    'Ability to handle pressure and multitask effectively',
    'Prior experience in customer service or front desk role is preferred',
    'Knowledge of UK/international university admissions is advantageous'
  ],
  ARRAY[
    'Competitive salary with annual increments',
    'Festival bonuses',
    'Training and career growth opportunities',
    'Friendly and dynamic work environment',
    'Opportunity to work in the international education sector'
  ],
  TRUE
),
(
  'Senior Education Counsellor',
  'Counselling',
  'United Kingdom',
  'Manchester',
  'Full-time',
  'Senior',
  '35,000 - 45,000 GBP',
  '2026-03-30',
  '2026-01-20',
  'We are looking for an experienced Senior Education Counsellor to guide international students through the UK university admissions process. You will provide expert advice on course selection, university matching, UCAS applications, and visa guidance.',
  ARRAY[
    'Provide one-on-one counselling sessions to prospective international students',
    'Advise students on course selection, university options, and career pathways',
    'Assist with UCAS applications, personal statement reviews, and interview preparation',
    'Maintain up-to-date knowledge of UK university entry requirements and deadlines',
    'Build and maintain relationships with university admission teams',
    'Achieve monthly and quarterly student enrolment targets',
    'Participate in education fairs, webinars, and school outreach events',
    'Mentor and support junior counsellors in the team'
  ],
  ARRAY[
    'Bachelor''s degree minimum; Master''s degree preferred',
    'At least 3 years of experience in international education counselling',
    'In-depth knowledge of UK higher education system and UCAS process',
    'Proven track record of meeting student recruitment targets',
    'Excellent communication, presentation, and interpersonal skills',
    'Proficiency in CRM systems and MS Office',
    'Ability to work independently and as part of a team'
  ],
  ARRAY[
    '28 days annual leave plus bank holidays',
    'Performance-based bonuses',
    'Professional development and industry training',
    'Health and wellness benefits',
    'Pension scheme',
    'Supportive and collaborative team culture'
  ],
  TRUE
),
(
  'Digital Marketing Executive',
  'Marketing',
  'Bangladesh',
  'Chittagong',
  'Full-time',
  'Mid-level',
  '40,000 - 60,000 BDT',
  '2026-04-20',
  '2026-02-10',
  'Join our marketing team as a Digital Marketing Executive to help us reach and engage prospective students across South Asia. You will manage social media campaigns, content creation, SEO/SEM efforts, and analytics to drive student enquiries.',
  ARRAY[
    'Plan, execute, and optimise digital marketing campaigns across social media platforms',
    'Create engaging content for Facebook, Instagram, LinkedIn, YouTube, and TikTok',
    'Manage Google Ads and Facebook Ads campaigns with budget optimisation',
    'Monitor website analytics and generate performance reports',
    'Implement SEO strategies to improve organic search visibility',
    'Collaborate with the counselling team to align marketing efforts with enrolment goals',
    'Design email marketing campaigns and newsletters',
    'Stay updated on digital marketing trends and competitor activities'
  ],
  ARRAY[
    'Bachelor''s degree in Marketing, Communications, or related field',
    'Minimum 2 years of experience in digital marketing',
    'Proficiency in Google Analytics, Google Ads, and Meta Business Suite',
    'Strong content writing and copywriting skills in English and Bengali',
    'Experience with graphic design tools (Canva, Adobe Creative Suite)',
    'Knowledge of SEO/SEM best practices',
    'Creative thinker with strong analytical skills'
  ],
  ARRAY[
    'Competitive salary package',
    'Festival bonuses',
    'Flexible working hours',
    'Training and certification support',
    'Young and vibrant work environment',
    'Growth opportunities within the organisation'
  ],
  TRUE
),
(
  'Student Visa Processing Officer',
  'Immigration Services',
  'United Kingdom',
  'London',
  'Full-time',
  'Mid-level',
  '28,000 - 35,000 GBP',
  '2026-05-01',
  '2026-02-12',
  'We are seeking a detail-oriented Student Visa Processing Officer to support international students with their UK Student Visa (Tier 4) applications. You will guide students through the documentation process, liaise with universities for CAS letters, and ensure compliance with UKVI regulations.',
  ARRAY[
    'Guide students through the UK Student Visa application process step by step',
    'Review and verify student documents for visa applications',
    'Liaise with universities to obtain CAS (Confirmation of Acceptance for Studies) letters',
    'Prepare students for visa interviews and biometric appointments',
    'Stay updated on UKVI immigration rules and policy changes',
    'Maintain accurate records of all visa applications and outcomes',
    'Handle visa refusal cases and advise on appeal or reapplication strategies',
    'Provide post-visa support including BRP collection and police registration guidance'
  ],
  ARRAY[
    'Bachelor''s degree or equivalent qualification',
    'Minimum 2 years of experience in UK student visa processing',
    'Thorough knowledge of UKVI Student Visa (Tier 4) requirements',
    'Strong attention to detail and document verification skills',
    'Excellent written and verbal communication in English',
    'Experience using CRM and case management systems',
    'Ability to handle sensitive information with confidentiality',
    'OISC Level 1 certification is desirable'
  ],
  ARRAY[
    '25 days annual leave plus bank holidays',
    'Professional development and OISC training support',
    'Pension scheme',
    'Performance bonuses',
    'Central London location with excellent transport links',
    'Supportive and mission-driven team'
  ],
  TRUE
),
(
  'Accounts & Finance Officer',
  'Finance',
  'Bangladesh',
  'Dhaka',
  'Full-time',
  'Mid-level',
  '45,000 - 65,000 BDT',
  '2026-04-30',
  '2026-02-08',
  'We are looking for a skilled Accounts & Finance Officer to manage the financial operations of our Dhaka office. You will handle bookkeeping, invoicing, payroll, and financial reporting while ensuring compliance with local regulations.',
  ARRAY[
    'Manage day-to-day accounting operations including accounts payable and receivable',
    'Prepare and process invoices, receipts, and payment vouchers',
    'Maintain accurate financial records and ledgers',
    'Assist in preparing monthly, quarterly, and annual financial reports',
    'Handle payroll processing and ensure timely salary disbursement',
    'Coordinate with external auditors during annual audits',
    'Ensure compliance with Bangladesh tax laws and VAT regulations',
    'Monitor office budgets and flag variances to management'
  ],
  ARRAY[
    'Bachelor''s degree in Accounting, Finance, or Commerce',
    'Minimum 2 years of experience in accounting or finance roles',
    'Proficiency in accounting software (Tally, QuickBooks, or similar)',
    'Strong knowledge of Bangladesh tax and VAT regulations',
    'Advanced Excel skills and attention to detail',
    'Excellent organisational and time management skills',
    'CA (CC) or ACCA in progress is a plus'
  ],
  ARRAY[
    'Competitive salary with annual increments',
    'Festival bonuses (2 per year)',
    'Provident fund contribution',
    'Professional development support',
    'Friendly and professional work environment',
    'Career advancement opportunities'
  ],
  TRUE
);
