import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { EventDetailsClient } from './client'
import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'

interface EventDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventDetailsPageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const { data: event } = await supabase
      .from('events')
      .select('id, title, description, date, location, countries(name)')
      .eq('id', id)
      .single()

    if (event) {
      const eventDate = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      return {
        title: `${event.title} - ${eventDate} | Hoque Consultancy`,
        description: `${event.description?.substring(0, 155)}... Register for this event in ${event.countries?.name || 'our upcoming event'}.`,
        keywords: `${event.title}, event, seminar, workshop, ${event.countries?.name || 'student event'}`,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }

  return {
    title: 'Event Details | Hoque Consultancy',
    description: 'View detailed information about our student events and webinars.',
  }
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { id } = await params

  return (
    <>
      <Header />
      <EventDetailsClient eventId={id} />
      <Footer />
    </>
  )
}
