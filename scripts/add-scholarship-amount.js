import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addScholarshipAmountColumn() {
  try {
    console.log('Adding scholarship_amount column to courses table...')
    
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE courses 
        ADD COLUMN IF NOT EXISTS scholarship_amount DECIMAL(10, 2);
        
        COMMENT ON COLUMN courses.scholarship_amount IS 'Scholarship amount available for international students';
      `
    })

    if (error) {
      console.error('Error adding column:', error)
      process.exit(1)
    }

    console.log('✓ Successfully added scholarship_amount column')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

addScholarshipAmountColumn()
