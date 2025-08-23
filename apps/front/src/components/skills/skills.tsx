'use client'

import { useTranslations } from 'next-intl'

import { AdditionalSkills } from './additional-skills'
import { SkillCard } from './skill-card'
import { skillsData } from './skills-data'
import { ScrollAnimatedBadge } from '../shared/animations/scroll-animated-badge'
import { ScrollAnimatedSection } from '../shared/animations/scroll-animated-section'
import { ScrollAnimatedText } from '../shared/animations/scroll-animated-text'

export function Skills() {
  const t = useTranslations('HomePage.skills')

  return (
    <ScrollAnimatedSection
      id="skills"
      className="w-full px-4 py-24"
      staggerChildren={0.1}
      delayChildren={0.2}
    >
      <div className="mx-auto max-w-7xl">
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

        <div className="mx-auto flex max-w-[700px] flex-col items-center gap-2">
          {skillsData.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

        <h2 className="py-12 text-center text-4xl font-medium tracking-tighter lg:text-5xl">
          Et bien d&apos;autres...
        </h2>

        <AdditionalSkills />
      </div>
    </ScrollAnimatedSection>
  )
}
