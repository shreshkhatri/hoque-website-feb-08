import Link from 'next/link'
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  Globe,
  Clock,
} from 'lucide-react'
import { nameToSlug } from '@/lib/supabase'

const UNIVERSITIES = [
  { name: "Queen's University Belfast", city: 'Belfast', slug: 'queens-university-belfast' },
  { name: 'University of Greenwich', city: 'London', slug: 'university-of-greenwich' },
  { name: 'University of Greater Manchester', city: 'Manchester', slug: 'university-of-greater-manchester' },
  { name: 'London South Bank University', city: 'London', slug: 'london-south-bank-university' },
]

const COURSES = [
  { name: 'MBA Global', university: 'University of Greenwich', level: 'Master', duration: '1', code: '' },
  { name: 'MSc Data Science and Artificial Intelligence', university: "Queen's University Belfast", level: 'Master', duration: '1', code: '' },
  { name: 'MSc Project Management', university: 'London South Bank University', level: 'Master', duration: '1', code: '' },
  { name: 'MSc Cyber Security', university: "Queen's University Belfast", level: 'Master', duration: '1', code: '' },
  { name: 'MBA with Digital Marketing', university: 'University of Greenwich', level: 'Master', duration: '1.5', code: '' },
]

const EVENTS = [
  { id: 'cacb9492-e069-4171-a5d2-db7a0b44c39a', title: 'UK University Fair - London', date: '2026-02-15', location: 'London Convention Centre', event_type: 'university_fair', country: 'United Kingdom' },
  { id: '3df751e3-f97a-48b6-b7f1-fbc84908ace6', title: 'International Student Panel Discussion', date: '2026-01-28', location: 'Sydney Conference Hall', event_type: 'panel_discussion', country: 'Australia' },
  { id: 'afb28300-5754-4209-b97f-ef01afc7a5c4', title: 'IELTS Success Stories', date: '2026-01-15', location: 'Dublin Education Centre', event_type: 'seminar', country: 'Ireland' },
  { id: 'f5908378-85dd-450e-ad69-d6f44e5392e7', title: 'University Application Workshop', date: '2026-03-15', location: 'Toronto International Centre', event_type: 'workshop', country: 'Canada' },
  { id: '71d80f22-3a86-4ee3-b774-bd2d838b7a56', title: 'IELTS Preparation Workshop', date: '2026-02-20', location: 'Auckland Central Hub', event_type: 'workshop', country: 'New Zealand' },
  { id: '6dff8f83-33cb-4c0f-a483-1188191a0173', title: 'Oxford & Cambridge Selection Event', date: '2026-03-05', location: 'Dubai Business Plaza', event_type: 'selection_event', country: 'Dubai' },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function formatEventType(type: string) {
  return type
    .replace(/_/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function QuickOverview() {

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
              {UNIVERSITIES.map((uni) => (
                <Link
                  key={uni.slug}
                  href={`/university/${uni.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={16} className="text-primary" />
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
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe size={10} className="flex-shrink-0" />
                        United Kingdom
                      </span>
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
              {COURSES.map((course, i) => (
                <Link
                  key={i}
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
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={10} className="flex-shrink-0" />
                        {course.duration}yr
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {course.university.split(' ').slice(0, 3).join(' ')}
                      </span>
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
              {EVENTS.map((event) => (
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
                        {formatEventType(event.event_type)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground group-hover:text-chart-1 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  />
                </Link>
              ))}
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
