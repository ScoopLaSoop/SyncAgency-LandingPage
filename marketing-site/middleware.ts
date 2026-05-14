// Vercel Edge Middleware — runs platform-side, before static assets are served.
// Framework-agnostic: no Astro adapter, no Next.js. Web-standard Request/Response only.
//
// Behaviour:
//  - Leaves `/en/*` and all assets untouched.
//  - Respects a manual choice stored in the `lang` cookie (set by LanguageSwitcher).
//  - First-time visitors with no cookie: detect locale from Vercel geo header +
//    Accept-Language, redirect English speakers to the `/en/` equivalent (307),
//    and pin the choice with a cookie so it only happens once.

export const config = {
  // Skip Astro/Vercel assets and any path with a file extension.
  matcher: ['/((?!_astro|assets|scripts|og|api|favicon|manifest|robots|sitemap|.*\\.).*)'],
};

const FR_COUNTRIES = ['FR', 'BE', 'CH', 'LU', 'MC'];

function redirectToEnglish(url: URL, setCookie: boolean): Response {
  const { pathname, search } = url;
  const dest = new URL(`/en${pathname === '/' ? '/' : pathname}${search}`, url);
  const headers = new Headers({ location: dest.toString() });
  if (setCookie) {
    headers.append('set-cookie', 'lang=en; path=/; max-age=31536000; samesite=lax');
  }
  return new Response(null, { status: 307, headers });
}

export default function middleware(request: Request): Response | undefined {
  const url = new URL(request.url);
  const { pathname } = url;

  // Already an English path — nothing to do.
  if (pathname === '/en' || pathname.startsWith('/en/')) return;

  // 1. Respect a previously stored manual choice.
  const cookie = request.headers.get('cookie') ?? '';
  const chosen = cookie.match(/(?:^|;\s*)lang=(fr|en)/)?.[1];
  if (chosen === 'en') return redirectToEnglish(url, false);
  if (chosen === 'fr') return;

  // 2. First visit — detect preferred language.
  // The browser's primary language wins; geolocation is only the tiebreaker
  // for visitors whose browser is set to some other language entirely.
  const country = (request.headers.get('x-vercel-ip-country') ?? '').toUpperCase();
  const accept = (request.headers.get('accept-language') ?? '').toLowerCase();
  const primaryLang = accept.split(',')[0]?.trim().slice(0, 2);

  let prefersFr: boolean;
  if (primaryLang === 'fr') prefersFr = true;
  else if (primaryLang === 'en') prefersFr = false;
  else prefersFr = FR_COUNTRIES.includes(country);

  // FR is the default locale at the root — stay put.
  if (prefersFr) return;

  // English-leaning visitor → redirect once and pin the choice.
  return redirectToEnglish(url, true);
}
