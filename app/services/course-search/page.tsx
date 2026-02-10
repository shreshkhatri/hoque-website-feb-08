import { Metadata } from 'next'
import { CourseSearchClient } from './client'

export const metadata: Metadata = {
  title: 'Course Search | Find Your Perfect Course | HOQUE',
  description:
    'Explore thousands of courses at top universities worldwide across all subjects. Find the perfect course for your academic goals with Hoque.',
  keywords: [
    'course search',
    'find courses',
    'undergraduate courses',
    'postgraduate courses',
    'degree programs',
    'study abroad',
    'international courses',
  ],
}

export default function CourseSearchPage() {
  return <CourseSearchClient />
}
