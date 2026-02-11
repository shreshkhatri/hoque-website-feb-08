'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  Globe,
  Users,
  Clock,
} from 'lucide-react'
import { University, Course, nameToSlug } from '@/lib/supabase'

interface CourseWithUniversity extends Course {
  universities?: {
    id: number
    name: string
    city: string
    country_id: number
    countries: { id: number; name: string }
  }
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  country_name: string
  event_type: string
}

export function QuickOverview() {
  const [universities, setUniversities] = useState<University[]>([])
  const [courses, setCourses] = useState<CourseWithUniversity[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const [uniRes, courseRes, eventRes] = await Promise.all([
          fetch('/api/universities?limit=4'),
          fetch('/api/courses?limit=4'),
          fetch('/api/events'),
        ])

        const uniData = await uniRes.json()
        setUniversities(uniData.data || [])

        const courseData = await courseRes.json()
        setCourses(courseData.data || [])

        if (eventRes.ok) {
          const allEvents = await eventRes.json()
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const upcoming = allEvents
            .filter((e: Event) => {
              const d = new Date(e.date)
              d.setHours(0, 0, 0, 0)
              return d >= today
            })
            .sort(
              (a: Event, b: Event) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .slice(0, 4)
          setEvents(upcoming)
        }
      } catch (error) {
        console.error('Error fetching overview data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  // Skeleton card for loading state
  const SkeletonCard = () => (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  )

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            Discover What Awaits You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A snapshot of our top universities, popular courses, and upcoming
            events to get you started.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Universities Column */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-primary/5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                Partner Universities
              </h3>
            </div>

            <div className="p-4 space-y-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : universities.map((uni) => (
                    <Link
                      key={uni.id}
                      href={`/university/${nameToSlug(uni.name)}`}
                      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {uni.rank_uk ? (
                          <span className="text-xs font-bold text-primary">
                            #{uni.rank_uk}
                          </span>
                        ) : (
                          <GraduationCap
                            size={16}
                            className="text-primary"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {uni.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin size={10} className="flex-shrink-0" />
                            {uni.city}
                          </span>
                          {uni.student_population && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users size={10} className="flex-shrink-0" />
                              {(uni.student_population / 1000).toFixed(0)}k
                            </span>
                          )}
                          {uni.rank_world && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe size={10} className="flex-shrink-0" />
                              #{uni.rank_world}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0"
                      />
                    </Link>
                  ))}
            </div>

            <Link
              href="/universities"
              className="flex items-center justify-center gap-2 px-5 py-3.5 border-t border-border text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              Explore All Universities
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Courses Column */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-accent/5">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <BookOpen size={18} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">
                Popular Courses
              </h3>
            </div>

            <div className="p-4 space-y-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : courses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${nameToSlug(course.name, course.code)}`}
                      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                          {course.name}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="inline-flex items-center text-xs text-muted-foreground">
                            {course.level}
                          </span>
                          {course.duration_years && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={10} className="flex-shrink-0" />
                              {course.duration_years}yr
                            </span>
                          )}
                          {course.universities && (
                            <span className="text-xs text-muted-foreground truncate">
                              {course.universities.name
                                .split(' ')
                                .slice(0, 3)
                                .join(' ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0"
                      />
                    </Link>
                  ))}
            </div>

            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 px-5 py-3.5 border-t border-border text-sm font-medium text-accent hover:bg-accent/5 transition-colors"
            >
              Explore All Courses
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Events Column */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-chart-1/5">
              <div className="w-9 h-9 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Calendar size={18} className="text-chart-1" />
              </div>
              <h3 className="font-semibold text-foreground">
                Upcoming Events
              </h3>
            </div>

            <div className="p-4 space-y-2">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : events.length > 0 ? (
                events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-chart-1/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0 text-center">
                      <div>
                        <div className="text-[10px] font-bold text-chart-1 leading-none">
                          {formatDate(event.date).split(' ')[0]}
                        </div>
                        <div className="text-sm font-bold text-chart-1 leading-tight">
                          {formatDate(event.date).split(' ')[1]}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-chart-1 transition-colors">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin size={10} className="flex-shrink-0" />
                          <span className="truncate max-w-[100px]">
                            {event.location}
                          </span>
                        </span>
                        <span className="inline-flex items-center bg-chart-1/10 text-chart-1 text-[10px] font-medium px-1.5 py-0.5 rounded">
                          {event.event_type
                            .replace(/_/g, ' ')
                            .split(' ')
                            .map(
                              (w: string) =>
                                w.charAt(0).toUpperCase() + w.slice(1)
                            )
                            .join(' ')}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:text-chart-1 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    />
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No upcoming events at the moment.
                </div>
              )}
            </div>

            <Link
              href="/events"
              className="flex items-center justify-center gap-2 px-5 py-3.5 border-t border-border text-sm font-medium text-chart-1 hover:bg-chart-1/5 transition-colors"
            >
              Explore All Events
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
