'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TestimonialForm } from '@/components/admin/testimonial-form'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [testimonial, setTestimonial] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonial() {
      try {
        const res = await fetch(`/api/admin/testimonials/${id}`)
        if (!res.ok) throw new Error('Failed to fetch testimonial')
        const json = await res.json()
        setTestimonial(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load testimonial')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonial()
  }, [id])

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to update testimonial')
      }

      router.push('/admin/testimonials')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 pb-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-24 bg-slate-200 rounded" />
          <div className="h-10 w-64 bg-slate-200 rounded" />
          <div className="h-5 w-48 bg-slate-200 rounded" />
        </div>
        <div className="animate-pulse space-y-4 bg-card border rounded-lg p-6">
          <div className="h-6 w-40 bg-slate-200 rounded" />
          <div className="h-4 w-56 bg-slate-200 rounded" />
          <div className="space-y-3 mt-4">
            <div className="h-10 w-full bg-slate-200 rounded" />
            <div className="h-10 w-full bg-slate-200 rounded" />
            <div className="h-10 w-full bg-slate-200 rounded" />
          </div>
        </div>
        <div className="animate-pulse space-y-4 bg-card border rounded-lg p-6">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-32 w-32 bg-slate-200 rounded" />
        </div>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div className="space-y-6 pb-10">
        <div>
          <Link href="/admin/testimonials">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Testimonial not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/testimonials">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Edit Testimonial</h1>
          <p className="text-muted-foreground mt-1">Update student success story</p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <TestimonialForm initialData={testimonial} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
