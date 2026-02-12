import { Metadata } from 'next'
import { UKUniversitySelectionClient } from './client'

export const metadata: Metadata = {
  title: 'University Selection - Free Application Service | HOQUE',
  description: 'Explore our university partners worldwide and get free application support. Connect with top universities across multiple countries through HOQUE.',
  keywords: 'universities, university selection, undergraduate, postgraduate, study abroad, international universities',
  openGraph: {
    title: 'University Selection - Free Application Service',
    description: 'Find your perfect university and get free application support from HOQUE',
    url: 'https://www.hoque.org.uk/services/uk-university-selection',
  },
}

export default function UKUniversitySelectionPage() {
  return <UKUniversitySelectionClient />
}
