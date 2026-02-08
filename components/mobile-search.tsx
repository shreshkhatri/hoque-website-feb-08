'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X, ArrowRight, GraduationCap, Building2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nameToSlug } from '@/lib/supabase'

interface SearchResults {
  universities: any[]
  courses: any[]
}

export function MobileSearch() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const openDrawer = useCallback(() => {
    setIsMounted(true)
    window.dispatchEvent(new Event('mobile-search-opened'))
    // Small delay so the DOM mounts first, then trigger the CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })
  }, [])

  const closeDrawer = useCallback(() => {
    setIsVisible(false)
    window.dispatchEvent(new Event('mobile-search-closed'))
    // Wait for the slide-out animation to finish before unmounting
    const timer = setTimeout(() => {
      setIsMounted(false)
      setQuery('')
      setResults(null)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Listen for custom events to open/close the search overlay
  useEffect(() => {
    const handleOpen = () => openDrawer()
    const handleClose = () => closeDrawer()
    window.addEventListener('open-mobile-search', handleOpen)
    window.addEventListener('close-mobile-search', handleClose)
    return () => {
      window.removeEventListener('open-mobile-search', handleOpen)
      window.removeEventListener('close-mobile-search', handleClose)
    }
  }, [openDrawer, closeDrawer])

  // Close on route change
  useEffect(() => {
    if (isMounted) {
      closeDrawer()
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isMounted) {
      document.body.style.overflow = 'hidden'
      // Focus input after slide-in animation completes
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 350)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isMounted])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (value.length < 2) {
      setResults(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(value)}&type=all`
        )
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
        setResults(null)
      } finally {
        setIsLoading(false)
      }
    }, 300)
  }, [])

  const handleClose = () => {
    closeDrawer()
  }

  const handleResultClick = () => {
    handleClose()
  }

  const totalResults =
    (results?.universities?.length || 0) + (results?.courses?.length || 0)

  return (
    <>
      {/* Full Screen Search Overlay - Slide from Left */}
      {isMounted && (
        <div
          className={`md:hidden fixed inset-0 z-[100] flex flex-col bg-background transition-transform duration-300 ease-in-out ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search universities, courses..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query.length > 0 && (
                <button
                  onClick={() => {
                    setQuery('')
                    setResults(null)
                    inputRef.current?.focus()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-muted-foreground/20 text-muted-foreground"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-sm font-medium text-primary px-2 py-1 shrink-0"
            >
              Cancel
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Empty State - Before Searching */}
            {query.length < 2 && !isLoading && (
              <div className="flex flex-col items-center justify-center px-6 pt-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-primary" />
                </div>
                <p className="text-foreground font-semibold text-lg mb-1">
                  Find your path
                </p>
                <p className="text-muted-foreground text-sm max-w-[260px]">
                  Search for universities, courses, and more to start your journey
                </p>

                {/* Quick Links */}
                <div className="mt-8 w-full max-w-sm">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-left">
                    Quick Links
                  </p>
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/universities"
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 size={18} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        Browse Universities
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground ml-auto"
                      />
                    </Link>
                    <Link
                      href="/courses"
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <GraduationCap size={18} className="text-accent" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        Explore Courses
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground ml-auto"
                      />
                    </Link>
                    <Link
                      href="/countries"
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        View Destinations
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground ml-auto"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && query.length >= 2 && (
              <div className="px-4 pt-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 animate-pulse"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted" />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {!isLoading && query.length >= 2 && results && (
              <div className="px-4 pt-4 pb-8">
                {totalResults === 0 ? (
                  <div className="flex flex-col items-center justify-center pt-12 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-semibold mb-1">
                      No results found
                    </p>
                    <p className="text-muted-foreground text-sm max-w-[240px]">
                      {'Try a different search term or browse our categories'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Results count */}
                    <p className="text-xs text-muted-foreground mb-3 px-1">
                      {totalResults} result{totalResults !== 1 ? 's' : ''} found
                    </p>

                    {/* Universities */}
                    {results.universities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          Universities
                        </p>
                        <div className="flex flex-col gap-1">
                          {results.universities.map((uni: any) => (
                            <Link
                              key={uni.id}
                              href={`/university/${nameToSlug(uni.name)}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted active:bg-muted transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Building2
                                  size={18}
                                  className="text-primary"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {uni.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {uni.city && <span>{uni.city}</span>}
                                  {uni.city && uni.countries && ', '}
                                  {uni.countries && (
                                    <span>{uni.countries.name}</span>
                                  )}
                                </p>
                              </div>
                              <ArrowRight
                                size={16}
                                className="text-muted-foreground shrink-0"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Courses */}
                    {results.courses.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          Courses
                        </p>
                        <div className="flex flex-col gap-1">
                          {results.courses.map((course: any) => (
                            <Link
                              key={course.id}
                              href={`/course/${nameToSlug(course.name, course.code)}`}
                              onClick={handleResultClick}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted active:bg-muted transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                <GraduationCap
                                  size={18}
                                  className="text-accent"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {course.name}
                                </p>
                                {course.universities && (
                                  <p className="text-xs text-muted-foreground truncate">
                                    {course.universities.name}
                                  </p>
                                )}
                              </div>
                              <ArrowRight
                                size={16}
                                className="text-muted-foreground shrink-0"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
