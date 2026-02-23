import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, GraduationCap, CalendarDays, ArrowRight } from 'lucide-react'

export function FeaturedScholarship() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Content */}
            <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              {/* Tag */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-500 text-white rounded-full">
                  <Clock className="h-3 w-3" />
                  Limited Time Offer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/15 text-white/90 rounded-full">
                  September 2026 Intake
                </span>
              </div>

              {/* University Name */}
              <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">
                University of Hertfordshire
              </p>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-balance leading-tight">
                Super Early Bird
                <br />
                <span className="text-red-400">PG Scholarship</span>
              </h2>

              {/* Amount */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  {'£3,500'}
                </span>
                <span className="text-base text-white/60 font-medium">scholarship</span>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5">
                  <CalendarDays className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/50 font-medium">Deadline</p>
                    <p className="text-sm font-bold text-white">28th Feb 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5">
                  <GraduationCap className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/50 font-medium">Programme</p>
                    <p className="text-sm font-bold text-white">Postgraduate</p>
                  </div>
                </div>
              </div>

              {/* Confirm Notice */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
                <p className="text-sm text-white/80 leading-relaxed">
                  Apply and pay <span className="font-bold text-white">{'£1,000'}</span> now to confirm your seat and lock in the scholarship.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-8 py-6 text-base shadow-lg shadow-red-500/25"
                >
                  <Link href="/contact">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-base"
                >
                  <Link href="/university/university-of-hertfordshire">
                    View University
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-base"
                >
                  <Link href="/announcements">
                    View More Scholarships
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden lg:block">
              <Image
                src="/images/uh-scholarship-offer.jpeg"
                alt="University of Hertfordshire Super Early Bird PG Scholarship - £3500 for September 2026 intake"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 0vw, 50vw"
                priority
              />
              {/* Gradient overlay for blending */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
