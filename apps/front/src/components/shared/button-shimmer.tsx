import { cn } from '@/lib/utils'

export function ButtonShimmer(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'absolute -top-1/2 -left-14 h-36 w-10 -rotate-45 bg-gradient-to-r from-white/10 via-white/50 to-white/10 blur-sm transition-all duration-300 ease-in-out group-hover:left-[150%] group-active:left-[150%]',
        props.className
      )}
    />
  )
}
