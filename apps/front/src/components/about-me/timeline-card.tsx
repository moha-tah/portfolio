'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

import type { TimelineStep } from '@/types/timeline'

import { Button } from '../ui/button'

interface TimelineCardProps {
  step: TimelineStep
  isActive: boolean
  iconUrl: string
  url: string
}

export function TimelineCard({
  step,
  isActive,
  iconUrl,
  url
}: TimelineCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.95
      }}
      animate={
        isActive
          ? {
              opacity: 1,
              y: 0,
              scale: 1
            }
          : {
              opacity: 0,
              y: 50,
              scale: 0.95
            }
      }
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        delay: 0
      }}
    >
      <div className="border-secondary dark:border-secondary/30 bg-background shadow-custom rounded-4xl border p-6 sm:p-8">
        <div className="mb-4">
          <span className="text-secondary-foreground text-sm font-medium">
            {step.subtitle}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-3">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt={step.title}
              width={36}
              height={36}
              className="rounded-sm"
            />
          )}
          <h3 className="text-primary text-2xl font-bold sm:text-3xl">
            {step.title}
          </h3>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {step.description}
        </p>

        {url && (
          <a
            href={url}
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="mt-8 shadow-none">
              {step.learnMoreText}
              <ExternalLink className="text-muted-foreground ml-px" />
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  )
}
