import { ThemeProvider } from './theme-provider'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
