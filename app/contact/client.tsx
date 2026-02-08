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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  const officeLocations = [
    {
      city: 'London',
      address: '125 Kingsway, London WC2B 6NH, United Kingdom',
      phone: '+44 (0)20 7946 0000',
      email: 'london@uniAdmission.co.uk',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
    {
      city: 'Manchester',
      address: '42 Deansgate, Manchester M3 2BA, United Kingdom',
      phone: '+44 (0)161 222 5000',
      email: 'manchester@uniAdmission.co.uk',
      hours: 'Mon - Fri: 9:00 AM - 5:30 PM',
    },
    {
      city: 'Edinburgh',
      address: '88 Princes Street, Edinburgh EH2 2ER, United Kingdom',
      phone: '+44 (0)131 225 7000',
      email: 'edinburgh@uniAdmission.co.uk',
      hours: 'Mon - Fri: 9:00 AM - 5:30 PM',
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
                    <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center">
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Thank you for your message!
                      </p>
                      <p className="text-muted-foreground">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
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
                        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Send size={20} />
                        Send Message
                      </button>
                    </form>
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
                          href="mailto:info@uniAdmission.co.uk"
                          className="font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          info@uniAdmission.co.uk
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
                          href="tel:+442079460000"
                          className="font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          +44 (0)20 7946 0000
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
                Our UK Offices
              </h2>
              <p className="text-muted-foreground text-lg">
                Visit us at any of our locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((office, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MapPin className="text-primary" size={28} />
                    {office.city}
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Address</p>
                      <p className="font-medium text-foreground">
                        {office.address}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1">Phone</p>
                      <a
                        href={`tel:${office.phone}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {office.phone}
                      </a>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1">Email</p>
                      <a
                        href={`mailto:${office.email}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {office.email}
                      </a>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1">Hours</p>
                      <p className="font-medium text-foreground">
                        {office.hours}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Don&apos;t hesitate to reach out. Our team is ready to answer all your questions and help you achieve your educational dreams.
            </p>
            <a
              href="#contact-form"
              className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send a Message
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
