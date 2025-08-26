import { useTranslations } from 'next-intl'

import { FaqItem } from './faq-item'
import { ScrollAnimatedBadge } from '../shared/animations/scroll-animated-badge'
import { ScrollAnimatedSection } from '../shared/animations/scroll-animated-section'
import { ScrollAnimatedText } from '../shared/animations/scroll-animated-text'

interface FaqQuestion {
  question: string
  answer: string
}

export function FAQ() {
  const t = useTranslations('HomePage.faq')

  const questions = t.raw('questions') as FaqQuestion[]

  return (
    <ScrollAnimatedSection
      id="faq"
      className="w-full px-6 pt-8"
      staggerChildren={0.1}
      delayChildren={0.2}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <ScrollAnimatedBadge delay={0.1} className="mb-6">
            {t('badge')}
          </ScrollAnimatedBadge>

          <ScrollAnimatedText
            title={t('title')}
            description={t('description')}
            delay={0.2}
          />
        </div>

        <div className="space-y-4">
          {questions.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </ScrollAnimatedSection>
  )
}
