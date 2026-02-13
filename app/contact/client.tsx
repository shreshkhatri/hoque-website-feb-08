'use client'

import React, { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
} from 'lucide-react'

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('[v0] Error submitting form:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const officeLocations = [
    {
      city: 'London',
      country: 'United Kingdom',
      address: 'Unit 102, 65 Whitechapel High Street,E1 1DU, England',
      phone: '+44 7878 944475',
      email: 'info@hoque.org.uk',
      label: 'HOQUE UK HEAD OFFICE',
    },
    {
      city: 'New York',
      country: 'USA',
      address: '1362 Ocean Ave, Brooklyn, HOQ1230, USA',
      phone: '+1 XXX XXX XXXX',
      email: 'newyork@hoque.org.uk',
      label: 'HOQUE USA OFFICE',
    },
    {
      city: 'Dhaka',
      country: 'Bangladesh',
      address: 'Green Landmark Tower 129 Kolabagan Dhanmondi Dhaka 1205',
      phone: '+880 XXX XXX XXXX',
      email: 'bangladesh@hoque.org.uk',
      label: 'HOQUE BANGLADESH OFFICE',
    },
    {
      city: 'Kerala',
      country: 'India',
      address: 'Teepeyem Square, 3rd floor, Mahatma Gandhi Road. Ravipuram, Kochi, Kerala 682015',
      phone: '+91 XXX XXX XXXX',
      email: 'India@hoque.org.uk',
      label: 'HOQUE KOCHI INDIA OFFICE',
    },
    {
      city: 'Kathmandu',
      country: 'Nepal',
      address: 'Adwait Marga, Kathmandu - 28, Putalisadak 44600',
      phone: '+977 970-2691031',
      email: 'nepal@hoque.org.uk',
      label: 'HOQUE NEPAL OFFICE',
    },
    {
      city: 'Dubai',
      country: 'the United Arab Emirates',
      address: 'IFZA Business Park, DDP, Premises Number 74649-001 Dubai Silicon Oasis',
      phone: '+971 553592759',
      email: 'info@hoque.org.uk',
      label: 'HOQUE DUBAI OFFICE',
    },
    {
      city: 'Colombo',
      country: 'Sri-Lanka',
      address: 'TBC',
      phone: '+94 XXX XXX XXXX',
      email: 'srilanka@hoque.org.uk',
      label: 'HOQUE SRI-LANKA OFFICE',
    },
    {
      city: 'Islamabad',
      country: 'Pakistan',
      address: 'TBC',
      phone: '+92 XXX XXX XXXX',
      email: 'pakistan@hoque.org.uk',
      label: 'HOQUE PAKISTAN OFFICE',
    },
    {
      city: 'Auckland',
      country: 'New Zealand',
      address: 'Updating Soon',
      phone: 'Updating Soon',
      email: 'newzealand@hoque.org.uk',
      label: 'HOQUE NEW ZEALAND OFFICE',
      isComingSoon: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our expert advisors to discuss your educational journey
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <MessageSquare className="text-primary" size={32} />
                    Send us a Message
                  </h2>

                  {submitted ? (
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                        Message Sent Successfully!
                      </p>
                      <p className="text-green-700 dark:text-green-300 mb-4">
                        Thank you for contacting us. We appreciate your message and will get back to you within 24 hours.
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Please check your email for any updates regarding your inquiry.
                      </p>
                    </div>
                  ) : (
                    <>
                      {error && (
                        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                          <p className="text-sm text-red-800 dark:text-red-200">
                            {error}
                          </p>
                        </div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                              placeholder="+44 (0)20 7946 0000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Subject
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                          >
                            <option value="">Select a subject</option>
                            <option value="admission">Admission Inquiry</option>
                            <option value="course">Course Information</option>
                            <option value="visa">Visa & Documentation</option>
                            <option value="scholarships">Scholarships</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                            placeholder="Tell us about your university aspirations..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send size={20} />
                          {loading ? 'Sending...' : 'Send Message'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Quick Contact
                  </h3>

                  <div className="space-y-5">
                    {/* Email */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Mail className="text-primary mt-1" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href="mailto:info@hoque.org.uk"
                          className="font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          info@hoque.org.uk
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Phone className="text-primary mt-1" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a
                          href="tel:+44 7878 944475"
                          className="font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          +44 7878 944475
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Clock className="text-primary mt-1" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="font-semibold text-foreground">
                          Mon - Fri: 9 AM - 6 PM
                        </p>
                        <p className="text-sm text-muted-foreground">
                          GMT/BST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-accent/10 border border-accent rounded-2xl p-6">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Average Response Time:</span>{' '}
                    24 hours
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    We aim to respond to all inquiries within one business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Our Global Offices
              </h2>
              <p className="text-muted-foreground text-lg">
                Visit us at any of our international locations
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {officeLocations.map((office, index) => (
                <div
                  key={index}
                  className={`${office.isComingSoon
                      ? 'bg-gradient-to-br from-amber-50/50 via-orange-50/50 to-amber-50/50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-amber-950/20 border-amber-200 dark:border-amber-800/50'
                      : 'bg-card border-border'
                    } border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative`}
                  style={{ flex: '0 0 calc(33.333% - 2.67rem)', minWidth: '280px' }}
                >
                  {office.isComingSoon && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold text-foreground">
                      {office.city}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {office.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {office.country}
                  </p>

                  <div className="space-y-4 text-sm mt-6">
                    <div>
                      <p className="text-muted-foreground mb-1 font-medium">Address</p>
                      <p className={`${office.isComingSoon ? 'text-amber-700 dark:text-amber-300 italic' : 'text-foreground'} leading-relaxed`}>
                        {office.address}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1 font-medium">Phone</p>
                      {office.isComingSoon ? (
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {office.phone}
                        </p>
                      ) : (
                        <a
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          className="text-primary hover:underline"
                        >
                          {office.phone}
                        </a>
                      )}
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1 font-medium">Email</p>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-primary hover:underline break-all"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
