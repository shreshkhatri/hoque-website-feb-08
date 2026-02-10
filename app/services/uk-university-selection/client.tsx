'use client'

import { MapPin, Award, BookOpen, Users, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function UKUniversitySelectionClient() {
  const universities = [
    { name: 'University of Greenwich', location: 'London' },
    { name: 'Middlesex University', location: 'London' },
    { name: 'Northumbria University', location: 'London & Newcastle' },
    { name: 'Ulster University', location: 'Northern Ireland' },
    { name: 'University of Bedfordshire', location: 'Bedfordshire' },
    { name: 'University for the Creative Arts', location: 'UK' },
    { name: "Queen's University Belfast", location: 'Belfast' },
    { name: 'Glyndwr University', location: 'Wales' },
    { name: 'University of Bolton', location: 'Bolton' },
    { name: 'De Montfort University', location: 'Leicester' },
    { name: 'Keele University', location: 'Staffordshire' },
    { name: 'University of South Wales', location: 'Wales' },
    { name: 'Bangor University', location: 'Wales' },
    { name: 'University of Dundee', location: 'Scotland' },
    { name: 'University of Bradford', location: 'Yorkshire' },
    { name: 'University of Roehampton', location: 'London' },
    { name: 'Ravensbourne University', location: 'London' },
    { name: 'London Metropolitan University', location: 'London' },
    { name: 'Solent University', location: 'Southampton' },
    { name: 'QA Higher Education', location: 'UK' },
    { name: 'Oxford International Education Group', location: 'UK' },
  ]

  const benefits = [
    {
      icon: CheckCircle2,
      title: 'Expert Guidance',
      description: 'Our expert consultants provide personalised university selection advice',
    },
    {
      icon: Award,
      title: 'Free Application Support',
      description: 'Receive free application service to your chosen institutions with guaranteed offers',
    },
    {
      icon: Users,
      title: 'Partner Universities',
      description: 'Access to over 100+ partner universities worldwide with global reputations',
    },
    {
      icon: BookOpen,
      title: 'Multiple Study Levels',
      description: 'Support for Foundation, Undergraduate, Postgraduate, and PhD applications',
    },
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'Course Search', href: '/courses' },
    { title: 'University Application', href: '/services/university-application' },
    { title: 'UCAS Application Help', href: '/services/ucas-application-help' },
    { title: 'VISA Application Support', href: '/services/visa-application-support' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <MapPin size={16} />
              <span className="text-sm font-medium">Explore Universities Worldwide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              University Selection
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl text-balance">
              Find your perfect university and access free application services to study at leading institutions worldwide with Hoque.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Free Consultation
              </Button>
              <Link href="/universities">
                <Button size="lg" variant="outline">
                  Explore Universities
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Why Choose Our Partner Universities?
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Choosing the right university is an important decision that shapes your future. Our university partners are internationally recognised institutions renowned for their excellence in teaching, research, innovation, and collaborative relationships. They welcome international students from around the globe to pursue their academic goals.
            </p>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              As official university representatives, we specialise in helping students access Foundation degrees, Undergraduate, Postgraduate, and PhD programmes. Our expert consultants provide personalised guidance to secure guaranteed offers at your preferred universities.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Why Select with HOQUE?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-foreground/70">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Universities Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
              Our University Partners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((uni, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {uni.name}
                  </h3>
                  <p className="text-sm text-foreground/60 flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    {uni.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Our Selection Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '1',
                  title: 'Free Consultation',
                  description: 'Meet with our expert consultant to discuss your goals',
                },
                {
                  step: '2',
                  title: 'University Matching',
                  description: 'We match you with universities that fit your academic profile',
                },
                {
                  step: '3',
                  title: 'Application Support',
                  description: 'Receive comprehensive support throughout the application process',
                },
                {
                  step: '4',
                  title: 'Guaranteed Offer',
                  description: 'Secure your place at your chosen university',
                },
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-6 border border-border text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
              Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
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
                We work with leading universities worldwide to help you find the perfect fit for your academic goals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'University of Oxford', rank: 'World Top 5' },
                { name: 'University of Cambridge', rank: 'World Top 5' },
                { name: 'Imperial College London', rank: 'World Top 10' },
                { name: 'University College London', rank: 'World Top 10' },
                { name: 'London School of Economics', rank: 'World Top 50' },
                { name: 'University of Edinburgh', rank: 'World Top 50' },
                { name: 'University of Manchester', rank: 'World Top 50' },
                { name: 'University of Birmingham', rank: 'World Top 100' },
                { name: 'University of Warwick', rank: 'World Top 100' },
                { name: 'University of Sheffield', rank: 'World Top 100' },
                { name: 'University of Bristol', rank: 'World Top 100' },
                { name: 'Duke University', rank: 'World Top 25' },
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
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Submit your application today and take the first step toward your dream university.
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
