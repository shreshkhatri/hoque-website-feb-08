'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Building2 } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTAConsultation } from '@/components/cta-consultation'

type Partner = { id: number; name: string; logo_url: string | null }

const ITEMS_PER_PAGE = 9

export function PartnersClient() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    fetch('/api/partner-universities')
      .then((r) => r.json())
      .then((data) => setPartners(data.universities || []))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false))
  }, [])

  const displayedPartners = partners.slice(0, displayedCount)
  const hasMore = displayedCount < partners.length

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Our University Partners
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with leading universities across the UK and internationally to provide
            the best opportunities for international students
          </p>
          {!loading && (
            <p className="text-sm text-muted-foreground">
              {partners.length} active partner {partners.length === 1 ? 'university' : 'universities'}
            </p>
          )}
        </div>

        {/* Skeleton loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-card border border-border rounded-lg">
                <div className="w-full h-32 bg-muted rounded animate-pulse mb-4" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Partners Grid */}
        {!loading && partners.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Building2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No active partners at this time.</p>
            <p className="text-sm mt-1">Please check back soon.</p>
          </div>
        )}

        {!loading && partners.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayedPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        width={140}
                        height={140}
                        className="opacity-70 group-hover:opacity-100 transition-opacity object-contain max-h-28"
                      />
                    ) : (
                      <Building2 className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <p className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors text-center text-balance line-clamp-3">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={() => setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, partners.length))}
                  className="inline-flex items-center space-x-2 px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span>Load More Partners</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            )}

            <div className="text-center mt-8 text-muted-foreground">
              <p className="text-sm">
                Showing {displayedPartners.length} of {partners.length} active partners
              </p>
            </div>
          </>
        )}
      </div>

      <CTAConsultation
        heading="Interested in our partner universities?"
        description="Our counsellors can connect you with the right partner university, guide your application, and help you secure your place at a top institution."
        badge="Partner university access"
      />
      <Footer />
    </div>
  )
}
