// Blog article slug correspondence between locales. Slugs are deliberately
// localized for SEO, so they don't match across languages — this table maps
// each FR article to its EN counterpart (and back).

export const blogSlugFrToEn: Record<string, string> = {
  'google-sheet-agence-ofm-pas-scaler': 'google-sheet-ofm-cannot-scale',
  'processeur-paiement-ofm-comparatif': 'payment-processor-ofm-comparison',
  'syncagency-vs-infloww': 'syncagency-vs-infloww',
};

export const blogSlugEnToFr: Record<string, string> = Object.fromEntries(
  Object.entries(blogSlugFrToEn).map(([fr, en]) => [en, fr]),
);

// Pages that exist only in English (no FR equivalent yet).
export const enOnlyPaths = ['/cookies', '/terms'];
