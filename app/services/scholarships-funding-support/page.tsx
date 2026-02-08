import { Metadata } from 'next'
import { ScholarshipsFundingSupportClient } from './client'

export const metadata: Metadata = {
  title: 'Scholarships & Funding Support for International Students | Hoque Consultancy',
  description: 'Access prestigious UK university scholarships, bursaries, and funding opportunities for international students. Our expert team helps you secure financial aid for your studies.',
  keywords: 'scholarships UK, international student funding, bursaries, scholarship application, funding support',
}

export default function ScholarshipsFundingSupportPage() {
  return <ScholarshipsFundingSupportClient />
}
