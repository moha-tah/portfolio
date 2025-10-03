import { File, PhoneCall } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'

import { AnimatedButton } from '../shared/animations/animated-button'
import { Button } from '../ui/button'

interface Props {
  t: ReturnType<typeof useTranslations<'HomePage.hero'>>
  locale: Locale
  delay: number
  duration?: number
}

export function CallToAction({ t, delay, duration = 0.3 }: Props) {
  return (
    <div className="flex flex-col gap-6 select-none sm:flex-row">
      <AnimatedButton delay={delay} duration={duration}>
        <a
          href={'/files/CV-Mohamed-Tahiri.pdf'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="xl"
            className="from-primary via-primary to-muted-foreground/50 dark:to-muted/40 border-muted-foreground/50 dark:border-muted/70 border-2 bg-radial-[at_100%_100%]"
          >
            <File className="h-4 w-4" />
            {t('downloadResume')}
          </Button>
        </a>
      </AnimatedButton>
      <AnimatedButton delay={delay + 0.2} duration={duration}>
        <Link href="/projects/lvmh-careers-cli">
          <Button
            size="xl"
            className="border-secondary-accent from-secondary via-secondary to-secondary-accent w-full border-2 bg-radial-[at_100%_100%] text-white transition-colors duration-500 ease-in-out"
          >
            <PhoneCall className="h-4 w-4" />
            {t('viewLvmhCli')}
          </Button>
        </Link>
      </AnimatedButton>
    </div>
  )
}
