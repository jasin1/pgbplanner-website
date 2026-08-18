# Apply corrections to editorial guide and CTA spec

## Context

Two new documents were added to `docs/marketing/`:

- `editorial-guide.md`
- `blog-product-cta-spec.md`

They are correct in substance but need eight corrections before they are final. Two are safety/accuracy fixes, six are additions.

All content in these documents is Dutch. Every replacement text below is marked as a verbatim block. **Do not translate, rewrite, reformat, or "improve" any Dutch text.** Insert it exactly as given.

## Phase 1 — Read only

Before editing anything:

1. Read `docs/marketing/editorial-guide.md` in full.
2. Read `docs/marketing/blog-product-cta-spec.md` in full.
3. Read `CLAUDE.md` in the repository root.
4. Report back: the exact heading text and line numbers of every section you will touch (listed in Phase 2), plus the heading numbering scheme used in each file (the guide uses numbered sections like `## 13. Toon`; confirm the actual numbers before you renumber anything).

Do not edit until I confirm.

## Phase 2 — Edits

### Edit 1 — Braindump must not be committed (editorial-guide.md)

In the section `# Brondocumenten en hun rol`, replace the entire `## \`00-content-braindump.md\`` block (heading and all text under it, up to the next `##` heading) with this verbatim text:

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
## `00-content-braindump.md`

Dit bestand staat bewust NIET in deze repository en wordt ook niet gecommit. Het bevat persoonlijke en medische gegevens van derden en hoort daarom niet in een codebase, ook niet in een private repository.

Vindplaats: Google Drive, map `PGB Planner Kennis`.

Rol: primaire ervaringsinput over echte PGB-praktijkmomenten, gevoelens en onzekerheden, timing, administratieve vragen en financiële beslissingen.

Gebruik dit als menselijke context, niet als juridische bron.
```

Then verify: `00-content-braindump.md` must not exist anywhere in this repository. Run a search. If it exists, stop and report it. Do not delete it yourself.

### Edit 2 — Source file location (editorial-guide.md)

In the same `# Brondocumenten en hun rol` section, directly under the heading `## \`01-gemini-search-intent-research.md\``, insert this line above the existing text:

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
Vindplaats: Google Drive, map `PGB Planner Kennis` → `Keyword`. Dit bestand staat niet in deze repository.
```

Keep all existing text under that heading.

### Edit 3 — Technical precondition for CTA placement (blog-product-cta-spec.md)

At the end of section `## 3. Eén herbruikbare component, variabele inhoud`, before the `---` separator, append this verbatim text:

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
### Technische voorwaarde

Het per artikel zelf kiezen van de plek in de lopende tekst vereist een keuze die bij de bouw gemaakt moet worden:

- artikelen omzetten naar `.mdx`, zodat het blok als component middenin de tekst geplaatst kan worden; of
- het blok positioneren via frontmatter, bijvoorbeeld met een veld dat aangeeft na welke tussenkop het verschijnt.

Dit is een open vraag, geen genomen besluit. Leg de keuze vast op het moment dat de component gebouwd wordt.
```

### Edit 4 — Add "De haakzin" (editorial-guide.md)

In `# Deel III — Schrijfambacht`, insert a new section as the **first** section of that part, before the existing `Toon` section. Use the file's existing numbering scheme (so if `Toon` is `## 13.`, this becomes `## 13.` and everything after it shifts by one). Renumber all following sections in Deel III, IV and V accordingly, and update any cross-references to those numbers if they exist.

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
## De haakzin

Elk artikel opent met een haakzin: één concrete zin uit geleefde ervaring die de situatie van de lezer beschrijft voordat er iets wordt uitgelegd.

De haakzin komt niet uit onderzoek en niet uit een model. Hij komt uit eigen ervaring of uit direct gebruikerscontact, en hij is het element dat het artikel onderscheidt van wat instanties en belangenorganisaties al publiceren.

Een artikel zonder haakzin mist het enige deel dat niet te reproduceren is.
```

### Edit 5 — Hard style rules (editorial-guide.md)

At the end of the `Toon` section in Deel III, append this verbatim text:

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
### Harde stijlregels

- Geen em-dashes. De doelgroep herkent ze als signaal van AI-gegenereerde tekst.
- Geen stappenplan-framing. Geen "stap voor stap", geen genummerde handleiding als hoofdvorm van het artikel. De lezer beheert zijn eigen budget, vaak al jaren, en waardeert zelfstandigheid. Een stappenplan neemt een instructierol aan die niet past bij de rol van PGB Planner.
- Geen loze slagen om de arm. Formuleringen als "voor een deel van de budgethouders" of "dit geldt niet in iedere situatie" zeggen niets en klinken als indekken. Wees in plaats daarvan precies over voor wie iets wel en niet geldt.
```

### Edit 6 — How sources appear in the article (editorial-guide.md)

In `# Deel III — Schrijfambacht`, insert a new section directly after `Informatiedichtheid`. Apply the same numbering scheme and renumber what follows.

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
## Hoe bronnen in het artikel verschijnen

Bronvermeldingen staan in voetnoten of in een bronnenlijst onderaan het artikel, niet als onderbreking in de lopende tekst.

Een tekst die om de paar zinnen naar een Staatscourantnummer of een SVB-pagina verwijst leest zwaar en wordt daar niet betrouwbaarder van. De zorgvuldigheid zit erin dat de bron bestaat, klopt en vindbaar is, niet in de zichtbaarheid ervan tijdens het lezen.
```

### Edit 7 — Remove Instagram (editorial-guide.md)

In the section `Eén inhoud, meerdere oppervlakken` in Deel V, remove the list item `- Instagram;` from the channel list. Leave the rest of the list unchanged.

### Edit 8 — Shorten Deel IV to avoid duplicating the CTA spec (editorial-guide.md)

`Deel IV` currently repeats content that also lives in `blog-product-cta-spec.md`. Replace everything from the `# Deel IV — PGB Planner in het artikel` heading up to (but **not** including) the section `Niet tegen SVB positioneren` with this verbatim text. Keep the `Niet tegen SVB positioneren` section exactly as it is, and keep `# Deel V` and everything after it unchanged.

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
# Deel IV — PGB Planner in het artikel

## Het artikel moet zelfstandig helpen

Een lezer die niets koopt en na het artikel vertrekt, moet nog steeds een bruikbaar antwoord hebben gekregen. De inhoud wordt niet kunstmatig onvolledig gemaakt om een klik of een signup af te dwingen.

## De commerciële volgende stap wordt niet verstopt

Wanneer PGB Planner aantoonbaar het vervolgprobleem oplost, mag dat duidelijk en commercieel worden aangeboden. Dat is eerlijker dan een productverwijzing die zich voordoet als redactionele uitleg.

Redactionele inhoud en productaanbod worden daarom visueel duidelijk van elkaar gescheiden.

De uitwerking hiervan, dus wanneer een productblok wordt gebruikt, waar het staat, hoe de copy eruitziet en hoe er gemeten wordt, staat in `blog-product-cta-spec.md`. Die spec is leidend voor de uitvoering. Deze guide bepaalt alleen het principe.
```

Note: the numbered sections inside the old Deel IV disappear. Renumber the remaining sections consistently with the rest of the file.

### Edit 9 — Reference both documents from CLAUDE.md

In `CLAUDE.md` in the repository root, add a reference to these two documents in the section where other docs are listed. Match the existing formatting and style of that file. The reference must make clear that the editorial guide is leading for all blog and content work.

Suggested content (adapt to the file's existing format):

<!-- VERBATIM DUTCH — DO NOT TRANSLATE OR EDIT -->
```
Voor alle blog- en contentwerk geldt `docs/marketing/editorial-guide.md` als leidend document. `docs/marketing/blog-product-cta-spec.md` bepaalt hoe PGB Planner binnen een artikel commercieel zichtbaar wordt.
```

If `CLAUDE.md` is written in English, the surrounding sentence may be English, but keep the two file paths and their described roles accurate.

## Phase 3 — Verification

After the edits:

1. Show me a diff of all three files.
2. Confirm section numbering is continuous and correct across the whole of `editorial-guide.md`.
3. Confirm no em-dashes were introduced into any Dutch text you touched.
4. Confirm `00-content-braindump.md` is absent from the repository and from git history (`git log --all --diff-filter=A -- "*content-braindump*"`). If it appears in history, stop and report; do not attempt to rewrite history.
5. Do not commit. I will review the diff first.
