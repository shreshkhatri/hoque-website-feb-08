import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function addScholarshipFields() {
  console.log('Adding scholarship fields to courses table...')

  try {
    // Check if columns already exist by trying to select them
    const { error: checkError } = await supabase
      .from('courses')
      .select('scholarship_amount, scholarship_type')
      .limit(1)

    if (!checkError) {
      console.log('✓ Scholarship fields already exist')
      return
    }

    // Execute SQL to add the columns
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Add scholarship_amount column (stores numeric value)
        ALTER TABLE courses 
        ADD COLUMN IF NOT EXISTS scholarship_amount DECIMAL(10, 2);
        
        -- Add scholarship_type column (stores 'amount' or 'percentage')
        ALTER TABLE courses 
        ADD COLUMN IF NOT EXISTS scholarship_type TEXT CHECK (scholarship_type IN ('amount', 'percentage'));
        
        -- Add comment for clarity
        COMMENT ON COLUMN courses.scholarship_amount IS 'Scholarship value - can be exact amount or percentage depending on scholarship_type';
        COMMENT ON COLUMN courses.scholarship_type IS 'Type of scholarship: amount (exact value) or percentage (% discount)';
      `
    })

    if (error) {
      throw error
    }

    console.log('✓ Successfully added scholarship_amount and scholarship_type columns to courses table')
  } catch (error) {
    console.error('✗ Error adding scholarship fields:', error.message)
    process.exit(1)
  }
}

addScholarshipFields()
