// Each segment ([locale], studio) renders its own <html>; this root only exists so app/not-found.tsx has a parent.
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
