import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CourseContent } from '@/components/course-content'
import { getCourseStructuredData, getBreadcrumbStructuredData } from '@/lib/seo-config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Revalidate the page every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60

// Helper to convert name to slug
function nameToSlug(name: string, code?: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return code ? `${base}-${code.toLowerCase()}` : base
}

// Helper to find course by slug
async function getCourseBySlug(slug: string) {
  const { data: courses } = await supabase
    .from('courses')
    .select('*, universities(id, name, city, country_id), university_campuses(id, name, location, is_main_campus), countries(currency)')

  if (!courses) return null

  // First try exact match with name+code slug
  const exactMatch = courses.find(
    (c) => nameToSlug(c.name, c.code) === slug
  )
  if (exactMatch) return exactMatch

  // Fallback: try matching by name-only slug (for hardcoded links without code)
  const nameOnlyMatch = courses.find(
    (c) => nameToSlug(c.name) === slug
  )
  return nameOnlyMatch || null
}

// Fetch similar courses by field_of_study, excluding current course
async function getSimilarCourses(courseId: number, fieldOfStudy: string | null) {
  if (!fieldOfStudy) return []

  const { data: similarCourses } = await supabase
    .from('courses')
    .select('id, name, code, level, tuition_fees_international, duration_years, field_of_study, scholarship_amount, scholarship_type, universities(id, name, city), countries(id, name, flag_emoji, flag_image_url, currency)')
    .eq('field_of_study', fieldOfStudy)
    .neq('id', courseId)
    .limit(6)

  return similarCourses || []
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  const universityName =
    course.universities && typeof course.universities === 'object' && 'name' in course.universities
      ? course.universities.name
      : ''

  const title = universityName
    ? `${course.name} - ${universityName}`
    : `${course.name}`

  return {
    title,
    description:
      course.course_overview || course.description ||
      `Study ${course.name}${universityName ? ` at ${universityName}` : ''}. Get expert guidance on admissions from HOQUE.`,
    openGraph: {
      title,
      description:
        course.course_overview || course.description ||
        `Explore ${course.name} with HOQUE`,
      type: 'website',
    },
  }
}

// Generate static params for all courses
export async function generateStaticParams() {
  const { data: courses } = await supabase
    .from('courses')
    .select('name, code')

  if (!courses) return []

  return courses.map((course) => ({
    slug: nameToSlug(course.name, course.code),
  }))
}

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string; uniSlug?: string; uniName?: string }>
}) {
  const { slug } = await params
  const { from, uniSlug, uniName } = await searchParams
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  // Fetch similar courses based on field_of_study
  const similarCourses = await getSimilarCourses(course.id, course.field_of_study)

  // Generate structured data for SEO
  const courseStructuredData = getCourseStructuredData(course, slug)

  const universityName = course.universities && typeof course.universities === 'object' && 'name' in course.universities
    ? course.universities.name
    : 'Partner University'

  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' },
    { name: universityName, url: `/university/${universityName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
    { name: course.name, url: `/course/${slug}` },
  ])

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <CourseContent
          course={course}
          similarCourses={similarCourses}
          backContext={from === 'university' && uniSlug ? { uniSlug, uniName: uniName || '' } : undefined}
        />
        <Footer />
      </div>
    </>
  )
}
