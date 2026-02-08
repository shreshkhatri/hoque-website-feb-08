'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export function ApplicationProcess() {
  const steps = [
    {
      number: 1,
      title: '100% Free Consultation',
      description:
        'Book a free consultation with our British Council trained counsellors to discuss your profile and goals.',
    },
    {
      number: 2,
      title: 'University Selection Process',
      description:
        'We help you identify and select universities that match your academic profile and career aspirations.',
    },
    {
      number: 3,
      title: 'Pre-Arrival Checklist',
      description:
        'Get comprehensive guidance on documentation, housing, and preparation before you arrive at university.',
    },
    {
      number: 4,
      title: 'IELTS/TOEFL Preparation',
      description:
        'Access resources and guidance for English language proficiency exams required for admission.',
    },
  ]

  const programmes = [
    'Foundation Programmes',
    'Undergraduate Courses',
    'Postgraduate Courses',
    'PhD Programmes',
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Simple Application Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            It's easy to apply to any programme at a university with Hoque Consultancy.
            Contact us for a free one-on-one consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Steps */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Four Simple Steps
            </h3>
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Programmes Offered */}
          <div className="bg-card border border-border rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Programmes Offered
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Browse through our partner universities to find the university and
              course best suited to you. From business to medicine, law to
              engineering - we have it all.
            </p>

            <div className="space-y-4 mb-10">
              {programmes.map((programme, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{programme}</span>
                </div>
              ))}
            </div>

            <Link href="/universities">
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Explore Universities
              </button>
            </Link>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            What Our Students Get
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Free Application', value: '100%' },
              { label: 'Support & Guidance', value: 'Complete' },
              { label: 'Success Rate', value: '98%' },
              { label: 'Partner Universities', value: '100+' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
