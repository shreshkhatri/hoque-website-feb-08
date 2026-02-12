import type { Metadata } from 'next'
import { OneToOneConsultationClient } from './client'

export const metadata: Metadata = {
  title: 'One-to-One Free Student Consultation | HOQUE',
  description: 'Book a free one-to-one consultation with our expert consultants. Get personalised guidance for university admission, course selection, and visa requirements.',
  keywords: 'free consultation, university admission, international students, admission guidance, education institute',
}

export default function OneToOneConsultationPage() {
  return <OneToOneConsultationClient />
}
