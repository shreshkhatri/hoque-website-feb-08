'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Award,
  MapPin,
  GraduationCap,
  Users,
  X,
  Save,
  Globe,
  Building2,
  Calendar,
  Eye,
  EyeOff,
  ChevronsUpDown,
  Check,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RichTextEditor } from '@/components/rich-text-editor'

interface Country {
  id: number
  name: string
}

interface Scholarship {
  id: number
  name: string
  slug: string
  country: string       // flattened from join
  country_id: number
  funding_body: string | null
  funding_amount: string | null
  program_level: string | null
  eligibility_type: string | null
  eligibility_details: string | null
  description: string | null
  full_description: string | null
  how_to_apply: string | null
  application_period: string | null
  official_url: string | null
  is_active: boolean
  created_at: string
}

const emptyScholarship: Partial<Scholarship> = {
  name: '',
  country_id: undefined,
  funding_body: '',
  funding_amount: '',
  program_level: '',
  eligibility_type: 'International',
  eligibility_details: '',
  description: '',
  full_description: '',
  how_to_apply: '',
  application_period: '',
  official_url: '',
  is_active: true,
}

function CountryCombobox({
  countries,
  value,
  onChange,
  placeholder = 'Select country',
}: {
  countries: Country[]
  value: number | undefined
  onChange: (id: number) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const selected = countries.find((c) => c.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={selected ? 'text-slate-900' : 'text-slate-400'}>
            {selected ? selected.name : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 bg-white border-slate-200" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={() => {
                    onChange(c.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${value === c.id ? 'opacity-100 text-teal-600' : 'opacity-0'}`}
                  />
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function FilterCountryCombobox({
  countries,
  value,
  onChange,
}: {
  countries: Country[]
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selectedLabel = value === 'all'
    ? 'All Countries'
    : countries.find((c) => String(c.id) === value)?.name ?? 'Filter by country'

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className="flex h-9 w-full sm:w-52 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <span className={value === 'all' ? 'text-slate-500' : 'text-slate-900'}>{selectedLabel}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 bg-white border-slate-200" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="all" onSelect={() => { onChange('all'); setOpen(false) }}>
                <Check className={`mr-2 h-4 w-4 ${value === 'all' ? 'opacity-100 text-teal-600' : 'opacity-0'}`} />
                All Countries
              </CommandItem>
              {countries.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={() => { onChange(String(c.id)); setOpen(false) }}
                >
                  <Check className={`mr-2 h-4 w-4 ${String(c.id) === value ? 'opacity-100 text-teal-600' : 'opacity-0'}`} />
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function ScholarshipsAdminPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [availableCountries, setAvailableCountries] = useState<Country[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingScholarship, setEditingScholarship] = useState<Partial<Scholarship>>(emptyScholarship)
  const [formError, setFormError] = useState('')
  const limit = 12

  // Fetch countries from DB for dropdown
  useEffect(() => {
    fetch('/api/countries')
      .then((r) => r.json())
      .then((d) => setAvailableCountries(d.countries || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchScholarships = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedSearch,
      })
      if (countryFilter && countryFilter !== 'all') {
        params.append('country_id', countryFilter)
      }
      const res = await fetch(`/api/admin/scholarships?${params}`, { credentials: 'same-origin' })
      const data = await res.json()
      setScholarships(data.data || [])
      setTotal(data.total || 0)
    } catch {
      /* empty */
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, countryFilter])

  useEffect(() => {
    fetchScholarships()
  }, [fetchScholarships])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, countryFilter])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/scholarships?id=${deleteId}`, { method: 'DELETE', credentials: 'same-origin' })
      fetchScholarships()
    } catch {
      /* empty */
    } finally {
      setDeleteOpen(false)
      setDeleteId(null)
    }
  }

  const handleSave = async () => {
    setFormError('')
    if (!editingScholarship.name?.trim() || !editingScholarship.country_id) {
      setFormError('Name and country are required')
      return
    }
    setSaving(true)
    try {
      const method = editingScholarship.id ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/scholarships', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(editingScholarship),
      })
      const data = await res.json()
      if (data.error) {
        setFormError(data.error)
      } else {
        setFormOpen(false)
        setEditingScholarship(emptyScholarship)
        fetchScholarships()
      }
    } catch {
      setFormError('Failed to save scholarship')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (scholarship: Scholarship) => {
    setEditingScholarship({ ...scholarship })
    setFormError('')
    setFormOpen(true)
  }

  const openNew = () => {
    setEditingScholarship({ ...emptyScholarship })
    setFormError('')
    setFormOpen(true)
  }

  const totalPages = Math.ceil(total / limit)

  // Form Panel
  if (formOpen) {
    return (
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {editingScholarship.id ? 'Edit Scholarship' : 'New Scholarship'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFormOpen(false)}
            className="text-slate-600 hover:text-slate-900"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>

        {formError && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">
            {formError}
          </div>
        )}

        <div className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Scholarship Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={editingScholarship.name || ''}
              onChange={(e) => setEditingScholarship((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Chevening Scholarship"
              className="bg-white border-slate-200"
            />
          </div>

          {/* Country (FK) */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">
              Country <span className="text-red-500">*</span>
            </Label>
            <CountryCombobox
              countries={availableCountries}
              value={editingScholarship.country_id}
              onChange={(id) => setEditingScholarship((prev) => ({ ...prev, country_id: id }))}
              placeholder="Search and select country..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Funding Body */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Funding Body</Label>
              <Input
                value={editingScholarship.funding_body || ''}
                onChange={(e) => setEditingScholarship((prev) => ({ ...prev, funding_body: e.target.value }))}
                placeholder="e.g. UK Government"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Funding Amount */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Funding Amount</Label>
              <Input
                value={editingScholarship.funding_amount || ''}
                onChange={(e) => setEditingScholarship((prev) => ({ ...prev, funding_amount: e.target.value }))}
                placeholder="e.g. Full tuition + living allowance"
                className="bg-white border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Programme Level */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Programme Level</Label>
              <Input
                value={editingScholarship.program_level || ''}
                onChange={(e) => setEditingScholarship((prev) => ({ ...prev, program_level: e.target.value }))}
                placeholder="e.g. Postgraduate"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Eligibility Type */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Eligibility Type</Label>
              <Select
                value={editingScholarship.eligibility_type || 'International'}
                onValueChange={(v) => setEditingScholarship((prev) => ({ ...prev, eligibility_type: v }))}
              >
                <SelectTrigger className="bg-white border-slate-200">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="International">International</SelectItem>
                  <SelectItem value="Domestic & International">Domestic & International</SelectItem>
                  <SelectItem value="Worldwide">Worldwide</SelectItem>
                  <SelectItem value="Country-Specific">Country-Specific</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Eligibility Details */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">Eligibility Details</Label>
            <RichTextEditor
              value={editingScholarship.eligibility_details || ''}
              onChange={(v) => setEditingScholarship((prev) => ({ ...prev, eligibility_details: v }))}
              placeholder="Specific eligibility requirements..."
              minHeight="100px"
            />
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">Short Description</Label>
            <RichTextEditor
              value={editingScholarship.description || ''}
              onChange={(v) => setEditingScholarship((prev) => ({ ...prev, description: v }))}
              placeholder="Brief summary for listing cards..."
              minHeight="100px"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">Full Description</Label>
            <RichTextEditor
              value={editingScholarship.full_description || ''}
              onChange={(v) => setEditingScholarship((prev) => ({ ...prev, full_description: v }))}
              placeholder="Detailed description for the detail page..."
              minHeight="160px"
            />
          </div>

          {/* How to Apply */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">How to Apply</Label>
            <Textarea
              value={editingScholarship.how_to_apply || ''}
              onChange={(e) => setEditingScholarship((prev) => ({ ...prev, how_to_apply: e.target.value }))}
              placeholder="Step-by-step application instructions (one per line)..."
              className="bg-white border-slate-200 min-h-[100px]"
            />
            <p className="text-xs text-slate-500">Enter each step on a new line. They will be numbered automatically.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Application Period */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Application Period</Label>
              <Input
                value={editingScholarship.application_period || ''}
                onChange={(e) => setEditingScholarship((prev) => ({ ...prev, application_period: e.target.value }))}
                placeholder="e.g. August - November"
                className="bg-white border-slate-200"
              />
            </div>

            {/* Official URL */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Official URL</Label>
              <Input
                value={editingScholarship.official_url || ''}
                onChange={(e) => setEditingScholarship((prev) => ({ ...prev, official_url: e.target.value }))}
                placeholder="https://..."
                className="bg-white border-slate-200"
              />
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3 py-2">
            <Switch
              id="is_active"
              checked={editingScholarship.is_active !== false}
              onCheckedChange={(v) => setEditingScholarship((prev) => ({ ...prev, is_active: v }))}
            />
            <Label htmlFor="is_active" className="text-sm font-medium text-slate-700">
              Active (visible on public site)
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Save className="h-4 w-4 mr-1.5" />
              {saving ? 'Saving...' : editingScholarship.id ? 'Update Scholarship' : 'Create Scholarship'}
            </Button>
            <Button variant="outline" onClick={() => setFormOpen(false)} className="border-slate-200">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-500">{total} scholarships total</p>
          <Button onClick={openNew} className="bg-teal-600 hover:bg-teal-700 text-white h-9 cursor-pointer w-fit">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Scholarship
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search scholarships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500"
            />
          </div>

          <FilterCountryCombobox
            countries={availableCountries}
            value={countryFilter}
            onChange={setCountryFilter}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-4" />
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : scholarships.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600 mb-4">No scholarships found</p>
            <Button onClick={openNew} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-1.5" />
              Add First Scholarship
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map((scholarship) => (
            <Card
              key={scholarship.id}
              className="border-slate-200 hover:border-teal-300 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {scholarship.country}
                  </div>
                  <Badge
                    variant={scholarship.is_active ? 'default' : 'secondary'}
                    className={`text-xs ${
                      scholarship.is_active
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {scholarship.is_active ? (
                      <><Eye className="h-3 w-3 mr-1" /> Active</>
                    ) : (
                      <><EyeOff className="h-3 w-3 mr-1" /> Inactive</>
                    )}
                  </Badge>
                </div>

                <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">{scholarship.name}</h3>

                {scholarship.funding_body && (
                  <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
                    <Building2 className="h-3 w-3" />
                    {scholarship.funding_body}
                  </p>
                )}

                {scholarship.funding_amount && (
                  <div className="bg-teal-50 rounded-md px-3 py-2 mb-3">
                    <p className="text-sm font-semibold text-teal-700 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      {scholarship.funding_amount}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {scholarship.program_level && (
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {scholarship.program_level}
                    </Badge>
                  )}
                  {scholarship.eligibility_type && (
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                      <Users className="h-3 w-3 mr-1" />
                      {scholarship.eligibility_type}
                    </Badge>
                  )}
                  {scholarship.application_period && (
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {scholarship.application_period}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  {scholarship.official_url && (
                    <a
                      href={scholarship.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-600 hover:underline flex items-center gap-1"
                    >
                      <Globe className="h-3 w-3" />
                      Website
                    </a>
                  )}
                  <div className="ml-auto flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(scholarship)}
                      className="h-8 w-8 p-0 text-slate-600 hover:text-teal-600 hover:bg-teal-50 cursor-pointer"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(scholarship.id)
                        setDeleteOpen(true)
                      }}
                      className="h-8 w-8 p-0 text-slate-600 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages} &middot; {total} total
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border-slate-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border-slate-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Scholarship</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this scholarship from the database. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
