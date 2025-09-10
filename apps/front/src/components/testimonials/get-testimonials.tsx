import { useTranslations } from 'next-intl'

import { TestimonialCardProps } from './cards/base-testimonial-card'

export const newline = () => (
  <>
    <br />
    <br />
  </>
)

type TestimonialKey = 'first' | 'second' | 'third' | 'fourth'

const createTestimonial = (
  t: ReturnType<typeof useTranslations<'HomePage.testimonials'>>,
  key: TestimonialKey,
  notTranslatedInformation: {
    avatar: string
    companyName: string
    companyAvatar: string
    companyUrl: string
    initials: string
    href: string
  }
): TestimonialCardProps => ({
  author: {
    name: t(`list.${key}.author.name`),
    handle: t(`list.${key}.author.handle`),
    initials: notTranslatedInformation.initials,
    avatar: notTranslatedInformation.avatar,
    company: {
      name: notTranslatedInformation.companyName,
      avatar: notTranslatedInformation.companyAvatar,
      url: notTranslatedInformation.companyUrl
    }
  },
  text: t.rich(`list.${key}.text`, { newline }),
  href: notTranslatedInformation.href
})

export function getTestimonials(
  t: ReturnType<typeof useTranslations<'HomePage.testimonials'>>
): [
  TestimonialCardProps,
  TestimonialCardProps,
  TestimonialCardProps,
  TestimonialCardProps
] {
  return [
    createTestimonial(t, 'first', {
      avatar: '/images/profile-pictures/julien-g-lopes.webp',
      companyName: 'Napta',
      companyAvatar: '/images/logos/napta.webp',
      companyUrl: 'https://www.napta.io',
      initials: 'JGL',
      href: 'https://www.linkedin.com/in/julien-gaspar-lopes-430191b5'
    }),
    createTestimonial(t, 'second', {
      avatar: '/images/profile-pictures/rabie-menad.webp',
      companyName: 'Décathlon',
      companyAvatar: '/images/logos/decathlon.webp',
      companyUrl: 'https://decathlon.com',
      initials: 'RM',
      href: 'https://rabiemenad.fr'
    }),
    createTestimonial(t, 'third', {
      avatar: '/images/profile-pictures/olivier-knell.webp',
      companyName: 'Napta',
      companyAvatar: '/images/logos/napta.webp',
      companyUrl: 'https://www.napta.io',
      initials: 'OK',
      href: 'https://www.linkedin.com/in/olivier-knell-156021a8'
    }),
    createTestimonial(t, 'fourth', {
      avatar: '/images/profile-pictures/ibrahim-zehhaf.webp',
      companyName: 'Orange',
      companyAvatar: '/images/logos/orange.webp',
      companyUrl: 'https://orange.com',
      initials: '',
      href: 'https://github.com/ibrahim-zehhaf'
    })
  ]
}
