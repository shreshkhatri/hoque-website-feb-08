'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Calendar, GraduationCap, ArrowRight, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface Announcement {
  id: number
  title: string
  slug: string
  description: string
  announcement_type: string
  scholarship_amount: number | null
  scholarship_type: string | null
  program_level: string | null
  end_date: string | null
  published_at: string
  cover_image_url: string | null
  universities: { name: string } | null
  countries: { name: string } | null
}

function getDaysRemaining(endDate: string) {
  const end = new Date(endDate)
  const now = new Date()
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function getScholarshipLabel(type: string | null) {
  switch (type) {
    case 'full':
      return 'Full'
    case 'partial':
      return 'Partial'
    case 'percentage':
      return 'Percentage'
    default:
      return 'Scholarship'
  }
}

function getAmountDisplay(amount: number | null, type: string | null) {
  if (!amount) return 'Scholarship Available'
  if (type === 'full') return 'Full Tuition + Living Costs'
  if (type === 'percentage') return `${amount}% Tuition`
  return `\u00a3${amount.toLocaleString()}`
}

export function FeaturedScholarships() {
  const [scholarships, setScholarships] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const fetched = useRef(false)



  useEffect(() => {
    if (fetched.current) return
    fetched.current = true

    fetch('/api/announcements?announcement_type=scholarship&limit=4')
      .then((res) => res.json())
      .then((data) => setScholarships(data.data || []))
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  // Don't render the section if there are no scholarships and not loading
  if (!loading && scholarships.length === 0) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Financial Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Latest Scholarship Opportunities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the latest scholarships and funding opportunities available for
            international students at top UK universities.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Scholarship Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {scholarships.map((scholarship) => {
                const daysLeft = scholarship.end_date
                  ? getDaysRemaining(scholarship.end_date)
                  : null

                return (
                  <Link
                    key={scholarship.id}
                    href={`/announcements?type=scholarship&slug=${scholarship.slug}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent/50 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {scholarship.cover_image_url ? (
                        <Image
                          src={scholarship.cover_image_url}
                          alt={scholarship.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-accent/20 to-primary/20">
                          <Award className="h-12 w-12 text-accent/50" />
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                      {/* Badges on image */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-accent text-accent-foreground text-xs font-semibold shadow-md border-0">
                          <Award className="h-3 w-3 mr-1" />
                          {getScholarshipLabel(scholarship.scholarship_type)}
                        </Badge>
                      </div>
                      {scholarship.program_level && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-card/90 text-foreground text-xs font-medium backdrop-blur-sm border-0 shadow-md">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {scholarship.program_level}
                          </Badge>
                        </div>
                      )}

                      {/* Amount overlay at bottom of image */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-lg font-bold text-card drop-shadow-lg">
                          {getAmountDisplay(scholarship.scholarship_amount, scholarship.scholarship_type)}
                        </p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-grow p-5">
                      {/* Title */}
                      <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {scholarship.title}
                      </h3>

                      {/* University & Location */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {scholarship.universities?.name || scholarship.countries?.name || 'United Kingdom'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {scholarship.description?.replace(/<[^>]*>/g, '') || ''}
                      </p>

                      {/* Deadline */}
                      {scholarship.end_date && daysLeft !== null && (
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>
                              {new Date(scholarship.end_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-medium">
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            <span
                              className={
                                daysLeft <= 0
                                  ? 'text-destructive'
                                  : daysLeft <= 60
                                    ? 'text-destructive'
                                    : 'text-accent'
                              }
                            >
                              {daysLeft <= 0 ? 'Closed' : `${daysLeft}d left`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* View More Link */}
            <div className="text-center mt-12">
              <Link
                href="/announcements?type=scholarship"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-200 group"
              >
                View More Scholarships
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
