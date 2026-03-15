import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CoursesPageClient } from './client'

export const metadata: Metadata = {
  title: 'Explore Courses',
  description: 'Browse courses from top universities worldwide. Filter by country, program level, and field of study to find your perfect course.',
}

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesPageClient />
    </Suspense>
  )
}
