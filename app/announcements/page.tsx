import { Suspense } from 'react'
import AnnouncementsClient from './client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Skeleton } from '@/components/ui/skeleton'


// Revalidate the page every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60

export const metadata = {
  title: 'Scholarships & Announcements | HOQUE',
  description: 'Browse the latest university scholarships, deadline updates, and important announcements for international students',
}

export default function AnnouncementsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Scholarships & Announcements</h1>
            <p className="text-lg text-slate-600">
              Stay updated with the latest scholarship opportunities, application deadlines, and important announcements from universities worldwide
            </p>
          </div>

          <Suspense fallback={<LoadingState />}>
            <AnnouncementsClient />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
