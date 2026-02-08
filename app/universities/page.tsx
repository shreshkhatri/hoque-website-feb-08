import type { Metadata } from 'next'
import { UniversitiesPageClient } from './client'

export const metadata: Metadata = {
  title: 'Explore Universities',
  description: 'Browse top universities across multiple countries. Filter by location to find the perfect university for your higher education journey.',
}

export default function UniversitiesPage() {
  return <UniversitiesPageClient />
}
