import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|assets|images|favicon-dark.ico|favicon-light.ico|sw.js|site.webmanifest|robots.txt|manifest.json|\\.well-known).*)'
}
