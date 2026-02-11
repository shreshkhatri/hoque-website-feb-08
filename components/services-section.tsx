'use client'

import { BookOpen, Compass, MessageCircle, Passport } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: BookOpen,
      title: 'University Admission Process',
      description:
        'Expert guidance through every step of the university application process. We help you navigate admissions, interviews, and more.',
      href: '/services/university-application',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      accentColor: 'group-hover:bg-blue-100',
    },
    {
      icon: Compass,
      title: 'Explore Universities',
      description:
        'Browse through our network of 100+ partner universities and find the perfect institution for your academic goals.',
      href: '/universities',
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      accentColor: 'group-hover:bg-emerald-100',
    },
    {
      icon: MessageCircle,
      title: 'One to One Consultation',
      description:
        'Personalised consultation with our expert counsellors to discuss your unique educational aspirations.',
      href: '/services/one-to-one-consultation',
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      accentColor: 'group-hover:bg-amber-100',
    },
    {
      icon: Passport,
      title: 'VISA Application Support',
      description:
        'Comprehensive support with student visa applications, documentation, and interview preparation.',
      href: '/services/visa-application-support',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      accentColor: 'group-hover:bg-purple-100',
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
                <div className={`group relative ${service.bgColor} border border-border/40 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 h-full cursor-pointer`}>
                  {/* Decorative accent circle */}
                  <div className={`absolute top-0 right-0 w-40 h-40 ${service.accentColor} rounded-full -mr-20 -mt-20 opacity-30 transition-all duration-300`} />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${service.iconColor}`} />
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
