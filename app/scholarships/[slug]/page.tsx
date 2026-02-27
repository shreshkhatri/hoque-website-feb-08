import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { supabaseAdmin as supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Award, MapPin, GraduationCap, Users, Calendar, ExternalLink, ArrowLeft, CheckCircle, Globe, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Scholarship {
  id: number
  name: string
  slug: string
  country: string
  funding_body: string | null
  funding_amount: string | null
  program_level: string | null
  eligibility_type: string | null
  eligibility_details: string | null
  description: string | null
  full_description: string | null
  how_to_apply: string | null
  application_period: string | null
  official_url: string | null
  created_at: string
}

async function getScholarship(slug: string): Promise<Scholarship | null> {
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null
  return data
}

async function getRelatedScholarships(country: string, currentSlug: string): Promise<Scholarship[]> {
  const { data } = await supabase
    .from('scholarships')
    .select('*')
    .eq('country', country)
    .eq('is_active', true)
    .neq('slug', currentSlug)
    .order('created_at', { ascending: false })
    .limit(3)

  return data || []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scholarship = await getScholarship(slug)
  if (!scholarship) return { title: 'Scholarship Not Found | HOQUE' }
  return {
    title: `${scholarship.name} | Scholarships | HOQUE`,
    description: scholarship.description || `Learn about the ${scholarship.name} scholarship in ${scholarship.country}.`,
  }
}

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scholarship = await getScholarship(slug)

  if (!scholarship) notFound()

  const related = await getRelatedScholarships(scholarship.country, scholarship.slug)

  const countryFlags: Record<string, string> = {
    'United Kingdom': 'gb',
    'Australia': 'au',
    'Canada': 'ca',
    'Ireland': 'ie',
    'New Zealand': 'nz',
    'United States': 'us',
    'Dubai': 'ae',
  }

  const howToApplySteps = scholarship.how_to_apply
    ? scholarship.how_to_apply.split('\n').filter(line => line.trim())
    : []

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            {/* Breadcrumb */}
            <Link
              href={`/scholarships?country=${encodeURIComponent(scholarship.country)}`}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {scholarship.country} Scholarships
            </Link>

            <div className="flex items-start gap-3 mb-4">
              {countryFlags[scholarship.country] && (
                <img
                  src={`https://flagcdn.com/40x30/${countryFlags[scholarship.country]}.png`}
                  alt={scholarship.country}
                  className="w-10 h-7 rounded object-cover mt-1.5"
                />
              )}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance">
                  {scholarship.name}
                </h1>
                {scholarship.funding_body && (
                  <p className="text-primary-foreground/70 mt-2 text-sm md:text-base">
                    Funded by {scholarship.funding_body}
                  </p>
                )}
              </div>
            </div>

            {/* Quick badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {scholarship.program_level && (
                <Badge className="bg-accent/20 text-accent border-accent/30 text-sm">
                  <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                  {scholarship.program_level}
                </Badge>
              )}
              {scholarship.eligibility_type && (
                <Badge className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-sm">
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  {scholarship.eligibility_type}
                </Badge>
              )}
              <Badge className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                {scholarship.country}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Funding Amount Card */}
              {scholarship.funding_amount && (
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-accent/15 rounded-xl">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Scholarship Value</p>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{scholarship.funding_amount}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Description */}
              {scholarship.full_description && (
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">About This Scholarship</h2>
                  <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                    {scholarship.full_description}
                  </div>
                </section>
              )}

              {/* Eligibility */}
              {scholarship.eligibility_details && (
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">Eligibility Criteria</h2>
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <p className="text-foreground/80 leading-relaxed">{scholarship.eligibility_details}</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* How to Apply */}
              {howToApplySteps.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">How to Apply</h2>
                  <div className="space-y-3">
                    {howToApplySteps.map((step, index) => {
                      const cleanStep = step.replace(/^\d+\.\s*/, '')
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-foreground/80 leading-relaxed pt-1">{cleanStep}</p>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                {scholarship.official_url && (
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href={scholarship.official_url} target="_blank" rel="noopener noreferrer">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
                <Button asChild size="lg" variant="outline">
                  <Link href="/services/scholarships-funding-support">
                    Get Application Support
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Facts */}
              <Card className="border-border sticky top-24">
                <CardContent className="p-6 space-y-5">
                  <h3 className="text-lg font-bold text-foreground">Key Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Country</p>
                        <p className="text-sm font-medium text-foreground">{scholarship.country}</p>
                      </div>
                    </div>
                    {scholarship.funding_body && (
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Funded By</p>
                          <p className="text-sm font-medium text-foreground">{scholarship.funding_body}</p>
                        </div>
                      </div>
                    )}
                    {scholarship.program_level && (
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Programme Level</p>
                          <p className="text-sm font-medium text-foreground">{scholarship.program_level}</p>
                        </div>
                      </div>
                    )}
                    {scholarship.eligibility_type && (
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Eligibility</p>
                          <p className="text-sm font-medium text-foreground">{scholarship.eligibility_type}</p>
                        </div>
                      </div>
                    )}
                    {scholarship.application_period && (
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Application Period</p>
                          <p className="text-sm font-medium text-foreground">{scholarship.application_period}</p>
                        </div>
                      </div>
                    )}
                    {scholarship.funding_amount && (
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Value</p>
                          <p className="text-sm font-medium text-foreground">{scholarship.funding_amount}</p>
                        </div>
                      </div>
                    )}
                    {scholarship.official_url && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Website</p>
                          <a
                            href={scholarship.official_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-accent hover:underline break-all"
                          >
                            {new URL(scholarship.official_url).hostname}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Scholarships */}
          {related.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  More Scholarships in {scholarship.country}
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/scholarships?country=${encodeURIComponent(scholarship.country)}`}>
                    View All
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Card key={r.id} className="border-border hover:border-accent/40 hover:shadow-lg transition-all group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-1.5 bg-gradient-to-r from-accent to-primary" />
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                          <Link href={`/scholarships/${r.slug}`}>{r.name}</Link>
                        </h3>
                        {r.funding_amount && (
                          <p className="text-sm font-medium text-accent">{r.funding_amount}</p>
                        )}
                        {r.program_level && (
                          <Badge variant="outline" className="text-xs">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {r.program_level}
                          </Badge>
                        )}
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <Link href={`/scholarships/${r.slug}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
