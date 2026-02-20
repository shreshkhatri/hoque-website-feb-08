import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    )
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

// Admin client with service role key - lazily initialized
let _supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdminClient(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
    )
  }

  _supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
  return _supabaseAdmin
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseAdminClient()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

// Lazy-initialized Supabase client - only created when first accessed
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseClient()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

// Helper to convert name to URL-friendly slug
export function nameToSlug(name: string, code?: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return code ? `${base}-${code.toLowerCase()}` : base
}

export type University = {
  id: number
  name: string
  country: string
  country_id: number | null
  city: string
  rank_world: number | null
  description: string | null
  logo_url: string | null
  website_url: string | null
  founded_year: number | null
  student_population: number | null
  acceptance_rate: number | null
  international_students_percentage: number | null
  cover_image_url: string | null
  campus_type: string | null
  why_study_here: string | null
  highlights: any[] | null
  required_documents: any[] | null
  faqs: any[] | null
  employment_rate: string | null
  nationalities_count: number | null
  partner_universities_count: number | null
  intakes: string | null
  campus_facilities: string[] | null
  express_offer_available: boolean
  created_at: string
}

export type UniversityCampus = {
  id: number
  university_id: number
  name: string
  location: string | null
  description: string | null
  is_main_campus: boolean
  created_at: string
}

export type UniversityFaq = {
  id: number
  university_id: number
  question: string
  answer: string
  display_order: number
  created_at: string
}

export type Course = {
  id: number
  name: string
  code: string
  university_id: number
  campus_id: number | null
  country_id: number | null
  level: string
  duration_years: number | null
  description: string | null
  tuition_fees_international: number | null
  intake_months: string | null
  entry_requirements: string | null
  course_overview: string | null
  academic_requirements: string | null
  english_language_requirements: string | null
  other_requirements: string | null
  document_requirements: string | null
  scholarships: string | null
  scholarship_amount: number | null
  scholarship_type: 'amount' | 'percentage' | null
  key_features: string | null
  field_of_study: string | null
  created_at: string
}

export type Country = {
  id: number
  name: string
  code: string
  flag_emoji: string
  description: string | null
  about: string | null
  study_life: string | null
  opportunities: string | null
  student_permit_requirements: string | null
  visa_processing_time: string | null
  cost_of_living_monthly: number | null
  work_study_hours: string | null
  post_study_work_visa: string | null
  // New enhanced fields
  international_students_count: string | null
  happiness_ranking: number | null
  employment_rate: number | null
  currency: string | null
  min_wage: string | null
  max_work_hours: number | null
  cover_image_url: string | null
  // Cost breakdown fields
  cost_accommodation_min: number | null
  cost_accommodation_max: number | null
  cost_food_min: number | null
  cost_food_max: number | null
  cost_transport_min: number | null
  cost_transport_max: number | null
  cost_utilities_min: number | null
  cost_utilities_max: number | null
  cost_health_insurance_min: number | null
  cost_health_insurance_max: number | null
  // Visa information
  student_visa_eligibility: string | null
  student_visa_validity: string | null
  post_study_visa_eligibility: string | null
  post_study_visa_validity: string | null
  created_at: string
}

export type CountryFunFact = {
  id: number
  country_id: number
  fact: string
  display_order: number
  created_at: string
}

export type CountryFaq = {
  id: number
  country_id: number
  question: string
  answer: string
  display_order: number
  created_at: string
}

export type CountryEmploymentSector = {
  id: number
  country_id: number
  sector_name: string
  demand_level: 'High' | 'Medium' | 'Low'
  display_order: number
  created_at: string
}

export type CountryWhatSetsApart = {
  id: number
  country_id: number
  title: string
  description: string
  icon: string
  display_order: number
  created_at: string
}

export async function initializeDatabase() {
  try {
    // Check if universities table exists and has data
    const { data: universities, error: uniBoundsError } = await supabase
      .from('universities')
      .select('id')
      .limit(1)

    if (uniBoundsError) {
      console.log('Creating tables...')
      // Create tables
      const { error: createError } = await supabase.rpc('create_tables', {})
      if (createError) {
        console.log('Tables might already exist or initial setup needed')
      }
    }

    // Check if we need to seed data
    const { count } = await supabase
      .from('universities')
      .select('*', { count: 'exact', head: true })

    if (!count || count === 0) {
      console.log('Seeding database with dummy data...')
      await seedDatabase()
    }
  } catch (error) {
    console.error('Database initialization error:', error)
  }
}

async function seedDatabase() {
  try {
    // Seed countries first
    const countries = [
      {
        name: 'United Kingdom',
        code: 'GB',
        flag_emoji: '🇬🇧',
        description: 'Home to world-renowned universities and a global hub for education.',
        about:
          'The United Kingdom is home to some of the world\'s oldest and most prestigious universities. With a rich academic heritage spanning over 900 years, UK universities are leaders in research and innovation. The country offers a diverse, welcoming environment for international students with excellent quality of life.',
        study_life:
          'UK student life is vibrant and engaging. Universities offer extensive student societies, sports facilities, and cultural events. Students enjoy access to world-class libraries, laboratories, and research facilities. The academic year typically runs from September to June, with a strong emphasis on independent learning and critical thinking.',
        opportunities:
          'Graduates from UK universities have excellent career prospects globally. The UK offers strong connections to leading industries, internship opportunities, and a robust graduate job market. Many universities have partnerships with top companies for recruitment and professional development.',
        student_permit_requirements:
          'International students need a Student visa (Tier 4 visa). Requirements include proof of funds, acceptance letter from a UK university, and English language proficiency. EU/EEA nationals previously had freedom of movement but now require similar visas as other internationals.',
        visa_processing_time: '3-5 weeks',
        cost_of_living_monthly: 1250,
        work_study_hours: 'Up to 20 hours per week during studies, full-time during holidays',
        post_study_work_visa: 'Graduate Route available for up to 2 years (depending on qualification level)',
      },
      {
        name: 'Australia',
        code: 'AU',
        flag_emoji: '🇦🇺',
        description: 'Top destination for international students with modern universities and excellent quality of life.',
        about:
          'Australia is a leading destination for international education with world-class universities consistently ranked among the global elite. The country offers a unique blend of academic excellence, natural beauty, and multicultural society. Australian degrees are highly respected worldwide and provide excellent career opportunities.',
        study_life:
          'Student life in Australia is diverse and outdoorsy. Universities are equipped with modern facilities and offer extensive extracurricular activities. The climate allows for outdoor activities year-round. There\'s a strong sense of community on campus with numerous student clubs and sporting events.',
        opportunities:
          'Australia has a strong economy with excellent graduate employment rates. Students can access internship programs, industry partnerships, and entrepreneurship support. The country is particularly strong in STEM fields, business, and creative industries.',
        student_permit_requirements:
          'International students require a Student Visa (subclass 500). Requirements include an offer of admission, proof of financial capacity, English language proficiency, and health insurance. Health and character checks are mandatory.',
        visa_processing_time: '4-8 weeks',
        cost_of_living_monthly: 1800,
        work_study_hours: 'Up to 20 hours per week during studies, unlimited during breaks',
        post_study_work_visa: 'Post-Study Work visa (typically 1.5-3 years depending on field of study)',
      },
      {
        name: 'Ireland',
        code: 'IE',
        flag_emoji: '🇮🇪',
        description: 'Gateway to Europe with vibrant cities, historic universities, and welcoming communities.',
        about:
          'Ireland offers a unique blend of historic charm and modern innovation. Irish universities are known for excellence in research and teaching. The country has a young, vibrant population and a thriving tech sector. International students are warmly welcomed and easily integrate into Irish society.',
        study_life:
          'Student life in Ireland is social and vibrant, particularly in Dublin and Cork. Universities organize regular cultural events, sports activities, and social gatherings. Irish pubs are central to social life, and the Irish people are known for their friendliness and humor.',
        opportunities:
          'Ireland has a booming tech industry attracting major international companies. Graduates have access to strong job markets, particularly in technology, finance, and business sectors. The country\'s membership in the EU provides opportunities across Europe.',
        student_permit_requirements:
          'International students need a student visa or permission to remain. Requirements include an offer from an approved institution, proof of funds, and English language proficiency. Non-EEA students need specific documentation.',
        visa_processing_time: '2-4 weeks',
        cost_of_living_monthly: 1100,
        work_study_hours: 'Up to 20 hours per week during studies, full-time during official holidays',
        post_study_work_visa: 'Third Level Graduate scheme - typically 2 years for eligible graduates',
      },
      {
        name: 'Canada',
        code: 'CA',
        flag_emoji: '🇨🇦',
        description: 'Multicultural nation with excellent universities and welcoming immigration policies.',
        about:
          'Canada is renowned for its high-quality education system and welcoming attitude toward international students. Canadian universities are consistently ranked among the world\'s best. The country offers excellent research facilities, diverse communities, and natural beauty. Post-graduation immigration pathways make Canada an attractive destination.',
        study_life:
          'Student life in Canada is inclusive and diverse. Universities offer state-of-the-art facilities, extensive student services, and vibrant campus communities. Winters are cold, but universities and cities offer excellent indoor activities, winter sports, and cultural events.',
        opportunities:
          'Canada has a strong economy with excellent employment prospects for graduates. The country offers clear pathways to permanent residency for international graduates. Industries like technology, natural resources, healthcare, and engineering are particularly strong.',
        student_permit_requirements:
          'International students require a study permit. Requirements include acceptance letter from a designated learning institution, proof of funds, passing medical exam, and admissibility check. Biometrics collection may be required.',
        visa_processing_time: '4-8 weeks',
        cost_of_living_monthly: 1500,
        work_study_hours: 'Up to 20 hours per week during studies, full-time during authorized breaks',
        post_study_work_visa: 'Post-Graduation Work Permit - duration equivalent to study program (up to 3 years)',
      },
      {
        name: 'New Zealand',
        code: 'NZ',
        flag_emoji: '🇳🇿',
        description: 'Stunning natural landscape with excellent universities and outdoor lifestyle.',
        about:
          'New Zealand offers world-class education in a stunningly beautiful country. Universities combine excellent academics with outdoor lifestyle opportunities. The country is known for innovation, research excellence, and a relaxed, friendly culture. International students enjoy a high quality of life and strong community integration.',
        study_life:
          'Student life in New Zealand centers on both academic excellence and outdoor adventure. Universities offer excellent facilities and support services. The country\'s natural attractions provide endless opportunities for hiking, sports, and recreation. Student communities are tight-knit and welcoming.',
        opportunities:
          'New Zealand has growing industries in technology, creative industries, and healthcare. The country welcomes skilled graduates and offers pathways to residency. Strong focus on sustainability and innovation provides career opportunities in emerging fields.',
        student_permit_requirements:
          'International students require a Student Visa. Requirements include an offer of admission, proof of financial support, health and character clearance, and often a police certificate.',
        visa_processing_time: '3-6 weeks',
        cost_of_living_monthly: 1400,
        work_study_hours: 'Up to 20 hours per week during studies, full-time during official breaks',
        post_study_work_visa: 'Open Work Visa - typically 1 year, extendable for certain qualifications',
      },
      {
        name: 'United States',
        code: 'US',
        flag_emoji: '🇺🇸',
        description: 'Home to world\'s leading universities with diverse opportunities and innovation.',
        about:
          'The United States hosts some of the world\'s most prestigious universities. American education is known for flexibility, research opportunities, and innovation. US degrees are highly valued globally. The country offers tremendous diversity in academic programs and institutional types.',
        study_life:
          'American student life is incredibly diverse and dynamic. Universities offer world-class facilities, extensive campus life, and numerous clubs and organizations. Sports culture is significant with NCAA athletics. Cities and campuses provide endless cultural, entertainment, and educational opportunities.',
        opportunities:
          'The US job market is highly competitive but offers excellent opportunities for graduates. Students can participate in internships and practical training (OPT). The country is a global leader in technology, finance, healthcare, and research.',
        student_permit_requirements:
          'International students require an F-1 visa. Requirements include admission from SEVIS-certified institution, Form I-20, proof of financial support, and visa interview. Valid passport and visa approval are mandatory.',
        visa_processing_time: '2-4 weeks (after approval)',
        cost_of_living_monthly: 2000,
        work_study_hours: 'On-campus: up to 20 hours during studies, full-time during breaks',
        post_study_work_visa: 'Optional Practical Training (OPT) - typically 12 months, up to 36 months for STEM',
      },
      {
        name: 'Dubai',
        code: 'AE',
        flag_emoji: '🇦🇪',
        description: 'Modern hub in the Middle East with thriving education sector and tax benefits.',
        about:
          'Dubai is a modern, cosmopolitan city offering world-class education with international perspective. Home to numerous universities and branch campuses from prestigious institutions, Dubai provides excellent facilities and international faculty. The city\'s business-friendly environment and tax benefits make it attractive for international students.',
        study_life:
          'Student life in Dubai is modern and cosmopolitan. Universities offer state-of-the-art facilities and international student bodies. The city provides shopping, dining, and entertainment options. Perfect weather allows for outdoor activities during cooler months. Strong sense of community among the expatriate student population.',
        opportunities:
          'Dubai offers excellent career opportunities in business, finance, tourism, and technology sectors. The city is a hub for international companies and entrepreneurship. Students gain exposure to Middle Eastern and Asian markets, creating unique career advantages.',
        student_permit_requirements:
          'International students need a UAE residence visa. Requirements include enrollment confirmation, proof of sponsor (usually the institution), medical screening, and sponsor approval. The process is relatively straightforward with institution support.',
        visa_processing_time: '2-3 weeks',
        cost_of_living_monthly: 1600,
        work_study_hours: 'Limited on-campus work permitted. Most restrictions apply during studies.',
        post_study_work_visa: 'Graduate Residence Visa - up to 2 years for certain qualifications',
      },
    ]

    const { data: countryData, error: countryError } = await supabase
      .from('countries')
      .insert(countries)
      .select()

    if (countryError) throw countryError

    // Seed universities - Map to country IDs (country_id: 1 for UK, 2 for Australia, etc.)
    const universities = [
      {
        name: 'University of Oxford',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Oxford',
        rank_world: 3,
        description:
          "Historic collegiate university and one of the world's leading institutions for education and research.",
        website_url: 'https://www.ox.ac.uk',
        founded_year: 1096,
        student_population: 24400,
      },
      {
        name: 'University of Cambridge',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Cambridge',
        rank_world: 2,
        description:
          'One of the oldest universities in the world, renowned for its academic excellence and research.',
        website_url: 'https://www.cam.ac.uk',
        founded_year: 1209,
        student_population: 19700,
      },
      {
        name: 'Imperial College London',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'London',
        rank_world: 6,
        description:
          'Leading science, engineering, medicine and business institution located in South Kensington.',
        website_url: 'https://www.imperial.ac.uk',
        founded_year: 1907,
        student_population: 18000,
      },
      {
        name: 'UCL (University College London)',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'London',
        rank_world: 8,
        description:
          "Founded in 1826, UCL is among the world's top multidisciplinary universities.",
        website_url: 'https://www.ucl.ac.uk',
        founded_year: 1826,
        student_population: 42000,
      },
      {
        name: 'London School of Economics',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'London',
        rank_world: 27,
        description:
          'Specialises in social sciences and is a leading institution for economics and business.',
        website_url: 'https://www.lse.ac.uk',
        founded_year: 1895,
        student_population: 11500,
      },
      {
        name: 'University of Edinburgh',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Edinburgh',
        rank_world: 23,
        description:
          "One of the UK's ancient universities with world-class research and teaching.",
        website_url: 'https://www.ed.ac.uk',
        founded_year: 1582,
        student_population: 36000,
      },
      {
        name: 'University of Manchester',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Manchester',
        rank_world: 54,
        description:
          'Major research university known for innovation and world-changing research.',
        website_url: 'https://www.manchester.ac.uk',
        founded_year: 1824,
        student_population: 41000,
      },
      {
        name: 'University of Bristol',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Bristol',
        rank_world: 68,
        description:
          'Russell Group university known for high-quality teaching and research.',
        website_url: 'https://www.bristol.ac.uk',
        founded_year: 1876,
        student_population: 28000,
      },
      {
        name: 'University of Warwick',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Coventry',
        rank_world: 80,
        description:
          'Highly rated for teaching and research with strong industry connections.',
        website_url: 'https://www.warwick.ac.uk',
        founded_year: 1965,
        student_population: 23000,
      },
      {
        name: 'University of Durham',
        country: 'United Kingdom',
        country_id: countryData[0].id,
        city: 'Durham',
        rank_world: 102,
        description:
          'Ancient university known for research excellence and student experience.',
        website_url: 'https://www.durham.ac.uk',
        founded_year: 1832,
        student_population: 19000,
      },
    ]

    const { data: uniData, error: uniError } = await supabase
      .from('universities')
      .insert(universities)
      .select()

    if (uniError) throw uniError

    // Seed courses - add country_id reference
    const courses = [
      {
        name: 'Computer Science MSc',
        code: 'COMP-001',
        university_id: uniData[0].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Advanced study in computer science covering AI, machine learning, and software engineering.',
        tuition_fees_international: 28000,
        intake_months: 'September, January',
        entry_requirements:
          'Bachelor\'s degree in Computer Science or related field',
      },
      {
        name: 'Physics PhD',
        code: 'PHYS-001',
        university_id: uniData[0].id,
        country_id: countryData[0].id,
        level: 'PhD',
        duration_years: 3,
        description:
          'Research-focused doctoral programme in theoretical and experimental physics.',
        tuition_fees_international: 35000,
        intake_months: 'September',
        entry_requirements:
          'Master\'s degree or strong Bachelor\'s in Physics',
      },
      {
        name: 'Business Administration MBA',
        code: 'BUS-001',
        university_id: uniData[1].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 2,
        description:
          'Leading MBA programme focusing on global business and strategic management.',
        tuition_fees_international: 42000,
        intake_months: 'September',
        entry_requirements: '3+ years work experience',
      },
      {
        name: 'Environmental Science MSc',
        code: 'ENV-001',
        university_id: uniData[1].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Study sustainable development and environmental policy solutions.',
        tuition_fees_international: 25000,
        intake_months: 'September',
        entry_requirements:
          'Bachelor\'s in Science or Environmental Studies',
      },
      {
        name: 'Engineering Postgraduate',
        code: 'ENG-001',
        university_id: uniData[2].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Specialise in mechanical, civil, electrical, or chemical engineering.',
        tuition_fees_international: 32000,
        intake_months: 'September',
        entry_requirements: 'Bachelor\'s in Engineering',
      },
      {
        name: 'Economics PhD',
        code: 'ECON-001',
        university_id: uniData[4].id,
        country_id: countryData[0].id,
        level: 'PhD',
        duration_years: 3,
        description:
          'Doctoral research in microeconomics, macroeconomics, and econometrics.',
        tuition_fees_international: 28000,
        intake_months: 'September',
        entry_requirements:
          'Master\'s in Economics or related field',
      },
      {
        name: 'Law LLM',
        code: 'LAW-001',
        university_id: uniData[5].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Specialised legal studies in international law, corporate law, and IP law.',
        tuition_fees_international: 30000,
        intake_months: 'September',
        entry_requirements: 'Bachelor\'s degree (any discipline)',
      },
      {
        name: 'Medicine MBBS',
        code: 'MED-001',
        university_id: uniData[3].id,
        country_id: countryData[0].id,
        level: 'Undergraduate',
        duration_years: 5,
        description:
          'Comprehensive medical education with clinical practice and research.',
        tuition_fees_international: 40000,
        intake_months: 'September',
        entry_requirements:
          'A-levels in Sciences (Chemistry, Biology, Physics)',
      },
      {
        name: 'Artificial Intelligence MSc',
        code: 'AI-001',
        university_id: uniData[6].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Advanced study in machine learning, neural networks, and AI applications.',
        tuition_fees_international: 35000,
        intake_months: 'September',
        entry_requirements:
          'Bachelor\'s in Computer Science or Mathematics',
      },
      {
        name: 'Psychology PhD',
        code: 'PSY-001',
        university_id: uniData[7].id,
        country_id: countryData[0].id,
        level: 'PhD',
        duration_years: 3,
        description:
          'Research in cognitive psychology, neuroscience, and behavioral studies.',
        tuition_fees_international: 26000,
        intake_months: 'September',
        entry_requirements: 'Master\'s in Psychology',
      },
      {
        name: 'Finance MSc',
        code: 'FIN-001',
        university_id: uniData[4].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Master advanced financial analysis, investment strategies, and risk management.',
        tuition_fees_international: 38000,
        intake_months: 'September, January',
        entry_requirements:
          'Bachelor\'s degree (preferably with mathematics/economics background)',
      },
      {
        name: 'Data Science MSc',
        code: 'DATA-001',
        university_id: uniData[8].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Learn statistical methods, big data technologies, and machine learning applications.',
        tuition_fees_international: 31000,
        intake_months: 'September',
        entry_requirements:
          'Bachelor\'s in Mathematics, Statistics, or Computer Science',
      },
      {
        name: 'Engineering Science MEng',
        code: 'MEENG-001',
        university_id: uniData[9].id,
        country_id: countryData[0].id,
        level: 'Undergraduate',
        duration_years: 4,
        description:
          'Four-year integrated engineering programme covering multiple engineering disciplines.',
        tuition_fees_international: 28000,
        intake_months: 'September',
        entry_requirements:
          'A-levels in Maths and Physics',
      },
      {
        name: 'Biochemistry MSc',
        code: 'BIOC-001',
        university_id: uniData[2].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description:
          'Advanced study of biological molecules and cellular processes.',
        tuition_fees_international: 27000,
        intake_months: 'September',
        entry_requirements:
          'Bachelor\'s in Chemistry or Biochemistry',
      },
      {
        name: 'International Relations MA',
        code: 'IR-001',
        university_id: uniData[3].id,
        country_id: countryData[0].id,
        level: 'Master',
        duration_years: 1,
        description: 'Study diplomacy, international law, and global politics.',
        tuition_fees_international: 24000,
        intake_months: 'September',
        entry_requirements: 'Bachelor\'s degree (any discipline)',
      },
      {
        name: 'Mechanical Engineering MEng',
        code: 'MECH-001',
        university_id: uniData[6].id,
        country_id: countryData[0].id,
        level: 'Undergraduate',
        duration_years: 4,
        description:
          'Design and develop mechanical systems and technologies.',
        tuition_fees_international: 26000,
        intake_months: 'September',
        entry_requirements:
          'A-levels in Maths and Physics',
      },
    ]

    const { error: courseError } = await supabase
      .from('courses')
      .insert(courses)

    if (courseError) throw courseError

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
