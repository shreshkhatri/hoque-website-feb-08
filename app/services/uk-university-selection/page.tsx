import { Metadata } from 'next'
import { UKUniversitySelectionClient } from './client'

export const metadata: Metadata = {
  title: 'UK University Selection - Free Application Service | HOQUE',
  description: 'Explore our UK university partners and get free application support. Connect with top universities in London and across the UK through Hoque.',
  keywords: 'UK universities, university selection, London universities, undergraduate, postgraduate, study in UK, British universities',
  openGraph: {
    title: 'UK University Selection - Free Application Service',
    description: 'Find your perfect UK university and get free application support from Hoque',
    url: 'https://hoqueconsultancy.com/services/uk-university-selection',
  },
}

export default function UKUniversitySelectionPage() {
  return <UKUniversitySelectionClient />
}
