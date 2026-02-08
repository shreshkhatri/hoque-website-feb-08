'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Globe, Users, BookOpen } from 'lucide-react'
import { University, nameToSlug } from '@/lib/supabase'

export function TopUniversities() {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/universities?limit=6')
      const result = await response.json()
      setUniversities(result.data || [])
    } catch (error) {
      console.error('Error fetching universities:', error)
      setUniversities([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Top UK Universities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the world's most prestigious institutions offering exceptional education and research opportunities.
          </p>
        </div>

        {/* Universities grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 animate-pulse"
              >
                <div className="h-40 bg-muted rounded-lg mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <Link
                key={uni.id}
                href={`/university/${nameToSlug(uni.name)}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {uni.city}, {uni.country}
                    </p>
                  </div>
                  <div className="text-right">
                    {uni.rank_uk && (
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold">
                        #{uni.rank_uk}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {uni.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-t border-b border-border">
                  {uni.founded_year && (
                    <div className="flex items-center space-x-2">
                      <BookOpen size={16} className="text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Founded
                        </div>
                        <div className="font-semibold text-foreground">
                          {uni.founded_year}
                        </div>
                      </div>
                    </div>
                  )}
                  {uni.student_population && (
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Students
                        </div>
                        <div className="font-semibold text-foreground">
                          {uni.student_population.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Global rank */}
                {uni.rank_world && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe size={16} className="text-accent" />
                    <span className="text-sm text-foreground">
                      Global Rank: <span className="font-semibold">#{uni.rank_world}</span>
                    </span>
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border group-hover:text-primary transition-colors">
                  <span className="text-sm font-medium">View Details</span>
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
            href="/universities"
            className="inline-flex items-center space-x-2 px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span>View All Universities</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
