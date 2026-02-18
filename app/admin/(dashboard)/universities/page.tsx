'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
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

interface University {
  id: number
  name: string
  city: string
  country_id: number
  website_url: string | null
  logo_url: string | null
  description: string | null
  rank_world: string | null
  founded_year: number | null
  countries: { name: string } | null
  university_campuses: { id: number; name: string; city: string }[]
}

export default function UniversitiesPage() {
  const router = useRouter()
  const [universities, setUniversities] = useState<University[]>([])
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

  const fetchUniversities = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedSearch })
      const res = await fetch(`/api/admin/universities?${params}`)
      const data = await res.json()
      console.log('[v0] Admin universities page - status:', res.status, 'response:', JSON.stringify(data).substring(0, 300))
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
          <p className="text-sm text-slate-600">{total} universities total</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search universities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-teal-500"
            />
          </div>
          <Button onClick={() => router.push('/admin/universities/new')} className="bg-teal-600 hover:bg-teal-700 text-white h-9 cursor-pointer">
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-white border-slate-200">
                <CardContent className="p-5">
                  <Skeleton className="h-5 w-48 mb-3 bg-slate-100" />
                  <Skeleton className="h-4 w-32 mb-2 bg-slate-100" />
                  <Skeleton className="h-3 w-full mb-1 bg-slate-100" />
                  <Skeleton className="h-3 w-3/4 bg-slate-100" />
                </CardContent>
              </Card>
            ))
          : universities.map((uni) => (
              <Card key={uni.id} className="bg-white border-slate-200 hover:border-slate-300 transition-colors group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 truncate">{uni.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{uni.city}, {uni.countries?.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => router.push(`/admin/universities/${uni.id}/edit`)}
                        className="p-1.5 rounded-md text-slate-600 hover:text-teal-600 hover:bg-teal-50 cursor-pointer"
                        aria-label="Edit university"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => { setDeleteId(uni.id); setDeleteOpen(true) }}
                        className="p-1.5 rounded-md text-slate-600 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        aria-label="Delete university"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {uni.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">{uni.description}</p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {uni.rank_world && (
                      <Badge variant="outline" className="text-[10px] bg-blue-100 text-blue-800 border-blue-200">
                        Rank #{uni.rank_world}
                      </Badge>
                    )}
                    {uni.founded_year && (
                      <Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-800 border-slate-200">
                        Est. {uni.founded_year}
                      </Badge>
                    )}
                    {uni.university_campuses?.length > 0 && (
                      <Badge variant="outline" className="text-[10px] bg-teal-100 text-teal-800 border-teal-200">
                        {uni.university_campuses.length} campus{uni.university_campuses.length > 1 ? 'es' : ''}
                      </Badge>
                    )}
                    {uni.website_url && (
                      <a
                        href={uni.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-600 hover:text-teal-600 flex items-center gap-0.5"
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
          <p className="text-xs text-slate-600">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Delete University</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              This will permanently delete this university and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
