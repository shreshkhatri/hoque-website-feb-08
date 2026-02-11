'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { nameToSlug } from '@/lib/supabase'

type SearchType = 'destination' | 'university' | 'courses' | 'intake'

interface SearchResult {
  id: number
  name: string
  country?: string
  university?: string
  location?: string
  code?: string
  type: string
}

export function SearchFilter() {
  const [activeTab, setActiveTab] = useState<SearchType>('university')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const tabs: { id: SearchType; label: string }[] = [
    { id: 'destination', label: 'Destination' },
    { id: 'university', label: 'University' },
    { id: 'courses', label: 'Courses' },
    { id: 'intake', label: 'Intake Months' },
  ]

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)

    if (searchQuery.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    setIsLoading(true)
    setShowResults(true)

    try {
      const response = await fetch(
        `/api/search-filter?q=${encodeURIComponent(searchQuery)}&type=${activeTab}`,
      )
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const getPlaceholder = () => {
    const placeholders: Record<SearchType, string> = {
      destination: 'Search for countries...',
      university: 'Please Select option',
      courses: 'Search for courses...',
      intake: 'Search by intake month (e.g. September, January)...',
    }
    return placeholders[activeTab]
  }

  const getResultDisplay = (result: SearchResult) => {
    switch (activeTab) {
      case 'destination':
        return result.name
      case 'university':
        return `${result.name}${result.country ? `, ${result.country}` : ''}`
      case 'courses':
        return `${result.name}${result.university ? ` - ${result.university}` : ''}${result.country ? `, ${result.country}` : ''}`
      case 'intake':
        return `${result.name}${result.university ? ` - ${result.university}` : ''}${result.country ? `, ${result.country}` : ''}`
      default:
        return result.name
    }
  }

  const getResultLink = (result: SearchResult) => {
    switch (activeTab) {
      case 'destination':
        return `/country/${nameToSlug(result.name)}`
      case 'university':
        return `/university/${nameToSlug(result.name)}`
      case 'courses':
        return `/course/${nameToSlug(result.name, result.code)}`
      case 'intake':
        return `/course/${nameToSlug(result.name, result.code)}`
      default:
        return '/'
    }
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8">
          {/* Tabs */}
          <div className="flex gap-6 mb-8 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setQuery('')
                  setResults([])
                  setShowResults(false)
                }}
                className={`text-lg font-medium pb-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Search and Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder={getPlaceholder()}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => query.length >= 2 && setShowResults(true)}
                className="w-full pl-12 pr-4 py-3 bg-background border-2 border-accent rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />

              {/* Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      Searching...
                    </div>
                  ) : results.length > 0 ? (
                    <div className="py-2">
                      {results.map((result) => (
                        <Link
                          key={`${result.id}-${activeTab}`}
                          href={getResultLink(result)}
                          className="block px-4 py-3 hover:bg-primary/10 transition-colors text-sm"
                          onClick={() => {
                            setShowResults(false)
                            setQuery('')
                          }}
                        >
                          <div className="font-medium text-foreground">
                            {getResultDisplay(result)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : query.length >= 2 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No results found
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <button className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg transition-shadow whitespace-nowrap">
              Search Q
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
