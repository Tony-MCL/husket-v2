# husk'et v2 – produktretning og Sprint 2

## Dokumentstatus

Dette dokumentet samler de styrende produkt- og designbeslutningene etter Sprint 1 og fastsetter retningen for Sprint 2.

Dokumentet skal brukes som beslutningsgrunnlag før videre kode skrives.

---

## 1. Produktets formål

husk'et skal hjelpe brukeren med to likeverdige behov:

1. ta vare på egne minner i et personlig minnebibliotek
2. dele utvalgte minner direkte med nære venner og familie

Albumet er produktets fundament.

Brukerens minner er opplevelsens hjerte.

Deling er et hovedmål, men ikke første utviklingsprioritet. Album- og minneopplevelsen bygges først slik at deling senere får et stabilt og meningsfullt fundament.

husk'et skal kunne bli et privat alternativ til den delen av Snapchat som brukes til direkte deling mellom mennesker, uten stories, spotlight, chat, algoritmer eller aggressiv oppmerksomhetsdesign.

> husk'et skal hjelpe mennesker med å ta vare på og dele minner – aldri konkurrere om oppmerksomheten deres.

Et husk'et deles fordi det betyr noe, ikke fordi appen ønsker aktivitet.

---

## 2. Hva husk'et ikke skal være

husk'et skal ikke være:

- en sosial feed
- et offentlig sosialt nettverk
- en chat-app
- en story-plattform
- en algoritmisk innholdsstrøm
- en tjeneste bygget rundt streaks, engasjementspress eller kontinuerlig aktivitet
- et vanlig bildegalleri eller en filbehandler
- en app som lokker brukeren tilbake uten at noe meningsfullt har skjedd

Brukeren skal møte egne minner og minner noen aktivt har valgt å dele med dem.

---

## 3. Hovedmetafor og navigasjon

Appen er ikke en feed.

Appen er et personlig bibliotek.

Biblioteket er rommet. Bokhyllen er startskjermen og den visuelle inngangen til hele opplevelsen.

Den styrende navigasjonsmetaforen er:

```text
Bibliotek
    ↓
Bokhylle
    ↓
Album
    ↓
Oppslag
    ↓
Minne
```

### Bibliotek

Biblioteket er hele brukerens personlige minnerom.

### Bokhylle

Bokhyllen er startskjermen og inngangen til brukerens album og øvrige objekter.

### Album

Albumet organiserer minner i en tydelig, personlig og varig sammenheng.

### Oppslag

Et oppslag er en avgrenset albumvisning med rolig komposisjon. Oppslag skal erstatte følelsen av endeløs scrolling.

### Minne

Et minne er det enkelte arkiverte øyeblikket og kan åpnes for visning og redigering.

---

## 4. Startskjermen og bokhyllen

Bokhyllen er appens åpningsskjerm.

Bokhyllen starter tom. Den skal ikke fylles med eksempelalbum eller kunstig innhold.

Album oppstår naturlig når brukeren lager sitt første album.

Toppen av bokhyllen skal fungere som en rolig flate med gjenstander, ikke som en verktøylinje med store knapper.

På toppen av bokhyllen skal det kunne stå:

- et kamera med direkte tilgang til telefonens kamera
- en bilderamme som åpner import fra kamerarullen og senere andre kilder
- en liten bunke brev når mottatte husk'et finnes

Brevbunken skal ikke være synlig når innboksen er tom.

Kameraet, bilderammen og brevene skal oppleves som objekter i rommet, ikke som standardknapper med ropende handlingsdesign.

Selve bokhyllen under inneholder brukerens album som bøker.

Bokhyllen skal være rolig, tydelig og enkel å forstå selv når brukeren får mange album.

---

## 5. Albumopplevelsen

Album skal føles som fotoalbum.

Album skal ikke føles som:

- galleri
- Masonry
- Instagram-feed
- endeløs bildestrøm

Bildene skal få puste.

Oppslag skal brukes som hovedprinsipp fremfor endeløs scrolling.

Albumet skal kombinere følelsen av et fysisk fotoalbum med digitale fordeler som:

- rask navigasjon
- tydelig rekkefølge
- mulighet for å finne igjen minner
- fleksible oppslag
- enkel redigering
- støtte for mange album og mange minner

Realistisk sidevending er ikke fundamentet for albumarkitekturen. Det skal undersøkes som en separat prototype i Sprint 2A.1.

Hvis sidevendingen ikke fungerer godt nok teknisk eller praktisk, skal albumopplevelsen fortsatt fungere fullt ut med rolig og tydelig navigasjon mellom oppslag.

---

## 6. Deling

Deling er et av produktets hovedmål.

Brukeren skal kunne dele både:

- et nytt minne rett etter at det er opprettet
- et eldre minne hentet fra et album

Mottakeren skal møte samme delingsopplevelse uansett når minnet opprinnelig ble opprettet.

Deling skal være direkte og privat mellom mennesker som betyr noe for hverandre.

husk'et skal ikke ha chat. Mottakeren kan reagere med en emoji, og senderen får et enkelt push-varsel om reaksjonen.

Et mottatt minne skal ikke automatisk lagres i mottakerens album. Mottakeren velger selv om minnet skal arkiveres.

Kortene fra husk'et v1 videreføres kun som delingspresentasjon. Albumet skal aldri bruke delingskort som permanent visning eller lagringsformat.

---

## 7. Varsler og oppmerksomhet

Varsler skal representere en virkelig hendelse eller et tidsmessig relevant tilbakeblikk.

Tillatte varseltyper i v1 er:

- mottatt husk'et
- emoji-reaksjon på et delt husk'et
- tilbakeblikk dersom brukeren selv har aktivert funksjonen

Varsler skal ikke brukes til:

- streaks
- «kom tilbake»-meldinger
- påminnelser om at appen ikke er åpnet
- engasjementsvarsler
- algoritmestyrte forslag
- tilfeldige tilbakeblikk

Når brukeren har aktivert tilbakeblikk, skal appen vise relevante tilbakeblikk uten å spørre på nytt eller starte en ekstra onboardingflyt.

Detaljert varsel- og tilbakeblikkpolicy er dokumentert i `docs/NOTIFICATIONS_AND_MEMORIES.md`.

---

## 8. Bibliotekstiler og tema

husk'et skal støtte bibliotekstiler.

Et tema kan endre:

- farger
- teksturer
- materialfølelse
- lys og atmosfære
- visuelle overflater

Et tema skal aldri endre:

- navigasjonsmodellen
- bokhyllens funksjon
- albumformen
- oppslagsmodellen
- plasseringen av grunnleggende elementer
- produktets informasjonsarkitektur

Strukturen er konstant.

Atmosfæren er valgfri.

Temaarkitekturen skal derfor skilles fra navigasjon og layout, slik at nye bibliotekstiler kan utvikles uten å bygge om appens grunnstruktur.

---

## 9. Status etter Sprint 1

Sprint 0A og Sprint 1.1–1.7 er ferdige og testet med grønn build.

På plass:

- Memory Engine
- album
- minner
- import fra kamera og bildebibliotek
- valgfri kommentar
- følelsesemoji
- lokal lagring
- albumvisning
- åpning av minner fra album
- redigering av eksisterende minner
- norsk og engelsk grunnstøtte for de ferdige flytene

### Kjent begrensning på web

Web mister bilder etter refresh fordi bildene foreløpig lagres med midlertidige URI-er.

Dette er forventet i nåværende fase.

Web er utviklings- og kontrollflate, ikke produksjonsplattform for sluttbrukere.

Permanent medielagring løses i Sprint 2B ved å kopiere bilder til appens eget mediebibliotek og bruke stabile filreferanser.

---

## 10. Sprint 2 – hovedregel

Sprint 2 starter ikke med Firebase.

Sprint 2 starter ikke med deling.

Sprint 2 starter med Album Experience.

Dette er en utviklingsrekkefølge, ikke en nedprioritering av deling som produktmål.

Ingen backend- eller delingsarkitektur skal innføres før albumopplevelsen og den stabile lokale mediehåndteringen er etablert.

---

## 11. Sprint 2A – Album Experience

### Mål

Bygge den første helhetlige opplevelsen av bibliotek, bokhylle, album og oppslag.

### Omfang

- bokhylle som startskjerm
- tom bokhylle for nye brukere
- toppflate med kamera, bilderamme og betinget brevbunke
- representasjon av kamera som objekt i biblioteket
- representasjon av bilderamme som inngang til import
- representasjon av album på bokhyllen
- åpning av album fra bokhyllen
- oppslag som hovedvisning i albumet
- rolig navigasjon mellom oppslag
- åpning av enkeltminne fra oppslag
- tilbakeføring til riktig sted i albumet
- tydelig separasjon mellom albumvisning og delingskort
- første strukturelle støtte for bibliotekstiler

### Ikke en del av Sprint 2A

- Firebase
- konto og autentisering
- deling
- innboks
- push-varsler
- permanent Media Library-lagring
- avansert søk og filtrering

### Ferdigkriterier

Sprint 2A er ferdig når brukeren kan bevege seg naturlig gjennom denne kjeden:

```text
Bokhylle → Album → Oppslag → Minne → tilbake til samme oppslag
```

Opplevelsen skal fungere uten realistisk sidevending.

---

## 12. Sprint 2A.1 – prototype på sidevending

Sidevending skal undersøkes i en separat og avgrenset prototype.

Prototypen skal avklare:

- om sidevendingen fungerer stabilt på Android og iOS
- om ytelsen er god nok med ekte bilder
- om gestene oppleves naturlige
- om tilgjengelighet og navigasjon kan ivaretas
- om løsningen tåler ulike skjermstørrelser
- om sidevendingen gir reell verdi eller bare visuell effekt

Prototypen skal ikke få lov til å låse albumarkitekturen.

Resultatet kan bli:

- sidevending beholdes som valgfri eller standard overgang
- en enklere overgang brukes
- sidevending forkastes uten at Sprint 2A må bygges om

---

## 13. Sprint 2B – Media Library

### Mål

Gjøre medielagringen stabil og produksjonsrettet på mobil.

### Omfang

- kopiere importerte og fotograferte bilder til husk'ets eget lagringsområde
- stabile lokale filreferanser
- thumbnails for bokhylle, album og oppslag
- ryddig håndtering av originalbilder og forhåndsvisninger
- gjenoppretting etter omstart av appen
- håndtering av slettede eller utilgjengelige kildefiler
- nødvendig migrering fra midlertidige URI-er
- plattformtesting på Android og iOS

### Viktig avgrensning

Sprint 2B gjelder lokal og stabil mediehåndtering.

Den skal ikke automatisk utvides til skylagring, Firebase eller delingsbackend.

---

## 14. Sprint 2C – delingsmodell

### Mål

Fastsette den tekniske og funksjonelle modellen for privat deling av minner.

### Temaer som skal avklares

- identitet og kontaktmodell
- hvordan venner og familie kobles sammen
- hva som faktisk sendes
- hvor lenge et mottatt minne er tilgjengelig
- hvordan originalfil og metadata overføres
- hvordan delingskortet genereres
- hvordan reaksjoner håndteres
- hva som lagres hos sender og mottaker
- personvern og sletting
- kostnadsdrivere ved lagring og trafikk
- hvordan løsningen kan skaleres uten å bygge et sosialt nettverk

Firebase eller annen backend vurderes først i denne fasen, ikke før.

---

## 15. Sprint 2D – innboks

### Mål

Bygge mottakeropplevelsen for delte minner.

### Omfang

- brevbunke på bokhyllen når mottatte minner finnes
- ingen brevbunke når innboksen er tom
- enkel innboks uten feedpreg
- åpning av mottatt delingskort
- emoji-reaksjon
- valget «Legg til i mitt album»
- valg eller opprettelse av album ved arkivering
- tydelig skille mellom mottatt innhold og personlige album
- ingen chat

---

## 16. Beslutninger som er låst før Sprint 2

Følgende beslutninger skal ikke endres gjennom tilfeldige UI-valg under implementering:

- albumet er produktets fundament
- egne minner og privat deling er likeverdige hovedmål
- deling bygges etter albumopplevelsen, ikke i stedet for den
- appen er et personlig bibliotek, ikke en feed
- biblioteket er rommet og bokhyllen er startskjermen
- toppen av bokhyllen bruker objekter, ikke store standardknapper
- kamera åpner kameraet direkte
- bilderammen åpner import
- brevbunken vises bare når mottatte husk'et finnes
- album vises som oppslag
- album bruker aldri delingskort
- delingskort brukes kun ved deling
- mottakeren velger selv om et delt minne skal legges i eget album
- husk'et skal ikke ha chat
- varsler skal representere virkelige hendelser eller tidsmessig relevante tilbakeblikk
- tilbakeblikk er valgfritt og aldri tilfeldig i v1
- tema endrer atmosfære, ikke struktur
- realistisk sidevending er en prototype, ikke fundament
- Firebase introduseres ikke før delingsmodellen krever det

---

## 17. Arbeidsrekkefølge

Videre arbeid skal følge denne rekkefølgen:

1. dokumentasjonen oppdateres og fungerer som felles beslutningsgrunnlag
2. Sprint 2A bygges og testes
3. Sprint 2A.1 prototypres separat
4. Sprint 2B stabiliserer medielagringen
5. Sprint 2C fastsetter delingsmodellen
6. Sprint 2D bygger innboksen og første komplette mottakerflyt

Ingen kode for Sprint 2 skal skrives før denne dokumentasjonen er oppdatert i repoet.