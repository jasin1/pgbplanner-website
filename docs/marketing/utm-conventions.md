# UTM Conventions

Vaste afspraken voor UTM-tracking van verkeer naar de PGB Planner-website.

## Doel

UTM-parameters worden gebruikt om te kunnen zien via welk kanaal, welke plaatsing en welke campagne bezoekers op pgbplanner.nl terechtkomen.

Dit document bevat alleen de vaste naamgeving en afspraken.

Campagneresultaten en wekelijkse cijfers worden bijgehouden in de PGB Planner Cockpit.

## Parameters

### utm_source

Het platform of de bron van het verkeer.

Voorbeelden:

- `facebook`
- `linkedin`
- `email`
- `google`

### utm_medium

Het type kanaal.

Voorbeelden:

- `social`
- `email`
- `organic`
- `cpc`

Voor organische Facebook-posts gebruiken we:

`utm_medium=social`

### utm_campaign

De campagne of het bredere marketingmoment.

Naamgeving:

`yyyy-mm-korte-omschrijving`

Voorbeeld:

`2026-07-public-launch`

### utm_content

De specifieke plaatsing of variant.

Voorbeelden:

- `pgb-planner-page`
- `wlz-aanvragen-pgb-budgets`
- `email-existing-list`
- `facebook-post-variant-a`

Gebruik `utm_content` om posts binnen dezelfde campagne van elkaar te onderscheiden.

## Naamgeving

- Gebruik alleen kleine letters.
- Gebruik koppeltekens tussen woorden.
- Gebruik geen spaties.
- Gebruik geen accenten of speciale tekens.
- Gebruik dezelfde schrijfwijze opnieuw wanneer een bron of plaatsing terugkomt.
- Maak geen nieuwe campagne aan voor iedere losse post.

## Campagne juli 2026

Campagne:

`2026-07-public-launch`

### Facebook — PGB Planner-pagina

- source: `facebook`
- medium: `social`
- campaign: `2026-07-public-launch`
- content: `pgb-planner-page`

### Facebook — WLZ aanvragen en PGB Budgets

- source: `facebook`
- medium: `social`
- campaign: `2026-07-public-launch`
- content: `wlz-aanvragen-pgb-budgets`

## Voorbeeld URL

Basis:

`https://www.pgbplanner.nl/`

Met UTM-parameters:

`https://www.pgbplanner.nl/?utm_source=facebook&utm_medium=social&utm_campaign=2026-07-public-launch&utm_content=wlz-aanvragen-pgb-budgets`

## Werkwijze

Voor iedere nieuwe marketinglink:

1. Bepaal de bestaande of nieuwe campagne.
2. Kies de juiste `utm_source` en `utm_medium`.
3. Geef de specifieke plaatsing een herkenbare `utm_content`.
4. Open de volledige URL één keer in een incognitovenster.
5. Controleer of de website correct opent.
6. Gebruik de UTM-link als daadwerkelijke link in de publicatie.
7. Houd resultaten bij in de Cockpit, niet in dit document.