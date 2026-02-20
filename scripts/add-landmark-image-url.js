import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function addLandmarkImageUrlColumn() {
  try {
    console.log('[v0] Adding landmark_image_url column to countries table...')

    const { error } = await supabase.rpc('execute_sql', {
      query: `
        ALTER TABLE countries 
        ADD COLUMN IF NOT EXISTS landmark_image_url TEXT;
      `,
    })

    if (error) {
      // Try direct SQL approach
      const { data, error: sqlError } = await supabase.from('countries').select('*').limit(1)
      
      if (sqlError) {
        console.error('Error checking table:', sqlError)
        return
      }

      console.log('[v0] Table exists. Migration would need to be run in Supabase SQL Editor.')
      console.log(`Run this SQL in Supabase SQL Editor:
        ALTER TABLE countries 
        ADD COLUMN IF NOT EXISTS landmark_image_url TEXT;
      `)
      return
    }

    console.log('[v0] Successfully added landmark_image_url column')
  } catch (err: any) {
    console.error('[v0] Error:', err.message)
  }
}

addLandmarkImageUrlColumn()
