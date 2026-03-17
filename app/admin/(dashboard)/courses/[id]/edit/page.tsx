'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/components/toast-notification'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Save, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { SearchableSelect } from '@/components/searchable-select'
import { RichTextEditor } from '@/components/rich-text-editor'
import { CategorySelect } from '@/components/category-select'
import { CourseCountryRequirements } from '@/components/admin/course-country-requirements'
import { TbcToggle } from '@/components/tbc-toggle'

type University = { id: number; name: string; country_id: number | null; currency: string | null }
type Campus = { id: number; name: string; location: string | null }
type CourseLevel = { id: number; name: string; category_id: number | null; badge_color: string }

export default function EditCoursePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { showToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loadingCampuses, setLoadingCampuses] = useState(false)
  const [initialUniId, setInitialUniId] = useState('')
  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([])
  const [tbcFields, setTbcFields] = useState<string[]>([])

  const [form, setForm] = useState({
    name: '',
    code: '',
    university_id: '',
    category_id: null as number | null,
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
    scholarship_amount: '',
    scholarship_type: 'amount' as 'amount' | 'percentage',
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
      fetch('/api/admin/course-levels', { credentials: 'same-origin' }).then((r) => r.json()),
    ])
      .then(([courseData, uniData, levelsData]) => {
        setUniversities((uniData.data || []).map((u: any) => ({ id: u.id, name: u.name, country_id: u.country_id, currency: u.countries?.currency || null })))
        // levelsData is an array from admin endpoint
        setCourseLevels(Array.isArray(levelsData) ? levelsData.map((l: any) => ({
          id: l.id,
          name: l.name,
          category_id: l.category_id,
          badge_color: l.badge_color || 'badge-slate',
        })) : [])

        if (courseData.course) {
          const c = courseData.course
          const uniId = c.university_id?.toString() || ''
          setInitialUniId(uniId)
          // Restore TBC fields
          setTbcFields(Array.isArray(c.tbc_fields) ? c.tbc_fields : [])
          setForm({
            name: c.name || '',
            code: c.code || '',
            university_id: uniId,
            category_id: c.category_id || null,
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
            scholarship_amount: c.scholarship_amount?.toString() || '',
            scholarship_type: c.scholarship_type || 'amount',
            entry_requirements: c.entry_requirements || '',
            academic_requirements: c.academic_requirements || '',
            english_language_requirements: c.english_language_requirements || '',
            other_requirements: c.other_requirements || '',
            document_requirements: c.document_requirements || '',
          })
        }
      })
      .catch(() => showToast('error', 'Load failed', 'Failed to load course data.'))
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
      showToast('warning', 'Missing required fields', 'Name, University, and Level are required.')
      return
    }
    setSaving(true)
    try {
      const selectedUni = universities.find((u) => u.id.toString() === form.university_id)

    const payload: Record<string, any> = {
      name: form.name.trim(),
      // code is intentionally excluded — course codes are permanent after creation
      university_id: parseInt(form.university_id),
        country_id: selectedUni?.country_id || null,
        category_id: form.category_id,
        level: form.level,
        duration_years: form.duration_years ? parseInt(form.duration_years) : null,
        tuition_fees_international: tbcFields.includes('tuition_fees_international') ? null : (form.tuition_fees_international ? parseInt(form.tuition_fees_international) : null),
        intake_months: tbcFields.includes('intake_months') ? null : (form.intake_months.trim() || null),
        field_of_study: form.field_of_study.trim() || null,
        campus_id: tbcFields.includes('campus_id') ? null : (form.campus_id ? parseInt(form.campus_id) : null),
        description: form.description.trim() || null,
        course_overview: form.course_overview || null,
        key_features: form.key_features || null,
        scholarships: form.scholarships || null,
        scholarship_amount: tbcFields.includes('scholarship_amount') ? null : (form.scholarship_amount ? parseFloat(form.scholarship_amount) : null),
        scholarship_type: tbcFields.includes('scholarship_amount') ? null : (form.scholarship_amount ? form.scholarship_type : null),
        entry_requirements: form.entry_requirements || null,
        academic_requirements: form.academic_requirements || null,
        english_language_requirements: form.english_language_requirements || null,
        other_requirements: form.other_requirements || null,
        document_requirements: form.document_requirements || null,
        tbc_fields: tbcFields,
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
        showToast('error', 'Failed to update course', err?.error || 'An unexpected error occurred.')
      }
    } catch (error: any) {
      showToast('error', 'Failed to update course', error?.message || 'Unknown error')
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
              <Label className="text-sm text-slate-700 flex items-center gap-1.5">
                Course Code
                <Lock className="h-3 w-3 text-slate-400" />
              </Label>
              <div className="relative">
                <Input
                  value={form.code}
                  readOnly
                  placeholder="No code set"
                  className="bg-slate-50 border-slate-200 text-slate-500 font-mono cursor-not-allowed pr-9"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Course codes are permanent and cannot be changed after creation.
              </p>
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
                options={courseLevels.map(l => ({ value: l.name, label: l.name }))}
                placeholder="Search level..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                Category <span className="text-red-500">*</span>
              </Label>
              <CategorySelect
                value={form.category_id}
                onValueChange={(val) => setForm((prev) => ({ ...prev, category_id: val }))}
                disabled={loading}
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
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-700">
                  Tuition Fee (International{(() => { const cur = universities.find(u => u.id.toString() === form.university_id)?.currency; return cur ? `, ${cur}` : ''; })()})
                </Label>
                <TbcToggle field="tuition_fees_international" tbcFields={tbcFields} onChange={setTbcFields} />
              </div>
              <Input
                type="number"
                value={form.tuition_fees_international}
                onChange={(e) => setField('tuition_fees_international', e.target.value)}
                placeholder={tbcFields.includes('tuition_fees_international') ? 'Leave blank — shown as TBC' : 'e.g. 15000'}
                disabled={tbcFields.includes('tuition_fees_international')}
                className={`bg-white border-slate-200 text-slate-900 ${tbcFields.includes('tuition_fees_international') ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-700">Intake Months</Label>
                <TbcToggle field="intake_months" tbcFields={tbcFields} onChange={setTbcFields} />
              </div>
              <Input
                value={form.intake_months}
                onChange={(e) => setField('intake_months', e.target.value)}
                placeholder={tbcFields.includes('intake_months') ? 'Leave blank — shown as TBC' : 'e.g. September, January, May'}
                disabled={tbcFields.includes('intake_months')}
                className={`bg-white border-slate-200 text-slate-900 ${tbcFields.includes('intake_months') ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-700">
                  Campus
                  {!form.university_id && (
                    <span className="text-slate-400 ml-1 font-normal">(select university first)</span>
                  )}
                </Label>
                <TbcToggle field="campus_id" tbcFields={tbcFields} onChange={setTbcFields} />
              </div>
              <SearchableSelect
                value={form.campus_id}
                onValueChange={(val) => setField('campus_id', val)}
                options={campusOptions}
                placeholder={tbcFields.includes('campus_id') ? 'Shown as TBC' : loadingCampuses ? 'Loading campuses...' : campuses.length === 0 && form.university_id ? 'No campuses available' : 'Search campus...'}
                disabled={!form.university_id || loadingCampuses || tbcFields.includes('campus_id')}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-700">Scholarship Amount</Label>
                <TbcToggle field="scholarship_amount" tbcFields={tbcFields} onChange={setTbcFields} />
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  value={form.scholarship_amount}
                  onChange={(e) => setField('scholarship_amount', e.target.value)}
                  placeholder={tbcFields.includes('scholarship_amount') ? 'Leave blank — shown as TBC' : form.scholarship_type === 'percentage' ? 'e.g. 10' : 'e.g. 5000'}
                  disabled={tbcFields.includes('scholarship_amount')}
                  className={`bg-white border-slate-200 text-slate-900 flex-1 ${tbcFields.includes('scholarship_amount') ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <SearchableSelect
                  value={form.scholarship_type}
                  onValueChange={(val) => setForm(prev => ({ ...prev, scholarship_type: val as 'amount' | 'percentage' }))}
                  options={[
                    { value: 'amount', label: 'Amount' },
                    { value: 'percentage', label: 'Percentage' },
                  ]}
                  placeholder="Type"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2" />
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

      {/* Country-Specific Requirements */}
      <CourseCountryRequirements courseId={id} />

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
