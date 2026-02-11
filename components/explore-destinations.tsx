'use client'

import Link from 'next/link'
import Image from 'next/image'
import { nameToSlug } from '@/lib/supabase'

interface Destination {
  id: string
  name: string
  flagImage: string
  image: string
  code: string
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'United Kingdom',
    flagImage: '/destination-flags/united-kingdom.jpg',
    image: '/destinations/united-kingdom.png',
    code: 'GB',
  },
  {
    id: '2',
    name: 'Australia',
    flagImage: '/destination-flags/australia.jpg',
    image: '/destinations/australia.png',
    code: 'AU',
  },
  {
    id: '3',
    name: 'Canada',
    flagImage: '/destination-flags/canada.jpg',
    image: '/destinations/canada.png',
    code: 'CA',
  },
  {
    id: '4',
    name: 'New Zealand',
    flagImage: '/destination-flags/new-zealand.jpg',
    image: '/destinations/new-zealand.png',
    code: 'NZ',
  },
  {
    id: '5',
    name: 'United States',
    flagImage: '/destination-flags/united-states.jpg',
    image: '/destinations/united-states.png',
    code: 'US',
  },
  {
    id: '6',
    name: 'Ireland',
    flagImage: '/destination-flags/ireland.jpg',
    image: '/destinations/ireland.png',
    code: 'IE',
  },
  {
    id: '7',
    name: 'Dubai',
    flagImage: '/destination-flags/dubai.jpg',
    image: '/destinations/dubai.png',
    code: 'AE',
  },
]

export function ExploreDestinations() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Choose your dream country—
          </h2>
          <p className="text-3xl sm:text-4xl font-bold">
            <span className="text-primary">Study Abroad</span>
            <span className="text-foreground">, Build Your Future</span>
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="flex justify-center mb-12">
          <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/country/${nameToSlug(destination.name)}`}
                className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Country Badge - Bottom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={destination.flagImage || "/placeholder.svg"}
                      alt={`${destination.name} flag`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">
                    {destination.name}
                  </span>
                </div>
              </Link>
            ))}

            {/* More Countries Coming Card */}
            <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-xl sm:text-2xl font-semibold text-balance">
                  More <br />Coming Soon ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
