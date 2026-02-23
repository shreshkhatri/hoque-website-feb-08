'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, Award, Bell, AlertCircle, ExternalLink, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Announcement {
  id: number
  title: string
  description: string
  announcement_type: string
  priority: string
  scholarship_amount: number | null
  scholarship_type: string | null
  end_date: string | null
  published_at: string
  external_link: string | null
  application_link: string | null
  universities: { name: string; slug: string } | null
  countries: { name: string } | null
}

export default function AnnouncementsClient() {
  const searchParams = useSearchParams()
  const typeFromUrl = searchParams.get('type')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>(typeFromUrl || 'all')

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ limit: '50' })
        if (filterType !== 'all') {
          params.append('announcement_type', filterType)
        }
        const res = await fetch(`/api/announcements?${params}`)
        const data = await res.json()
        setAnnouncements(data.data || [])
      } catch {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchAnnouncements()
  }, [filterType])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scholarship':
        return <Award className="h-5 w-5" />
      case 'deadline':
        return <Calendar className="h-5 w-5" />
      case 'event':
        return <Bell className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'scholarship':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'deadline':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'event':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'Scholarships', value: 'scholarship' },
    { label: 'Deadlines', value: 'deadline' },
    { label: 'Events', value: 'event' },
    { label: 'General', value: 'general' },
  ]

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilterType(btn.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === btn.value
                ? 'bg-teal-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Announcements Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-600">Loading announcements...</div>
      ) : announcements.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No announcements found</h3>
            <p className="text-slate-600">Check back later for updates</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => {
            const daysRemaining = announcement.end_date ? getDaysRemaining(announcement.end_date) : null

            return (
              <Card
                key={announcement.id}
                className="border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getTypeColor(announcement.announcement_type)} text-xs`}>
                      {getTypeIcon(announcement.announcement_type)}
                      <span className="ml-1.5 capitalize">{announcement.announcement_type}</span>
                    </Badge>
                    {daysRemaining !== null && daysRemaining <= 30 && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          daysRemaining <= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {daysRemaining <= 0 ? 'Closed' : `${daysRemaining}d left`}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 leading-snug">
                    {announcement.title}
                  </h3>

                  {/* Description */}
                  {announcement.description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">{announcement.description}</p>
                  )}

                  {/* University */}
                  {announcement.universities && (
                    <div className="mb-4 pb-4 border-b border-slate-100">
                      <Link
                        href={`/university/${announcement.universities.slug}`}
                        className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                      >
                        {announcement.universities.name}
                      </Link>
                    </div>
                  )}

                  {/* Scholarship Amount */}
                  {announcement.scholarship_amount && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-teal-600">
                        ${announcement.scholarship_amount.toLocaleString()}
                        {announcement.scholarship_type === 'percentage' && '%'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {announcement.scholarship_type === 'full'
                          ? 'Full Tuition'
                          : announcement.scholarship_type === 'partial'
                            ? 'Partial Tuition'
                            : 'Scholarship Value'}
                      </p>
                    </div>
                  )}

                  {/* Deadline */}
                  {announcement.end_date && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(announcement.end_date).toLocaleDateString()}</span>
                    </div>
                  )}

                  {/* Action Button */}
                  {(announcement.application_link || announcement.external_link) && (
                    <Button
                      asChild
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                    >
                      <Link
                        href={announcement.application_link || announcement.external_link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {announcement.announcement_type === 'scholarship' ? 'Apply Now' : 'Learn More'}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}

                  {/* Published Date */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      Posted {new Date(announcement.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
