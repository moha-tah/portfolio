import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // the Sanity Studio and static files must not be prefixed with a locale
  matcher:
    '/((?!api|studio|_next/static|_next/image|_vercel|assets|images|icons|files|sw.js|site.webmanifest|robots.txt|manifest.json|sitemap.xml|apple-touch-icon-precomposed.png|favicon.ico|cv-en.pdf|cv-fr.pdf|apple-touch-icon.png|\\.well-known|.*\\..*).*)'
}
