'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RichTextEditor } from '@/components/rich-text-editor'
import { useToast } from '@/components/toast-notification'
import {
  Plus, Trash2, ChevronDown, ChevronUp, Globe, Loader2, Pencil, X, Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { searchCountries, WorldCountry } from '@/lib/world-countries'

interface Country {
  id: number
  name: string
  flag_emoji: string | null
}

// Selected country can be either from DB or from static list
interface SelectedCountry {
  name: string
  code: string
  flag: string
}

interface CountryRequirement {
  id: number
  course_id: number
  country_id: number
  academic_requirements: string | null
  english_language_requirements: string | null
  other_requirements: string | null
  document_requirements: string | null
  additional_notes: string | null
  is_active: boolean
  countries: Country
}

interface RequirementForm {
  academic_requirements: string
  english_language_requirements: string
  other_requirements: string
  document_requirements: string
  additional_notes: string
}

const EMPTY_FORM: RequirementForm = {
  academic_requirements: '',
  english_language_requirements: '',
  other_requirements: '',
  document_requirements: '',
  additional_notes: '',
}

interface Props {
  courseId: string
}

export function CourseCountryRequirements({ courseId }: Props) {
  const { showToast } = useToast()
  const [requirements, setRequirements] = useState<CountryRequirement[]>([])
  const [loading, setLoading] = useState(true)

  // Add new requirement state
  const [adding, setAdding] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [countryResults, setCountryResults] = useState<WorldCountry[]>([])
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [newForm, setNewForm] = useState<RequirementForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<RequirementForm>(EMPTY_FORM)
  const [editSaving, setEditSaving] = useState(false)

  // Expanded rows
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  // Deleting
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Load existing requirements
  useEffect(() => {
    fetch(`/api/admin/courses/${courseId}/country-requirements`, { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((json) => setRequirements(json.data || []))
      .catch(() => showToast('error', 'Load failed', 'Could not load country requirements.'))
      .finally(() => setLoading(false))
  }, [courseId])

  // Build the set of already-added country names (lowercased) from loaded requirements
  const existingCountryNames = new Set(
    requirements.map((r) => (r.countries?.name || '').toLowerCase()).filter(Boolean)
  )

  // Search countries using static list (instant, no API call)
  const handleCountrySearch = (val: string) => {
    setCountrySearch(val)
    setSelectedCountry(null)
    if (!val.trim()) {
      setCountryResults([])
      setShowCountryDropdown(false)
      return
    }
    // Filter out countries already added to this course
    const results = searchCountries(val, 15).filter(
      (c) => !existingCountryNames.has(c.name.toLowerCase())
    )
    setCountryResults(results)
    setShowCountryDropdown(results.length > 0)
  }

  const handleSelectCountry = (c: WorldCountry) => {
    setSelectedCountry({ name: c.name, code: c.code, flag: c.flag })
    setCountrySearch(c.name)
    setCountryResults([])
    setShowCountryDropdown(false)
  }

  const handleAdd = async () => {
    if (!selectedCountry) { showToast('warning', 'No country selected', 'Please search and select a country first.'); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/country-requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ 
          country_name: selectedCountry.name, 
          country_code: selectedCountry.code, 
          country_flag: selectedCountry.flag,
          ...newForm 
        }),
      })
      const json = await res.json()
      if (!res.ok) { showToast('error', 'Failed to save', json.error || 'Unknown error'); return }
      setRequirements((prev) => [...prev, json.data])
      setExpandedIds((prev) => new Set(prev).add(json.data.id))
      setAdding(false)
      setSelectedCountry(null)
      setCountrySearch('')
      setNewForm(EMPTY_FORM)
      showToast('success', 'Added', `Requirements for ${selectedCountry.name} saved.`)
    } catch { showToast('error', 'Error', 'Something went wrong.') }
    finally { setSaving(false) }
  }

  const startEdit = (req: CountryRequirement) => {
    setEditingId(req.id)
    setEditForm({
      academic_requirements: req.academic_requirements || '',
      english_language_requirements: req.english_language_requirements || '',
      other_requirements: req.other_requirements || '',
      document_requirements: req.document_requirements || '',
      additional_notes: req.additional_notes || '',
    })
    setExpandedIds((prev) => new Set(prev).add(req.id))
  }

  const handleUpdate = async (id: number) => {
    setEditSaving(true)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/country-requirements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(editForm),
      })
      const json = await res.json()
      if (!res.ok) { showToast('error', 'Failed to update', json.error || 'Unknown error'); return }
      setRequirements((prev) => prev.map((r) => (r.id === id ? json.data : r)))
      setEditingId(null)
      showToast('success', 'Updated', 'Country requirements updated.')
    } catch { showToast('error', 'Error', 'Something went wrong.') }
    finally { setEditSaving(false) }
  }

  const handleDelete = async (id: number, countryName: string) => {
    if (!confirm(`Remove requirements for ${countryName}? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/country-requirements/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      })
      if (!res.ok) { showToast('error', 'Failed to delete', 'Could not remove requirement.'); return }
      setRequirements((prev) => prev.filter((r) => r.id !== id))
      showToast('success', 'Removed', `Requirements for ${countryName} removed.`)
    } catch { showToast('error', 'Error', 'Something went wrong.') }
    finally { setDeletingId(null) }
  }

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const RequirementFields = ({
    form,
    onChange,
  }: {
    form: RequirementForm
    onChange: (key: keyof RequirementForm, val: string) => void
  }) => (
    <div className="space-y-5 pt-4">
      <div className="space-y-2">
        <Label className="text-sm text-slate-700">Academic Requirements</Label>
        <RichTextEditor
          value={form.academic_requirements}
          onChange={(v) => onChange('academic_requirements', v)}
          placeholder="e.g. Minimum GPA 3.0, A-Levels BBC, or equivalent..."
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm text-slate-700">English Language Requirements</Label>
        <RichTextEditor
          value={form.english_language_requirements}
          onChange={(v) => onChange('english_language_requirements', v)}
          placeholder="e.g. IELTS 6.5 overall, no band below 6.0..."
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm text-slate-700">Other Requirements</Label>
        <RichTextEditor
          value={form.other_requirements}
          onChange={(v) => onChange('other_requirements', v)}
          placeholder="Any additional requirements specific to this country..."
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm text-slate-700">Document Requirements</Label>
        <RichTextEditor
          value={form.document_requirements}
          onChange={(v) => onChange('document_requirements', v)}
          placeholder="Required documents, e.g. transcripts, certificates..."
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm text-slate-700">Additional Notes</Label>
        <RichTextEditor
          value={form.additional_notes}
          onChange={(v) => onChange('additional_notes', v)}
          placeholder="Visa info, local qualification equivalencies, etc..."
        />
      </div>
    </div>
  )

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-teal-600" />
              Country-Specific Requirements
            </CardTitle>
            <CardDescription className="mt-1 text-slate-500">
              Override the global entry requirements for specific countries. Leave fields blank to inherit the global defaults.
            </CardDescription>
          </div>
          {!adding && (
            <Button
              type="button"
              onClick={() => setAdding(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white shrink-0"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Country
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add new form */}
        {adding && (
          <div className="border border-teal-200 bg-teal-50/40 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">Add Country Override</p>
              <Button type="button" variant="ghost" size="sm" onClick={() => { setAdding(false); setCountrySearch(''); setSelectedCountry(null); setNewForm(EMPTY_FORM) }}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Country search */}
            <div className="space-y-1 relative">
              <Label className="text-sm text-slate-700">Country <span className="text-red-500">*</span></Label>
              <div className="relative">
                <input
                  type="text"
                  value={countrySearch}
                  onChange={(e) => handleCountrySearch(e.target.value)}
                  placeholder="Search any country (e.g. Pakistan, India, Nepal...)"
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {selectedCountry && (
                  <Check className="absolute right-3 top-3 h-4 w-4 text-teal-600" />
                )}
              </div>
              {showCountryDropdown && countryResults.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {countryResults.map((c) => (
                    <li
                      key={c.code}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelectCountry(c)}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-slate-50 text-sm text-slate-800"
                    >
                      <span className="text-base">{c.flag}</span>
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <RequirementFields
              form={newForm}
              onChange={(key, val) => setNewForm((prev) => ({ ...prev, [key]: val }))}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => { setAdding(false); setCountrySearch(''); setSelectedCountry(null); setNewForm(EMPTY_FORM) }}>
                Cancel
              </Button>
              <Button type="button" size="sm" disabled={saving || !selectedCountry} onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                Save Requirements
              </Button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-8 text-sm text-slate-400 gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading country requirements...
          </div>
        )}

        {/* Empty state */}
        {!loading && requirements.length === 0 && !adding && (
          <div className="text-center py-10 text-slate-400">
            <Globe className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No country-specific overrides yet.</p>
            <p className="text-xs mt-1">The global entry requirements will apply to all countries by default.</p>
          </div>
        )}

        {/* Requirement rows */}
        {!loading && requirements.map((req) => {
          const isExpanded = expandedIds.has(req.id)
          const isEditing = editingId === req.id

          return (
            <div key={req.id} className="border border-slate-200 rounded-lg overflow-hidden">
              {/* Row header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => !isEditing && toggleExpand(req.id)}
              >
                <div className="flex items-center gap-2">
                  {req.countries?.flag_emoji && (
                    <span className="text-lg">{req.countries.flag_emoji}</span>
                  )}
                  <span className="font-medium text-slate-800 text-sm">{req.countries?.name}</span>
                  {!req.is_active && (
                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-500 rounded-full">Inactive</span>
                  )}
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {!isEditing && (
                    <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-slate-500 hover:text-teal-700" onClick={() => startEdit(req)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-500 hover:text-red-600"
                    disabled={deletingId === req.id}
                    onClick={() => handleDelete(req.id, req.countries?.name)}
                  >
                    {deletingId === req.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-slate-400" onClick={() => toggleExpand(req.id)}>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 bg-white">
                  {isEditing ? (
                    <>
                      <RequirementFields
                        form={editForm}
                        onChange={(key, val) => setEditForm((prev) => ({ ...prev, [key]: val }))}
                      />
                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" size="sm" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                        <Button type="button" size="sm" disabled={editSaving} onClick={() => handleUpdate(req.id)} className="bg-teal-600 hover:bg-teal-700 text-white">
                          {editSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                          Save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4 pt-4">
                      {[
                        { label: 'Academic Requirements', value: req.academic_requirements },
                        { label: 'English Language Requirements', value: req.english_language_requirements },
                        { label: 'Other Requirements', value: req.other_requirements },
                        { label: 'Document Requirements', value: req.document_requirements },
                        { label: 'Additional Notes', value: req.additional_notes },
                      ].map(({ label, value }) =>
                        value ? (
                          <div key={label}>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
                            <div
                              className="text-sm text-slate-700 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: value }}
                            />
                          </div>
                        ) : null
                      )}
                      {!req.academic_requirements && !req.english_language_requirements && !req.other_requirements && !req.document_requirements && !req.additional_notes && (
                        <p className="text-sm text-slate-400 italic">No specific overrides — global defaults apply.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
