'use client'

import Link from 'next/link'
import { CheckCircle2, BookOpen, Users, FileCheck, Zap } from 'lucide-react'

export function ApplicationProcess() {
  const steps = [
    {
      number: 1,
      title: '100% Free Consultation',
      description:
        'Book a free consultation with our expert counsellors to discuss your profile and goals.',
      icon: Users,
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-700 dark:text-blue-300',
      numberBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      number: 2,
      title: 'University Selection Process',
      description:
        'We help you identify and select universities that match your academic profile and career aspirations.',
      icon: BookOpen,
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-700 dark:text-purple-300',
      numberBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      number: 3,
      title: 'Pre-Arrival Checklist',
      description:
        'Get comprehensive guidance on documentation, housing, and preparation before you arrive at university.',
      icon: FileCheck,
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-200 dark:border-teal-800',
      textColor: 'text-teal-700 dark:text-teal-300',
      numberBg: 'bg-gradient-to-br from-teal-500 to-teal-600',
    },
    {
      number: 4,
      title: 'IELTS/TOEFL Preparation',
      description:
        'Access resources and guidance for English language proficiency exams required for admission.',
      icon: Zap,
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-200 dark:border-amber-800',
      textColor: 'text-amber-700 dark:text-amber-300',
      numberBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
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
            It's easy to apply to any programme at a university with HOQUE.
            Contact us for a free one-on-one consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Four Simple Steps
            </h3>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={`flex gap-5 p-5 rounded-xl border ${step.bgColor} ${step.borderColor} transition-all duration-300 hover:shadow-md hover:scale-105`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`flex items-center justify-center h-14 w-14 rounded-full ${step.numberBg} text-white font-bold text-xl shadow-lg`}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${step.textColor}`} />
                      <h4 className={`text-lg font-semibold ${step.textColor}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed ml-8">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Programmes Offered */}
          <div className="bg-card border border-border rounded-2xl p-10 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Programmes Offered
            </h3>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Browse through our partner universities to find the university and
              course best suited to you. From business to medicine, law to
              engineering - we have it all.
            </p>

            <div className="space-y-4 mb-12">
              {programmes.map((programme, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors group"
                >
                  <div className="relative">
<CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-amber-600 transition-colors">
                    {programme}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/universities">
              <button className="w-full bg-gradient-to-r from-foreground to-accent text-white py-3 rounded-full font-semibold uppercase tracking-wider hover:shadow-lg hover:brightness-110 transition-all duration-300">
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
