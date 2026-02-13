import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('[v0] Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertUniversitiesAndCourses() {
  try {
    console.log('[v0] Starting database insertion...');

    // Universities data with all required fields (matching schema)
    const universities = [
      {
        name: "Queen's University Belfast",
        city: 'Belfast',
        country: 'United Kingdom',
        description: 'Russell Group research-intensive university offering world-class education with strong postgraduate programs in business, science, and engineering',
        website_url: 'https://www.qub.ac.uk',
        founded_year: 1845,
        student_population: 25000,
        rank_world: 180,
      },
      {
        name: 'Northumbria University',
        city: 'Newcastle',
        country: 'United Kingdom',
        description: 'Modern university known for industry-focused teaching, innovative research, and strong business school with AACSB accreditation',
        website_url: 'https://www.northumbria.ac.uk',
        founded_year: 1969,
        student_population: 34000,
        rank_world: 450,
      },
      {
        name: 'University of Greenwich',
        city: 'London',
        country: 'United Kingdom',
        description: 'London-based university offering practical, career-focused education with strong links to industry and diverse student community',
        website_url: 'https://www.gre.ac.uk',
        founded_year: 1890,
        student_population: 18000,
        rank_world: 700,
      },
      {
        name: 'Middlesex University',
        city: 'London',
        country: 'United Kingdom',
        description: 'Forward-thinking university in North London with innovative approach to teaching and research, internationally recognized programs',
        website_url: 'https://www.mdx.ac.uk',
        founded_year: 1973,
        student_population: 20000,
        rank_world: 600,
      },
      {
        name: 'London South Bank University',
        city: 'London',
        country: 'United Kingdom',
        description: 'Modern metropolitan university offering practical vocational education with strong connections to London employers and industry',
        website_url: 'https://www.lsbu.ac.uk',
        founded_year: 1892,
        student_population: 15000,
        rank_world: 750,
      },
    ];

    // Insert universities
    console.log('[v0] Inserting universities...');
    const { data: uniData, error: uniError } = await supabase
      .from('universities')
      .insert(universities)
      .select();

    if (uniError) {
      console.error('[v0] Error inserting universities:', uniError);
    } else {
      console.log('[v0] Universities inserted successfully:', uniData?.length || 0);
    }

    // Fetch university IDs for course insertion
    const { data: insertedUnis, error: fetchError } = await supabase
      .from('universities')
      .select('id, name')
      .in('name', universities.map(u => u.name));

    if (fetchError) {
      console.error('[v0] Error fetching inserted universities:', fetchError);
      return;
    }

    console.log('[v0] Fetched universities:', insertedUnis);

    // Create a map of university names to IDs
    const uniMap = new Map();
    insertedUnis?.forEach(uni => {
      uniMap.set(uni.name, uni.id);
    });

    // Courses data
    const courses = [
      // Northumbria University
      {
        name: 'MSc Business with International Management',
        code: 'NUMB-001',
        university_id: uniMap.get('Northumbria University'),
        level: 'Master',
        duration_years: 1,
        description: 'Integrates key themes in international business, strategic management, innovation, and leadership. Includes International Business Simulation module for strategic thinking development. Studio-based problem solving with emphasis on teamwork and innovative solutions. Newcastle Business School holds AACSB accreditation.',
        tuition_fees_international: 24000,
        intake_months: 'January,May,September',
        entry_requirements: "Bachelor degree (2:2 minimum) or Master's degree in related discipline. IELTS 6.0 (minimum 5.5 in each skill). Valid passport with 6+ months validity. TB certificate (issued within 6 months). Letter of Recommendation (dated within 6 months)",
      },
      // Queen's University Belfast
      {
        name: 'MSc Data Science and Artificial Intelligence',
        code: 'QUB-001',
        university_id: uniMap.get("Queen's University Belfast"),
        level: 'Master',
        duration_years: 1,
        description: 'Comprehensive program covering data science, machine learning, and artificial intelligence applications. Focus on practical skills, industry-standard tools, and real-world problem solving. Strong emphasis on AI ethics and responsible innovation. Includes project-based learning and industry partnerships.',
        tuition_fees_international: 22000,
        intake_months: 'January,September',
        entry_requirements: 'Bachelor degree in Computer Science, Mathematics, or related field (2:1 minimum). IELTS 6.5 (minimum 6.0 in each skill). Strong analytical and programming skills. GPA 3.0+ or equivalent',
      },
      {
        name: 'MSc Advanced Engineering',
        code: 'QUB-002',
        university_id: uniMap.get("Queen's University Belfast"),
        level: 'Master',
        duration_years: 1,
        description: 'Advanced engineering program covering mechanical, civil, and electronic engineering specializations. Focus on sustainable design and modern engineering practices.',
        tuition_fees_international: 21000,
        intake_months: 'September',
        entry_requirements: 'Bachelor in Engineering (2:1 minimum). IELTS 6.5. Strong technical background',
      },
      {
        name: 'MSc Finance',
        code: 'QUB-003',
        university_id: uniMap.get("Queen's University Belfast"),
        level: 'Master',
        duration_years: 1,
        description: 'Specialized finance program covering investment, corporate finance, and financial markets. Prepares students for professional certifications.',
        tuition_fees_international: 20000,
        intake_months: 'January,September',
        entry_requirements: 'Bachelor in Finance, Economics or related (2:1 minimum). IELTS 6.5. Strong quantitative skills',
      },
      // University of Greenwich
      {
        name: 'MSc Business Management',
        code: 'GRE-001',
        university_id: uniMap.get('University of Greenwich'),
        level: 'Master',
        duration_years: 1,
        description: 'Career-focused business management program with emphasis on practical skills and industry applications. Covers strategy, operations, and organizational management.',
        tuition_fees_international: 18000,
        intake_months: 'January,September',
        entry_requirements: 'Bachelor degree or equivalent. IELTS 6.0. Work experience beneficial',
      },
      {
        name: 'MSc Computer Science',
        code: 'GRE-002',
        university_id: uniMap.get('University of Greenwich'),
        level: 'Master',
        duration_years: 1,
        description: 'Modern computer science program with focus on software development and emerging technologies.',
        tuition_fees_international: 19000,
        intake_months: 'September',
        entry_requirements: 'Bachelor in Computer Science or related (2:2 minimum). IELTS 6.0',
      },
      // Middlesex University
      {
        name: 'MSc International Business',
        code: 'MDX-001',
        university_id: uniMap.get('Middlesex University'),
        level: 'Master',
        duration_years: 1,
        description: 'Forward-thinking program examining global business challenges, international strategy, and cross-cultural management.',
        tuition_fees_international: 17500,
        intake_months: 'January,September',
        entry_requirements: 'Bachelor degree. IELTS 6.0. International business interest',
      },
      {
        name: 'MSc Engineering (Advanced Practice)',
        code: 'MDX-002',
        university_id: uniMap.get('Middlesex University'),
        level: 'Master',
        duration_years: 1,
        description: 'Engineering program combining theory with practical industry experience and professional development.',
        tuition_fees_international: 18500,
        intake_months: 'September',
        entry_requirements: 'Bachelor in Engineering (2:2 minimum). IELTS 6.0',
      },
      // London South Bank University
      {
        name: 'MSc Business and Management',
        code: 'LSBU-001',
        university_id: uniMap.get('London South Bank University'),
        level: 'Master',
        duration_years: 1,
        description: 'Practical business management program with strong employer links and focus on real-world applications.',
        tuition_fees_international: 15000,
        intake_months: 'January,September',
        entry_requirements: 'Bachelor degree. IELTS 6.0. Work experience valuable',
      },
      {
        name: 'MSc Engineering and Technology',
        code: 'LSBU-002',
        university_id: uniMap.get('London South Bank University'),
        level: 'Master',
        duration_years: 1,
        description: 'Engineering program with practical focus and strong industry connections in London.',
        tuition_fees_international: 16000,
        intake_months: 'September',
        entry_requirements: 'Bachelor in Engineering (2:2 minimum). IELTS 6.0',
      },
      {
        name: 'MSc Computing',
        code: 'LSBU-003',
        university_id: uniMap.get('London South Bank University'),
        level: 'Master',
        duration_years: 1,
        description: 'Modern computing program covering software development, cloud computing, and cybersecurity.',
        tuition_fees_international: 16500,
        intake_months: 'September',
        entry_requirements: 'Bachelor in Computing or related (2:2 minimum). IELTS 6.0',
      },
    ];

    // Filter out courses with missing university IDs
    const validCourses = courses.filter(course => course.university_id);

    if (validCourses.length === 0) {
      console.error('[v0] No valid courses to insert - missing university IDs');
      return;
    }

    console.log('[v0] Inserting courses...');
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .insert(validCourses)
      .select();

    if (courseError) {
      console.error('[v0] Error inserting courses:', courseError);
    } else {
      console.log('[v0] Courses inserted successfully:', courseData?.length || 0);
    }

    console.log('[v0] Database insertion completed!');
  } catch (error) {
    console.error('[v0] Unexpected error:', error);
  }
}

// Run the insertion
insertUniversitiesAndCourses();
