'use client'

import { Home, MapPin, CheckCircle2, Shield, Users, ArrowRight, DollarSign, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function StudentAccommodationClient() {
  const accommodationTypes = [
    {
      title: 'University Hall of Residence',
      description: 'Safe, secure, and convenient accommodation provided by universities with support services and community.',
      icon: Home,
      features: ['On-campus location', 'Meal plans available', '24/7 support', 'Community events'],
    },
    {
      title: 'Private Student Housing',
      description: 'Purpose-built student accommodation with modern facilities, flexible contracts, and excellent value.',
      icon: MapPin,
      features: ['Modern amenities', 'All-inclusive bills', 'Social spaces', 'Short-term contracts'],
    },
    {
      title: 'Host Family Accommodation',
      description: 'Stay with a carefully selected local family for an authentic cultural experience and language immersion.',
      icon: Users,
      features: ['Family environment', 'Local integration', 'Home-cooked meals', 'Personal support'],
    },
    {
      title: 'Private Rental',
      description: 'Independent living in private apartments or shared houses with complete freedom and flexibility.',
      icon: Shield,
      features: ['Full independence', 'Various locations', 'Flexible terms', 'Furnished options'],
    },
  ]

  const accommodationProcess = [
    {
      step: 1,
      title: 'Get Your Acceptance',
      description: 'Receive your university offer and confirmation of acceptance to unlock accommodation options.',
    },
    {
      step: 2,
      title: 'Explore Options',
      description: 'Browse available accommodation types and locations that best suit your needs and budget.',
    },
    {
      step: 3,
      title: 'Make Your Application',
      description: 'Complete the accommodation application process with our guidance and documentation support.',
    },
    {
      step: 4,
      title: 'Confirmation & Arrival',
      description: 'Receive confirmation and prepare for arrival with all necessary information and support.',
    },
  ]

  const accommodationBenefits = [
    { icon: Shield, title: 'Safety & Security', description: 'All accommodations verified for safety standards and security features' },
    { icon: DollarSign, title: 'Budget-Friendly', description: 'Options for every budget from halls to private rentals' },
    { icon: Clock, title: 'Quick Process', description: 'Fast accommodation allocation once your offer is confirmed' },
    { icon: Users, title: 'Community', description: 'Connect with other international and local students' },
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'Pre-Arrival Checklist', href: '/services/pre-arrival-checklist' },
    { title: 'VISA Application Support', href: '/services/visa-application-support' },
    { title: 'Scholarships & Funding Support', href: '/services/scholarships-funding-support' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Your Perfect <span className="text-primary">Student Accommodation</span>
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Secure safe, comfortable, and convenient accommodation near your UK university. We guide you through every step of the process.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline">
                Explore Accommodation Types
              </Button>
            </div>
          </div>
        </section>

        {/* Why Accommodation Matters */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Student Accommodation Matters</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Important Timing</h3>
                <p className="text-foreground/70">
                  Once you confirm your university place, applying for accommodation should be your priority. Most universities offer accommodation for first-year students, but availability is limited.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Available Support</h3>
                <p className="text-foreground/70">
                  Whether you are an existing student or planning to join, we are happy to guide you through accommodation options, university services, and alternative housing arrangements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation Types */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Types of Student Accommodation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {accommodationTypes.map((type, index) => {
                const Icon = type.icon
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                    </div>
                    <p className="text-foreground/70 mb-6">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                          <CheckCircle2 size={16} className="text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How to Secure Accommodation</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {accommodationProcess.map((item, index) => (
                <div key={index} className="relative">
                  {index < accommodationProcess.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-primary/20 -ml-4" />
                  )}
                  <div className="bg-card border border-border rounded-lg p-6 relative z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground text-center mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/70 text-center">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Our Accommodation Support</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accommodationBenefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <Icon size={32} className="text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-foreground/70">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related Services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group bg-card border border-border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <ArrowRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Start Your UK Journey?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Submit your application today and take the first step toward your dream UK university.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
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
