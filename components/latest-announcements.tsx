'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, Calendar, AlertCircle, Award, Clock, ArrowRight, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Announcement {
  id: number
  title: string
  slug: string
  description: string
  announcement_type: string
  priority: string
  end_date: string | null
  published_at: string
  cover_image_url: string | null
  application_link: string | null
  external_link: string | null
  universities: { name: string } | null
  countries: { name: string } | null
}

function getDaysRemaining(endDate: string) {
  const end = new Date(endDate)
  const now = new Date()
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'scholarship':
      return <Award className="h-4 w-4" />
    case 'event':
      return <Bell className="h-4 w-4" />
    case 'deadline':
      return <Calendar className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'scholarship':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'event':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'deadline':
      return 'bg-red-100 text-red-700 border-red-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

export function LatestAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/announcements?limit=6')
        const data = await res.json()
        setAnnouncements(data.data || [])
      } catch {
        // silent fail
      } finally {
        setLoading(false)
      }
    }
    fetchAnnouncements()
  }, [])

  if (!loading && announcements.length === 0) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Latest Announcements
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl leading-relaxed">
              Keep up with the latest news, events, deadlines, and opportunities from HOQUE.
            </p>
          </div>
          <Link
            href="/announcements"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0 group"
          >
            View all announcements
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-border overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => {
              const daysLeft = announcement.end_date
                ? getDaysRemaining(announcement.end_date)
                : null

              return (
                <Link
                  key={announcement.id}
                  href={`/announcements?slug=${encodeURIComponent(announcement.slug)}&type=${encodeURIComponent(announcement.announcement_type)}`}
                  className="group block h-full"
                >
                  <Card className="h-full border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer">
                    {/* Top accent line based on type */}
                    <div
                      className={`h-1 ${
                        announcement.announcement_type === 'scholarship'
                          ? 'bg-emerald-500'
                          : announcement.announcement_type === 'event'
                            ? 'bg-blue-500'
                            : announcement.announcement_type === 'deadline'
                              ? 'bg-red-500'
                              : 'bg-primary'
                      }`}
                    />
                    <CardContent className="p-5 flex flex-col h-full">

                      {/* Type badge + urgency badge */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="outline"
                          className={`text-xs gap-1 ${getTypeColor(announcement.announcement_type)}`}
                        >
                          {getTypeIcon(announcement.announcement_type)}
                          <span className="capitalize">{announcement.announcement_type}</span>
                        </Badge>
                        {daysLeft !== null && daysLeft <= 30 && (
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              daysLeft <= 0
                                ? 'bg-red-100 text-red-700'
                                : daysLeft <= 7
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {daysLeft <= 0 ? 'Closed' : `${daysLeft}d left`}
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {announcement.title}
                      </h3>

                      {/* University */}
                      {announcement.universities && (
                        <p className="text-xs text-primary font-medium mb-2 truncate">
                          {announcement.universities.name}
                        </p>
                      )}

                      {/* Description */}
                      {announcement.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1 mb-4">
                          {announcement.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                        {announcement.end_date ? (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                            <span>
                              {new Date(announcement.end_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {new Date(announcement.published_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        )}

                        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read more
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
