'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
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
                  icon: GraduationCap,
                  iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                  iconColor: 'text-blue-600 dark:text-blue-400',
                  countColor: 'text-blue-600 dark:text-blue-400',
                },
                {
                  title: 'Student Support',
                  description:
                    'Dedicated mentors available throughout your entire academic journey abroad.',
                  count: '5000+',
                  label: 'Students Helped',
                  icon: HeartHandshake,
                  iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                  countColor: 'text-emerald-600 dark:text-emerald-400',
                },
                {
                  title: 'Career Coaching',
                  description:
                    'Professional career advisors helping you plan your future beyond graduation.',
                  count: '98%',
                  label: 'Success Rate',
                  icon: Target,
                  iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                  iconColor: 'text-amber-600 dark:text-amber-400',
                  countColor: 'text-amber-600 dark:text-amber-400',
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
                { text: 'Transparent communication at every step of the process', icon: MessageCircle, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
                { text: 'Personalized strategy for each student based on their unique profile', icon: Target, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
                { text: 'Access to our extensive network of universities and industry professionals', icon: Globe, iconBg: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-800' },
                { text: 'Continuous support from application submission through graduation', icon: HeartHandshake, iconBg: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800' },
                { text: 'Competitive pricing with flexible payment options', icon: DollarSign, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
                { text: 'A proven track record of successful admissions to top-tier institutions', icon: Award, iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
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
      </main>

      <Footer />
    </div>
  )
}
