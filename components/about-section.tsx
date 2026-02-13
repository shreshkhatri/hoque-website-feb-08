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
              About HOQUE

              “HOQUE has provided educational consultancy services and advice to international students throughout the UK since 2009. With a head office in London and a global network of offices including: Dhaka, Colombo, Islamabad and New York, we have a team of fully trained counsellors that can help students achieve their dreams of studying in the UK.
              HOQUE is managed by Mr.Fazlul Hoque who has been working in the education consultancy market for many years and has been an international student in the UK himself; successfully completed his Master of Business Administration (MBA) from Liverpool John Moores University. UK.
              HOQUE is an ambitious company, working with ambitious students, we are expanding our global presence and are aiming to open more offices in the future.
              We  work closely with and develop meaningful relationships  with our university partners.”
              <br />
              With a global network of offices and a head office in London, HOQUE is a trusted educational institute supporting international students worldwide. We proudly offer a 100% free application service for <span className="font-semibold">Foundation, Undergraduate, Postgraduate,</span> and <span className="font-semibold">PhD</span> programs at leading universities for study abroad
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
