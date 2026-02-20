'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Trash2, Plus, GripVertical, ChevronDown, ChevronUp, X, Award, GraduationCap, Briefcase, Users, TrendingUp, Globe, BookOpen, Heart, Star, Lightbulb, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RichTextEditor } from '@/components/rich-text-editor'
import Link from 'next/link'

export default function EditCountryPage() {
  const router = useRouter()
  const params = useParams()
  const countryId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [landmarkFile, setLandmarkFile] = useState<File | null>(null)
  const [landmarkPreview, setLandmarkPreview] = useState<string | null>(null)
  const [uploadingLandmark, setUploadingLandmark] = useState(false)

  // What Sets Apart
  const [whatSetsApart, setWhatSetsApart] = useState<Array<{ id?: number; title: string; description: string; icon: string }>>([])
  const [savingHighlights, setSavingHighlights] = useState(false)

  // FAQs (stored as JSONB in countries table)
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([])
  const [savingFaqs, setSavingFaqs] = useState(false)
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null)

  const [form, setForm] = useState({
    name: '',
    code: '',
    flag_emoji: '',
    description: '',
    about: '',
    study_life: '',
    opportunities: '',
    student_permit_requirements: '',
    visa_processing_time: '',
    student_visa_eligibility: '',
    student_visa_validity: '',
    post_study_work_visa: '',
    post_study_visa_eligibility: '',
    post_study_visa_validity: '',
    work_study_hours: '',
    max_work_hours: '',
    min_wage: '',
    currency: 'GBP',
    cost_of_living_monthly: '',
    international_students_count: '',
    happiness_ranking: '',
    employment_rate: '',
    cost_accommodation_min: '',
    cost_accommodation_max: '',
    cost_food_min: '',
    cost_food_max: '',
    cost_transport_min: '',
    cost_transport_max: '',
    cost_utilities_min: '',
    cost_utilities_max: '',
    cost_health_insurance_min: '',
    cost_health_insurance_max: '',
  })

  useEffect(() => {
    fetchCountry()
    fetchWhatSetsApart()
  }, [countryId])

  const fetchWhatSetsApart = async () => {
    try {
      const res = await fetch(`/api/admin/countries/${countryId}/what-sets-apart`)
      if (!res.ok) return
      const data = await res.json()
      setWhatSetsApart(data.items || [])
    } catch (err) {
      console.error('Failed to fetch highlights:', err)
    }
  }

  const fetchCountry = async () => {
    try {
      const res = await fetch(`/api/admin/countries/${countryId}`)
      if (!res.ok) throw new Error('Failed to fetch country')
      const data = await res.json()
      const country = data.country
      
      setForm({
        name: country.name || '',
        code: country.code || '',
        flag_emoji: country.flag_emoji || '',
        description: country.description || '',
        about: country.about || '',
        study_life: country.study_life || '',
        opportunities: country.opportunities || '',
        student_permit_requirements: country.student_permit_requirements || '',
        visa_processing_time: country.visa_processing_time || '',
        student_visa_eligibility: country.student_visa_eligibility || '',
        student_visa_validity: country.student_visa_validity || '',
        post_study_work_visa: country.post_study_work_visa || '',
        post_study_visa_eligibility: country.post_study_visa_eligibility || '',
        post_study_visa_validity: country.post_study_visa_validity || '',
        work_study_hours: country.work_study_hours || '',
        max_work_hours: country.max_work_hours?.toString() || '',
        min_wage: country.min_wage || '',
        currency: country.currency || 'GBP',
        cost_of_living_monthly: country.cost_of_living_monthly || '',
        international_students_count: country.international_students_count || '',
        happiness_ranking: country.happiness_ranking?.toString() || '',
        employment_rate: country.employment_rate?.toString() || '',
        cost_accommodation_min: country.cost_accommodation_min?.toString() || '',
        cost_accommodation_max: country.cost_accommodation_max?.toString() || '',
        cost_food_min: country.cost_food_min?.toString() || '',
        cost_food_max: country.cost_food_max?.toString() || '',
        cost_transport_min: country.cost_transport_min?.toString() || '',
        cost_transport_max: country.cost_transport_max?.toString() || '',
        cost_utilities_min: country.cost_utilities_min?.toString() || '',
        cost_utilities_max: country.cost_utilities_max?.toString() || '',
        cost_health_insurance_min: country.cost_health_insurance_min?.toString() || '',
        cost_health_insurance_max: country.cost_health_insurance_max?.toString() || '',
      })
      // Load FAQs from country JSONB column
      setFaqs(Array.isArray(country.faqs) ? country.faqs : [])
    } catch (error) {
      console.error('Failed to fetch country:', error)
      setError('Failed to load country details')
    } finally {
      setLoading(false)
    }
  }

  const updateForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleLandmarkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLandmarkFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLandmarkPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadLandmarkImage = async (): Promise<string | null> => {
    if (!landmarkFile || !form.name) return null

    setUploadingLandmark(true)
    try {
      const formData = new FormData()
      formData.append('file', landmarkFile)
      formData.append('countryName', form.name)

      const res = await fetch('/api/admin/countries/upload-landmark', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to upload landmark image')

      return data.url
    } catch (err: any) {
      console.error('Error uploading landmark:', err)
      setError(err.message || 'Failed to upload landmark image')
      return null
    } finally {
      setUploadingLandmark(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Country name is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      // Upload landmark image first if provided
      let landmarkImageUrl = null
      if (landmarkFile) {
        landmarkImageUrl = await uploadLandmarkImage()
      }

      const payload: Record<string, any> = {
        name: form.name.trim(),
        code: form.code.trim() || form.name.substring(0, 2).toUpperCase(),
        flag_emoji: form.flag_emoji.trim() || null,
        description: form.description.trim() || null,
        about: form.about.trim() || null,
        study_life: form.study_life.trim() || null,
        opportunities: form.opportunities.trim() || null,
        student_permit_requirements: form.student_permit_requirements.trim() || null,
        visa_processing_time: form.visa_processing_time.trim() || null,
        student_visa_eligibility: form.student_visa_eligibility.trim() || null,
        student_visa_validity: form.student_visa_validity.trim() || null,
        post_study_work_visa: form.post_study_work_visa.trim() || null,
        post_study_visa_eligibility: form.post_study_visa_eligibility.trim() || null,
        post_study_visa_validity: form.post_study_visa_validity.trim() || null,
        work_study_hours: form.work_study_hours.trim() || null,
        max_work_hours: form.max_work_hours ? parseInt(form.max_work_hours) : 20,
        min_wage: form.min_wage.trim() || null,
        currency: form.currency.trim() || 'USD',
        cost_of_living_monthly: form.cost_of_living_monthly.trim() || null,
        international_students_count: form.international_students_count.trim() || null,
        happiness_ranking: form.happiness_ranking ? parseInt(form.happiness_ranking) : null,
        employment_rate: form.employment_rate ? parseInt(form.employment_rate) : null,
        cost_accommodation_min: form.cost_accommodation_min ? parseInt(form.cost_accommodation_min) : null,
        cost_accommodation_max: form.cost_accommodation_max ? parseInt(form.cost_accommodation_max) : null,
        cost_food_min: form.cost_food_min ? parseInt(form.cost_food_min) : null,
        cost_food_max: form.cost_food_max ? parseInt(form.cost_food_max) : null,
        cost_transport_min: form.cost_transport_min ? parseInt(form.cost_transport_min) : null,
        cost_transport_max: form.cost_transport_max ? parseInt(form.cost_transport_max) : null,
        cost_utilities_min: form.cost_utilities_min ? parseInt(form.cost_utilities_min) : null,
        cost_utilities_max: form.cost_utilities_max ? parseInt(form.cost_utilities_max) : null,
        cost_health_insurance_min: form.cost_health_insurance_min ? parseInt(form.cost_health_insurance_min) : null,
        cost_health_insurance_max: form.cost_health_insurance_max ? parseInt(form.cost_health_insurance_max) : null,
        landmark_image_url: landmarkImageUrl,
        faqs: faqs,
      }

      const res = await fetch(`/api/admin/countries/${countryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to update country')

      router.push('/admin/countries')
    } catch (error) {
      console.error('Failed to update country:', error)
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  // Icon options for What Sets Apart
  const iconOptions = [
    { value: 'graduation-cap', label: 'Education', Icon: GraduationCap },
    { value: 'briefcase', label: 'Career', Icon: Briefcase },
    { value: 'users', label: 'Community', Icon: Users },
    { value: 'trending-up', label: 'Growth', Icon: TrendingUp },
    { value: 'award', label: 'Award', Icon: Award },
    { value: 'globe', label: 'Global', Icon: Globe },
    { value: 'book-open', label: 'Learning', Icon: BookOpen },
    { value: 'heart', label: 'Wellbeing', Icon: Heart },
    { value: 'star', label: 'Excellence', Icon: Star },
    { value: 'lightbulb', label: 'Innovation', Icon: Lightbulb },
    { value: 'shield', label: 'Safety', Icon: Shield },
  ]

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find(opt => opt.value === iconName)
    return found ? found.Icon : Award
  }

  // What Sets Apart handlers
  const addHighlight = () => {
    setWhatSetsApart([...whatSetsApart, { title: '', description: '', icon: 'award' }])
  }

  const updateHighlight = (index: number, field: string, value: string) => {
    const updated = [...whatSetsApart]
    updated[index] = { ...updated[index], [field]: value }
    setWhatSetsApart(updated)
  }

  const removeHighlight = (index: number) => {
    setWhatSetsApart(whatSetsApart.filter((_, i) => i !== index))
  }

  const moveHighlight = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= whatSetsApart.length) return
    const updated = [...whatSetsApart]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setWhatSetsApart(updated)
  }

  const saveHighlights = async () => {
    setSavingHighlights(true)
    try {
      const res = await fetch(`/api/admin/countries/${countryId}/what-sets-apart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: whatSetsApart }),
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      setWhatSetsApart(data.items || [])
    } catch (err) {
      setError('Failed to save highlights')
    } finally {
      setSavingHighlights(false)
    }
  }

  // FAQ handlers
  const addFaq = () => {
    const newIndex = faqs.length
    setFaqs([...faqs, { question: '', answer: '' }])
    setExpandedFaqIndex(newIndex)
  }

  const updateFaq = (index: number, field: string, value: string) => {
    const updated = [...faqs]
    updated[index] = { ...updated[index], [field]: value }
    setFaqs(updated)
  }

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
    setExpandedFaqIndex(null)
  }

  const moveFaq = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= faqs.length) return
    const updated = [...faqs]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setFaqs(updated)
    setExpandedFaqIndex(newIndex)
  }

  const saveFaqs = async () => {
    setSavingFaqs(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/countries/${countryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, faqs }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to save')
      }
      const data = await res.json()
      setFaqs(Array.isArray(data.country?.faqs) ? data.country.faqs : [])
    } catch (err) {
      setError('Failed to save FAQs')
    } finally {
      setSavingFaqs(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this country? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/countries/${countryId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete country')

      router.push('/admin/countries')
    } catch (error) {
      console.error('Failed to delete country:', error)
      setError('Failed to delete country')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-teal-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/countries">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Edit Country</h2>
            <p className="text-sm text-slate-600 mt-1">Update country information and settings</p>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Country Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder="e.g., United Kingdom"
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Country Code *</Label>
                <Input
                  id="code"
                  value={form.code}
                  onChange={(e) => updateForm('code', e.target.value)}
                  placeholder="e.g., GB"
                  maxLength={2}
                  className="bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flag_emoji">Flag Emoji</Label>
                <Input
                  id="flag_emoji"
                  value={form.flag_emoji}
                  onChange={(e) => updateForm('flag_emoji', e.target.value)}
                  placeholder="🇬🇧"
                  maxLength={4}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency Code</Label>
                <Input
                  id="currency"
                  value={form.currency}
                  onChange={(e) => updateForm('currency', e.target.value)}
                  placeholder="e.g., GBP, USD, EUR"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <RichTextEditor
                value={form.description}
                onChange={(val) => updateForm('description', val)}
                placeholder="Brief description shown in country cards"
                minHeight="80px"
              />
            </div>
            <div className="space-y-2">
              <Label>Landmark Image</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleLandmarkFileChange}
                  className="bg-white cursor-pointer"
                />
                <p className="text-xs text-slate-500">
                  Upload a landmark image for this country. It will be saved as {form.name ? `${form.name.toLowerCase().replace(/\s+/g, '-')}-landmark.jpg` : 'country-name-landmark.jpg'}
                </p>
                {landmarkPreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={landmarkPreview}
                      alt="Landmark preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About & Study Life */}
        <Card>
          <CardHeader>
            <CardTitle>About & Study Life</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>About the Country</Label>
              <RichTextEditor
                value={form.about}
                onChange={(val) => updateForm('about', val)}
                placeholder="General information about the country..."
                minHeight="180px"
              />
            </div>
            <div className="space-y-2">
              <Label>Study Life</Label>
              <RichTextEditor
                value={form.study_life}
                onChange={(val) => updateForm('study_life', val)}
                placeholder="Information about student life and studying experience..."
                minHeight="180px"
              />
            </div>
            <div className="space-y-2">
              <Label>Career Opportunities</Label>
              <RichTextEditor
                value={form.opportunities}
                onChange={(val) => updateForm('opportunities', val)}
                placeholder="Post-study career opportunities and prospects..."
                minHeight="180px"
              />
            </div>
          </CardContent>
        </Card>

        {/* Visa & Permits */}
        <Card>
          <CardHeader>
            <CardTitle>Visa & Permits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Student Permit Requirements</Label>
              <RichTextEditor
                value={form.student_permit_requirements}
                onChange={(val) => updateForm('student_permit_requirements', val)}
                placeholder="Requirements for obtaining a student permit..."
                minHeight="140px"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visa_processing_time">Visa Processing Time</Label>
                <Input
                  id="visa_processing_time"
                  value={form.visa_processing_time}
                  onChange={(e) => updateForm('visa_processing_time', e.target.value)}
                  placeholder="e.g., 3-4 weeks"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_visa_validity">Student Visa Validity</Label>
                <Input
                  id="student_visa_validity"
                  value={form.student_visa_validity}
                  onChange={(e) => updateForm('student_visa_validity', e.target.value)}
                  placeholder="e.g., Duration of course + 4 months"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Student Visa Eligibility</Label>
              <RichTextEditor
                value={form.student_visa_eligibility}
                onChange={(val) => updateForm('student_visa_eligibility', val)}
                placeholder="Who is eligible for a student visa..."
                minHeight="100px"
              />
            </div>
            <div className="space-y-2">
              <Label>Post-Study Work Visa</Label>
              <RichTextEditor
                value={form.post_study_work_visa}
                onChange={(val) => updateForm('post_study_work_visa', val)}
                placeholder="Information about post-study work visa options..."
                minHeight="140px"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="post_study_visa_eligibility">Post-Study Visa Eligibility</Label>
                <Input
                  id="post_study_visa_eligibility"
                  value={form.post_study_visa_eligibility}
                  onChange={(e) => updateForm('post_study_visa_eligibility', e.target.value)}
                  placeholder="e.g., Bachelor/Master degree holders"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post_study_visa_validity">Post-Study Visa Validity</Label>
                <Input
                  id="post_study_visa_validity"
                  value={form.post_study_visa_validity}
                  onChange={(e) => updateForm('post_study_visa_validity', e.target.value)}
                  placeholder="e.g., 2 years"
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work & Employment */}
        <Card>
          <CardHeader>
            <CardTitle>Work & Employment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="work_study_hours">Work While Studying</Label>
              <Input
                id="work_study_hours"
                value={form.work_study_hours}
                onChange={(e) => updateForm('work_study_hours', e.target.value)}
                placeholder="e.g., Up to 20 hours/week during term"
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_work_hours">Max Work Hours/Week</Label>
                <Input
                  id="max_work_hours"
                  type="number"
                  value={form.max_work_hours}
                  onChange={(e) => updateForm('max_work_hours', e.target.value)}
                  placeholder="20"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min_wage">Minimum Wage</Label>
                <Input
                  id="min_wage"
                  value={form.min_wage}
                  onChange={(e) => updateForm('min_wage', e.target.value)}
                  placeholder="e.g., £11.44/hour"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employment_rate">Employment Rate (%)</Label>
                <Input
                  id="employment_rate"
                  type="number"
                  value={form.employment_rate}
                  onChange={(e) => updateForm('employment_rate', e.target.value)}
                  placeholder="85"
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost of Living */}
        <Card>
          <CardHeader>
            <CardTitle>Cost of Living</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost_of_living_monthly">Monthly Living Cost</Label>
                <Input
                  id="cost_of_living_monthly"
                  value={form.cost_of_living_monthly}
                  onChange={(e) => updateForm('cost_of_living_monthly', e.target.value)}
                  placeholder="e.g., £1,200-£1,800"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="international_students_count">International Students</Label>
                <Input
                  id="international_students_count"
                  value={form.international_students_count}
                  onChange={(e) => updateForm('international_students_count', e.target.value)}
                  placeholder="e.g., 500,000+"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="happiness_ranking">Happiness Ranking</Label>
                <Input
                  id="happiness_ranking"
                  type="number"
                  value={form.happiness_ranking}
                  onChange={(e) => updateForm('happiness_ranking', e.target.value)}
                  placeholder="15"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-sm font-medium text-slate-700">Cost Breakdown (Monthly)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost_accommodation_min">Accommodation Min</Label>
                  <Input
                    id="cost_accommodation_min"
                    type="number"
                    value={form.cost_accommodation_min}
                    onChange={(e) => updateForm('cost_accommodation_min', e.target.value)}
                    placeholder="600"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_accommodation_max">Accommodation Max</Label>
                  <Input
                    id="cost_accommodation_max"
                    type="number"
                    value={form.cost_accommodation_max}
                    onChange={(e) => updateForm('cost_accommodation_max', e.target.value)}
                    placeholder="1200"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_food_min">Food Min</Label>
                  <Input
                    id="cost_food_min"
                    type="number"
                    value={form.cost_food_min}
                    onChange={(e) => updateForm('cost_food_min', e.target.value)}
                    placeholder="200"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_food_max">Food Max</Label>
                  <Input
                    id="cost_food_max"
                    type="number"
                    value={form.cost_food_max}
                    onChange={(e) => updateForm('cost_food_max', e.target.value)}
                    placeholder="400"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_transport_min">Transport Min</Label>
                  <Input
                    id="cost_transport_min"
                    type="number"
                    value={form.cost_transport_min}
                    onChange={(e) => updateForm('cost_transport_min', e.target.value)}
                    placeholder="50"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_transport_max">Transport Max</Label>
                  <Input
                    id="cost_transport_max"
                    type="number"
                    value={form.cost_transport_max}
                    onChange={(e) => updateForm('cost_transport_max', e.target.value)}
                    placeholder="150"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_utilities_min">Utilities Min</Label>
                  <Input
                    id="cost_utilities_min"
                    type="number"
                    value={form.cost_utilities_min}
                    onChange={(e) => updateForm('cost_utilities_min', e.target.value)}
                    placeholder="50"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_utilities_max">Utilities Max</Label>
                  <Input
                    id="cost_utilities_max"
                    type="number"
                    value={form.cost_utilities_max}
                    onChange={(e) => updateForm('cost_utilities_max', e.target.value)}
                    placeholder="100"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_health_insurance_min">Health Insurance Min</Label>
                  <Input
                    id="cost_health_insurance_min"
                    type="number"
                    value={form.cost_health_insurance_min}
                    onChange={(e) => updateForm('cost_health_insurance_min', e.target.value)}
                    placeholder="40"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost_health_insurance_max">Health Insurance Max</Label>
                  <Input
                    id="cost_health_insurance_max"
                    type="number"
                    value={form.cost_health_insurance_max}
                    onChange={(e) => updateForm('cost_health_insurance_max', e.target.value)}
                    placeholder="80"
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/countries">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* What Sets Apart - managed independently */}
      <Card className="border-2 border-dashed border-teal-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-teal-600" />
              {`What Sets ${form.name || 'This Country'} Apart`}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">Highlight cards shown on the country page overview tab</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={addHighlight} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Highlight
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={saveHighlights}
              disabled={savingHighlights}
              className="bg-teal-600 hover:bg-teal-700 gap-1.5"
            >
              {savingHighlights ? 'Saving...' : 'Save Highlights'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {whatSetsApart.length === 0 ? (
            <div className="text-center py-8 text-slate-400 border border-dashed rounded-lg">
              <Star className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No highlights yet. Add one to showcase what makes this country special.</p>
            </div>
          ) : (
            whatSetsApart.map((item, index) => {
              const IconComp = getIconComponent(item.icon)
              return (
                <div key={index} className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button type="button" onClick={() => moveHighlight(index, 'up')} disabled={index === 0} className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30" aria-label="Move up">
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <GripVertical className="h-4 w-4 text-slate-300" />
                      <button type="button" onClick={() => moveHighlight(index, 'down')} disabled={index === whatSetsApart.length - 1} className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30" aria-label="Move down">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-50 rounded-lg">
                          <IconComp className="h-5 w-5 text-teal-600" />
                        </div>
                        <Input
                          value={item.title}
                          onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                          placeholder="Highlight title (e.g., World-Class Education)"
                          className="bg-white font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-slate-500 shrink-0">Icon:</Label>
                        <div className="flex flex-wrap gap-1">
                          {iconOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => updateHighlight(index, 'icon', opt.value)}
                              className={`p-1.5 rounded-md transition-colors ${item.icon === opt.value ? 'bg-teal-100 text-teal-700 ring-1 ring-teal-300' : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                              title={opt.label}
                            >
                              <opt.Icon className="h-4 w-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                        placeholder="Brief description of this highlight..."
                        rows={2}
                        className="bg-white text-sm"
                      />
                    </div>
                    <button type="button" onClick={() => removeHighlight(index)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" aria-label="Remove highlight">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      {/* FAQs - managed independently */}
      <Card className="border-2 border-dashed border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">FAQ accordion shown on the country page FAQs tab</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={addFaq} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add FAQ
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={saveFaqs}
              disabled={savingFaqs}
              className="bg-blue-600 hover:bg-blue-700 gap-1.5"
            >
              {savingFaqs ? 'Saving...' : 'Save FAQs'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqs.length === 0 ? (
            <div className="text-center py-8 text-slate-400 border border-dashed rounded-lg">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No FAQs yet. Add common questions prospective students might ask.</p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                <div className="flex items-center gap-2 p-3">
                  <div className="flex flex-col items-center gap-0.5">
                    <button type="button" onClick={() => moveFaq(index, 'up')} disabled={index === 0} className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30" aria-label="Move up">
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={() => moveFaq(index, 'down')} disabled={index === faqs.length - 1} className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30" aria-label="Move down">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-xs font-medium text-slate-400 w-6 text-center">{`Q${index + 1}`}</span>
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                    className="flex-1 text-left font-medium text-sm text-slate-700 truncate hover:text-slate-900"
                  >
                    {faq.question || 'Click to expand and enter question...'}
                  </button>
                  <button type="button" onClick={() => removeFaq(index)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0" aria-label="Remove FAQ">
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedFaqIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {expandedFaqIndex === index && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-500">Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        placeholder="e.g., How much study gap is acceptable?"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-500">Answer</Label>
                      <RichTextEditor
                        value={faq.answer}
                        onChange={(val) => updateFaq(index, 'answer', val)}
                        placeholder="Detailed answer to the question..."
                        minHeight="100px"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
