'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, X, ImageIcon, User, Building } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

export default function NewTestimonialPage() {
  const router = useRouter()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [form, setForm] = useState({
    name: '',
    country: '',
    university: '',
    program: '',
    rating: '5',
    review: '',
    display_at_homepage: false,
    display_order: '0',
    is_active: true,
  })

  const setField = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Please select a JPEG, PNG, or WebP image.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB.')
      return
    }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      alert('Please select a JPEG, PNG, WebP, or SVG image.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB.')
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const removePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    if (photoInputRef.current) photoInputRef.current.value = ''
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (logoInputRef.current) logoInputRef.current.value = ''
  }

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null
    setUploadingPhoto(true)
    try {
      const formData = new FormData()
      formData.append('file', photoFile)
      formData.append('name', form.name || 'student')
      const res = await fetch('/api/admin/testimonials/upload-photo', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data.url
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      alert(`Failed to upload photo: ${errorMessage}`)
      return null
    } finally {
      setUploadingPhoto(false)
    }
  }

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null
    setUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append('file', logoFile)
      formData.append('university', form.university || 'university')
      const res = await fetch('/api/admin/testimonials/upload-uni-logo', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      return data.url
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      alert(`Failed to upload logo: ${errorMessage}`)
      return null
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.country.trim() || !form.university.trim() || !form.program.trim() || !form.review.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setSaving(true)
    try {
      const photoUrl = await uploadPhoto()
      const logoUrl = await uploadLogo()

      const payload = {
        name: form.name.trim(),
        country: form.country.trim(),
        university: form.university.trim(),
        program: form.program.trim(),
        photo_url: photoUrl || null,
        university_logo_url: logoUrl || null,
        rating: parseInt(form.rating),
        review: form.review.trim(),
        display_at_homepage: form.display_at_homepage,
        display_order: parseInt(form.display_order) || 0,
        is_active: form.is_active,
      }

      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      })

      if (!res.ok) throw new Error('Failed to create testimonial')

      router.push('/admin/testimonials')
    } catch (err) {
      alert('Failed to create testimonial')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="cursor-pointer">
          <Link href="/admin/testimonials">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">Add Testimonial</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Image Uploads */}
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-medium text-slate-900">Images</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Photo */}
                <div className="space-y-3">
                  <Label className="text-sm text-slate-700">Student Photo</Label>
                  {photoPreview ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-100 mx-auto">
                      <Image
                        src={photoPreview}
                        alt="Student photo preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-1 right-1 bg-slate-900/70 hover:bg-slate-900/90 text-white rounded-full p-1 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-teal-400 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-teal-50/30"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-slate-500" />
                        </div>
                        <p className="text-xs text-slate-600">Click to upload student photo</p>
                        <p className="text-xs text-slate-400">JPEG, PNG, WebP. Max 5MB.</p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </div>

                {/* University Logo */}
                <div className="space-y-3">
                  <Label className="text-sm text-slate-700">University Logo</Label>
                  {logoPreview ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 bg-white mx-auto p-2">
                      <Image
                        src={logoPreview}
                        alt="University logo preview"
                        fill
                        className="object-contain"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute top-1 right-1 bg-slate-900/70 hover:bg-slate-900/90 text-white rounded-full p-1 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => logoInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-teal-400 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-teal-50/30"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center">
                          <Building className="h-6 w-6 text-slate-500" />
                        </div>
                        <p className="text-xs text-slate-600">Click to upload university logo</p>
                        <p className="text-xs text-slate-400">JPEG, PNG, WebP, SVG. Max 5MB.</p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                    onChange={handleLogoSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Information */}
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-slate-900">Student Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="bg-white border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={form.country}
                    onChange={(e) => setField('country', e.target.value)}
                    placeholder="e.g. Nepal"
                    className="bg-white border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">
                    University <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={form.university}
                    onChange={(e) => setField('university', e.target.value)}
                    placeholder="e.g. University of Greenwich"
                    className="bg-white border-slate-200 text-slate-900"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">
                    Program <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={form.program}
                    onChange={(e) => setField('program', e.target.value)}
                    placeholder="e.g. MSc Computer Science"
                    className="bg-white border-slate-200 text-slate-900"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review */}
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-slate-900">Testimonial</h2>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">
                  Rating <span className="text-red-500">*</span>
                </Label>
                <Select value={form.rating} onValueChange={(val) => setField('rating', val)}>
                  <SelectTrigger className="bg-white border-slate-200 w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">
                  Review <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={form.review}
                  onChange={(e) => setField('review', e.target.value)}
                  placeholder="Enter the student's testimonial..."
                  className="bg-white border-slate-200 text-slate-900 min-h-[120px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-slate-900">Display Settings</h2>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm text-slate-700">Display at Homepage</Label>
                  <p className="text-xs text-slate-500">Show this testimonial on the homepage carousel</p>
                </div>
                <Switch
                  checked={form.display_at_homepage}
                  onCheckedChange={(checked) => setField('display_at_homepage', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm text-slate-700">Active</Label>
                  <p className="text-xs text-slate-500">Inactive testimonials are hidden from the website</p>
                </div>
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(checked) => setField('is_active', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-700">Display Order</Label>
                <Input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setField('display_order', e.target.value)}
                  placeholder="0"
                  className="bg-white border-slate-200 text-slate-900 w-32"
                />
                <p className="text-xs text-slate-500">Lower numbers appear first</p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              asChild
              className="border-slate-200"
            >
              <Link href="/admin/testimonials">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={saving || uploadingPhoto || uploadingLogo}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {saving ? 'Saving...' : 'Save Testimonial'}
              {!saving && <Save className="h-4 w-4 ml-1.5" />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
