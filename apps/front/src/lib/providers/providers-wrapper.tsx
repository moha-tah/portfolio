import { NextIntlClientProvider } from 'next-intl'

import { QueryProvider } from './query-provider'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>{children}</QueryProvider>
    </NextIntlClientProvider>
  )
}
