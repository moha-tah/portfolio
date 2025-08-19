import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractColorFromTailwind(tailwindColor: string): string | null {
  const match = tailwindColor.match(/text-\[([^[\]]+)\]/)
  return match ? match[1] : null
}

export function lightenColor(hex: string, amount: number = 0.3): string {
  if (!hex.startsWith('#')) {
    return hex
  }

  const num = parseInt(hex.slice(1), 16)
  const r = (num >> 16) + Math.round(255 * amount)
  const g = ((num >> 8) & 0x00ff) + Math.round(255 * amount)
  const b = (num & 0x0000ff) + Math.round(255 * amount)

  return `#${Math.min(255, r).toString(16).padStart(2, '0')}${Math.min(255, g).toString(16).padStart(2, '0')}${Math.min(255, b).toString(16).padStart(2, '0')}`
}

export function createAutoGradient(
  tailwindColor: string,
  isDark: boolean = false
): { from: string; to: string } | null {
  const baseColor = extractColorFromTailwind(tailwindColor)
  if (!baseColor) return null

  if (tailwindColor.includes('dark:text-')) {
    const darkColor = tailwindColor.split('dark:text-[')[1]?.split(']')[0]
    if (isDark && darkColor) {
      const lighterDark = lightenColor(darkColor, 0.2)
      return { from: darkColor, to: lighterDark }
    }
  }

  const lighterColor = lightenColor(baseColor, 0.3)
  return { from: baseColor, to: lighterColor }
}
