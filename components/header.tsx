'use client'

import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { University, Course, Country, nameToSlug } from '@/lib/supabase'
import { SearchBox } from './search-box'
import { useHeroSearch } from './hero-search-context'

export function Header() {
  const [showUniDropdown, setShowUniDropdown] = useState(false)
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [hoveredSubService, setHoveredSubService] = useState<string | null>(null)
  const [subMenuPosition, setSubMenuPosition] = useState<'left' | 'right'>('right')
  const [universities, setUniversities] = useState<University[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [mobileDrawerMounted, setMobileDrawerMounted] = useState(false)
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false)
  const { heroSearchVisible, isHomePage } = useHeroSearch()
  const showHeaderSearch = !heroSearchVisible || !isHomePage
  const [mobileUniExpanded, setMobileUniExpanded] = useState(false)
  const [mobileCourseExpanded, setMobileCourseExpanded] = useState(false)
  const [mobileCountryExpanded, setMobileCountryExpanded] = useState(false)
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false)

  const uniDropdownRef = useRef<HTMLDivElement>(null)
  const courseDropdownRef = useRef<HTMLDivElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const servicesSubMenuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    fetchTopUniversities()
    fetchTopCourses()
    fetchCountries()
  }, [])



  const fetchTopUniversities = async () => {
    try {
      const response = await fetch('/api/universities?limit=5')
      const result = await response.json()
      setUniversities(result.data || [])
    } catch (error) {
      console.error('Error fetching universities:', error)
      setUniversities([])
    }
  }

  const fetchTopCourses = async () => {
    try {
      const response = await fetch('/api/courses?limit=5')
      const result = await response.json()
      setCourses(result.data || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
      setCourses([])
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/countries')
      const data = await response.json()

      const desiredOrder = [
        'United Kingdom',
        'Australia',
        'Canada',
        'Ireland',
        'New Zealand',
        'United States',
        'Dubai',
      ]

      const sortedData = data.sort((a: Country, b: Country) => {
        const indexA = desiredOrder.indexOf(a.name)
        const indexB = desiredOrder.indexOf(b.name)

        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return 0
      })

      setCountries(sortedData)
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (uniDropdownRef.current && !uniDropdownRef.current.contains(event.target as Node)) {
        setShowUniDropdown(false)
      }
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleServicesClickOutside = (event: MouseEvent) => {
    if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
      setShowServicesDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleServicesClickOutside)
    return () => document.removeEventListener('mousedown', handleServicesClickOutside)
  }, [])

  useEffect(() => {
    if ((hoveredService === 'consultation' || hoveredService === 'application' || hoveredService === 'support') && servicesDropdownRef.current) {
      const rect = servicesDropdownRef.current.getBoundingClientRect()
      const submenuWidth = 192
      const spaceOnRight = window.innerWidth - rect.right

      if (spaceOnRight < submenuWidth + 100) {
        setSubMenuPosition('left')
      } else {
        setSubMenuPosition('right')
      }
    }
  }, [hoveredService])

  // Animate the mobile drawer open/close
  useEffect(() => {
    if (mobileDrawerOpen) {
      setMobileDrawerMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMobileDrawerVisible(true)
        })
      })
    } else {
      setMobileDrawerVisible(false)
      const timer = setTimeout(() => {
        setMobileDrawerMounted(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [mobileDrawerOpen])

  const closeMobileDrawer = () => {
    setMobileDrawerOpen(false)
    setMobileUniExpanded(false)
    setMobileCourseExpanded(false)
    setMobileCountryExpanded(false)
  }



  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          <Link href="/" onClick={() => closeMobileDrawer()} className="flex items-center space-x-2 flex-shrink-0">
            <img src="/hoque-logo.png" alt="HOQUE" className="h-6 sm:h-8 md:h-10 w-auto" />
          </Link>

          {/* Dynamic Search Box - appears when hero search scrolls out of view */}
          <div
            className={`hidden md:block flex-1 max-w-xs lg:max-w-sm transition-all duration-300 ease-in-out ${
              showHeaderSearch
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <SearchBox compact className="w-full" />
          </div>

          <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 text-sm lg:text-base">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>

            <div ref={uniDropdownRef} className="relative group">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                Destinations
                <ChevronDown size={16} className={`transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg min-w-48 z-50">
                  {countries.slice(0, 8).map((country) => (
                    <Link
                      key={country.id}
                      href={`/country/${nameToSlug(country.name)}`}
                      onClick={() => setShowCountryDropdown(false)}
                      className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {country.name}
                    </Link>
                  ))}
                  <Link
                    href="/countries"
                    onClick={() => setShowCountryDropdown(false)}
                    className="block px-6 py-3 border-t border-border text-sm text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors rounded-b-lg"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>

            <div ref={courseDropdownRef} className="relative group">
              <button
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                Courses
                <ChevronDown size={16} className={`transition-transform ${showCourseDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCourseDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg min-w-48 z-50">
                  {courses.slice(0, 8).map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${nameToSlug(course.name, course.code)}`}
                      onClick={() => setShowCourseDropdown(false)}
                      className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {course.name}
                    </Link>
                  ))}
                  <Link
                    href="/courses"
                    onClick={() => setShowCourseDropdown(false)}
                    className="block px-6 py-3 border-t border-border text-sm text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors rounded-b-lg"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>

            <div ref={uniDropdownRef} className="relative group">
              <button
                onClick={() => setShowUniDropdown(!showUniDropdown)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                Universities
                <ChevronDown size={16} className={`transition-transform ${showUniDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showUniDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg min-w-48 z-50">
                  {universities.slice(0, 8).map((uni) => (
                    <Link
                      key={uni.id}
                      href={`/university/${nameToSlug(uni.name)}`}
                      onClick={() => setShowUniDropdown(false)}
                      className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {uni.name}
                    </Link>
                  ))}
                  <Link
                    href="/universities"
                    onClick={() => setShowUniDropdown(false)}
                    className="block px-6 py-3 border-t border-border text-sm text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors rounded-b-lg"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>

            <div ref={servicesDropdownRef} className="relative group">
              <button
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                Services
                <ChevronDown size={16} className={`transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg min-w-48 z-50">
                  <div className="relative group">
                    <button
                      onMouseEnter={() => setHoveredService('consultation')}
                      onClick={() => setHoveredService(hoveredService === 'consultation' ? null : 'consultation')}
                      className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors flex items-center justify-between first:rounded-t-lg ${
                        hoveredService === 'consultation'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      Free Consultation
                      <ChevronRight size={16} />
                    </button>

                    {hoveredService === 'consultation' && (
                      <div
                        className={`absolute top-0 bg-card border border-border rounded-lg shadow-lg min-w-48 z-[60] ${
                          subMenuPosition === 'right' ? 'left-full ml-2' : 'right-full mr-2'
                        }`}
                        ref={servicesSubMenuRef}
                      >
                        <a
                          href="/services/one-to-one-consultation"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors first:rounded-t-lg"
                        >
                          One to One
                        </a>
                        <a
                          href="/services/uk-university-selection"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          UK University Selection
                        </a>
                        <a
                          href="/services/course-search"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors last:rounded-b-lg"
                        >
                          Course Search
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="relative group">
                    <button
                      onMouseEnter={() => setHoveredService('application')}
                      onClick={() => setHoveredService(hoveredService === 'application' ? null : 'application')}
                      className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors flex items-center justify-between ${
                        hoveredService === 'application'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      Free Application
                      <ChevronRight size={16} />
                    </button>

                    {hoveredService === 'application' && (
                      <div
                        className={`absolute top-0 bg-card border border-border rounded-lg shadow-lg min-w-48 z-[60] ${
                          subMenuPosition === 'right' ? 'left-full ml-2' : 'right-full mr-2'
                        }`}
                      >
                        <a
                          href="/services/university-application"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors first:rounded-t-lg"
                        >
                          University Application
                        </a>
                        <a
                          href="/services/ucas-application-help"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          UCAS Application Help
                        </a>
                        <a
                          href="/services/visa-application-support"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors last:rounded-b-lg"
                        >
                          VISA Application Support
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="relative group">
                    <button
                      onMouseEnter={() => setHoveredService('support')}
                      onClick={() => setHoveredService(hoveredService === 'support' ? null : 'support')}
                      className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors flex items-center justify-between last:rounded-b-lg ${
                        hoveredService === 'support'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      International Student Support
                      <ChevronRight size={16} />
                    </button>

                    {hoveredService === 'support' && (
                      <div
                        className={`absolute top-0 bg-card border border-border rounded-lg shadow-lg min-w-48 z-[60] ${
                          subMenuPosition === 'right' ? 'left-full ml-2' : 'right-full mr-2'
                        }`}
                      >
                        <a
                          href="/services/accommodation-support"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors first:rounded-t-lg"
                        >
                          Accommodation Support
                        </a>
                        <a
                          href="/services/financial-guidance"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Financial Guidance
                        </a>
                        <a
                          href="/services/student-life-orientation"
                          onClick={() => {
                            setShowServicesDropdown(false)
                            setHoveredService(null)
                          }}
                          className="block px-6 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors last:rounded-b-lg"
                        >
                          Student Life Orientation
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </nav>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => {
                setMobileDrawerOpen(!mobileDrawerOpen)
              }}
              className="relative w-10 h-10 flex items-center justify-center hover:bg-muted rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {/* Dot grid - 2x3 pattern that animates */}
                <circle
                  cx="8"
                  cy="7"
                  r="1.5"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <circle
                  cx="16"
                  cy="7"
                  r="1.5"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <circle
                  cx="8"
                  cy="12"
                  r="1.5"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <circle
                  cx="16"
                  cy="12"
                  r="1.5"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <circle
                  cx="8"
                  cy="17"
                  r="1.5"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <circle
                  cx="16"
                  cy="17"
                  r="1.5"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                />
                {/* X shape when opened */}
                <line
                  x1="7"
                  y1="7"
                  x2="17"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
                />
                <line
                  x1="17"
                  y1="7"
                  x2="7"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`transition-all duration-300 ${mobileDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileDrawerMounted && (
        <nav
          className={`md:hidden fixed top-16 left-0 right-0 bottom-0 flex flex-col p-4 space-y-4 border-t border-border bg-background overflow-y-auto z-40 transition-transform duration-300 ease-in-out ${
            mobileDrawerVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium" onClick={closeMobileDrawer}>
            About
          </Link>

          <div>
            <button
              onClick={() => setMobileCountryExpanded(!mobileCountryExpanded)}
              className="w-full text-left text-foreground hover:text-primary transition-colors font-medium flex items-center justify-between"
            >
              Destinations
              <ChevronDown size={16} className={`transition-transform ${mobileCountryExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileCountryExpanded && (
              <div className="mt-2 ml-4 space-y-3 border-l border-primary/30 pl-4">
                {countries.slice(0, 5).map((country) => (
                  <Link
                    key={country.id}
                    href={`/country/${nameToSlug(country.name)}`}
                    onClick={closeMobileDrawer}
                    className="block text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {country.name}
                  </Link>
                ))}
                <Link
                  href="/countries"
                  onClick={closeMobileDrawer}
                  className="block text-sm text-primary font-semibold hover:opacity-80"
                >
                  View All
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileCourseExpanded(!mobileCourseExpanded)}
              className="w-full text-left text-foreground hover:text-primary transition-colors font-medium flex items-center justify-between"
            >
              Courses
              <ChevronDown size={16} className={`transition-transform ${mobileCourseExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileCourseExpanded && (
              <div className="mt-2 ml-4 space-y-3 border-l border-primary/30 pl-4">
                {courses.slice(0, 5).map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${nameToSlug(course.name, course.code)}`}
                    onClick={closeMobileDrawer}
                    className="block text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {course.name}
                  </Link>
                ))}
                <Link
                  href="/courses"
                  onClick={closeMobileDrawer}
                  className="block text-sm text-primary font-semibold hover:opacity-80"
                >
                  View All
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileUniExpanded(!mobileUniExpanded)}
              className="w-full text-left text-foreground hover:text-primary transition-colors font-medium flex items-center justify-between"
            >
              Universities
              <ChevronDown size={16} className={`transition-transform ${mobileUniExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileUniExpanded && (
              <div className="mt-2 ml-4 space-y-3 border-l border-primary/30 pl-4">
                {universities.slice(0, 5).map((uni) => (
                  <Link
                    key={uni.id}
                    href={`/university/${nameToSlug(uni.name)}`}
                    onClick={closeMobileDrawer}
                    className="block text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {uni.name}
                  </Link>
                ))}
                <Link
                  href="/universities"
                  onClick={closeMobileDrawer}
                  className="block text-sm text-primary font-semibold hover:opacity-80"
                >
                  View All
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
              className="w-full text-left text-foreground hover:text-primary transition-colors font-medium flex items-center justify-between"
            >
              Services
              <ChevronDown size={16} className={`transition-transform ${mobileServicesExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesExpanded && (
              <div className="mt-2 ml-4 space-y-4 border-l border-primary/30 pl-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Free Consultation</p>
                  <div className="space-y-2">
                    <Link href="/services/one-to-one-consultation" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      One to One Consultation
                    </Link>
                    <Link href="/services/uk-university-selection" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      UK University Selection
                    </Link>
                    <Link href="/services/course-search" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      Course Search
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Free Application</p>
                  <div className="space-y-2">
                    <Link href="/services/university-application" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      University Application
                    </Link>
                    <Link href="/services/ucas-application-help" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      UCAS Application Help
                    </Link>
                    <Link href="/services/visa-application-support" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      VISA Application Support
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Student Support</p>
                  <div className="space-y-2">
                    <Link href="/services/student-accommodation" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      Student Accommodation
                    </Link>
                    <Link href="/services/scholarships-funding-support" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      Scholarships & Funding Support
                    </Link>
                    <Link href="/services/ielts-preparation" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      IELTS Preparation
                    </Link>
                    <Link href="/services/pre-arrival-checklist" onClick={closeMobileDrawer} className="block text-sm text-foreground hover:text-primary transition-colors">
                      Pre-Arrival Checklist
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium" onClick={closeMobileDrawer}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}
