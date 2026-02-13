'use client'

import { Award, DollarSign, BookOpen, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function ScholarshipsFundingSupportClient() {
  const scholarshipTypes = [
    {
      icon: Award,
      title: 'Merit-Based Scholarships',
      description: 'Awarded to high-achieving international students with excellent academic records and potential.',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: DollarSign,
      title: 'Need-Based Funding',
      description: 'Financial support for students who demonstrate financial need to complete their studies.',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: BookOpen,
      title: 'Subject-Specific Scholarships',
      description: 'Scholarships available for specific courses and programs at our partner universities.',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Users,
      title: 'Country-Specific Bursaries',
      description: 'Special bursaries and grants available for students from specific countries and regions.',
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
  ]

  const scholarshipLevels = [
    {
      level: 'Foundation Level',
      description: 'Scholarships available for foundation year programs to help you prepare for university study.',
      percentage: '15-30%',
    },
    {
      level: 'Undergraduate Level',
      description: 'Various undergraduate scholarships ranging from partial tuition coverage to full scholarships.',
      percentage: '25-100%',
    },
    {
      level: 'Postgraduate Level',
      description: 'Master\'s and postgraduate diplomas scholarships from top universities and external bodies.',
      percentage: '20-100%',
    },
    {
      level: 'PhD Level',
      description: 'Doctoral scholarships and research grants for pursuing advanced research degrees in the UK.',
      percentage: '30-100%',
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Initial consultation to understand your academic profile and financial needs for scholarship opportunities.',
    },
    {
      number: '02',
      title: 'University Selection',
      description: 'Identify universities and programs with scholarship opportunities matching your profile and goals.',
    },
    {
      number: '03',
      title: 'Application Support',
      description: 'Expert guidance in completing scholarship applications with strong essays and supporting documentation.',
    },
    {
      number: '04',
      title: 'Follow-Up',
      description: 'Continuous support until scholarship decision and assistance with enrollment process if awarded.',
    },
  ]

  const faqs = [
    {
      question: 'Am I eligible for university scholarships?',
      answer: 'Most top universities offer scholarships to international students. Eligibility depends on your academic qualifications, test scores, and the specific university requirements. We help assess your eligibility during consultation.',
    },
    {
      question: 'How far in advance should I apply?',
      answer: 'We recommend applying for scholarships 6-12 months before your intended start date. Early applications increase your chances as scholarship pools are often filled on a rolling basis.',
    },
    {
      question: 'What is the difference between scholarships and bursaries?',
      answer: 'Scholarships are typically merit-based rewards for academic excellence, while bursaries are need-based grants for students with financial hardship. Both help reduce your study costs.',
    },
    {
      question: 'Can I apply for multiple scholarships?',
      answer: 'Yes, you can apply for multiple scholarships from different universities and external organizations. However, you may receive only one scholarship to avoid over-funding.',
    },
    {
      question: 'What documents do I need for scholarship applications?',
      answer: 'Generally, you\'ll need academic transcripts, test scores (IELTS, TOEFL), letters of recommendation, personal statement, and proof of financial need. We assist in preparing all required documents.',
    },
    {
      question: 'How long does the scholarship application process take?',
      answer: 'The process typically takes 3-6 months from initial consultation to final decision. We keep you updated throughout the entire process.',
    },
  ]

  const benefits = [
    'Reduced tuition fees or full scholarships coverage',
    'Access to leading universities worldwide',
    'Expert guidance through the entire application process',
    'Increased chances of scholarship approval',
    'Support with essay writing and application documentation',
    'Regular follow-ups and progress updates',
    'Post-award enrollment support',
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'University Selection', href: '/services/uk-university-selection' },
    { title: 'University Application', href: '/services/university-application' },
    { title: 'IELTS Preparation', href: '/services/ielts-preparation' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Scholarships & Funding Support
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                International Scholarships are available! Secure prestigious university scholarships and bursaries to fund your studies. Our expert team helps you navigate the application process and maximize your chances of success.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg">
                  Book Free Consultation
                </Button>
                <Link href="/universities">
                  <Button size="lg" variant="outline">
                    Explore Universities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Types Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Types of Scholarships Available
              </h2>
              <p className="text-lg text-muted-foreground">
                Universities offer various scholarship and bursary options for international students at all study levels.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {scholarshipTypes.map((type, index) => {
                const IconComponent = type.icon
                return (
                  <div
                    key={index}
                    className="p-6 border border-border rounded-xl hover:border-accent transition-all group h-full flex flex-col"
                  >
                    <div className={`w-14 h-14 ${type.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 ${type.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Scholarship Levels Section */}
        <section className="py-16 md:py-24 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Scholarships at All Study Levels
              </h2>
              <p className="text-lg text-muted-foreground">
                From foundation years to PhDs, scholarships are available at every level of study.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {scholarshipLevels.map((level, index) => (
                <div
                  key={index}
                  className="p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {level.level}
                    </h3>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {level.percentage}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {level.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Scholarship Application Process
              </h2>
              <p className="text-lg text-muted-foreground">
                We guide you through every step of securing your scholarship from consultation to enrollment.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => {
                const colors = [
                  { gradient: 'bg-gradient-to-br from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', border: 'border-blue-200 dark:border-blue-800' },
                  { gradient: 'bg-gradient-to-br from-teal-500 to-teal-600', bgColor: 'bg-teal-500/10', border: 'border-teal-200 dark:border-teal-800' },
                  { gradient: 'bg-gradient-to-br from-amber-500 to-amber-600', bgColor: 'bg-amber-500/10', border: 'border-amber-200 dark:border-amber-800' },
                  { gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-800' },
                ]
                const c = colors[index]
                return (
                <div key={index} className="relative">
                  <div className={`text-center ${c.bgColor} border ${c.border} rounded-xl p-6 hover:shadow-md transition-all h-full flex flex-col`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${c.gradient} text-white rounded-full font-bold text-xl mb-4 shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-muted-foreground/30" />
                  )}
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose HOQUE for Scholarships?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our dedicated team has helped hundreds of students secure valuable scholarships to study abroad.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about university scholarships and our support services.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg hover:border-accent/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 md:py-24 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Related Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore other services to support your university application journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="p-6 bg-background border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Submit your application today and take the first step toward your dream university.
              </p>
              <Button asChild size="lg">
                <Link href="/application-form">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
