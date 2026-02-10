import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/chat-widget'
import { MobileSearch } from '@/components/mobile-search'
import { HeroSearchProvider } from '@/components/hero-search-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | HOQUE',
    default: 'HOQUE - UK University Consulting',
  },
  description: 'Expert consultancy for UK university admissions. Helping global students secure places at top UK universities including Oxford, Cambridge, and Imperial College.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'HOQUE - Expert UK University Consulting',
    description: 'Get expert guidance for UK university admissions. We help international students secure places at top universities like Oxford, Cambridge, and Imperial College.',
    url: 'https://www.hoque.org.uk',
    siteName: 'HOQUE',
    images: [
      {
        url: 'https://www.hoque.org.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HOQUE - UK University Consulting',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOQUE - Expert UK University Consulting',
    description: 'Get expert guidance for UK university admissions. We help international students secure places at top universities.',
    images: ['https://www.hoque.org.uk/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased overflow-x-hidden`}>
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
