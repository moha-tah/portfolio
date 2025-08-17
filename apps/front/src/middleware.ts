import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher:
    '/((?!api|_next/static|_next/image|assets|images|favicon-dark.ico|favicon-light.ico|sw.js|site.webmanifest|robots.txt|manifest.json|\\.well-known).*)'
}
