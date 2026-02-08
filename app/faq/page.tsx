import type { Metadata } from 'next'
import { FAQPageClient } from './client'

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Find answers to common questions about studying abroad, visa requirements, applications, and more.',
}

export default function FAQPage() {
  return <FAQPageClient />
}
