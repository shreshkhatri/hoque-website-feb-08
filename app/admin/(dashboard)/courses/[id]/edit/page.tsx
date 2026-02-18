'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { SearchableSelect } from '@/components/searchable-select'
import { RichTextEditor } from '@/components/rich-text-editor'

type University = { id: number; name: string; country_id: number | null }
type Campus = { id: number; name: string; location: string | null }

const LEVEL_OPTIONS = [
  { value: 'Foundation', label: 'Foundation' },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: 'PhD', label: 'PhD' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
]

export default function EditCoursePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loadingCampuses, setLoadingCampuses] = useState(false)
  const [initialUniId, setInitialUniId] = useState('')

  const [form, setForm] = useState({
    name: '',
    code: '',
    university_id: '',
    level: '',
    duration_years: '',
    tuition_fees_international: '',
    intake_months: '',
    field_of_study: '',
    campus_id: '',
    description: '',
    course_overview: '',
    key_features: '',
    scholarships: '',
    entry_requirements: '',
    academic_requirements: '',
    english_language_requirements: '',
    other_requirements: '',
    document_requirements: '',
  })

  const setField = (key: string, val: string) => setForm((prev) => ({ ...prev, [key]: val }))

  // Load course data + dropdowns on mount
  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/courses/${id}`, { credentials: 'same-origin' }).then((r) => r.json()),
      fetch('/api/admin/universities?limit=500', { credentials: 'same-origin' }).then((r) => r.json()),
    ])
      .then(([courseData, uniData]) => {
        setUniversities((uniData.data || []).map((u: any) => ({ id: u.id, name: u.name, country_id: u.country_id })))

        if (courseData.course) {
          const c = courseData.course
          const uniId = c.university_id?.toString() || ''
          setInitialUniId(uniId)
          setForm({
            name: c.name || '',
            code: c.code || '',
            university_id: uniId,
            level: c.level || '',
            duration_years: c.duration_years?.toString() || '',
            tuition_fees_international: c.tuition_fees_international?.toString() || '',
            intake_months: c.intake_months || '',
            field_of_study: c.field_of_study || '',
            campus_id: c.campus_id?.toString() || '',
            description: c.description || '',
            course_overview: c.course_overview || '',
            key_features: c.key_features || '',
            scholarships: c.scholarships || '',
            entry_requirements: c.entry_requirements || '',
            academic_requirements: c.academic_requirements || '',
            english_language_requirements: c.english_language_requirements || '',
            other_requirements: c.other_requirements || '',
            document_requirements: c.document_requirements || '',
          })
        }
      })
      .catch(() => alert('Failed to load course'))
      .finally(() => setLoading(false))
  }, [id])

  // Load campuses when university changes
  useEffect(() => {
    if (!form.university_id) {
      setCampuses([])
      return
    }
    setLoadingCampuses(true)
    fetch(`/api/admin/universities/${form.university_id}/campuses`, { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((data) => {
        setCampuses(data.campuses || [])
        // Only reset campus if university actually changed (not on initial load)
        if (form.university_id !== initialUniId) {
          const valid = (data.campuses || []).some((c: Campus) => c.id.toString() === form.campus_id)
          if (!valid) setField('campus_id', '')
        }
      })
      .catch(() => setCampuses([]))
      .finally(() => setLoadingCampuses(false))
  }, [form.university_id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.university_id || !form.level) {
      alert('Name, University, and Level are required.')
      return
    }
    setSaving(true)
    try {
      const uniName = universities.find((u) => u.id.toString() === form.university_id)?.name || ''
      const autoSlug = (form.name + (uniName ? '-' + uniName : ''))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const selectedUni = universities.find((u) => u.id.toString() === form.university_id)

      const payload: Record<string, any> = {
        name: form.name.trim(),
        code: form.code.trim() || null,
        slug: autoSlug,
        university_id: parseInt(form.university_id),
        country_id: selectedUni?.country_id || null,
        level: form.level,
        duration_years: form.duration_years ? parseInt(form.duration_years) : null,
        tuition_fees_international: form.tuition_fees_international ? parseInt(form.tuition_fees_international) : null,
        intake_months: form.intake_months.trim() || null,
        field_of_study: form.field_of_study.trim() || null,
        campus_id: form.campus_id ? parseInt(form.campus_id) : null,
        description: form.description.trim() || null,
        course_overview: form.course_overview || null,
        key_features: form.key_features || null,
        scholarships: form.scholarships || null,
        entry_requirements: form.entry_requirements || null,
        academic_requirements: form.academic_requirements || null,
        english_language_requirements: form.english_language_requirements || null,
        other_requirements: form.other_requirements || null,
        document_requirements: form.document_requirements || null,
      }

      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })

      if (res.ok) {
        router.push('/admin/courses')
      } else {
        const err = await res.json().catch(() => null)
        alert(err?.error || 'Failed to update course')
      }
    } catch (error: any) {
      alert('Failed to update course: ' + (error?.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  const universityOptions = universities.map((u) => ({ value: u.id.toString(), label: u.name }))
  const campusOptions = campuses.map((c) => ({
    value: c.id.toString(),
    label: c.name + (c.location ? ` - ${c.location}` : ''),
  }))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-lg bg-slate-200" />
          <Skeleton className="h-7 w-48 bg-slate-200" />
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white border-slate-200">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-5 w-40 bg-slate-200" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 bg-slate-200" />
                <Skeleton className="h-10 bg-slate-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
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
          <div>
            <h1 className="text-xl font-bold text-slate-900">Edit Course</h1>
            <p className="text-sm text-slate-500">ID: #{id}</p>
          </div>
        </div>
        <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? 'Saving...' : 'Save Changes'}
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
                onChange={(e) => setField('name', e.target.value)}
                placeholder="e.g. BSc Computer Science"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Course Code</Label>
              <Input
                value={form.code}
                onChange={(e) => setField('code', e.target.value)}
                placeholder="e.g. CS101"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                University <span className="text-red-500">*</span>
              </Label>
              <SearchableSelect
                value={form.university_id}
                onValueChange={(val) => setField('university_id', val)}
                options={universityOptions}
                placeholder="Search university..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                Level <span className="text-red-500">*</span>
              </Label>
              <SearchableSelect
                value={form.level}
                onValueChange={(val) => setField('level', val)}
                options={LEVEL_OPTIONS}
                placeholder="Search level..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Field of Study</Label>
              <Input
                value={form.field_of_study}
                onChange={(e) => setField('field_of_study', e.target.value)}
                placeholder="e.g. Computer Science, Engineering"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Duration (Years)</Label>
              <Input
                type="number"
                value={form.duration_years}
                onChange={(e) => setField('duration_years', e.target.value)}
                placeholder="e.g. 3"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Tuition Fee (International, GBP)</Label>
              <Input
                type="number"
                value={form.tuition_fees_international}
                onChange={(e) => setField('tuition_fees_international', e.target.value)}
                placeholder="e.g. 15000"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Intake Months</Label>
              <Input
                value={form.intake_months}
                onChange={(e) => setField('intake_months', e.target.value)}
                placeholder="e.g. September, January, May"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                Campus
                {!form.university_id && (
                  <span className="text-slate-400 ml-1 font-normal">(select university first)</span>
                )}
              </Label>
              <SearchableSelect
                value={form.campus_id}
                onValueChange={(val) => setField('campus_id', val)}
                options={campusOptions}
                placeholder={loadingCampuses ? 'Loading campuses...' : campuses.length === 0 && form.university_id ? 'No campuses available' : 'Search campus...'}
                disabled={!form.university_id || loadingCampuses}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Short Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              placeholder="Brief one-line description of the course"
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
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Course Overview</Label>
            <RichTextEditor
              value={form.course_overview}
              onChange={(val) => setField('course_overview', val)}
              placeholder="Detailed overview of what the course covers..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Key Features</Label>
            <RichTextEditor
              value={form.key_features}
              onChange={(val) => setField('key_features', val)}
              placeholder="Key features and highlights of the course..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Scholarships</Label>
            <RichTextEditor
              value={form.scholarships}
              onChange={(val) => setField('scholarships', val)}
              placeholder="Available scholarships and funding options..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900">Entry Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Entry Requirements (General)</Label>
            <RichTextEditor
              value={form.entry_requirements}
              onChange={(val) => setField('entry_requirements', val)}
              placeholder="General entry requirements..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Academic Requirements</Label>
            <RichTextEditor
              value={form.academic_requirements}
              onChange={(val) => setField('academic_requirements', val)}
              placeholder="Academic qualifications needed..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">English Language Requirements</Label>
            <RichTextEditor
              value={form.english_language_requirements}
              onChange={(val) => setField('english_language_requirements', val)}
              placeholder="e.g. IELTS 6.5 overall, no less than 6.0..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Other Requirements</Label>
            <RichTextEditor
              value={form.other_requirements}
              onChange={(val) => setField('other_requirements', val)}
              placeholder="Any additional requirements..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Document Requirements</Label>
            <RichTextEditor
              value={form.document_requirements}
              onChange={(val) => setField('document_requirements', val)}
              placeholder="Required documents for application..."
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
        <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
