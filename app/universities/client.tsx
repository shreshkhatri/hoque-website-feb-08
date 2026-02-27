'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTAConsultation } from '@/components/cta-consultation'
import Link from 'next/link'
import { University, nameToSlug } from '@/lib/supabase'
import { ArrowRight, Globe, Users, BookOpen, Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Country {
  id: number
  name: string
}

export function UniversitiesPageClient() {
  const [universities, setUniversities] = useState<University[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)
  const [searchResults, setSearchResults] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await supabase
          .from('countries')
          .select('id, name')
          .order('name', { ascending: true })

        if (data) {
          setCountries(data)
        }
      } catch (error) {
        console.error('[v0] Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  // Fetch universities when country selection changes
  useEffect(() => {
    fetchUniversities(true)
  }, [selectedCountryId, debouncedSearch])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const fetchUniversities = async (reset = true) => {
    try {
      setLoading(true)
      const offset = reset ? 0 : currentOffset
      const url = new URL('/api/universities', window.location.origin)
      url.searchParams.append('limit', '5')
      url.searchParams.append('offset', offset.toString())
      if (selectedCountryId) {
        url.searchParams.append('countryId', selectedCountryId.toString())
      }
      if (debouncedSearch) {
        url.searchParams.append('search', debouncedSearch)
      }

      const response = await fetch(url.toString())
      const result = await response.json()
      
      if (reset) {
        setUniversities(result.data || [])
        setCurrentOffset(5)
      } else {
        setUniversities((prev) => [...prev, ...(result.data || [])])
        setCurrentOffset(offset + 5)
      }
      
      setHasMore(result.hasMore || false)
    } catch (error) {
      console.error('[v0] Error fetching universities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    fetchUniversities(false)
  }

  const selectedCountryName = countries.find((c) => c.id === selectedCountryId)?.name

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={(query) => {}}
        searchResults={searchResults}
        isSearching={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Universities
          </h1>
          <p className="text-lg text-muted-foreground">
            {selectedCountryId
              ? `Browse universities in ${selectedCountryName}`
              : 'Select a country to browse universities'}
          </p>
        </div>

        {/* Country Selector */}
        {countries.length > 0 && (
          <div className="mb-12 p-6 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-bold text-foreground mb-4">Filter by Country</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <button
                onClick={() => setSelectedCountryId(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCountryId === null
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                All Countries
              </button>
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountryId(country.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCountryId === country.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Box */}
        <div className="mb-12 p-6 bg-card border border-border rounded-lg">
          <h2 className="text-xl font-bold text-foreground mb-4">Search Universities</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search by university name, city, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {selectedCountryId && (
            <p className="text-sm text-muted-foreground mt-3">
              Searching universities in <span className="font-semibold">{countries.find(c => c.id === selectedCountryId)?.name || 'selected country'}</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 animate-pulse"
              >
                <div className="h-40 bg-muted rounded-lg mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : universities.length > 0 ? (
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {universities.map((uni) => (
                <Link
                  key={uni.id}
                  href={`/university/${nameToSlug(uni.name)}`}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1 flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {uni.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {uni.city}, {uni.country}
                      </p>
                    </div>
                    {uni.rank_world && (
                      <div className="text-right">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
                          #{uni.rank_world}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {uni.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-t border-b border-border">
                    {uni.founded_year && (
                      <div className="flex items-center space-x-2">
                        <BookOpen size={16} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Founded
                          </div>
                          <div className="font-semibold text-foreground">
                            {uni.founded_year}
                          </div>
                        </div>
                      </div>
                    )}
                    {uni.student_population && (
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">
                            Students
                          </div>
                          <div className="font-semibold text-foreground">
                            {uni.student_population.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {uni.rank_world && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Globe size={16} className="text-accent" />
                      <span className="text-sm text-foreground">
                        Global Rank: <span className="font-semibold">#{uni.rank_world}</span>
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="mt-8 text-center w-full text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                {loading ? 'Loading...' : 'Load More Universities...'}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No universities found for the selected country.
            </p>
          </div>
        )}
      </main>

      <CTAConsultation
        heading="Need help choosing the right university?"
        description="With 100+ partner universities, our counsellors can help you find the perfect match for your academic goals, budget, and career aspirations."
        badge="Expert university guidance"
      />

      <Footer />
    </div>
  )
}
