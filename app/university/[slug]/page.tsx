import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { UniversityContent } from '@/components/university-content'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Revalidate the page every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60

// Helper to convert name to slug
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Helper to find university by slug (matching against generated slug from name)
async function getUniversityBySlug(slug: string) {
  const { data: universities } = await supabase
    .from('universities')
    .select('*')

  if (!universities) return null

  // Find university whose name converts to the given slug
  const university = universities.find(
    (uni) => nameToSlug(uni.name) === slug
  )

  return university || null
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const university = await getUniversityBySlug(slug)

  if (!university) {
    return {
      title: 'University Not Found | Uni Admission',
    }
  }

  return {
    title: `${university.name} | Uni Admission`,
    description:
      university.description ||
      `Learn about ${university.name} - admissions, courses, rankings, and more. Get expert guidance from Uni Admission.`,
    openGraph: {
      title: `${university.name} | Uni Admission`,
      description:
        university.description ||
        `Explore ${university.name} with Uni Admission`,
      type: 'website',
    },
  }
}

// Generate static params for all universities
export async function generateStaticParams() {
  const { data: universities } = await supabase
    .from('universities')
    .select('name')

  if (!universities) return []

  return universities.map((uni) => ({
    slug: nameToSlug(uni.name),
  }))
}

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const university = await getUniversityBySlug(slug)

  if (!university) {
    notFound()
  }

  // Fetch country currency
  let currency: string | null = null
  if (university.country_id) {
    const { data: countryData } = await supabase
      .from('countries')
      .select('currency')
      .eq('id', university.country_id)
      .single()
    currency = countryData?.currency || null
  }

  // Fetch campuses for this university
  const { data: campuses } = await supabase
    .from('university_campuses')
    .select('*')
    .eq('university_id', university.id)
    .order('is_main_campus', { ascending: false })

  // Fetch courses for this university, including campus info
  const { data: courses } = await supabase
    .from('courses')
    .select('*, university_campuses(id, name, location, is_main_campus)')
    .eq('university_id', university.id)

  // Fetch active announcements for this university
  const now = new Date().toISOString()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('university_id', university.id)
    .eq('is_active', true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('published_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <UniversityContent 
        university={university} 
        courses={courses || []} 
        campuses={campuses || []} 
        currency={currency}
        announcements={announcements || []}
      />
      <Footer />
    </div>
  )
}
