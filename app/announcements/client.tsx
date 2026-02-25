'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CoverImageWithCrop } from '@/components/cover-image-with-crop'
import { Calendar, Award, Bell, AlertCircle, ExternalLink, Clock, ArrowLeft, MapPin } from 'lucide-react'
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
  eligibility_criteria: string | null
  end_date: string | null
  published_at: string
  external_link: string | null
  application_link: string | null
  cover_image_url: string | null
  cover_image_crop: { x: number; y: number } | null
  universities: { id: number; name: string } | null
  countries: { name: string } | null
}

export default function AnnouncementsClient() {
  const searchParams = useSearchParams()
  const typeFromUrl = searchParams.get('type')
  const slugFromUrl = searchParams.get('slug')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [singleAnnouncement, setSingleAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>(typeFromUrl || 'all')

  // If a slug is present, fetch the single announcement
  useEffect(() => {
    if (!slugFromUrl) {
      setSingleAnnouncement(null)
      return
    }
    const fetchSingle = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/announcements?slug=${encodeURIComponent(slugFromUrl)}`)
        const data = await res.json()
        setSingleAnnouncement(data.data || null)
      } catch {
        setSingleAnnouncement(null)
      } finally {
        setLoading(false)
      }
    }
    fetchSingle()
  }, [slugFromUrl])

  // Fetch the list when no slug is present
  useEffect(() => {
    if (slugFromUrl) return
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
  }, [filterType, slugFromUrl])

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

  // Single announcement detail view
  if (slugFromUrl) {
    if (loading) {
      return <div className="text-center py-12 text-slate-600">Loading announcement...</div>
    }
    if (!singleAnnouncement) {
      return (
        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Announcement not found</h3>
              <p className="text-slate-600 mb-6">
                The scholarship or announcement you are looking for does not exist or has been removed.
              </p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href="/announcements">Browse All Announcements</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    const a = singleAnnouncement
    const daysRemaining = a.end_date ? getDaysRemaining(a.end_date) : null

    return (
      <div className="space-y-6">
        {/* Back link */}
        <Link
          href={`/announcements${typeFromUrl ? `?type=${typeFromUrl}` : ''}`}
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Announcements
        </Link>

        <Card className="border-slate-200 overflow-hidden">
          <CardContent className="p-0">
            {/* Cover image */}
            {a.cover_image_url && (
              <CoverImageWithCrop
                src={a.cover_image_url}
                alt={a.title}
                entityType="announcements"
                entityId={a.id}
                crop={a.cover_image_crop}
                containerClassName="relative w-full aspect-[16/6] bg-slate-100"
                imageClassName="object-cover"
                useNextImage={true}
              />
            )}

            {/* Header band */}
            <div className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-8 py-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={`${getTypeColor(a.announcement_type)} text-xs border`}>
                  {getTypeIcon(a.announcement_type)}
                  <span className="ml-1.5 capitalize">{a.announcement_type}</span>
                </Badge>
                {daysRemaining !== null && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      daysRemaining <= 0
                        ? 'bg-red-100 text-red-700'
                        : daysRemaining <= 7
                          ? 'bg-red-100 text-red-700'
                          : daysRemaining <= 30
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                    }`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {daysRemaining <= 0 ? 'Closed' : `${daysRemaining} days remaining`}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{a.title}</h1>
              {a.universities && (
                <p className="text-teal-300 text-sm">
                  {a.universities.name}
                </p>
              )}
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              {/* Scholarship amount */}
              {a.scholarship_amount && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex items-center gap-4">
                  <Award className="h-8 w-8 text-teal-600 shrink-0" />
                  <div>
                    <p className="text-3xl font-bold text-teal-700">
                      {'£'}{a.scholarship_amount.toLocaleString()}
                      {a.scholarship_type === 'percentage' && '%'}
                    </p>
                    <p className="text-sm text-teal-600 mt-1">
                      {a.scholarship_type === 'full'
                        ? 'Full Tuition Scholarship'
                        : a.scholarship_type === 'partial'
                          ? 'Partial Tuition Scholarship'
                          : 'Scholarship Value'}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              {a.description && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                  <div 
                    className="text-slate-600 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: a.description }}
                  />
                </div>
              )}

              {/* Eligibility Criteria */}
              {a.eligibility_criteria && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Eligibility Criteria</h3>
                  <div 
                    className="text-slate-600 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: a.eligibility_criteria }}
                  />
                </div>
              )}

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {a.end_date && (
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                    <Calendar className="h-5 w-5 text-slate-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Deadline</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {new Date(a.end_date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {a.countries && (
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                    <MapPin className="h-5 w-5 text-slate-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Country</p>
                      <p className="text-sm font-semibold text-slate-900">{a.countries.name}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                  <Clock className="h-5 w-5 text-slate-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Published</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {new Date(a.published_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                {a.scholarship_type && (
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                    <Award className="h-5 w-5 text-slate-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Type</p>
                      <p className="text-sm font-semibold text-slate-900 capitalize">{a.scholarship_type} Scholarship</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {a.application_link && (
                  <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
                    <Link href={a.application_link} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
                {a.external_link && (
                  <Button asChild variant="outline" className="cursor-pointer">
                    <Link href={a.external_link} target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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
                className="border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Cover Image */}
                {announcement.cover_image_url && (
                  <CoverImageWithCrop
                    src={announcement.cover_image_url}
                    alt={announcement.title}
                    entityType="announcements"
                    entityId={announcement.id}
                    crop={announcement.cover_image_crop}
                    containerClassName="relative w-full h-40 bg-slate-100"
                    imageClassName="object-cover"
                    useNextImage={true}
                  />
                )}
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
                      <p className="text-sm text-teal-600">
                        {announcement.universities.name}
                      </p>
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
