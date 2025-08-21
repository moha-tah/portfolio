import { useTranslations } from 'next-intl'

import { TestimonialCardProps } from './cards/base-testimonial-card'

export const newline = () => (
  <>
    <br />
    <br />
  </>
)

type TestimonialKey = 'first' | 'second' | 'third'

const createTestimonial = (
  t: ReturnType<typeof useTranslations<'HomePage.testimonials'>>,
  key: TestimonialKey,
  suffix?: string
): TestimonialCardProps => ({
  author: {
    name: t(`list.${key}.author.name`) + (suffix || ''),
    handle: t(`list.${key}.author.handle`) + (suffix || ''),
    avatar: t(`list.${key}.author.avatar`) + (suffix || ''),
    initials: t(`list.${key}.author.initials`) + (suffix || '')
  },
  text: t.rich(`list.${key}.text`, { newline }),
  href: t(`list.${key}.href`) + (suffix || '')
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
    createTestimonial(t, 'first'),
    createTestimonial(t, 'second'),
    createTestimonial(t, 'third'),
    createTestimonial(t, 'third', '2')
  ]
}
