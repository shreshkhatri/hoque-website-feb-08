'use client'

import { CheckCircle2, FileText, DollarSign, Home, Plane, Heart, AlertCircle, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function PreArrivalChecklistClient() {
  const checklist = [
    {
      category: 'Travel Documents',
      icon: Plane,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      items: [
        'Valid passport (valid for more than 6 months)',
        'Entry clearance/stamped visa',
        'Travel tickets/booking confirmation',
        'Travel insurance documents',
      ],
    },
    {
      category: 'Academic Documents',
      icon: FileText,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      items: [
        'All academic certificates and transcripts',
        'IELTS or other English language proficiency test results',
        'Degree certificates and mark sheets',
        'Course completion documents',
      ],
    },
    {
      category: 'University Documents',
      icon: FileText,
      iconBg: 'bg-teal-100 dark:bg-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
      items: [
        'Offer letter from university',
        'Acceptance letter (conditional/unconditional)',
        'Confirmation of Acceptance for Studies (CAS) letter',
        'Course information and enrollment documents',
      ],
    },
    {
      category: 'Financial Documents',
      icon: DollarSign,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      items: [
        'Bank statements (not less than 28 days old)',
        'Proof of funding for tuition fees',
        'Proof of living expenses funds',
        'Sponsor letter (if applicable) with birth certificate',
      ],
    },
    {
      category: 'Immigration Documents',
      icon: AlertCircle,
      items: [
        'Home Office letter with BRP card collection details',
        'Police Clearance Certificate (if applicable)',
        'Medical documents and TB test certificate (if required)',
        'IHS (Immigration Health Surcharge) payment receipt',
      ],
    },
    {
      category: 'Accommodation & Other',
      icon: Home,
      items: [
        'Confirmed accommodation address',
        'Accommodation booking confirmation',
        'Contact details of accommodation provider',
        'Emergency contact information',
      ],
    },
  ]

  const tips = [
    {
      title: 'Document Copies',
      description: 'Keep multiple copies of all important documents. Store digital copies in cloud storage and physical copies separately.',
    },
    {
      title: 'Original vs Copies',
      description: 'Always carry original documents (passports, CAS letter, etc.) along with certified copies for backup.',
    },
    {
      title: 'Currency Exchange',
      description: 'Exchange some currency before traveling to UK. Notify your bank about international travel plans.',
    },
    {
      title: 'Travel Insurance',
      description: 'Ensure comprehensive travel insurance coverage including health, baggage, and emergency medical expenses.',
    },
    {
      title: 'Contact Information',
      description: 'Have emergency contact numbers for your university, accommodation provider, and nearest embassy/high commission.',
    },
    {
      title: 'UK Guidelines',
      description: 'Requirements change frequently. Always check latest government and university guidelines before travel.',
    },
  ]

  const timeline = [
    {
      month: '3 Months Before',
      tasks: ['Review checklist', 'Verify all documents are in order', 'Book accommodation', 'Arrange travel insurance'],
    },
    {
      month: '2 Months Before',
      tasks: ['Obtain medical documents if required', 'Get police clearance if needed', 'Exchange currency', 'Purchase plane tickets'],
    },
    {
      month: '1 Month Before',
      tasks: ['Confirm accommodation', 'Arrange airport pickup', 'Notify bank about travel', 'Review arrival procedures'],
    },
    {
      month: 'Before Travel',
      tasks: ['Final document check', 'Pack important documents separately', 'Inform university of arrival', 'Arrange UK phone SIM'],
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Pre-Arrival Checklist</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Important information before you travel to the UK. Ensure you have all required documents and preparations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                Download Checklist
              </Button>
              <Button size="lg" variant="outline">
                Book Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Main Checklist Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Complete Checklist</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Before traveling to the UK, ensure you have all these important documents and items ready. These requirements may change based on government and university guidelines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {checklist.map((section, index) => {
                const Icon = section.icon
                return (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{section.category}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-foreground text-center">Preparation Timeline</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((phase, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">{phase.month}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-foreground text-center">Helpful Tips</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="bg-gradient-to-br from-primary/5 to-transparent border border-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-50 dark:bg-yellow-950/20 border-t border-b border-yellow-200 dark:border-yellow-900">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <AlertCircle className="text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">Important Note</h3>
                <p className="text-yellow-800 dark:text-yellow-200">
                  Requirements change from time to time depending on local and UK government guidelines. Always refer to the latest government and university guidelines before traveling. Contact us for the most up-to-date information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-foreground text-center">Related Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'IELTS Preparation', href: '/services/ielts-preparation' },
                { title: 'Student Accommodation', href: '/services/student-accommodation' },
                { title: 'VISA Application Support', href: '/services/visa-application-support' },
                { title: 'University Selection', href: '/services/uk-university-selection' },
                { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
                { title: 'Scholarships & Funding Support', href: '/services/scholarships-funding-support' },
              ].map((service, index) => (
                <Link key={index} href={service.href}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all cursor-pointer">
                    <h3 className="font-bold text-foreground text-lg hover:text-primary transition-colors">{service.title}</h3>
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Start Your Journey?</h2>
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
        </section>
      </div>
      <Footer />
    </>
  )
}
