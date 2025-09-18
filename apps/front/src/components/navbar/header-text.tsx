'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { SOCIAL_LINKS } from '@/lib/constants'

export function HeaderText() {
  const t = useTranslations('header')

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full justify-center pt-2"
    >
      <span className="text-muted-foreground md:text-md pb-4 text-xs">
        {t.rich('note', {
          linkToCode: (chunks) => (
            <a
              href={`${SOCIAL_LINKS.gitHub}/portfolio`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:text-foreground font-semibold underline transition-colors duration-300 hover:no-underline">
                {chunks}
              </span>
            </a>
          )
        })}
      </span>
    </motion.div>
  )
}
