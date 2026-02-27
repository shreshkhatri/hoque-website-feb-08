'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTAConsultation } from '@/components/cta-consultation'
import { AboutCompany } from '@/components/about-company'
import { CheckCircle, GraduationCap, HeartHandshake, Target, MessageCircle, Sparkles, Globe, DollarSign, Award } from 'lucide-react'

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
              Empowering international students since 2009 with expert guidance and 100% free application services to leading universities worldwide
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
                Our team of fully trained counsellors and education advisors brings years of experience in supporting international students.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'University Partnerships',
                  description:
                    'Strong relationships with 100+ leading universities ensuring quality education opportunities across multiple destinations.',
                  count: '100+',
                  label: 'Partner Universities',
                  icon: GraduationCap,
                  iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                  countColor: 'text-emerald-600 dark:text-emerald-400',
                },
                {
                  title: 'Global Presence',
                  description:
                    'Operating from 14 offices worldwide to provide accessible support wherever you are.',
                  count: '14',
                  label: 'Global Offices',
                  icon: HeartHandshake,
                  iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                  countColor: 'text-emerald-600 dark:text-emerald-400',
                },
                {
                  title: 'Proven Experience',
                  description:
                    'Over 17 years of excellence in guiding international students to top universities worldwide.',
                  count: '17+',
                  label: 'Years Experience',
                  icon: Target,
                  iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                  countColor: 'text-emerald-600 dark:text-emerald-400'
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all"
                  >
                    <div className={`w-16 h-16 ${item.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    <div className={`text-4xl font-bold ${item.countColor} mb-2`}>
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
                )
              })}
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
                { text: '100% free application service for Foundation, Undergraduate, Postgraduate, and PhD programs', icon: DollarSign, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                { text: 'Personalized counselling from fully trained education advisors', icon: MessageCircle, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                { text: 'Strong partnerships with 100+ leading universities across multiple countries', icon: Award, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                { text: 'Global support network with 14 offices worldwide', icon: Globe, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                { text: 'Comprehensive support from application to enrollment', icon: HeartHandshake, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                { text: '17+ years of proven expertise in international student recruitment', icon: Target, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
              ].map((promise, i) => {
                const Icon = promise.icon
                return (
                  <div key={i} className={`flex items-start space-x-4 bg-card border ${promise.border} rounded-xl p-5 hover:shadow-md transition-all`}>
                    <div className={`w-10 h-10 ${promise.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${promise.iconColor}`} />
                    </div>
                    <p className="text-foreground text-lg">{promise.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <CTAConsultation
          heading="Ready to start your academic journey with HOQUE?"
          description="Get personalised advice from our expert counsellors. Whether you need help choosing a university, preparing your application, or navigating the visa process, we are here to help."
          badge="Let us guide you"
        />
      </main>

      <Footer />
    </div>
  )
}
