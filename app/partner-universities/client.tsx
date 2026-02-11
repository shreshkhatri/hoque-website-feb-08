'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Building2 } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const ALL_PARTNERS = [
  { name: 'Abertay University', logo: '/logos/abertay-university.png' },
  { name: 'University of Chester', logo: '/logos/chester-university.png' },
  { name: 'University of Bedfordshire', logo: '/logos/bedfordshire-university.png' },
  { name: 'BPP University', logo: '/logos/bpp-university.png' },
  { name: 'Buckinghamshire New University', logo: '/logos/buckinghamshire-university.png' },
  { name: 'University of the West of Scotland', logo: '/logos/uws-university.jpg' },
  { name: 'University of Bolton', logo: '/logos/bolton-university.png' },
  { name: 'Coventry University', logo: '/logos/coventry-university.png' },
  { name: 'Anglia Ruskin University', logo: '/logos/anglia-ruskin-university.png' },
  { name: 'University of East London', logo: '/logos/east-london-university.jpg' },
  { name: 'University of Derby', logo: '/logos/derby-university.png' },
  { name: 'Keele University', logo: '/logos/keele-university.png' },
  { name: 'Northeastern University', logo: '/logos/northeastern-university.png' },
  { name: 'University of Greenwich', logo: '/logos/greenwich-university.png' },
  { name: 'Middlesex University', logo: '/logos/middlesex-university.png' },
  { name: 'London South Bank University', logo: '/logos/lsbu-university.png' },
  { name: 'De Montfort University', logo: '/logos/de-montfort-university.png' },
  { name: 'University of Hertfordshire', logo: '/logos/hertfordshire-university.png' },
  { name: 'University of Greater Manchester', logo: '/logos/greater-manchester-university.png' },
  { name: 'University of Hull', logo: '/logos/hull-university.png' },
  { name: 'University of Portsmouth', logo: '/logos/portsmouth-university.png' },
  { name: 'University of Wales Trinity Saint David', logo: '/logos/wales-trinity-st-david-university.png' },
  { name: 'Ulster University', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QA%20logo-nqkVlAskF7VGcipr6fp9TErKcQ5ZXo.jpeg' },
  { name: 'Oxford Brookes University', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QA%20logo-nqkVlAskF7VGcipr6fp9TErKcQ5ZXo.jpeg' },
  { name: 'University for the Creative Arts', logo: '/logos/uca-university.png' },
  { name: 'Southampton Solent University', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QA%20logo-nqkVlAskF7VGcipr6fp9TErKcQ5ZXo.jpeg' },
  { name: 'Northumbria University Newcastle', logo: '/logos/northumbria-newcastle-university.png' },
  { name: "Queen's University Belfast", logo: '/logos/queen-belfast-university.png' },
  { name: 'University of East Anglia', logo: '/logos/uea-university.png' },
  { name: 'Swansea University', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QA%20logo-nqkVlAskF7VGcipr6fp9TErKcQ5ZXo.jpeg' },
  { name: 'Wrexham University', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QA%20logo-nqkVlAskF7VGcipr6fp9TErKcQ5ZXo.jpeg' },
]

const ITEMS_PER_PAGE = 9

export function PartnersClient() {
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)

  const displayedPartners = ALL_PARTNERS.slice(0, displayedCount)
  const hasMore = displayedCount < ALL_PARTNERS.length

  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, ALL_PARTNERS.length))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            Our University Partners
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with over 30 leading universities across the UK and internationally to provide the best opportunities for international students
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="w-full h-32 flex items-center justify-center mb-4">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={140}
                    className="opacity-70 group-hover:opacity-100 transition-opacity object-contain"
                  />
                ) : (
                  <Building2 className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <p className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors text-center text-balance line-clamp-3">
                {partner.name}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-2 px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span>Load More Partners</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Showing Count */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">
            Showing {displayedCount} of {ALL_PARTNERS.length} partners
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
