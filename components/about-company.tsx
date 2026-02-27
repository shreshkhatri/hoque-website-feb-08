import { CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutCompany() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                About HOQUE
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since 2009, HOQUE has provided expert educational guidance and advice to international students throughout the UK. With a head office in London and a global network of offices including Dhaka, Colombo, Islamabad, New York, Dubai, Mumbai, Hyderabad, Gujarat, Kochi, Sri Lanka, Sylhet, Chattogram, and Nepal, we have a team of fully trained counsellors dedicated to helping students achieve their dreams of studying in the UK.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to support international students in their journey to access higher education from UK universities. We believe in empowering students not only to discover personal success but also to contribute to the betterment of society by becoming leaders of tomorrow. With our strong understanding of international student recruitment and strategic support, we continue to impart knowledge and guidance every step of the way.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                '17+ years of experience guiding international students',
                '14 global offices serving students worldwide',
                '100% free application service for UK universities',
                'Strong partnerships with leading UK universities',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about-section.jpg"
                alt="Students at university campus"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">17+</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Years Experience</p>
                  <p className="text-sm text-muted-foreground">Since 2009</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border">
          {[
            { number: '17+', label: 'Years Experience', color: 'text-blue-600 dark:text-blue-400' },
            { number: '14', label: 'Global Offices', color: 'text-emerald-600 dark:text-emerald-400' },
            { number: '5000+', label: 'Students Guided', color: 'text-amber-600 dark:text-amber-400' },
            { number: '100+', label: 'Partner Universities', color: 'text-rose-600 dark:text-rose-400' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
