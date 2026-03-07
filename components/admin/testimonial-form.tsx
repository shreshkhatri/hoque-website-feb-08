'use client'

import { useState, useEffect, useRef } from 'react'
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
import { Upload, Loader2, ChevronsUpDown } from 'lucide-react'
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
    // Legacy text fields (before FK migration)
    country?: string
    university?: string
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
  const [formData, setFormData] = useState({
    name: '',
    country_id: null as number | null,
    university_id: null as number | null,
    program: '',
    photo_url: '',
    rating: 5,
    review: '',
    display_at_homepage: false,
    display_order: 0,
    is_active: true,
  })

  const [countries, setCountries] = useState<Country[]>([])

  // University: search-as-you-type, no upfront load
  const [uniResults, setUniResults] = useState<University[]>([])
  const [uniSearching, setUniSearching] = useState(false)
  const [selectedUniName, setSelectedUniName] = useState<string>('')
  const uniDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [photoPreview, setPhotoPreview] = useState<string>('')
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
    // Pre-fill university name so the button shows the correct label immediately
    const universityName = initialData.universities?.name ?? initialData.university ?? ''

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
    if (universityName) setSelectedUniName(universityName)
    if (initialData.photo_url) setPhotoPreview(initialData.photo_url)
  }, [initialData])

  // Fetch countries (small list, fine to load upfront)
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/admin/countries?limit=300')
        const json = await res.json()
        setCountries(Array.isArray(json.data) ? json.data : json)
      } catch (err) {
        console.error('Failed to fetch countries:', err)
      }
    }
    fetchCountries()
  }, [])

  // Search universities on type (debounced 300ms)
  const handleUniSearch = (value: string) => {
    setUniSearch(value)
    if (uniDebounceRef.current) clearTimeout(uniDebounceRef.current)
    if (!value.trim()) {
      setUniResults([])
      return
    }
    uniDebounceRef.current = setTimeout(async () => {
      setUniSearching(true)
      try {
        const res = await fetch(`/api/admin/universities?search=${encodeURIComponent(value.trim())}&limit=20`)
        const json = await res.json()
        setUniResults(Array.isArray(json.data) ? json.data : [])
      } catch (err) {
        console.error('University search failed:', err)
      } finally {
        setUniSearching(false)
      }
    }, 300)
  }

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    setPhotoPreview(preview)

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
    // Include names alongside IDs so the API can keep legacy text fields in sync
    const selectedCountry = countries.find((c) => Number(c.id) === Number(formData.country_id))
    await onSubmit({
      ...formData,
      university_name: selectedUniName,
      country_name: selectedCountry?.name ?? '',
    })
  }

  // Case-insensitive client-side filter for countries (small list)
  const filteredCountries = countries.filter((c) => {
    const search = countrySearch.trim().toLowerCase()
    if (!search) return true
    return c.name.toLowerCase().includes(search)
  })

  const selectedCountry = countries.find((c) => Number(c.id) === Number(formData.country_id))

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

          {/* University - Search-as-you-type */}
          <div>
            <Label htmlFor="university">University *</Label>
            <Popover open={openUni} onOpenChange={(open) => {
              setOpenUni(open)
              if (!open) {
                setUniSearch('')
                setUniResults([])
              }
            }}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal"
                  role="combobox"
                  aria-expanded={openUni}
                >
                  <span className={cn(!selectedUniName && 'text-muted-foreground')}>
                    {selectedUniName || 'Type to search universities...'}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={4}>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search universities..."
                    value={uniSearch}
                    onValueChange={handleUniSearch}
                  />
                  <CommandList className="max-h-60 overflow-y-auto">
                    {uniSearching && (
                      <div className="flex items-center justify-center py-4 text-sm text-muted-foreground gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Searching...
                      </div>
                    )}
                    {!uniSearching && uniSearch.trim() && uniResults.length === 0 && (
                      <CommandEmpty>No university found for &quot;{uniSearch}&quot;</CommandEmpty>
                    )}
                    {!uniSearching && !uniSearch.trim() && (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        Start typing to search universities
                      </div>
                    )}
                    {!uniSearching && uniResults.length > 0 && (
                      <CommandGroup>
                        {uniResults.map((university) => (
                          <CommandItem
                            key={university.id}
                            value={String(university.id)}
                            onSelect={() => {
                              setFormData((prev) => ({ ...prev, university_id: university.id }))
                              setSelectedUniName(university.name)
                              setOpenUni(false)
                              setUniSearch('')
                              setUniResults([])
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
                    )}
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
