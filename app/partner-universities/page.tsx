import { Metadata } from 'next'
import { PartnersClient } from './client'

export const metadata: Metadata = {
  title: 'Partner Universities | International Education Network',
  description: 'Explore our network of 30+ leading partner universities across the UK and internationally. Discover opportunities for study abroad programs, degrees, and educational support.',
  keywords: 'partner universities, study abroad, UK universities, international education',
  openGraph: {
    title: 'Partner Universities | HOQUE',
    description: 'Discover our network of leading partner universities worldwide',
    type: 'website',
  },
}

export default function PartnersPage() {
  return <PartnersClient />
}
