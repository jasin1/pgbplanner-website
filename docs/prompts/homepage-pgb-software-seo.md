# Homepage: make PGB Planner findable as pgb software

## Context

Search Console (3 months up to 8 Oct 2026): the homepage ranks around position 46 for "pgb administratie software", and "pgb software" / "pgb tool" bring no clicks. The homepage never uses the words "software", "app" or "budgethouder" and has no structured data.

Goal: help Google and searchers understand that PGB Planner is pgb software, WITHOUT changing the H1 or its promise.

Scope: `pgbplanner-website` homepage only. No changes to the H1, layout, styling tokens or other pages. Reuse existing components and classes; do not introduce new raw sizes, colours or values.

All Dutch copy below is verbatim. Do NOT translate, rephrase or "improve" it. Do not add em-dashes.

## Phase 1: read-only audit (then STOP)

Report, without editing anything:

1. Where the homepage `<title>` and meta description are set (layout props, page frontmatter, a SEO component?), and whether `og:title`, `og:description`, `twitter:title`, `twitter:description` are derived from the same values or set separately.
2. The component/file that renders the hero lead paragraph directly under the H1 ("PGB Planner rekent je uitgaven en zorgverleners automatisch door...").
3. Where the FAQ items are defined (array in the page, content collection, component props) and how an item is added.
4. Whether any JSON-LD / `application/ld+json` already exists anywhere in the site (layout, head component).
5. Anything that would make these changes leak to other pages (shared layout defaults).

STOP after the audit and wait for my go.

## Phase 2: proposal (then STOP)

Propose the exact edits per file (file path + before/after) for the five changes below. STOP and wait for my approval. After approval, implement the agreed changes together, run the verification below and report the diff. Do not commit or deploy.

## Changes

### 1. Title tag (homepage only)

```text (Dutch, verbatim, do not translate)
PGB Planner | Online PGB-software: kom je uit met je budget?
```

Keep `og:title` and `twitter:title` unchanged (current value "PGB Planner, weet het hele jaar of je uitkomt met je budget"). If they are derived from the title, decouple them for the homepage only.

### 2. Meta description (homepage only)

```text (Dutch, verbatim, do not translate)
Online PGB-app voor budgethouders en budgetbeheerders. Houd je PGB-administratie bij naast het SVB-portaal en zie het hele jaar of je uitkomt. 21 dagen gratis.
```

Keep `og:description` and `twitter:description` unchanged. Decouple if needed, homepage only.

### 3. Hero lead paragraph under the H1

Do NOT add a new element. Prepend one sentence to the existing lead paragraph, same element, same classes.

Current:
```text (Dutch, verbatim)
PGB Planner rekent je uitgaven en zorgverleners automatisch door, zodat je op tijd ziet of je op koers ligt en niet voor verrassingen komt te staan.
```

New:
```text (Dutch, verbatim, do not translate)
Online PGB-software voor budgethouders en budgetbeheerders. PGB Planner rekent je uitgaven en zorgverleners automatisch door, zodat je op tijd ziet of je op koers ligt en niet voor verrassingen komt te staan.
```

Keep the existing line breaks/structure of the paragraph as far as the markup allows. Check it on mobile width: the lead must not push the CTA buttons below the fold more than one extra line.

### 4. FAQ item "Wat is PGB Planner?"

Add as the FIRST item in the existing FAQ list, using the existing FAQ structure.

```text (Dutch, verbatim, do not translate)
Vraag: Wat is PGB Planner?

Antwoord: PGB Planner is online PGB-software voor budgethouders en budgetbeheerders. Je voegt je budget en zorgverleners toe en houdt je uitgaven bij. Met Vooruitblik bereken je of je geplande zorgkosten binnen je resterende jaarbudget passen. Het werkt in je browser, naast het SVB-portaal, en kost na 21 dagen gratis proberen €20 per maand.
```

Do NOT add FAQPage structured data.

### 5. SoftwareApplication JSON-LD (homepage only)

Add in the homepage `<head>` only, via the existing head/SEO mechanism if there is one. In Astro, use:
`<script type="application/ld+json" set:html={JSON.stringify(schema)} />`

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PGB Planner",
  "url": "https://www.pgbplanner.nl/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web browser",
  "browserRequirements": "Werkt in een moderne webbrowser, geen installatie nodig",
  "inLanguage": "nl-NL",
  "description": "Online PGB-software voor budgethouders en budgetbeheerders. Houd je uitgaven en zorgverleners bij en zie het hele jaar of je uitkomt met je PGB-budget.",
  "image": "https://www.pgbplanner.nl/og.jpg",
  "offers": {
    "@type": "Offer",
    "price": "20.00",
    "priceCurrency": "EUR",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "20.00",
      "priceCurrency": "EUR",
      "billingDuration": "P1M",
      "unitText": "maand"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "PGB Planner",
    "url": "https://www.pgbplanner.nl/"
  }
}
```

The string values inside this JSON are Dutch copy: keep them verbatim. Do NOT add `aggregateRating` or `review` (we have no real reviews).

## Verification (after build)

1. `npm run build` passes.
2. In the built homepage HTML, confirm: new `<title>`, new meta description, unchanged og/twitter title and description, exactly one `application/ld+json` block with valid JSON. Rich-result eligibility is NOT an acceptance criterion (Google requires real reviews for that, which we deliberately leave out).
3. Confirm no other page (blog index, an article) got the new title, description or JSON-LD.
4. Confirm the H1 is unchanged.
5. Report the diff summary. Do not commit; I commit myself.
