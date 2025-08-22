import Image from 'next/image'

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-full overflow-visible select-none">
      <Image
        src="/images/background-light.webp"
        alt=""
        fill
        className="opacity-15 transition-opacity duration-300 ease-in-out select-none dark:opacity-0"
        priority
        sizes="100vw"
        aria-hidden="true"
        draggable="false"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <Image
        src="/images/background-dark.webp"
        alt=""
        fill
        className="opacity-0 transition-opacity duration-300 ease-in-out select-none dark:opacity-5"
        priority
        sizes="100vw"
        aria-hidden="true"
        draggable="false"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  )
}
