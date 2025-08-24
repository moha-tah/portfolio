'use client'

import { useLocale, useTranslations } from 'next-intl'

import { useTimelineScroll } from '@/hooks/use-timeline-scroll'
import { cn } from '@/lib/utils'
import type { TimelineData } from '@/types/timeline'

import { getStaticData } from './get-static-data'
import { TimelineCard } from './timeline-card'
import { TimelineLine } from './timeline-line'
import { TimelinePoint } from './timeline-point'

export function Timeline() {
  const t = useTranslations('HomePage.aboutMe.timeline')

  const locale = useLocale()

  const timelineData: TimelineData = {
    steps: t.raw('steps') as TimelineData['steps'],
    ...getStaticData(locale)
  }

  const { points, lineProgress, timelineRef, setPointRef } = useTimelineScroll({
    stepCount: timelineData.steps.length
  })

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-8 sm:pt-12">
      <div ref={timelineRef} className="relative">
        <TimelineLine progress={lineProgress} />

        {timelineData.steps.map((step, index) => {
          const point = points[index]
          const isLeft = index % 2 === 0

          return (
            <div
              key={index}
              className="relative mb-16 flex min-h-[200px] items-center sm:mb-24"
            >
              <div
                ref={setPointRef(index)}
                className="absolute top-0 left-1/2 z-10 h-4 w-4 -translate-x-1/2"
              >
                <TimelinePoint
                  isActive={point?.isActive ?? false}
                  progress={point?.progress ?? 0}
                />
              </div>

              <div
                className={cn(
                  'mx-auto w-full max-w-md sm:max-w-lg',
                  'sm:mx-0 sm:ml-16',
                  isLeft
                    ? 'sm:mr-auto sm:ml-0 sm:pr-4'
                    : 'sm:mr-0 sm:ml-auto sm:pl-4'
                )}
              >
                <TimelineCard
                  step={step}
                  url={timelineData.urls[index] ?? ''}
                  iconUrl={timelineData.iconUrls[index] ?? ''}
                  isActive={point?.isActive ?? false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
