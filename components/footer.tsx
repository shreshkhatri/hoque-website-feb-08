'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Youtube, Instagram, Phone, Mail, MapPin } from 'lucide-react'
import { nameToSlug } from '@/lib/supabase'

export function Footer() {
  const [countries, setCountries] = useState<{ name: string }[]>([])

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('/api/countries')
        const data = await response.json()
        if (Array.isArray(data)) {
          setCountries(data)
        }
      } catch (error) {
        console.error('Error fetching countries for footer:', error)
      }
    }
    fetchCountries()
  }, [])

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 md:gap-8 gap-y-8 justify-center md:justify-start">
          {/* Study Destinations */}
          <div className="space-y-4 md:col-span-1 text-center md:text-left">
            <h3 className="font-semibold text-foreground text-base">Study Destinations</h3>
            <ul className="space-y-3">
              {countries && countries.length > 0 ? (
                countries.map((country) => (
                  <li key={country.name}>
                    <Link
                      href={`/country/${nameToSlug(country.name)}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Study in {country.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No destinations available</li>
              )}
            </ul>
          </div>

          {/* Our Services */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="font-semibold text-foreground text-base mb-4">Our Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Column 1 */}
              <ul className="space-y-3 text-center md:text-left">
                {[
                  { label: 'One to One', href: '/services/one-to-one-consultation' },
                  { label: 'University Selection', href: '/services/uk-university-selection' },
                  { label: 'Course Search', href: '/services/course-search' },
                  { label: 'University Application', href: '/services/university-application' },
                  { label: 'UCAS Application Help', href: '/services/ucas-application-help' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Column 2 */}
              <ul className="space-y-3 text-center md:text-left">
                {[
                  { label: 'VISA Application Support', href: '/services/visa-application-support' },
                  { label: 'Scholarships & Funding Support', href: '/services/scholarships-funding-support' },
                  { label: 'IELTS Preparation', href: '/services/ielts-preparation' },
                  { label: 'Student Accommodation', href: '/services/student-accommodation' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:col-span-1 text-center md:text-left">
            <h3 className="font-semibold text-foreground text-base">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Apply Now', href: '/application-form' },
                { label: 'Support & Guidance', href: '/faq' },
                { label: 'Blog', href: '/blog' },
                { label: 'Career', href: '/career' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow / Brand */}
          <div className="md:col-span-1 space-y-4 text-center md:text-left">
            <h3 className="font-semibold text-foreground text-base">Follow</h3>
            <div className="space-y-4 flex flex-col items-center md:items-start">
                <Image 
                  src="/hoque-logo.png" 
                  alt="HOQUE" 
                  width={179} 
                  height={38}
                  quality={75}
                  className="h-8 w-auto mb-4" 
                />
              {/* Social Media Links */}
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Head Office Details - Below Social Media Links */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="space-y-3 text-xs text-muted-foreground">
            <h3 className="font-semibold text-foreground text-base mb-4 text-center md:text-left">Global Head Office</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center md:justify-start">
              {/* Address */}
              <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
                <MapPin size={20} className="flex-shrink-0 text-primary mt-0.5" />
                <div className="text-center md:text-left">
                  <p className="font-medium text-foreground mb-2">Address</p>
                  <p>HOQUE</p>
                  <p>Unit 102, 65 Whitechapel High Street</p>
                  <p>London, England</p>
                  <p>E1 1DU, United Kingdom</p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
                <Phone size={20} className="flex-shrink-0 text-primary mt-0.5" />
                <div className="text-center md:text-left">
                  <p className="font-medium text-foreground mb-2">Phone</p>
                  <a
                    href="tel:+447878944475"
                    className="hover:text-primary transition-colors font-medium text-sm"
                  >
                    +44 7878 944475
                  </a>
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
                <Mail size={20} className="flex-shrink-0 text-primary mt-0.5" />
                <div className="text-center md:text-left">
                  <p className="font-medium text-foreground mb-2">Email</p>
                  <a
                    href="mailto:Info@hoque.org.uk"
                    className="hover:text-primary transition-colors font-medium text-sm"
                  >
                    Info@hoque.org.uk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between justify-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>© 2026 HOQUE. All rights reserved. </p>
            </div>
            <div className="flex items-center space-x-6">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
              ].map((link, index) => (
                <Link
                  key={`${link.label}-${index}`}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
