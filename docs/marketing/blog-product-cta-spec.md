# PGB Planner — Blog Product CTA Specification

## Doel

Dit document beschrijft hoe PGB Planner commercieel zichtbaar wordt binnen blogartikelen zonder de redactionele betrouwbaarheid van de content te ondermijnen.

Dit is een template- en contentregel, geen artikelplanning.

Het doel is eenvoudig:

> Een artikel moet zelfstandig volledig nuttig zijn, maar de commerciële volgende stap niet verstoppen wanneer PGB Planner aantoonbaar het vervolgprobleem oplost.

---

## 1. Waarom een product-CTA nodig is

Een artikel kan inhoudelijk sterk zijn en toch commercieel onduidelijk blijven.

Wanneer een lezer precies het probleem heeft dat PGB Planner oplost, moet er een zichtbare route naar het product bestaan.

De terughoudendheid die geldt voor de lopende redactionele tekst hoeft niet te betekenen dat het aanbod verborgen wordt.

Sterker nog:

> Een duidelijk afgebakend productblok is eerlijker dan een commerciële verwijzing die zich voordoet als neutrale informatie.

De lezer moet direct kunnen zien:
- dit is redactionele uitleg;
- dit is het productaanbod;
- ik kan dit overslaan als ik alleen de informatie wil.

---

## 2. Geen generieke banner

De CTA is geen standaard advertentiebanner met algemene tekst zoals:

- "Probeer PGB Planner";
- "Start nu";
- "21 dagen gratis";
- "Nooit meer zorgen over je PGB".

Dat soort copy sluit onvoldoende aan op de vraag die de lezer op dat moment heeft en wordt snel visueel behang.

De CTA is een voortzetting van het artikel.

---

## 3. Eén herbruikbare component, variabele inhoud

Bouw één visueel consistente component die per artikel andere inhoud kan krijgen.

De component ondersteunt minimaal:

- kop;
- korte tekst van twee of drie zinnen;
- knoptekst;
- link/doelbestemming.

Optioneel:
- klein label, bijvoorbeeld `PGB Planner`;
- korte ondersteunende regel.

De vorm blijft herkenbaar.
De redactionele inhoud wordt per artikel bewust geschreven.

### Technische voorwaarde

Besloten op 18 augustus 2026: artikelen worden `.mdx`, zodat het blok als
component op de inhoudelijk juiste plek in de lopende tekst staat.

Astro ondersteunt `.mdx` naast bestaande `.md` bestanden, dus omzetting
gebeurt per artikel en niet in één keer.

Positionering via frontmatter is bewust afgewezen: die koppelt de plek aan
een tussenkoptekst en breekt stil zodra een kop wordt herschreven. Sectie 4
stelt dat plaatsing inhoudelijk is, en in mdx zet de auteur het blok
letterlijk op die plek.

---

## 4. Plaatsing is inhoudelijk, niet procentueel

Plaats de CTA niet automatisch:
- na de derde alinea;
- op 50% scroll;
- na een vast aantal woorden.

De juiste plek is het punt waar de uitleg een nieuwe praktische vraag oproept die PGB Planner daadwerkelijk kan beantwoorden.

Typische volgorde:

1. feit of verandering;
2. uitleg;
3. concreet effect;
4. vraag over eigen budget of planning;
5. product-CTA.

Voor PGB Planner zal dit vaak het moment zijn waarop de vraag verschuift van:

**"Wat betekent deze regel?"**

naar:

**"Wat betekent dit voor mijn budget tot het einde van het jaar?"**

---

## 5. Vooruitblik als natuurlijke brug

Wanneer een artikel laat zien dat kosten veranderen of zich gedurende het jaar opstapelen, ontstaat vaak vanzelf een vooruitblikvraag.

Daar sluit PGB Planner het sterkst aan.

Voorbeeldlogica:

**werkgeverslasten verhogen werkelijke kosten  
→ het verschil werkt elke maand door  
→ wat betekent dat voor mijn resterende budget?  
→ PGB Planner Vooruitblik**

Het productblok mag deze overgang expliciet maken.

---

## 6. Elk artikel krijgt een CTA, maar nooit automatisch

Besloten op 12 augustus 2026: de default is een product-CTA per artikel.
Dat betekent niet dat het blok automatisch verschijnt. De auteur plaatst
hem bewust, met copy die voor dat specifieke artikel is geschreven.

Goede kandidaten zijn artikelen over bijvoorbeeld:
- budgetimpact;
- werkgeverslasten;
- tariefwijzigingen;
- personeelskosten;
- budgetkrapte;
- planning;
- vervanging;
- financiële vooruitblik.

Een artikel dat alleen een procedurele of administratieve vraag beantwoordt hoeft niet kunstmatig naar PGB Planner te buigen. Het weglaten van de CTA blijft een legitieme uitkomst wanneer PGB Planner het vervolgprobleem niet aantoonbaar oplost. Leg die keuze en de reden vast in de brief van dat artikel.

De vraag is steeds:

> Lost PGB Planner werkelijk het vervolgprobleem op dat dit artikel bij de lezer zichtbaar maakt?

Zo niet, dan geen inline productblok. Leg in de brief vast waarom.

---

## 7. Relatie met de redactionele tekst

De redactionele inhoud moet compleet blijven zonder de CTA.

Regels:
- geen essentiële uitleg achter de CTA verbergen;
- geen verkoopclaims vermengen met juridische uitleg;
- geen productvoordeel presenteren alsof het een onafhankelijk feit is;
- visueel duidelijk onderscheid tussen artikel en aanbod.

De CTA onderbreekt de betrouwbaarheid niet; hij markeert juist de overgang van informatie naar aanbod.

---

## 8. Bestemming

Voorlopige standaardbestemming:

**de PGB Planner-homepage**

Bouw niet automatisch een aparte content- of Vooruitblik-landingspagina alleen voor deze CTA.

Een specifieke landingpage wordt pas opnieuw beoordeeld wanneer:
- meerdere artikelen aantoonbaar dezelfde productintentie opleveren;
- er genoeg verkeer is om de extra funnelstap zinvol te testen;
- de homepage aantoonbaar onvoldoende aansluit op de klikintentie.

Besloten op 18 augustus 2026: een CTA in een artikel linkt naar de
homepage, niet direct naar registratie. Directe links naar registratie
horen op de homepage zelf thuis, niet in een artikel. Dit houdt de stap
van artikel naar product zichtbaar als aparte, meetbare stap in de
funnel (zie sectie 9).

Artikel 2 (pgb-tekort-berekenen) wijkt hier momenteel van af: de bestaande
CTA linkt direct naar `app.pgbplanner.nl/registreer`. Dit wordt apart
gecorrigeerd, los van deze specificatie.

---

## 9. Meting

De CTA moet meetbaar zijn.

Minimaal moet kunnen worden onderscheiden:
- artikel;
- positie/type CTA;
- klik naar PGB Planner.

Doel is later de route te kunnen analyseren:

**artikelbezoek → product-CTA-klik → homepage/productbezoek → registratie → conversie**

Een pageview zonder signup is op zichzelf geen voldoende signaal om te bepalen waar de funnel stokt.

### Interpretatie

Trek geen sterke conclusie uit:
- minder dan enkele dagen data;
- kleine aantallen;
- social traffic alsof het hetzelfde is als zoekverkeer.

Social traffic kan vooral nieuwsgierigheid bevatten.
Search traffic kan veel hogere probleem- en oplossingsintentie hebben.

---

## 10. Tweede CTA onderaan

Een laagdrempelige tweede CTA onderaan het artikel kan later zinvol zijn, bijvoorbeeld voor:
- updates over nieuwe tarieven;
- veranderingen rond het nieuwe budgetjaar;
- relevante PGB-updates.

Maar dit is geen verplicht onderdeel van het huidige blogtemplate.

Voeg dit pas toe wanneer de benodigde infrastructuur bewust is gekozen, inclusief:
- toestemming/consent;
- opslag;
- unsubscribe;
- privacy;
- e-mailverwerking;
- beheer van de lijst.

Een mailinglijst wordt niet als bijeffect van deze component gebouwd.

---

## 11. Copyprincipes

De CTA-copy:
- sluit aan op de concrete vraag van het artikel;
- benoemt het vervolgprobleem;
- legt kort uit hoe PGB Planner daarbij helpt;
- blijft feitelijk;
- vermijdt overdreven beloftes;
- gebruikt geen angst als verkoopdruk.

Onderstaand voorbeeld illustreert de toon en structuur. Het is geen vaste
tekst: kop, body en knoptekst worden per artikel opnieuw geschreven.

### Goed

> **Wat betekent dit voor je budget tot het einde van het jaar?**  
> Een hoger bedrag per uur werkt iedere maand door. Met PGB Planner kun je werkgeverslasten meenemen in je planning en vooruitkijken naar wat je huidige situatie voor de rest van het jaar betekent.  
> **Bekijk PGB Planner**

(De component rendert de pijl als SVG; de knoptekst zelf bevat geen pijlteken.)

### Minder goed

> **Voorkom dat je PGB opraakt!**  
> Start vandaag nog je gratis proefperiode en krijg direct volledige controle.

De tweede variant maakt de CTA generiek, angstgedreven en los van de redactionele toon.

---

## 12. Implementatieprincipe

De component is:
- eenvoudig;
- herbruikbaar;
- contentgestuurd;
- niet automatisch geïnjecteerd op iedere blogpagina.

De auteur kiest per artikel:
- of de CTA wordt gebruikt, en zo niet: waarom niet, vastgelegd in de brief van dat artikel;
- waar hij staat;
- welke kop wordt gebruikt;
- welke tekst wordt gebruikt;
- welke knoptekst wordt gebruikt.

Geen complexe targeting, personalisatie of automatische plaatsingslogica.

---

## 13. Terugwerkende toepassing

Wanneer de component beschikbaar is, kan hij ook aan bestaande artikelen worden toegevoegd als:
- de productaansluiting logisch is;
- de plaats inhoudelijk duidelijk is;
- de CTA-copy specifiek voor dat artikel wordt geschreven.

Dit is een redactionele beslissing, geen globale template-injectie.

---

## 14. Relatie met de Editorial Guide

De Editorial Guide bepaalt de inhoudelijke principes.

Deze specification concretiseert één daarvan:

> Goede redactionele inhoud en commerciële duidelijkheid zijn geen tegenpolen.

Het artikel helpt eerst.
Waar PGB Planner vervolgens aantoonbaar verder helpt, mag het product duidelijk zichtbaar zijn.
