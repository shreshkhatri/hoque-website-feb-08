import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { JobApplicationClient } from './client'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const id = parseInt(slug.split('-')[0])

  if (isNaN(id)) {
    return { title: 'Job Not Found - Hoque Consultancy' }
  }

  const { data: vacancy } = await supabase
    .from('vacancies')
    .select('title, location_city, department')
    .eq('id', id)
    .single()

  if (!vacancy) {
    return { title: 'Job Not Found - Hoque Consultancy' }
  }

  return {
    title: `Apply - ${vacancy.title} (${vacancy.location_city}) | Hoque Consultancy`,
    description: `Apply for the ${vacancy.title} position in ${vacancy.location_city}. Join the ${vacancy.department} team at Hoque Consultancy.`,
  }
}

export default async function JobApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const id = parseInt(slug.split('-')[0])

  if (isNaN(id)) {
    notFound()
  }

  const { data: vacancy, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !vacancy) {
    notFound()
  }

  return <JobApplicationClient vacancy={vacancy} />
}
