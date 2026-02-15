'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RichTextEditor } from '@/components/rich-text-editor'
import Link from 'next/link'

export default function NewCountryPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    code: '',
    flag_emoji: '',
    description: '',
    about: '',
    study_life: '',
    opportunities: '',
    cover_image_url: '',
    // Visa & Permits
    student_permit_requirements: '',
    visa_processing_time: '',
    student_visa_eligibility: '',
    student_visa_validity: '',
    post_study_work_visa: '',
    post_study_visa_eligibility: '',
    post_study_visa_validity: '',
    // Work
    work_study_hours: '',
    max_work_hours: '',
    min_wage: '',
    // Living Costs
    currency: 'GBP',
    cost_of_living_monthly: '',
    international_students_count: '',
    // Rankings
    happiness_ranking: '',
    employment_rate: '',
    // Cost Breakdown
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

  const updateForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
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
      const payload: Record<string, any> = {
        name: form.name.trim(),
        code: form.code.trim() || form.name.substring(0, 2).toUpperCase(),
        flag_emoji: form.flag_emoji.trim() || null,
        description: form.description.trim() || null,
        about: form.about.trim() || null,
        study_life: form.study_life.trim() || null,
        opportunities: form.opportunities.trim() || null,
        cover_image_url: form.cover_image_url.trim() || null,
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
      }

      const res = await fetch('/api/admin/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create country')

      router.push('/admin/countries')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/countries">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Add New Country</h2>
          <p className="text-sm text-slate-600">Fill in the details for the new study destination country</p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Country Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder="e.g., United Kingdom"
                  className="bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Country Code</Label>
                <Input
                  value={form.code}
                  onChange={(e) => updateForm('code', e.target.value)}
                  placeholder="e.g., GB"
                  maxLength={5}
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">2-letter ISO code (auto-generated if left blank)</p>
              </div>
              <div className="space-y-2">
                <Label>Flag Emoji</Label>
                <Input
                  value={form.flag_emoji}
                  onChange={(e) => updateForm('flag_emoji', e.target.value)}
                  placeholder="e.g., 🇬🇧"
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">Paste the country flag emoji</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <RichTextEditor
                value={form.description}
                onChange={(val) => updateForm('description', val)}
                placeholder="A brief summary of the country as a study destination (1-2 sentences)"
                minHeight="80px"
              />
            </div>
            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input
                value={form.cover_image_url}
                onChange={(e) => updateForm('cover_image_url', e.target.value)}
                placeholder="https://example.com/country-cover.jpg"
                className="bg-white"
              />
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
                placeholder="Detailed description about the country, its education system, culture, and why it's a great study destination"
                minHeight="180px"
              />
            </div>
            <div className="space-y-2">
              <Label>Study Life</Label>
              <RichTextEditor
                value={form.study_life}
                onChange={(val) => updateForm('study_life', val)}
                placeholder="Describe what student life is like in this country (campus culture, social life, accommodation, etc.)"
                minHeight="180px"
              />
            </div>
            <div className="space-y-2">
              <Label>Opportunities</Label>
              <RichTextEditor
                value={form.opportunities}
                onChange={(val) => updateForm('opportunities', val)}
                placeholder="Describe career and internship opportunities available to international students"
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
                placeholder="List the requirements for obtaining a student visa/permit (e.g., CAS letter, financial proof, English test)"
                minHeight="140px"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Visa Processing Time</Label>
                <Input
                  value={form.visa_processing_time}
                  onChange={(e) => updateForm('visa_processing_time', e.target.value)}
                  placeholder="e.g., 3-4 weeks"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Student Visa Validity</Label>
                <Input
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
                placeholder="Describe who is eligible for a student visa (e.g., accepted to an approved institution, proof of funds)"
                minHeight="100px"
              />
            </div>
            <div className="space-y-2">
              <Label>Post-Study Work Visa</Label>
              <RichTextEditor
                value={form.post_study_work_visa}
                onChange={(val) => updateForm('post_study_work_visa', val)}
                placeholder="Describe the post-study work visa options (e.g., UK Graduate Route - 2 years)"
                minHeight="100px"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Post-Study Visa Eligibility</Label>
                <RichTextEditor
                  value={form.post_study_visa_eligibility}
                  onChange={(val) => updateForm('post_study_visa_eligibility', val)}
                  placeholder="Who is eligible for post-study work visa"
                  minHeight="80px"
                />
              </div>
              <div className="space-y-2">
                <Label>Post-Study Visa Validity</Label>
                <Input
                  value={form.post_study_visa_validity}
                  onChange={(e) => updateForm('post_study_visa_validity', e.target.value)}
                  placeholder="e.g., 2 years (3 years for PhD)"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Work-Study Hours</Label>
                <Input
                  value={form.work_study_hours}
                  onChange={(e) => updateForm('work_study_hours', e.target.value)}
                  placeholder="e.g., 20 hours/week during term"
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">Describe work hours allowed during study</p>
              </div>
              <div className="space-y-2">
                <Label>Max Work Hours (per week)</Label>
                <Input
                  type="number"
                  value={form.max_work_hours}
                  onChange={(e) => updateForm('max_work_hours', e.target.value)}
                  placeholder="e.g., 20"
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">Numeric value for max weekly hours</p>
              </div>
              <div className="space-y-2">
                <Label>Minimum Wage</Label>
                <Input
                  value={form.min_wage}
                  onChange={(e) => updateForm('min_wage', e.target.value)}
                  placeholder="e.g., 11.44/hour"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employment Rate (%)</Label>
                <Input
                  type="number"
                  value={form.employment_rate}
                  onChange={(e) => updateForm('employment_rate', e.target.value)}
                  placeholder="e.g., 75"
                  min="0"
                  max="100"
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">Graduate employment rate percentage</p>
              </div>
              <div className="space-y-2">
                <Label>Happiness Ranking</Label>
                <Input
                  type="number"
                  value={form.happiness_ranking}
                  onChange={(e) => updateForm('happiness_ranking', e.target.value)}
                  placeholder="e.g., 19"
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">World happiness report ranking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost of Living */}
        <Card>
          <CardHeader>
            <CardTitle>Cost of Living</CardTitle>
            <p className="text-sm text-slate-500">All costs in the local currency. Enter min and max ranges for each category (per month).</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Input
                  value={form.currency}
                  onChange={(e) => updateForm('currency', e.target.value)}
                  placeholder="e.g., GBP"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Cost of Living (Monthly)</Label>
                <Input
                  value={form.cost_of_living_monthly}
                  onChange={(e) => updateForm('cost_of_living_monthly', e.target.value)}
                  placeholder="e.g., 1200-1500"
                  className="bg-white"
                />
                <p className="text-xs text-slate-500">Overall monthly cost estimate</p>
              </div>
              <div className="space-y-2">
                <Label>International Students Count</Label>
                <Input
                  value={form.international_students_count}
                  onChange={(e) => updateForm('international_students_count', e.target.value)}
                  placeholder="e.g., 605,000+"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-2">
              <h4 className="text-sm font-medium text-slate-700 mb-3">Monthly Cost Breakdown (min - max in {form.currency || 'currency'})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Accommodation */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                  <Label className="text-xs font-semibold text-slate-700">Accommodation</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={form.cost_accommodation_min}
                      onChange={(e) => updateForm('cost_accommodation_min', e.target.value)}
                      placeholder="Min (e.g., 500)"
                      className="bg-white"
                    />
                    <span className="self-center text-slate-400">-</span>
                    <Input
                      type="number"
                      value={form.cost_accommodation_max}
                      onChange={(e) => updateForm('cost_accommodation_max', e.target.value)}
                      placeholder="Max (e.g., 1200)"
                      className="bg-white"
                    />
                  </div>
                </div>
                {/* Food */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                  <Label className="text-xs font-semibold text-slate-700">Food & Groceries</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={form.cost_food_min}
                      onChange={(e) => updateForm('cost_food_min', e.target.value)}
                      placeholder="Min (e.g., 150)"
                      className="bg-white"
                    />
                    <span className="self-center text-slate-400">-</span>
                    <Input
                      type="number"
                      value={form.cost_food_max}
                      onChange={(e) => updateForm('cost_food_max', e.target.value)}
                      placeholder="Max (e.g., 300)"
                      className="bg-white"
                    />
                  </div>
                </div>
                {/* Transport */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                  <Label className="text-xs font-semibold text-slate-700">Transport</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={form.cost_transport_min}
                      onChange={(e) => updateForm('cost_transport_min', e.target.value)}
                      placeholder="Min (e.g., 50)"
                      className="bg-white"
                    />
                    <span className="self-center text-slate-400">-</span>
                    <Input
                      type="number"
                      value={form.cost_transport_max}
                      onChange={(e) => updateForm('cost_transport_max', e.target.value)}
                      placeholder="Max (e.g., 150)"
                      className="bg-white"
                    />
                  </div>
                </div>
                {/* Utilities */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                  <Label className="text-xs font-semibold text-slate-700">Utilities</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={form.cost_utilities_min}
                      onChange={(e) => updateForm('cost_utilities_min', e.target.value)}
                      placeholder="Min (e.g., 50)"
                      className="bg-white"
                    />
                    <span className="self-center text-slate-400">-</span>
                    <Input
                      type="number"
                      value={form.cost_utilities_max}
                      onChange={(e) => updateForm('cost_utilities_max', e.target.value)}
                      placeholder="Max (e.g., 100)"
                      className="bg-white"
                    />
                  </div>
                </div>
                {/* Health Insurance */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-lg md:col-span-2">
                  <Label className="text-xs font-semibold text-slate-700">Health Insurance</Label>
                  <div className="flex gap-2 max-w-md">
                    <Input
                      type="number"
                      value={form.cost_health_insurance_min}
                      onChange={(e) => updateForm('cost_health_insurance_min', e.target.value)}
                      placeholder="Min (e.g., 0)"
                      className="bg-white"
                    />
                    <span className="self-center text-slate-400">-</span>
                    <Input
                      type="number"
                      value={form.cost_health_insurance_max}
                      onChange={(e) => updateForm('cost_health_insurance_max', e.target.value)}
                      placeholder="Max (e.g., 470)"
                      className="bg-white"
                    />
                  </div>
                  <p className="text-xs text-slate-500">e.g., IHS surcharge per year for UK</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2 pb-8">
          <Link href="/admin/countries">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button
            type="submit"
            disabled={saving || !form.name.trim()}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {saving ? 'Creating...' : 'Create Country'}
          </Button>
        </div>
      </form>
    </div>
  )
}
