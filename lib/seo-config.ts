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
