import Image from 'next/image'

export function Background() {
  return (
    <div className="fixed inset-0 h-screen w-full overflow-visible select-none">
      <Image
        src="/images/background-light.webp"
        alt=""
        fill
        className="opacity-15 dark:hidden"
        priority
        sizes="100vw"
        aria-hidden="true"
      />
      <Image
        src="/images/background-dark.webp"
        alt=""
        fill
        className="hidden opacity-5 dark:block"
        priority
        sizes="100vw"
        aria-hidden="true"
      />
    </div>
  )
}
