'use client'

import { useTranslations } from 'next-intl'

import { LanguageSelector } from '@/components/shared/language-selector'
import { ModeToggle } from '@/components/shared/mode-toggle'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function Home() {
  const t = useTranslations('HomePage')

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight">
            {t('title')}
          </CardTitle>
          <CardDescription className="flex flex-col items-center gap-4 text-lg">
            {t('workInProgress')}
            <div className="flex items-center gap-2">
              <ModeToggle />
              <LanguageSelector />
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
