'use client'

import { CheckCircle2, FileText, DollarSign, MessageSquare, MapPin, Clock, ArrowRight, PhoneCall, ClipboardCheck, Send, ShieldCheck, Users, Award, Briefcase, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function VisaApplicationSupportClient() {
  const visaRequirements = [
    {
      title: 'Confirmation of Acceptance for Studies (CAS)',
      description: 'Get your CAS from the university - this is worth 50 points',
      icon: FileText,
      points: '50 Points',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      badgeBg: 'bg-blue-600',
    },
    {
      title: 'Maintenance (Bank Statement)',
      description: 'Demonstrate sufficient funds held for 28 consecutive days',
      icon: DollarSign,
      points: '10 Points',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-600',
    },
    {
      title: 'English Language Proficiency',
      description: 'IELTS 5.5 or equivalent proof of English proficiency',
      icon: MessageSquare,
      points: '10 Points',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-600',
    },
  ]

  const visaProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Discuss your visa requirements and gather necessary information',
      icon: PhoneCall,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      step: 2,
      title: 'Document Preparation',
      description: 'Prepare and organize all required documents with our guidance',
      icon: ClipboardCheck,
      gradient: 'bg-gradient-to-br from-teal-500 to-teal-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-200 dark:border-teal-800',
    },
    {
      step: 3,
      title: 'Application Submission',
      description: 'Submit your application through our official partner solicitor firm',
      icon: Send,
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
    {
      step: 4,
      title: 'Credibility Interview Support',
      description: 'Prepare for visa credibility interviews with expert guidance',
      icon: ShieldCheck,
      gradient: 'bg-gradient-to-br from-rose-500 to-rose-600',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-200 dark:border-rose-800',
    },
  ]

  const relatedServices = [
    { title: 'IELTS Preparation', href: '/services/ielts-preparation' },
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'Student Accommodation', href: '/services/student-accommodation' },
    { title: 'Pre-Arrival Checklist', href: '/services/pre-arrival-checklist' },
    { title: 'Approved Bangladesh Banks', href: '/services/approved-banks' },
    { title: 'University Application', href: '/services/university-application' },
  ]

  const faqs = [
    {
      question: 'How much money do I need to demonstrate?',
      answer: 'The required amount varies by university and course. You must hold the required funds in your bank account for a consecutive 28-day period. The amount typically covers tuition fees and living expenses.'
    },
    {
      question: 'What is a credibility interview?',
      answer: 'Credibility interviews were introduced to ensure that only genuine students are given visas. You may be asked about your course, university choice, and intentions to study abroad.'
    },
    {
      question: 'How long does the visa application process take?',
      answer: 'Standard processing typically takes 3-8 weeks. We recommend applying as soon as you receive your CAS from the university.'
    },
    {
      question: 'Can I work while studying on a student visa?',
      answer: 'Yes, international students can typically work up to 20 hours per week during term time and full-time during holidays.'
    },
    {
      question: 'What if my visa application is refused?',
      answer: 'We provide guidance on appeals and can help you understand the reasons for refusal and explore next steps.'
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                VISA Application Support
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                Professional guidance for student visa applications worldwide. We assist international students through the entire visa process with our official partner solicitor firm.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  Book Free Consultation
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-foreground mb-6">Understanding Student Visas</h2>
              <p className="text-foreground/80 mb-6">
                Most international students need a visa to study abroad. It is crucial to check immigration requirements regularly, as they can change. Students without the necessary visa will be refused entry.
              </p>
              <p className="text-foreground/80 mb-6">
                The student visa application is based on a points-based assessment system. You need 70 points to be granted a visa, which are awarded for:
              </p>
            </div>
          </div>
        </section>

        {/* Visa Requirements */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Visa Requirements</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {visaRequirements.map((req, index) => {
                const Icon = req.icon
                return (
                  <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 ${req.bgColor} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${req.iconColor}`} />
                      </div>
                      <span className={`${req.badgeBg} text-white font-bold text-sm px-3 py-1 rounded-full`}>{req.points}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{req.title}</h3>
                    <p className="text-foreground/70">{req.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Financial Requirements */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-foreground mb-8">Financial Requirements</h2>
              <div className="bg-card border border-border rounded-lg p-8 mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">How Much Money Do I Need?</h3>
                <p className="text-foreground/80">
                  The amount of money you need to demonstrate varies depending on your university and course. You must hold the required funds in your bank account for a consecutive 28-day period. Typically, this includes tuition fees and living expenses.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Credibility Interviews</h3>
                <p className="text-foreground/80 mb-4">
                  Credibility interviews were introduced to ensure that only genuine students are granted visas to study abroad. You may be asked to attend a credibility interview as part of your visa application process.
                </p>
                <p className="text-foreground/80">
                  Our team can help you prepare for these interviews, covering what to expect and how to present your genuine student intentions clearly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visa Process */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Visa Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {visaProcess.map((item) => {
                const StepIcon = item.icon
                return (
                  <div key={item.step} className="relative">
                    <div className={`${item.bgColor} border ${item.borderColor} rounded-xl p-6 hover:shadow-md transition-all`}>
                      <div className={`w-14 h-14 ${item.gradient} text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg`}>
                        {item.step}
                      </div>
                      <StepIcon className={`w-5 h-5 mb-3 ${item.borderColor.includes('blue') ? 'text-blue-600' : item.borderColor.includes('teal') ? 'text-teal-600' : item.borderColor.includes('amber') ? 'text-amber-600' : 'text-rose-600'}`} />
                      <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                    {item.step < 4 && (
                      <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose HOQUE?</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Official Partner Solicitor Firm',
                  description: 'We work with an official partner solicitor firm for visa applications to embassies, British High Commissions, and the Home Office.',
                  icon: ShieldCheck,
                  iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                  iconColor: 'text-blue-600 dark:text-blue-400',
                },
                {
                  title: 'Expert Guidance',
                  description: 'Our professionals provide expert guidance through every step of the visa application process.',
                  icon: Award,
                  iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                  iconColor: 'text-amber-600 dark:text-amber-400',
                },
                {
                  title: 'Document Preparation',
                  description: 'We help prepare and organize all required documents to ensure your application is complete and accurate.',
                  icon: ClipboardCheck,
                  iconBg: 'bg-teal-100 dark:bg-teal-900/30',
                  iconColor: 'text-teal-600 dark:text-teal-400',
                },
                {
                  title: 'Interview Preparation',
                  description: 'We provide support for credibility interviews to help you present your genuine student intentions clearly.',
                  icon: Users,
                  iconBg: 'bg-rose-100 dark:bg-rose-900/30',
                  iconColor: 'text-rose-600 dark:text-rose-400',
                },
                {
                  title: 'Experience & Expertise',
                  description: 'With years of experience assisting international students, we understand visa requirements thoroughly.',
                  icon: Briefcase,
                  iconBg: 'bg-purple-100 dark:bg-purple-900/30',
                  iconColor: 'text-purple-600 dark:text-purple-400',
                },
                {
                  title: 'Personalized Support',
                  description: 'We provide tailored support based on your specific circumstances and university requirements.',
                  icon: HeartHandshake,
                  iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                  iconColor: 'text-emerald-600 dark:text-emerald-400',
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-foreground/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.href}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all cursor-pointer">
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {service.title}
                    </h3>
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
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
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
