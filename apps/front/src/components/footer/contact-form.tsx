import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function ContactForm() {
  const t = useTranslations('footer.contact.form')

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="w-full space-y-3 md:w-sm">
      <Input
        placeholder={t('namePlaceholder')}
        className="bg-background border-border h-12 rounded-4xl text-base"
      />
      <Input
        type="email"
        placeholder={t('emailPlaceholder')}
        className="bg-background border-border h-12 rounded-4xl text-base"
      />
      <Input
        placeholder={'Entrez le nom de votre entreprise'}
        className="bg-background border-border h-12 rounded-4xl text-base"
      />
      <Button className="bg-foreground text-background hover:bg-foreground/90 h-12 w-full rounded-4xl text-base">
        {t('sendButton')}
      </Button>
    </div>
  )
}
