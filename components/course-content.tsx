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
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Helper to convert name to slug
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface CourseWithUniversity extends Course {
  universities?: { id: number; name: string; city: string }
}

interface CourseContentProps {
  course: CourseWithUniversity
}

export function CourseContent({ course }: CourseContentProps) {
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

  const universityName =
    course.universities && typeof course.universities === 'object' && 'name' in course.universities
      ? course.universities.name
      : ''

  const universitySlug = universityName ? nameToSlug(universityName) : ''

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back button */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Courses</span>
      </Link>

      {/* Course Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-border rounded-xl p-8 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                  course.level
                )}`}
              >
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {course.name}
            </h1>
            <p className="text-lg text-muted-foreground">Code: {course.code}</p>
          </div>
        </div>

        {universityName && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-1">Offered by</p>
            <Link
              href={`/university/${universitySlug}`}
              className="text-lg font-semibold text-primary hover:underline"
            >
              {universityName}
            </Link>
          </div>
        )}
      </div>

      {/* Course Description */}
      {course.description && (
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            About This Course
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {course.description}
          </p>
        </div>
      )}

      {/* Key Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {course.duration_years && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Duration</h3>
            </div>
            <p className="text-muted-foreground">
              {course.duration_years} year{course.duration_years > 1 ? 's' : ''} full-time
            </p>
          </div>
        )}

        {course.tuition_fees_international && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={24} className="text-orange-500" />
              <h3 className="text-lg font-semibold text-foreground">Tuition Fees</h3>
            </div>
            <p className="text-muted-foreground">
              £{course.tuition_fees_international.toLocaleString()} per year (International)
            </p>
          </div>
        )}

        {course.intake_months && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Intake Months</h3>
            </div>
            <p className="text-muted-foreground">{course.intake_months}</p>
          </div>
        )}

        {course.level && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Level</h3>
            </div>
            <p className="text-muted-foreground">{course.level}</p>
          </div>
        )}
      </div>

      {/* Entry Requirements */}
      {course.entry_requirements && (
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle size={28} className="text-primary" />
            <span>Entry Requirements</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {course.entry_requirements}
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Apply?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our expert consultants can help you prepare a strong application, ace
          interviews, and secure admission to {course.name}.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get Started Today</Link>
        </Button>
      </div>
    </main>
  )
}
