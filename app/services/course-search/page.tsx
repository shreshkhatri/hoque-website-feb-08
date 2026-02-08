import { Metadata } from 'next'
import { CourseSearchClient } from './client'

export const metadata: Metadata = {
  title: 'Course Search | Find Your Perfect Course | Hoque Consultancy',
  description:
    'Explore thousands of courses at UK universities across all subjects. Find the perfect course for your academic goals with Hoque Consultancy.',
  keywords: [
    'course search',
    'find courses',
    'UK courses',
    'undergraduate courses',
    'postgraduate courses',
    'degree programs',
    'study in UK',
  ],
}

export default function CourseSearchPage() {
  return <CourseSearchClient />
}
