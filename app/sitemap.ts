import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export const dynamic = 'force-dynamic'

function nameToSlug(name: string, code: string = ''): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[&]/g, 'and')
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-+/g, '-')
  return code ? `${slug}-${code.toLowerCase()}` : slug
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.hoque.org.uk'
  const today = new Date().toISOString().split('T')[0]

  // Static pages with priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/universities`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/countries`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  try {
    // Fetch courses
    const { data: courses } = await supabase
      .from('courses')
      .select('id, name, code, updated_at')
      .limit(500)

    const courseSitemap: MetadataRoute.Sitemap = (courses || []).map((course: any) => ({
      url: `${baseUrl}/course/${nameToSlug(course.name, course.code)}`,
      lastModified: course.updated_at ? course.updated_at.split('T')[0] : today,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Fetch universities
    const { data: universities } = await supabase
      .from('universities')
      .select('id, name, updated_at')
      .limit(500)

    const universitySitemap: MetadataRoute.Sitemap = (universities || []).map(
      (uni: any) => ({
        url: `${baseUrl}/university/${nameToSlug(uni.name)}`,
        lastModified: uni.updated_at ? uni.updated_at.split('T')[0] : today,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    )

    // Fetch countries
    const { data: countries } = await supabase
      .from('countries')
      .select('id, name, updated_at')
      .limit(500)

    const countrySitemap: MetadataRoute.Sitemap = (countries || []).map(
      (country: any) => ({
        url: `${baseUrl}/country/${nameToSlug(country.name)}`,
        lastModified: country.updated_at ? country.updated_at.split('T')[0] : today,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })
    )

    // Fetch events
    const { data: events } = await supabase
      .from('events')
      .select('id, title, date, updated_at')
      .order('date', { ascending: false })
      .limit(500)

    const eventSitemap: MetadataRoute.Sitemap = (events || [])
      .filter((event: any) => {
        const eventDate = new Date(event.date)
        const now = new Date()
        return eventDate >= now || eventDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      })
      .map((event: any) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: event.updated_at ? event.updated_at.split('T')[0] : today,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))

    // Combine all sitemaps
    return [
      ...staticPages,
      ...courseSitemap,
      ...universitySitemap,
      ...countrySitemap,
      ...eventSitemap,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
