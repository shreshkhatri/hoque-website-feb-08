import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  try {
    console.log('Starting testimonials FK migration...')

    // Check if columns exist
    const { data: columns } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'student_testimonials')

    const hasCountryId = columns?.some(c => c.column_name === 'country_id')
    const hasUniversityId = columns?.some(c => c.column_name === 'university_id')

    if (!hasCountryId || !hasUniversityId) {
      console.log('Adding foreign key columns...')
      
      if (!hasCountryId) {
        const { error } = await supabase.rpc('exec_sql', {
          sql: 'ALTER TABLE student_testimonials ADD COLUMN IF NOT EXISTS country_id BIGINT'
        })
        if (error) console.log('Note:', error.message)
      }

      if (!hasUniversityId) {
        const { error } = await supabase.rpc('exec_sql', {
          sql: 'ALTER TABLE student_testimonials ADD COLUMN IF NOT EXISTS university_id BIGINT'
        })
        if (error) console.log('Note:', error.message)
      }
    }

    // Get all countries and universities
    const { data: countries } = await supabase.from('countries').select('id, name')
    const { data: universities } = await supabase.from('universities').select('id, name')

    // Get testimonials
    const { data: testimonials } = await supabase
      .from('student_testimonials')
      .select('id, country, university')

    if (!testimonials) {
      console.log('No testimonials found')
      return
    }

    console.log(`Found ${testimonials.length} testimonials to update`)

    // Update each testimonial
    for (const testimonial of testimonials) {
      const countryMatch = countries?.find(c => c.name.toLowerCase() === (testimonial.country || '').toLowerCase())
      const universityMatch = universities?.find(u => u.name.toLowerCase() === (testimonial.university || '').toLowerCase())

      if (countryMatch || universityMatch) {
        const { error } = await supabase
          .from('student_testimonials')
          .update({
            country_id: countryMatch?.id || null,
            university_id: universityMatch?.id || null
          })
          .eq('id', testimonial.id)

        if (error) {
          console.error(`Failed to update testimonial ${testimonial.id}:`, error.message)
        } else {
          console.log(`Updated testimonial ${testimonial.id}: country_id=${countryMatch?.id}, university_id=${universityMatch?.id}`)
        }
      }
    }

    console.log('Migration completed!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrate()
