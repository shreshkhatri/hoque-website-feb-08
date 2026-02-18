'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

type Country = { id: number; name: string; code: string }

const highlightIconOptions = ['Award', 'Briefcase', 'Users', 'Globe', 'Star', 'GraduationCap', 'Building2', 'BookOpen']

export default function EditUniversityPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [form, setForm] = useState({
    name: '',
    city: '',
    country_id: '',
    campus_type: '',
    description: '',
    why_study_here: '',
    website_url: '',
    rank_world: '',
    founded_year: '',
    student_population: '',
    international_students_percentage: '',
    acceptance_rate: '',
    logo_url: '',
    cover_image_url: '',
    employment_rate: '',
    nationalities_count: '',
    partner_universities_count: '',
    intakes: '',
    express_offer_available: false as boolean,
  })
  const [campusFacilities, setCampusFacilities] = useState<string[]>([])
  const [newFacility, setNewFacility] = useState('')

  // Highlights, Documents, FAQs
  const [highlights, setHighlights] = useState<{icon: string; title: string; description: string}[]>([])
  const [newHighlight, setNewHighlight] = useState({ icon: 'Award', title: '', description: '' })
  const [requiredDocuments, setRequiredDocuments] = useState<{name: string; description: string}[]>([])
  const [newDocument, setNewDocument] = useState({ name: '', description: '' })
  const [faqs, setFaqs] = useState<{question: string; answer: string}[]>([])
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })

  useEffect(() => {
    Promise.all([
      fetch('/api/countries').then((r) => r.json()),
      fetch(`/api/admin/universities/${id}`).then((r) => r.json()),
    ])
      .then(([countriesData, uniData]) => {
        setCountries(countriesData.countries || [])
        if (uniData.university) {
          const u = uniData.university
          setForm({
            name: u.name || '',
            city: u.city || '',
            country_id: u.country_id?.toString() || '',
            campus_type: u.campus_type || '',
            description: u.description || '',
            why_study_here: u.why_study_here || '',
            website_url: u.website_url || '',
            rank_world: u.rank_world?.toString() || '',
            founded_year: u.founded_year?.toString() || '',
            student_population: u.student_population?.toString() || '',
            international_students_percentage: u.international_students_percentage?.toString() || '',
            acceptance_rate: u.acceptance_rate?.toString() || '',
            logo_url: u.logo_url || '',
            cover_image_url: u.cover_image_url || '',
            employment_rate: u.employment_rate || '',
            nationalities_count: u.nationalities_count?.toString() || '',
            partner_universities_count: u.partner_universities_count?.toString() || '',
            intakes: u.intakes || '',
            express_offer_available: u.express_offer_available || false,
          })
          // Load existing campus facilities
          if (Array.isArray(u.campus_facilities) && u.campus_facilities.length > 0) {
            setCampusFacilities(u.campus_facilities)
          }
          // Load existing highlights, documents, faqs
          if (Array.isArray(u.highlights) && u.highlights.length > 0) {
            setHighlights(u.highlights)
          }
          if (Array.isArray(u.required_documents) && u.required_documents.length > 0) {
            setRequiredDocuments(u.required_documents)
          }
          if (Array.isArray(u.faqs) && u.faqs.length > 0) {
            setFaqs(u.faqs)
          }
        }
      })
      .catch(() => alert('Failed to load university'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload: any = {
        name: form.name.trim(),
        city: form.city.trim(),
        country_id: parseInt(form.country_id),
        campus_type: form.campus_type.trim() || null,
        description: form.description.trim() || null,
        why_study_here: form.why_study_here.trim() || null,
        website_url: form.website_url.trim() || null,
        rank_world: form.rank_world.trim() || null,
        founded_year: form.founded_year ? parseInt(form.founded_year) : null,
        student_population: form.student_population ? parseInt(form.student_population) : null,
        international_students_percentage: form.international_students_percentage ? parseFloat(form.international_students_percentage) : null,
        acceptance_rate: form.acceptance_rate ? parseFloat(form.acceptance_rate) : null,
        logo_url: form.logo_url.trim() || null,
        cover_image_url: form.cover_image_url.trim() || null,
        highlights: highlights.length > 0 ? highlights : null,
        required_documents: requiredDocuments.length > 0 ? requiredDocuments : null,
        faqs: faqs.length > 0 ? faqs : null,
        employment_rate: form.employment_rate.trim() || null,
        nationalities_count: form.nationalities_count ? parseInt(form.nationalities_count) : null,
        partner_universities_count: form.partner_universities_count ? parseInt(form.partner_universities_count) : null,
        intakes: form.intakes.trim() || null,
        campus_facilities: campusFacilities.length > 0 ? campusFacilities : null,
        express_offer_available: form.express_offer_available,
      }

      const res = await fetch(`/api/admin/universities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })

      if (res.ok) {
        router.push('/admin/universities')
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to update university')
      }
    } catch {
      alert('Failed to update university')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <Skeleton className="h-10 w-64 bg-slate-200" />
        <Card className="bg-white border-slate-200">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-10 w-full bg-slate-200" />
            <Skeleton className="h-10 w-full bg-slate-200" />
            <Skeleton className="h-32 w-full bg-slate-200" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/universities">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit University</h1>
          <p className="text-sm text-slate-600">Update the details for this university</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">
                  University Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. University of Oxford"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select required value={form.country_id} onValueChange={(val) => setForm({ ...form, country_id: val })}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
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
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Oxford"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Campus Type</Label>
                <Input
                  value={form.campus_type}
                  onChange={(e) => setForm({ ...form, campus_type: e.target.value })}
                  placeholder="e.g. Urban, Suburban, Rural"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the university..."
                rows={4}
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Why Study Here</Label>
              <Textarea
                value={form.why_study_here}
                onChange={(e) => setForm({ ...form, why_study_here: e.target.value })}
                placeholder="Explain why students should choose this university..."
                rows={4}
                className="bg-white border-slate-200 text-slate-900"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Website URL</Label>
                <Input
                  type="url"
                  value={form.website_url}
                  onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  placeholder="https://university.edu"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Intakes</Label>
                <Input
                  value={form.intakes}
                  onChange={(e) => setForm({ ...form, intakes: e.target.value })}
                  placeholder="e.g. January, May, September"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Employment Rate</Label>
                <Input
                  value={form.employment_rate}
                  onChange={(e) => setForm({ ...form, employment_rate: e.target.value })}
                  placeholder="e.g. 95%"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Number of Nationalities</Label>
                <Input
                  type="number"
                  value={form.nationalities_count}
                  onChange={(e) => setForm({ ...form, nationalities_count: e.target.value })}
                  placeholder="e.g. 130"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Partner Universities Count</Label>
                <Input
                  type="number"
                  value={form.partner_universities_count}
                  onChange={(e) => setForm({ ...form, partner_universities_count: e.target.value })}
                  placeholder="e.g. 200"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="express_offer"
                  checked={form.express_offer_available}
                  onChange={(e) => setForm({ ...form, express_offer_available: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <Label htmlFor="express_offer" className="text-sm text-slate-700 cursor-pointer">
                  Express Offer Available
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">World Ranking</Label>
                <Input
                  value={form.rank_world}
                  onChange={(e) => setForm({ ...form, rank_world: e.target.value })}
                  placeholder="e.g. #101-150"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Founded Year</Label>
                <Input
                  type="number"
                  value={form.founded_year}
                  onChange={(e) => setForm({ ...form, founded_year: e.target.value })}
                  placeholder="e.g. 1826"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Student Population</Label>
                <Input
                  type="number"
                  value={form.student_population}
                  onChange={(e) => setForm({ ...form, student_population: e.target.value })}
                  placeholder="e.g. 15000"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">International Students %</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.international_students_percentage}
                  onChange={(e) => setForm({ ...form, international_students_percentage: e.target.value })}
                  placeholder="e.g. 25"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Acceptance Rate %</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={form.acceptance_rate}
                  onChange={(e) => setForm({ ...form, acceptance_rate: e.target.value })}
                  placeholder="e.g. 15"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Media & Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Logo URL</Label>
                <Input
                  type="url"
                  value={form.logo_url}
                  onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="bg-white border-slate-200 text-slate-900"
                />
                {form.logo_url && (
                  <div className="mt-2 p-2 border border-slate-200 rounded-lg bg-slate-50">
                    <img src={form.logo_url} alt="Logo preview" className="h-16 object-contain mx-auto" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Cover Image URL</Label>
                <Input
                  type="url"
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                  className="bg-white border-slate-200 text-slate-900"
                />
                {form.cover_image_url && (
                  <div className="mt-2 p-2 border border-slate-200 rounded-lg bg-slate-50">
                    <img src={form.cover_image_url} alt="Cover preview" className="h-24 w-full object-cover rounded" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campus Facilities */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Campus Facilities</CardTitle>
            <p className="text-sm text-slate-500">List of facilities available at the campus (e.g. Modern Library, Sports Complex).</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <Input
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                placeholder="e.g. Modern Library"
                className="bg-white flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (newFacility.trim()) {
                      setCampusFacilities([...campusFacilities, newFacility.trim()])
                      setNewFacility('')
                    }
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  if (newFacility.trim()) {
                    setCampusFacilities([...campusFacilities, newFacility.trim()])
                    setNewFacility('')
                  }
                }}
                disabled={!newFacility.trim()}
                variant="outline"
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            {campusFacilities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {campusFacilities.map((facility, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-sm text-slate-700">
                    {facility}
                    <button
                      type="button"
                      onClick={() => setCampusFacilities(campusFacilities.filter((_, i) => i !== index))}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Highlights</CardTitle>
            <p className="text-sm text-slate-500">Key highlights displayed on the university page. Each has an icon, title, and description.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Icon</Label>
                  <select
                    value={newHighlight.icon}
                    onChange={(e) => setNewHighlight({ ...newHighlight, icon: e.target.value })}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"
                  >
                    {highlightIconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Title</Label>
                  <Input
                    value={newHighlight.title}
                    onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                    placeholder="e.g., Career Support"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Description</Label>
                  <Input
                    value={newHighlight.description}
                    onChange={(e) => setNewHighlight({ ...newHighlight, description: e.target.value })}
                    placeholder="e.g., 95% employed within 6 months"
                    className="bg-white"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (newHighlight.title.trim() && newHighlight.description.trim()) {
                    setHighlights([...highlights, { icon: newHighlight.icon, title: newHighlight.title.trim(), description: newHighlight.description.trim() }])
                    setNewHighlight({ icon: 'Award', title: '', description: '' })
                  }
                }}
                disabled={!newHighlight.title.trim() || !newHighlight.description.trim()}
                variant="outline"
                className="w-full cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Highlight
              </Button>
            </div>
            
            {highlights.length > 0 && (
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-200">
                    <span className="text-xs font-mono bg-slate-200 px-2 py-0.5 rounded">{highlight.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{highlight.title}</p>
                      <p className="text-xs text-slate-600 truncate">{highlight.description}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setHighlights(highlights.filter((_, i) => i !== index))}
                      className="h-6 w-6 p-0 text-slate-500 hover:text-red-600 shrink-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Required Documents</CardTitle>
            <p className="text-sm text-slate-500">Documents international students need to submit for application.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Document Name</Label>
                  <Input
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    placeholder="e.g., Passport Copy"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Description</Label>
                  <Input
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    placeholder="e.g., Valid passport with at least 6 months validity"
                    className="bg-white"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (newDocument.name.trim() && newDocument.description.trim()) {
                    setRequiredDocuments([...requiredDocuments, { name: newDocument.name.trim(), description: newDocument.description.trim() }])
                    setNewDocument({ name: '', description: '' })
                  }
                }}
                disabled={!newDocument.name.trim() || !newDocument.description.trim()}
                variant="outline"
                className="w-full cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </div>
            
            {requiredDocuments.length > 0 && (
              <div className="space-y-2">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-600 truncate">{doc.description}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setRequiredDocuments(requiredDocuments.filter((_, i) => i !== index))}
                      className="h-6 w-6 p-0 text-slate-500 hover:text-red-600 shrink-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Frequently Asked Questions</CardTitle>
            <p className="text-sm text-slate-500">Common questions and answers displayed on the university page.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Question</Label>
                  <Input
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    placeholder="e.g., What are the entry requirements?"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-600">Answer</Label>
                  <Textarea
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    placeholder="e.g., Entry requirements vary by program..."
                    rows={3}
                    className="bg-white"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (newFaq.question.trim() && newFaq.answer.trim()) {
                    setFaqs([...faqs, { question: newFaq.question.trim(), answer: newFaq.answer.trim() }])
                    setNewFaq({ question: '', answer: '' })
                  }
                }}
                disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
                variant="outline"
                className="w-full cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>
            
            {faqs.length > 0 && (
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{faq.question}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                      className="h-6 w-6 p-0 text-slate-500 hover:text-red-600 shrink-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-20">
          <Link href="/admin/universities">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 cursor-pointer">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
