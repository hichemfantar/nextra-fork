import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './app/_dictionaries/i18n-config'

const { locales, defaultLocale } = i18n

const HAS_LOCALE_REGEX = new RegExp(`^\\/(${locales.join('|')})(\\/|$)`)

const COOKIE_NAME = 'NEXT_LOCALE'

function getHeadersLocale(request: NextRequest): string {
  const headers = Object.fromEntries(request.headers.entries())

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers }).languages(locales)
  const locale = matchLocale(languages, locales, defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = HAS_LOCALE_REGEX.test(pathname)
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = cookieLocale || getHeadersLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  const requestLocale = pathname.split('/')[1]

  if (requestLocale !== cookieLocale) {
    const response = NextResponse.next()
    response.cookies.set(COOKIE_NAME, requestLocale)
    return response
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest).*)'
  ]
}