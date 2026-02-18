'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  X,
  StickyNote,
  CheckCircle2,
  Circle,
  Eye,
  Send,
  AlertCircle,
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

interface Message {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  admin_notes: string | null
  created_at: string
  updated_at: string | null
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', icon: Circle, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  { value: 'reviewed', label: 'Reviewed', icon: Eye, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { value: 'contacted', label: 'Contacted', icon: Send, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { value: 'resolved', label: 'Resolved', icon: CheckCircle2, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
]

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status)?.color || 'text-slate-400 bg-slate-500/10 border-slate-500/20'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const limit = 15

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedSearch,
      })
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/admin/messages?${params}`)
      const data = await res.json()
      setMessages(data.data || [])
      setTotal(data.total || 0)
    } catch {
      console.error('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter])

  const openDetail = (msg: Message) => {
    setSelectedMessage(msg)
    setAdminNotes(msg.admin_notes || '')
    setNewStatus(msg.status)
    setSheetOpen(true)
  }

  const handleUpdateFollowup = async () => {
    if (!selectedMessage) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedMessage.id,
          status: newStatus,
          admin_notes: adminNotes,
        }),
      })
      const data = await res.json()
      if (data.data) {
        setSelectedMessage(data.data)
        fetchMessages()
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
        <p className="text-sm text-slate-400">{total} messages total</p>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] h-9 bg-white border-slate-200 text-slate-900">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="all" className="text-slate-900 focus:bg-slate-800 focus:text-slate-900">All Status</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value} className="text-slate-900 focus:bg-slate-800 focus:text-slate-900">{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-2">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="bg-white border-slate-200">
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
          : messages.map((msg) => (
              <Card
                key={msg.id}
                className="bg-white border-slate-200 hover:border-slate-700/80 transition-colors cursor-pointer"
                onClick={() => openDetail(msg)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
                      {msg.first_name?.charAt(0)?.toUpperCase()}{msg.last_name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-medium text-slate-900">{msg.first_name} {msg.last_name}</h3>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusStyle(msg.status)}`}>
                          {msg.status}
                        </Badge>
                        {msg.admin_notes && (
                          <StickyNote className="h-3 w-3 text-amber-500/60" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-700 mt-0.5">{msg.subject}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{msg.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(msg.created_at)}
                      </span>
                      <span className="text-[10px] text-slate-600">{msg.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

        {!loading && messages.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No messages found</p>
          </div>
        )}
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

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="bg-white border-slate-200 text-slate-900 w-full sm:max-w-lg overflow-y-auto px-6 py-8">
          <SheetHeader>
            <SheetTitle className="text-slate-900">Message Detail</SheetTitle>
          </SheetHeader>
          {selectedMessage && (
            <div className="space-y-6 mt-6">
              {/* Sender Info */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg font-bold">
                  {selectedMessage.first_name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{selectedMessage.first_name} {selectedMessage.last_name}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {selectedMessage.email}
                    </span>
                    {selectedMessage.phone && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {selectedMessage.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Subject & Message */}
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Subject</Label>
                  <p className="text-sm text-slate-900 mt-1">{selectedMessage.subject}</p>
                </div>
                <div>
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">Message</Label>
                  <p className="text-sm text-slate-700 mt-1 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Received: {formatDate(selectedMessage.created_at)}</span>
                  {selectedMessage.updated_at && (
                    <span>Updated: {formatDate(selectedMessage.updated_at)}</span>
                  )}
                </div>
              </div>

              {/* Follow-up Section */}
              <div className="border-t border-slate-200 pt-5">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-teal-400" />
                  Follow-up Actions
                </h4>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-700">Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="h-9 bg-slate-50 border-slate-200 text-slate-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-50 border-slate-200">
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value} className="text-slate-900 focus:bg-slate-800 focus:text-slate-900">
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-700">Admin Notes</Label>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add your follow-up notes here..."
                      rows={4}
                      className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-600"
                    />
                  </div>
                  <Button
                    onClick={handleUpdateFollowup}
                    disabled={saving}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-slate-900 cursor-pointer"
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
