'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { useToast } from '@/components/toast-notification'
import { RichTextEditor } from '@/components/rich-text-editor'

type Country = { id: number; name: string; code: string }
type ExistingCampus = { id: number; name: string; location: string; description: string; is_main_campus: boolean }
type NewCampus = { name: string; location: string; description: string; is_main_campus: boolean; image_file?: File | null; image_preview?: string }

const highlightIconOptions = ['Award', 'Briefcase', 'Users', 'Globe', 'Star', 'GraduationCap', 'Building2', 'BookOpen']

export default function EditUniversityPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { showToast } = useToast()
  
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

  // Campuses
  const [existingCampuses, setExistingCampuses] = useState<ExistingCampus[]>([])
  const [newCampuses, setNewCampuses] = useState<NewCampus[]>([])
  const [campusesToDelete, setCampusesToDelete] = useState<number[]>([])
  const [campusForm, setCampusForm] = useState<NewCampus>({ name: '', location: '', description: '', is_main_campus: false, image_file: null, image_preview: '' })

  // File upload state
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [heroPreview, setHeroPreview] = useState<string>('')

  useEffect(() => {
    Promise.all([
      fetch('/api/countries').then((r) => r.json()),
      fetch(`/api/admin/universities/${id}`).then((r) => r.json()),
      fetch(`/api/admin/universities/${id}/campuses`).then((r) => r.json()).catch(() => ({ campuses: [] })),
    ])
      .then(([countriesData, uniData, campusesData]) => {
        setCountries(countriesData.countries || [])
        if (Array.isArray(campusesData.campuses)) {
          setExistingCampuses(campusesData.campuses)
        }
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
      .catch(() => showToast('error', 'Load Failed', 'Failed to load university data.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setLogoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeroFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setHeroPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleCampusImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCampusForm({ ...campusForm, image_file: file, image_preview: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToBlob = async (file: File, endpoint: string, universityName: string, campusName?: string): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('universityName', universityName)
      if (campusName) formData.append('campusName', campusName)
      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data.url
    } catch (err: any) {
      console.error('Upload error:', err)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Upload images to Blob if new files selected
      let logoUrl = form.logo_url
      let coverUrl = form.cover_image_url
      if (logoFile) {
        const url = await uploadToBlob(logoFile, '/api/admin/universities/upload-logo', form.name)
        if (url) logoUrl = url
      }
      if (heroFile) {
        const url = await uploadToBlob(heroFile, '/api/admin/universities/upload-cover', form.name)
        if (url) coverUrl = url
      }

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
        logo_url: logoUrl || null,
        cover_image_url: coverUrl || null,
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
        // Also save campuses
        if (campusesToDelete.length > 0) {
          for (const campusId of campusesToDelete) {
            await fetch(`/api/admin/campuses?id=${campusId}`, { method: 'DELETE', credentials: 'same-origin' })
          }
        }
        for (const campus of newCampuses) {
          let campusCoverUrl: string | null = null
          if (campus.image_file) {
            campusCoverUrl = await uploadToBlob(campus.image_file, '/api/admin/universities/upload-campus-image', form.name, campus.name)
          }
          await fetch('/api/admin/campuses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              university_id: parseInt(id),
              name: campus.name,
              location: campus.location,
              description: campus.description || null,
              is_main_campus: campus.is_main_campus,
              cover_image_url: campusCoverUrl,
            }),
            credentials: 'same-origin',
          })
        }
        router.push('/admin/universities')
      } else {
        const err = await res.json().catch(() => null)
        showToast('error', 'Update Failed', err?.error || 'Failed to update university.')
      }
    } catch (error: any) {
      showToast('error', 'Update Failed', error?.message || 'An unexpected error occurred.')
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
              <RichTextEditor
                value={form.description}
                onChange={(val) => setForm({ ...form, description: val })}
                placeholder="Describe the university..."
                minHeight="160px"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Why Study Here</Label>
              <RichTextEditor
                value={form.why_study_here}
                onChange={(val) => setForm({ ...form, why_study_here: val })}
                placeholder="Explain why students should choose this university..."
                minHeight="160px"
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
                <Label className="text-sm text-slate-700">University Logo</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors bg-white">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    {logoPreview || form.logo_url ? (
                      <img src={logoPreview || form.logo_url} alt="Logo preview" className="w-full h-32 object-contain mb-2" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8">
                        <Upload className="h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload logo</p>
                        <p className="text-xs text-slate-500">PNG, JPG, WEBP, SVG accepted</p>
                      </div>
                    )}
                  </label>
                </div>
                {(logoPreview || form.logo_url) && (
                  <p className="text-xs text-slate-500">{logoFile ? 'New file selected - will upload on save' : 'Current logo'}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Cover Image (Hero Background)</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors bg-white">
                  <input
                    type="file"
                    id="hero-upload"
                    accept="image/*"
                    onChange={handleHeroChange}
                    className="hidden"
                  />
                  <label htmlFor="hero-upload" className="cursor-pointer">
                    {heroPreview || form.cover_image_url ? (
                      <img src={heroPreview || form.cover_image_url} alt="Cover preview" className="w-full h-32 object-cover mb-2 rounded" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8">
                        <ImageIcon className="h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload cover image</p>
                        <p className="text-xs text-slate-500">PNG, JPG, WEBP accepted</p>
                      </div>
                    )}
                  </label>
                </div>
                {(heroPreview || form.cover_image_url) && (
                  <p className="text-xs text-slate-500">{heroFile ? 'New file selected - will upload on save' : 'Current cover image'}</p>
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
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-600">Description</Label>
                <RichTextEditor
                  value={newHighlight.description}
                  onChange={(val) => setNewHighlight({ ...newHighlight, description: val })}
                  placeholder="e.g., 95% employed within 6 months"
                  minHeight="80px"
                />
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
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-600">Description</Label>
                <RichTextEditor
                  value={newDocument.description}
                  onChange={(val) => setNewDocument({ ...newDocument, description: val })}
                  placeholder="e.g., Valid passport with at least 6 months validity"
                  minHeight="80px"
                />
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
                  <RichTextEditor
                    value={newFaq.answer}
                    onChange={(val) => setNewFaq({ ...newFaq, answer: val })}
                    placeholder="e.g., Entry requirements vary by program..."
                    minHeight="100px"
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

        {/* Campuses */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Campuses</CardTitle>
            <p className="text-sm text-slate-500">Manage campus locations for this university.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing campuses */}
            {existingCampuses.filter(c => !campusesToDelete.includes(c.id)).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">
                  Existing Campuses ({existingCampuses.filter(c => !campusesToDelete.includes(c.id)).length})
                </h4>
                <div className="space-y-2">
                  {existingCampuses.filter(c => !campusesToDelete.includes(c.id)).map((campus) => (
                    <div key={campus.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {campus.name}
                          {campus.is_main_campus && (
                            <span className="ml-2 text-xs text-teal-600 font-normal">(Main)</span>
                          )}
                        </p>
                        {campus.location && <p className="text-sm text-slate-600 truncate">{campus.location}</p>}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setCampusesToDelete([...campusesToDelete, campus.id])}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New campuses to add */}
            {newCampuses.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">New Campuses ({newCampuses.length})</h4>
                <div className="space-y-2">
                  {newCampuses.map((campus, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-teal-200 rounded-lg bg-teal-50">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {campus.image_preview && (
                          <img src={campus.image_preview} alt={campus.name} className="w-12 h-12 object-cover rounded shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {campus.name}
                          {campus.is_main_campus && (
                            <span className="ml-2 text-xs text-teal-600 font-normal">(Main)</span>
                          )}
                        </p>
                        <p className="text-sm text-slate-600 truncate">{campus.location}</p>
                      </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setNewCampuses(newCampuses.filter((_, i) => i !== index))}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add campus form */}
            <div className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <h3 className="font-medium text-slate-900 text-sm">Add Campus</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Campus Name</Label>
                  <Input
                    value={campusForm.name}
                    onChange={(e) => setCampusForm({ ...campusForm, name: e.target.value })}
                    placeholder="e.g., Main Campus"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Location</Label>
                  <Input
                    value={campusForm.location}
                    onChange={(e) => setCampusForm({ ...campusForm, location: e.target.value })}
                    placeholder="e.g., City Center"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-xs text-slate-600">Description</Label>
                  <Textarea
                    value={campusForm.description}
                    onChange={(e) => setCampusForm({ ...campusForm, description: e.target.value })}
                    rows={2}
                    className="bg-white"
                    placeholder="Brief description of this campus..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Campus Image</Label>
                  <div className="border border-slate-200 rounded-lg p-2 bg-white">
                    <input
                      type="file"
                      id="campus-upload-edit"
                      accept="image/*"
                      onChange={handleCampusImageChange}
                      className="hidden"
                    />
                    <label htmlFor="campus-upload-edit" className="cursor-pointer block">
                      {campusForm.image_preview ? (
                        <img src={campusForm.image_preview} alt="Campus preview" className="w-full h-20 object-cover rounded" />
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-4 text-slate-500">
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload image</span>
                        </div>
                      )}
                    </label>
                    <p className="text-xs text-slate-500 mt-1">Upload a cover image for this campus</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="campus_main"
                    checked={campusForm.is_main_campus}
                    onChange={(e) => setCampusForm({ ...campusForm, is_main_campus: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <Label htmlFor="campus_main" className="text-sm text-slate-700 cursor-pointer">Main Campus</Label>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (campusForm.name.trim() && campusForm.location.trim()) {
                    setNewCampuses([...newCampuses, { ...campusForm, name: campusForm.name.trim(), location: campusForm.location.trim(), description: campusForm.description.trim() }])
                    setCampusForm({ name: '', location: '', description: '', is_main_campus: false, image_file: null, image_preview: '' })
                  }
                }}
                disabled={!campusForm.name.trim() || !campusForm.location.trim()}
                variant="outline"
                className="w-full cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Campus
              </Button>
            </div>
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
