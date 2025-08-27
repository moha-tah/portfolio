import { NextIntlClientProvider } from 'next-intl'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  )
}
