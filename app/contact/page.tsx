import type { Metadata } from 'next'
import { ContactPageClient } from './client'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our expert advisors to discuss your educational journey and university admission process.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
