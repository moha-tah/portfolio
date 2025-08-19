'use client'

import { cn, createAutoGradient, extractColorFromTailwind } from '@/lib/utils'

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  gradient?: {
    from: string
    to: string
  }
  darkGradient?: {
    from: string
    to: string
  }
  autoColor?: string
  forceSimpleColor?: boolean
  className?: string
}

export function CustomButton({
  children,
  gradient,
  darkGradient,
  autoColor,
  forceSimpleColor = false,
  className,
  ...props
}: CustomButtonProps) {
  const hasGradient = Boolean(
    !forceSimpleColor &&
      (gradient || (autoColor && createAutoGradient(autoColor, false)))
  )

  // Mode couleur simple (pas de gradient)
  if (!hasGradient) {
    const baseColor = autoColor
      ? extractColorFromTailwind(autoColor)
      : undefined

    let darkColor = baseColor
    if (autoColor?.includes('dark:text-')) {
      darkColor = autoColor.split('dark:text-[')[1]?.split(']')[0] || baseColor
    }

    return (
      <button
        className={cn(
          'w-fit rounded-full px-6 py-3 font-bold hover:scale-105 active:scale-95',
          'shadow-custom flex items-center transition-all duration-200',
          '[transition:background-color_500ms_ease-in-out,transform_200ms_ease-in-out]',
          className
        )}
        style={
          baseColor
            ? ({
                backgroundColor: baseColor,
                '--dark-bg-color': darkColor
              } as React.CSSProperties & { '--dark-bg-color'?: string })
            : undefined
        }
        {...props}
      >
        {baseColor && (
          <style>{`
            .dark button[style*="--dark-bg-color"] {
              background-color: var(--dark-bg-color) !important;
              transition: background-color 500ms ease-in-out, transform 200ms ease-in-out !important;
            }
          `}</style>
        )}
        {children}
      </button>
    )
  }

  // Mode gradient
  const finalGradient = autoColor
    ? createAutoGradient(autoColor, false)
    : gradient
  const finalDarkGradient = autoColor
    ? createAutoGradient(autoColor, true)
    : darkGradient

  if (!finalGradient) return null

  return (
    <button
      className={cn(
        'w-fit rounded-full px-6 py-3 font-bold hover:scale-105 active:scale-95',
        'shadow-custom flex items-center transition-all duration-200',
        '[transition:background_1000ms_ease-in-out,transform_200ms_ease-in-out]',
        className
      )}
      style={
        {
          background: `linear-gradient(to right, ${finalGradient.from}, ${finalGradient.to})`,
          '--dark-gradient': finalDarkGradient
            ? `linear-gradient(to right, ${finalDarkGradient.from}, ${finalDarkGradient.to})`
            : undefined
        } as React.CSSProperties & { '--dark-gradient'?: string }
      }
      {...props}
    >
      <style>{`
        .dark button[style*="--dark-gradient"] {
          background: var(--dark-gradient) !important;
          transition: background 1000ms ease-in-out, transform 200ms ease-in-out !important;
        }
      `}</style>
      {children}
    </button>
  )
}
