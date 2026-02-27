import { EventsClient } from './client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTAConsultation } from '@/components/cta-consultation'

export const metadata = {
  title: 'Events | HOQUE - Student Events & Webinars',
  description: 'Discover upcoming events, webinars, university fairs, and networking opportunities across multiple countries. Search and filter events by location.',
  keywords: 'events, webinars, university fairs, workshops, networking events, student events, seminars',
}

export default function EventsPage() {
  return (
    <>
      <Header />
      <EventsClient />
      <CTAConsultation
        heading="Want to attend an event with guidance?"
        description="Our counsellors can help you prepare for university fairs, webinars, and open days so you make the most of every opportunity."
        badge="Event support"
      />
      <Footer />
    </>
  )
}
