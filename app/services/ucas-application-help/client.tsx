'use client'

import { CheckCircle2, ClipboardList, Trophy, Users, Phone, Globe, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function UcasApplicationHelpClient() {
  const ucasSteps = [
    {
      number: '1',
      title: 'Create UCAS Account',
      description: 'Set up your UCAS application account and register as a new applicant',
      icon: Users,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      number: '2',
      title: 'Fill Application Form',
      description: 'Complete your personal details, education history, and course preferences',
      icon: ClipboardList,
      gradient: 'bg-gradient-to-br from-teal-500 to-teal-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-200 dark:border-teal-800',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      number: '3',
      title: 'Submit Application',
      description: 'Submit your application through the UCAS portal with our guidance',
      icon: CheckCircle2,
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-200 dark:border-amber-800',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      number: '4',
      title: 'Track Progress',
      description: 'Monitor your application status and receive offers from universities',
      icon: Trophy,
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ]

  const whyChooseUcas = [
    {
      icon: CheckCircle2,
      title: 'Official UCAS Centre',
      description: 'Recognized UCAS centre providing free, independent advice and support',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Users,
      title: 'Expert Counsellors',
      description: 'Our trained professionals guide you through every step of the UCAS process',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: ClipboardList,
      title: 'Comprehensive Support',
      description: 'From application creation to tracking, we handle everything for you',
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      icon: Globe,
      title: 'Access to 100K+ Courses',
      description: 'Help you navigate 100,000+ undergraduate and postgraduate courses available',
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      icon: Trophy,
      title: 'Success Focused',
      description: 'Our track record demonstrates successful university placements for our students',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Phone,
      title: 'Personal Support',
      description: 'One-on-one assistance to ensure your application stands out',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ]

  const ucasDeadlines = [
    {
      deadline: 'October 15 (15:00 UK time)',
      period: 'Main Application Deadline',
      description: 'For applications to Oxford, Cambridge, and Dentistry, Medicine, Veterinary courses',
    },
    {
      deadline: 'January 29 (18:00 UK time)',
      period: 'Standard Deadline',
      description: 'Regular application deadline for most courses and universities',
    },
    {
      deadline: 'February - August',
      period: 'Extra Services',
      description: 'Apply for additional courses if placed in Clearing or Extra',
    },
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'University Application', href: '/services/university-application' },
    { title: 'Course Search', href: '/courses' },
    { title: 'University Selection', href: '/services/uk-university-selection' },
    { title: 'VISA Application Support', href: '/services/visa-application-support' },
    { title: 'Scholarships & Funding', href: '/services/scholarships-funding' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                UCAS Application Help & Support
              </h1>
              <p className="text-lg text-foreground/80 mb-8 text-pretty">
                Get expert guidance from our recognized UCAS centre. We help you navigate the UCAS process with
                confidence and secure placements at top universities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  Start Your Application
                </Button>
                <Link href="/services/one-to-one-consultation">
                  <Button size="lg" variant="outline">
                    Free Consultation
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-foreground/70">
                <Phone size={20} className="text-primary" />
                <span>Tel: 0870 1122211</span>
              </div>
            </div>
          </div>
        </section>

        {/* About UCAS Application */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why UCAS Application Help Matters
                </h2>
                <p className="text-foreground/70 mb-6">
                  Many universities require applications submitted through UCAS. With only five university choices
                  available but 100,000+ undergraduate and postgraduate courses to choose from, the process can be
                  overwhelming.
                </p>
                <p className="text-foreground/70 mb-6">
                  Our team of professional, trained counsellors ensures you make the right choices and submit a
                  competitive application. We help you understand the UCAS system, select suitable universities and
                  courses, and present your best self to admissions teams.
                </p>
                <p className="text-foreground/70 mb-8">
                  As an official, recognized UCAS centre, we provide free, independent advice to help you succeed in
                  your university applications.
                </p>
                <Link href="/courses">
                  <Button variant="outline" size="lg">
                    Explore All Courses <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 md:p-10">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Trophy className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-foreground">Official UCAS Centre</h3>
                      <p className="text-sm text-foreground/60">Recognized and trusted by UCAS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-foreground">Expert Guidance</h3>
                      <p className="text-sm text-foreground/60">Trained professional counsellors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-amber-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-foreground">Free Support</h3>
                      <p className="text-sm text-foreground/60">Independent advice at no cost</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose HOQUE for UCAS Help
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUcas.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all h-full flex flex-col">
                    <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={28} className={item.iconColor} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* UCAS Process */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our 4-Step UCAS Application Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {ucasSteps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="relative">
                    <div className={`${step.bgColor} rounded-xl p-6 border ${step.borderColor} hover:shadow-md transition-all text-center h-full flex flex-col`}>
                      <div className={`w-14 h-14 ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg`}>
                        {step.number}
                      </div>
                      <Icon size={24} className={`${step.iconColor} mx-auto mb-4`} />
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-foreground/70">{step.description}</p>
                    </div>
                    {idx < ucasSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* UCAS Deadlines */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Important UCAS Deadlines
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {ucasDeadlines.map((item, idx) => (
                <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar size={24} className="text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{item.period}</h3>
                  </div>
                  <p className="text-primary font-bold mb-2">{item.deadline}</p>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-card rounded-lg p-8 border border-primary/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Need More Information?</h3>
              <p className="text-foreground/70 mb-6">
                Visit UCAS for the most up-to-date application information and deadlines.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="http://www.ucas.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    Visit UCAS <Globe size={18} className="ml-2" />
                  </Button>
                </a>
                <Link href="/services/one-to-one-consultation">
                  <Button>Get Personalized Help</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Application Support */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Apply?</h2>
              <p className="text-lg text-foreground/80 mb-8">
                HOQUE will help you apply to the most suitable universities. Our team tracks your
                application progress and ensures your success. Don&apos;t delay – start your UCAS application today!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  Apply Now
                </Button>
                <Link href="/services/university-application">
                  <Button size="lg" variant="outline">
                    University Application Help
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-foreground/60 mt-6">
                Our UCAS buzzword for 2024 is: <span className="font-semibold text-primary">HOQUE2024</span>
              </p>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Related Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((service, idx) => (
                <Link key={idx} href={service.href} className="group">
                  <div className="bg-card rounded-lg p-6 border border-border group-hover:border-accent/50 group-hover:shadow-lg transition-all">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Learn more <ArrowRight size={16} className="ml-2" />
                    </div>
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
                <div key={idx} className="p-6 rounded-lg bg-card border border-border hover:border-accent hover:shadow-lg transition-all text-center">
                  <h3 className="font-bold text-foreground mb-2">{uni.name}</h3>
                  <p className="text-sm text-muted-foreground">{uni.rank}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/universities">
                <Button variant="outline" size="lg">
                  Explore All Universities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Submit your application today and take the first step toward your dream university.
            </p>
            <Button asChild size="lg">
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
