'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Skill } from './skills-data'
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
      className="spring-duration-300 spring-bounce-60 border-muted-foreground/50 group relative h-fit w-full rounded-2xl border-2 p-3 pr-8 hover:scale-105"
    >
      <div className="relative z-10 flex items-center gap-3">
        {skill.icon}
        <div className="flex w-full flex-col">
          <h2
            className="text-secondary text-xl font-medium md:text-2xl"
            style={{
              width: `${skill.proficiency}%`
            }}
          >
            {/* @ts-expect-error - We know the key is valid */}
            {t(`${skill.name}.name`)}
          </h2>
          <p
            className="dark:text-muted text-muted-foreground text-sm font-medium md:text-base"
            style={{
              width: `${skill.proficiency}%`
            }}
          >
            {/* @ts-expect-error - We know the key is valid */}
            {t(`${skill.name}.description`)}
          </p>
        </div>
        <span className="bg-muted-foreground/70 text-secondary rounded-full px-3 py-1 text-base font-medium backdrop-blur-md">
          {skill.proficiency}%
        </span>
      </div>
      <div className="bg-muted absolute top-0 left-0 z-[1] h-full w-full rounded-2xl" />

      {/* Current proficiency progress bar */}
      <div
        className="bg-secondary-foreground absolute top-0 left-0 z-[2] h-full overflow-hidden rounded-l-2xl transition-all duration-1000 ease-out"
        style={{
          width: `${animatedWidth}%`
        }}
      >
        {/* When returning to its original place, the shimmer will be hidden */}
        <ButtonShimmer className="-top-16 -left-32 h-[200px] w-14 transition-[left] duration-0 group-hover:duration-600 dark:bg-white" />
      </div>
    </div>
  )
}
