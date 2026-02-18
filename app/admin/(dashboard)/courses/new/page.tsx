'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

type University = { id: number; name: string }
type Country = { id: number; name: string }

export default function NewCoursePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [countries, setCountries] = useState<Country[]>([])

  const [form, setForm] = useState({
    name: '',
    code: '',
    slug: '',
    university_id: '',
    country_id: '',
    level: '',
    duration_years: '',
    tuition_fees_international: '',
    intake_months: '',
    field_of_study: '',
    description: '',
    course_overview: '',
    entry_requirements: '',
    academic_requirements: '',
    english_language_requirements: '',
    other_requirements: '',
    document_requirements: '',
    scholarships: '',
    key_features: '',
    campus_id: '',
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/countries').then((r) => r.json()),
      fetch('/api/admin/universities?limit=500', { credentials: 'same-origin' }).then((r) => r.json()),
    ])
      .then(([countriesData, uniData]) => {
        setCountries(countriesData.countries || [])
        setUniversities((uniData.data || []).map((u: any) => ({ id: u.id, name: u.name })))
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.university_id || !form.level.trim()) {
      alert('Name, University, and Level are required.')
      return
    }
    setSaving(true)
    try {
      const payload: Record<string, any> = {
        name: form.name.trim(),
        code: form.code.trim() || null,
        slug: form.slug.trim() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        university_id: parseInt(form.university_id),
        country_id: form.country_id ? parseInt(form.country_id) : null,
        level: form.level.trim(),
        duration_years: form.duration_years ? parseInt(form.duration_years) : null,
        tuition_fees_international: form.tuition_fees_international ? parseInt(form.tuition_fees_international) : null,
        intake_months: form.intake_months.trim() || null,
        field_of_study: form.field_of_study.trim() || null,
        description: form.description.trim() || null,
        course_overview: form.course_overview.trim() || null,
        entry_requirements: form.entry_requirements.trim() || null,
        academic_requirements: form.academic_requirements.trim() || null,
        english_language_requirements: form.english_language_requirements.trim() || null,
        other_requirements: form.other_requirements.trim() || null,
        document_requirements: form.document_requirements.trim() || null,
        scholarships: form.scholarships.trim() || null,
        key_features: form.key_features.trim() || null,
        campus_id: form.campus_id ? parseInt(form.campus_id) : null,
      }

      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })

      if (res.ok) {
        router.push('/admin/courses')
      } else {
        const err = await res.json().catch(() => null)
        alert(err?.error || 'Failed to create course')
      }
    } catch (error: any) {
      alert('Failed to create course: ' + (error?.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/courses"
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Add New Course</h1>
        </div>
        <Button
          type="submit"
          disabled={saving}
          className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? 'Creating...' : 'Create Course'}
        </Button>
      </div>

      {/* Basic Information */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm text-slate-700">
                Course Name <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. BSc Computer Science"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Course Code</Label>
              <Input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. CS101"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated-from-name"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                University <span className="text-red-500">*</span>
              </Label>
              <Select required value={form.university_id} onValueChange={(val) => setForm({ ...form, university_id: val })}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 max-h-60">
                  {universities.map((u) => (
                    <SelectItem key={u.id} value={u.id.toString()} className="text-slate-900">
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Country</Label>
              <Select value={form.country_id} onValueChange={(val) => setForm({ ...form, country_id: val })}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 max-h-60">
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()} className="text-slate-900">
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                Level <span className="text-red-500">*</span>
              </Label>
              <Select required value={form.level} onValueChange={(val) => setForm({ ...form, level: val })}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="Foundation" className="text-slate-900">Foundation</SelectItem>
                  <SelectItem value="Bachelor's" className="text-slate-900">{"Bachelor's"}</SelectItem>
                  <SelectItem value="Master's" className="text-slate-900">{"Master's"}</SelectItem>
                  <SelectItem value="PhD" className="text-slate-900">PhD</SelectItem>
                  <SelectItem value="Diploma" className="text-slate-900">Diploma</SelectItem>
                  <SelectItem value="Certificate" className="text-slate-900">Certificate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Field of Study</Label>
              <Input
                value={form.field_of_study}
                onChange={(e) => setForm({ ...form, field_of_study: e.target.value })}
                placeholder="e.g. Computer Science, Engineering"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Duration (Years)</Label>
              <Input
                type="number"
                value={form.duration_years}
                onChange={(e) => setForm({ ...form, duration_years: e.target.value })}
                placeholder="e.g. 3"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Tuition Fee (International, GBP)</Label>
              <Input
                type="number"
                value={form.tuition_fees_international}
                onChange={(e) => setForm({ ...form, tuition_fees_international: e.target.value })}
                placeholder="e.g. 15000"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Intake Months</Label>
              <Input
                value={form.intake_months}
                onChange={(e) => setForm({ ...form, intake_months: e.target.value })}
                placeholder="e.g. September, January, May"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Campus ID</Label>
              <Input
                type="number"
                value={form.campus_id}
                onChange={(e) => setForm({ ...form, campus_id: e.target.value })}
                placeholder="Optional campus ID"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Short Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description of the course..."
              rows={3}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>
        </CardContent>
      </Card>

      {/* Course Details */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Course Overview</Label>
            <Textarea
              value={form.course_overview}
              onChange={(e) => setForm({ ...form, course_overview: e.target.value })}
              placeholder="Detailed overview of what the course covers..."
              rows={5}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Key Features</Label>
            <Textarea
              value={form.key_features}
              onChange={(e) => setForm({ ...form, key_features: e.target.value })}
              placeholder="Key features and highlights of the course..."
              rows={4}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Scholarships</Label>
            <Textarea
              value={form.scholarships}
              onChange={(e) => setForm({ ...form, scholarships: e.target.value })}
              placeholder="Available scholarships and funding options..."
              rows={4}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Entry Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Entry Requirements (General)</Label>
            <Textarea
              value={form.entry_requirements}
              onChange={(e) => setForm({ ...form, entry_requirements: e.target.value })}
              placeholder="General entry requirements..."
              rows={4}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Academic Requirements</Label>
            <Textarea
              value={form.academic_requirements}
              onChange={(e) => setForm({ ...form, academic_requirements: e.target.value })}
              placeholder="Academic qualifications needed..."
              rows={4}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">English Language Requirements</Label>
            <Textarea
              value={form.english_language_requirements}
              onChange={(e) => setForm({ ...form, english_language_requirements: e.target.value })}
              placeholder="e.g. IELTS 6.5 overall, no less than 6.0 in each component..."
              rows={4}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Other Requirements</Label>
            <Textarea
              value={form.other_requirements}
              onChange={(e) => setForm({ ...form, other_requirements: e.target.value })}
              placeholder="Any additional requirements..."
              rows={3}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Document Requirements</Label>
            <Textarea
              value={form.document_requirements}
              onChange={(e) => setForm({ ...form, document_requirements: e.target.value })}
              placeholder="Required documents for application..."
              rows={4}
              className="bg-white border-slate-200 text-slate-900"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/courses')}
          className="border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? 'Creating...' : 'Create Course'}
        </Button>
      </div>
    </form>
  )
}
