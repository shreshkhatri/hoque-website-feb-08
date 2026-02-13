import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <p className="text-lg text-foreground leading-relaxed text-justify">
              Since 2009, HOQUE has been guiding international students to achieve their dreams of studying in the UK. With a head office in London and a global network spanning 14 locations across Dhaka, Colombo, Islamabad, New York, Dubai, Mumbai, and beyond, our team of expert advisors provides comprehensive support throughout your educational journey. We proudly offer 100% free application services for <span className="font-semibold">Foundation, Undergraduate, Postgraduate,</span> and <span className="font-semibold">PhD</span> programs at leading UK universities.
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col items-center lg:items-end gap-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center lg:text-right text-foreground">
              About HOQUE
            </h2>

            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
