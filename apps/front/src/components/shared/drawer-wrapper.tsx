'use client'

import { PropsWithChildren, useState } from 'react'

import { useRouter } from '@/i18n/navigation'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '../ui/drawer'

interface Props {
  title: string
  description: string
}

export const DrawerWrapper = ({
  children,
  title,
  description
}: PropsWithChildren<Props>) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={router.back}>
      <DrawerContent
        aria-describedby={title}
        className="items-center dark:bg-radial-[at_80%_90%] dark:from-white/10 dark:via-transparent dark:via-70% dark:to-transparent"
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
