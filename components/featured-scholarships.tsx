'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Award, Calendar, GraduationCap, ArrowRight, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Scholarship {
  id: number
  slug: string
  title: string
  university: string
  country: string
  amount: string
  deadline: string
  daysLeft: number
  description: string
  image: string
  level: string
  type: string
}

const scholarships: Scholarship[] = [
  {
    id: 1,
    slug: 'chevening-scholarship-2026-27',
    title: 'Chevening Scholarship 2026/27',
    university: 'UK Government Funded',
    country: 'United Kingdom',
    amount: 'Full Tuition + Living Costs',
    deadline: '5 November 2026',
    daysLeft: 255,
    description:
      'Fully funded scholarship for outstanding emerging leaders to pursue a one-year master\'s degree in any subject at any UK university.',
    image: '/images/scholarships/chevening-scholarship.jpg',
    level: "Master's",
    type: 'Full',
  },
  {
    id: 2,
    slug: 'commonwealth-shared-scholarship',
    title: 'Commonwealth Shared Scholarship',
    university: 'Multiple UK Universities',
    country: 'United Kingdom',
    amount: 'Up to \u00a335,000',
    deadline: '19 December 2026',
    daysLeft: 299,
    description:
      'For students from developing Commonwealth countries who could not otherwise afford to study in the UK. Covers tuition, living expenses, and airfare.',
    image: '/images/scholarships/commonwealth-scholarship.jpg',
    level: "Master's",
    type: 'Full',
  },
  {
    id: 3,
    slug: 'gates-cambridge-scholarship',
    title: 'Gates Cambridge Scholarship',
    university: 'University of Cambridge',
    country: 'United Kingdom',
    amount: 'Full Cost of Study',
    deadline: '10 October 2026',
    daysLeft: 229,
    description:
      'Prestigious award covering the full cost of studying at Cambridge, including tuition, maintenance allowance, and travel costs.',
    image: '/images/scholarships/gates-cambridge-scholarship.jpg',
    level: 'PhD / Master\'s',
    type: 'Full',
  },
  {
    id: 4,
    slug: 'super-early-bird-pg-scholarship-uh',
    title: 'Super Early Bird PG Scholarship',
    university: 'University of Hertfordshire',
    country: 'United Kingdom',
    amount: '\u00a33,500',
    deadline: '28 February 2026',
    daysLeft: 5,
    description:
      'September 2026 intake postgraduate scholarship. Apply and pay \u00a31,000 now to confirm your seat and scholarship at the University of Hertfordshire.',
    image: '/images/scholarships/uh-scholarship.jpg',
    level: 'Postgraduate',
    type: 'Partial',
  },
]

export function FeaturedScholarships() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Financial Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Latest Scholarship Opportunities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the latest scholarships and funding opportunities available for
            international students at top UK universities.
          </p>
        </div>

        {/* Scholarship Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((scholarship) => (
            <Link
              key={scholarship.id}
              href={`/announcements?type=scholarship&slug=${scholarship.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent/50 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={scholarship.image}
                  alt={scholarship.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-accent text-accent-foreground text-xs font-semibold shadow-md border-0">
                    <Award className="h-3 w-3 mr-1" />
                    {scholarship.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-card/90 text-foreground text-xs font-medium backdrop-blur-sm border-0 shadow-md">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {scholarship.level}
                  </Badge>
                </div>

                {/* Amount overlay at bottom of image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-lg font-bold text-card drop-shadow-lg">
                    {scholarship.amount}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-grow p-5">
                {/* Title */}
                <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {scholarship.title}
                </h3>

                {/* University & Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{scholarship.university}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {scholarship.description}
                </p>

                {/* Deadline */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{scholarship.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span
                      className={
                        scholarship.daysLeft <= 60
                          ? 'text-destructive-foreground'
                          : 'text-accent'
                      }
                    >
                      {scholarship.daysLeft}d left
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <Link
            href="/announcements?type=scholarship"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-200 group"
          >
            View More Scholarships
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
