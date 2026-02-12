import { ApplicationFormClient } from './client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Application Form | HOQUE',
  description: 'Apply for your university program through HOQUE. Complete our comprehensive student application form with document uploads.',
  keywords: ['student application', 'university application', 'apply now', 'education consultancy'],
}

export default function ApplicationFormPage() {
  return <ApplicationFormClient />
}
