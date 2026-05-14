import { ui, defaultLang, type Lang, type UIKey } from './ui';
import { blogSlugFrToEn, blogSlugEnToFr, enOnlyPaths } from './blog';

export type { Lang, UIKey } from './ui';

/** Derive the active locale from a URL (fallback when no `lang` prop is available). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : defaultLang;
}

/** Translation function bound to a locale. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Locale-aware internal path.
 * FR (default) stays at the root, EN gets the `/en` prefix.
 * Preserves query strings and hashes; pure same-page anchors (`#faq`) are untouched.
 */
export function localizedPath(path: string, lang: Lang): string {
  if (path.startsWith('#')) return path;

  const sepIdx = path.search(/[#?]/);
  const pathname = sepIdx === -1 ? path : path.slice(0, sepIdx);
  const suffix = sepIdx === -1 ? '' : path.slice(sepIdx);

  let p = pathname || '/';
  if (!p.startsWith('/')) p = '/' + p;

  if (lang === 'en') {
    const localized = p === '/' ? '/en/' : '/en' + p;
    return localized + suffix;
  }
  return p + suffix;
}

/**
 * Absolute hreflang URLs for the current page in both locales.
 * Returns `null` for a locale when no equivalent page exists (EN-only pages,
 * blog articles without a translated counterpart).
 */
export function getAlternateUrls(url: URL, lang: Lang): { fr: string | null; en: string | null } {
  const origin = url.origin;
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const logical = isEn ? pathname.replace(/^\/en/, '') || '/' : pathname;

  let frPath: string | null;
  let enPath: string | null;

  const blogMatch = logical.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (isEn) {
      const frSlug = blogSlugEnToFr[slug];
      frPath = frSlug ? `/blog/${frSlug}` : null;
      enPath = `/en/blog/${slug}`;
    } else {
      const enSlug = blogSlugFrToEn[slug];
      frPath = `/blog/${slug}`;
      enPath = enSlug ? `/en/blog/${enSlug}` : null;
    }
  } else if (enOnlyPaths.includes(logical)) {
    frPath = null;
    enPath = `/en${logical}`;
  } else {
    frPath = logical;
    enPath = logical === '/' ? '/en' : `/en${logical}`;
  }

  return {
    fr: frPath ? origin + frPath : null,
    en: enPath ? origin + enPath : null,
  };
}
