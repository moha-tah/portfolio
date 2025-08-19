'use client'

import { MoveRight, PhoneCall } from 'lucide-react'

import { useAnimatedPassions } from '@/hooks/use-animated-passions'

import { AnimatedText } from './animated-text'
import { Label } from './label'
import { CustomButton } from '../shared/custom-button'

export function Hero() {
  const { currentIndex, currentPassion, passions } = useAnimatedPassions()

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <Label />
          <div className="flex flex-col gap-4">
            <AnimatedText currentIndex={currentIndex} passions={passions} />
            <p className="text-muted-foreground max-w-2xl text-center text-lg leading-relaxed tracking-tight md:text-xl">
              Prêt à rejoindre votre équipe en stage de fin d&apos;études de 6
              mois dès février 2026.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <CustomButton
              className="gap-4 text-white"
              gradient={{ from: '#141414', to: '#323232' }}
            >
              Télécharger mon CV <MoveRight className="h-4 w-4" />
            </CustomButton>
            <CustomButton
              className="gap-4 text-white dark:text-black"
              autoColor={currentPassion.color}
              forceSimpleColor
            >
              Me contacter <PhoneCall className="h-4 w-4" />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}
