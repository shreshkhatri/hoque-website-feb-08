import type { Metadata } from 'next'
import { ContactPageClient } from '../contact/client'

export const metadata: Metadata = {
  title: 'Contact Us - HOQUE | Get Expert University Guidance',
  description:
    'Contact HOQUE for expert university admission guidance. Reach our advisors for course selection, visa support, and IELTS preparation. Available Mon-Fri, 9 AM - 6 PM GMT.',
  keywords:
    'contact us, university admission help, IELTS preparation, visa support, UK universities',
  openGraph: {
    title: 'Contact HOQUE - University Admission Experts',
    description:
      'Get in touch with our expert advisors to discuss your educational journey and university admission process.',
    url: 'https://hoque.org.uk/contact-us',
    type: 'website',
  },
}

export default function ContactUsPage() {
  return <ContactPageClient />
}
