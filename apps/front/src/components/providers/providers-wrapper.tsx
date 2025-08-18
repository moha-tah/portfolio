import { NextIntlClientProvider } from 'next-intl'

import { ThemeProvider } from './theme-provider'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  )
}
