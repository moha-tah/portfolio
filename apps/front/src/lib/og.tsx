import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

// Google Fonts subsets the face to exactly the characters on the card; on any failure the default font is used.
async function loadFont(weight: number, text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,${weight}&text=${encodeURIComponent(text)}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/533 Safari/533'
          }
        }
      )
    ).text()
    const url = /src: url\((.+?)\) format/.exec(css)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

/** Shared social card: dark ground, a mint glow, an eyebrow, a big title. */
export async function ogCard({
  eyebrow,
  title,
  footer
}: {
  eyebrow: string
  title: string
  footer: string
}) {
  const bold = await loadFont(
    700,
    `${eyebrow.toUpperCase()}${title}${footer}Mohamed Tahiri`
  )
  // CJK and Hangul glyphs are about twice as wide as Latin ones
  const width = [...title].reduce(
    (n, c) => n + (/[　-鿿가-힯＀-￯]/.test(c) ? 2 : 1),
    0
  )
  const size = width > 70 ? 56 : width > 60 ? 64 : width > 34 ? 80 : 104
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#07080b',
          color: '#eceef2',
          fontFamily: bold ? 'Bricolage' : 'sans-serif',
          backgroundImage:
            'radial-gradient(circle at 85% 10%, rgba(94,242,194,0.28), transparent 45%), radial-gradient(circle at 1px 1px, rgba(236,238,242,0.10) 1px, transparent 0)',
          backgroundSize: '100% 100%, 28px 28px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 26,
            color: '#8a90a0',
            letterSpacing: 1
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 14,
              background: '#5ef2c2',
              boxShadow: '0 0 24px #5ef2c2'
            }}
          />
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: size,
            lineHeight: 0.98,
            letterSpacing: -3,
            fontWeight: 700,
            maxWidth: 1000
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#8a90a0'
          }}
        >
          <span>Mohamed Tahiri</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      ...(bold
        ? {
            fonts: [
              {
                name: 'Bricolage',
                data: bold,
                weight: 700,
                style: 'normal' as const
              }
            ]
          }
        : {})
    }
  )
}
