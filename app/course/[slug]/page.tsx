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
    .select('*, universities(id, name, city, country_id)')

  if (!courses) return null

  // Find course whose name+code converts to the given slug
  const course = courses.find(
    (c) => nameToSlug(c.name, c.code) === slug
  )

  return course || null
}

// Fetch similar courses by field_of_study, excluding current course
async function getSimilarCourses(courseId: number, fieldOfStudy: string | null) {
  if (!fieldOfStudy) return []

  const { data: similarCourses } = await supabase
    .from('courses')
    .select('id, name, code, level, tuition_fees_international, duration_years, field_of_study, universities(id, name, city), countries(id, name, flag_emoji)')
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
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  // Fetch similar courses based on field_of_study
  const similarCourses = await getSimilarCourses(course.id, course.field_of_study)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CourseContent course={course} similarCourses={similarCourses} />
      <Footer />
    </div>
  )
}
