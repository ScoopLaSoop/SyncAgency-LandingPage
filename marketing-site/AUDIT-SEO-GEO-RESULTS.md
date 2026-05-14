# Audit SEO + GEO — Landing page SyncAgency

> Audit réalisé le **14 mai 2026** sur la branche `main`.
> Périmètre : `marketing-site/` (Astro 5 statique, domaine `https://www.syncagency.fr`).
> Méthode : lecture des sources + `npm run build` + inspection du HTML rendu dans `dist/`,
> du sitemap, de `robots.txt` et `llms.txt`. **Audit en lecture seule — aucun fichier modifié.**

---

## 0. Corrections appliquées (2026-05-14)

Première passe de corrections réalisée après l'audit :

- ✅ **Identité d'entreprise unifiée** sur l'adresse de la LLC américaine
  (`1209 Mountain Rd Pl NE Ste H, Albuquerque, NM 87110`) : JSON-LD `Organization` FR + EN
  (`BaseLayout.astro`), ligne « Siège social » de `about.astro` et `en/about.astro` — désormais
  cohérent avec les pages légales `cgu`/`cgv`/`privacy`.
- ✅ **Page `/about` finalisée (FR + EN)** : tous les commentaires `À COMPLÉTER` / `{{ADRESSE_A_COMPLETER}}`
  supprimés, prose mission/bio nettoyée (suppression des tirets cadratins, formulations enrichies
  pour le SEO/GEO), timeline débarrassée de ses commentaires.
- ✅ **Lien LinkedIn du fondateur** renseigné (`https://www.linkedin.com/in/lucas-provenzanooo/`),
  FR + EN — le `href="#"` mort est corrigé.
- ✅ **Nom du fondateur uniformisé** : « Lucas Provenzano » dans le JSON-LD FR (était « Provenzano Lucas »).
- ✅ **`middleware.ts` supprimé** : plus de redirection automatique FR↔EN basée sur la langue du
  navigateur / la géolocalisation. Le site sert le FR par défaut à la racine ; l'EN reste
  accessible manuellement via le `LanguageSwitcher`.

### Deuxième passe (reste du plan d'action §4)

- ✅ **`llms.txt`** réécrit : domaine `www`, pages `/about` + mentions légales ajoutées,
  couverture EN complète, prix/offres à jour.
- ✅ **Conflit de slash résolu** : `trailingSlash: 'never'` dans `astro.config.mjs` +
  `getAlternateUrls` normalisé → canonical, `hreflang` et sitemap émettent désormais des URL
  sans slash final, cohérentes avec la config Vercel.
- ✅ **`aggregateRating` retiré** des schémas `SoftwareApplication` (`index.astro` FR + EN).
- ✅ **`/empire` reliée** depuis le header (dropdown + mobile) et le footer ; **Blog ajouté**
  au header (desktop + mobile), nouvelle clé i18n `nav.blog`.
- ✅ **`/en/terms` supprimée** : page-redirection retirée, redirection 301 ajoutée dans
  `vercel.json` (`/en/terms` → `/en/cgu`), `enOnlyPaths` nettoyé — plus présente au sitemap.
- ✅ **`FAQPage`** ajouté sur `/migration-infloww` (FR + EN) ; **`CollectionPage` +
  `BreadcrumbList`** ajoutés sur le blog index (FR + EN), articles typés `BlogPosting`.
- ✅ **Page 404 personnalisée** créée (`src/pages/404.astro`, `noindex`, maillage de secours).
- ✅ **`sameAs` alignés** FR/EN (5 profils des deux côtés) ; **OG de `en/about`** pointé sur
  `og-about.png` au lieu du fallback générique.
- ✅ **Performance** : `preconnect` PostHog ajouté ; `loading="lazy"` + dimensions sur les
  images sous la ligne de flottaison (avatars d'avis, photo équipe).

Restent ouverts (non bloquants) : `font-display` explicite, titres des pages légales,
liens sociaux `taap.it` du footer (URLs réelles inconnues — à fournir), vélocité éditoriale
du blog, schémas `WebSite`+`SearchAction` / `Person` / `Product-Offer` détaillés.

---

## 1. Synthèse exécutive

| Note | Score |
|------|-------|
| **SEO technique & on-page** | **72 / 100** |
| **GEO (Generative Engine Optimization)** | **68 / 100** |

Fondations solides (canonicals, sitemap i18n, schémas riches sur l'accueil, structure d'URL
propre, accessibilité correcte), mais plombées par des incohérences de données et des restes
de chantier visibles en production.

**Les 3 problèmes les plus critiques :**

1. **Identité d'entreprise incohérente** — quatre adresses différentes coexistent : Albuquerque (USA) dans les pages légales, Paris (FR) dans le JSON-LD FR, Gerpinnes (BE) dans le JSON-LD EN, « France » sur `/about` — ce qui casse la cohérence d'entité (E-E-A-T) pour Google comme pour les LLM.
2. **Page `/about` non finie en production** — commentaires de rédaction `À COMPLÉTER PAR LUCAS` et lien LinkedIn `href="#"` servis tels quels aux crawlers, sur la page censée porter le signal d'autorité du fondateur.
3. **Conflit canonical ↔ configuration Vercel** — Astro émet des URL canoniques *avec* slash final (`/marketing/`) que `vercel.json` (`trailingSlash: false`) redirige vers la version *sans* slash ; les `hreflang`, eux, sont émis sans slash : trois conventions d'URL qui se contredisent.

---

## 2. Ce qui va bien ✅

- **Canonicals présents partout** (`BaseLayout.astro:171`), domaine `www` unique, redirection 301 non-www → www côté Vercel (`vercel.json:5-12`).
- **Sitemap complet et annoté i18n** : `dist/sitemap-0.xml` contient 28 URL avec des annotations `xhtml:link` réciproques FR↔EN (44 occurrences) — la config `sitemap({ i18n: … })` dans `astro.config.mjs:17-26` fonctionne.
- **`_preview` et `login` correctement exclus** : `_preview.astro` n'est jamais buildé (préfixe `_` Astro), `login` est filtré du sitemap (`astro.config.mjs:25`) et porte `<meta name="robots" content="noindex">` + canonical externe (`dist/login/index.html`).
- **`hreflang` réciproques + `x-default`** générés sur toutes les pages traduites, avec gestion propre des pages EN-only via `enOnlyPaths` (`src/i18n/utils.ts:67-69`).
- **Parité FR/EN quasi totale** : toutes les pages produit + les 3 articles de blog existent dans les deux langues, traductions de qualité humaine (registre `tu`/`you` respecté).
- **Cohérence des chiffres clés parfaite** : prix 59 € / 89 € / 129 €, commission 20 % vs 40 %, essai 7 jours — identiques sur les pages, le JSON-LD, `llms.txt` et les content collections.
- **Table comparative SyncAgency vs Infloww en `<table>` sémantique** (`<thead>`/`<tbody>`), présente FR + EN sur l'accueil, la page migration et l'article de blog — directement reprenable par un LLM.
- **Schémas valides sur l'accueil** : `SoftwareApplication`, `FAQPage` (11 questions, dont « C'est quoi un CRM OFM ? »), `VideoObject` **avec `transcript` complet** (`index.astro:16-74`).
- **Hiérarchie de titres propre** : un seul `<h1>` par page, pas de saut de niveau.
- **Accessibilité** : skip-link (`BaseLayout.astro:222`), `lang` correct sur `<html>`, ARIA sur le widget chat et les accordéons.
- **Performance de base** : preload du poster LCP avec `fetchpriority="high"` (`index.astro:84`), scripts en `defer`, images en double format (`webp` + fallback), en-têtes `Cache-Control` longue durée sur `/assets` et `/_astro` (`vercel.json`).
- **Bots IA non bloqués** : `robots.txt` laisse passer GPTBot / ClaudeBot / PerplexityBot / Google-Extended — bon pour le GEO (à formaliser comme décision, voir §3).

---

## 3. Problèmes détectés ❌

| Priorité | Catégorie | Problème | Fichier:ligne | Impact | Correction recommandée |
|----------|-----------|----------|---------------|--------|------------------------|
| 🔴 Critique | Cohérence / E-E-A-T | Quatre adresses d'entreprise différentes : Albuquerque (US), Paris (FR), Gerpinnes (BE), « France » | `cgu.astro:35`, `cgv.astro:39`, `privacy.astro:35`, `en/cgu.astro:35` (US) ; `BaseLayout.astro:120` (Paris) ; `BaseLayout.astro:63` (Gerpinnes) ; `about.astro:180` (France) | Entité juridique illisible pour Google et les LLM ; risque de défiance et de mauvaise désambiguïsation | Définir **une** adresse légale réelle et la propager partout (JSON-LD FR + EN identiques, pages légales, `/about`). |
| 🔴 Critique | Contenu / E-E-A-T | Commentaires de chantier `À COMPLÉTER PAR LUCAS` servis en production + bio fondateur générique | `about.astro:49,95,102,140,145,150,180` + `en/about.astro` équivalents | Page d'autorité visiblement non finie ; commentaires HTML crawlables ; aucun signal fondateur exploitable en GEO | Finaliser le texte mission/histoire/bio, dater réellement la timeline, **supprimer tous les commentaires** `À COMPLÉTER` / `{{ADRESSE_A_COMPLETER}}`. |
| 🔴 Critique | On-page / E-E-A-T | Lien LinkedIn du fondateur en `href="#"` (mort) sur `/about` FR + EN | `about.astro:151` | Signal d'autorité cassé ; lien sortant inutile | Mettre l'URL LinkedIn réelle (déjà présente dans le JSON-LD : `BaseLayout.astro:58`). |
| 🔴 Critique | GEO | `llms.txt` utilise le domaine **non-www** (`https://syncagency.fr/…`) alors que le canonique est `www` | `public/llms.txt` (toutes les URL, blocs « Pages principales ») | Les crawlers IA suivent des URL non canoniques (redirigées 301) → dilution, attribution floue | Remplacer toutes les URL par `https://www.syncagency.fr/…`. |
| 🔴 Critique | SEO technique | Conflit slash final : canonical `/marketing/` (avec slash) vs `vercel.json` `trailingSlash:false` (redirige vers sans slash) vs `hreflang` sans slash | `BaseLayout.astro:25` + `dist/*/index.html` (canonicals) ; `vercel.json:3` ; `src/i18n/utils.ts:75-78` | Le canonical pointe vers une URL redirigée ; signaux d'URL contradictoires | Choisir **une** convention. Le plus simple : `trailingSlash: 'never'` dans `astro.config.mjs` + normaliser `getAlternateUrls` → tout sans slash, cohérent avec Vercel. |
| 🟠 Important | i18n | `hreflang` émis sans slash final alors que le canonical en a un — `getAlternateUrls` strippe le slash sans le réajouter | `src/i18n/utils.ts:48` et `:75-78` ; rendu : `dist/cgu/index.html`, `dist/blog/*/index.html` | `hreflang` auto-référent ≠ canonical → Google peut ignorer l'annotation | Normaliser les chemins retournés (réajouter `/` final) **ou** appliquer la convention « sans slash » globale (voir ci-dessus). |
| 🟠 Important | Schema.org | `aggregateRating` avec `reviewCount: "2"` sur `SoftwareApplication` | `index.astro:34` + `en/index.astro` (équivalent) | Risque de filtre « structured data spam » Google ; étoiles peu crédibles, faible CTR | Retirer `aggregateRating` tant que < 5 avis vérifiables, ou le baser sur des avis réels (Trustpilot) avec `review` détaillés. |
| 🟠 Important | Schema.org | Page `/migration-infloww` : section FAQ visible mais **aucun `FAQPage`** (seulement `BreadcrumbList`) | FAQ à `migration-infloww.astro:509-516` ; schéma à `migration-infloww.astro:4-11` | Rich snippet FAQ perdu sur une page stratégique « alternative Infloww » | Ajouter un bloc `FAQPage` reprenant les questions de la section. |
| 🟠 Important | Maillage interne | `empire.astro` orpheline : aucun lien interne ne pointe vers elle (header et footer renvoient `href="#"`) | `Header.astro:40,63` ; `Footer.astro:59` | Page dans le sitemap mais sans jus de lien → quasi invisible | Pointer les liens « Empire OS » vers `/empire` (garder le badge « Bientôt »). |
| 🟠 Important | Schema.org | `empire.astro` n'émet **aucun** JSON-LD | `empire.astro` (frontmatter) | Page de conversion (waitlist) sans donnée structurée | Ajouter `BreadcrumbList` + `Product`/`Offer` ou `WebPage`. |
| 🟠 Important | Indexabilité | `en/terms.astro` : page-redirection « nue » (meta-refresh + JS), sans `<head>`, sans `noindex`, **présente dans le sitemap** (`/en/terms/`) | `en/terms.astro` (fichier entier) ; `dist/sitemap-0.xml` | Page fine/redirection indexable et listée au sitemap → dilution | Exclure `/en/terms` du sitemap (filtre `astro.config.mjs:25`) ou la supprimer si `/en/cgu` suffit ; idéalement redirection 301 côté `vercel.json`. |
| 🟠 Important | Schema.org | `sameAs` divergents : 5 liens en FR (Instagram, Telegram, ProductHunt, Trustpilot, Crunchbase) vs 2 en EN | `BaseLayout.astro:138-144` vs `:80-83` | Signaux d'autorité amputés sur la version EN | Aligner les deux listes (mêmes profils, **réellement existants** — à vérifier en ligne). |
| 🟠 Important | Schema.org | Nom du fondateur incohérent : « Lucas Provenzano » (EN) vs « Provenzano Lucas » (FR) | `BaseLayout.astro:57` vs `:114` | Désambiguïsation d'entité dégradée | Uniformiser sur « Lucas Provenzano ». |
| 🟠 Important | SEO technique | Aucune page 404 personnalisée (`src/pages/404.astro` absent, pas de `dist/404.html`) | `src/pages/` (manquant) | 404 générique Vercel ; mauvaise rétention, pas de maillage de secours | Créer `src/pages/404.astro` (FR + EN) avec liens vers pages clés. |
| 🟠 Important | Maillage interne | Le blog n'est lié **que depuis le footer** — absent du header et du corps de l'accueil | `Header.astro:32-49` (pas de lien blog) ; présent `Footer.astro:64` | Contenu éditorial sous-alimenté en jus de lien interne | Ajouter « Blog » / « Ressources » au header, et un lien contextuel depuis l'accueil. |
| 🟠 Important | Cohérence | Liens Telegram/sociaux incohérents : `taap.it/SyncAgencyy`, `taap.it/SyncAgencyyy`, `taap.it/pvzlucas`, `taap.it/provenzanolucas` ; ≠ des URL `sameAs` du JSON-LD | `Footer.astro:33,39,46,74` | Confusion d'entité, liens sociaux non vérifiables, divergence avec le JSON-LD | Utiliser les **vraies** URL de profils (les mêmes que `sameAs`), une par réseau. |
| 🟠 Important | Open Graph | `en/about.astro` retombe sur `og-default.jpg` (pas de `og-about-en`) | `en/about.astro` (prop `ogImage`) | Carte sociale EN générique | Créer `og-about-en.png` (1200×630) ou réutiliser `og-about.png`. |
| 🟠 Important | Schema.org | `blog/index.astro` et `en/blog/index.astro` n'émettent aucun schéma | `blog/index.astro:11` | Pas de `CollectionPage`/`Breadcrumb` pour la page archive | Ajouter `CollectionPage` + `BreadcrumbList`. |
| 🟡 Mineur | SEO technique | URL des items `BreadcrumbList` / `AboutPage` sans slash final (≠ canonical) | `migration-infloww.astro:9` ; `about.astro:15` | Incohérence mineure d'URL dans le JSON-LD | Aligner sur la convention d'URL retenue. |
| 🟡 Mineur | GEO | `robots.txt` ne traite pas explicitement GPTBot/ClaudeBot/PerplexityBot/Google-Extended | `public/robots.txt` | Décision « subie » plutôt qu'« explicitée » | Garder l'accès ouvert (bon pour le GEO) mais l'**acter** par un commentaire dans `robots.txt`. |
| 🟡 Mineur | GEO | `llms.txt` incomplet : pas de page `/about`, pas de mentions légales, **aucune version EN** | `public/llms.txt` | Couverture GEO partielle, monolingue | Ajouter `/about`, et un `llms.txt` (ou section) EN. |
| 🟡 Mineur | Performance | Pas de `preconnect` vers PostHog (`us.i.posthog.com`) ; `font-display` non explicite | `BaseLayout.astro` (`<head>`) ; `@fontsource-variable/inter` | LCP/CLS légèrement dégradés | Ajouter `<link rel="preconnect" href="https://us.i.posthog.com">` + `font-display: swap`. |
| 🟡 Mineur | On-page | Titres/descriptions des pages légales très courts/génériques | `cgu.astro`, `cgv.astro`, `privacy.astro` (props `BaseLayout`) | Faible, mais uniformité perfectible | Étoffer légèrement (peu prioritaire — pages non stratégiques). |
| 🟡 Mineur | Performance | Pas de `loading="lazy"` sur les images/vidéos sous la ligne de flottaison | composants `sections/` | Octets chargés inutilement | Ajouter `loading="lazy"` hors hero. |
| 🟡 Mineur | Contenu | Les 3 articles de blog sont datés du même jour (2026-05-10) | `blog/*.astro` (frontmatter `datePublished`) | Faible signal de fraîcheur/vélocité éditoriale | Étaler les futures publications ; mettre à jour `dateModified` lors des révisions. |
| 🟡 Mineur | Schema.org | Schémas absents : `WebSite`+`SearchAction`, `Person` (fondateur), `Product`/`Offer` détaillés, `BlogPosting` (les articles utilisent `Article` générique) | global | Opportunités de rich results non exploitées | Voir §5. |
| 🟡 Mineur | On-page | `twitter:site` divergent : `@syncagency_ofm` (FR) vs `@syncagency` (EN) | `BaseLayout.astro:30` | Handle Twitter incohérent (et à vérifier qu'il existe) | Uniformiser sur le handle réel. |

> **Non vérifiable dans le code** — à contrôler séparément : les Core Web Vitals réels
> (lancer PageSpeed Insights / `lighthouse` sur les pages déployées) ; l'existence en ligne
> des profils `sameAs` (ProductHunt, Trustpilot, Crunchbase, Instagram, Telegram) et des
> liens `taap.it` ; le bon fonctionnement de la redirection 301 non-www → www en production.

---

## 4. Plan d'action priorisé

| # | Action | Effort | Gain attendu |
|---|--------|--------|--------------|
| 1 | Unifier l'adresse/identité de l'entreprise sur **toutes** les sources (JSON-LD FR+EN, pages légales, `/about`) | M | 🔼 E-E-A-T, cohérence d'entité SEO + GEO |
| 2 | Finaliser `/about` (FR+EN) : textes, timeline datée, bio fondateur, lien LinkedIn réel ; **supprimer tous les commentaires `À COMPLÉTER`** | M | 🔼 Autorité, crédibilité, citabilité GEO |
| 3 | Corriger `llms.txt` : domaine `www`, ajouter `/about` + légales, créer une version/section EN | S | 🔼 Visibilité dans ChatGPT/Perplexity/Gemini |
| 4 | Trancher la convention de slash : `trailingSlash: 'never'` (Astro) + normaliser `getAlternateUrls` → canonical = hreflang = ce que sert Vercel | S | 🔼 Signaux d'URL propres, hreflang pris en compte |
| 5 | Retirer ou réduire `aggregateRating` (`reviewCount: 2`) | S | 🔽 Risque de pénalité structured data |
| 6 | Lier `/empire` (header + footer) et lui ajouter du JSON-LD ; ajouter le blog au header | S | 🔼 Maillage interne, indexation |
| 7 | Exclure `/en/terms` du sitemap (ou le supprimer / le passer en redirection 301 Vercel) | S | 🔽 Dilution, pages fines indexées |
| 8 | Ajouter `FAQPage` sur `/migration-infloww` ; `CollectionPage`+`Breadcrumb` sur le blog index | S | 🔼 Rich results sur pages stratégiques |
| 9 | Créer `404.astro` (FR+EN) avec maillage de secours | S | 🔼 Rétention, UX |
| 10 | Aligner `sameAs`, le nom du fondateur, les liens sociaux du footer, l'OG de `en/about` | S | 🔼 Cohérence d'entité |
| 11 | `preconnect` PostHog, `font-display: swap`, `loading="lazy"` hors hero | S | 🔼 Core Web Vitals |

---

## 5. Recommandations long terme

**Données structurées à ajouter**
- `WebSite` + `SearchAction` (si une recherche existe un jour) et surtout `WebSite` avec `inLanguage` pour ancrer l'entité.
- `Person` complet pour Lucas Provenzano (photo, `sameAs`, `jobTitle`, `worksFor` → `@id` de l'Organization) — clé pour l'E-E-A-T et le GEO.
- `BlogPosting` (plutôt que `Article` générique) sur les 3 articles, avec `author` = `Person`.
- `Product` + `Offer` détaillés sur les `PricingCards` (les 3 plans, `priceValidUntil`, `availability`).
- `BreadcrumbList` sur l'accueil et toutes les pages produit (uniformiser).

**Stratégie de contenu & mots-clés**
- Construire un vrai cluster éditorial autour des intentions IA : « c'est quoi un CRM OFM », « alternative à Infloww », « combien coûte un CRM pour agence OnlyFans », « Telegram vs OnlyFans pour agences ». Une page pilier + articles satellites, maillés entre eux (aujourd'hui aucun lien inter-articles).
- Différencier l'article `syncagency-vs-infloww` de la table comparative de l'accueil (risque de cannibalisation) : y ajouter cas d'usage, guide de migration pas-à-pas, retours chiffrés.
- Étaler la publication et entretenir les `dateModified` pour envoyer un signal de fraîcheur.

**Leviers GEO à construire**
- Maintenir `llms.txt` à jour (prix, plans, offres) et le décliner en EN ; le considérer comme un livrable au même titre que le sitemap.
- Renforcer la citabilité : chaque page produit doit énoncer des faits autonomes et chiffrés (définitions, comparatifs) — déjà bien amorcé sur l'accueil, à étendre à `/marketing`, `/migration-infloww`, `/affiliation`.
- Exploiter le bloc `FAQPage` partout où c'est pertinent (migration, affiliation, empire) — c'est le format le plus repris par les moteurs de réponse.
- Asseoir l'autorité : profils `sameAs` réels et vérifiables, page `/about` substantielle, fondateur identifié — c'est aujourd'hui le maillon faible du GEO.

---

*Audit en lecture seule. Les corrections feront l'objet d'une étape séparée.*
