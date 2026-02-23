'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X, Award, Calendar, Bell, AlertCircle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Announcement {
  id: number
  title: string
  announcement_type: string
  priority: string
  end_date: string | null
  application_link: string | null
  external_link: string | null
}

export function AnnouncementBanner() {
  const pathname = usePathname()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissedAll, setDismissedAll] = useState(false)
  const [loading, setLoading] = useState(true)

  // Don't show on admin pages
  const isAdminPage = pathname?.startsWith('/admin')

  useEffect(() => {
    if (isAdminPage) {
      setLoading(false)
      return
    }

    const fetchBannerAnnouncements = async () => {
      try {
        const res = await fetch('/api/announcements?limit=5')
        if (!res.ok) {
          setLoading(false)
          return
        }
        const data = await res.json()
        const banners = data.data || []
        setAnnouncements(banners)
      } catch {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchBannerAnnouncements()
  }, [isAdminPage])

  useEffect(() => {
    if (announcements.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [announcements.length])

  const handleDismiss = () => {
    setDismissedAll(true)
  }

  if (isAdminPage || loading || announcements.length === 0 || dismissedAll) {
    return null
  }

  const current = announcements[currentIndex]

  const getIcon = (type: string) => {
    switch (type) {
      case 'scholarship':
        return <Award className="h-4 w-4" />
      case 'deadline':
        return <Calendar className="h-4 w-4" />
      case 'event':
        return <Bell className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getBgColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600'
      case 'medium':
        return 'bg-teal-600'
      case 'low':
        return 'bg-blue-600'
      default:
        return 'bg-slate-600'
    }
  }

  return (
    <div className={`${getBgColor(current.priority)} text-white relative z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 hidden sm:block">
              {getIcon(current.announcement_type)}
            </div>
            <p className="text-sm font-medium truncate">
              {current.title}
              {current.end_date && (
                <span className="ml-2 text-xs opacity-90">
                  • Deadline: {new Date(current.end_date).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {(current.application_link || current.external_link) && (
              <Link
                href={current.application_link || current.external_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-8 text-xs"
                >
                  Learn More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            )}

            {announcements.length > 1 && (
              <div className="hidden sm:flex items-center gap-1 text-xs opacity-75">
                {announcements.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
