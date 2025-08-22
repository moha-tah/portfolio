'use client'

import { useEffect, useState } from 'react'

import { SOCIAL_LINKS } from '@/lib/constants'

/**
 * Since our email can get scraped by bots, we obfuscate it using base64 encoding.
 * In the static HTML, the email is encoded as a base64 string.
 * Then we decode it client-side to get the correct email.
 * We make it a hook to be sure we never leak the email in the static HTML.
 * @returns The correct email as a string
 */
export function useObfuscatedEmail() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const encoded =
      SOCIAL_LINKS.emailBase64Part1 + SOCIAL_LINKS.emailBase64Part2
    setEmail(atob(encoded))
  }, [])

  return email
}
