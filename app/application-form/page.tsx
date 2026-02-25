import { Suspense } from 'react'
import { ApplicationFormClient } from './client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Application Form | HOQUE',
  description: 'Apply for your university program through HOQUE. Complete our comprehensive student application form with document uploads.',
  keywords: ['student application', 'university application', 'apply now', 'education institute'],
}

function ApplicationFormFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
        <p className="text-sm text-slate-500">Loading application form...</p>
      </div>
    </div>
  )
}

export default function ApplicationFormPage() {
  return (
    <Suspense fallback={<ApplicationFormFallback />}>
      <ApplicationFormClient />
    </Suspense>
  )
}
