'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Globe, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Country {
  id: number
  name: string
  code: string
  flag_emoji: string
  description: string
  currency: string
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const res = await fetch('/api/countries')
      const data = await res.json()
      setCountries(data.countries || [])
    } catch (error) {
      console.error('Failed to fetch countries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = countries.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.code?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Countries</h2>
          <p className="text-sm text-slate-600 mt-1">Manage study destination countries</p>
        </div>
        <Link href="/admin/countries/new">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Country
          </Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search countries..."
          className="pl-9 bg-white"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-teal-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <Globe className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600">No countries found</p>
          <Link href="/admin/countries/new">
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add First Country
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{country.flag_emoji || '🏳️'}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{country.name}</h3>
                  <p className="text-xs text-slate-500 uppercase">{country.code}</p>
                </div>
              </div>
              {country.description && (
                <p className="text-sm text-slate-600 line-clamp-2">{country.description}</p>
              )}
              {country.currency && (
                <p className="text-xs text-slate-500 mt-2">Currency: {country.currency}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
