import { Metadata } from 'next'
import { UniversityApplicationClient } from './client'

export const metadata: Metadata = {
  title: 'University Application Support | Expert Guidance | HOQUE',
  description: 'Get expert guidance for your university application worldwide. Our consultants help with personal statements, documents, and the complete application process.',
  keywords: 'university application, university application help, application support, personal statement help, university application guidance',
  openGraph: {
    title: 'University Application Support | HOQUE',
    description: 'Expert support for university applications including personal statements and document preparation',
    type: 'website',
  },
}

export default function UniversityApplicationPage() {
  return <UniversityApplicationClient />
}
