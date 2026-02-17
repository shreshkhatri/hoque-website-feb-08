'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Users,
  Smile,
  Briefcase,
  GraduationCap,

  Clock,
  DollarSign,
  Home,
  Utensils,
  Bus,
  Zap,
  Heart,
  FileText,
  Building2,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  Globe,
  Award,
  MapPin,
  Search,
  Filter,
} from 'lucide-react'
import { Country, University, Course, CountryFunFact, CountryEmploymentSector } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface WhatSetsApartItem {
  id: number
  title: string
  description: string
  icon: string
  display_order: number
}

interface CountryContentProps {
  country: Country
  universities: University[]
  courses: (Course & { university_campuses?: { id: number; name: string; location: string | null; is_main_campus: boolean } | null })[]
  funFacts?: CountryFunFact[]
  employmentSectors?: CountryEmploymentSector[]
  whatSetsApart?: WhatSetsApartItem[]
}

const iconMap: Record<string, any> = {
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
  'users': Users,
  'trending-up': TrendingUp,
  'award': Award,
  'globe': Globe,
  'book-open': BookOpen,
  'heart': Heart,
  'sparkles': Sparkles,
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'universities', label: 'Universities', icon: Building2 },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'student-life', label: 'Student Life', icon: Heart },
  { id: 'visa', label: 'Visa & Work', icon: FileText },
  { id: 'faqs', label: 'FAQs', icon: ChevronDown },
]

// All country data now comes from the database. These are minimal placeholders
// only used when a database field is completely empty.
const defaultPlaceholders = {
  intlStudents: 'N/A',
  happinessRank: null,
  employmentRate: null,
  currency: 'USD',
  minWage: 'N/A',
  maxWorkHours: 20,
  costOfLiving: {
    accommodation: { min: 0, max: 0 },
    food: { min: 0, max: 0 },
    transport: { min: 0, max: 0 },
    utilities: { min: 0, max: 0 },
    healthInsurance: { min: 0, max: 0 },
  },
  studentVisa: {
    eligibility: 'Please contact us for visa eligibility details.',
    validity: 'Varies by programme',
  },
  postStudyVisa: {
    eligibility: 'Please contact us for post-study visa eligibility details.',
    validity: 'Varies by qualification',
  },
}

export function CountryContent({ country, universities, courses, funFacts = [], employmentSectors = [], whatSetsApart = [] }: CountryContentProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [uniSearch, setUniSearch] = useState('')
  const [courseSearch, setCourseSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  // All data comes from the database; minimal placeholders only when DB field is empty
  const countryData = {
    intlStudents: country.international_students_count || defaultPlaceholders.intlStudents,
    happinessRank: country.happiness_ranking ?? defaultPlaceholders.happinessRank,
    employmentRate: country.employment_rate ?? defaultPlaceholders.employmentRate,
    currency: country.currency || defaultPlaceholders.currency,
    minWage: country.min_wage || defaultPlaceholders.minWage,
    maxWorkHours: country.max_work_hours || defaultPlaceholders.maxWorkHours,
    costOfLiving: {
      accommodation: { 
        min: country.cost_accommodation_min ?? defaultPlaceholders.costOfLiving.accommodation.min, 
        max: country.cost_accommodation_max ?? defaultPlaceholders.costOfLiving.accommodation.max 
      },
      food: { 
        min: country.cost_food_min ?? defaultPlaceholders.costOfLiving.food.min, 
        max: country.cost_food_max ?? defaultPlaceholders.costOfLiving.food.max 
      },
      transport: { 
        min: country.cost_transport_min ?? defaultPlaceholders.costOfLiving.transport.min, 
        max: country.cost_transport_max ?? defaultPlaceholders.costOfLiving.transport.max 
      },
      utilities: { 
        min: country.cost_utilities_min ?? defaultPlaceholders.costOfLiving.utilities.min, 
        max: country.cost_utilities_max ?? defaultPlaceholders.costOfLiving.utilities.max 
      },
      healthInsurance: { 
        min: country.cost_health_insurance_min ?? defaultPlaceholders.costOfLiving.healthInsurance.min, 
        max: country.cost_health_insurance_max ?? defaultPlaceholders.costOfLiving.healthInsurance.max 
      },
    },
    studentVisa: {
      eligibility: country.student_visa_eligibility || defaultPlaceholders.studentVisa.eligibility,
      validity: country.student_visa_validity || defaultPlaceholders.studentVisa.validity,
    },
    postStudyVisa: {
      eligibility: country.post_study_visa_eligibility || defaultPlaceholders.postStudyVisa.eligibility,
      validity: country.post_study_visa_validity || defaultPlaceholders.postStudyVisa.validity,
    },
    employmentSectors: employmentSectors.length > 0 
      ? employmentSectors.map(s => ({ sector: s.sector_name, demand: s.demand_level }))
      : [],
    funFacts: funFacts.length > 0 
      ? funFacts.map(f => f.fact)
      : [],
    faqs: Array.isArray(country.faqs) && country.faqs.length > 0
    ? country.faqs
    : [],
  }

  // Auto-rotate fun facts (only when there are facts to show)
  useEffect(() => {
    if (countryData.funFacts.length === 0) return
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % countryData.funFacts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [countryData.funFacts.length])

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
    uni.city.toLowerCase().includes(uniSearch.toLowerCase())
  )

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
                         course.code.toLowerCase().includes(courseSearch.toLowerCase())
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const uniqueLevels = [...new Set(courses.map(c => c.level))]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <Image
          src={`/landmarks/${country.name.toLowerCase().replace(/\s+/g, '-')}-landmark.jpg`}
          alt={`Study in ${country.name}`}
          fill
          className="object-cover mix-blend-overlay"
          priority
          onError={(e) => {
            e.currentTarget.src = '/hero-bg.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <div className="text-white">
            <p className="text-lg md:text-xl mb-2 opacity-90">Transform your life in the hub of global education</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl md:text-6xl">{country.flag_emoji}</span>
              <h1 className="text-3xl md:text-5xl font-bold">Study in {country.name}</h1>
            </div>
            <Button size="lg" className="mt-4">
              Explore Universities
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-6 px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{countryData.intlStudents}</div>
              <div className="text-sm text-muted-foreground">International Students</div>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Smile className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{countryData.happinessRank}</div>
              <div className="text-sm text-muted-foreground">Happiness Ranking</div>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{countryData.employmentRate}%</div>
              <div className="text-sm text-muted-foreground">Employment Rate</div>
            </div>
            <div className="py-6 px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary">{universities.length}+</div>
              <div className="text-sm text-muted-foreground">Partner Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
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
          <div className="space-y-12">
            {/* Why Study Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Why study in {country.name}
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground leading-relaxed text-lg [&_h2]:text-foreground [&_h3]:text-foreground [&_a]:text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                    dangerouslySetInnerHTML={{
                      __html: country.description || `${country.name} is a leading study destination with an excellent higher education system and a multicultural environment. The country is known for its world-renowned universities, providing students with excellent academic opportunities and career prospects. Apart from academics, the benefits of studying here include helping you land an awesome career and experience a great lifestyle.`
                    }}
                  />
                </CardContent>
              </Card>
            </section>

            {/* About the Country */}
            {country.about && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  About {country.name}
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground leading-relaxed text-lg [&_h2]:text-foreground [&_h3]:text-foreground [&_a]:text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                      dangerouslySetInnerHTML={{ __html: country.about }}
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            {/* What Sets Apart */}
            {whatSetsApart.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What sets {country.name} apart
                </h2>
                <div className={`grid md:grid-cols-2 ${whatSetsApart.length >= 4 ? 'lg:grid-cols-4' : whatSetsApart.length === 3 ? 'lg:grid-cols-3' : ''} gap-4`}>
                  {whatSetsApart.map((item) => {
                    const IconComp = iconMap[item.icon] || Award
                    return (
                      <Card key={item.id}>
                        <CardContent className="p-6 text-center">
                          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComp className="w-7 h-7 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Popular Universities Preview */}
            {universities.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Top Universities
                  </h2>
                  <Button variant="outline" onClick={() => setActiveTab('universities')}>
                    View All
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {universities.slice(0, 3).map((uni) => (
                    <Link
                      key={uni.id}
                      href={`/university/${nameToSlug(uni.name)}`}
                      className="group"
                    >
                      <Card className="h-full hover:border-accent transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {uni.name}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {uni.city}
                              </p>
                              {uni.rank_world && (
                                <Badge variant="secondary" className="mt-2">World Rank #{uni.rank_world}</Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

              {/* Fun Facts Carousel */}
              {countryData.funFacts.length > 0 && (
              <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Did you know?</h3>
                  <p className="text-muted-foreground text-lg transition-opacity duration-500">
                    {countryData.funFacts[currentFactIndex]}
                  </p>
                  <div className="flex gap-2 mt-4">
                    {countryData.funFacts.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFactIndex(index)}
                        aria-label={`View fun fact ${index + 1}`}
                        aria-current={index === currentFactIndex ? 'true' : 'false'}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentFactIndex ? 'bg-primary' : 'bg-primary/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
              )}
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={uniSearch}
                  onChange={(e) => setUniSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <p className="text-muted-foreground">
              Showing {filteredUniversities.length} of {universities.length} universities
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((uni) => (
                <Link
                  key={uni.id}
                  href={`/university/${nameToSlug(uni.name)}`}
                  className="group"
                >
                  <Card className="h-full hover:border-accent hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          {uni.logo_url ? (
                            <Image src={uni.logo_url || "/placeholder.svg"} alt={uni.name} width={40} height={40} className="object-contain" />
                          ) : (
                            <GraduationCap className="w-7 h-7 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {uni.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {uni.city}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {uni.rank_world && (
                              <Badge variant="outline">World #{uni.rank_world}</Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredUniversities.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No universities found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
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
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {course.tuition_fees_international && (
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Tuition Fee</p>
                            <p className="text-lg font-semibold text-foreground">
                              {countryData.currency} {course.tuition_fees_international.toLocaleString()}/year
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

        {/* Student Life Tab */}
        {activeTab === 'student-life' && (
          <div className="space-y-8">
            {/* Part-time Work Info */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Student Life</h2>
              <Card>
                <CardContent className="p-6">
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground leading-relaxed mb-6 [&_h2]:text-foreground [&_h3]:text-foreground [&_a]:text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                    dangerouslySetInnerHTML={{
                      __html: country.study_life || `${country.name} offers a diverse student life and high academic standards. Additionally, the easy access to various accommodation options, part-time jobs, and post-study opportunities is a big plus.`
                    }}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Min. wage per hour for part-time jobs</p>
                      <p className="text-2xl font-bold text-foreground">{countryData.currency} {countryData.minWage}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Max. allowed part-time work hours</p>
                      <p className="text-2xl font-bold text-foreground">{countryData.maxWorkHours} hours a week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Cost of Living */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Cost of Living</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Home className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Accommodation</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        {countryData.currency} {countryData.costOfLiving.accommodation.min} - {countryData.costOfLiving.accommodation.max}/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Utensils className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Food</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        {countryData.currency} {countryData.costOfLiving.food.min} - {countryData.costOfLiving.food.max}/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bus className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Transportation</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        {countryData.currency} {countryData.costOfLiving.transport.min} - {countryData.costOfLiving.transport.max}/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Utilities</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        {countryData.currency} {countryData.costOfLiving.utilities.min} - {countryData.costOfLiving.utilities.max}/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Health Insurance</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        {countryData.currency} {countryData.costOfLiving.healthInsurance.min} - {countryData.costOfLiving.healthInsurance.max}/month
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Employment Opportunities */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Employment Opportunities</h2>
              <Card>
                <CardContent className="p-6">
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground mb-6 [&_h2]:text-foreground [&_h3]:text-foreground [&_a]:text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                    dangerouslySetInnerHTML={{
                      __html: country.opportunities || `${country.name} offers excellent career opportunities for international graduates across various sectors.`
                    }}
                  />
                  {countryData.employmentSectors.length > 0 && (
                    <div className="space-y-3">
                      {countryData.employmentSectors.map((sector: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium text-foreground">{sector.sector}</span>
                          <Badge variant={sector.demand === 'High' ? 'default' : sector.demand === 'Medium' ? 'secondary' : 'outline'}>
                            {sector.demand} Demand
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {/* Visa & Work Tab */}
        {activeTab === 'visa' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Visa and Work Permit</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Student Visa</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                        <div className="prose prose-sm max-w-none text-foreground [&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: countryData.studentVisa.eligibility }} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Validity</p>
                        <div className="prose prose-sm max-w-none text-foreground font-semibold [&_p]:mb-0" dangerouslySetInnerHTML={{ __html: countryData.studentVisa.validity }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Post-Study Work Visa</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                        <div className="prose prose-sm max-w-none text-foreground [&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: countryData.postStudyVisa.eligibility }} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Validity</p>
                        <div className="prose prose-sm max-w-none text-foreground font-semibold [&_p]:mb-0" dangerouslySetInnerHTML={{ __html: countryData.postStudyVisa.validity }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {country.student_permit_requirements && (
              <section>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Visa Requirements</h3>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_a]:text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                      dangerouslySetInnerHTML={{ __html: country.student_permit_requirements }}
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Need help with your visa application?</h3>
                <p className="text-muted-foreground mb-4">
                  Our expert counselors can guide you through the entire visa application process.
                </p>
                <Button>Get Free Consultation</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            {countryData.faqs.length > 0 ? (
              countryData.faqs.map((faq: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-medium text-foreground pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4 text-muted-foreground border-t border-border pt-4">
                        <div className="prose prose-sm max-w-none [&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  FAQs for {country.name} are coming soon. Please contact us for any queries.
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </>
  )
}
