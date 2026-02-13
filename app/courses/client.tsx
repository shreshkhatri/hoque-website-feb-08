'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Course, nameToSlug } from '@/lib/supabase'
import { ArrowRight, Clock, Zap, Search, X, Calendar, Sparkles, ChevronDown, Check, ChevronsUpDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'

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

interface University {
  id: number
  name: string
  city: string
  country_id: number
}

interface Campus {
  id: number
  name: string
  city: string | null
  university_id: number
}

const programLevels = ['All', 'Undergraduate', 'Master', 'PhD', 'Diploma', 'Certificate']

export function CoursesPageClient() {
  const [courses, setCourses] = useState<CourseWithUniversity[]>([])
  const [featuredCourses, setFeaturedCourses] = useState<CourseWithUniversity[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [intakeMonths, setIntakeMonths] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(5)

  // Filter states
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null)
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null)
  const [selectedCampus, setSelectedCampus] = useState<number | null>(null)
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [selectedLevel, setSelectedLevel] = useState<string>('All')
  const [selectedIntakeMonths, setSelectedIntakeMonths] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')
  
  // UI state for dropdowns
  const [countryOpen, setCountryOpen] = useState(false)
  const [universityOpen, setUniversityOpen] = useState(false)
  const [campusOpen, setCampusOpen] = useState(false)
  const [levelOpen, setLevelOpen] = useState(false)

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

  // Fetch universities when country changes
  useEffect(() => {
    const fetchUniversities = async () => {
      if (!selectedCountry) {
        setUniversities([])
        setSelectedUniversity(null)
        return
      }

      try {
        const { data } = await supabase
          .from('universities')
          .select('id, name, city, country_id')
          .eq('country_id', selectedCountry)
          .order('name', { ascending: true })

        if (data) {
          setUniversities(data)
          // Reset university selection when country changes
          setSelectedUniversity(null)
        }
      } catch (error) {
        console.error('[v0] Error fetching universities:', error)
      }
    }

    fetchUniversities()
  }, [selectedCountry])

  // Fetch campuses when university changes
  useEffect(() => {
    const fetchCampuses = async () => {
      if (!selectedUniversity) {
        setCampuses([])
        setSelectedCampus(null)
        return
      }

      try {
        const { data } = await supabase
          .from('university_campuses')
          .select('id, name, city, university_id')
          .eq('university_id', selectedUniversity)
          .order('name', { ascending: true })

        if (data) {
          setCampuses(data)
        } else {
          setCampuses([])
        }
        // Reset campus selection when university changes
        setSelectedCampus(null)
      } catch (error) {
        console.error('[v0] Error fetching campuses:', error)
        setCampuses([])
      }
    }

    fetchCampuses()
  }, [selectedUniversity])

  // Fetch distinct intake months on mount
  useEffect(() => {
    const fetchIntakeMonths = async () => {
      try {
        const { data } = await supabase
          .from('course_intake_months')
          .select('month')
        
        if (data) {
          const uniqueMonths = [...new Set(data.map((d: { month: string }) => d.month))].sort()
          setIntakeMonths(uniqueMonths)
        }
      } catch (error) {
        console.error('[v0] Error fetching intake months:', error)
      }
    }

    fetchIntakeMonths()
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
  }, [selectedCountry, selectedUniversity, selectedCampus, selectedLevel, selectedIntakeMonths, debouncedSearch])

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
      if (selectedUniversity) {
        url.searchParams.append('university_id', selectedUniversity.toString())
      }
      if (selectedCampus) {
        url.searchParams.append('campus_id', selectedCampus.toString())
      }
      if (selectedLevel && selectedLevel !== 'All') {
        url.searchParams.append('level', selectedLevel)
      }
      // Handle multiple intake months
      if (selectedIntakeMonths.length > 0) {
        url.searchParams.append('intake_months', selectedIntakeMonths.join(','))
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
  
  const handleIntakeToggle = (month: string) => {
    setSelectedIntakeMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={(query) => {}}
        searchResults={searchResults}
        isSearching={false}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Explore Courses
          </h1>
          <p className="text-base text-muted-foreground">
            Find the perfect course tailored to your interests and goals from our partner universities worldwide
          </p>
        </div>

        {/* Two Column Layout: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>
              </div>

              {/* Country Dropdown */}
              {countries.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">Country</Label>
                  <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={countryOpen}
                        className="w-full justify-between"
                      >
                        <span className="truncate">
                          {selectedCountry
                            ? countries.find((c) => c.id === selectedCountry)?.name
                            : 'Select country...'}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search countries..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                key={country.id}
                                value={country.name}
                                onSelect={() => {
                                  setSelectedCountry(country.id)
                                  setCountryOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    selectedCountry === country.id ? 'opacity-100' : 'opacity-0'
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
              )}

              {/* University Dropdown */}
              {universities.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">University</Label>
                  <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={universityOpen}
                        className="w-full justify-between"
                      >
                        <span className="truncate">
                          {selectedUniversity
                            ? universities.find((u) => u.id === selectedUniversity)?.name
                            : 'All Universities'}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search universities..." />
                        <CommandList>
                          <CommandEmpty>No university found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value="all-universities"
                              onSelect={() => {
                                setSelectedUniversity(null)
                                setUniversityOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  selectedUniversity === null ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              All Universities
                            </CommandItem>
                            {universities.map((university) => (
                              <CommandItem
                                key={university.id}
                                value={university.name}
                                onSelect={() => {
                                  setSelectedUniversity(university.id)
                                  setUniversityOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    selectedUniversity === university.id ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>{university.name}</span>
                                  <span className="text-xs text-muted-foreground">{university.city}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Campus Dropdown - only show when a university is selected and has campuses */}
              {selectedUniversity && campuses.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">Campus</Label>
                  <Popover open={campusOpen} onOpenChange={setCampusOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={campusOpen}
                        className="w-full justify-between"
                      >
                        <span className="truncate">
                          {selectedCampus
                            ? campuses.find((c) => c.id === selectedCampus)?.name
                            : 'All Campuses'}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search campuses..." />
                        <CommandList>
                          <CommandEmpty>No campus found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value="all-campuses"
                              onSelect={() => {
                                setSelectedCampus(null)
                                setCampusOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  selectedCampus === null ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              All Campuses
                            </CommandItem>
                            {campuses.map((campus) => (
                              <CommandItem
                                key={campus.id}
                                value={`${campus.name} ${campus.city || ''}`}
                                onSelect={() => {
                                  setSelectedCampus(campus.id)
                                  setCampusOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    selectedCampus === campus.id ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>{campus.name}</span>
                                  {campus.city && (
                                    <span className="text-xs text-muted-foreground">{campus.city}</span>
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Program Level Dropdown */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">Program Level</Label>
                <Popover open={levelOpen} onOpenChange={setLevelOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={levelOpen}
                      className="w-full justify-between"
                    >
                      <span className="truncate">{selectedLevel}</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search program levels..." />
                      <CommandList>
                        <CommandEmpty>No level found.</CommandEmpty>
                        <CommandGroup>
                          {programLevels.map((level) => (
                            <CommandItem
                              key={level}
                              value={level}
                              onSelect={() => {
                                setSelectedLevel(level)
                                setLevelOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  selectedLevel === level ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {level}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Intake Months Checkboxes */}
              {intakeMonths.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Intake Months</Label>
                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2">
                    {/* All option */}
                    <div className="flex items-center space-x-2 pb-2 border-b border-border">
                      <Checkbox
                        id="intake-all"
                        checked={selectedIntakeMonths.length === 0}
                        onCheckedChange={() => setSelectedIntakeMonths([])}
                      />
                      <label
                        htmlFor="intake-all"
                        className="text-sm font-medium text-foreground cursor-pointer select-none"
                      >
                        All Intakes
                      </label>
                    </div>
                    {/* Individual months */}
                    {intakeMonths.map((month) => (
                      <div key={month} className="flex items-center space-x-2">
                        <Checkbox
                          id={`intake-${month}`}
                          checked={selectedIntakeMonths.includes(month)}
                          onCheckedChange={() => handleIntakeToggle(month)}
                        />
                        <label
                          htmlFor={`intake-${month}`}
                          className="text-sm text-foreground cursor-pointer select-none"
                        >
                          {month}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedIntakeMonths.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIntakeMonths([])}
                      className="w-full text-xs"
                    >
                      Clear Selection ({selectedIntakeMonths.length})
                    </Button>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 space-y-8">
            {/* Search Box */}
            <div>
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
                Searching in <span className="font-semibold">{selectedCountryName || 'all countries'}</span>
                {selectedUniversity && (
                  <>
                    {' '}at <span className="font-semibold">{universities.find((u) => u.id === selectedUniversity)?.name}</span>
                  </>
                )}
                {selectedCampus && (
                  <>
                    {' '}(<span className="font-semibold">{campuses.find((c) => c.id === selectedCampus)?.name}</span> campus)
                  </>
                )}
                {selectedLevel !== 'All' && (
                  <>
                    {' '}for <span className="font-semibold">{selectedLevel}</span> courses
                  </>
                )}
                {selectedIntakeMonths.length > 0 && (
                  <>
                    {' '}with{' '}
                    <span className="font-semibold">
                      {selectedIntakeMonths.slice(0, 2).join(', ')}
                      {selectedIntakeMonths.length > 2 && ` +${selectedIntakeMonths.length - 2} more`}
                    </span>{' '}
                    intake
                  </>
                )}
              </p>
            </div>

            {/* Search Results Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Search Results</h2>

              {/* Results Section */}
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
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
                      className="group bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300"
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
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <p className="text-muted-foreground text-lg mb-2">No courses found matching your criteria.</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
            )}
            </div>

            {/* Featured Courses Section */}
            {!featuredLoading && featuredCourses.length > 0 && (
              <div className="pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles size={24} className="text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Featured Courses</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Discover cutting-edge programmes across various disciplines from our partner universities.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                {featuredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${nameToSlug(course.name, course.code)}`}
                    className="group relative bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 rounded-xl p-6 hover:border-accent hover:shadow-xl transition-all duration-300 overflow-hidden"
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
