import { Metadata } from 'next'
import { UniversityApplicationClient } from './client'

export const metadata: Metadata = {
  title: 'University Application Support | Expert Guidance for UK Universities',
  description: 'Get expert guidance for your UK university application. Our consultants help with personal statements, documents, and the complete application process.',
  keywords: 'university application, UK university application help, application support, personal statement help, university application guidance',
  openGraph: {
    title: 'University Application Support | HOQUE',
    description: 'Expert support for UK university applications including personal statements and document preparation',
    type: 'website',
  },
}

export default function UniversityApplicationPage() {
  return <UniversityApplicationClient />
}
