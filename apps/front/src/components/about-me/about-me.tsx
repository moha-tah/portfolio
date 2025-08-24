import { useTranslations } from 'next-intl'

import { ScrollAnimatedBadge } from '../shared/animations/scroll-animated-badge'
import { ScrollAnimatedSection } from '../shared/animations/scroll-animated-section'
import { ScrollAnimatedText } from '../shared/animations/scroll-animated-text'

export function AboutMe() {
  const t = useTranslations('HomePage.aboutMe')

  return (
    <ScrollAnimatedSection
      id="about"
      className="w-full py-24"
      staggerChildren={0.1}
      delayChildren={0.2}
    >
      <div className="mx-auto max-w-screen">
        <div className="mb-16 px-4 text-center">
          <ScrollAnimatedBadge delay={0.1} className="mb-6">
            {t('badge')}
          </ScrollAnimatedBadge>

          <ScrollAnimatedText
            title={t('title')}
            description={t('description')}
            delay={0.2}
          />
        </div>
      </div>
    </ScrollAnimatedSection>
  )
}
