'use client'

import { useEffect, useState } from 'react'
import { Calendar, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  country_id: string
  country_name: string
  event_type: string
  capacity: number
  registered_count: number
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/events')
        if (response.ok) {
          const allEvents = await response.json()

          // Sort by date in descending order and filter for upcoming events
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const upcomingEvents = allEvents
            .filter((event: Event) => {
              const eventDate = new Date(event.date)
              eventDate.setHours(0, 0, 0, 0)
              return eventDate >= today
            })
            .sort((a: Event, b: Event) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            .slice(0, 5) // Get top 5 events

          setEvents(upcomingEvents)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    } catch {
      return timeString
    }
  }

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our upcoming events for expert guidance on UK university admissions, IELTS preparation, and student services.
            </p>
          </div>

          {/* Events Grid */}
          {!loading && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6 space-y-4 border border-border"
                >
                  {/* Event Type Badge */}
                  <div className="flex items-start justify-between">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {event.event_type.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Event Title */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground line-clamp-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-sm text-foreground/70 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-accent flex-shrink-0 mt-1" />
                      <div className="text-sm text-foreground/80">
                        <div>{formatDate(event.date)}</div>
                        {event.time && (
                          <div className="text-xs text-muted-foreground">
                            {formatTime(event.time)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-accent flex-shrink-0 mt-1" />
                      <span className="text-sm text-foreground/80 line-clamp-2">{event.location}</span>
                    </div>

                    {/* Country */}
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                        {event.country_name}
                      </span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href={`/events/${event.id}`}>View Details</a>
                  </Button>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">No upcoming events at the moment.</p>
            </div>
          )}

          {/* View All Events Link */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <a href="/events">View All Events</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
