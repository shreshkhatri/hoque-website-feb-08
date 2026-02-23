'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  Award,
  Bell,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

interface Announcement {
  id: number
  title: string
  description: string
  announcement_type: string
  priority: string
  university_id: number | null
  course_id: number | null
  scholarship_amount: number | null
  scholarship_type: string | null
  start_date: string | null
  end_date: string | null
  published_at: string
  is_active: boolean
  show_as_banner: boolean
  universities: { name: string } | null
  courses: { name: string } | null
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const limit = 12

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedSearch,
        sort_by: 'published_at',
        sort_order: 'desc',
      })
      if (typeFilter && typeFilter !== 'all') {
        params.append('announcement_type', typeFilter)
      }
      const res = await fetch(`/api/admin/announcements?${params}`, { credentials: 'same-origin' })
      const data = await res.json()
      setAnnouncements(data.data || [])
      setTotal(data.total || 0)
    } catch {
      /* empty */
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, typeFilter])

  useEffect(() => {
    fetchAnnouncements()
  }, [fetchAnnouncements])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, typeFilter])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/announcements/${deleteId}`, { method: 'DELETE', credentials: 'same-origin' })
      fetchAnnouncements()
    } catch {
      /* empty */
    } finally {
      setDeleteOpen(false)
      setDeleteId(null)
    }
  }

  const totalPages = Math.ceil(total / limit)

  const getTypeIcon = (type: string) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-500">{total} announcements total</p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white h-9 cursor-pointer w-fit">
            <Link href="/admin/announcements/new">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Announcement
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-9 bg-white border-slate-200 text-slate-900 w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="scholarship">Scholarships</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="event">Events</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Announcements Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-4" />
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600">No announcements found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="border-slate-200 hover:border-teal-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`${getTypeColor(announcement.announcement_type)} text-xs`}>
                    {getTypeIcon(announcement.announcement_type)}
                    <span className="ml-1 capitalize">{announcement.announcement_type}</span>
                  </Badge>
                  {announcement.show_as_banner && (
                    <Badge variant="secondary" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                      Banner
                    </Badge>
                  )}
                </div>

                <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">{announcement.title}</h3>

                {announcement.description && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {announcement.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}

                <div className="space-y-2 text-xs text-slate-500 mb-3">
                  {announcement.universities && (
                    <p className="truncate">{announcement.universities.name}</p>
                  )}
                  {announcement.scholarship_amount && (
                    <p className="font-medium text-teal-600">
                      ${announcement.scholarship_amount.toLocaleString()}
                      {announcement.scholarship_type === 'percentage' && '%'}
                    </p>
                  )}
                  {announcement.end_date && (
                    <p className="text-red-600">Ends: {new Date(announcement.end_date).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority}
                  </Badge>
                  <Badge variant={announcement.is_active ? 'default' : 'secondary'} className="text-xs">
                    {announcement.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <div className="ml-auto flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0 text-slate-600 hover:text-teal-600 hover:bg-teal-50 cursor-pointer"
                    >
                      <Link href={`/admin/announcements/${announcement.id}/edit`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(announcement.id)
                        setDeleteOpen(true)
                      }}
                      className="h-8 w-8 p-0 text-slate-600 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 border-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 px-3 text-sm text-slate-700">
              {page} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 border-slate-200 hover:bg-slate-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this announcement? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
