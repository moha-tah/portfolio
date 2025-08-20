import Image from 'next/image'

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-full overflow-visible select-none">
      <Image
        src="/images/background-light.webp"
        alt=""
        fill
        className="opacity-15 select-none dark:hidden"
        priority
        sizes="100vw"
        aria-hidden="true"
        draggable="false"
      />
      <Image
        src="/images/background-dark.webp"
        alt=""
        fill
        className="hidden opacity-5 select-none dark:block"
        priority
        sizes="100vw"
        aria-hidden="true"
        draggable="false"
      />
    </div>
  )
}
