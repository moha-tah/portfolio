// The Studio is its own app: no locale, no site chrome, no global styles.
export default function StudioLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#101112' }}>{children}</body>
    </html>
  )
}
