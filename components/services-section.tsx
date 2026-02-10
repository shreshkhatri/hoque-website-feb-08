'use client'

import { GraduationCap, Globe, Users, FileCheck } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: GraduationCap,
      title: 'University Admission Process',
      description:
        'Expert guidance through every step of the university application process. We help you navigate admissions, interviews, and more.',
      href: '/services/university-application',
    },
    {
      icon: Globe,
      title: 'Explore Universities',
      description:
        'Browse through our network of 100+ partner universities and find the perfect institution for your academic goals.',
      href: '/universities',
    },
    {
      icon: Users,
      title: 'One to One Consultation',
      description:
        'Personalised consultation with our expert counsellors to discuss your unique educational aspirations.',
      href: '/services/one-to-one-consultation',
    },
    {
      icon: FileCheck,
      title: 'VISA Application Support',
      description:
        'Comprehensive support with student visa applications, documentation, and interview preparation.',
      href: '/services/visa-application-support',
    },
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Explore Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive education consultancy services designed to support your
            journey to studying at world-class universities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link key={index} href={service.href}>
                <div className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
