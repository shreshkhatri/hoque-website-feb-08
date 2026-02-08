import { EventsClient } from './client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Events | Hoque Consultancy - Student Events & Webinars',
  description: 'Discover upcoming events, webinars, university fairs, and networking opportunities across multiple countries. Search and filter events by location.',
  keywords: 'events, webinars, university fairs, workshops, networking events, student events, seminars',
}

export default function EventsPage() {
  return (
    <>
      <Header />
      <EventsClient />
      <Footer />
    </>
  )
}
