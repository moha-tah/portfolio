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
      avatar: notTranslatedInformation.companyAvatar
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
      avatar: 'https://github.com/mena0018.png',
      companyName: 'Décathlon',
      companyAvatar: 'images/logos/decathlon.webp',
      initials: 'RM',
      href: 'https://rabiemenad.fr'
    }),
    createTestimonial(t, 'second', {
      avatar: 'https://github.com/john-doe.png',
      companyName: 'Orange',
      companyAvatar: 'images/logos/orange.webp',
      initials: 'JD',
      href: 'https://www.linkedin.com/in/john-doe'
    }),
    createTestimonial(t, 'third', {
      avatar: 'https://github.com/JulienGasparLopes.png',
      companyName: 'Napta',
      companyAvatar: 'images/logos/napta.webp',
      initials: 'JGL',
      href: 'https://www.linkedin.com/in/julien-gaspar-lopes-430191b5'
    }),
    createTestimonial(t, 'fourth', {
      avatar: 'https://github.com/OlivierKnell.png',
      companyName: 'Napta',
      companyAvatar: 'images/logos/napta.webp',
      initials: 'OK',
      href: 'https://www.linkedin.com/in/olivier-knell-156021a8'
    })
  ]
}
