import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function addScholarshipColumns() {
  try {
    console.log('Adding scholarship_amount and scholarship_type columns to courses table...')
    
    // Use raw SQL to add columns
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE courses 
        ADD COLUMN IF NOT EXISTS scholarship_amount DECIMAL(10,2),
        ADD COLUMN IF NOT EXISTS scholarship_type TEXT CHECK (scholarship_type IN ('amount', 'percentage'));
      `
    })

    if (error1) {
      // Try alternative approach using direct queries
      console.log('Trying direct column additions...')
      
      const queries = [
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_amount DECIMAL(10,2);",
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_type TEXT CHECK (scholarship_type IN ('amount', 'percentage'));"
      ]
      
      for (const query of queries) {
        const { error } = await supabase.rpc('exec_sql', { sql: query })
        if (error) {
          console.log('⚠️  Could not execute migration via RPC:', error.message)
          console.log('\nPlease run the following SQL manually in Supabase SQL Editor:')
          console.log('\n-- Add scholarship columns')
          console.log('ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_amount DECIMAL(10,2);')
          console.log('ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_type TEXT CHECK (scholarship_type IN (\'amount\', \'percentage\'));')
          console.log('\nThe form will work once these columns are added.')
          return
        }
      }
    }

    console.log('✅ Successfully added scholarship columns')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\nPlease run the following SQL manually in Supabase SQL Editor:')
    console.log('\n-- Add scholarship columns')
    console.log('ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_amount DECIMAL(10,2);')
    console.log('ALTER TABLE courses ADD COLUMN IF NOT EXISTS scholarship_type TEXT CHECK (scholarship_type IN (\'amount\', \'percentage\'));')
  }
}

addScholarshipColumns()
