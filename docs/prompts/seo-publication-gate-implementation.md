# Implementatieprompt — SEO publication gate

Implementation task for the `pgbplanner-website` repo (Astro).

## Doel

Maak de site technisch klaar voor publicatie van het eerste SEO-artikel.

Bronnen:
- `docs/marketing/seo-audit-2026-07-27.md`
- de besluiten in dit document

Bij conflict geldt dit document.

Dit is een strak afgebakende productie-aanpassing. Geen bredere SEO-opruiming.

## Bevestigde feiten — niet opnieuw onderzoeken

- `www.pgbplanner.nl` is het primaire Netlify-domein.
- `pgbplanner.nl` redirect automatisch naar `www.pgbplanner.nl`.
- De huidige `site`-waarde in `astro.config.mjs` is correct.
- De geldende privacyverklaring staat op `https://app.pgbplanner.nl/privacy`.
- De privacyverklaring in deze repo is verouderd en moet verdwijnen.
- `/vragenlijst` en `/feedback` blijven publiek en indexeerbaar.
- Het bestaande draft-blogartikel valt buiten deze taak en mag niet worden aangepast.

## Scope — voer alleen deze vijf onderdelen uit

### 1. `/lees-meer` verwijderen en redirecten

- Verwijder `src/pages/lees-meer.astro`.
- Voeg een permanente server-side 301 redirect toe:
  - `/lees-meer` → `/`
- Geen vervangende Astro-pagina, client-side redirect of meta refresh.

### 2. `/privacy` verwijderen en redirecten

- Verwijder `src/pages/privacy.astro`.
- Voeg een permanente server-side 301 redirect toe:
  - `/privacy` → `https://app.pgbplanner.nl/privacy`
- Geen privacycopy herschrijven, kopiëren of samenvoegen.

Voor beide redirects:

- Gebruik één eenvoudige Netlify-oplossing:
  - óf `public/_redirects`
  - óf `netlify.toml`
- Maak niet beide.
- Toon vóór implementatie welk mechanisme je kiest en de volledige inhoud.
- Voeg uitsluitend deze twee regels toe.
- Gebruik geen wildcard-, domein- of force-redirects tenzij aantoonbaar nodig.
- Omdat de Astro-pagina’s verdwijnen, moeten beide routes ook uit de gegenereerde sitemap verdwijnen.

### 3. `noindex` toevoegen aan `BaseLayout`

Wijzig `src/layouts/BaseLayout.astro`.

Voeg toe:

```ts
noindex?: boolean
```

Default:

```ts
false
```

Bij `true` moet exact één tag worden gerenderd:

```html
<meta name="robots" content="noindex, follow">
```

Bij afwezig of `false`: geen robots-meta-tag.

Niet doen:

- geen generieke robots-string API;
- geen `nofollow`, `noarchive` of extra robots-opties;
- geen wijzigingen aan canonical handling;
- geen metadata-refactor buiten deze prop.

### 4. `noindex` alleen toepassen op vier utilitypagina’s

Zet `noindex={true}` op:

- `src/pages/bedankt.astro`
- `src/pages/bedankt-vragenlijst.astro`
- `src/pages/bedankt-feedback.astro`
- `src/pages/email-bevestigen.astro`

Wijzig verder niets in deze bestanden.

Dus niet:

- titels of descriptions aanpassen;
- findings 1, 2 en 3 apart oplossen;
- `/vragenlijst` of `/feedback` noindexeren;
- andere pagina’s wijzigen.

### 5. Blog social metadata

#### Schema

Wijzig `src/content/config.ts`.

Voeg één optioneel veld toe:

```ts
image: z.string().optional()
```

Contract:

- root-relative publieke URL, bijvoorbeeld `/images/blog/artikelnaam.jpg`;
- optioneel;
- bestaande posts zonder `image` blijven geldig;
- geen Astro image imports of validatie op bestandsbestaan;
- geen extra velden zoals `ogImage`, `heroImage` of `heroSrc`;
- bestaand `heroAlt` ongemoeid laten.

#### BaseLayout

Voeg toe aan `src/layouts/BaseLayout.astro`:

```ts
ogType?: string
```

Default:

```ts
"website"
```

Gebruik deze prop voor de bestaande `og:type`.

Laat de huidige default `ogImage` ongewijzigd op `/og.jpg`.

Niet toevoegen:

- `article:published_time`;
- author metadata;
- tags;
- JSON-LD.

#### Blogroute

Wijzig `src/pages/blog/[...slug].astro`.

Voor blogartikelen:

- geef `ogType="article"` door;
- geef `post.data.image` door als `ogImage`;
- als `image` ontbreekt, moet automatisch de bestaande fallback `/og.jpg` gelden;
- build en publicatie mogen nooit falen door een ontbrekend `image`-veld.

Gebruik bij voorkeur de bestaande layout-default en dupliceer `/og.jpg` niet onnodig.

Niet doen:

- geen beelden toevoegen aan niet-blogpagina’s;
- geen image assets maken;
- geen image pipeline bouwen;
- image niet verplicht maken;
- image niet koppelen aan zichtbare hero/body-content;
- draft-artikel niet aanpassen.

## Buiten scope — niet aanraken

- 404-pagina;
- `trailingSlash`;
- JSON-LD of structured data;
- `article:published_time`;
- `astro.config.mjs`;
- `public/robots.txt`;
- `Header.astro`;
- `Footer.astro`;
- `index.astro`;
- contactformulier;
- `/vragenlijst`;
- `/feedback`;
- metadata-opruiming op noindexpagina’s;
- OG-images voor niet-blogpagina’s;
- privacycopy in beide repo’s;
- accessibility;
- performance;
- analytics;
- Search Console;
- content writing;
- dependencies, lockfiles of package-upgrades;
- commits, merges of pushes;
- ongerelateerde formatting of refactors.

## Werkwijze

### Fase 1 — alleen preflight

Geef eerst:

1. huidige branch en korte `git status`;
2. exacte lijst van bestanden die je wilt verwijderen, wijzigen en aanmaken;
3. gekozen redirectmechanisme;
4. volledige inhoud van het voorgestelde redirectbestand;
5. definitieve `BaseLayout` props-signature met defaults;
6. het exacte contract voor het blogveld `image`;
7. de bestaande repo-commando’s die je wilt gebruiken voor check, build en validatie.

Wijzig of verwijder nog niets.

Stop daarna en wacht op goedkeuring.

### Fase 2 — implementatie na goedkeuring

Na goedkeuring:

- voer alleen het goedgekeurde plan uit;
- vraag bevestiging per productie-file write of deletion;
- raak bestaande ongerelateerde working-tree changes niet aan;
- voeg geen tooling of dependencies toe;
- commit, merge en push niet.

## Validatie

Gebruik alleen bestaande scripts en tooling.

Voer uit:

1. bestaande typecheck/check-command, indien aanwezig;
2. production build.

Controleer daarna:

### Redirects en sitemap

- `/lees-meer` staat niet meer in de gegenereerde sitemap;
- `/privacy` staat niet meer in de gegenereerde sitemap;
- `/blog` blijft aanwezig waar verwacht;
- niet-draft blogartikelen blijven sitemap-eligible;
- redirectconfig bevat exact de twee goedgekeurde regels.

Een Astro-build bewijst geen live Netlify 301.

Daarom:

- gebruik bestaande lokale/deploy-preview tooling als die al aanwezig is;
- voeg geen nieuwe Netlify-tooling toe;
- als runtime-verificatie niet lokaal mogelijk is, meld dat eerlijk en noteer dat na deploy nog moet worden gecontroleerd:
  - `/lees-meer` → HTTP 301 naar `/`
  - `/privacy` → HTTP 301 naar `https://app.pgbplanner.nl/privacy`

### Utilitypagina’s

Controleer built HTML van alle vier pagina’s en bevestig dat elk exact bevat:

```html
<meta name="robots" content="noindex, follow">
```

Controleer ook één normale indexeerbare route en bevestig dat daar geen robots-meta-tag is toegevoegd.

### Blogmetadata

Bevestig dat:

- een blogartikel `og:type="article"` krijgt;
- een artikel met `image` die waarde gebruikt voor OG en Twitter;
- een artikel zonder `image` terugvalt op `/og.jpg`;
- ontbreken van `image` geen schema- of buildfout veroorzaakt.

Pas het bestaande draft-artikel niet aan om dit te testen. Gebruik statische inspectie of een tijdelijke validatiemethode die geen bronwijzigingen achterlaat.

## Eindrapport

Rapporteer:

1. wat is verwijderd, aangemaakt en gewijzigd;
2. gebruikte validatiecommando’s en resultaten;
3. sitemapresultaten;
4. noindex-validatie;
5. blog OG/fallback-validatie;
6. redirectstatus:
   - runtime geverifieerd, of
   - statisch geverifieerd en nog na deploy te controleren;
7. `git status --short`;
8. volledige `git diff --stat`;
9. alleen blockers die publicatie van artikel 1 direct bedreigen.

Stel geen aanvullende verbeteringen voor buiten deze scope.
