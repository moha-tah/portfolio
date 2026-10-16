'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Locale, languages } from '@/i18n/config'
import { Link, usePathname, useRouter } from '@/i18n/navigation'

import styles from './site-header.module.css'
import { useLenis } from './smooth-scroll'
import { useMiamiTime } from './use-miami-time'

const SECTIONS = ['travaux', 'parcours'] as const

export function SiteHeader() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const onHome = pathname === '/'
  const time = useMiamiTime()
  const lenis = useLenis()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // hide while scrolling down, come back on the slightest scroll up
  useEffect(() => {
    let last = scrollY
    const onScroll = () => {
      const y = scrollY
      setHidden(y > 160 && y > last + 2)
      if (y < last - 2 || y < 160) setHidden(false)
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onHome) return setActive(null)
    const els = [...SECTIONS, 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [onHome])

  useEffect(() => {
    if (!menuOpen) return
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      removeEventListener('keydown', onKey)
    }
  }, [menuOpen, lenis])

  const items = [
    { id: 'travaux', label: t('work') },
    { id: 'parcours', label: t('path') },
    { id: 'blog', label: t('blog'), page: '/blog' as const },
    { id: 'contact', label: t('contact') }
  ]

  const navLink = (item: (typeof items)[number], className: string) => {
    const close = () => setMenuOpen(false)
    if (item.page) {
      const on = pathname.startsWith(item.page)
      return (
        <Link
          key={item.id}
          href={item.page}
          className={className}
          data-on={on || undefined}
          onClick={close}
        >
          {item.label}
        </Link>
      )
    }
    // the contact block lives in the footer of every page
    if (onHome || item.id === 'contact') {
      return (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={className}
          data-on={active === item.id || undefined}
          onClick={close}
        >
          {item.label}
        </a>
      )
    }
    return (
      <Link
        key={item.id}
        href={`/#${item.id}`}
        className={className}
        onClick={close}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <>
      <header
        className={styles.top}
        data-hidden={(hidden && !menuOpen) || undefined}
      >
        <Link href="/" className={styles.brand}>
          <i aria-hidden="true" />
          Mohamed Tahiri
        </Link>
        <nav className={`${styles.nav} mono`} aria-label={t('label')}>
          {items.map((item) => navLink(item, styles.link))}
        </nav>
        <div className={styles.right}>
          <span className={`${styles.clock} mono dim`} suppressHydrationWarning>
            Miami <b>{time ?? '--:--'}</b>
          </span>
          <LanguageMenu />
          <button
            className={`${styles.menu} mono`}
            aria-expanded={menuOpen}
            aria-controls="site-sheet"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? t('close') : t('menu')}
          </button>
        </div>
      </header>
      <nav
        id="site-sheet"
        className={styles.sheet}
        hidden={!menuOpen}
        aria-label={t('label')}
      >
        {items.map((item) => navLink(item, styles.sheetLink))}
      </nav>
    </>
  )
}

function LanguageMenu() {
  const locale = useLocale() as Locale
  const t = useTranslations('nav')
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('pointerdown', onDown)
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('pointerdown', onDown)
      removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.lang} ref={box}>
      <button
        className="mono"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${locale.toUpperCase()} · ${t('language')}`}
        onClick={() => setOpen((o) => !o)}
      >
        {locale.toUpperCase()}
      </button>
      {open && (
        <ul role="listbox" aria-label={t('language')}>
          {languages.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === locale}
                lang={l.code}
                onClick={() => {
                  setOpen(false)
                  router.replace(pathname, { locale: l.code })
                }}
              >
                <span className="mono dim">{l.code.toUpperCase()}</span>
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
