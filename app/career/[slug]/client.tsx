'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  Building2,
  BadgeCheck,
  ArrowLeft,
  Send,
  User,
  Mail,
  Phone,
  Globe,
  Linkedin,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Vacancy {
  id: number
  title: string
  department: string
  location_country: string
  location_city: string
  job_type: string
  experience_level: string
  salary_range: string | null
  application_deadline: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  is_active: boolean
  created_at: string
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getDaysRemaining(deadline: string): number {
  const now = new Date()
  const deadlineDate = new Date(deadline)
  const diff = deadlineDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const hearAboutOptions = [
  'LinkedIn',
  'Facebook',
  'Company Website',
  'Job Portal',
  'Friend / Referral',
  'University Career Centre',
  'Education Fair',
  'Other',
]

export function JobApplicationClient({ vacancy }: { vacancy: Vacancy }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    current_location: '',
    cover_letter: '',
    linkedin_url: '',
    how_did_you_hear: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [showJobDetails, setShowJobDetails] = useState(false)

  const daysRemaining = getDaysRemaining(vacancy.application_deadline)
  const isExpired = daysRemaining <= 0

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.cover_letter.trim()) {
      newErrors.cover_letter = 'Please write a brief cover letter'
    } else if (formData.cover_letter.trim().length < 50) {
      newErrors.cover_letter = 'Cover letter should be at least 50 characters'
    }

    if (formData.linkedin_url && !/^https?:\/\/(www\.)?linkedin\.com\//.test(formData.linkedin_url)) {
      newErrors.linkedin_url = 'Please enter a valid LinkedIn URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vacancy_id: vacancy.id,
          ...formData,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Your application has been submitted successfully! We will review your application and get back to you soon.')
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  // Success state
  if (submitStatus === 'success') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg sm:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Application Submitted
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {submitMessage}
              </p>
              <div className="mt-4 rounded-xl border border-border bg-muted/50 p-4">
                <p className="text-sm font-medium text-foreground">{vacancy.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {vacancy.location_city}, {vacancy.location_country} -- {vacancy.department}
                </p>
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/career"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Careers
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-primary pb-12 pt-28 sm:pb-16 sm:pt-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
            <div className="absolute -bottom-10 right-0 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/career"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all positions
            </Link>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                  {vacancy.department}
                </span>
                <span className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                  {vacancy.job_type}
                </span>
                <span className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                  {vacancy.experience_level}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                {vacancy.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/70">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {vacancy.location_city}, {vacancy.location_country}
                </span>
                {vacancy.salary_range && (
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    {vacancy.salary_range}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Deadline: {formatDate(vacancy.application_deadline)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left Column - Job Summary + Form */}
            <div className="lg:col-span-3 space-y-8">

              {/* Job Description Collapsible */}
              <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowJobDetails(!showJobDetails)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                      <FileText className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">Job Details</h2>
                      <p className="text-xs text-muted-foreground">View full job description, responsibilities & requirements</p>
                    </div>
                  </div>
                  {showJobDetails ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {showJobDetails && (
                  <div className="border-t border-border p-5 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">About This Role</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{vacancy.description}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Key Responsibilities</h3>
                      <ul className="space-y-2">
                        {vacancy.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {vacancy.requirements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        {vacancy.benefits.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Application Form */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Application Form</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your details below to apply for this position. Fields marked with * are required.
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Submission Failed</p>
                      <p className="mt-0.5 text-xs text-destructive/80">{submitMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="full_name" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      placeholder="e.g. Mohammed Rahman"
                      value={formData.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      className={cn(
                        'w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
                        errors.full_name ? 'border-destructive' : 'border-border'
                      )}
                    />
                    {errors.full_name && <p className="text-xs text-destructive">{errors.full_name}</p>}
                  </div>

                  {/* Email & Phone - 2 columns */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={cn(
                          'w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
                          errors.email ? 'border-destructive' : 'border-border'
                        )}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+44 7XXX XXXXXX"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={cn(
                          'w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
                          errors.phone ? 'border-destructive' : 'border-border'
                        )}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="space-y-1.5">
                    <label htmlFor="current_location" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Current Location
                    </label>
                    <input
                      id="current_location"
                      type="text"
                      placeholder="e.g. London, United Kingdom"
                      value={formData.current_location}
                      onChange={(e) => updateField('current_location', e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="space-y-1.5">
                    <label htmlFor="linkedin_url" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Linkedin className="h-3.5 w-3.5 text-muted-foreground" />
                      LinkedIn Profile
                    </label>
                    <input
                      id="linkedin_url"
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      value={formData.linkedin_url}
                      onChange={(e) => updateField('linkedin_url', e.target.value)}
                      className={cn(
                        'w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
                        errors.linkedin_url ? 'border-destructive' : 'border-border'
                      )}
                    />
                    {errors.linkedin_url && <p className="text-xs text-destructive">{errors.linkedin_url}</p>}
                  </div>

                  {/* How Did You Hear */}
                  <div className="space-y-1.5">
                    <label htmlFor="how_did_you_hear" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground" />
                      How did you hear about this role?
                    </label>
                    <select
                      id="how_did_you_hear"
                      value={formData.how_did_you_hear}
                      onChange={(e) => updateField('how_did_you_hear', e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="">Select an option</option>
                      {hearAboutOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-1.5">
                    <label htmlFor="cover_letter" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      Cover Letter <span className="text-destructive">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Tell us why you are interested in this role and what makes you a great fit.
                    </p>
                    <textarea
                      id="cover_letter"
                      rows={6}
                      placeholder="Write your cover letter here..."
                      value={formData.cover_letter}
                      onChange={(e) => updateField('cover_letter', e.target.value)}
                      className={cn(
                        'w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-y',
                        errors.cover_letter ? 'border-destructive' : 'border-border'
                      )}
                    />
                    <div className="flex items-center justify-between">
                      {errors.cover_letter && <p className="text-xs text-destructive">{errors.cover_letter}</p>}
                      <p className="ml-auto text-xs text-muted-foreground">
                        {formData.cover_letter.length} characters
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                      By submitting, you agree to our privacy policy and data processing terms.
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isExpired}
                      className="shrink-0 gap-2 bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 disabled:opacity-50"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="lg:sticky lg:top-24 space-y-6">

                {/* Position Overview Card */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Position Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Building2 className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="text-sm font-medium text-foreground">{vacancy.department}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium text-foreground">{vacancy.location_city}, {vacancy.location_country}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Clock className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Job Type</p>
                        <p className="text-sm font-medium text-foreground">{vacancy.job_type}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <BadgeCheck className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Experience Level</p>
                        <p className="text-sm font-medium text-foreground">{vacancy.experience_level}</p>
                      </div>
                    </div>
                    {vacancy.salary_range && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <Briefcase className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Salary Range</p>
                          <p className="text-sm font-medium text-foreground">{vacancy.salary_range}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Deadline Card */}
                <div className={cn(
                  'rounded-2xl border p-5 shadow-sm',
                  isExpired
                    ? 'border-destructive/30 bg-destructive/5'
                    : daysRemaining <= 7
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-accent/20 bg-accent/5'
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                      isExpired
                        ? 'bg-destructive/10'
                        : daysRemaining <= 7
                          ? 'bg-orange-100'
                          : 'bg-accent/10'
                    )}>
                      <Calendar className={cn(
                        'h-5 w-5',
                        isExpired
                          ? 'text-destructive'
                          : daysRemaining <= 7
                            ? 'text-orange-600'
                            : 'text-accent'
                      )} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Application Deadline</p>
                      <p className="text-sm font-bold text-foreground">{formatDate(vacancy.application_deadline)}</p>
                      {isExpired ? (
                        <p className="mt-0.5 text-xs font-semibold text-destructive">Applications closed</p>
                      ) : (
                        <p className={cn(
                          'mt-0.5 text-xs font-semibold',
                          daysRemaining <= 7 ? 'text-orange-600' : 'text-accent'
                        )}>
                          {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Application Tips</h3>
                  <ul className="space-y-2.5">
                    {[
                      'Tailor your cover letter to this specific role',
                      'Highlight relevant experience and skills',
                      'Include your LinkedIn profile for a stronger application',
                      'Double-check your contact information',
                      'Submit before the deadline for best consideration',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
