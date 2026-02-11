import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  // Step 1: Create the course_intake_months table
  console.log('Creating course_intake_months table...')
  const { error: createError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS course_intake_months (
        id BIGSERIAL PRIMARY KEY,
        course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        month VARCHAR(20) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(course_id, month)
      );
      CREATE INDEX IF NOT EXISTS idx_course_intake_months_course_id ON course_intake_months(course_id);
      CREATE INDEX IF NOT EXISTS idx_course_intake_months_month ON course_intake_months(month);
    `
  })

  if (createError) {
    console.log('RPC not available, trying direct approach via REST...')
    
    // Alternative: Use the Supabase REST API to check if table exists
    const { data: existingData, error: checkError } = await supabase
      .from('course_intake_months')
      .select('id')
      .limit(1)

    if (checkError && checkError.code === '42P01') {
      console.error('Table does not exist and cannot create it via RPC.')
      console.error('Please create the table manually in Supabase SQL Editor.')
      console.log(`
SQL to run:
CREATE TABLE IF NOT EXISTS course_intake_months (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  month VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, month)
);
CREATE INDEX IF NOT EXISTS idx_course_intake_months_course_id ON course_intake_months(course_id);
CREATE INDEX IF NOT EXISTS idx_course_intake_months_month ON course_intake_months(month);
ALTER TABLE course_intake_months ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on course_intake_months" ON course_intake_months FOR SELECT USING (true);
      `)
      process.exit(1)
    } else {
      console.log('Table already exists, proceeding with data migration...')
    }
  } else {
    console.log('Table created successfully.')
  }

  // Step 2: Fetch all courses with intake_months text
  console.log('Fetching courses with intake_months...')
  const { data: courses, error: fetchError } = await supabase
    .from('courses')
    .select('id, intake_months')
    .not('intake_months', 'is', null)

  if (fetchError) {
    console.error('Error fetching courses:', fetchError.message)
    process.exit(1)
  }

  console.log(`Found ${courses.length} courses with intake_months data.`)

  // Step 3: Parse and insert intake months
  let totalInserted = 0
  for (const course of courses) {
    if (!course.intake_months || course.intake_months.trim() === '') continue

    const months = course.intake_months
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0)

    if (months.length === 0) continue

    const rows = months.map(month => ({
      course_id: course.id,
      month: month,
    }))

    const { error: insertError } = await supabase
      .from('course_intake_months')
      .upsert(rows, { onConflict: 'course_id,month' })

    if (insertError) {
      console.error(`Error inserting for course ${course.id}:`, insertError.message)
    } else {
      totalInserted += rows.length
    }
  }

  console.log(`Migration complete. Inserted ${totalInserted} intake month records.`)
}

migrate().catch(console.error)
