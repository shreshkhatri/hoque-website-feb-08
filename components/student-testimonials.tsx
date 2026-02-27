'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  country: string
  university: string
  program: string
  image: string
  uniLogo: string
  rating: number
  review: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Krishmee Karki',
    country: 'Nepal',
    university: 'University of Greenwich',
    program: 'MSc Digital Marketing',
    image: '/images/students/student-1.jpg',
    uniLogo: '/images/uni-logos/greenwich.jpg',
    rating: 5,
    review:
      "Thanks to HOQUE's incredible and free support, I have successfully completed my chosen course at the University of Greenwich. They made my study-abroad dream come true by guiding me every step of the way. If you're planning to study overseas, I highly recommend HOQUE as your trusted partner.",
  },
  {
    id: 2,
    name: 'MD Najmuj Jakib',
    country: 'Bangladesh',
    university: "Queen's University Belfast",
    program: 'MSc Artificial Intelligence',
    image: '/images/students/student-2.jpg',
    uniLogo: '/images/uni-logos/queens-belfast.jpg',
    rating: 5,
    review:
      "I have successfully secured admission to Queen's University Belfast for a Master of Science in Artificial Intelligence with a scholarship. The best part of HOQUE's support was their expert staff, who guided and motivated me to choose the right university to achieve my academic goals.",
  },
  {
    id: 3,
    name: 'Sandra Ori Obasi',
    country: 'Nigeria',
    university: 'University of Bolton',
    program: 'PhD Research',
    image: '/images/students/student-3.jpg',
    uniLogo: '/images/uni-logos/bolton.jpg',
    rating: 5,
    review:
      "As a PhD student, I truly appreciate the personalized support I received from HOQUE. Their expertise and guidance made complex processes easier and allowed me to focus on my research with confidence. I just know the entire process was smooth even when I was under pressure due to the timeline to start.",
  },
  {
    id: 4,
    name: 'Talha Haider',
    country: 'Pakistan',
    university: 'Middlesex University London',
    program: 'BSc Computer Science',
    image: '/images/students/student-4.jpg',
    uniLogo: '/images/uni-logos/middlesex.jpg',
    rating: 5,
    review:
      "My journey with HOQUE began at a Spot Admission Day, where I first learned about their services. They supported me throughout the entire process, from Faisalabad, Pakistan to London, making the transition seamless and stress-free. From receiving a faster offer letter and securing scholarships to arranging airport pick-up, every step was managed with great care - and all at no cost.",
  },
  {
    id: 5,
    name: 'Vishnu Muttathu R K',
    country: 'India',
    university: 'Northumbria University',
    program: 'MSc Digital Marketing',
    image: '/images/students/student-5.jpg',
    uniLogo: '/images/uni-logos/northumbria.jpg',
    rating: 5,
    review:
      "My name is Vishnu from Kerala, and I have completed my MSc in Digital Marketing at Northumbria University. Without the unwavering, step-by-step support from HOQUE, my dream of studying in the UK might have felt impossible. They believed in me and guided me through every challenge, making my journey truly life-changing.",
  },
  {
    id: 6,
    name: 'S Perera',
    country: 'Sri Lanka',
    university: 'University for the Creative Arts',
    program: 'Global MBA',
    image: '/images/students/student-6.jpg',
    uniLogo: '/images/uni-logos/uca.jpg',
    rating: 5,
    review:
      "I am grateful to HOQUE for guiding me through the admission process for the Global Master of Business & Management program at University for the Creative Arts. Their knowledge, professionalism, and dedication truly made a difference throughout my journey.",
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[340px] md:w-[380px] flex-shrink-0 mx-3">
      <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300">
        {/* Top: Student photo + Uni logo */}
        <div className="flex items-center justify-between mb-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-2 ring-offset-card">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-border p-1">
            <Image
              src={testimonial.uniLogo}
              alt={testimonial.university}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Quote + Review */}
        <div className="relative flex-1 mb-4">
          <Quote className="absolute -top-1 -left-1 w-8 h-8 text-accent/15" />
          <p className="text-muted-foreground text-sm leading-relaxed pl-5 line-clamp-5">
            {testimonial.review}
          </p>
        </div>

        {/* Rating */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Name + Origin */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-semibold text-foreground text-sm">
            {testimonial.name}
          </h4>
          <p className="text-xs text-primary font-medium mt-0.5">
            {testimonial.university}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            From {testimonial.country}
          </p>
        </div>
      </div>
    </div>
  )
}

export function StudentTestimonials() {
  // Double the testimonials array for seamless infinite loop
  const doubledTestimonials = [...testimonials, ...testimonials]

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

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubledTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
