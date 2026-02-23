'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SearchableSelect } from '@/components/searchable-select'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

interface University {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
}

export default function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [universities, setUniversities] = useState<University[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    announcement_type: 'general',
    priority: 'medium',
    university_id: '',
    country_id: '',
    scholarship_amount: '',
    scholarship_type: 'amount',
    eligibility_criteria: '',
    application_link: '',
    start_date: '',
    end_date: '',
    published_at: '',
    expires_at: '',
    is_active: true,
    show_as_banner: false,
    external_link: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      // Fetch universities and countries independently so one failure doesn't block the other
      fetch('/api/admin/universities?limit=999')
        .then((res) => res.json())
        .then((data) => setUniversities(data.data || []))
        .catch(() => console.error('Failed to fetch universities'))

      fetch('/api/admin/countries?limit=999')
        .then((res) => res.json())
        .then((data) => setCountries(data.data || []))
        .catch(() => console.error('Failed to fetch countries'))

      try {
        const announcementRes = await fetch(`/api/admin/announcements/${params.id}`, { credentials: 'same-origin' })
        const announcementData = await announcementRes.json()

        if (announcementData.data) {
          const a = announcementData.data
          setForm({
            title: a.title || '',
            description: a.description || '',
            announcement_type: a.announcement_type || 'general',
            priority: a.priority || 'medium',
            university_id: a.university_id ? String(a.university_id) : '',
            country_id: a.country_id ? String(a.country_id) : '',
            scholarship_amount: a.scholarship_amount ? String(a.scholarship_amount) : '',
            scholarship_type: a.scholarship_type || 'amount',
            eligibility_criteria: a.eligibility_criteria || '',
            application_link: a.application_link || '',
            start_date: a.start_date || '',
            end_date: a.end_date || '',
            published_at: a.published_at ? a.published_at.split('T')[0] : '',
            expires_at: a.expires_at ? a.expires_at.split('T')[0] : '',
            is_active: a.is_active !== undefined ? a.is_active : true,
            show_as_banner: a.show_as_banner || false,
            external_link: a.external_link || '',
          })
        }
      } catch {
        alert('Failed to load announcement')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.id])

  const setField = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      alert('Title is required')
      return
    }

    setSaving(true)
    try {
      const payload: Record<string, any> = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        announcement_type: form.announcement_type,
        priority: form.priority,
        university_id: form.university_id ? parseInt(form.university_id) : null,
        country_id: form.country_id ? parseInt(form.country_id) : null,
        scholarship_amount: form.scholarship_amount ? parseInt(form.scholarship_amount) : null,
        scholarship_type: form.scholarship_type || null,
        eligibility_criteria: form.eligibility_criteria.trim() || null,
        application_link: form.application_link.trim() || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        published_at: form.published_at || null,
        expires_at: form.expires_at || null,
        is_active: form.is_active,
        show_as_banner: form.show_as_banner,
        external_link: form.external_link.trim() || null,
      }

      const res = await fetch(`/api/admin/announcements/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })

      if (!res.ok) throw new Error('Failed to update announcement')

      router.push('/admin/announcements')
    } catch (err) {
      alert('Failed to update announcement')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Card className="border-slate-200">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="cursor-pointer">
          <Link href="/admin/announcements">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Edit Announcement</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-slate-200">
          <CardContent className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-900">Basic Information</h2>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  placeholder="e.g. New Scholarship Available for Engineering Students"
                  className="bg-white border-slate-200 text-slate-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  placeholder="Provide details about the announcement..."
                  rows={4}
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Type</Label>
                  <Select value={form.announcement_type} onValueChange={(val) => setField('announcement_type', val)}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Priority</Label>
                  <Select value={form.priority} onValueChange={(val) => setField('priority', val)}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Status</Label>
                  <Select value={form.is_active ? 'active' : 'inactive'} onValueChange={(val) => setField('is_active', val === 'active')}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Related Entities */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-medium text-slate-900">Related To</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">University (Optional)</Label>
                  <SearchableSelect
                    value={form.university_id}
                    onValueChange={(val) => setField('university_id', val)}
                    options={universities.map((u) => ({ value: String(u.id), label: u.name }))}
                    placeholder="Select university"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Country (Optional)</Label>
                  <SearchableSelect
                    value={form.country_id}
                    onValueChange={(val) => setField('country_id', val)}
                    options={countries.map((c) => ({ value: String(c.id), label: c.name }))}
                    placeholder="Select country"
                  />
                </div>
              </div>
            </div>

            {/* Scholarship Details */}
            {form.announcement_type === 'scholarship' && (
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h2 className="text-lg font-medium text-slate-900">Scholarship Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-700">Scholarship Amount</Label>
                    <Input
                      type="number"
                      value={form.scholarship_amount}
                      onChange={(e) => setField('scholarship_amount', e.target.value)}
                      placeholder="e.g. 5000"
                      className="bg-white border-slate-200 text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-slate-700">Type</Label>
                    <Select value={form.scholarship_type} onValueChange={(val) => setField('scholarship_type', val)}>
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="amount">Fixed Amount</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="full">Full Tuition</SelectItem>
                        <SelectItem value="partial">Partial Tuition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Eligibility Criteria</Label>
                  <Textarea
                    value={form.eligibility_criteria}
                    onChange={(e) => setField('eligibility_criteria', e.target.value)}
                    placeholder="Who can apply for this scholarship?"
                    rows={3}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Application Link</Label>
                  <Input
                    type="url"
                    value={form.application_link}
                    onChange={(e) => setField('application_link', e.target.value)}
                    placeholder="https://..."
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-medium text-slate-900">Dates</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Start Date</Label>
                  <Input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setField('start_date', e.target.value)}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">End Date / Deadline</Label>
                  <Input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setField('end_date', e.target.value)}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Published Date</Label>
                  <Input
                    type="date"
                    value={form.published_at}
                    onChange={(e) => setField('published_at', e.target.value)}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Expires At (Optional)</Label>
                  <Input
                    type="date"
                    value={form.expires_at}
                    onChange={(e) => setField('expires_at', e.target.value)}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Display Options */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-medium text-slate-900">Display Options</h2>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">External Link (Optional)</Label>
                <Input
                  type="url"
                  value={form.external_link}
                  onChange={(e) => setField('external_link', e.target.value)}
                  placeholder="https://..."
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show_as_banner"
                  checked={form.show_as_banner}
                  onChange={(e) => setField('show_as_banner', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <Label htmlFor="show_as_banner" className="text-sm text-slate-700 cursor-pointer">
                  Show as banner notification on website
                </Label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/announcements')}
                className="border-slate-200"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white">
                <Save className="h-4 w-4 mr-1.5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
