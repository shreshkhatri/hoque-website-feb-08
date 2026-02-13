'use client'

import { CheckCircle2, FileText, Users, Clock, AlertCircle, ArrowRight, GraduationCap, ScrollText, Briefcase, Languages, UserCheck, Stamp, PhoneCall, ClipboardCheck, Send, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function UniversityApplicationClient() {
  const requiredDocuments = [
    {
      title: 'Official Transcripts and Certificates',
      description: 'Scanned copies of official transcripts from your current or former school, college, and university',
      icon: GraduationCap,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Personal Statement',
      description: 'Explain why you chose this university, how the course relates to your qualifications, and your career goals',
      icon: ScrollText,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'CV or Resume',
      description: 'Some programmes require additional documentation such as a CV/Resume or professional references',
      icon: Briefcase,
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      title: 'English Language Proficiency',
      description: 'IELTS 6.0 with minimum 5.5 in each skill or Medium of Instruction certificate (MOI)',
      icon: Languages,
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      title: 'References',
      description: 'Academic or professional references may be required for some programmes',
      icon: UserCheck,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Previous Visa Documents',
      description: 'Copies of previous UK Visas, visa refusal letters, or CAS letters if applicable',
      icon: Stamp,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ]

  const applicationSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Meet with our team to discuss your university goals and application requirements',
      icon: PhoneCall,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      step: 2,
      title: 'Document Preparation',
      description: 'Prepare and review all required documents including personal statement and transcripts',
      icon: ClipboardCheck,
      gradient: 'bg-gradient-to-br from-teal-500 to-teal-600',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-200 dark:border-teal-800',
      textColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      step: 3,
      title: 'Application Submission',
      description: 'Submit your complete application through the university portal with our guidance',
      icon: Send,
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-200 dark:border-amber-800',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      step: 4,
      title: 'Follow-up Support',
      description: 'Receive updates and support throughout the decision-making process',
      icon: HeartHandshake,
      gradient: 'bg-gradient-to-br from-rose-500 to-rose-600',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-200 dark:border-rose-800',
      textColor: 'text-rose-600 dark:text-rose-400',
    },
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'University Selection', href: '/services/uk-university-selection' },
    { title: 'Course Search', href: '/courses' },
    { title: 'UCAS Application Help', href: '#' },
    { title: 'VISA Application Support', href: '#' },
    { title: 'Scholarships & Funding Support', href: '#' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                  University Application Support
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Applying to universities is straightforward. Our expert team will guide you through every step of the application process to ensure your success.
                </p>
                <div className="flex flex-wrap gap-4">
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
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-8 border border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">No Application Fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">Document Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">Personal Statement Help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Questions Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Common Application Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">How do I apply to a university?</h3>
                <p className="text-muted-foreground">
                  Our consultants guide you through the entire process, from preparing documents to submitting your application through the university portal.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">When should I apply?</h3>
                <p className="text-muted-foreground">
                  Application deadlines vary by institution and programme. We help you plan your timeline to ensure you submit before the deadline.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">What qualifications do I need?</h3>
                <p className="text-muted-foreground">
                  Requirements depend on your chosen programme and level. We assess your qualifications and recommend suitable universities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Documents You Will Need
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Prepare these documents before starting your application. We provide guidance on each requirement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requiredDocuments.map((doc, index) => {
                const Icon = doc.icon
                return (
                  <div key={index} className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${doc.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${doc.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Application Process Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Our Application Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applicationSteps.map((item, index) => {
                const StepIcon = item.icon
                return (
                  <div key={index} className="relative">
                    <div className={`${item.bgColor} border ${item.borderColor} p-6 rounded-xl h-full flex flex-col hover:shadow-md transition-all`}>
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${item.gradient} text-white font-bold text-lg mb-4 shadow-lg`}>
                        {item.step}
                      </div>
                      <StepIcon className={`w-5 h-5 mb-3 ${item.textColor}`} />
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {index < applicationSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose HOQUE?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Personalized Support', description: 'We provide one-to-one guidance tailored to your specific needs and university requirements.', icon: HeartHandshake, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
                { title: 'Expert Team', description: 'Our consultants have extensive experience with university applications and admissions worldwide.', icon: Users, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
                { title: 'Document Assistance', description: 'We help you prepare and refine your personal statement, CV, and all supporting documents.', icon: ClipboardCheck, iconBg: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400' },
                { title: 'Zero Application Fees', description: 'No hidden charges for foundation, undergraduate, postgraduate, or PhD applications.', icon: CheckCircle2, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.href}>
                  <div className="bg-card p-6 rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all cursor-pointer h-full">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-primary mt-3" />
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/90">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Submit your application today and take the first step toward your dream university.
            </p>
            <Button asChild size="lg">
              <Link href="/application-form">
                Apply Now
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
