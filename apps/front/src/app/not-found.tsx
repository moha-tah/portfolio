// Reached for paths outside any locale (e.g. /xx/page). Locale pages have their own styled 404.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#07080b',
          color: '#eceef2',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <main style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 96,
              fontWeight: 800,
              margin: 0,
              letterSpacing: -4
            }}
          >
            404
          </p>
          <p style={{ color: '#8a90a0' }}>This page does not exist.</p>
          {/* a full reload is wanted here: this page sits outside the locale tree */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ color: '#5ef2c2' }}>
            Mohamed Tahiri →
          </a>
        </main>
      </body>
    </html>
  )
}
