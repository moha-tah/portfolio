'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Skill } from '@/types/skill'

import { ButtonShimmer } from '../shared/button-shimmer'

interface Props {
  skill: Skill
}

export function SkillCard({ skill }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const t = useTranslations('HomePage.skills')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedWidth(skill.proficiency)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isVisible, skill.proficiency])

  return (
    <div
      ref={cardRef}
      className="spring-duration-300 spring-bounce-60 border-muted-foreground/50 group relative h-fit w-full rounded-2xl border-2 p-3 pr-8 hover:scale-[1.01]"
    >
      <div className="relative z-10 flex w-full items-center gap-3">
        <div className="flex w-full items-center gap-3">
          {skill.icon}
          <div
            className="flex w-full flex-col"
            style={{
              maxWidth: `${skill.proficiency}% `
            }}
          >
            <h2 className="text-primary truncate text-xl font-medium text-nowrap md:text-2xl">
              {/* @ts-expect-error - We know the key is valid */}
              {t(`${skill.name}.name`)}
            </h2>
            <p
              className="text-muted-foreground hidden text-sm font-medium sm:block md:text-base"
              style={{
                width: `${skill.proficiency}%`
              }}
            >
              {/* @ts-expect-error - We know the key is valid */}
              {t(`${skill.name}.description`)}
            </p>
          </div>
        </div>
        <span className="base-radial-gradient rounded-full px-3 py-1 text-base font-medium text-nowrap text-white backdrop-blur-md">
          {skill.months >= 12
            ? skill.months == 18
              ? t('moreThanOneYear')
              : t('years', { count: Math.floor(skill.months / 12) })
            : t('months', { count: skill.months })}
        </span>
      </div>
      <div className="bg-muted absolute top-0 left-0 z-[1] h-full w-full rounded-2xl" />

      {/* Current proficiency progress bar */}
      <div
        className="bg-background dark:bg-primary-foreground absolute top-0 left-0 z-[2] h-full overflow-hidden rounded-l-xl bg-[radial-gradient(ellipse_at_0%_0%,hsl(215_100%_77%_/_0.75)_0%,transparent_100%)] transition-all duration-1000 ease-out dark:bg-[radial-gradient(ellipse_at_0%_0%,hsl(215_100%_77%_/_0.15)_0%,transparent_80%)]"
        style={{
          width: `${animatedWidth}%`
        }}
      >
        {/* When returning to its original place, the shimmer will be hidden */}
        <ButtonShimmer className="-top-16 -left-32 h-[200px] w-14 transition-[left] duration-0 group-hover:duration-600" />
      </div>
    </div>
  )
}
