'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  FileText,
  ExternalLink,
  StickyNote,
  AlertCircle,
  Circle,
  Eye,
  CheckCircle2,
  XCircle,
  Star,
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface JobApplication {
  id: number
  full_name: string
  email: string
  phone: string | null
  vacancy_id: number
  cover_letter: string | null
  resume_url: string | null
  status: string
  admin_notes: string | null
  created_at: string
  updated_at: string | null
  vacancies: {
    title: string
    department: string | null
    location_city: string | null
    location_country: string | null
  } | null
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', icon: Circle, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  { value: 'reviewed', label: 'Reviewed', icon: Eye, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { value: 'shortlisted', label: 'Shortlisted', icon: Star, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { value: 'interviewed', label: 'Interviewed', icon: UserCheck, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { value: 'hired', label: 'Hired', icon: CheckCircle2, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
]

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.color || 'text-slate-400 bg-slate-500/10 border-slate-500/20'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const limit = 15

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedSearch,
      })
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/admin/job-applications?${params}`)
      const data = await res.json()
      setApplications(data.data || [])
      setTotal(data.total || 0)
    } catch {
      console.error('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter])

  const openDetail = (app: JobApplication) => {
    setSelectedApp(app)
    setAdminNotes(app.admin_notes || '')
    setNewStatus(app.status || 'new')
    setSheetOpen(true)
  }

  const handleUpdateFollowup = async () => {
    if (!selectedApp) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/job-applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedApp.id,
          status: newStatus,
          admin_notes: adminNotes,
        }),
      })
      const data = await res.json()
      if (data.data) {
        setSelectedApp(data.data)
        fetchApplications()
      }
    } catch {
      console.error('Failed to update')
    } finally {
      setSaving(false)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-slate-400">{total} applications total</p>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9 bg-[#111827] border-slate-700/50 text-slate-200">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-slate-700/50">
              <SelectItem value="all" className="text-slate-200 focus:bg-slate-800 focus:text-white">All Status</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value} className="text-slate-200 focus:bg-slate-800 focus:text-white">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search applicants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-[#111827] border-slate-700/50 text-slate-200 placeholder:text-slate-500 focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-2">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="bg-[#111827] border-slate-800/50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-slate-700/50" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-40 mb-2 bg-slate-700/50" />
                      <Skeleton className="h-3 w-64 mb-1 bg-slate-700/50" />
                      <Skeleton className="h-3 w-48 bg-slate-700/50" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : applications.map((app) => (
              <Card
                key={app.id}
                className="bg-[#111827] border-slate-800/50 hover:border-slate-700/80 transition-colors cursor-pointer"
                onClick={() => openDetail(app)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 text-sm font-bold flex-shrink-0">
                      {app.full_name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-medium text-white">{app.full_name}</h3>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusStyle(app.status)}`}>
                          {app.status}
                        </Badge>
                        {app.admin_notes && (
                          <StickyNote className="h-3 w-3 text-amber-500/60" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-slate-500" />
                          {app.vacancies?.title || 'General'}
                        </span>
                        {app.vacancies?.location_city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-500" />
                            {app.vacancies.location_city}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(app.created_at)}
                      </span>
                      <span className="text-[10px] text-slate-600">{app.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

        {!loading && applications.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No applications found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="h-8 bg-transparent border-slate-700/50 text-slate-300 hover:bg-slate-800 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="h-8 bg-transparent border-slate-700/50 text-slate-300 hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="bg-[#111827] border-slate-700/50 text-white w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-white">Application Detail</SheetTitle>
          </SheetHeader>
          {selectedApp && (
            <div className="space-y-6 mt-6">
              {/* Applicant Info */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 text-lg font-bold">
                  {selectedApp.full_name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{selectedApp.full_name}</h3>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {selectedApp.email}
                    </span>
                    {selectedApp.phone && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {selectedApp.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vacancy Details */}
              {selectedApp.vacancies && (
                <div className="rounded-lg bg-[#0a0f1a] p-4 border border-slate-800/50">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Applied For</Label>
                  <p className="text-sm font-medium text-white mt-1">{selectedApp.vacancies.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    {selectedApp.vacancies.department && <span>{selectedApp.vacancies.department}</span>}
                    {selectedApp.vacancies.location_city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedApp.vacancies.location_city}, {selectedApp.vacancies.location_country}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApp.cover_letter && (
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Cover Letter</Label>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{selectedApp.cover_letter}</p>
                </div>
              )}

              {/* Resume */}
              {selectedApp.resume_url && (
                <div>
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Resume</Label>
                  <a
                    href={selectedApp.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0f1a] border border-slate-700/50 text-sm text-teal-400 hover:bg-slate-800 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    View Resume
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              <div className="text-xs text-slate-500">
                Applied: {formatDate(selectedApp.created_at)}
                {selectedApp.updated_at && ` | Updated: ${formatDate(selectedApp.updated_at)}`}
              </div>

              {/* Follow-up Section */}
              <div className="border-t border-slate-700/50 pt-5">
                <h4 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-teal-400" />
                  Follow-up Actions
                </h4>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-300">Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="h-9 bg-[#0a0f1a] border-slate-700/50 text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0f1a] border-slate-700/50">
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value} className="text-slate-200 focus:bg-slate-800 focus:text-white">
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-300">Admin Notes</Label>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add interview notes, feedback, or follow-up actions..."
                      rows={4}
                      className="bg-[#0a0f1a] border-slate-700/50 text-white placeholder:text-slate-600"
                    />
                  </div>
                  <Button
                    onClick={handleUpdateFollowup}
                    disabled={saving}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Update Follow-up'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
