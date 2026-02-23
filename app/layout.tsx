import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/chat-widget'
import { MobileSearch } from '@/components/mobile-search'
import { HeroSearchProvider } from '@/components/hero-search-context'
import { AnnouncementBanner } from '@/components/announcement-banner'
import { getStructuredData } from '@/lib/seo-config'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], preload: true });
const _geistMono = Geist_Mono({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hoque.org.uk'),
  title: {
    template: '%s | HOQUE',
    default: 'HOQUE - Your Gateway to World-Class Universities',
  },
  description: 'Expert educational institute helping international students secure places at top universities worldwide. Personalised guidance for admissions, visas, scholarships, and more.',
  keywords: 'international students, UK universities, university admissions, education counselling, visa guidance, scholarships',
  generator: 'v0.app',
  referrer: 'strict-origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    'google-site-verification': '',
    googlebot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'HOQUE - Your Gateway to World-Class Universities',
    description: 'Expert educational institute helping international students secure places at top universities worldwide. Personalised guidance for admissions, visas, scholarships, and more.',
    url: 'https://www.hoque.org.uk',
    siteName: 'HOQUE',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'HOQUE - Official UK University Representative',
        type: 'image/png',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOQUE - Your Gateway to World-Class Universities',
    description: 'Expert educational institute helping international students secure places at top universities worldwide. Personalised guidance for admissions, visas, scholarships, and more.',
    images: ['/icon.png'],
    site: '@hoque_uk',
    creator: '@hoque_uk',
  },
  alternates: {
    canonical: 'https://www.hoque.org.uk',
    languages: {
      'en-GB': 'https://www.hoque.org.uk',
      'en-US': 'https://www.hoque.org.uk',
    },
  },
  verification: {
    google: '',
    yandex: '',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = getStructuredData('Organization')

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <AnnouncementBanner />
        <HeroSearchProvider>
          {children}
        </HeroSearchProvider>
        <MobileSearch />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
