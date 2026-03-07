'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface TestimonialFormProps {
  initialData?: {
    id: string
    name: string
    country_id: number
    university_id: number
    program: string
    photo_url: string | null
    rating: number
    review: string
    display_at_homepage: boolean
    display_order: number
    is_active: boolean
    universities?: { id: number; name: string; logo_url: string }
    countries?: { id: number; name: string }
  }
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

interface Country {
  id: number
  name: string
}

interface University {
  id: number
  name: string
  logo_url: string
}

export function TestimonialForm({ initialData, onSubmit, isLoading }: TestimonialFormProps) {
  // Extract IDs from initialData - handle both direct IDs and nested objects
  const getInitialCountryId = () => {
    if (initialData?.country_id) return initialData.country_id
    if (initialData?.countries?.id) return initialData.countries.id
    return null
  }
  
  const getInitialUniversityId = () => {
    if (initialData?.university_id) return initialData.university_id
    if (initialData?.universities?.id) return initialData.universities.id
    return null
  }

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    country_id: getInitialCountryId(),
    university_id: getInitialUniversityId(),
    program: initialData?.program || '',
    photo_url: initialData?.photo_url || '',
    rating: initialData?.rating || 5,
    review: initialData?.review || '',
    display_at_homepage: initialData?.display_at_homepage ?? false,
    display_order: initialData?.display_order ?? 0,
    is_active: initialData?.is_active ?? true,
  })

  const [countries, setCountries] = useState<Country[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>(initialData?.photo_url || '')
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [openCountry, setOpenCountry] = useState(false)
  const [openUni, setOpenUni] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [uniSearch, setUniSearch] = useState('')

  // Re-sync form when initialData arrives (edit page fetches async)
  useEffect(() => {
    if (!initialData) return
    
    const countryId = initialData.country_id ?? initialData.countries?.id ?? null
    const universityId = initialData.university_id ?? initialData.universities?.id ?? null
    
    console.log('[v0] InitialData received:', {
      name: initialData.name,
      country_id: initialData.country_id,
      countries: initialData.countries,
      university_id: initialData.university_id,
      universities: initialData.universities,
      resolvedCountryId: countryId,
      resolvedUniversityId: universityId,
    })
    
    setFormData({
      name: initialData.name || '',
      country_id: countryId,
      university_id: universityId,
      program: initialData.program || '',
      photo_url: initialData.photo_url || '',
      rating: initialData.rating || 5,
      review: initialData.review || '',
      display_at_homepage: initialData.display_at_homepage ?? false,
      display_order: initialData.display_order ?? 0,
      is_active: initialData.is_active ?? true,
    })
    if (initialData.photo_url) setPhotoPreview(initialData.photo_url)
  }, [initialData])

  // Fetch countries
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/admin/countries')
        const json = await res.json()
        setCountries(Array.isArray(json.data) ? json.data : json)
      } catch (err) {
        console.error('Failed to fetch countries:', err)
      }
    }
    fetchCountries()
  }, [])

  // Fetch universities
  useEffect(() => {
    async function fetchUniversities() {
      try {
        const res = await fetch('/api/admin/universities')
        const json = await res.json()
        const unis = Array.isArray(json.data) ? json.data : json
        console.log('[v0] Loaded universities:', unis.length, 'Looking for ID:', formData.university_id)
        setUniversities(unis)
      } catch (err) {
        console.error('Failed to fetch universities:', err)
      }
    }
    fetchUniversities()
  }, [])

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPhotoFile(file)
    const preview = URL.createObjectURL(file)
    setPhotoPreview(preview)

    // Upload photo
    setUploadingPhoto(true)
    try {
      const formDataForUpload = new FormData()
      formDataForUpload.append('file', file)
      formDataForUpload.append('name', formData.name || 'student')

      const res = await fetch('/api/admin/testimonials/upload-photo', {
        method: 'POST',
        body: formDataForUpload,
      })

      if (res.ok) {
        const { url } = await res.json()
        setFormData((prev) => ({ ...prev, photo_url: url }))
      }
    } catch (err) {
      console.error('Photo upload failed:', err)
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.country_id || !formData.university_id || !formData.review) {
      alert('Please fill all required fields')
      return
    }
    await onSubmit(formData)
  }

  // Case-insensitive search with trimming
  const filteredCountries = countries.filter((c) => {
    const search = countrySearch.trim().toLowerCase()
    if (!search) return true
    return c.name.toLowerCase().includes(search)
  })

  const filteredUniversities = universities.filter((u) => {
    const search = uniSearch.trim().toLowerCase()
    if (!search) return true
    return u.name.toLowerCase().includes(search)
  })

  // Use Number() to ensure type-safe comparison (IDs might come as strings from API)
  const selectedCountry = countries.find((c) => Number(c.id) === Number(formData.country_id))
  const selectedUni = universities.find((u) => Number(u.id) === Number(formData.university_id))

  // Debug: log when form data changes
  useEffect(() => {
    console.log('[v0] Form university_id:', formData.university_id, 'selectedUni:', selectedUni, 'universities count:', universities.length)
  }, [formData.university_id, selectedUni, universities.length])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Basic details about the student</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Student Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Priya Sharma"
              required
            />
          </div>

          {/* Country - Searchable Dropdown */}
          <div>
            <Label htmlFor="country">Country of Origin *</Label>
            <Popover open={openCountry} onOpenChange={setOpenCountry}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  role="combobox"
                  aria-expanded={openCountry}
                >
                  {selectedCountry?.name || 'Select country...'}
                  <Check className="ml-2 h-4 w-4 opacity-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={4}>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search countries..."
                    value={countrySearch}
                    onValueChange={setCountrySearch}
                  />
                  <CommandList className="max-h-60 overflow-y-auto">
                    <CommandEmpty>No country found</CommandEmpty>
                    <CommandGroup>
                      {filteredCountries.map((country) => (
                        <CommandItem
                          key={country.id}
                          value={String(country.id)}
                          onSelect={() => {
                            setFormData((prev) => ({ ...prev, country_id: country.id }))
                            setOpenCountry(false)
                            setCountrySearch('')
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              Number(formData.country_id) === Number(country.id) ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {country.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* University - Searchable Dropdown */}
          <div>
            <Label htmlFor="university">University *</Label>
            <Popover open={openUni} onOpenChange={setOpenUni}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  role="combobox"
                  aria-expanded={openUni}
                >
                  {selectedUni?.name || 'Select university...'}
                  <Check className="ml-2 h-4 w-4 opacity-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={4}>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search universities..."
                    value={uniSearch}
                    onValueChange={setUniSearch}
                  />
                  <CommandList className="max-h-60 overflow-y-auto">
                    <CommandEmpty>No university found</CommandEmpty>
                    <CommandGroup>
                      {filteredUniversities.map((university) => (
                        <CommandItem
                          key={university.id}
                          value={String(university.id)}
                          onSelect={() => {
                            setFormData((prev) => ({ ...prev, university_id: university.id }))
                            setOpenUni(false)
                            setUniSearch('')
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              Number(formData.university_id) === Number(university.id) ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {university.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Program */}
          <div>
            <Label htmlFor="program">Program of Study</Label>
            <Input
              id="program"
              value={formData.program}
              onChange={(e) => setFormData((prev) => ({ ...prev, program: e.target.value }))}
              placeholder="e.g., MSc Computer Science"
            />
          </div>

          {/* Rating */}
          <div>
            <Label htmlFor="rating">Rating (out of 5)</Label>
            <Select
              value={String(formData.rating)}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, rating: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} / 5
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Student Photo</CardTitle>
          <CardDescription>Upload a professional photo of the student</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {photoPreview && (
            <div className="relative w-40 h-40">
              <Image
                src={photoPreview}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={uploadingPhoto}
              className="hidden"
              id="photo-input"
            />
            <label htmlFor="photo-input">
              <Button type="button" variant="outline" disabled={uploadingPhoto} asChild>
                <span>
                  {uploadingPhoto ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </>
                  )}
                </span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Review */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Review</CardTitle>
          <CardDescription>The student's feedback about HOQUE services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="review">Review *</Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))}
              placeholder="Share the student's feedback..."
              rows={5}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Control where and how this testimonial appears</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="display-homepage"
              checked={formData.display_at_homepage}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, display_at_homepage: checked as boolean }))
              }
            />
            <Label htmlFor="display-homepage" className="font-normal cursor-pointer">
              Display on Homepage
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, is_active: checked as boolean }))
              }
            />
            <Label htmlFor="is-active" className="font-normal cursor-pointer">
              Active
            </Label>
          </div>

          <div>
            <Label htmlFor="display-order">Display Order</Label>
            <Input
              id="display-order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))
              }
              min="0"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Testimonial'
        )}
      </Button>
    </form>
  )
}
