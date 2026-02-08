import type { Metadata } from 'next'
import { AboutPageClient } from './client'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission, team, and commitment to helping international students achieve their educational goals at top UK universities.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
