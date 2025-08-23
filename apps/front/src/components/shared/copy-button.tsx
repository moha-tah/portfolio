'use client'

import { TooltipContent } from '@radix-ui/react-tooltip'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Tooltip, TooltipTrigger } from '../ui/tooltip'

const COPY_DURATION_MS = 2000

interface Props {
  text: string
  copyText: string
  copiedText: string
}

export function CopyButton({ text, copyText, copiedText }: Props) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(text)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, COPY_DURATION_MS)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show when HTTPS because we can't copy to clipboard in HTTP context
  if (!mounted || !window.isSecureContext) return null

  return (
    <Tooltip>
      <TooltipTrigger
        className="text-muted-foreground hover:text-foreground hover:bg-muted absolute left-full ml-1 rounded-md p-2 transition-colors md:ml-2"
        onClick={copy}
        aria-label={copyText}
      >
        <div className="relative size-4 md:size-5">
          <Check
            className={cn(
              'absolute size-4 transition-all duration-300 md:size-5',
              copied ? 'scale-100' : 'scale-0'
            )}
          />
          <Copy
            className={cn(
              'absolute size-4 transition-all duration-300 md:size-5',
              copied ? 'scale-0' : 'scale-100'
            )}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="tracking-normal">
        {copied ? copiedText : copyText}
      </TooltipContent>
    </Tooltip>
  )
}
