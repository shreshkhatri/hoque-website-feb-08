'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SearchBox } from './search-box'

export function Hero() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-accent">Study Abroad</span>
              <span className="text-foreground"> – Official University</span>
              <br />
              <span className="text-foreground">Representative!</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-foreground/80 leading-relaxed">
              Our applicants receive 100% free service and support throughout their university application globally.
            </p>

            {/* Search Box */}
            <div className="relative mt-8">
              <SearchBox />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/graduates-hero.jpg"
              alt="Happy graduates celebrating"
              className="w-full max-w-md rounded-3xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
