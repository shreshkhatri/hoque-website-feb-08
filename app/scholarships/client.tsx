'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Award, MapPin, GraduationCap, Users, ArrowRight, ExternalLink, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Scholarship {
  id: number
  name: string
  slug: string
  country: string        // flattened from countries join
  country_id: number
  funding_body: string | null
  funding_amount: string | null
  program_level: string | null
  eligibility_type: string | null
  description: string | null
  application_period: string | null
  official_url: string | null
  created_at: string
}

export default function ScholarshipsClient() {
  const searchParams = useSearchParams()
  const countryFromUrl = searchParams.get('country')

  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string>(countryFromUrl || '')
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [eligibilityFilter, setEligibilityFilter] = useState('')

  const fetchScholarships = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCountry) params.append('country', selectedCountry)
      if (searchQuery) params.append('search', searchQuery)
      if (levelFilter) params.append('program_level', levelFilter)
      if (eligibilityFilter) params.append('eligibility_type', eligibilityFilter)
      const res = await fetch(`/api/scholarships?${params}`)
      const data = await res.json()
      setScholarships(data.data || [])
      if (data.countries) setCountries(data.countries)
    } catch {
      /* empty */
    } finally {
      setLoading(false)
    }
  }, [selectedCountry, searchQuery, levelFilter, eligibilityFilter])

  useEffect(() => {
    fetchScholarships()
  }, [fetchScholarships])

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(debouncedSearch), 300)
    return () => clearTimeout(timer)
  }, [debouncedSearch])

  const getEligibilityColor = (type: string | null) => {
    switch (type) {
      case 'International':
        return 'bg-accent/15 text-accent border-accent/30'
      case 'Domestic & International':
      case 'International & Domestic':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Worldwide':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getLevelColor = (level: string | null) => {
    if (!level) return 'bg-muted text-muted-foreground'
    if (level.includes('PhD') || level.includes('Doctoral')) return 'bg-amber-50 text-amber-700 border-amber-200'
    if (level.includes('Postgraduate') || level.includes('Masters')) return 'bg-indigo-50 text-indigo-700 border-indigo-200'
    if (level.includes('Undergraduate')) return 'bg-teal-50 text-teal-700 border-teal-200'
    return 'bg-muted text-muted-foreground border-border'
  }

  const countryFlags: Record<string, string> = {
    'United Kingdom': 'GB',
    'Australia': 'AU',
    'Canada': 'CA',
    'Ireland': 'IE',
    'New Zealand': 'NZ',
    'United States': 'US',
    'Dubai': 'AE',
  }

  const activeFilters = [selectedCountry, levelFilter, eligibilityFilter].filter(Boolean).length

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scholarships by name, funding body, or description..."
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
          />
        </div>

        {/* Country Tabs */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Study Destination</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCountry('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCountry
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All Countries
            </button>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(selectedCountry === country ? '' : country)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCountry === country
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {countryFlags[country] && (
                  <img
                    src={`https://flagcdn.com/20x15/${countryFlags[country].toLowerCase()}.png`}
                    alt={country}
                    className="w-5 h-3.5 rounded-sm object-cover"
                  />
                )}
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Level and Eligibility Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[180px]">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Programme Level</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="">All Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD / Doctoral</option>
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Eligibility</label>
            <select
              value={eligibilityFilter}
              onChange={(e) => setEligibilityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="">All Types</option>
              <option value="International">International Students</option>
              <option value="Domestic">Domestic Students</option>
              <option value="Worldwide">Worldwide</option>
            </select>
          </div>
          {activeFilters > 0 && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCountry('')
                  setLevelFilter('')
                  setEligibilityFilter('')
                  setDebouncedSearch('')
                }}
                className="px-4 py-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Loading...' : `${scholarships.length} scholarship${scholarships.length !== 1 ? 's' : ''} found`}
          {selectedCountry && ` in ${selectedCountry}`}
        </p>
      </div>

      {/* Scholarships Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-border animate-pulse">
              <CardContent className="p-6 space-y-4">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-20 bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : scholarships.length === 0 ? (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="text-lg font-medium text-foreground mb-2">No scholarships found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSelectedCountry('')
                setLevelFilter('')
                setEligibilityFilter('')
                setDebouncedSearch('')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <Card
              key={scholarship.id}
              className="border-border hover:border-accent/40 hover:shadow-lg transition-all group overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Top colour bar */}
                <div className="h-1.5 bg-gradient-to-r from-accent to-primary" />
                <div className="p-6 space-y-4">
                  {/* Country + Eligibility */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {countryFlags[scholarship.country] && (
                        <img
                          src={`https://flagcdn.com/20x15/${countryFlags[scholarship.country].toLowerCase()}.png`}
                          alt={scholarship.country}
                          className="w-5 h-3.5 rounded-sm object-cover"
                        />
                      )}
                      <span>{scholarship.country}</span>
                    </div>
                    {scholarship.eligibility_type && (
                      <Badge variant="outline" className={`text-xs ${getEligibilityColor(scholarship.eligibility_type)}`}>
                        <Users className="h-3 w-3 mr-1" />
                        {scholarship.eligibility_type}
                      </Badge>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                    <Link href={`/scholarships/${scholarship.slug}`}>
                      {scholarship.name}
                    </Link>
                  </h3>

                  {/* Funding Body */}
                  {scholarship.funding_body && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {scholarship.funding_body}
                    </p>
                  )}

                  {/* Funding Amount */}
                  {scholarship.funding_amount && (
                    <div className="flex items-start gap-2 bg-accent/5 rounded-lg p-3">
                      <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-foreground leading-snug">{scholarship.funding_amount}</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {scholarship.program_level && (
                      <Badge variant="outline" className={`text-xs ${getLevelColor(scholarship.program_level)}`}>
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {scholarship.program_level}
                      </Badge>
                    )}
                    {scholarship.application_period && (
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {scholarship.application_period}
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  {scholarship.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {scholarship.description}
                    </p>
                  )}

                  {/* Action */}
                  <div className="pt-2 flex items-center gap-3">
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                      <Link href={`/scholarships/${scholarship.slug}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                    {scholarship.official_url && (
                      <Button asChild size="sm" variant="outline" className="shrink-0">
                        <a href={scholarship.official_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Official website</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
