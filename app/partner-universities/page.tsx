import { Metadata } from 'next'
import { PartnersClient } from './client'

export const metadata: Metadata = {
  title: 'Partner Universities | International Education Network',
  description: 'Explore our network of 30+ leading partner universities worldwide. Discover opportunities for study abroad programmes, degrees, and educational support.',
  keywords: 'partner universities, study abroad, international universities, international education',
  openGraph: {
    title: 'Partner Universities | HOQUE',
    description: 'Discover our network of leading partner universities worldwide',
    type: 'website',
  },
}

export default function PartnersPage() {
  return <PartnersClient />
}
