import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import { TestimonialCard } from './testimonial-card'

export function Testimonials() {
  return (
    <Carousel
      className="w-full max-w-xl"
      opts={{ loop: true, align: 'center' }}
    >
      <CarouselContent>
        {[...Array(10)].map((_, setIndex) => (
          <CarouselItem key={`${setIndex}`}>
            <TestimonialCard
              author={{
                name: 'Mohamed Tahiri',
                handle: 'moha-tah',
                avatar: 'https://github.com/moha-tah.png'
              }}
              text={
                "bonjour, je suis un test, je m'appelle John Doe et je suis un test. bonjour, je suis un test, je m'appelle John Doe et je suis un test. bonjour, je suis un test, je m'appelle John Doe et je suis un test. bonjour, je suis un test, je m'appelle John Doe et je suis un test. bonjour, je suis un test, je m'appelle John Doe et je suis un test. "
              }
              href={'https://github.com/moha-tah'}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
