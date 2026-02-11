'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Course, nameToSlug } from '@/lib/supabase'
import { ArrowRight, Clock, Zap, Search, X, Calendar, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface CourseWithUniversity extends Course {
  universities?: {
    id: number
    name: string
    city: string
    country_id: number
    countries: { id: number; name: string }
  }
}

interface Country {
  id: number
  name: string
}

const programLevels = ['All', 'Undergraduate', 'Master', 'PhD', 'Diploma', 'Certificate']

export function CoursesPageClient() {
  const [courses, setCourses] = useState<CourseWithUniversity[]>([])
  const [featuredCourses, setFeaturedCourses] = useState<CourseWithUniversity[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(5)

  // Filter states
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')

  // Fetch featured courses on mount
  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setFeaturedLoading(true)
        const response = await fetch('/api/courses?limit=6')
        const result = await response.json()
        setFeaturedCourses(result.data || [])
      } catch (error) {
        console.error('[v0] Error fetching featured courses:', error)
      } finally {
        setFeaturedLoading(false)
      }
    }

    fetchFeaturedCourses()
  }, [])

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await supabase
          .from('countries')
          .select('id, name')
          .order('name', { ascending: true })

        if (data && data.length > 0) {
          setCountries(data)
          // Set Australia as default, or first country if Australia not found
          const australiaCountry = data.find(c => c.name === 'Australia')
          setSelectedCountry(australiaCountry ? australiaCountry.id : data[0].id)
        }
      } catch (error) {
        console.error('[v0] Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch courses when filters change
  useEffect(() => {
    if (selectedCountry) {
      fetchCourses(true)
    }
  }, [selectedCountry, selectedLevel, debouncedSearch])

  const fetchCourses = async (reset = true) => {
    try {
      setLoading(true)
      const offset = reset ? 0 : currentOffset
      const url = new URL('/api/courses', window.location.origin)
      url.searchParams.append('limit', '5')
      url.searchParams.append('offset', offset.toString())
      if (selectedCountry) {
        url.searchParams.append('country_id', selectedCountry.toString())
      }
      if (selectedLevel && selectedLevel !== 'All') {
        url.searchParams.append('level', selectedLevel)
      }
      if (debouncedSearch) {
        url.searchParams.append('search', debouncedSearch)
      }

      const response = await fetch(url.toString())
      const result = await response.json()

      if (reset) {
        setCourses(result.data || [])
        setCurrentOffset(5)
        setItemsToShow(5)
      } else {
        setCourses((prev) => [...prev, ...(result.data || [])])
        setCurrentOffset(offset + 5)
        setItemsToShow(itemsToShow + 5)
      }

      setHasMore(result.hasMore || false)
    } catch (error) {
      console.error('[v0] Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    fetchCourses(false)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Undergraduate':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
      case 'Master':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
      case 'PhD':
        return 'bg-red-500/10 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
    }
  }

  const selectedCountryName = countries.find((c) => c.id === selectedCountry)?.name

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={(query) => {}}
        searchResults={searchResults}
        isSearching={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Explore Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the perfect course tailored to your interests and goals from our partner universities worldwide
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Search & Filters (2 columns on lg) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="sticky top-24 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Refine Your Search</h2>

                {/* Country Tabs */}
                {countries.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Select Country</h3>
                    <div className="space-y-2">
                      {countries.map((country) => (
                        <button
                          key={country.id}
                          onClick={() => setSelectedCountry(country.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            selectedCountry === country.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground hover:bg-muted/80'
                          }`}
                        >
                          {country.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Program Level Tabs */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Program Level</h3>
                  <div className="space-y-2">
                    {programLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          selectedLevel === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Box */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Search Courses</h3>
                  <div className="relative">
                    <Search size={20} className="absolute left-4 top-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by course name, specialization, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-10 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Searching in <span className="font-semibold">{selectedCountryName}</span>
                    {selectedLevel !== 'All' && (
                      <>
                        {' '}for <span className="font-semibold">{selectedLevel}</span> courses
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured & Results (3 columns on lg) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Featured Courses Section */}
            {!featuredLoading && featuredCourses.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles size={24} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Featured Courses
                  </h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  Discover cutting-edge programmes across various disciplines from our partner universities.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {featuredCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${nameToSlug(course.name, course.code)}`}
                      className="group relative bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Featured badge */}
                      <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-bold">
                        Featured
                      </div>

                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                            course.level,
                          )}`}
                        >
                          {course.level}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{course.code}</span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {course.name}
                      </h3>

                      {course.universities && (
                        <p className="text-sm font-medium text-primary mb-3">
                          {typeof course.universities === 'object' && 'name' in course.universities
                            ? course.universities.name
                            : 'University'}
                        </p>
                      )}

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="space-y-2 py-4 border-t border-b border-border mb-4">
                        {course.duration_years && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock size={16} className="text-primary" />
                            <span>
                              {course.duration_years} year{course.duration_years > 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                        {course.tuition_fees_international && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Zap size={16} className="text-orange-500" />
                            <span className="font-semibold">
                              £{course.tuition_fees_international.toLocaleString()}/year
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border group-hover:text-primary transition-colors">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Courses Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">All Courses</h2>

              {/* Results Section */}
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-xl p-6 animate-pulse"
                    >
                      <div className="h-8 bg-muted rounded w-2/3 mb-4" />
                      <div className="h-4 bg-muted rounded w-1/2 mb-6" />
                      <div className="h-20 bg-muted rounded mb-4" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : courses.length > 0 ? (
                <div>
                  <p className="text-muted-foreground mb-6 font-medium">
                    Found {courses.length} course{courses.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {courses.slice(0, itemsToShow).map((course) => (
                      <Link
                        key={course.id}
                        href={`/course/${nameToSlug(course.name, course.code)}`}
                        className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                              course.level,
                            )}`}
                          >
                            {course.level}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground">{course.code}</span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {course.name}
                        </h3>

                        {course.universities && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground">
                              {typeof course.universities === 'object' && 'name' in course.universities
                                ? course.universities.name
                                : 'University'}
                            </p>
                            {course.universities.countries && (
                              <p className="text-xs text-muted-foreground">
                                {course.universities.countries.name}
                              </p>
                            )}
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="space-y-2 py-4 border-t border-b border-border mb-4">
                          {course.duration_years && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Clock size={16} className="text-primary" />
                              <span>
                                {course.duration_years} year{course.duration_years > 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                          {course.intake_months && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Calendar size={16} className="text-green-500" />
                              <span>{course.intake_months}</span>
                            </div>
                          )}
                          {course.tuition_fees_international && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Zap size={16} className="text-orange-500" />
                              <span className="font-semibold">
                                £{course.tuition_fees_international.toLocaleString()}/year
                              </span>
                            </div>
                          )}
                        </div>

                        {course.entry_requirements && (
                          <p className="text-xs text-muted-foreground mb-4 line-clamp-1">
                            <span className="font-semibold">Requirements:</span> {course.entry_requirements}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border group-hover:text-primary transition-colors">
                          <span className="text-sm font-medium">Learn More</span>
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
                      {loading ? 'Loading...' : 'Load More Courses...'}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No courses found matching your criteria.</p>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
