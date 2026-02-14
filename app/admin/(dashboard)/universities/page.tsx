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
  MapPin,
  ExternalLink,
  X,
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

interface University {
  id: number
  name: string
  slug: string
  city: string
  country_id: number
  website: string | null
  logo_url: string | null
  description: string | null
  ranking: string | null
  established_year: number | null
  countries: { name: string } | null
  university_campuses: { id: number; name: string; city: string }[]
}

const emptyForm = {
  name: '',
  slug: '',
  city: '',
  country_id: '',
  website: '',
  logo_url: '',
  description: '',
  ranking: '',
  established_year: '',
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
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

  const fetchUniversities = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedSearch })
      const res = await fetch(`/api/admin/universities?${params}`)
      const data = await res.json()
      setUniversities(data.data || [])
      setTotal(data.total || 0)
    } catch {
      console.error('Failed to fetch universities')
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchUniversities()
  }, [fetchUniversities])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFormOpen(true)
  }

  const openEdit = (uni: University) => {
    setEditingId(uni.id)
    setForm({
      name: uni.name || '',
      slug: uni.slug || '',
      city: uni.city || '',
      country_id: String(uni.country_id || ''),
      website: uni.website || '',
      logo_url: uni.logo_url || '',
      description: uni.description || '',
      ranking: uni.ranking || '',
      established_year: String(uni.established_year || ''),
    })
    setFormOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body: any = {
        ...form,
        country_id: form.country_id ? parseInt(form.country_id) : null,
        established_year: form.established_year ? parseInt(form.established_year) : null,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }

      if (!body.website) delete body.website
      if (!body.logo_url) delete body.logo_url
      if (!body.description) delete body.description
      if (!body.ranking) delete body.ranking
      if (!body.established_year) delete body.established_year

      if (editingId) {
        body.id = editingId
        await fetch('/api/admin/universities', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        await fetch('/api/admin/universities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }

      setFormOpen(false)
      fetchUniversities()
    } catch {
      console.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/universities?id=${deleteId}`, { method: 'DELETE' })
      setDeleteOpen(false)
      setDeleteId(null)
      fetchUniversities()
    } catch {
      console.error('Failed to delete')
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{total} universities total</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search universities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-[#111827] border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:border-teal-500"
            />
          </div>
          <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-500 text-white h-9 cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-[#111827] border-slate-800/50">
                <CardContent className="p-5">
                  <Skeleton className="h-5 w-48 mb-3 bg-slate-700/50" />
                  <Skeleton className="h-4 w-32 mb-2 bg-slate-700/50" />
                  <Skeleton className="h-3 w-full mb-1 bg-slate-700/50" />
                  <Skeleton className="h-3 w-3/4 bg-slate-700/50" />
                </CardContent>
              </Card>
            ))
          : universities.map((uni) => (
              <Card key={uni.id} className="bg-[#111827] border-slate-800/50 hover:border-slate-700/80 transition-colors group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{uni.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{uni.city}, {uni.countries?.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(uni)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 cursor-pointer"
                        aria-label="Edit university"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => { setDeleteId(uni.id); setDeleteOpen(true) }}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-400/10 cursor-pointer"
                        aria-label="Delete university"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {uni.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{uni.description}</p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {uni.ranking && (
                      <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {uni.ranking}
                      </Badge>
                    )}
                    {uni.established_year && (
                      <Badge variant="outline" className="text-[10px] bg-slate-500/10 text-slate-400 border-slate-500/20">
                        Est. {uni.established_year}
                      </Badge>
                    )}
                    {uni.university_campuses?.length > 0 && (
                      <Badge variant="outline" className="text-[10px] bg-teal-500/10 text-teal-400 border-teal-500/20">
                        {uni.university_campuses.length} campus{uni.university_campuses.length > 1 ? 'es' : ''}
                      </Badge>
                    )}
                    {uni.website && (
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-500 hover:text-teal-400 flex items-center gap-0.5"
                      >
                        <ExternalLink className="h-3 w-3" /> Website
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-8 bg-transparent border-slate-700/50 text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 bg-transparent border-slate-700/50 text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="bg-[#111827] border-slate-700/50 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editingId ? 'Edit University' : 'Add University'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-300">Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">City *</Label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">Country ID *</Label>
                <Input type="number" value={form.country_id} onChange={(e) => setForm({ ...form, country_id: e.target.value })} className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">Ranking</Label>
                <Input value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} placeholder="e.g. Top 100" className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">Established Year</Label>
                <Input type="number" value={form.established_year} onChange={(e) => setForm({ ...form, established_year: e.target.value })} placeholder="e.g. 1826" className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-300">Website</Label>
                <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-300">Logo URL</Label>
                <Input value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} placeholder="https://..." className="h-9 bg-[#0a0f1a] border-slate-700/50 text-white placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-slate-300">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="bg-[#0a0f1a] border-slate-700/50 text-white placeholder:text-slate-600" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)} className="border-slate-700/50 text-slate-300 hover:bg-slate-800 cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.name || !form.city || !form.country_id} className="bg-teal-600 hover:bg-teal-500 text-white cursor-pointer">
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[#111827] border-slate-700/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete University</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This will permanently delete this university and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700/50 text-slate-300 hover:bg-slate-800">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
