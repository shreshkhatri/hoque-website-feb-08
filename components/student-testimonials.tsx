'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Star, Quote, User } from 'lucide-react'
import useSWR from 'swr'

interface Testimonial {
  id: string
  name: string
  country: string
  university: string
  program: string
  photo_url: string | null
  university_logo_url: string | null
  rating: number
  review: string
}

// Fallback hardcoded testimonials in case database is empty
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Krishmee Karki',
    country: 'Nepal',
    university: 'University of Greenwich',
    program: 'MSc Digital Marketing',
    photo_url: '/images/students/student-1.jpg',
    university_logo_url: '/images/uni-logos/greenwich.jpg',
    rating: 5,
    review:
      "Thanks to HOQUE's incredible and free support, I have successfully completed my chosen course at the University of Greenwich. They made my study-abroad dream come true by guiding me every step of the way. If you're planning to study overseas, I highly recommend HOQUE as your trusted partner.",
  },
  {
    id: '2',
    name: 'MD Najmuj Jakib',
    country: 'Bangladesh',
    university: "Queen's University Belfast",
    program: 'MSc Artificial Intelligence',
    photo_url: '/images/students/student-2.jpg',
    university_logo_url: '/images/uni-logos/queens-belfast.jpg',
    rating: 5,
    review:
      "I have successfully secured admission to Queen's University Belfast for a Master of Science in Artificial Intelligence with a scholarship. The best part of HOQUE's support was their expert staff, who guided and motivated me to choose the right university to achieve my academic goals.",
  },
  {
    id: '3',
    name: 'Sandra Ori Obasi',
    country: 'Nigeria',
    university: 'University of Bolton',
    program: 'PhD Research',
    photo_url: '/images/students/student-3.jpg',
    university_logo_url: '/images/uni-logos/bolton.jpg',
    rating: 5,
    review:
      "As a PhD student, I truly appreciate the personalized support I received from HOQUE. Their expertise and guidance made complex processes easier and allowed me to focus on my research with confidence. I just know the entire process was smooth even when I was under pressure due to the timeline to start.",
  },
  {
    id: '4',
    name: 'Talha Haider',
    country: 'Pakistan',
    university: 'Middlesex University London',
    program: 'BSc Computer Science',
    photo_url: '/images/students/student-4.jpg',
    university_logo_url: '/images/uni-logos/middlesex.jpg',
    rating: 5,
    review:
      "My journey with HOQUE began at a Spot Admission Day, where I first learned about their services. They supported me throughout the entire process, from Faisalabad, Pakistan to London, making the transition seamless and stress-free. From receiving a faster offer letter and securing scholarships to arranging airport pick-up, every step was managed with great care - and all at no cost.",
  },
  {
    id: '5',
    name: 'Vishnu Muttathu R K',
    country: 'India',
    university: 'Northumbria University',
    program: 'MSc Digital Marketing',
    photo_url: '/images/students/student-5.jpg',
    university_logo_url: '/images/uni-logos/northumbria.jpg',
    rating: 5,
    review:
      "My name is Vishnu from Kerala, and I have completed my MSc in Digital Marketing at Northumbria University. Without the unwavering, step-by-step support from HOQUE, my dream of studying in the UK might have felt impossible. They believed in me and guided me through every challenge, making my journey truly life-changing.",
  },
  {
    id: '6',
    name: 'S Perera',
    country: 'Sri Lanka',
    university: 'University for the Creative Arts',
    program: 'Global MBA',
    photo_url: '/images/students/student-6.jpg',
    university_logo_url: '/images/uni-logos/uca.jpg',
    rating: 5,
    review:
      "I am grateful to HOQUE for guiding me through the admission process for the Global Master of Business & Management program at University for the Creative Arts. Their knowledge, professionalism, and dedication truly made a difference throughout my journey.",
  },
]

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[360px] md:w-[400px] flex-shrink-0 mx-3">
      <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg hover:border-accent/40 transition-shadow duration-300">
        {/* Top banner with student photo and uni logo */}
        <div className="relative h-28 bg-gradient-to-r from-primary to-accent/80">
          <div className="absolute -bottom-10 left-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-card shadow-lg bg-slate-100">
              {testimonial.photo_url ? (
                <Image
                  src={testimonial.photo_url}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <User className="h-10 w-10 text-slate-400" />
                </div>
              )}
            </div>
          </div>
          {testimonial.university_logo_url && (
            <div className="absolute top-3 right-3 bg-white rounded-xl shadow-md p-1.5">
              <div className="relative w-25 h-25 rounded-lg overflow-hidden">
                <Image
                  src={testimonial.university_logo_url}
                  alt={testimonial.university}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pt-14 pb-6 flex flex-col flex-1">
          <div className="mb-4">
            <h4 className="font-bold text-foreground text-base">
              {testimonial.name}
            </h4>
            <p className="text-sm text-accent font-semibold mt-0.5">
              {testimonial.university}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {testimonial.program} &middot; From {testimonial.country}
            </p>
          </div>

          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <div className="relative flex-1">
            <Quote className="absolute -top-1 -left-1 w-7 h-7 text-accent/15" />
            <p className="text-muted-foreground text-sm leading-relaxed pl-5 line-clamp-5">
              {testimonial.review}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialSkeleton() {
  return (
    <div className="w-[360px] md:w-[400px] flex-shrink-0 mx-3">
      <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
        <div className="relative h-28 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-full bg-slate-200 ring-4 ring-card shadow-lg animate-pulse" />
          </div>
        </div>
        <div className="px-6 pt-14 pb-6 flex flex-col flex-1">
          <div className="mb-4 space-y-2">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-slate-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function StudentTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(0)
  const isPausedRef = useRef(false)
  const rafRef = useRef<number>(0)

  // Fetch testimonials from database (only homepage ones)
  const { data, isLoading } = useSWR<{ data: Testimonial[] }>(
    '/api/testimonials?homepage=true',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  // Use fetched data or fallback to hardcoded testimonials
  const testimonials = data?.data && data.data.length > 0 ? data.data : fallbackTestimonials

  const animate = useCallback(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const halfWidth = track.scrollWidth / 2

    if (!isPausedRef.current) {
      positionRef.current += 0.5
      if (positionRef.current >= halfWidth) {
        positionRef.current -= halfWidth
      }
    }

    track.style.transform = `translate3d(${-halfWidth + positionRef.current}px, 0, 0)`

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  // Triple the array for seamless wrap
  const tripled = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-20 bg-background overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14 px-4 sm:px-6 lg:px-8">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Success Stories
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
          Student Experience With HOQUE
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
          Hear from our successful students who achieved their dreams of studying at
          top universities with our guidance and support.
        </p>
      </div>

      {/* Scrolling track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {isLoading ? (
          <div className="flex">
            {[...Array(6)].map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ transform: 'translate3d(0,0,0)' }}
            onMouseEnter={() => { isPausedRef.current = true }}
            onMouseLeave={() => { isPausedRef.current = false }}
          >
            {tripled.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
