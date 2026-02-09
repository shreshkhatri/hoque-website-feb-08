'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { nameToSlug } from '@/lib/supabase'

interface SearchBoxProps {
  compact?: boolean
  className?: string
}

export function SearchBox({ compact = false, className = '' }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{
    universities: any[]
    courses: any[]
  } | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.length < 2) {
      setSearchResults(null)
      return
    }

    setSearchLoading(true)
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&type=all`
      )
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults(null)
    } finally {
      setSearchLoading(false)
    }
  }

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        {/* Animated Gradient Border Wrapper - same as hero */}
        <div className="search-box-wrapper relative rounded-full">
          {/* Inner Content */}
          <div className="relative rounded-full bg-background z-[1]">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary z-10"
            />
            <input
              type="text"
              placeholder="Search for Courses universities"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-transparent rounded-full focus:outline-none text-foreground text-sm placeholder:text-muted-foreground font-medium relative z-[1]"
            />
          </div>
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
            {searchLoading ? (
              <div className="p-3 text-center text-muted-foreground text-sm">
                Searching...
              </div>
            ) : searchResults && (searchResults.universities.length > 0 || searchResults.courses.length > 0) ? (
              <div className="space-y-2 p-2">
                {/* Universities Results */}
                {searchResults.universities.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground px-2 py-1 uppercase">
                      Universities
                    </h3>
                    {searchResults.universities.slice(0, 3).map((uni: any) => (
                      <Link
                        key={uni.id}
                        href={`/university/${nameToSlug(uni.name)}`}
                        className="block px-2 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                        onClick={() => {
                          setSearchQuery('')
                          setSearchResults(null)
                        }}
                      >
                        <div className="font-medium">{uni.name}</div>
                        <div className="text-xs opacity-75">
                          {uni.city && <span>{uni.city}, </span>}
                          {uni.countries && (
                            <span>{uni.countries.name}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Courses Results */}
                {searchResults.courses.length > 0 && (
                  <div className="border-t border-border pt-2">
                    <h3 className="text-xs font-bold text-muted-foreground px-2 py-1 uppercase">
                      Courses
                    </h3>
                    {searchResults.courses.slice(0, 3).map((course: any) => (
                      <Link
                        key={course.id}
                        href={`/course/${nameToSlug(course.name, course.code)}`}
                        className="block px-2 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                        onClick={() => {
                          setSearchQuery('')
                          setSearchResults(null)
                        }}
                      >
                        <div className="font-medium">{course.name}</div>
                        {course.universities && (
                          <div className="text-xs opacity-75">
                            {course.universities.name}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 text-center text-muted-foreground text-sm">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Animated Gradient Border Wrapper */}
      <div className="search-box-wrapper relative rounded-full">
        {/* Inner Content */}
        <div className="relative rounded-full bg-background z-[1]">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10"
          />
          <input
            type="text"
            placeholder="Search for Courses universities"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-transparent rounded-full focus:outline-none text-foreground placeholder:text-muted-foreground font-medium relative z-[1]"
          />
        </div>
      </div>

      {/* Search Results Dropdown */}
      {searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {searchLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : searchResults && (searchResults.universities.length > 0 || searchResults.courses.length > 0) ? (
            <div className="space-y-2 p-2">
              {/* Universities Results */}
              {searchResults.universities.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground px-3 py-2 uppercase">
                    Universities
                  </h3>
                  {searchResults.universities.slice(0, 3).map((uni: any) => (
                    <Link
                      key={uni.id}
                      href={`/university/${nameToSlug(uni.name)}`}
                      className="block px-3 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                      onClick={() => {
                        setSearchQuery('')
                        setSearchResults(null)
                      }}
                    >
                      <div className="font-medium">{uni.name}</div>
                      <div className="text-xs opacity-75">
                        {uni.city && <span>{uni.city}, </span>}
                        {uni.countries && (
                          <span>{uni.countries.name}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Courses Results */}
              {searchResults.courses.length > 0 && (
                <div className="border-t border-border pt-2">
                  <h3 className="text-xs font-bold text-muted-foreground px-3 py-2 uppercase">
                    Courses
                  </h3>
                  {searchResults.courses.slice(0, 3).map((course: any) => (
                    <Link
                      key={course.id}
                      href={`/course/${nameToSlug(course.name, course.code)}`}
                      className="block px-3 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                      onClick={() => {
                        setSearchQuery('')
                        setSearchResults(null)
                      }}
                    >
                      <div className="font-medium">{course.name}</div>
                      {course.universities && (
                        <div className="text-xs opacity-75">
                          {course.universities.name}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
