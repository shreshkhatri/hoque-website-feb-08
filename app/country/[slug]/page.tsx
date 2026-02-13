import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CountryContent } from '@/components/country-content'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Helper to convert name to slug
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Helper to find country by slug
async function getCountryBySlug(slug: string) {
  const { data: countries } = await supabase
    .from('countries')
    .select('*')

  if (!countries) return null

  // Find country whose name converts to the given slug
  const country = countries.find(
    (c) => nameToSlug(c.name) === slug
  )

  return country || null
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const country = await getCountryBySlug(slug)

  if (!country) {
    return {
      title: 'Country Not Found',
    }
  }

  return {
    title: `Study in ${country.name}`,
    description:
      country.description ||
      `Explore study abroad opportunities in ${country.name}. Get expert guidance on universities, visas, and admissions from HOQUE.`,
    openGraph: {
      title: `Study in ${country.name}`,
      description:
        country.description ||
        `Study in ${country.name}`,
      type: 'website',
    },
  }
}

// Generate static params for all countries
export async function generateStaticParams() {
  const { data: countries } = await supabase
    .from('countries')
    .select('name')

  if (!countries) return []

  return countries.map((country) => ({
    slug: nameToSlug(country.name),
  }))
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const country = await getCountryBySlug(slug)

  if (!country) {
    notFound()
  }

  // Fetch universities in this country
  const { data: universities } = await supabase
    .from('universities')
    .select('*')
    .eq('country_id', country.id)

  // Fetch courses in this country
  const { data: courses } = await supabase
    .from('courses')
    .select('*, universities(*), university_campuses(id, name, location, is_main_campus)')
    .eq('country_id', country.id)

  // Fetch country fun facts
  const { data: funFacts } = await supabase
    .from('country_fun_facts')
    .select('*')
    .eq('country_id', country.id)
    .order('display_order', { ascending: true })

  // Fetch country FAQs
  const { data: faqs } = await supabase
    .from('country_faqs')
    .select('*')
    .eq('country_id', country.id)
    .order('display_order', { ascending: true })

  // Fetch country employment sectors
  const { data: employmentSectors } = await supabase
    .from('country_employment_sectors')
    .select('*')
    .eq('country_id', country.id)
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CountryContent
        country={country}
        universities={universities || []}
        courses={courses || []}
        funFacts={funFacts || []}
        faqs={faqs || []}
        employmentSectors={employmentSectors || []}
      />
      <Footer />
    </div>
  )
}
