'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Globe } from 'lucide-react'
import { Country, nameToSlug } from '@/lib/supabase'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/countries')
      const data = await response.json()
      setCountries(data)
    } catch (error) {
      console.error('Error fetching countries:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading countries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Globe size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Study Destinations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore top study destinations around the world. Discover opportunities, visa
              requirements, and student life in your preferred country.
            </p>
          </div>
        </section>

        {/* Countries Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <Link
                  key={country.id}
                  href={`/country/${nameToSlug(country.name)}`}
                  className="group bg-card border border-border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/50"
                >
                  <div className="p-6">
                    {/* Flag and Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-5xl mb-3">{country.flag_emoji}</div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {country.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {country.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="space-y-2 mb-6 text-sm">
                      {country.cost_of_living_monthly && (
                        <div className="flex justify-between text-muted-foreground">
                          <span>Monthly Cost of Living:</span>
                          <span className="font-semibold text-foreground">
                            ${country.cost_of_living_monthly}
                          </span>
                        </div>
                      )}
                      {country.visa_processing_time && (
                        <div className="flex justify-between text-muted-foreground">
                          <span>Visa Processing:</span>
                          <span className="font-semibold text-foreground">
                            {country.visa_processing_time}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                      <span>Learn More</span>
                      <ArrowRight size={16} className="ml-2" />
                    </div>
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
