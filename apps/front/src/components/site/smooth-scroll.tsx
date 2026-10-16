'use client'

import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState } from 'react'

import { usePathname } from '@/i18n/navigation'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({
      lerp: 0.09,
      autoRaf: true,
      anchors: { offset: -80, duration: 1.4 }
    })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  // Lenis keeps its own scroll position, so a client-side navigation must reset it explicitly
  useEffect(() => {
    if (!lenis) return
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target instanceof HTMLElement) {
        lenis.scrollTo(target, { offset: -80, immediate: true })
        return
      }
    }
    lenis.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
