# Artikelworkflow

Van onderwerp in de artikelenlijst naar gepubliceerd artikel. Acht stappen.
Elke stap noemt de uitvoerder, het leidende document en de voorwaarde om
door te mogen.

## Documenten en hun rol

| Document | Rol | Levensduur |
|---|---|---|
| Artikelenlijst (Notion) | Planlaag: voorraad, volgorde, gepland keyword, haakzin | doorlopend |
| editorial-guide.md | Principes: toon, positionering, bronbeleid, stijlregels | zelden gewijzigd |
| lexicon.md | Woordkeuzes die anders per artikel terugkomen | groeit langzaam |
| blog-product-cta-spec.md | Vorm en plaatsing van de CTA | zelden gewijzigd |
| article-brief-template.md | Het lege contract | zelden gewijzigd |
| briefs/artikel-NN-slug.md | Het ingevulde contract voor één artikel | eenmalig, daarna archief |
| article-checklist.md | Controleprocedure | groeit langzaam |

Source of truth: de artikelenlijst is leidend voor planning en volgorde.
De goedgekeurde brief is leidend voor de productie van één artikel. Wijzigt
een brief een geplande waarde, dan gaat die wijziging terug naar de lijst.

## Stap 1. Onderwerp ophalen

Uitvoerder: Jasin. Bron: artikelenlijst.
Neem titel, gepland primary keyword, haakzin en controledatum mee.

## Stap 2. Briefsessie

Uitvoerder: Jasin met Claude (chat). Leidend: article-brief-template.md.

Te beslissen: SERP-oordeel en definitief keyword, belofte in één zin,
claimlijst met status en bron, buiten scope, CTA, interne links.

Regels:
- Factcheck gebeurt hier, niet bij de controle.
- De belofte bevat geen claim met een andere status dan "geldend".
- Kost invullen meer dan een half uur, dan is er een beslissing die nog
  niet genomen is. Neem die eerst.

Door als: alle velden ingevuld, geen claim zonder bron.

## Stap 3. Brief goedkeuren

Uitvoerder: Jasin. Zet status op goedgekeurd, vul datum in.
Schrijf afwijkingen terug naar de artikelenlijst.

Door als: status goedgekeurd. Vanaf hier is de brief leidend.

## Stap 4. Concept schrijven

Uitvoerder: Claude Code. Prompt: docs/prompts/write-article.md.

Claude Code leest de brief, de editorial guide, het lexicon en de CTA-spec.
Doet geen research.

Claude Code mag redactioneel uitwerken en structureren: opbouw, tussenkoppen,
overgangen, uitleg, uitwerking van een rekenvoorbeeld. Claude Code
introduceert geen nieuwe feitelijke claims, onderwerpen, scope, conclusies of
productbeloften die niet uit de goedgekeurde brief volgen. Ontbreekt er iets
dat nodig is: stoppen en melden, niet zelf invullen.

Door als: concept in de repo.

## Stap 5. Controle

Uitvoerder: ChatGPT. Leidend: article-checklist.md.

Toetst het concept aan de brief, niet aan de wereld. Levert een lijst met
afwijkingen, geen herschreven tekst.

Door als: geen openstaande afwijkingen, of afwijkingen die Jasin bewust
accepteert.

## Stap 6. Leesronde

Uitvoerder: Jasin. Goedkeuren of terugsturen met reden. Niet zelf
herschrijven: een correctie die je zelf maakt, maak je bij elk volgend
artikel opnieuw. Hoort de correctie in de brief, het lexicon of de guide,
zet hem daar neer.

Door als: goedgekeurd.

## Stap 7. Publiceren

Uitvoerder: Claude Code of Jasin. Frontmatter, slug, interne links in
beide richtingen, beeld, canonical, CTA op de plek uit de brief.

## Stap 8. Terugkoppelen

Uitvoerder: Jasin. In de artikelenlijst: status op gepubliceerd, URL
invullen, controledatum bevestigen.

Noteer het aantal rondes tussen stap 4 en 6. Eén of twee betekent dat het
contract werkt. Vier of meer betekent dat het briefsjabloon een veld mist.
Voeg dat veld toe voordat je aan het volgende artikel begint.

## Onderhoud

Een correctie die in twee artikelen terugkomt hoort niet in het artikel
maar in een van de contracten. Woordniveau naar het lexicon, toon en
principes naar de editorial guide, ontbrekende beslissing naar het
briefsjabloon.