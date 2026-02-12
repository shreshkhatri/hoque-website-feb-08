'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Zap, GraduationCap } from 'lucide-react'
import { Course, nameToSlug } from '@/lib/supabase'

interface CourseWithUniversity extends Course {
  universities?: { id: number; name: string; city: string }
}

export function TopCourses() {
  const [courses, setCourses] = useState<CourseWithUniversity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/courses?limit=6')
      const result = await response.json()
      setCourses(result.data || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
      setCourses([])
    } finally {
      setLoading(false)
    }
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Featured Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge programmes across various disciplines from our partner universities.
          </p>
        </div>

        {/* Courses grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${nameToSlug(course.name, course.code)}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                {/* Course level badge */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                      course.level,
                    )}`}
                  >
                    {course.level}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {course.code}
                  </span>
                </div>

                {/* Course name */}
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {course.name}
                </h3>

                {/* University */}
                {course.universities && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {typeof course.universities === 'object' &&
                    'name' in course.universities
                      ? course.universities.name
                      : 'University'}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course details */}
                <div className="space-y-2 py-4 border-t border-b border-border mb-4">
                  {course.duration_years && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>
                        {course.duration_years} year
                        {course.duration_years > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {course.level === 'Undergraduate' && (
                    <div className="flex items-center space-x-2 text-sm">
                      <GraduationCap size={16} className="text-accent" />
                      <span>Bachelor's Degree</span>
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

                {/* Entry requirements preview */}
                {course.entry_requirements && (
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-1">
                    <span className="font-semibold">Requirements:</span>{' '}
                    {course.entry_requirements}
                  </p>
                )}

                {/* CTA */}
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
        )}

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span>Explore All Courses</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
