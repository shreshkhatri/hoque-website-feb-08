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
                Founded in 2015, HOQUE has been the trusted partner for 
                international students seeking admission to the world's most 
                prestigious universities. We specialize in guiding students through 
                every step of their educational journey.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Our dedicated team of experienced education consultants works closely 
              with each student to craft compelling applications, prepare for interviews, 
              and secure the best possible outcomes. We understand the challenges of 
              navigating the complex university admission process and are here to make 
              your dreams a reality.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Expert consultancy from university admission officers',
                'Personalized guidance tailored to your goals',
                'Support across 50+ countries worldwide',
                'Strong relationships with top universities globally',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="group">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
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
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">98%</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Success Rate</p>
                  <p className="text-sm text-muted-foreground">5000+ students guided</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border">
          {[
            { number: '5000+', label: 'Students Guided' },
            { number: '98%', label: 'Success Rate' },
            { number: '10+', label: 'Years Experience' },
            { number: '50+', label: 'Countries Served' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
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
