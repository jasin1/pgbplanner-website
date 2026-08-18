## Analytics-architectuur PGB Planner

Versie 1.0, 12 augustus 2026

### Waarom dit document bestaat

De aanleiding is artikel 2, maar dit gaat niet over blogs. Het legt vast hoe we meten welke marketinginspanning uiteindelijk tot een betalende klant leidt, ongeacht of die inspanning een artikel, een social post, de homepage of een latere landingspagina is.

De vraag waar alles op terugvalt: waar komen betalende klanten vandaan, en waar niet. Dat antwoord bepaalt waar de volgende uren heen gaan.

### Randvoorwaarde

De privacyverklaring sluit uit dat analysegegevens aan personen worden gekoppeld. Een geïdentificeerde klant mag dus geen profiel krijgen waarin zijn anonieme websitebezoek terug te lezen is. Die eis is niet onderhandelbaar en bepaalt de opzet hieronder.

### Twee gescheiden projecten

Er zijn twee PostHog-projecten in EU Cloud.

Het **appproject** meet productgebruik en conversie op `app.pgbplanner.nl`. Hier worden mensen geïdentificeerd op Supabase-UUID.

Het **websiteproject** meet anoniem bezoekgedrag op `pgbplanner.nl`. Hier wordt niemand geïdentificeerd en wordt `identify()` nooit aangeroepen.

Projecten hebben eigen cookienamen en PostHog kan personen niet over projecten heen samenvoegen. De scheiding is daarmee structureel, niet een instelling die per ongeluk kan omvallen.

Gevolg dat we accepteren: er bestaat geen funnel die in het ene project begint en in het andere eindigt. De verbinding loopt via UTM-parameters, niet via personen.

### Drie lagen

**Laag 1, bron.** Hoe kwam iemand binnen. Vastgelegd via UTM-parameters op links die wij zelf beheren, plus de referrer voor verkeer dat we niet beheren, zoals zoekverkeer.

**Laag 2, websitegedrag.** Wat deed die bezoeker op `pgbplanner.nl`. Pageviews plus een klein aantal bewuste events. Woont in het websiteproject.

**Laag 3, productconversie.** Registratie, activatie en betaling. Woont in het appproject.

### De brug

Elke link van de website naar de app draagt UTM-parameters. De PostHog van de app draait al vóór inloggen en vangt die parameters op. Dat is op 12 augustus 2026 getest en bevestigd.

Belangrijk: de bron die de app te zien krijgt moet de oorspronkelijke bron zijn, niet de pagina waar de klik vandaan kwam. Komt iemand vanaf Facebook op een artikel en klikt daar op de CTA, dan moet de app Facebook zien als bron en het artikel als pagina. De website moet de binnenkomende bron dus doorgeven aan de uitgaande link.

### First-touch als primaire bron

PostHog houdt twee sets bij. `Initial` wordt gezet bij het allereerste event van een persoon en daarna nooit overschreven. `Latest` wordt bij elk volgend bezoek met UTM's overschreven.

Voor de vraag welke bron klanten oplevert sturen we op **`Initial`**. Iemand die via de blog binnenkomt en later via een andere link terugkomt, blijft aan de blog toegerekend. `Latest` blijft beschikbaar als extra context, maar is niet de maatstaf.

Openstaand: bij de test van 12 augustus was `Initial` niet met UTM's gevuld, waarschijnlijk doordat die browser de app al eerder had gezien. Dit wordt geverifieerd in de end-to-end test vanaf een browser die de app nooit heeft bezocht.

### Eventvocabulaire

Eén kleine set eventnamen die homepage, blogartikelen en latere landingspagina's allemaal bedient. Onderscheid tussen paginasoorten gebeurt via properties, niet via aparte eventnamen. Geen nieuwe analytics-opzet per nieuw paginatype.

De exacte namen en waarden worden apart vastgesteld en zijn daarna vast. Hernoemen achteraf knipt de geschiedenis in tweeën.

### Twee ritmes van aflezen

**Wekelijks, tijdens publicatie.** Vraag: werkt het. Komt er verkeer binnen, wordt er op de CTA geklikt, gebeurt er überhaupt iets. Kleine aantallen zijn hier bruikbaar, want nul is een duidelijk antwoord. Niet vergelijken tussen bronnen.

**Per seizoen, na de zoekgolf.** Vraag: wat werkt beter. Welke bron levert registraties en betalende klanten op. Dit vraagt volume en is vóór november niet te beantwoorden.

De fout die we hiermee voorkomen: koers verleggen op basis van twee klanten verschil.

### Onderhoudsarm als harde eis

Deze opzet moet werken zonder wekelijkse aandacht van een solo-ondernemer die geen marketeer is.

Concreet betekent dat: labels staan zoveel mogelijk vast in componenten in plaats van per keer handmatig te worden bedacht; het aantal bronlabels blijft klein genoeg om zonder uitleg te begrijpen; en de vaste weergaven in PostHog worden één keer ingericht zodat aflezen neerkomt op openen, niet op bouwen.

### Buiten scope

Geen n8n-pijplijn voor analyticsdata. Geen eigen eventdatabase. Geen multi-touch attributiemodel. Geen consent-banner. GA4 blijft ongewijzigd draaien naast PostHog en valt buiten deze architectuur.

### Vervolgstap, te beoordelen in oktober

Een kolom bij het account in Supabase die bij registratie eenmalig de acquisitiebron vastlegt. Voordeel: de bron staat dan in de eigen database naast betalingen, verandert nooit meer, en overleeft een gewiste cookie of een wissel van apparaat.

Dit is bewust nog geen besluit. De noodzaak hangt af van wat PostHog na inrichting werkelijk vasthoudt, en dat weten we pas na de end-to-end test. De evaluatie hoort vóór de wintergolf plaats te vinden.