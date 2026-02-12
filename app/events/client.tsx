'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Clock, Users, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Footer } from '@/components/footer'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  country_id: string
  country_name: string
  location: string
  event_type: string
  capacity: number
  registered_count: number
  image_url?: string
  status: 'upcoming' | 'past'
}

interface Country {
  id: string
  name: string
}

export function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState<Country[]>([])

  // Fetch countries and events from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [countriesRes, eventsRes] = await Promise.all([
          fetch('/api/countries'),
          fetch('/api/events'),
        ])

        if (countriesRes.ok) {
          const countriesData = await countriesRes.json()
          setCountries(countriesData)
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json()
          setEvents(eventsData)
          setFilteredEvents(eventsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper function to get event type badge styling
  const getEventTypeBadgeStyle = (eventType: string) => {
    const type = eventType.toLowerCase()
    switch (type) {
      case 'university_fair':
        return 'bg-primary/20 text-primary'
      case 'workshop':
        return 'bg-blue-500/20 text-blue-600'
      case 'seminar':
        return 'bg-yellow-500/20 text-yellow-600'
      case 'webinar':
        return 'bg-accent/20 text-accent'
      case 'networking':
        return 'bg-green-500/20 text-green-600'
      case 'panel_discussion':
      case 'selection_event':
      case 'virtual_event':
        return 'bg-purple-500/20 text-purple-600'
      default:
        return 'bg-gray-500/20 text-gray-600'
    }
  }

  // Format event type for display
  const formatEventType = (eventType: string) => {
    return eventType
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Binary search to find partition point between future and past events
  const binarySearchEventPartition = (sortedEvents: Event[]) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let left = 0
    let right = sortedEvents.length

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      const eventDate = new Date(sortedEvents[mid].date)
      eventDate.setHours(0, 0, 0, 0)

      if (eventDate < today) {
        right = mid
      } else {
        left = mid + 1
      }
    }

    return left
  }

  // Sort events by date in descending order and partition using binary search
  useEffect(() => {
    let filtered = [...events]

    // Filter by country
    if (selectedCountryId) {
      filtered = filtered.filter((event) => event.country_id === selectedCountryId)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort by date in descending order (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setFilteredEvents(filtered)
  }, [searchTerm, selectedCountryId, events])

  // Use binary search to partition events into upcoming and past
  // Note: Events are sorted DESCENDING (newest first), so upcoming events come BEFORE past events
  const partitionIndex = binarySearchEventPartition(filteredEvents)
  const upcomingEvents = filteredEvents.slice(0, partitionIndex)
  const pastEvents = filteredEvents.slice(partitionIndex)

  // Helper function to check if event is past
  const isPastEvent = (date: string) => {
    const eventDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return eventDate < today
  }

  // EventCard component
  const EventCard = ({ event }: { event: Event }) => {
    const isPast = isPastEvent(event.date)
    
    return (
      <div className={`bg-card border rounded-lg overflow-hidden transition-all h-full flex flex-col ${
        isPast 
          ? 'opacity-60 grayscale border-border/50' 
          : 'border-border hover:shadow-lg hover:border-primary/50'
      }`}>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getEventTypeBadgeStyle(event.event_type)}`}>
                {formatEventType(event.event_type)}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{event.title}</h3>
            </div>
            {isPast && <span className="text-xs text-muted-foreground font-semibold ml-2 bg-muted px-2 py-1 rounded">PAST</span>}
          </div>

          <p className="text-foreground/70 mb-4 line-clamp-3 text-sm flex-1">{event.description}</p>

          <div className="space-y-2 mb-4 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {event.capacity && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-muted-foreground">Registrations</span>
                <span className="font-semibold text-foreground">{event.registered_count}/{event.capacity}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(event.registered_count / event.capacity) * 100}%` }}
                />
              </div>
            </div>
          )}

          <Button 
            asChild 
            disabled={isPast}
            className={`w-full mt-auto ${
              isPast 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            <a href={`/events/${event.id}`}>{isPast ? 'View Details' : 'Register'}</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Student Events & Webinars
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover upcoming university fairs, workshops, seminars, and networking opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Country Filter */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground flex items-center justify-between hover:border-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={20} />
                  {selectedCountryId === '' ? 'Select Country' : countries.find((c) => c.id === selectedCountryId)?.name}
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                  <button
                    key="all"
                    onClick={() => {
                      setSelectedCountryId('')
                      setShowCountryDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors ${
                      selectedCountryId === '' ? 'bg-primary/20 text-primary font-semibold' : ''
                    }`}
                  >
                    All Countries
                  </button>
                  {countries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => {
                        setSelectedCountryId(country.id)
                        setShowCountryDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors ${
                        selectedCountryId === country.id ? 'bg-primary/20 text-primary font-semibold' : ''
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-8">Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-lg text-muted-foreground">
                      {searchTerm || selectedCountryId
                        ? 'No upcoming events match your filters'
                        : 'No upcoming events scheduled'}
                    </p>
                  </div>
                )}
              </div>

              {/* Past Events */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Past Events</h2>
                {pastEvents.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-lg text-muted-foreground">
                      {searchTerm || selectedCountryId
                        ? 'No past events match your filters'
                        : 'No past events available'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss any events. Submit your application today and stay updated with our latest opportunities.
            </p>
          </div>

          <Button asChild size="lg">
            <Link href="/application-form">
              Apply Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}
