import Link from 'next/link'
import { GraduationCap, MessageCircle, Trophy } from 'lucide-react'

interface CTAScholarshipsProps {
  universityName?: string
}

export function CTAScholarships({ universityName }: CTAScholarshipsProps) {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            {/* Text */}
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wider mb-4">
                <Trophy className="h-3.5 w-3.5" />
                Scholarship Support
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3 text-balance">
                {universityName
                  ? `Interested in studying at ${universityName}?`
                  : "Don't miss out on funding opportunities"}
              </h2>
              <p className="text-primary-foreground/75 text-sm md:text-base leading-relaxed max-w-lg">
                {universityName
                  ? `Apply directly or let our counsellors guide you through the scholarship application process at ${universityName}.`
                  : 'Our expert counsellors can help you find the right scholarships, prepare your applications, and maximise your chances of success.'}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
              <Link
                href="/application-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent via-cyan-400 to-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <GraduationCap className="h-5 w-5" />
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent/40 bg-primary-foreground/10 px-6 py-3.5 text-sm font-bold text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 hover:border-accent/70 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
