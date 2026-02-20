'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { University, Course, UniversityCampus } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Globe,
  Users,
  Award,
  Calendar,
  GraduationCap,
  Building2,
  FileText,
  ChevronRight,
  Star,
  Clock,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Search,
  Filter,
} from 'lucide-react'

// Helper to convert name to slug
function nameToSlug(name: string, code?: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return code ? `${base}-${code.toLowerCase()}` : base
}

interface CourseWithCampus extends Course {
  university_campuses?: { id: number; name: string; location: string | null; is_main_campus: boolean } | null
}

interface UniversityContentProps {
  university: University
  courses: CourseWithCampus[]
  campuses?: UniversityCampus[]
  currency?: string | null
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'highlights', label: 'Highlights', icon: Star },
  { id: 'campuses', label: 'Campuses', icon: Building2 },
  { id: 'documents', label: 'Required Documents', icon: FileText },
  { id: 'faqs', label: 'FAQs', icon: ChevronDown },
]

// Icon mapping for highlights
const iconMap: Record<string, any> = {
  Award,
  Briefcase,
  Users,
  Globe,
  Star,
  GraduationCap,
  Building2,
  BookOpen,
}

export function UniversityContent({ university, courses, campuses = [], currency }: UniversityContentProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [courseSearch, setCourseSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [campusFilter, setCampusFilter] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Use DB data only - no hardcoded defaults
  const highlights = Array.isArray(university.highlights) && university.highlights.length > 0
    ? university.highlights.map((h: any) => ({ ...h, icon: iconMap[h.icon] || Award }))
    : []

  const requiredDocuments = Array.isArray(university.required_documents) && university.required_documents.length > 0
    ? university.required_documents
    : []

  const faqs = Array.isArray(university.faqs) && university.faqs.length > 0
    ? university.faqs
    : []

  const campusFacilities = Array.isArray(university.campus_facilities) && university.campus_facilities.length > 0
    ? university.campus_facilities
    : []

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.code.toLowerCase().includes(courseSearch.toLowerCase())
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter
    const matchesCampus = campusFilter === 'all' || String(course.campus_id) === campusFilter
    return matchesSearch && matchesLevel && matchesCampus
  })

  const uniqueLevels = [...new Set(courses.map(c => c.level))]

  // Use actual DB values
  const acceptanceRate = university.acceptance_rate ?? null
  const intlStudentsPercent = university.international_students_percentage ?? null

  // Filter visible tabs based on available data
  const visibleTabs = tabs.filter(tab => {
    if (tab.id === 'highlights' && highlights.length === 0) return false
    if (tab.id === 'documents' && requiredDocuments.length === 0) return false
    if (tab.id === 'faqs' && faqs.length === 0) return false
    return true
  })

  return (
    <>
      {/* Hero Section with Cover Image */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <Image
          src={university.cover_image_url || "/hero-bg.jpg"}
          alt={university.name}
          fill
          className="object-cover object-center scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
            {/* University Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-xl p-4 flex items-center justify-center">
              {university.logo_url ? (
                <Image
                  src={university.logo_url || "/placeholder.svg"}
                  alt={`${university.name} logo`}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              ) : (
                <GraduationCap className="w-16 h-16 text-primary" />
              )}
            </div>

            {/* University Info */}
            <div className="flex-1 text-white">
              <div className="flex flex-wrap gap-2 mb-2">
                {university.express_offer_available && (
                  <Badge className="bg-green-500 text-white hover:bg-green-600">
                    Express Offer Available
                  </Badge>
                )}
                {university.rank_world && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    World Rank: #{university.rank_world}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{university.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {university.city}, {university.country}
                </span>
                {university.founded_year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Est. {university.founded_year}
                  </span>
                )}
                {university.website_url && (
                  <a
                    href={university.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="md:self-center">
              <Button size="lg">
                Apply Now
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-6 px-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {acceptanceRate !== null ? `${acceptanceRate}%` : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Acceptance Rate</div>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {university.student_population ? university.student_population.toLocaleString() : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {intlStudentsPercent !== null ? `${intlStudentsPercent}%` : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">International Students</div>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{courses.length}+</div>
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {university.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">About {university.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {university.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {highlights.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Why Study Here?</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {highlights.map((highlight, index) => {
                        const Icon = highlight.icon
                        return (
                          <div key={index} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{highlight.title}</h3>
                              <p className="text-sm text-muted-foreground">{highlight.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {courses.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Popular Courses</h2>
                    <div className="space-y-3">
                      {courses.slice(0, 5).map((course) => (
                        <Link
                          key={course.id}
                          href={`/course/${nameToSlug(course.name, course.code)}`}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {course.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {course.level} {course.duration_years && `• ${course.duration_years} ${course.duration_years === 1 ? 'year' : 'years'}`}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                    {courses.length > 5 && (
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setActiveTab('courses')}
                      >
                        View All {courses.length} Courses
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{university.city}, {university.country}</p>
                      </div>
                    </div>
                    {university.student_population && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Student Population</p>
                          <p className="font-medium text-foreground">{university.student_population.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    {university.intakes && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Intakes</p>
                          <p className="font-medium text-foreground">{university.intakes}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <Button className="w-full" size="lg">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Book a Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none min-w-[200px]"
                >
                  <option value="all">All Levels</option>
                  {uniqueLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              {campuses.length > 1 && (
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={campusFilter}
                    onChange={(e) => setCampusFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none min-w-[200px]"
                  >
                    <option value="all">All Campuses</option>
                    {campuses.map(campus => (
                      <option key={campus.id} value={String(campus.id)}>
                        {campus.location || campus.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>

            <div className="grid gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="secondary">{course.level}</Badge>
                          <Badge variant="outline">{course.code}</Badge>
                          {course.university_campuses && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {course.university_campuses.location || course.university_campuses.name}
                            </Badge>
                          )}
                        </div>
                        <Link
                          href={`/course/${nameToSlug(course.name, course.code)}`}
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {course.name}
                        </Link>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          {course.duration_years && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration_years} {course.duration_years === 1 ? 'year' : 'years'}
                            </span>
                          )}
                          {course.intake_months && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {course.intake_months}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {course.tuition_fees_international && (
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Tuition Fee</p>
                            <p className="text-lg font-semibold text-foreground">
                              {currency || ''} {course.tuition_fees_international.toLocaleString()}/year
                            </p>
                          </div>
                        )}
                        <Button asChild size="sm">
                          <Link href={`/course/${nameToSlug(course.name, course.code)}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 'highlights' && highlights.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{highlight.title}</h3>
                      <p className="text-muted-foreground">{highlight.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Key Statistics - only show items that have real data */}
            {(acceptanceRate !== null || university.employment_rate || university.nationalities_count || university.partner_universities_count) && (
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Key Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {acceptanceRate !== null && (
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold text-primary">{acceptanceRate}%</div>
                        <div className="text-sm text-muted-foreground mt-1">Acceptance Rate</div>
                      </div>
                    )}
                    {university.employment_rate && (
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold text-primary">{university.employment_rate}</div>
                        <div className="text-sm text-muted-foreground mt-1">Employment Rate</div>
                      </div>
                    )}
                    {university.nationalities_count && (
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold text-primary">{university.nationalities_count}+</div>
                        <div className="text-sm text-muted-foreground mt-1">Nationalities</div>
                      </div>
                    )}
                    {university.partner_universities_count && (
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold text-primary">{university.partner_universities_count}+</div>
                        <div className="text-sm text-muted-foreground mt-1">Partner Universities</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Campuses Tab */}
        {activeTab === 'campuses' && (
          <div className="space-y-6">
            {campuses.length > 0 ? (
              campuses.map((campus) => {
                const campusCourses = courses.filter(c => c.campus_id === campus.id)
                return (
                  <Card key={campus.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 h-48 bg-muted rounded-lg overflow-hidden relative">
                          <Image
                            src="/hero-bg.jpg"
                            alt={`${campus.name} Campus`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {campus.is_main_campus && <Badge>Main Campus</Badge>}
                            {!campus.is_main_campus && <Badge variant="secondary">Branch Campus</Badge>}
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{campus.name}</h3>
                          {campus.description && (
                            <p className="text-muted-foreground mb-4">{campus.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm">
                            {campus.location && (
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {campus.location}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <GraduationCap className="w-4 h-4" />
                              {campusCourses.length} {campusCourses.length === 1 ? 'Course' : 'Courses'}
                            </span>
                          </div>
                          {campusCourses.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <p className="text-sm font-medium text-foreground mb-2">Courses at this campus:</p>
                              <div className="flex flex-wrap gap-2">
                                {campusCourses.slice(0, 5).map(c => (
                                  <Link key={c.id} href={`/course/${nameToSlug(c.name, c.code)}`}>
                                    <Badge variant="outline" className="hover:bg-muted cursor-pointer">{c.name}</Badge>
                                  </Link>
                                ))}
                                {campusCourses.length > 5 && (
                                  <Badge variant="outline">+{campusCourses.length - 5} more</Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 h-48 bg-muted rounded-lg overflow-hidden relative">
                      <Image
                        src="/hero-bg.jpg"
                        alt="Main Campus"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2">Main Campus</Badge>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{university.city} Campus</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {university.city}, {university.country}
                        </span>
                        {university.campus_type && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Building2 className="w-4 h-4" />
                            {university.campus_type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {campusFacilities.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Campus Facilities</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {campusFacilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-foreground">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Required Documents Tab */}
        {activeTab === 'documents' && requiredDocuments.length > 0 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Required Documents for Application</h2>
                <div className="space-y-4">
                  {requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Need Help with Your Application?</h3>
                <p className="text-muted-foreground mb-4">
                  Our expert counselors can guide you through the application process and help you prepare all required documents.
                </p>
                <Button>Book a Free Consultation</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && faqs.length > 0 && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${expandedFaq === index ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-muted-foreground border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
