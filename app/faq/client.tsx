'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { supabase } from '@/lib/supabase'

interface CountryFAQ {
  id: number
  country_id: number
  question: string
  answer: string
  display_order: number
}

interface Country {
  id: number
  name: string
}

export function FAQPageClient() {
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)
  const [countryFAQs, setCountryFAQs] = useState<CountryFAQ[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true)
      try {
        const { data } = await supabase
          .from('countries')
          .select('id, name')
          .order('name', { ascending: true })

        if (data && data.length > 0) {
          setCountries(data)
          // Set the first country as default
          setSelectedCountryId(data[0].id)
        }
      } catch (error) {
        console.error('[v0] Error fetching countries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Fetch FAQs when country is selected
  useEffect(() => {
    const fetchFAQs = async () => {
      if (!selectedCountryId) {
        setCountryFAQs([])
        return
      }

      try {
        const { data } = await supabase
          .from('country_faqs')
          .select('*')
          .eq('country_id', selectedCountryId)
          .order('display_order', { ascending: true })

        setCountryFAQs(data || [])
        setExpandedIds([])
      } catch (error) {
        console.error('[v0] Error fetching FAQs:', error)
      }
    }

    fetchFAQs()
  }, [selectedCountryId])

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const selectedCountryName = countries.find((c) => c.id === selectedCountryId)?.name || 'Country'

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
              FAQs
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Select a country to view FAQs about studying abroad, visa requirements, and more
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Country Selector */}
            {!loading && countries.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Select a Country</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {countries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountryId(country.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedCountryId === country.id
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">{selectedCountryName} FAQs</h2>
              {countryFAQs.length > 0 ? (
                countryFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted/50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                      <ChevronDown
                        size={24}
                        className={`text-primary flex-shrink-0 ml-4 transition-transform duration-300 ${
                          expandedIds.includes(faq.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedIds.includes(faq.id) && (
                      <div className="px-6 py-4 bg-background border-t border-border">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No FAQs available for this country yet.</p>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our expert consultants are ready to help you with personalized guidance for your journey.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                Get in Touch with Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
