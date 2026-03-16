/**
 * SEO Configuration
 * This file contains SEO-related settings and meta tags configuration
 */

export const seoConfig = {
  domain: 'https://www.hoque.org.uk',
  socialHandle: '@hoque_uk',
  socialProfile: 'HOQUE University Representative',
  twitterHandle: '@hoque_uk',
  author: 'HOQUE',
  
  // OpenGraph defaults
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'HOQUE',
  },
  
  // Schema.org structured data
  schema: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'HOQUE',
    description: 'Expert educational institute helping international students secure places at top universities worldwide',
    url: 'https://www.hoque.org.uk',
    logo: 'https://www.hoque.org.uk/icon.png',
    sameAs: [
      'https://www.facebook.com/hoque',
      'https://www.twitter.com/hoque_uk',
      'https://www.linkedin.com/company/hoque',
      'https://www.instagram.com/hoque_uk',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'England',
      streetAddress: 'Your Street Address',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+44-your-number',
      email: 'contact@hoque.org.uk',
    },
  },
  
  // Keywords by page
  keywords: {
    home: 'international students, UK universities, university admissions, education counselling, visa guidance',
    courses: 'university courses, degree programmes, postgraduate studies, undergraduate courses',
    universities: 'UK universities, top universities, university rankings, university information',
    events: 'education events, webinars, university events, student events',
  },
}

/**
 * Generate JSON-LD structured data
 */
export function getStructuredData(type: 'Organization' | 'Course' | 'University' | 'Event') {
  const baseSchema = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        '@type': 'EducationalOrganization',
        ...seoConfig.schema,
      }

    case 'Course':
      return {
        ...baseSchema,
        '@type': 'Course',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'HOQUE',
        },
      }

    case 'University':
      return {
        ...baseSchema,
        '@type': 'EducationalOrganization',
        '@id': 'https://www.hoque.org.uk/universities',
      }

    case 'Event':
      return {
        ...baseSchema,
        '@type': 'EducationEvent',
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'HOQUE',
        },
      }

    default:
      return baseSchema
  }
}

/**
 * Generate University structured data for rich results
 */
export function getUniversityStructuredData(university: {
  name: string
  description?: string | null
  city?: string | null
  address?: string | null
  website_url?: string | null
  logo_url?: string | null
  banner_image_url?: string | null
  founded_year?: number | null
  ranking_national?: number | null
  ranking_global?: number | null
  country?: { name?: string; currency?: string } | null
}, slug: string, courseCount?: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    '@id': `${seoConfig.domain}/university/${slug}`,
    name: university.name,
    description: university.description || `Study at ${university.name} with HOQUE guidance`,
    url: `${seoConfig.domain}/university/${slug}`,
    logo: university.logo_url || `${seoConfig.domain}/icon.png`,
    image: university.banner_image_url || university.logo_url,
    ...(university.founded_year && { foundingDate: university.founded_year.toString() }),
    ...(university.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: university.address,
        addressLocality: university.city,
        addressCountry: university.country?.name || 'United Kingdom',
      },
    }),
    ...(university.website_url && { sameAs: [university.website_url] }),
    ...(courseCount && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${university.name} Courses`,
        numberOfItems: courseCount,
      },
    }),
    // Aggregate rating placeholder - can be populated with real data later
    ...(university.ranking_national && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Math.min(5, Math.max(1, 5 - (university.ranking_national / 30))).toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: '100',
      },
    }),
  }
}

/**
 * Generate Course structured data for rich results
 */
export function getCourseStructuredData(course: {
  name: string
  code?: string | null
  level?: string | null
  description?: string | null
  course_overview?: string | null
  duration_years?: number | null
  tuition_fees_international?: number | null
  intake_months?: string | null
  universities?: { name?: string; city?: string } | null
  countries?: { currency?: string; name?: string } | null
}, slug: string) {
  const universityName = course.universities?.name || 'Partner University'
  const currency = course.countries?.currency || 'GBP'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${seoConfig.domain}/course/${slug}`,
    name: course.name,
    description: course.course_overview || course.description || `Study ${course.name} at ${universityName}`,
    url: `${seoConfig.domain}/course/${slug}`,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: universityName,
      ...(course.universities?.city && { address: { '@type': 'PostalAddress', addressLocality: course.universities.city } }),
    },
    ...(course.level && {
      educationalLevel: course.level,
      courseCode: course.code,
    }),
    ...(course.duration_years && {
      timeRequired: `P${course.duration_years}Y`,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: `${course.duration_years} year${course.duration_years > 1 ? 's' : ''} full-time`,
        ...(course.intake_months && { startDate: course.intake_months.split(',')[0]?.trim() }),
      },
    }),
    ...(course.tuition_fees_international && {
      offers: {
        '@type': 'Offer',
        price: course.tuition_fees_international,
        priceCurrency: currency,
        category: 'International Student Fee',
        availability: 'https://schema.org/InStock',
      },
    }),
    // Educational credential
    ...(course.level && {
      educationalCredentialAwarded: course.level === 'Bachelor' ? 'Bachelor\'s Degree' :
        course.level === 'Master' ? 'Master\'s Degree' :
        course.level === 'PhD' ? 'Doctoral Degree' :
        course.level === 'MBA' ? 'Master of Business Administration' :
        `${course.level} Certificate`,
    }),
  }
}

/**
 * Generate BreadcrumbList structured data
 */
export function getBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${seoConfig.domain}${item.url}`,
    })),
  }
}

/**
 * Generate FAQPage structured data
 */
export function getFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
