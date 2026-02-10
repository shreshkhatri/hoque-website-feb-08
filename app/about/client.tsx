'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AboutCompany } from '@/components/about-company'
import { CheckCircle } from 'lucide-react'

export function AboutPageClient() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero section for about page */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Transforming educational opportunities for students worldwide through expert guidance and support
            </p>
          </div>
        </section>

        {/* About Company Component */}
        <AboutCompany />

        {/* Our Team Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Expertise
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our team comprises experienced education consultants, university admission officers, and career advisors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'University Admissions',
                  description:
                    'Former admission officers from top universities worldwide guiding your application process.',
                  count: '50+',
                  label: 'Universities Covered',
                },
                {
                  title: 'Student Support',
                  description:
                    'Dedicated mentors available throughout your entire academic journey abroad.',
                  count: '5000+',
                  label: 'Students Helped',
                },
                {
                  title: 'Career Coaching',
                  description:
                    'Professional career advisors helping you plan your future beyond graduation.',
                  count: '98%',
                  label: 'Success Rate',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-8 text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {item.count}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Our Promise to You
            </h2>

            <div className="space-y-4">
              {[
                'Transparent communication at every step of the process',
                'Personalized strategy for each student based on their unique profile',
                'Access to our extensive network of universities and industry professionals',
                'Continuous support from application submission through graduation',
                'Competitive pricing with flexible payment options',
                'A proven track record of successful admissions to top-tier institutions',
              ].map((promise, i) => (
                <div key={i} className="flex items-start space-x-4 bg-card border border-border rounded-lg p-4">
                  <CheckCircle
                    className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                    size={24}
                  />
                  <p className="text-foreground text-lg">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
