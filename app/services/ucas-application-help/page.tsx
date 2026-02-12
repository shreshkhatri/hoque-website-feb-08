import { Metadata } from 'next'
import { UcasApplicationHelpClient } from './client'

export const metadata: Metadata = {
  title: 'UCAS Application Help | Expert UCAS Support - HOQUE',
  description:
    'Get professional UCAS application help from HOQUE. Recognized UCAS centre offering free independent advice on UCAS applications.',
  keywords:
    'UCAS application help, UCAS support, university application, UCAS centre, application assistance',
  openGraph: {
    title: 'UCAS Application Help | HOQUE',
    description: 'Expert UCAS application support and guidance from our recognized UCAS centre',
    type: 'website',
  },
}

export default function UcasApplicationHelpPage() {
  return <UcasApplicationHelpClient />
}
