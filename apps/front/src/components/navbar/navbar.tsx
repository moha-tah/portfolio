'use client'

import { Folder, Home, MessageSquare, Milestone, Quote } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { AnimatedThemeToggler } from '../shared/animations/animated-theme-toggler'
import { ButtonShimmer } from '../shared/button-shimmer'
import { LanguageSwitcher } from '../shared/language-switcher'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

function LinkWrapper({
  children,
  href,
  name
}: {
  children: React.ReactNode
  href: string
  name: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger aria-label={name}>
        <Link href={href} aria-label={name}>
          <div className="transition-all duration-300 hover:scale-115">
            {children}
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={8}
        className="text-md rounded-full"
      >
        {name}
      </TooltipContent>
    </Tooltip>
  )
}

export function Navbar() {
  const t = useTranslations('navbar')

  const size = 'size-5 min-[430px]:size-6'

  return (
    <nav className="fixed bottom-8 z-50 flex w-full items-center justify-center sm:top-8 sm:bottom-auto">
      <div className="border-muted-foreground/50 bg-background flex h-fit w-11/12 items-center gap-2 rounded-full border-2 p-2 sm:mx-4 sm:w-[700px]">
        <div className="bg-muted flex size-full flex-row items-center justify-between gap-4 rounded-4xl px-4 py-3 sm:px-8">
          <LanguageSwitcher className="hover:scale-110" />
          <AnimatedThemeToggler />
          {/* <Separator className="h-6 bg-red-500" orientation="vertical" /> */}
          <LinkWrapper href="/#hero" name={t('sections.hero')}>
            <Home className={size} />
          </LinkWrapper>
          <LinkWrapper href="/#about" name={t('sections.about')}>
            <Milestone className={size} />
          </LinkWrapper>
          <LinkWrapper href="/#projects" name={t('sections.projects')}>
            <Folder className={size} />
          </LinkWrapper>
          <LinkWrapper href="/#testimonials" name={t('sections.testimonials')}>
            <Quote className={size} />
          </LinkWrapper>
        </div>
        <Link href="#contact" aria-label={t('contactMe')}>
          <div className="group relative overflow-hidden rounded-4xl transition-all duration-300 hover:scale-95">
            <ButtonShimmer className="h-[120px]" />
            <Button
              className="from-primary via-primary to-muted-foreground/50 hidden h-[60px] w-48 rounded-4xl bg-radial-[at_0%_100%] px-8 py-3 text-lg font-medium shadow-none sm:block"
              aria-label={t('contactMe')}
            >
              {t('contactMe')}
            </Button>
            <Button
              size="icon"
              className="from-primary via-primary to-muted-foreground/50 h-[60px] rounded-4xl bg-radial-[at_0%_100%] px-8 py-3 text-lg font-medium shadow-none sm:hidden"
              aria-label={t('contactMe')}
            >
              <MessageSquare className={size} />
            </Button>
          </div>
        </Link>
      </div>
    </nav>
  )
}
