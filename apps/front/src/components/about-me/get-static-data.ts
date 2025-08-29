import { TimelineData } from '@/types/timeline'

export function getStaticData(locale: string): Omit<TimelineData, 'steps'> {
  return {
    urls: [
      locale === 'fr' ? 'https://www.utc.fr/' : 'https://www.utc.fr/en/',
      'https://www.napta.io/',
      'https://www.instagram.com/utcode_',
      null,
      locale === 'fr'
        ? 'https://www.utc.fr/formations/diplome-dingenieur/genie-informatique-gi/filiere-ingenierie-des-systemes-informatiques-isi/'
        : 'https://www.utc.fr/en/courses-and-training/the-utc-engineering-diploma/computer-sciences-and-engineering-gi/specialty-computer-system-engineering-isi/'
    ],
    iconUrls: [
      '/images/logos/utc.webp',
      '/images/logos/utcode.webp',
      '/images/logos/napta.webp',
      null,
      '/images/logos/utc.webp'
    ]
  }
}
