'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Search,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  Building2,
  BadgeCheck,
  Users,
  X,
  ArrowRight,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function generateSlug(id: number, title: string, city: string): string {
  const slug = `${title}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${id}-${slug}`
}

interface Vacancy {
  id: number
  title: string
  department: string
  location_country: string
  location_city: string
  job_type: string
  experience_level: string
  salary_range: string | null
  application_deadline: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  is_active: boolean
  created_at: string
}

function getDaysRemaining(deadline: string): number {
  const now = new Date()
  const deadlineDate = new Date(deadline)
  const diff = deadlineDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function DeadlineBadge({ deadline }: { deadline: string }) {
  const days = getDaysRemaining(deadline)
  const isUrgent = days <= 14
  const isExpired = days < 0

  if (isExpired) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
        <Clock className="h-3 w-3" />
        Expired
      </span>
    )
  }

  if (isUrgent) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
        <Clock className="h-3 w-3" />
        {days} days left
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      <Calendar className="h-3 w-3" />
      Due {formatDate(deadline)}
    </span>
  )
}

function VacancyCard({
  vacancy,
  isExpanded,
  onToggle,
}: {
  vacancy: Vacancy
  isExpanded: boolean
  onToggle: () => void
}) {
  const daysLeft = getDaysRemaining(vacancy.application_deadline)

  return (
    <div
      className={cn(
        'group rounded-xl border border-border bg-card transition-all duration-300',
        isExpanded ? 'shadow-lg ring-1 ring-accent/20' : 'shadow-sm hover:shadow-md hover:border-accent/30'
      )}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            {/* Department + Experience badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <Building2 className="h-3 w-3" />
                {vacancy.department}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                <BadgeCheck className="h-3 w-3" />
                {vacancy.experience_level}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                {vacancy.job_type}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              {vacancy.title}
            </h3>

            {/* Location + Salary */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" />
                {vacancy.location_city}, {vacancy.location_country}
              </span>
              {vacancy.salary_range && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-medium text-foreground">{vacancy.salary_range}</span>
                </span>
              )}
            </div>
          </div>

          {/* Deadline badge */}
          <div className="flex-shrink-0">
            <DeadlineBadge deadline={vacancy.application_deadline} />
          </div>
        </div>

        {/* Description preview */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {vacancy.description}
        </p>

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View full details <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 px-6 py-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Responsibilities */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                <Users className="h-4 w-4 text-accent" />
                Key Responsibilities
              </h4>
              <ul className="space-y-2">
                {vacancy.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                  >
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                <BadgeCheck className="h-4 w-4 text-accent" />
                Requirements
              </h4>
              <ul className="space-y-2">
                {vacancy.requirements.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                  >
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                <Briefcase className="h-4 w-4 text-accent" />
                Benefits
              </h4>
              <ul className="space-y-2">
                {vacancy.benefits.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                  >
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apply CTA */}
          {daysLeft >= 0 && (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-lg bg-primary/5 p-5 sm:flex-row sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Interested in this position?
                </p>
                <p className="text-sm text-muted-foreground">
                  Apply before {formatDate(vacancy.application_deadline)}
                </p>
              </div>
  <Link
  href={`/career/${generateSlug(vacancy.id, vacancy.title, vacancy.location_city)}`}
  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
  >
  Apply Now
  <ArrowRight className="h-4 w-4" />
  </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function CareerPageClient() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch vacancies
  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (debouncedSearch) params.append('search', debouncedSearch)
        if (selectedCountry) params.append('country', selectedCountry)
        if (selectedDepartment) params.append('department', selectedDepartment)

        const res = await fetch(`/api/vacancies?${params.toString()}`)
        const json = await res.json()
        if (json.data) {
          setVacancies(json.data)
        }
      } catch (error) {
        console.error('Error fetching vacancies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVacancies()
  }, [debouncedSearch, selectedCountry, selectedDepartment])

  // Derive unique filter options from data
  const countries = useMemo(
    () => [...new Set(vacancies.map((v) => v.location_country))].sort(),
    [vacancies]
  )
  const departments = useMemo(
    () => [...new Set(vacancies.map((v) => v.department))].sort(),
    [vacancies]
  )

  const activeFilters =
    (selectedCountry ? 1 : 0) + (selectedDepartment ? 1 : 0)

  const clearFilters = () => {
    setSelectedCountry('')
    setSelectedDepartment('')
    setSearchQuery('')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 sm:py-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-accent" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              We are hiring
            </span>
            <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Join Our Growing Team
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
              Be part of a passionate team shaping the future of international education.
              We have opportunities across the UK and Bangladesh.
            </p>

            {/* Search bar */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by job title, department, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-0 bg-card py-4 pl-12 pr-12 text-sm text-foreground shadow-lg ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          {/* Stats bar */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Briefcase className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{vacancies.length}</p>
                  <p className="text-xs text-muted-foreground">Open positions</p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{countries.length}</p>
                  <p className="text-xs text-muted-foreground">Countries</p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                  <p className="text-xs text-muted-foreground">Departments</p>
                </div>
              </div>
            </div>

            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters {activeFilters > 0 && `(${activeFilters})`}
            </Button>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters sidebar */}
            <aside
              className={cn(
                'w-full flex-shrink-0 lg:w-64',
                showMobileFilters ? 'block' : 'hidden lg:block'
              )}
            >
              <div className="sticky top-6 space-y-6 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Filters</h3>
                  {activeFilters > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Country filter */}
                <div className="space-y-2">
                  <label
                    htmlFor="country-filter"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Country
                  </label>
                  <select
                    id="country-filter"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">All Countries</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                </div>

                {/* Department filter */}
                <div className="space-y-2">
                  <label
                    htmlFor="department-filter"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Department
                  </label>
                  <select
                    id="department-filter"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active filter pills */}
                {activeFilters > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Active filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountry && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                          {selectedCountry}
                          <button onClick={() => setSelectedCountry('')}>
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {selectedDepartment && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {selectedDepartment}
                          <button onClick={() => setSelectedDepartment('')}>
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Vacancy list */}
            <div className="flex-1 space-y-5">
              {loading ? (
                <div className="space-y-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse rounded-xl border border-border bg-card p-6">
                      <div className="flex gap-2 mb-3">
                        <div className="h-6 w-20 rounded-md bg-muted" />
                        <div className="h-6 w-16 rounded-md bg-muted" />
                      </div>
                      <div className="h-7 w-64 rounded bg-muted mb-3" />
                      <div className="h-4 w-48 rounded bg-muted mb-4" />
                      <div className="h-4 w-full rounded bg-muted mb-2" />
                      <div className="h-4 w-3/4 rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ) : vacancies.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Briefcase className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No vacancies found</h3>
                  <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                    {debouncedSearch || selectedCountry || selectedDepartment
                      ? 'Try adjusting your search or filters to find what you are looking for.'
                      : 'There are no open positions at the moment. Please check back later.'}
                  </p>
                  {(debouncedSearch || selectedCountry || selectedDepartment) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={clearFilters}
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {/* Results count */}
                  <p className="text-sm text-muted-foreground">
                    Showing{' '}
                    <span className="font-semibold text-foreground">{vacancies.length}</span>{' '}
                    {vacancies.length === 1 ? 'position' : 'positions'}
                    {debouncedSearch && (
                      <>
                        {' '}matching{' '}
                        <span className="font-semibold text-foreground">
                          {'"'}{debouncedSearch}{'"'}
                        </span>
                      </>
                    )}
                  </p>

                  {vacancies.map((vacancy) => (
                    <VacancyCard
                      key={vacancy.id}
                      vacancy={vacancy}
                      isExpanded={expandedId === vacancy.id}
                      onToggle={() =>
                        setExpandedId(expandedId === vacancy.id ? null : vacancy.id)
                      }
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/50 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
              {"Don't see the right role?"}
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              We are always looking for talented individuals to join our team. Send us your CV
              and we will reach out when a suitable position opens up.
            </p>
            <a
              href="mailto:careers@hoqueconsultancy.com?subject=General Application - Career Interest"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Send Your CV
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
