'use client'

import { BookOpen, Volume2, PenTool, Users, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function IELTSPreparationClient() {
  const ieltsComponents = [
    { title: 'Listening', icon: Volume2, description: 'Master listening skills with authentic materials and exam techniques.' },
    { title: 'Reading', icon: BookOpen, description: 'Develop comprehensive reading strategies for faster comprehension.' },
    { title: 'Writing', icon: PenTool, description: 'Perfect your writing with task-specific guidance and feedback.' },
    { title: 'Speaking', icon: Users, description: 'Build confidence through interactive speaking practice sessions.' }
  ]

  const branches = [
    { city: 'London', country: 'United Kingdom', description: 'State-of-the-art IELTS classes' },
    { city: 'Dhaka', country: 'Bangladesh', description: 'Comprehensive IELTS training programs' },
    { city: 'Bangalore', country: 'India', description: 'Professional IELTS coaching centers' }
  ]

  const process = [
    { step: '1', title: 'Initial Assessment', description: 'Take a diagnostic test to identify your current level and areas for improvement' },
    { step: '2', title: 'Personalized Plan', description: 'Receive a customized study plan based on your target score and timeline' },
    { step: '3', title: 'Intensive Training', description: 'Engage in targeted lessons covering all four components of IELTS' },
    { step: '4', title: 'Mock Exams', description: 'Practice with full-length mock tests under exam conditions' }
  ]

  const faqs = [
    {
      q: 'What is the minimum band score for top universities?',
      a: 'Most top universities require a minimum IELTS score of 6.0-6.5 for undergraduate and 7.0 for postgraduate programs. Some countries also require specific IELTS variants for visa purposes.'
    },
    {
      q: 'How long are IELTS results valid?',
      a: 'IELTS results are valid for 2 years only. You will need to retake the test if your results expire before your university enrollment.'
    },
    {
      q: 'Can I take IELTS online?',
      a: 'Yes, IELTS Online is available, but speaking is conducted face-to-face with a certified examiner. Both formats are equally recognized by universities.'
    },
    {
      q: 'How many times can I retake IELTS?',
      a: 'You can retake IELTS as many times as needed. Most students improve by 0.5-1 band with each attempt through focused preparation.'
    },
    {
      q: 'What is the difference between Academic and General IELTS?',
      a: 'Academic IELTS is for university study and professional registration. General IELTS is for migration and work purposes. Academic is the format required for most university admissions.'
    },
    {
      q: 'Do you offer online IELTS classes?',
      a: 'Yes, we provide IELTS tuition via Skype and Zoom for students unable to attend our physical offices. Contact us to arrange your free introductory session.'
    }
  ]

  const relatedServices = [
    { title: 'One to One Consultation', href: '/services/one-to-one-consultation' },
    { title: 'Student Accommodation', href: '/services/student-accommodation' },
    { title: 'Pre-Arrival Checklist', href: '/services/pre-arrival-checklist' },
    { title: 'University Application', href: '/services/university-application' }
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/5">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Master IELTS with Expert Preparation
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Get intensive IELTS training from our expert consultants. Achieve your target band score with personalised coaching available in London, Bangladesh, and India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline">
                View Test Dates
              </Button>
            </div>
          </div>
        </section>

        {/* What is IELTS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">What is IELTS?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              The International English Language Testing System (IELTS) is a globally recognized test of English language proficiency accepted by over 11,000 organizations worldwide, including top universities and colleges across the globe. It is designed for non-native English speakers who wish to study, work, or migrate to English-speaking countries.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why Choose Academic IELTS?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                  <span className="text-foreground">Accepted by thousands of universities worldwide for undergraduate and postgraduate admission</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                  <span className="text-foreground">IELTS UKVI may be required for certain student visa applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                  <span className="text-foreground">Recognized by professional bodies for professional registration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-amber-500 flex-shrink-0 mt-1" />
                  <span className="text-foreground">Results valid for 2 years from the test date</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* IELTS Components */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">IELTS Test Components</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ieltsComponents.map((comp) => {
                const Icon = comp.icon
                return (
                  <div key={comp.title} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <Icon size={32} className="text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">{comp.title}</h3>
                    <p className="text-sm text-muted-foreground">{comp.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Branches */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Study with Us Around the World</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {branches.map((branch) => (
                <div key={branch.city} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <MapPin size={28} className="text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">{branch.city}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{branch.country}</p>
                  <p className="text-sm text-foreground">{branch.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mt-8">
              <p className="text-foreground">
                <strong>Online Classes Available:</strong> Unable to attend our offices? We offer IELTS tuition via Skype and Zoom for flexible learning. Contact us to arrange your free introductory session.
              </p>
            </div>
          </div>
        </section>

        {/* IELTS Preparation Process */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our IELTS Preparation Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Why Study IELTS with HOQUE?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Trained Consultants</h3>
                  <p className="text-sm text-muted-foreground">Learn from experienced IELTS professionals with proven track records.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Intensive Courses</h3>
                  <p className="text-sm text-muted-foreground">Accelerated programs designed to help you achieve your target score quickly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personalized Attention</h3>
                  <p className="text-sm text-muted-foreground">Small class sizes and one-on-one support tailored to your needs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Flexible Learning</h3>
                  <p className="text-sm text-muted-foreground">In-person classes, online tutoring, or blended options available.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Mock Exams</h3>
                  <p className="text-sm text-muted-foreground">Practice under exam conditions with detailed performance analysis.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 size={24} className="text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Proven Results</h3>
                  <p className="text-sm text-muted-foreground">Our students consistently achieve their target IELTS scores.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">Related Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((service) => (
                <Link key={service.title} href={service.href}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow h-full flex items-center justify-between group cursor-pointer">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</span>
                    <ArrowRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 opacity-90 text-pretty">
              Submit your application today and take the first step toward your dream university.
            </p>
            <Button asChild size="lg">
              <Link href="/application-form">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
