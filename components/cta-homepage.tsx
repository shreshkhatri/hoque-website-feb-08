import Link from 'next/link'
import { GraduationCap, MessageCircle, ArrowRight } from 'lucide-react'

export function CTAHomepage() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/10" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10" />
          <div className="pointer-events-none absolute top-1/2 right-1/4 h-32 w-32 rounded-full bg-accent/5" />

          <div className="relative flex flex-col items-center text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-6">
              Start Your UK Journey
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl text-balance leading-tight mb-4">
              Your dream of studying in the UK starts here
            </h2>

            {/* Subtext */}
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              Whether you need help choosing the right university, navigating the visa process, or finding scholarships — our expert counsellors are here to guide you every step of the way.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/application-form"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-accent-foreground shadow-lg hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <GraduationCap className="h-5 w-5" />
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-accent/40 bg-primary-foreground/10 px-8 py-4 text-sm font-bold text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 hover:border-accent/70 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
