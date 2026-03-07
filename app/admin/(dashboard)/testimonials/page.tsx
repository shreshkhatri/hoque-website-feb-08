'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Home,
  User,
  GraduationCap,
  MapPin,
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
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  country: string
  university: string
  program: string
  photo_url: string | null
  university_logo_url: string | null
  rating: number
  review: string
  display_at_homepage: boolean
  display_order: number
  is_active: boolean
  created_at: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [homepageFilter, setHomepageFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const limit = 12

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchTestimonials = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedSearch,
        sort_by: 'display_order',
        sort_order: 'asc',
      })
      if (homepageFilter && homepageFilter !== 'all') {
        params.append('display_at_homepage', homepageFilter)
      }
      const res = await fetch(`/api/admin/testimonials?${params}`, { credentials: 'same-origin' })
      const data = await res.json()
      setTestimonials(data.data || [])
      setTotal(data.total || 0)
    } catch {
      /* empty */
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, homepageFilter])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, homepageFilter])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/testimonials/${deleteId}`, { method: 'DELETE', credentials: 'same-origin' })
      fetchTestimonials()
    } catch {
      /* empty */
    } finally {
      setDeleteOpen(false)
      setDeleteId(null)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-500">{total} testimonials total</p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white h-9 cursor-pointer w-fit">
            <Link href="/admin/testimonials/new">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Testimonial
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, university, country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
            />
          </div>

          <Select value={homepageFilter} onValueChange={setHomepageFilter}>
            <SelectTrigger className="h-9 bg-white border-slate-200 text-slate-900 w-full sm:w-48">
              <SelectValue placeholder="Filter by homepage" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="all">All Testimonials</SelectItem>
              <SelectItem value="true">Homepage Only</SelectItem>
              <SelectItem value="false">Not on Homepage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full mb-3" />
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600">No testimonials found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-slate-200 hover:border-teal-300 transition-colors">
              <CardContent className="p-4">
                {/* Student photo and info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-teal-100 flex-shrink-0">
                    {testimonial.photo_url ? (
                      <Image
                        src={testimonial.photo_url}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <User className="h-6 w-6 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{testimonial.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{testimonial.country}</span>
                    </div>
                  </div>
                  {testimonial.university_logo_url && (
                    <div className="relative h-8 w-8 rounded bg-white border border-slate-200 p-0.5 flex-shrink-0">
                      <Image
                        src={testimonial.university_logo_url}
                        alt={testimonial.university}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* University & Program */}
                <div className="flex items-center gap-1 text-xs text-teal-600 mb-2">
                  <GraduationCap className="h-3 w-3" />
                  <span className="truncate">{testimonial.university}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2 truncate">{testimonial.program}</p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review excerpt */}
                <p className="text-sm text-slate-600 line-clamp-3 mb-3">
                  &quot;{testimonial.review}&quot;
                </p>

                {/* Footer with badges and actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  {testimonial.display_at_homepage && (
                    <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-xs">
                      <Home className="h-3 w-3 mr-1" />
                      Homepage
                    </Badge>
                  )}
                  <Badge variant={testimonial.is_active ? 'default' : 'secondary'} className="text-xs">
                    {testimonial.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-xs text-slate-400 ml-auto">#{testimonial.display_order}</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0 text-slate-600 hover:text-teal-600 hover:bg-teal-50 cursor-pointer"
                    >
                      <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(testimonial.id)
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
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
