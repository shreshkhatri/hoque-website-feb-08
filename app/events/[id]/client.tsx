'use client'

import { useEffect, useState } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  country_id: number
  country_name: string
  event_type: string
  image_url: string
  capacity: number
  registered_count: number
  status: string
  created_at: string
}

export function EventDetailsClient({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/events/${eventId}`)
        if (!response.ok) {
          throw new Error('Event not found')
        }
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').toUpperCase()
  }

  const isPastEvent = (dateStr: string) => {
    return new Date(dateStr) < new Date(new Date().toDateString())
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-muted-foreground text-lg mb-6">{error || 'Event not found'}</p>
          <Button asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    )
  }

  const registrationPercentage = event.capacity ? (event.registered_count / event.capacity) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/events" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {formatEventType(event.event_type)}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{event.title}</h1>
            </div>
            {isPastEvent(event.date) && (
              <span className="bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm font-semibold">
                PAST EVENT
              </span>
            )}
          </div>
        </div>

        {/* Event Image */}
        {event.image_url && (
          <div className="mb-8 rounded-lg overflow-hidden border border-border h-96 bg-muted">
            <img
              src={event.image_url || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Date & Time */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Calendar className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Date & Time</p>
                <p className="text-lg font-semibold text-foreground">{formatDate(event.date)}</p>
                <p className="text-foreground/70">{formatTime(event.time)}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Location</p>
                <p className="text-lg font-semibold text-foreground">{event.location}</p>
                <p className="text-foreground/70">{event.country_name}</p>
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Users className="text-primary flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <p className="text-muted-foreground text-sm mb-1">Registrations</p>
                <p className="text-lg font-semibold text-foreground mb-3">
                  {event.registered_count} / {event.capacity}
                </p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${registrationPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(registrationPercentage)}% registered
                </p>
              </div>
            </div>
          </div>

          {/* Event Type */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Clock className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Event Type</p>
                <p className="text-lg font-semibold text-foreground">{formatEventType(event.event_type)}</p>
                <p className="text-foreground/70 text-sm mt-1">
                  {event.status === 'past' ? 'Completed' : 'Upcoming'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">About This Event</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">{event.description}</p>

          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-3">Event Information</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>• This event provides valuable insights and networking opportunities</li>
              <li>• Limited capacity - register early to secure your spot</li>
              <li>• Open to international students and education seekers</li>
              <li>• Multiple countries hosting similar events</li>
            </ul>
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Register for This Event</h2>
          <p className="text-foreground/80 mb-6">
            {isPastEvent(event.date)
              ? 'This event has already taken place. View the details above for more information about what was covered.'
              : 'Reserve your spot at this exciting event. Fill out the registration form to confirm your attendance.'}
          </p>
          <Button 
            asChild 
            size="lg"
            disabled={isPastEvent(event.date)}
            className={`${
              isPastEvent(event.date)
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            <a href="#register">
              {isPastEvent(event.date) ? 'Event Completed' : 'Register Now'}
            </a>
          </Button>
        </div>

        {/* Related Events Link */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Looking for more events?</p>
          <Button asChild variant="outline">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
