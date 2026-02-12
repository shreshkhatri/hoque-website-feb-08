'use client'

import { Search, BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function CourseSearchClient() {
  const courseCategories = [
    { name: 'Art and Design', courses: 250 },
    { name: 'Accounting and Finance', courses: 320 },
    { name: 'Architecture', courses: 150 },
    { name: 'Animation & Illustration', courses: 120 },
    { name: 'Built Environment', courses: 180 },
    { name: 'Business and Management', courses: 520 },
    { name: 'Biology and Biomedical Science', courses: 280 },
    { name: 'Computer Science', courses: 450 },
    { name: 'Computer Engineering and Cybernetics', courses: 210 },
    { name: 'Chemical Engineering', courses: 140 },
    { name: 'Chemistry', courses: 160 },
    { name: 'Dance, Drama and Music', courses: 200 },
    { name: 'Design', courses: 300 },
    { name: 'Education & Learning', courses: 180 },
    { name: 'Engineering', courses: 380 },
    { name: 'English', courses: 220 },
    { name: 'Forensic Technology', courses: 95 },
    { name: 'Graphic Design & Photography', courses: 160 },
    { name: 'Game and Digital Media', courses: 240 },
    { name: 'Geography', courses: 170 },
    { name: 'Health and Social Care', courses: 350 },
    { name: 'History', courses: 190 },
    { name: 'Human Resources', courses: 210 },
    { name: 'International Relations', courses: 130 },
    { name: 'Journalism and PR', courses: 140 },
    { name: 'Law', courses: 280 },
    { name: 'Landscape Architecture', courses: 110 },
    { name: 'Mathematics', courses: 260 },
    { name: 'Marketing', courses: 290 },
    { name: 'Mechanical Engineering', courses: 190 },
    { name: 'Midwifery', courses: 85 },
    { name: 'Media, Film and Cultural Study', courses: 200 },
    { name: 'Music and Theatre', courses: 175 },
    { name: 'Nursing and Caring Professions', courses: 320 },
    { name: 'Paramedic Science', courses: 70 },
    { name: 'Pharmacy', courses: 120 },
    { name: 'Public Health', courses: 140 },
    { name: 'Social Science', courses: 250 },
    { name: 'Sociology', courses: 130 },
    { name: 'Social Work', courses: 100 },
    { name: 'Teacher Training', courses: 160 },
    { name: 'Tourism and Hospitality', courses: 180 },
    { name: 'TESOL MA', courses: 110 },
  ]

  const steps = [
    {
      number: '1',
      title: 'Browse Courses',
      description:
        'Explore our comprehensive database of thousands of courses across all subject areas at foundation, undergraduate, and postgraduate levels.',
    },
    {
      number: '2',
      title: 'Compare Programs',
      description:
        'Compare entry requirements, course content, fees, and university rankings to find the perfect match for your goals.',
    },
    {
      number: '3',
      title: 'Get Guidance',
      description:
        'Our consultants provide personalized recommendations based on your academic background and career aspirations.',
    },
    {
      number: '4',
      title: 'Apply Successfully',
      description:
        'We guide you through the entire application process to maximize your chances of admission.',
    },
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'University Selection', href: '/services/uk-university-selection' },
    { title: 'University Application', href: '/services/university-application' },
    { title: 'UCAS Application Help', href: '/services/ucas-application-help' },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Find Your Perfect Course
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Explore thousands of courses across all subjects at top universities worldwide. From foundation programs to postgraduate degrees, we help you
                find the ideal program for your academic and career goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg">
                    Browse All Courses
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Course Search */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose Our Course Search Service?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="text-primary" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Comprehensive Database</h3>
                <p className="text-muted-foreground">
                  Access thousands of courses across all subjects and universities in the UK, all in one place.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Detailed Information</h3>
                <p className="text-muted-foreground">
                  Compare entry requirements, course content, duration, fees, and university rankings easily.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Compass className="text-primary" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our consultants provide personalized recommendations based on your academic background and goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Categories */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Popular Course Categories</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courseCategories.map((category, index) => (
                <div
                  key={index}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.courses} courses available</p>
                    </div>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">How Our Course Search Works</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Benefits of Using Our Service</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                'Access to all major partner universities',
                'Courses at all levels (Foundation to Postgraduate)',
                'Real-time course availability and updates',
                'Expert career guidance',
                'Personalized course recommendations',
                'Application support included',
                'Scholarship information for each course',
                'Complete fee breakdown and comparisons',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-amber-500 mt-1" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Related Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((service, index) => (
                <Link key={index} href={service.href}>
                  <div className="rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md cursor-pointer h-full flex flex-col justify-center">
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Universities Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Our Partner Universities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We work with leading universities across the UK and internationally to help you find the perfect fit for your academic goals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'University of Oxford', rank: 'World Top 5' },
                { name: 'University of Cambridge', rank: 'World Top 5' },
                { name: 'Imperial College London', rank: 'World Top 10' },
                { name: 'University College London', rank: 'World Top 10' },
                { name: 'London School of Economics', rank: 'World Top 50' },
                { name: 'University of Edinburgh', rank: 'World Top 50' },
                { name: 'University of Manchester', rank: 'World Top 50' },
                { name: 'University of Birmingham', rank: 'World Top 100' },
                { name: 'University of Warwick', rank: 'World Top 100' },
                { name: 'University of Sheffield', rank: 'World Top 100' },
                { name: 'University of Bristol', rank: 'World Top 100' },
                { name: 'Duke University', rank: 'World Top 25' },
              ].map((uni, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-card border border-border hover:border-primary hover:shadow-lg transition-all text-center">
                  <h3 className="font-bold text-foreground mb-2">{uni.name}</h3>
                  <p className="text-sm text-muted-foreground">{uni.rank}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/universities">
                <Button variant="outline" size="lg">
                  Explore All Universities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-primary/20 bg-card p-8 md:p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Start Your Journey?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Submit your application today and take the first step toward your dream university.
              </p>
              <Button asChild size="lg">
                <Link href="/application-form">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
