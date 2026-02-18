'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

type Country = { id: number; name: string; code: string }

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
  })

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
            rank_world: u.rank_world || '',
            founded_year: u.founded_year?.toString() || '',
            student_population: u.student_population?.toString() || '',
            international_students_percentage: u.international_students_percentage?.toString() || '',
            acceptance_rate: u.acceptance_rate?.toString() || '',
            logo_url: u.logo_url || '',
            cover_image_url: u.cover_image_url || '',
          })
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
      <div className="space-y-6 max-w-4xl">
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
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/universities">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit University</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">University Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">
                Basic Information
              </h3>
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
                  <Label className="text-sm text-slate-700">Type</Label>
                  <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="Public" className="text-slate-900">Public</SelectItem>
                      <SelectItem value="Private" className="text-slate-900">Private</SelectItem>
                      <SelectItem value="Research" className="text-slate-900">Research</SelectItem>
                      <SelectItem value="Liberal Arts" className="text-slate-900">Liberal Arts</SelectItem>
                    </SelectContent>
                  </Select>
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
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Website</Label>
                  <Input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://university.edu"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="info@university.edu"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 1234 567890"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Address</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="University address"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Ranking</Label>
                  <Input
                    value={form.ranking}
                    onChange={(e) => setForm({ ...form, ranking: e.target.value })}
                    placeholder="e.g. QS World Ranking #10"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Established Year</Label>
                  <Input
                    type="number"
                    value={form.established_year}
                    onChange={(e) => setForm({ ...form, established_year: e.target.value })}
                    placeholder="1900"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Student Population</Label>
                  <Input
                    type="number"
                    value={form.student_population}
                    onChange={(e) => setForm({ ...form, student_population: e.target.value })}
                    placeholder="20000"
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
                    placeholder="25.5"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Campus Size</Label>
                  <Input
                    value={form.campus_size}
                    onChange={(e) => setForm({ ...form, campus_size: e.target.value })}
                    placeholder="e.g. 100 acres"
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">Media</h3>
              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Logo URL</Label>
                <Input
                  type="url"
                  value={form.logo_url}
                  onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="bg-white border-slate-200 text-slate-900"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
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
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
