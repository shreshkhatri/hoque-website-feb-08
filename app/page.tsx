'use client';

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { AboutSection } from '@/components/about-section'
import { SearchFilter } from '@/components/search-filter'
import { ExploreDestinations } from '@/components/explore-destinations'
import { ServicesSection } from '@/components/services-section'
import { ApplicationProcess } from '@/components/application-process'
import { QuickOverview } from '@/components/quick-overview'
// import { TopUniversities } from '@/components/top-universities'
// import { UpcomingEvents } from '@/components/upcoming-events'
import { FeaturedScholarships } from '@/components/featured-scholarships'
import { CTAHomepage } from '@/components/cta-homepage'
import { StudentTestimonials } from '@/components/student-testimonials'
import { UniversityPartners } from '@/components/university-partners'
import { Footer } from '@/components/footer'
import { initializeDatabase } from '@/lib/supabase'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AboutSection />
      <ExploreDestinations />
      <SearchFilter />
      <ServicesSection />
      <ApplicationProcess />
      <QuickOverview />
      {/* <TopUniversities /> */}
      {/* <UpcomingEvents /> */}
      <FeaturedScholarships />
      <StudentTestimonials />
      <CTAHomepage />
      <UniversityPartners />
      <Footer />
    </div>
  )
}
