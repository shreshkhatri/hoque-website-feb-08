'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/toast-notification'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { SearchableSelect } from '@/components/searchable-select'
import { RichTextEditor } from '@/components/rich-text-editor'
import { CategorySelect } from '@/components/category-select'
import { TbcToggle } from '@/components/tbc-toggle'

type University = { id: number; name: string; country_id: number | null; currency: string | null }
type Campus = { id: number; name: string; location: string | null }
type CourseLevel = { id: number; name: string; category_id: number | null; badge_color: string }
type LevelCategory = { id: number; name: string; badge_color: string }

export default function NewCoursePage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [saving, setSaving] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loadingCampuses, setLoadingCampuses] = useState(false)
  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([])
  const [levelCategories, setLevelCategories] = useState<LevelCategory[]>([])
  const [codeStatus, setCodeStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [codeManuallyEdited, setCodeManuallyEdited] = useState(false)
  const [tbcFields, setTbcFields] = useState<string[]>([])
  const checkCodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Generate a course code from name + level + university
  const generateCode = useCallback((name: string, level: string, unis: University[], uniId: string): string => {
    const namePart = name
      .trim()
      .split(/\s+/)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 4)

    const levelPart = level.slice(0, 3).toUpperCase()

    const uni = unis.find((u) => u.id.toString() === uniId)
    const uniPart = uni
      ? uni.name.split(/\s+/).map((w) => w[0]?.toUpperCase() || '').join('').slice(0, 3)
      : ''

    const randomSuffix = Math.floor(100 + Math.random() * 900).toString()
    return [namePart, levelPart, uniPart, randomSuffix].filter(Boolean).join('-')
  }, [])

  // Check availability of a code via API (debounced)
  const checkCodeAvailability = useCallback((code: string) => {
    if (checkCodeTimer.current) clearTimeout(checkCodeTimer.current)
    if (!code.trim()) { setCodeStatus('idle'); return }
    setCodeStatus('checking')
    checkCodeTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/courses/check-code?code=${encodeURIComponent(code.trim())}`, { credentials: 'same-origin' })
        const data = await res.json()
        setCodeStatus(data.available ? 'available' : 'taken')
      } catch {
        setCodeStatus('idle')
      }
    }, 500)
  }, [])

  // Auto-regenerate code when name, level, or university changes (only if not manually edited)
  useEffect(() => {
    if (codeManuallyEdited) return
    if (!form.name && !form.level && !form.university_id) return
    const generated = generateCode(form.name, form.level, universities, form.university_id)
    setForm((prev) => ({ ...prev, code: generated }))
    checkCodeAvailability(generated)
  }, [form.name, form.level, form.university_id, universities, codeManuallyEdited, generateCode, checkCodeAvailability])

  // Load universities and course levels on mount
  useEffect(() => {
    fetch('/api/admin/universities?limit=500', { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((uniData) => {
        setUniversities((uniData.data || []).map((u: any) => ({ id: u.id, name: u.name, country_id: u.country_id, currency: u.countries?.currency || null })))
      })
      .catch(() => {})
    
    // Fetch course levels from database (admin endpoint returns full data with category)
    fetch('/api/admin/course-levels', { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((data) => {
        // Data is an array of course levels with category info
        if (Array.isArray(data)) {
          setCourseLevels(data.map((l: any) => ({
            id: l.id,
            name: l.name,
            category_id: l.category_id,
            badge_color: l.badge_color || 'badge-slate',
          })))
          // Extract unique categories
          const cats = data
            .filter((l: any) => l.category)
            .map((l: any) => l.category)
            .filter((c: any, i: number, arr: any[]) => arr.findIndex((x) => x.id === c.id) === i)
          setLevelCategories(cats)
        }
      })
      .catch(() => {})
  }, [])

  // Load campuses when university changes
  useEffect(() => {
    if (!form.university_id) {
      setCampuses([])
      setField('campus_id', '')
      return
    }
    setLoadingCampuses(true)
    fetch(`/api/admin/universities/${form.university_id}/campuses`, { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((data) => {
        setCampuses(data.campuses || [])
        // Reset campus selection if it's not valid for new university
        if (form.campus_id) {
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
    if (codeStatus === 'taken') {
      showToast('error', 'Course code already exists', `The code "${form.code}" is already in use. Please modify it or regenerate a new one.`)
      return
    }
    if (codeStatus === 'checking') {
      showToast('warning', 'Please wait', 'Checking course code availability...')
      return
    }
    setSaving(true)
    try {
      const selectedUni = universities.find((u) => u.id.toString() === form.university_id)

      const payload: Record<string, any> = {
        name: form.name.trim(),
        code: form.code.trim() || null,
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

      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })

      if (res.ok) {
        const created = await res.json()
        const newId = created?.data?.id || created?.id
        showToast('success', 'Course created', 'You can now add country-specific requirements below.')
        // Redirect to edit page so country-specific requirements can be added immediately
        router.push(`/admin/courses/${newId}/edit`)
      } else {
        const err = await res.json().catch(() => null)
        showToast('error', 'Failed to create course', err?.error || 'An unexpected error occurred.')
      }
    } catch (error: any) {
      showToast('error', 'Failed to create course', error?.message || 'Unknown error')
    } finally {
      setSaving(false)
    }
  }

  const universityOptions = universities.map((u) => ({ value: u.id.toString(), label: u.name }))
  const campusOptions = campuses.map((c) => ({
    value: c.id.toString(),
    label: c.name + (c.location ? ` - ${c.location}` : ''),
  }))

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
        <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
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
                onChange={(e) => setField('name', e.target.value)}
                placeholder="e.g. BSc Computer Science"
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-700">
                  Course Code
                  <span className="ml-1.5 text-xs font-normal text-amber-600 inline-flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Cannot be changed after creation
                  </span>
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    const generated = generateCode(form.name, form.level, universities, form.university_id)
                    setForm((prev) => ({ ...prev, code: generated }))
                    setCodeManuallyEdited(false)
                    checkCodeAvailability(generated)
                  }}
                  className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </button>
              </div>
              <div className="relative">
                <Input
                  value={form.code}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9\-_]/g, '')
                    setField('code', val)
                    setCodeManuallyEdited(true)
                    checkCodeAvailability(val)
                  }}
                  placeholder="Auto-generated from name + level + university"
                  className={`bg-white border-slate-200 text-slate-900 pr-9 font-mono ${
                    codeStatus === 'taken' ? 'border-red-400 focus-visible:ring-red-400' :
                    codeStatus === 'available' ? 'border-emerald-400 focus-visible:ring-emerald-400' : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {codeStatus === 'checking' && <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />}
                  {codeStatus === 'available' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  {codeStatus === 'taken' && <XCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
              {codeStatus === 'taken' && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  This code is already in use. Modify it or click Regenerate.
                </p>
              )}
              {codeStatus === 'available' && form.code && (
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  This code is available.
                </p>
              )}
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
          {/* Country-specific callout */}
          <div className="flex items-start gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3">
            <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold leading-none">i</span>
            </div>
            <p className="text-sm text-teal-800">
              These are the <strong>global defaults</strong> shown to all visitors. After creating this course, you will be taken to the edit page where you can add <strong>country-specific requirement overrides</strong> (e.g. different IELTS scores for students from Nepal vs. Nigeria).
            </p>
          </div>

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
          {saving ? 'Creating...' : 'Create Course'}
        </Button>
      </div>
    </form>
  )
}
