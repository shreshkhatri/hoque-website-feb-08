'use client'

import { CheckCircle2, MapPin, Clock, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function OneToOneConsultationClient() {
  const consultationAreas = [
    'Eligibility Assessment',
    'Required Documents',
    'Application Form Review',
    'Scholarship Opportunities',
    'Course Duration & Selection',
    'University Selection',
    'Reasons for Study',
    'CV & Personal Statement',
    'Maintenance Funds',
    'Passport & Visa Expiry',
    'Offer Acceptance',
    'Visa Process Support',
  ]

  const processSteps = [
    {
      title: 'Book Your Slot',
      description: 'Schedule a free consultation with our British Council trained consultants at your preferred office.',
    },
    {
      title: 'Pre-Consultation Preparation',
      description: 'Provide basic information about your profile, academic background, and career goals.',
    },
    {
      title: 'One-to-One Session',
      description: 'Receive personalized guidance tailored to your specific needs and aspirations.',
    },
    {
      title: 'Action Plan',
      description: 'Get a comprehensive roadmap for your application and next steps.',
    },
  ]

  const offices = [
    { city: 'London', country: 'United Kingdom' },
    { city: 'Dhaka', country: 'Bangladesh' },
    { city: 'Colombo', country: 'Sri Lanka' },
    { city: 'Lahore', country: 'Pakistan' },
  ]

  const relatedServices = [
    { title: 'UK University Selection', href: '/services/uk-university-selection', icon: '🎓' },
    { title: 'Course Search', href: '/services/course-search', icon: '📚' },
    { title: 'University Application', href: '/services/university-application', icon: '📝' },
    { title: 'UCAS Application Help', href: '/services/ucas-application-help', icon: '📋' },
    { title: 'VISA Application Support', href: '/services/visa-application-support', icon: '✈️' },
    { title: 'Scholarships & Funding Support', href: '/services/scholarships-funding-support', icon: '💰' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              One-to-One Free Consultation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Consultation dedicated to you. Get personalized guidance from our British Council trained consultants to help you achieve your UK education goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent">
                <Link href="#process">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our consultants are trained by the British Council to provide professional advice on UK admissions.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">100% Free</h3>
                <p className="text-muted-foreground">
                  Our consultation services are completely free with no hidden charges or obligations.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Multiple Locations</h3>
                <p className="text-muted-foreground">
                  Visit us at any of our offices across London, Bangladesh, Sri Lanka, and Pakistan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Cover Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                What We Cover in Your Consultation
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We provide comprehensive review and guidance across all aspects of your UK university application.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {consultationAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" id="process">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Our Consultation Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A structured approach to ensure you get the most out of your consultation.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Different Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Why Personalized Consultation Matters
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Tailored Guidance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Everyone has unique academic backgrounds, career goals, and circumstances. Our consultants understand that one-size-fits-all advice doesn't work. In a one-to-one consultation, we thoroughly assess your profile and provide recommendations that are specifically suited to you.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Navigate UK Visa Requirements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  UK student visa regulations can be complex, and international students must meet specific requirements. Our consultants help you understand the timeline, necessary documentation, and best practices to ensure a smooth visa application process.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">Maximize Your Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From identifying scholarship opportunities to selecting the right course and university, our guidance helps you make informed decisions that align with your goals and increase your chances of admission to top UK institutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Offices Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Our Offices
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Visit us at any of our locations worldwide for your free consultation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-center"
                >
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-foreground">{office.city}</h3>
                  <p className="text-muted-foreground">{office.country}</p>
                  <Button asChild variant="link" className="mt-4 text-primary">
                    <Link href="/contact">Get Details</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Our Other Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond consultation, we provide comprehensive support throughout your entire application journey.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="p-6 rounded-lg bg-background border border-border hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Universities Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Our Partner Universities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We work with leading universities across the UK and internationally to help you find the perfect fit for your academic goals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'University of Oxford', rank: 'Rank 1 (UK)' },
                { name: 'University of Cambridge', rank: 'Rank 2 (UK)' },
                { name: 'Imperial College London', rank: 'Rank 3 (UK)' },
                { name: 'University College London', rank: 'Rank 4 (UK)' },
                { name: 'London School of Economics', rank: 'Rank 5 (UK)' },
                { name: 'University of Edinburgh', rank: 'Rank 6 (UK)' },
                { name: 'University of Manchester', rank: 'Russell Group' },
                { name: 'University of Birmingham', rank: 'Russell Group' },
                { name: 'University of Warwick', rank: 'Russell Group' },
                { name: 'University of Sheffield', rank: 'Russell Group' },
                { name: 'University of Bristol', rank: 'Russell Group' },
                { name: 'Duke University (USA)', rank: 'Partner Institution' },
              ].map((uni, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-card border border-border hover:border-primary hover:shadow-lg transition-all text-center">
                  <h3 className="font-bold text-foreground mb-2">{uni.name}</h3>
                  <p className="text-sm text-muted-foreground">{uni.rank}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/universities">
                <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                  Explore All Universities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Ready to Start Your UK Journey?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Submit your application today and take the first step toward your dream UK university.
              </p>
            </div>

            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90">
              <Link href="/application-form">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
      </section>
    </div>
    <Footer />
    </>
  )
}
