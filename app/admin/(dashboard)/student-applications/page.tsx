'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Eye, FileText, Download, X, User, Mail, Phone, MapPin, GraduationCap, BookOpen, Calendar, Clock, ChevronDown, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Application {
  id: number
  full_name: string
  email: string
  phone: string
  country: string
  highest_qualification: string | null
  applying_for: string | null
  subject_area: string | null
  preferred_course_name: string | null
  preferred_intake: string | null
  university_name: string | null
  student_type: string | null
  additional_info: string | null
  doc_10th_url: string | null
  doc_12th_url: string | null
  doc_degree_url: string | null
  doc_masters_url: string | null
  doc_transcript_url: string | null
  doc_marksheet_url: string | null
  doc_passport_url: string | null
  doc_cv_url: string | null
  status: string
  admin_notes: string | null
  created_at: string
  updated_at: string | null
}

const statusColors: Record<string, string> = {
  unviewed: 'bg-red-100 text-red-700',
  viewed: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-slate-100 text-slate-700',
}

const statusOptions = ['unviewed', 'viewed', 'contacted', 'accepted', 'rejected']

const docLabels: Record<string, string> = {
  doc_10th_url: '10th Mark Sheet',
  doc_12th_url: '12th / Diploma',
  doc_degree_url: 'Degree Certificate',
  doc_masters_url: 'Masters Certificate',
  doc_transcript_url: 'Transcript',
  doc_marksheet_url: 'Consolidated Mark Sheet',
  doc_passport_url: 'Passport',
  doc_cv_url: 'CV / Resume',
}

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<Application | null>(null)
  const [notes, setNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatus !== 'all') params.set('status', filterStatus)
      if (search) params.set('search', search)
      const res = await fetch(`/api/admin/student-applications?${params}`)
      const data = await res.json()
      setApplications(Array.isArray(data) ? data : [])
    } catch {
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [filterStatus])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications()
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  const openApplication = async (app: Application) => {
    setSelected(app)
    setNotes(app.admin_notes || '')
    // Auto-mark as viewed if unviewed
    if (app.status === 'unviewed') {
      try {
        const res = await fetch(`/api/admin/student-applications/${app.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'viewed' }),
        })
        if (res.ok) {
          const updated = await res.json()
          setApplications((prev) => prev.map((a) => (a.id === app.id ? updated : a)))
          setSelected(updated)
        }
      } catch {}
    }
  }

  const updateStatus = async (status: string) => {
    if (!selected) return
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/admin/student-applications/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        const updated = await res.json()
        setApplications((prev) => prev.map((a) => (a.id === selected.id ? updated : a)))
        setSelected(updated)
      }
    } catch {} finally {
      setUpdatingStatus(false)
    }
  }

  const saveNotes = async () => {
    if (!selected) return
    setSavingNotes(true)
    try {
      const res = await fetch(`/api/admin/student-applications/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_notes: notes }),
      })
      if (res.ok) {
        const updated = await res.json()
        setApplications((prev) => prev.map((a) => (a.id === selected.id ? updated : a)))
        setSelected(updated)
      }
    } catch {} finally {
      setSavingNotes(false)
    }
  }

  const deleteApplication = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    try {
      const res = await fetch(`/api/admin/student-applications/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id))
        if (selected?.id === id) setSelected(null)
      }
    } catch {}
  }

  const getDocuments = (app: Application) => {
    return Object.entries(docLabels)
      .filter(([key]) => app[key as keyof Application])
      .map(([key, label]) => ({ key, label, url: app[key as keyof Application] as string }))
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left: List */}
      <div className="w-full lg:w-[420px] border-r border-slate-200 flex flex-col bg-white">
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800 mb-4">Student Applications</h1>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, course..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Status filter */}
          <div className="flex flex-wrap gap-1.5">
            {['all', ...statusOptions].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  filterStatus === s
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Application list */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-teal-500" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">No applications found</div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                onClick={() => openApplication(app)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${
                  selected?.id === app.id ? 'bg-teal-50 border-l-2 border-l-teal-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm text-slate-800 truncate pr-2">{app.full_name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${statusColors[app.status] || 'bg-slate-100 text-slate-600'}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{app.preferred_course_name || 'No course specified'}</p>
                <p className="text-xs text-slate-400 truncate">{app.university_name || ''}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-400">{formatDate(app.created_at)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteApplication(app.id) }}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right: Detail Panel */}
      <div className="hidden lg:flex flex-1 flex-col bg-slate-50">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select an application to view details</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selected.full_name}</h2>
                <p className="text-sm text-slate-500 mt-1">Applied on {formatDate(selected.created_at)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Status changer */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-slate-600">Status:</span>
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    disabled={updatingStatus}
                    onClick={() => updateStatus(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                      selected.status === s
                        ? statusColors[s]
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {/* Personal Info */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-teal-600" />
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Email</p>
                      <a href={`mailto:${selected.email}`} className="text-sm text-teal-600 hover:underline">{selected.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Phone</p>
                      <a href={`tel:${selected.phone}`} className="text-sm text-teal-600 hover:underline">{selected.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Country</p>
                      <p className="text-sm text-slate-700">{selected.country}</p>
                    </div>
                  </div>
                  {selected.student_type && (
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-semibold">Student Type</p>
                        <p className="text-sm text-slate-700">{selected.student_type}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Education & Program */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-teal-600" />
                  Education & Program
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selected.highest_qualification && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Highest Qualification</p>
                      <p className="text-sm text-slate-700">{selected.highest_qualification}</p>
                    </div>
                  )}
                  {selected.applying_for && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Applying For</p>
                      <p className="text-sm text-slate-700">{selected.applying_for}</p>
                    </div>
                  )}
                  {selected.subject_area && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Subject Area</p>
                      <p className="text-sm text-slate-700">{selected.subject_area}</p>
                    </div>
                  )}
                  {selected.preferred_course_name && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Preferred Course</p>
                      <p className="text-sm text-slate-700 font-medium">{selected.preferred_course_name}</p>
                    </div>
                  )}
                  {selected.university_name && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">University</p>
                      <p className="text-sm text-slate-700">{selected.university_name}</p>
                    </div>
                  )}
                  {selected.preferred_intake && (
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">Preferred Intake</p>
                      <p className="text-sm text-slate-700">{selected.preferred_intake}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              {getDocuments(selected).length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-600" />
                    Documents ({getDocuments(selected).length})
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {getDocuments(selected).map(({ key, label, url }) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-teal-50 hover:border-teal-200 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <Download className="h-4 w-4 text-teal-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-700 group-hover:text-teal-700 truncate">{label}</p>
                          <p className="text-[10px] text-slate-400">Click to view</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {selected.additional_info && (
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-teal-600" />
                    Additional Information
                  </h3>
                  <p className="text-sm text-slate-600 whitespace-pre-line">{selected.additional_info}</p>
                </div>
              )}

              {/* Admin Notes */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-3">Admin Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add internal notes about this application..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
                <Button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  size="sm"
                  className="mt-3 bg-teal-600 hover:bg-teal-700"
                >
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
