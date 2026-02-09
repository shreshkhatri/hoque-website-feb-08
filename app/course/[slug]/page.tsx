import { supabase } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CourseContent } from '@/components/course-content'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
    .select('*, universities(*)')

  if (!courses) return null

  // Find course whose name+code converts to the given slug
  const course = courses.find(
    (c) => nameToSlug(c.name, c.code) === slug
  )

  return course || null
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
      course.description ||
      `Study ${course.name}${universityName ? ` at ${universityName}` : ''}. Get expert guidance on admissions from Hoque.`,
    openGraph: {
      title,
      description:
        course.description ||
        `Explore ${course.name} with Hoque`,
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
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CourseContent course={course} />
      <Footer />
    </div>
  )
}
