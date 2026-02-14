'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Building2 } from 'lucide-react'

export function UniversityPartners() {
  const partners = [
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
    { name: 'University for the Creative Arts', logo: '/logos/uca-university.png' },
    { name: 'Northumbria University Newcastle', logo: '/logos/northumbria-newcastle-university.png' },
    { name: "Queen's University Belfast", logo: '/logos/queen-belfast-university.png' },
    { name: 'University of East Anglia', logo: '/logos/uea-university.png' },
    { name: 'Wrexham University', logo: '/logos/wrexham-university.png' },
    { name: 'QA Higher Education', logo: '/logos/qa-higher-education.png' },
  ]

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Our Network
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            University Partners
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with leading universities across the UK and internationally
            to bring you the best opportunities
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-4 sm:space-x-6 lg:space-x-8">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="group flex-shrink-0 w-40 sm:w-48 md:w-56 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center w-full">
                  <div className="mb-2 sm:mb-3 flex justify-center h-20 sm:h-24 md:h-28 items-center">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={100}
                        height={100}
                        className="opacity-70 group-hover:opacity-100 transition-opacity object-contain"
                      />
                    ) : (
                      <Building2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors text-balance line-clamp-2">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="group flex-shrink-0 w-40 sm:w-48 md:w-56 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center w-full">
                  <div className="mb-2 sm:mb-3 flex justify-center h-20 sm:h-24 md:h-28 items-center">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={100}
                        height={100}
                        className="opacity-70 group-hover:opacity-100 transition-opacity object-contain"
                      />
                    ) : (
                      <Building2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors text-balance line-clamp-2">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            We continually expand our partnership network to bring you more
            opportunities and options.
          </p>
          <Link
            href="/partner-universities"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-foreground to-accent text-white rounded-full font-semibold uppercase tracking-wider hover:shadow-lg hover:brightness-110 transition-all"
          >
            <span>View All Partners</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  )
}
