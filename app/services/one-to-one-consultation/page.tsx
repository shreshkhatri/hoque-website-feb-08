import type { Metadata } from 'next'
import { OneToOneConsultationClient } from './client'

export const metadata: Metadata = {
  title: 'One-to-One Free Student Consultation | HOQUE Consultancy',
  description: 'Book a free one-to-one consultation with our British Council trained consultants. Get personalized guidance for UK university admission, course selection, and visa requirements.',
  keywords: 'free consultation, UK university, international students, admission guidance, British Council trained',
}

export default function OneToOneConsultationPage() {
  return <OneToOneConsultationClient />
}
