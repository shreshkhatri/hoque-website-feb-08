import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTAScholarships } from '@/components/cta-scholarships'
import { Skeleton } from '@/components/ui/skeleton'
import ScholarshipsClient from './client'
import { Award } from 'lucide-react'

export const revalidate = 60

export const metadata = {
  title: 'Scholarships | HOQUE',
  description: 'Discover scholarships for international students across the UK, Australia, Canada, Ireland, New Zealand, USA, and Dubai. Find funding for your education abroad.',
}

export default function ScholarshipsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Funding Opportunities</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Scholarships for International Students
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
              Explore prestigious scholarships across top study destinations. From the Chevening Scholarship in the UK to the Fulbright Program in the USA, find the right funding for your academic journey.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Suspense fallback={<LoadingState />}>
            <ScholarshipsClient />
          </Suspense>
        </div>
        <CTAScholarships />
      </div>
      <Footer />
    </>
  )
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="flex gap-3">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
