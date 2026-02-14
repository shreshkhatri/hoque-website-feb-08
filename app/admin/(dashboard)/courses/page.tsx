'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  GraduationCap,
  Banknote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'

interface Course {
  id: number
  name: string
  slug: string
  university_id: number
  level: string
  duration: string | null
  tuition_fee: string | null
  description: string | null
  intake_months: string | null
  universities: { name: string } | null
}

const emptyForm = {
  name: '',
  slug: '',
  university_id: '',
  level: '',
  duration: '',
  tuition_fee: '',
  description: '',
  intake_months: '',
}

function levelColor(level: string) {
  const l = level?.toLowerCase()
  if (l?.includes('bachelor')) return 'bg-blue-500/15 text-blue-400 border-blue-500/20'
  if (l?.includes('master')) return 'bg-purple-500/15 text-purple-400 border-purple-500/20'
  if (l?.includes('phd') || l?.includes('doctor')) return 'bg-amber-500/15 text-amber-400 border-amber-500/20'
  if (l?.includes('foundation')) return 'bg-teal-500/15 text-teal-400 border-teal-500/20'
  return 'bg-slate-500/15 text-slate-400 border-slate-500/20'
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const limit = 12

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedSearch })
      const res = await fetch(`/api/admin/courses?${params}`)
      const data = await res.json()
      setCourses(data.data || [])
      setTotal(data.total || 0)
    } catch {
      console.error('Failed to fetch courses')
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

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFormOpen(true)
  }

  const openEdit = (course: Course) => {
    setEditingId(course.id)
    setForm({
      name: course.name || '',
      slug: course.slug || '',
      university_id: String(course.university_id || ''),
      level: course.level || '',
      duration: course.duration || '',
      tuition_fee: course.tuition_fee || '',
      description: course.description || '',
      intake_months: course.intake_months || '',
    })
    setFormOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body: any = {
        ...form,
        university_id: form.university_id ? parseInt(form.university_id) : null,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }
      if (!body.duration) delete body.duration
      if (!body.tuition_fee) delete body.tuition_fee
      if (!body.description) delete body.description
      if (!body.intake_months) delete body.intake_months

      if (editingId) {
        body.id = editingId
        await fetch('/api/admin/courses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        await fetch('/api/admin/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }

      setFormOpen(false)
      fetchCourses()
    } catch {
      console.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/courses?id=${deleteId}`, { method: 'DELETE' })
      setDeleteOpen(false)
      setDeleteId(null)
      fetchCourses()
    } catch {
      console.error('Failed to delete')
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-slate-400">{total} courses total</p>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-teal-500"
            />
          </div>
          <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-500 text-slate-900 h-9 cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </div>

      {/* Table-like Card List */}
      <div className="space-y-2">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Course</div>
          <div className="col-span-3">University</div>
          <div className="col-span-1">Level</div>
          <div className="col-span-1">Duration</div>
          <div className="col-span-2">Fee</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-white border-slate-200">
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-64 mb-2 bg-slate-700/50" />
                  <Skeleton className="h-3 w-40 bg-slate-700/50" />
                </CardContent>
              </Card>
            ))
          : courses.map((course) => (
              <Card key={course.id} className="bg-white border-slate-200 hover:border-slate-700/80 transition-colors group">
                <CardContent className="p-4 md:p-5">
                  <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center space-y-2 md:space-y-0">
                    <div className="col-span-4 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{course.name}</p>
                      {course.intake_months && (
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">Intakes: {course.intake_months}</p>
                      )}
                    </div>
                    <div className="col-span-3 min-w-0">
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                        <GraduationCap className="h-3 w-3 flex-shrink-0 text-slate-500" />
                        {course.universities?.name || 'N/A'}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <Badge variant="outline" className={`text-[10px] ${levelColor(course.level)}`}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="col-span-1">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        {course.duration || 'N/A'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Banknote className="h-3 w-3 text-slate-500" />
                        {course.tuition_fee || 'N/A'}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(course)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        aria-label="Edit course"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => { setDeleteId(course.id); setDeleteOpen(true) }}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        aria-label="Delete course"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="h-8 bg-transparent border-slate-200 text-slate-700 hover:bg-slate-800 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="h-8 bg-transparent border-slate-200 text-slate-700 hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-900">{editingId ? 'Edit Course' : 'Add Course'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-700">Course Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-9 bg-slate-50 border-slate-200 text-slate-900" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-700">University ID *</Label>
                <Input type="number" value={form.university_id} onChange={(e) => setForm({ ...form, university_id: e.target.value })} className="h-9 bg-slate-50 border-slate-200 text-slate-900" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-700">Level *</Label>
                <Input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} placeholder="e.g. Bachelor's" className="h-9 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-700">Duration</Label>
                <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 Years" className="h-9 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-700">Tuition Fee</Label>
                <Input value={form.tuition_fee} onChange={(e) => setForm({ ...form, tuition_fee: e.target.value })} placeholder="e.g. 15,000 GBP" className="h-9 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-700">Intake Months</Label>
                <Input value={form.intake_months} onChange={(e) => setForm({ ...form, intake_months: e.target.value })} placeholder="e.g. September,January,May" className="h-9 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-700">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="bg-slate-50 border-slate-200 text-slate-900" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)} className="border-slate-200 text-slate-700 hover:bg-slate-800 cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.name || !form.university_id || !form.level} className="bg-teal-600 hover:bg-teal-500 text-slate-900 cursor-pointer">
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Delete Course</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This will permanently delete this course. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-800">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-slate-900">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
