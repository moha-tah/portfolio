'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'America/New_York',
  hour: '2-digit',
  minute: '2-digit'
})

/** Local time in Miami, null until mounted so server and client HTML match. */
export function useMiamiTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])
  return time
}
