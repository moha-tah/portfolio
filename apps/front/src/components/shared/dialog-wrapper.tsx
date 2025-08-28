'use client'

import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useRouter } from '@/i18n/navigation'

interface Props {
  title: string
  description: string
}

export const DialogWrapper = ({
  children,
  title,
  description
}: PropsWithChildren<Props>) => {
  const router = useRouter()

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={router.back}>
      <DialogContent
        aria-describedby={title}
        className="dark:bg-radial-[at_100%_100%] dark:from-white/10 dark:via-transparent dark:via-70% dark:to-transparent"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
