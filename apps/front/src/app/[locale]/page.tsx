'use client'

import { useTranslations } from 'next-intl'

import { LanguageSelector } from '@/components/shared/language-selector'
// import { ThemeSwitcherV1 } from '@/components/shared/theme-switcher-v1'
import { ThemeSwitcherV2 } from '@/components/shared/theme-switcher-v2'
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
              {/* <ThemeSwitcherV1 /> */}
              <ThemeSwitcherV2 />
              <LanguageSelector />
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
