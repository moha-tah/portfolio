'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

interface FaqItemProps {
  question: string
  answer: string
  delay?: number
}

export function FaqItem({ question, answer, delay = 0 }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 20, filter: 'blur(4px)' }
      }
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay
      }}
      className={cn(
        'bg-card overflow-hidden rounded-4xl border shadow-lg transition-colors duration-300',
        isOpen ? 'border-secondary/30' : 'border-secondary-accent/30'
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-accent/50 flex w-full cursor-pointer items-center justify-between p-4 text-left transition-colors duration-200 sm:p-6"
      >
        <h3 className="text-foreground pr-4 text-base font-medium sm:text-xl">
          {question}
        </h3>
        <div
          className={cn(
            'relative flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
            isOpen ? 'bg-secondary/30' : 'bg-secondary-accent/30'
          )}
        >
          <motion.div
            className="bg-foreground h-0.5 w-4"
            initial={false}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
          <motion.div
            className="bg-foreground absolute h-4 w-0.5"
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="overflow-hidden"
          >
            <div className="border-border border-t px-6 pt-4 pb-6">
              <p className="text-foreground leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
