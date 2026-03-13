'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  GraduationCap,
  Home,
  Search,
  BookOpen,
  Globe,
  Award,
  ArrowRight,
} from 'lucide-react'

const quickLinks = [
  {
    href: '/universities',
    label: 'Browse Universities',
    description: 'Explore top universities worldwide',
    icon: GraduationCap,
  },
  {
    href: '/courses',
    label: 'Find Courses',
    description: 'Search thousands of programmes',
    icon: BookOpen,
  },
  {
    href: '/countries',
    label: 'Study Destinations',
    description: 'Discover countries to study in',
    icon: Globe,
  },
  {
    href: '/scholarships',
    label: 'Scholarships',
    description: 'Find funding opportunities',
    icon: Award,
  },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero area */}
        <section className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">

            {/* Large 404 display */}
            <div className="relative mb-8 select-none">
              <span
                className="text-[10rem] sm:text-[14rem] font-bold leading-none text-border"
                aria-hidden="true"
              >
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Looks like this page went abroad
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto text-pretty">
              The page you are looking for may have moved, been removed, or never existed.
              Let us help you find what you need.
            </p>

            {/* Primary action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground font-medium">Or explore these sections</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Quick links grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {quickLinks.map(({ href, label, description, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
