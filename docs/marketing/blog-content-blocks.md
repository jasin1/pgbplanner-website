# PGB Planner — Contentblokken in blogartikelen

Dit document is een korte conventie, geen tweede designsysteem.

1. `.callout` is het basisblok voor redactionele content die visueel los van de lopende tekst staat (bijvoorbeeld een samenvatting of een rekenvoorbeeld).

2. Voeg alleen een modifier toe wanneer de inhoud daadwerkelijk een functioneel verschil nodig heeft, niet voor visuele afwisseling. `.callout--calc` voldoet daaraan: cijfers hebben baat bij `tabular-nums`-uitlijning. Een andere achtergrondkleur zou daar niet aan voldoen en is dus geen geldige reden voor een modifier.

3. De keuze van het element (`<aside>`, `<div>`, ...) staat los van de styling. Het element bepaalt de betekenis (bijvoorbeeld: is dit terzijde of centraal in het artikel), de class bepaalt het uiterlijk.

4. Waarden komen altijd uit bestaande design tokens. Geen kleuren of maten in artikelmarkup of in dit document.

5. `.product-cta` en `.bronnen` vallen buiten dit systeem. Voeg ze hier niet aan toe.

6. Verzin geen nieuwe blokstijl wanneer `.callout`, eventueel met modifier, al voldoet.
