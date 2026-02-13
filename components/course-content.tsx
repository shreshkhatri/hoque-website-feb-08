'use client'

import Link from 'next/link'
import { Course } from '@/lib/supabase'
import {
  ArrowLeft,
  Clock,
  GraduationCap,
  Zap,
  BookOpen,
  CheckCircle,
  Globe,
  FileText,
  Award,
  Star,
  MapPin,
  Calendar,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

function nameToSlug(name: string, code?: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return code ? `${base}-${code.toLowerCase()}` : base
}

function nameToUniSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface CourseWithUniversity extends Course {
  universities?: { id: number; name: string; city: string; country_id: number | null }
}

interface SimilarCourse {
  id: number
  name: string
  code: string
  level: string
  tuition_fees_international: number | null
  duration_years: number | null
  field_of_study: string | null
  universities: { id: number; name: string; city: string } | null
  countries: { id: number; name: string; flag_emoji: string } | null
}

interface CourseContentProps {
  course: CourseWithUniversity
  similarCourses?: SimilarCourse[]
}

function renderMultilineText(text: string) {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('- ')) {
      return (
        <li key={i} className="flex items-start gap-2.5 text-muted-foreground leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
          <span>{trimmed.slice(2)}</span>
        </li>
      )
    }
    return (
      <p key={i} className="text-muted-foreground leading-relaxed">
        {trimmed}
      </p>
    )
  })
}

export function CourseContent({ course, similarCourses = [] }: CourseContentProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Undergraduate':
        return 'bg-accent/10 text-accent'
      case 'Master':
        return 'bg-primary/10 text-primary'
      case 'PhD':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const universityName =
    course.universities && typeof course.universities === 'object' && 'name' in course.universities
      ? course.universities.name
      : ''

  const universityCity =
    course.universities && typeof course.universities === 'object' && 'city' in course.universities
      ? course.universities.city
      : ''

  const universitySlug = universityName ? nameToUniSlug(universityName) : ''

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        <span>Back to Courses</span>
      </Link>

      {/* Course Hero Header */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
        <div className="bg-primary/5 px-8 py-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                course.level
              )}`}
            >
              {course.level}
            </span>
            {course.field_of_study && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {course.field_of_study}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            {course.name}
          </h1>
          {universityName && (
            <div className="flex items-center gap-2 mt-4">
              <GraduationCap size={18} className="text-muted-foreground" />
              <Link
                href={`/university/${universitySlug}`}
                className="text-primary font-semibold hover:underline"
              >
                {universityName}
              </Link>
              {universityCity && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <MapPin size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{universityCity}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border border-t border-border">
          {course.duration_years && (
            <div className="flex items-center gap-3 px-5 py-4">
              <Clock size={20} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
                <p className="text-sm font-semibold text-foreground">
                  {course.duration_years} year{course.duration_years > 1 ? 's' : ''} full-time
                </p>
              </div>
            </div>
          )}
          {course.tuition_fees_international && (
            <div className="flex items-center gap-3 px-5 py-4">
              <Zap size={20} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Tuition (Int{"'"}l)</p>
                <p className="text-sm font-semibold text-foreground">
                  {'\u00A3'}{course.tuition_fees_international.toLocaleString()}/yr
                </p>
              </div>
            </div>
          )}
          {course.intake_months && (
            <div className="flex items-center gap-3 px-5 py-4">
              <Calendar size={20} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Intakes</p>
                <p className="text-sm font-semibold text-foreground">{course.intake_months}</p>
              </div>
            </div>
          )}
          {course.level && (
            <div className="flex items-center gap-3 px-5 py-4">
              <BookOpen size={20} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Level</p>
                <p className="text-sm font-semibold text-foreground">{course.level}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 px-5 py-4">
            <Award size={20} className="text-accent flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Scholarship</p>
              <p className="text-sm font-semibold text-foreground">
                {course.scholarships ? 'Available' : 'Check with University'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout: Main content + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Course Overview */}
          {(course.course_overview || course.description) && (
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                <BookOpen size={22} className="text-primary" />
                Course Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.course_overview || course.description}
              </p>
            </section>
          )}

          {/* Key Features */}
          {course.key_features && (
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2.5">
                <Star size={22} className="text-primary" />
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.key_features.split('\n').filter(l => l.trim()).map((line, i) => {
                  const text = line.trim().replace(/^-\s*/, '')
                  if (!text) return null
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{text}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Entry Requirements */}
          <section className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2.5">
              <CheckCircle size={22} className="text-primary" />
              Requirements
            </h2>
            <div className="space-y-0 divide-y divide-border">
              {/* Academic Requirements */}
              {course.academic_requirements && (
                <div className="pb-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={16} className="text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Academic Requirements</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-[42px] text-sm">
                    {course.academic_requirements}
                  </p>
                </div>
              )}

              {/* English Language Requirements */}
              {course.english_language_requirements && (
                <div className="py-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Globe size={16} className="text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">English Language Requirements</h3>
                  </div>
                  <div className="pl-[42px] space-y-1.5">
                    {course.english_language_requirements.split(/\.\s+/).filter(s => s.trim()).map((sentence, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                        <span>{sentence.trim().replace(/\.$/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Requirements */}
              {course.other_requirements && (
                <div className="pt-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Other Requirements</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-[42px] text-sm">
                    {course.other_requirements}
                  </p>
                </div>
              )}

              {/* Fallback to single entry_requirements field */}
              {!course.academic_requirements && !course.english_language_requirements && course.entry_requirements && (
                <div className="pb-2">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {course.entry_requirements}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Document Requirements */}
          {course.document_requirements && (
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2.5">
                <FileText size={22} className="text-primary" />
                Document Requirements
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.document_requirements.split('\n').filter(l => l.trim()).map((line, i) => {
                  const text = line.trim().replace(/^-\s*/, '')
                  if (!text) return null
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <FileText size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{text}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Fees */}
          {course.tuition_fees_international && (
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                <Zap size={22} className="text-primary" />
                Fees
              </h2>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {'\u00A3'}{course.tuition_fees_international.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">per year (International students)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Fees may vary depending on nationality and funding arrangements. Please check with the university for the most up-to-date fee information.
                </p>
              </div>
            </section>
          )}

          {/* Scholarships */}
          {course.scholarships && (
            <section className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2.5">
                <Award size={22} className="text-primary" />
                Scholarships
              </h2>
              <ul className="space-y-2.5">
                {renderMultilineText(course.scholarships)}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Ready to Apply Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Ready to Apply?</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Our expert consultants can help you prepare a strong application and secure admission to {course.name}.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">
                    Apply Now
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/contact">
                    <MessageCircle size={16} className="mr-2" />
                    Book a Consultation
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-3.5">
                {course.code && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Course Code</span>
                    <span className="font-medium text-foreground">{course.code}</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium text-foreground">{course.level}</span>
                  </div>
                )}
                {course.duration_years && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium text-foreground">
                      {course.duration_years} year{course.duration_years > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {course.intake_months && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Intakes</span>
                    <span className="font-medium text-foreground text-right max-w-[140px]">{course.intake_months}</span>
                  </div>
                )}
                {course.field_of_study && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Field</span>
                    <span className="font-medium text-foreground text-right max-w-[140px]">{course.field_of_study}</span>
                  </div>
                )}
              </div>
            </div>

            {/* University Info */}
            {universityName && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-base font-bold text-foreground mb-3">University</h3>
                <Link
                  href={`/university/${universitySlug}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                      {universityName}
                    </p>
                    {universityCity && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} />
                        {universityCity}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Similar Courses Section */}
      {similarCourses.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Similar Courses</h2>
          <p className="text-muted-foreground mb-8">
            Explore similar {course.field_of_study || ''} programmes at other universities worldwide
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similarCourses.map((sc) => (
              <Link
                key={sc.id}
                href={`/course/${nameToSlug(sc.name, sc.code)}`}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${getLevelColor(sc.level)}`}
                  >
                    {sc.level}
                  </span>
                  {sc.countries?.flag_emoji && (
                    <span className="text-sm" title={sc.countries.name}>{sc.countries.flag_emoji}</span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-balance leading-snug">
                  {sc.name}
                </h3>
                {sc.universities?.name && (
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                    <GraduationCap size={12} />
                    {sc.universities.name}
                    {sc.universities.city && `, ${sc.universities.city}`}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                  {sc.tuition_fees_international && (
                    <span className="font-medium">
                      {'\u00A3'}{sc.tuition_fees_international.toLocaleString()}/yr
                    </span>
                  )}
                  {sc.duration_years && (
                    <span>
                      {sc.duration_years} yr{sc.duration_years > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
