'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Clock,
  Banknote,
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
import Link from 'next/link'

interface Course {
  id: number
  name: string
  code: string
  slug: string
  university_id: number
  level: string
  duration_years: number | null
  tuition_fees_international: number | null
  description: string | null
  intake_months: string | null
  field_of_study: string | null
  universities: { name: string } | null
}

function levelColor(level: string) {
  const l = level?.toLowerCase()
  if (l?.includes('bachelor')) return 'bg-blue-100 text-blue-700 border-blue-200'
  if (l?.includes('master')) return 'bg-purple-100 text-purple-700 border-purple-200'
  if (l?.includes('phd') || l?.includes('doctor')) return 'bg-amber-100 text-amber-700 border-amber-200'
  if (l?.includes('foundation')) return 'bg-teal-100 text-teal-700 border-teal-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

function formatFee(fee: number | null) {
  if (!fee) return null
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(fee)
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const limit = 12

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedSearch })
      const res = await fetch(`/api/admin/courses?${params}`, { credentials: 'same-origin' })
      const data = await res.json()
      setCourses(data.data || [])
      setTotal(data.total || 0)
    } catch {
      /* empty */
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/courses?id=${deleteId}`, { method: 'DELETE', credentials: 'same-origin' })
      setDeleteOpen(false)
      setDeleteId(null)
      fetchCourses()
    } catch {
      /* empty */
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-slate-500">{total} courses total</p>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
            />
          </div>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white h-9 cursor-pointer">
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-1">ID</div>
        <div className="col-span-3">Course</div>
        <div className="col-span-3">University</div>
        <div className="col-span-1">Level</div>
        <div className="col-span-1">Duration</div>
        <div className="col-span-2">Tuition Fee</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Course List */}
      <div className="space-y-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-white border-slate-200">
                <CardContent className="p-5">
                  <Skeleton className="h-5 w-64 mb-2 bg-slate-200" />
                  <Skeleton className="h-4 w-40 bg-slate-200" />
                </CardContent>
              </Card>
            ))
          : courses.map((course) => (
              <Card key={course.id} className="bg-white border-slate-200 hover:border-slate-300 transition-colors group">
                <CardContent className="p-4 lg:p-5">
                  <div className="lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center space-y-3 lg:space-y-0">
                    {/* ID */}
                    <div className="col-span-1">
                      <span className="text-sm font-mono font-medium text-slate-500">#{course.id}</span>
                    </div>

                    {/* Course Name */}
                    <div className="col-span-3 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{course.name}</p>
                      {course.code && (
                        <p className="text-xs text-slate-500 mt-0.5">Code: {course.code}</p>
                      )}
                      {course.intake_months && (
                        <p className="text-xs text-slate-400 mt-0.5 truncate">Intakes: {course.intake_months}</p>
                      )}
                    </div>

                    {/* University */}
                    <div className="col-span-3 min-w-0">
                      <p className="text-sm text-slate-600 truncate flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                        {course.universities?.name || 'N/A'}
                      </p>
                      {course.field_of_study && (
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{course.field_of_study}</p>
                      )}
                    </div>

                    {/* Level */}
                    <div className="col-span-1">
                      <Badge variant="outline" className={`text-xs ${levelColor(course.level)}`}>
                        {course.level}
                      </Badge>
                    </div>

                    {/* Duration */}
                    <div className="col-span-1">
                      <span className="text-sm text-slate-600 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {course.duration_years ? `${course.duration_years} yr${course.duration_years > 1 ? 's' : ''}` : 'N/A'}
                      </span>
                    </div>

                    {/* Fee */}
                    <div className="col-span-2">
                      <span className="text-sm text-slate-600 flex items-center gap-1">
                        <Banknote className="h-3.5 w-3.5 text-slate-400" />
                        {formatFee(course.tuition_fees_international) || 'N/A'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="p-1.5 rounded-md text-slate-400 hover:text-teal-600 hover:bg-teal-50 lg:opacity-0 lg:group-hover:opacity-100 transition-all cursor-pointer"
                        aria-label="Edit course"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => { setDeleteId(course.id); setDeleteOpen(true) }}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 lg:opacity-0 lg:group-hover:opacity-100 transition-all cursor-pointer"
                        aria-label="Delete course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pb-20">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="h-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <p className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="h-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Delete Course</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This will permanently delete this course. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
