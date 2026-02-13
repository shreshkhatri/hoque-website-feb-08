import type { Metadata } from 'next'
import { CareerPageClient } from './client'

export const metadata: Metadata = {
  title: 'Careers | Join Our Team',
  description:
    'Explore career opportunities at Hoque Consultancy. Join our growing team across the UK and Bangladesh and help shape the future of international education.',
}

export default function CareerPage() {
  return <CareerPageClient />
}
