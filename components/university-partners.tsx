'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Building2 } from 'lucide-react'

type Partner = { id: number; name: string; logo_url: string | null }

export function UniversityPartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/partner-universities')
      .then((r) => r.json())
      .then((data) => setPartners(data.universities || []))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-muted rounded animate-pulse mx-auto mb-12" />
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-40 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (partners.length === 0) return null

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Our Network
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            University Partners
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with leading universities across the UK and internationally
            to bring you the best opportunities
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-4 sm:space-x-6 lg:space-x-8">
            {/* First set */}
            {partners.map((partner) => (
              <PartnerCard key={`first-${partner.id}`} partner={partner} />
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner) => (
              <PartnerCard key={`second-${partner.id}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            We continually expand our partnership network to bring you more
            opportunities and options.
          </p>
          <Link
            href="/partner-universities"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-foreground to-accent text-white rounded-full font-semibold uppercase tracking-wider hover:shadow-lg hover:brightness-110 transition-all"
          >
            <span>View All Partners</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="group flex-shrink-0 w-40 sm:w-48 md:w-56 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300">
      <div className="text-center w-full">
        <div className="mb-2 sm:mb-3 flex justify-center h-20 sm:h-24 md:h-28 items-center">
          {partner.logo_url ? (
            <Image
              src={partner.logo_url}
              alt={partner.name}
              width={100}
              height={100}
              className="opacity-70 group-hover:opacity-100 transition-opacity object-contain"
            />
          ) : (
            <Building2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        <p className="text-xs sm:text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors text-balance line-clamp-2">
          {partner.name}
        </p>
      </div>
    </div>
  )
}
