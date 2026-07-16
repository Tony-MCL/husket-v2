# husk'et v2 – beslutningslogg

## Formål

Dette dokumentet inneholder viktige produkt- og teknologibeslutninger for husk'et v2.

Hver beslutning skal beskrive:

- dato
- beslutning
- begrunnelse
- konsekvens for videre utvikling

Nyeste beslutninger legges nederst.

---

## 15. juli 2026 – husk'et v2 bygges som en ny app

### Beslutning

husk'et v2 bygges i et nytt og selvstendig GitHub-repo: `husket-v2`.

Den eksisterende publiserte husk'et-appen bygges ikke om direkte.

### Begrunnelse

Produktet har fått en ny og tydeligere identitet. Den nye appen skal kombinere privat deling av minner med et digitalt fotoalbum, og den tekniske grunnmodellen blir derfor annerledes enn i dagens app.

En ny kodebase gjør det mulig å bygge riktig struktur fra starten uten å være bundet av tidligere navigasjon, profiler, paywall eller datamodell.

### Konsekvens

Det eksisterende repoet `husket` brukes kun som referanse og kilde til gjennomprøvde enkeltløsninger.

---

## 15. juli 2026 – Expo og React Native brukes som plattform

### Beslutning

husk'et v2 bygges med Expo, React Native og TypeScript.

### Begrunnelse

Appen er en ren mobilapp for Android og iOS. Expo gir en kjent og praktisk arbeidsflyt for utvikling i GitHub Codespaces, skybaserte builds, TestFlight og Google Play Internal Testing.

### Konsekvens

Prosjektet planlegges rundt Expo Router, EAS Build, EAS Submit og development builds.

Web beholdes som utviklings- og kontrollflate, ikke som sluttbrukerplattform.

---

## 15. juli 2026 – web er arbeidsbenk, mobil er fasit

### Beslutning

Daglig utvikling og kontroll gjennomføres i stor grad på web, mens mobilspesifikke funksjoner alltid godkjennes på fysiske Android- og iOS-enheter.

### Begrunnelse

Web gir raske utviklingsrunder, men kan ikke verifisere kamera, bildebibliotek, tillatelser, push-varsler, lokal fillagring, deep links eller plattformspesifikk oppførsel.

### Konsekvens

En grønn web-build betyr ikke at en funksjon er ferdig.

Development builds brukes fortløpende, og interne butikkbuilds brukes ved funksjonelle milepæler.

---

## 15. juli 2026 – appen deler minner, ikke meldinger

### Beslutning

Alt innhold som deles mellom brukere skal være et husk'et.

Det skal ikke være mulig å sende frittstående tekstmeldinger.

### Begrunnelse

Appens identitet skal være privat deling og bevaring av minner, ikke kommunikasjon gjennom chat.

### Konsekvens

Datamodell, navigasjon og backend skal ikke bygges rundt meldings- eller samtaletråder.

---

## 15. juli 2026 – ingen chat

### Beslutning

husk'et skal ikke ha noen form for chat.

### Begrunnelse

Chat finnes allerede i mange etablerte tjenester. En chatfunksjon ville gjort produktet mer komplekst, skapt mer støy og flyttet appen bort fra fotoalbumet og minnedelingen.

### Konsekvens

Følgende skal ikke bygges:

- tekstchat
- samtaletråder
- skriveindikator
- sett-status
- gruppechat
- tale- eller videosamtaler

---

## 15. juli 2026 – emoji-reaksjoner gir kun et push-varsel

### Beslutning

Mottakeren kan reagere på et mottatt husk'et med en emoji.

Senderen mottar et enkelt push-varsel, for eksempel:

> 😂 Nellie reagerte på husk'et ditt.

Reaksjonen skal ikke starte en samtale.

### Begrunnelse

En emoji gir mottakeren mulighet til å vise en umiddelbar respons uten at appen utvikler seg til en meldingsplattform.

### Konsekvens

Det skal ikke opprettes chat, kommentarfelt eller samtaletråd fra en reaksjon.

Behovet for eventuell teknisk lagring av reaksjonshendelser vurderes senere, men de skal ikke presenteres som en sosial historikk i appen.

---

## 15. juli 2026 – nye og gamle husk'et deles likt

### Beslutning

Et husk'et som nettopp er opprettet og et eldre husk'et fra albumet skal deles og vises på samme måte.

### Begrunnelse

husk'et handler om minner, ikke bare ferske øyeblikk. Et eldre minne kan være like relevant å dele som et bilde tatt for få sekunder siden.

### Konsekvens

Delingsflyten skal ikke ha egne moduser, merkinger eller visuelle forskjeller basert på alderen til husk'et.

Den opprinnelige datoen kan vises som metadata, men delingsopplevelsen skal være identisk.

---

## 15. juli 2026 – mottakeren velger om et husk'et skal inn i albumet

### Beslutning

Et mottatt husk'et legges først i mottakerens innboks.

Mottakeren velger selv om det skal legges til i eget album.

### Begrunnelse

Mottakeren skal ha full kontroll over sitt personlige album. Deling fra andre skal ikke automatisk endre mottakerens minnesamling.

### Konsekvens

Innboks og album må behandles som separate deler av datamodellen og brukerflyten.

Et husk'et skal aldri automatisk lagres i mottakerens album.

---

## 15. juli 2026 – ingen stories, spotlight eller algoritmisk feed

### Beslutning

husk'et skal ikke inneholde stories, spotlight, offentlig feed, anbefalt innhold eller algoritmisk rangering.

### Begrunnelse

Appen skal være et privat og rolig alternativ for direkte deling mellom mennesker brukeren selv velger.

### Konsekvens

Brukeren skal bare se:

- egne husk'et
- eget album
- husk'et som andre aktivt har delt med brukeren

---

## 15. juli 2026 – ingen aggressiv paywall ved oppstart

### Beslutning

Første versjon skal ikke bygges rundt en hard eller tidlig paywall.

### Begrunnelse

Første mål er å skape en app som brukere ønsker å bruke regelmessig. Inntektsmodell må vurderes ut fra faktisk trafikk, lagring og driftskostnader.

### Konsekvens

Kjerneopplevelsen skal utvikles uten at sentrale funksjoner låses unødvendig tidlig.

Mulige betalte funksjoner vurderes senere og dokumenteres før implementering.

---

## 15. juli 2026 – endelig butikkstrategi avgjøres senere

### Beslutning

Det avgjøres senere om husk'et v2 skal erstatte dagens publiserte husk'et-app eller publiseres som en separat app.

### Begrunnelse

Vi ønsker å beholde begge muligheter mens den nye appen utvikles og testes.

### Konsekvens

Endelige Android- og iOS-identifikatorer skal ikke låses før eksisterende appkonfigurasjon er undersøkt og publiseringsstrategien er bestemt.

---

## 16. juli 2026 – albumet er appens produktmessige hjerte

### Beslutning

Albumet skal være det viktigste produktområdet i husk'et v2.

For utviklingen er albumet hjertet i appen. For brukeren er egne personlige minner hjertet i opplevelsen.

### Begrunnelse

Et vanlig bilderutenett finnes allerede i mange apper. husk'et skal gi brukeren følelsen av å bla i et personlig fotoalbum, samtidig som appen beholder moderne fordeler som oversikt, søk og rask navigasjon.

### Konsekvens

Albumopplevelsen skal prioriteres foran sekundære funksjoner og skal utvikles som mer enn et teknisk galleri.

Datamodell, navigasjon og design skal støtte både små og store albumsamlinger over tid.

---

## 16. juli 2026 – mange kilder skal bruke én felles importflyt

### Beslutning

Kamera, bildebibliotek, mottatte husk'et, systemets delingsmeny og fremtidige kilder skal levere innhold gjennom én normalisert importflyt.

### Begrunnelse

Appen skal kunne hente minner fra flest mulig relevante kilder uten at albumet eller minnemodellen må bygges om hver gang en ny kilde legges til.

### Konsekvens

Hver kilde bygges som en separat adapter som leverer et felles midlertidig importformat.

Etter arkivering skal kilden ikke bestemme hvordan minnet vises eller behandles i albumet.

---

## 16. juli 2026 – korte kommentarer og følelsesemoji videreføres

### Beslutning

Brukeren skal kunne legge til en kort, valgfri kommentar og en valgfri emoji på et minne.

Emojien skal uttrykke følelsen eller stemningen i øyeblikket og skal ikke omtales som rating.

### Begrunnelse

Kommentar og emoji kan gi bildet personlig mening uten å gjøre lagringsflyten tung eller komplisert.

### Konsekvens

Begge feltene skal være valgfrie.

Brukeren skal kunne arkivere et minne raskt uten å fylle ut metadata.

Datamodellen skal bruke et begrep som følelse eller stemning, ikke rating.

---

## 16. juli 2026 – album erstatter kategorier i første versjon

### Beslutning

Synlige kategorier skal ikke inngå i første versjon av husk'et v2.

Album skal være den primære organiseringen av minner.

### Begrunnelse

Når brukeren allerede velger album, kan kategorier føre til dobbel organisering og unødvendig arbeid ved arkivering.

### Konsekvens

Kategorisystemet fra husk'et v1 kopieres ikke inn i den nye appen.

Datamodellen skal likevel kunne utvides med enkle merkelapper eller emneknagger senere dersom faktisk bruk viser et behov.
