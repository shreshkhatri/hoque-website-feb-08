'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, Upload, Check, ChevronsUpDown, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface Country {
  id: number
  name: string
  code: string
}

interface Campus {
  id?: number
  name: string
  location: string
  description: string
  is_main_campus: boolean
  image_file?: File | null
  image_preview?: string
}

export default function NewUniversityPage() {
  const router = useRouter()
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [newCountryDialog, setNewCountryDialog] = useState(false)
  const [newCountryName, setNewCountryName] = useState('')
  const [newCountryCode, setNewCountryCode] = useState('')
  const [creatingCountry, setCreatingCountry] = useState(false)
  
  const [form, setForm] = useState({
    name: '',
    city: '',
    country_id: '',
    type: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    ranking: '',
    established_year: '',
    student_population: '',
    international_students_percentage: '',
    campus_size: '',
    logo_url: '',
    hero_image_url: '',
  })

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [heroPreview, setHeroPreview] = useState<string>('')
  
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [campusForm, setCampusForm] = useState<Campus>({
    name: '',
    location: '',
    description: '',
    is_main_campus: false,
    image_file: null,
    image_preview: '',
  })

  useEffect(() => {
    fetch('/api/countries')
      .then((r) => r.json())
      .then((data) => {
        setCountries(data.countries || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHeroFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCampusImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCampusForm({
          ...campusForm,
          image_file: file,
          image_preview: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const addCampus = () => {
    if (campusForm.name && campusForm.location) {
      setCampuses([...campuses, { ...campusForm }])
      setCampusForm({
        name: '',
        location: '',
        description: '',
        is_main_campus: false,
        image_file: null,
        image_preview: '',
      })
    }
  }

  const removeCampus = (index: number) => {
    setCampuses(campuses.filter((_, i) => i !== index))
  }

  const handleCreateCountry = async () => {
    if (!newCountryName.trim()) return
    
    setCreatingCountry(true)
    try {
      const res = await fetch('/api/admin/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCountryName.trim(),
          code: newCountryCode.trim() || newCountryName.substring(0, 2).toUpperCase(),
        }),
      })
      
      const data = await res.json()
      if (res.ok && data.country) {
        setCountries([...countries, data.country])
        setForm({ ...form, country_id: String(data.country.id) })
        setNewCountryDialog(false)
        setNewCountryName('')
        setNewCountryCode('')
      }
    } catch (error) {
      console.error('Failed to create country:', error)
    } finally {
      setCreatingCountry(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Note: In production, you would upload files to storage service
      // For now, we'll generate paths based on naming convention
      let logoPath = form.logo_url
      if (logoFile) {
        const logoFilename = `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${logoFile.name.split('.').pop()}`
        logoPath = `/logos/${logoFilename}`
        console.log('[v0] Logo should be saved to public/logos/', logoFilename)
      }

      let heroPath = form.hero_image_url
      if (heroFile) {
        const heroFilename = `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-hero.${heroFile.name.split('.').pop()}`
        heroPath = `/universities/${heroFilename}`
        console.log('[v0] Hero image should be saved to public/universities/', heroFilename)
      }

      const payload: any = {
        name: form.name.trim(),
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        city: form.city.trim(),
        country_id: parseInt(form.country_id),
        type: form.type.trim() || null,
        description: form.description.trim() || null,
        website: form.website.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        address: form.address.trim() || null,
        ranking: form.ranking.trim() || null,
        established_year: form.established_year ? parseInt(form.established_year) : null,
        student_population: form.student_population ? parseInt(form.student_population) : null,
        international_students_percentage: form.international_students_percentage ? parseFloat(form.international_students_percentage) : null,
        campus_size: form.campus_size.trim() || null,
        logo_url: logoPath || null,
        hero_image_url: heroPath || null,
      }

      const res = await fetch('/api/admin/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || 'Failed to create university')

      // Create campuses if any
      if (campuses.length > 0 && data.university?.id) {
        for (let i = 0; i < campuses.length; i++) {
          const campus = campuses[i]
          if (campus.image_file) {
            const campusFilename = `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${campus.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${campus.image_file.name.split('.').pop()}`
            console.log('[v0] Campus image should be saved to public/universities/campuses/', campusFilename)
          }

          await fetch('/api/admin/campuses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              university_id: data.university.id,
              name: campus.name,
              location: campus.location,
              description: campus.description || null,
              is_main_campus: campus.is_main_campus,
            }),
          })
        }
      }

      alert('University created successfully! Note: Please manually upload the images to the public folder at the paths shown in the console.')
      router.push('/admin/universities')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to create university')
    } finally {
      setSaving(false)
    }
  }

  const selectedCountry = countries.find((c) => c.id === parseInt(form.country_id))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New University</h1>
          <p className="text-sm text-slate-600">Fill in the details to add a new university</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">University Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  placeholder="e.g., Public, Private, Research"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Country *</Label>
                <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={countryOpen}
                      className="w-full justify-between bg-white"
                    >
                      {selectedCountry ? selectedCountry.name : 'Select country...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandList>
                        <CommandEmpty>
                          <div className="py-6 text-center text-sm">
                            <p className="text-slate-600">No country found.</p>
                            <Button
                              type="button"
                              variant="link"
                              className="text-teal-600 mt-2"
                              onClick={() => {
                                setCountryOpen(false)
                                setNewCountryDialog(true)
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add new country
                            </Button>
                          </div>
                        </CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              key={country.id}
                              value={country.name}
                              onSelect={() => {
                                setForm({ ...form, country_id: String(country.id) })
                                setCountryOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  form.country_id === String(country.id) ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {country.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => {
                              setCountryOpen(false)
                              setNewCountryDialog(true)
                            }}
                            className="text-teal-600"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add new country
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://..."
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="info@university.edu"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+44 123 456 7890"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ranking">Ranking</Label>
                <Input
                  id="ranking"
                  value={form.ranking}
                  onChange={(e) => setForm({ ...form, ranking: e.target.value })}
                  placeholder="e.g., Top 100 globally"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="established_year">Established Year</Label>
                <Input
                  id="established_year"
                  type="number"
                  value={form.established_year}
                  onChange={(e) => setForm({ ...form, established_year: e.target.value })}
                  placeholder="e.g., 1826"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student_population">Student Population</Label>
                <Input
                  id="student_population"
                  type="number"
                  value={form.student_population}
                  onChange={(e) => setForm({ ...form, student_population: e.target.value })}
                  placeholder="e.g., 15000"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="international_students">International Students %</Label>
                <Input
                  id="international_students"
                  type="number"
                  step="0.1"
                  value={form.international_students_percentage}
                  onChange={(e) => setForm({ ...form, international_students_percentage: e.target.value })}
                  placeholder="e.g., 25.5"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus_size">Campus Size</Label>
                <Input
                  id="campus_size"
                  value={form.campus_size}
                  onChange={(e) => setForm({ ...form, campus_size: e.target.value })}
                  placeholder="e.g., 200 acres"
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle>Media & Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>University Logo</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors bg-white">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="w-full h-32 object-contain mb-2" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8">
                        <Upload className="h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload logo</p>
                        <p className="text-xs text-slate-500">Saved to: /logos/</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hero Background Image</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors bg-white">
                  <input
                    type="file"
                    id="hero-upload"
                    accept="image/*"
                    onChange={handleHeroChange}
                    className="hidden"
                  />
                  <label htmlFor="hero-upload" className="cursor-pointer">
                    {heroPreview ? (
                      <img src={heroPreview} alt="Hero preview" className="w-full h-32 object-cover mb-2 rounded" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8">
                        <ImageIcon className="h-8 w-8 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload hero image</p>
                        <p className="text-xs text-slate-500">Saved to: /universities/</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campuses */}
        <Card>
          <CardHeader>
            <CardTitle>Campuses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <h3 className="font-medium text-slate-900">Add Campus</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Campus Name</Label>
                  <Input
                    value={campusForm.name}
                    onChange={(e) => setCampusForm({ ...campusForm, name: e.target.value })}
                    placeholder="e.g., Main Campus"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={campusForm.location}
                    onChange={(e) => setCampusForm({ ...campusForm, location: e.target.value })}
                    placeholder="e.g., City Center"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={campusForm.description}
                    onChange={(e) => setCampusForm({ ...campusForm, description: e.target.value })}
                    rows={2}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Campus Image</Label>
                  <div className="border border-slate-200 rounded-lg p-2 bg-white">
                    <input
                      type="file"
                      id="campus-upload"
                      accept="image/*"
                      onChange={handleCampusImageChange}
                      className="hidden"
                    />
                    <label htmlFor="campus-upload" className="cursor-pointer block">
                      {campusForm.image_preview ? (
                        <img src={campusForm.image_preview} alt="Campus preview" className="w-full h-20 object-cover rounded" />
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-4 text-slate-500">
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload image</span>
                        </div>
                      )}
                    </label>
                    <p className="text-xs text-slate-500 mt-1">Saved to: /universities/campuses/</p>
                  </div>
                </div>

                <div className="space-y-2 flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={campusForm.is_main_campus}
                      onChange={(e) => setCampusForm({ ...campusForm, is_main_campus: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-slate-700">Main Campus</span>
                  </label>
                </div>
              </div>

              <Button
                type="button"
                onClick={addCampus}
                disabled={!campusForm.name || !campusForm.location}
                className="w-full"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Campus
              </Button>
            </div>

            {campuses.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">Added Campuses ({campuses.length})</h4>
                <div className="space-y-2">
                  {campuses.map((campus, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white">
                      <div className="flex items-center gap-3 flex-1">
                        {campus.image_preview && (
                          <img src={campus.image_preview} alt={campus.name} className="w-12 h-12 object-cover rounded" />
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
                        size="icon"
                        onClick={() => removeCampus(index)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving || !form.name || !form.city || !form.country_id}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {saving ? 'Creating...' : 'Create University'}
          </Button>
        </div>
      </form>

      {/* Add Country Dialog */}
      <Dialog open={newCountryDialog} onOpenChange={setNewCountryDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
            <DialogDescription>
              Create a new country to add to the list.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="country-name">Country Name *</Label>
              <Input
                id="country-name"
                value={newCountryName}
                onChange={(e) => setNewCountryName(e.target.value)}
                placeholder="e.g., United Kingdom"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-code">Country Code</Label>
              <Input
                id="country-code"
                value={newCountryCode}
                onChange={(e) => setNewCountryCode(e.target.value)}
                placeholder="e.g., GB"
                maxLength={2}
                className="bg-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setNewCountryDialog(false)
                setNewCountryName('')
                setNewCountryCode('')
              }}
              disabled={creatingCountry}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCountry}
              disabled={creatingCountry || !newCountryName.trim()}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {creatingCountry ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
