# Prompt — Audit complet SEO + GEO de la landing page SyncAgency

> Copier-coller ce prompt dans une nouvelle session Claude Code, à la racine du repo `SyncAgency-LandingPage`.
> Objectif : auditer toute la marketing-site pour le référencement Google (SEO) **et** la visibilité dans les moteurs de réponse IA (GEO — ChatGPT, Perplexity, Claude, Google AI Overviews, Gemini).

---

## RÔLE

Tu es un consultant senior SEO technique **et** GEO (Generative Engine Optimization), spécialisé dans les sites SaaS B2B en niche concurrentielle. Tu réalises un audit exhaustif, factuel et actionnable — pas de généralités, chaque constat doit pointer un fichier précis et une correction concrète.

## CONTEXTE PROJET (à vérifier, ne pas présumer)

- **Stack** : Astro 5 statique (`output: 'static'`), Tailwind, `@astrojs/sitemap`. Code dans `marketing-site/`.
- **Domaine** : `https://www.syncagency.fr`
- **i18n** : FR (locale par défaut, à la racine `/`) + EN (préfixe `/en/`). Config dans `astro.config.mjs` et `src/i18n/`.
- **Niche** : CRM pour agences OFM (OnlyFans Management) qui chattent sur Telegram/WhatsApp. Concurrent principal cité : Infloww.
- **Pages** : `src/pages/` — accueil (`index.astro`), `marketing`, `migration-infloww`, `affiliation`, `empire`, `about`, blog (3 articles FR + EN), pages légales, `login`.
- **SEO déjà en place à vérifier** : `BaseLayout.astro` (title, description, canonical, hreflang, OG, Twitter, Organization JSON-LD), JSON-LD par page (SoftwareApplication, FAQPage, VideoObject sur l'accueil), `public/robots.txt`, `public/llms.txt`, `public/manifest.json`, sitemap généré.
- **Analytics** : PostHog injecté dans `<head>`.

Commence par **lire réellement** : `astro.config.mjs`, `src/layouts/BaseLayout.astro`, toutes les pages de `src/pages/` (FR + EN), `src/components/layout/` (Header, Footer, LanguageSwitcher), `src/i18n/`, `src/content/`, `public/robots.txt`, `public/llms.txt`, `public/manifest.json`. Puis lance `npm run build` et inspecte `dist/` (HTML généré, `sitemap-index.xml`, `sitemap-0.xml`).

## PÉRIMÈTRE DE L'AUDIT

### A. SEO technique
- Indexabilité : `robots.txt`, balises `<meta robots>`, `noindex` involontaires, pages orphelines, `login`/`_preview` correctement exclus.
- Canonicals : présence, unicité, cohérence `www`/non-`www`, pas de canonical croisé entre FR/EN.
- Sitemap : complétude (toutes les pages indexables présentes), exactitude des URLs, annotations i18n, exclusions correctes.
- i18n : balises `hreflang` réciproques et complètes (FR↔EN), `x-default`, cohérence avec `getAlternateUrls`, pages EN-only / articles sans traduction gérés sans hreflang cassé.
- Structure d'URL : propreté, cohérence, slash final, pas de duplication `/` vs `/index`.
- Performance / Core Web Vitals : poids des images (formats `webp`/`avif`, dimensions, `loading`/`fetchpriority`), LCP (hero, vidéo VSL, poster), CLS, JS bloquant, scripts tiers (PostHog, Lucide), `font-display`, preload/preconnect.
- Mobile : viewport, responsive, tap targets, pas d'overflow horizontal.
- Codes HTTP : 404 custom, redirections, liens internes morts.

### B. SEO on-page & contenu
- `<title>` & `<meta description>` : présence sur **chaque** page, longueur, unicité, présence du mot-clé, accroche.
- Hiérarchie des titres : un seul `<h1>` par page, `h2/h3` logiques, pas de saut de niveau.
- Ciblage mots-clés : intention de recherche par page, mots-clés primaires/secondaires, cannibalisation entre pages.
- Maillage interne : ancres descriptives, profondeur de clic, pages stratégiques bien liées.
- Images : attributs `alt` descriptifs et pertinents (pas de `alt` vide ou générique sur images de contenu).
- Open Graph / Twitter Cards : complétude, images OG existantes et au bon format (1200×630), cohérence FR/EN.
- Contenu : profondeur, fraîcheur, unicité FR vs EN (pas de traduction machine bâclée), couverture de la niche.
- Blog : qualité éditoriale, ciblage longue traîne, dates de publication/maj, schema `Article`/`BlogPosting` (à vérifier — semble absent).

### C. Données structurées (Schema.org)
- Validité de chaque bloc JSON-LD (syntaxe, `@type`, champs requis).
- `Organization` : cohérence FR/EN (adresses différentes Paris/Gerpinnes — légitime ?), `sameAs` pointant vers des profils réellement existants.
- `SoftwareApplication` : `aggregateRating` avec `reviewCount: "2"` — risque de pénalité / spam structured data, à challenger.
- `FAQPage`, `VideoObject` : conformité, `transcript` présent.
- **Manques** : `BreadcrumbList`, `Article`/`BlogPosting` sur le blog, `Product`/`Offer` détaillés, `WebSite` + `SearchAction`, `Person` pour le fondateur.

### D. GEO — Generative Engine Optimization
- `llms.txt` : présence, exactitude des URLs (⚠️ vérifier `syncagency.fr` vs `www.syncagency.fr` — incohérence possible avec le domaine canonique), couverture des pages, fraîcheur des prix/offres.
- Citabilité : le contenu énonce-t-il des faits clairs, autonomes, extractibles (définitions, chiffres, comparatifs) qu'un LLM peut citer sans ambiguïté ?
- Couverture des questions : les pages répondent-elles directement aux questions que les utilisateurs posent aux IA ("c'est quoi un CRM OFM", "alternative à Infloww", "combien coûte X") ? Le bloc FAQ est-il exploité partout où c'est pertinent ?
- Clarté des entités : SyncAgency, Infloww, OFM, Telegram, les plans tarifaires sont-ils nommés de façon constante et désambiguïsée ?
- HTML sémantique : structure crawlable par les bots IA, contenu critique en HTML statique (pas masqué derrière du JS), transcripts vidéo présents et complets.
- Signaux d'autorité / E-E-A-T : auteur identifié, fondateur, mentions externes (`sameAs`), preuves sociales vérifiables, page `about` substantielle.
- Comparatifs : la table SyncAgency vs Infloww est-elle en HTML sémantique (`<table>`) et factuelle — donc reprenable par une IA ?
- Accessibilité des bots IA : `robots.txt` ne bloque pas GPTBot / ClaudeBot / PerplexityBot / Google-Extended (décision à expliciter, pas à subir).
- Fraîcheur : dates visibles, signaux de mise à jour, cohérence des prix entre `llms.txt`, JSON-LD, contenu des pages et `src/content/`.

### E. Cohérence transverse
- Le prix, le nom des plans, les chiffres clés (commission 20%, 40%, essai 7 jours) sont-ils **identiques** partout : pages, JSON-LD, `llms.txt`, OG, content collections ?
- Cohérence FR ↔ EN : parité des pages, des métadonnées, des schemas.

## MÉTHODOLOGIE

1. Lis les fichiers sources listés ci-dessus.
2. `npm run build`, puis inspecte le HTML rendu dans `dist/` (le `<head>` final, pas seulement le template).
3. Valide chaque JSON-LD mentalement contre la spec Schema.org.
4. Vérifie chaque URL citée dans `llms.txt`, `robots.txt`, sitemap, canonicals, hreflang — domaine, casse, slash.
5. Croise les données chiffrées entre toutes les sources pour détecter les incohérences.
6. Ne signale que ce que tu as **vérifié dans le code**. Si tu n'as pas pu vérifier (ex. : Core Web Vitals réels, profils `sameAs` en ligne), dis-le explicitement et indique comment le vérifier.

## FORMAT DE SORTIE

Produis un rapport Markdown structuré ainsi :

### 1. Synthèse exécutive
Note SEO /100, note GEO /100, et les 3 problèmes les plus critiques en une phrase chacun.

### 2. Ce qui va bien ✅
Liste des points déjà solides (pour ne pas les casser).

### 3. Problèmes détectés ❌
Tableau : `Priorité | Catégorie | Problème | Fichier:ligne | Impact | Correction recommandée`
- Priorité = 🔴 Critique / 🟠 Important / 🟡 Mineur.
- Trié par priorité décroissante.

### 4. Plan d'action priorisé
Liste ordonnée des corrections, avec pour chacune : effort estimé (S/M/L) et gain attendu.

### 5. Recommandations long terme
Stratégie de contenu, opportunités de mots-clés, schemas à ajouter, leviers GEO à construire.

**Ne modifie aucun fichier.** Cet audit est en lecture seule — livre uniquement le rapport. Les corrections feront l'objet d'une étape séparée.
