'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { Passion } from './passions'

interface AnimatedTextProps {
  currentIndex: number
  passions: Passion[]
}

export function AnimatedText({ currentIndex, passions }: AnimatedTextProps) {
  return (
    <h1 className="max-w-2xl text-center text-5xl font-semibold tracking-tighter md:text-7xl">
      <span>Mohamed Tahiri,</span>
      <br />
      <span>passionné de</span>
      <span className="relative flex w-full justify-center overflow-hidden text-center md:pt-1 md:pb-4">
        &nbsp;
        {passions.map((passion: Passion, index: number) => (
          <motion.span
            key={index}
            className={cn('absolute font-bold', passion.color)}
            initial={{ opacity: 0, y: '-100' }}
            transition={{ type: 'spring', stiffness: 50 }}
            animate={
              currentIndex === index
                ? {
                    y: 0,
                    opacity: 1
                  }
                : {
                    y: currentIndex > index ? -150 : 150,
                    opacity: 0
                  }
            }
          >
            {passion.name}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}
