'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: number
  name: string
  country: string
  university: string
  program: string
  image: string
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
    image: '/placeholder-user.jpg',
    rating: 5,
    review: "Thanks to HOQUE's incredible and free support, I have successfully completed my chosen course at the University of Greenwich. They made my study-abroad dream come true by guiding me every step of the way. If you're planning to study overseas, I highly recommend HOQUE as your trusted partner.",
  },
  {
    id: 2,
    name: 'MD Najmuj Jakib',
    country: 'Bangladesh',
    university: "Queen's University Belfast",
    program: 'MSc Artificial Intelligence',
    image: '/placeholder-user.jpg',
    rating: 5,
    review: "I have successfully secured admission to Queen's University Belfast for a Master of Science in Artificial Intelligence with a scholarship. The best part of HOQUE's support was their expert staff, who guided and motivated me to choose the right university to achieve my academic goals.",
  },
  {
    id: 3,
    name: 'Sandra Ori Obasi',
    country: 'Nigeria',
    university: 'University of Bolton',
    program: 'PhD Research',
    image: '/placeholder-user.jpg',
    rating: 5,
    review: "As a PhD student, I truly appreciate the personalized support I received from HOQUE. Their expertise and guidance made complex processes easier and allowed me to focus on my research with confidence. I just know the entire process was smooth even when I was under pressure due to the timeline to start.",
  },
  {
    id: 4,
    name: 'Talha Haider',
    country: 'Pakistan',
    university: 'Middlesex University London',
    program: 'BSc Computer Science',
    image: '/placeholder-user.jpg',
    rating: 5,
    review: "My journey with HOQUE began at a Spot Admission Day, where I first learned about their services. They supported me throughout the entire process, from Faisalabad, Pakistan to London, making the transition seamless and stress-free. From receiving a faster offer letter and securing scholarships to arranging airport pick-up, every step was managed with great care - and all at no cost.",
  },
  {
    id: 5,
    name: 'Vishnu Muttathu R K',
    country: 'India',
    university: 'Northumbria University',
    program: 'MSc Digital Marketing',
    image: '/placeholder-user.jpg',
    rating: 5,
    review: "My name is Vishnu from Kerala, and I have completed my MSc in Digital Marketing at Northumbria University. Without the unwavering, step-by-step support from HOQUE, my dream of studying in the UK might have felt impossible. They believed in me and guided me through every challenge, making my journey truly life-changing.",
  },
  {
    id: 6,
    name: 'S Perera',
    country: 'Sri Lanka',
    university: 'University for the Creative Arts',
    program: 'Global MBA',
    image: '/placeholder-user.jpg',
    rating: 5,
    review: "I am grateful to Uni Admission for guiding me through the admission process for the Global Master of Business & Management program at University for the Creative Arts. Their knowledge, professionalism, and dedication truly made a difference throughout my journey.",
  },
]

export function StudentTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visibleCount = isMobile ? 1 : 3
  const maxIndex = testimonials.length - visibleCount

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Student Experience With HOQUE
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our successful students who achieved their dreams of studying at 
            top universities with our guidance and support.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex bg-card border-border hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex bg-card border-border hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Navigation Buttons - Mobile */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 md:hidden bg-card border-border hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden bg-card border-border hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Cards Slider Container */}
          <div className="overflow-hidden px-4 md:px-8">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: isMobile 
                  ? `translateX(calc(-${currentIndex} * (100% + 1.5rem)))`
                  : `translateX(calc(-${currentIndex} * calc(100% / 3 + 0.5rem)))`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`flex-shrink-0 w-full md:w-[calc((100%-3rem)/3)]`}
                >
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col">
                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />

                    {/* Review Text */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-5">
                      "{testimonial.review}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-primary font-medium truncate">
                          {testimonial.university}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {Array.from({ length: Math.ceil(testimonials.length / visibleCount) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * visibleCount)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                Math.floor(currentIndex / visibleCount) === i
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Desktop Dots */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === i
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
