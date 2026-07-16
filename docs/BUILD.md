# husk'et v2 – byggedokument

## 1. Dokumentets formål

Dette dokumentet er prosjektets løpende byggedokument og hovedreferanse for produktretning, tekniske valg og arbeidsmåte.

Dokumentet skal oppdateres når vi:

- endrer produktretning
- tar viktige arkitekturvalg
- endrer test- eller publiseringsløpet
- legger til eller fjerner sentrale funksjoner
- lærer noe som påvirker videre utvikling

Detaljerte beslutninger og begrunnelser føres også i [`DECISIONS.md`](./DECISIONS.md).

---

## 2. Prosjektvisjon

husk'et er en privat mobilapp for å bevare og dele minner med mennesker brukeren selv velger.

Appen skal kombinere:

- et rolig og hyggelig digitalt fotoalbum
- enkel og direkte deling mellom familie og venner
- en innboks for mottatte husk'et
- mulighet for å lagre mottatte husk'et i eget album

For utviklingen er albumet appens viktigste produktområde. For brukeren er det egne personlige minner som er hjertet i opplevelsen.

Albumet skal gjøre minnene enkle å arkivere, oversiktlige å finne igjen og hyggelige å bla i.

husk'et skal ikke være et sosialt nettverk og skal ikke forsøke å holde brukeren inne i en endeløs strøm av innhold.

Produktmålet er å tilby et privat og rolig alternativ til den delen av Snapchat som handler om direkte deling mellom mennesker, uten stories, spotlight, chat, algoritmer eller sosial støy.

---

## 3. Produktprinsipper

### 3.1 Del minner – ikke meldinger

Alt som deles i appen er et husk'et.

Et husk'et kan inneholde et nytt bilde eller et eldre bilde som allerede ligger i brukerens album. Delingsopplevelsen skal være identisk uansett når bildet eller minnet ble opprettet.

Det skal ikke være noe visuelt eller funksjonelt skille mellom et «nytt» og et «gammelt» delt husk'et.

### 3.2 Ingen chat

husk'et skal ikke ha:

- tekstchat
- samtaletråder
- skriveindikator
- sett-status
- gruppechat
- tale- eller videosamtaler

Dersom brukere ønsker å snakke om et minne, kan de bruke en annen kommunikasjonskanal.

### 3.3 Reaksjoner er enkle hendelser

Mottakeren kan reagere på et mottatt husk'et med en emoji.

Eksempler:

- ❤️
- 😂
- 😍
- 👏
- 😮
- 😢

Senderen mottar et push-varsel, for eksempel:

> ❤️ Nellie reagerte på husk'et ditt.

Reaksjonen skal ikke opprette en chat, samtaletråd eller egen sosial aktivitetsstrøm.

### 3.4 Mottakeren bestemmer

Et mottatt husk'et havner i mottakerens innboks.

Mottakeren skal kunne:

- åpne husk'et
- reagere med en emoji
- legge husk'et til i eget album
- la husk'et ligge i innboksen
- arkivere eller fjerne husk'et

Et husk'et skal aldri automatisk legges til mottakerens personlige album.

### 3.5 Albumet er appens produktmessige hjerte

Albumet skal oppleves som et godt, gammeldags fotoalbum i digital form.

Det skal føles personlig, rolig og hyggelig å bla i. Designet skal ikke oppleves som en teknisk database, filbehandler eller et vanlig bilderutenett.

Albumet skal kombinere følelsen fra et fysisk papiralbum med fordelene ved en moderne mobilapp:

- enkel oversikt
- rask navigasjon
- tydelig struktur
- mulighet til å søke og finne igjen minner
- mulighet til å hoppe mellom perioder og album
- rolige og varierte bildeoppsett
- en tydelig følelse av rekkefølge, historie og sammenheng

Albumet må være enkelt å bruke selv når brukeren har mange bilder og flere album.

### 3.6 Minnet er brukerens hjerte

Et husk'et er et personlig minne som brukeren har valgt å arkivere i appen.

Et minne skal kunne inneholde:

- ett eller flere bilder eller andre støttede medier
- en kort, valgfri kommentar
- en valgfri emoji som uttrykker følelsen eller stemningen i øyeblikket
- opprinnelig dato når denne er kjent
- sted når dette er tilgjengelig og brukeren tillater det
- kobling til albumet minnet er arkivert i

Et minne skal kunne lagres raskt uten at brukeren må fylle ut kommentar, følelse, sted eller andre metadata.

Emoji-feltet skal ikke omtales som rating. Det skal uttrykke hvordan øyeblikket føltes, ikke rangere om minnet var bra eller dårlig.

### 3.7 Mange kilder – én importflyt

husk'et skal kunne hente minner fra flest mulig relevante kilder.

Første aktuelle kilder er:

- kameraet i husk'et
- telefonens bildebibliotek
- et mottatt husk'et
- telefonens delingsmeny på Android og iOS

Fremtidige kilder kan blant annet være:

- skannede papirbilder
- filer fra telefonen
- sikkerhetskopier
- skytjenester
- eksterne kameraer eller datamaskiner
- nye medietyper

Alle kilder skal levere innhold til samme klargjøringsflyt:

```text
Kilde
  ↓
Importert medie
  ↓
Klargjør minne
  ↓
Velg eller opprett album
  ↓
Lagre som husk'et
```

Kilden skal ikke bestemme hvordan minnet lagres, vises eller organiseres i albumet.

Et bilde tatt i husk'et, importert fra bildebiblioteket eller mottatt fra en annen bruker skal bli samme type minne etter at brukeren har valgt å arkivere det.

Hver ny kilde skal bygges som en separat adapter mot et felles importformat. Dette skal gjøre det mulig å legge til nye kilder uten å bygge om albumet, minnemodellen eller lagringslogikken.

Opprinnelig kilde kan lagres som intern metadata når det er nyttig for feilsøking, importhistorikk eller dublettkontroll, men skal ikke prege den vanlige albumopplevelsen.

### 3.8 Album erstatter kategorier som primær organisering

Album skal være den primære måten brukeren organiserer minner på.

Synlige kategorier skal ikke inngå i første versjon. Brukeren skal ikke måtte organisere det samme minnet både i et album og i en kategori.

Datamodellen skal likevel ikke låses mot fremtidig støtte for enkle merkelapper eller emneknagger dersom reell bruk viser at dette er nyttig.

### 3.9 Ingen algoritmisk innholdsstrøm

husk'et skal ikke ha:

- stories
- spotlight
- offentlig feed
- anbefalt innhold
- influenserinnhold
- rangering basert på engasjement
- offentlig følger- eller likesystem

Brukeren skal bare se eget innhold og innhold som noen aktivt har delt med dem.

### 3.10 Varsler skal være relevante

Varsler skal begrenses til konkrete hendelser som gir brukeren verdi.

Aktuelle varseltyper:

- noen delte et husk'et med deg
- noen reagerte på et husk'et du delte
- nødvendige konto- eller sikkerhetsvarsler

Appen skal ikke bruke aggressive eller manipulerende push-varsler for å lokke brukeren tilbake.

---

## 4. Første produktomfang

Første komplette produktversjon skal minst dekke følgende hovedflyt:

1. Brukeren oppretter en konto eller logger inn.
2. Brukeren oppretter et husk'et fra kamera eller bildebibliotek.
3. Brukeren kan legge til en kort kommentar og en valgfri følelsesemoji.
4. Brukeren velger eller oppretter et album.
5. Brukeren lagrer husk'et i eget album.
6. Brukeren kan navigere enkelt og oversiktlig i albumet.
7. Brukeren kan dele husk'et med en valgt kontakt.
8. Mottakeren får et push-varsel.
9. Mottakeren åpner husk'et i innboksen.
10. Mottakeren kan reagere med en emoji.
11. Senderen får et enkelt push-varsel om reaksjonen.
12. Mottakeren kan legge husk'et til i eget album.

Funksjoner utenfor denne kjernen skal vurderes nøye før de legges til.

---

## 5. Foreløpig domenemodell

### 5.1 Memory

Et `Memory` representerer et arkivert husk'et i brukerens album.

Foreløpige egenskaper:

- unik ID
- ett eller flere medier
- album-ID
- valgfri kort kommentar
- valgfri følelsesemoji
- opprinnelig dato
- valgfritt sted
- opprettet og sist oppdatert
- intern kildeinformasjon når dette er nødvendig

Den endelige modellen fastsettes før lagringslaget implementeres.

### 5.2 ImportedMemory

Et `ImportedMemory` er et midlertidig, normalisert format mellom en kilde og lagring som et ferdig minne.

Formatet skal kunne inneholde:

- kilde
- lokal URI eller filreferanse
- filnavn og MIME-type
- dimensjoner
- opprinnelig dato
- sted
- kildespesifikk metadata

Kildespesifikk informasjon skal ikke lekke inn i albumlogikken.

### 5.3 Album

Et `Album` er brukerens primære organisering av minner.

Albumet skal støtte:

- navn og valgfri beskrivelse
- omslag eller representativt bilde
- tydelig rekkefølge
- enkel navigasjon mellom minner og oppslag
- visning som gir assosiasjoner til et fysisk fotoalbum
- senere utvidelse med flere visnings- og layoutmuligheter

### 5.4 Kildeadaptere

Hver inngangskilde skal implementere et felles grensesnitt og levere et normalisert `ImportedMemory`.

Aktuelle adaptere:

- `CameraSource`
- `PhotoLibrarySource`
- `InboxSource`
- `SystemShareSource`
- senere `FileSource`, `ScannerSource`, `BackupSource` og andre behov

---

## 6. Teknisk retning

### 6.1 Plattform

husk'et v2 bygges som en mobilapp med Expo og React Native.

Målplattformer:

- Android
- iOS

Web brukes som utviklings- og kontrollflate, men er ikke en produksjonsplattform for sluttbrukere.

### 6.2 Ny kodebase

Prosjektet bygges i det nye repoet `husket-v2`.

Det eksisterende repoet `husket` brukes som referanse når vi trenger å undersøke eller gjenbruke gjennomprøvde løsninger, blant annet:

- kamera og bildevalg
- bildebehandling
- import og eksport
- språkstruktur
- tidligere publiseringsoppsett
- løsninger på kjente Android- og iOS-problemer

Kode skal ikke kopieres ukritisk. Hver løsning vurderes mot den nye produktretningen og arkitekturen.

### 6.3 Foreløpig teknologistakk

- Expo
- React Native
- TypeScript
- Expo Router
- EAS Build
- EAS Submit
- development builds for fysisk testing

Backend, autentisering, datalagring, bildearkitektur og push-infrastruktur besluttes senere og dokumenteres før implementering.

### 6.4 Plattformidentifikatorer

Utviklingsversjonen skal kunne installeres samtidig med den eksisterende publiserte husk'et-appen.

Endelige Android- og iOS-identifikatorer skal ikke låses før vi har bestemt om husk'et v2 skal:

- erstatte dagens publiserte app som en oppdatering, eller
- publiseres som en separat app

---

## 7. Utviklings- og teststrategi

### 7.1 Daglig utvikling på web

Web brukes til raske utviklingsrunder og kontroll av:

- navigasjon
- skjermflyt
- layout
- albumvisning
- husk'et-kort
- innboks
- datamodeller
- vanlig app-logikk
- TypeScript-feil
- at prosjektet bygger

En grønn web-build betyr ikke at mobilfunksjonene er ferdig verifisert.

### 7.2 Testing på fysiske enheter

Følgende områder skal alltid testes på ekte Android- og iOS-enheter:

- kamera
- bildebibliotek
- systemets delingsmeny
- tillatelser
- lokal fillagring
- push-varsler
- deling mellom brukere
- innlogging
- deep links
- bakgrunnsoppførsel
- tastatur og modaler
- bildeytelse og minnebruk
- appikon og splash
- plattformspesifikke forskjeller

### 7.3 Development builds

Development builds brukes til løpende mobiltesting mellom større milepæler.

Expo Go skal ikke være prosjektets eneste mobiltestmiljø, fordi appen vil kreve native funksjoner og konfigurasjoner som må testes i appens egentlige runtime.

### 7.4 Intern testing

Ved komplette funksjonelle milepæler distribueres builds til:

- Google Play Internal Testing
- TestFlight Internal Testing

Eksempler på milepæler:

- opprette og lagre et husk'et
- fungerende album
- konto og innlogging
- dele og motta et husk'et
- push-varsler
- emoji-reaksjoner
- import gjennom systemets delingsmeny

### 7.5 Produksjonsklar kontroll

Før publisering skal appen testes som produksjonsbuild på begge plattformer.

Web, development build og én enkelt plattform kan aldri alene brukes som endelig godkjenning.

---

## 8. Arbeidsmåte

Utviklingen gjennomføres stegvis.

For hvert større steg skal vi:

1. avklare ønsket brukeropplevelse
2. dokumentere viktige beslutninger
3. bygge én sammenhengende funksjon
4. kontrollere web-build og TypeScript
5. teste mobilspesifikke deler på fysisk enhet
6. beholde eksisterende fungerende funksjonalitet
7. oppdatere byggedokumentet når læringen påvirker videre arbeid

Vi prioriterer stabile, pragmatiske løsninger fremfor unødvendig kompleksitet.

---

## 9. Designretning

Appen skal oppleves:

- privat
- varm
- rolig
- enkel
- personlig
- oversiktlig

Appen skal ikke skape:

- FOMO
- sosialt press
- varselstress
- konkurranse om likes
- behov for kontinuerlig oppmerksomhet

Fotoalbumet og selve husk'et skal være visuelt viktigere enn menyer, systeminformasjon og tekniske funksjoner.

Albumet skal hente inspirasjon fra fysiske fotoalbum uten å kopiere deres begrensninger. Digitale fordeler som søk, filtrering, raske hopp og fleksibel navigasjon skal integreres uten at albumfølelsen forsvinner.

---

## 10. Inntektsmodell

Appen skal ikke starte med en aggressiv paywall.

Første mål er å skape en app som brukere faktisk ønsker å bruke og dele minner gjennom.

Inntektsmodell vurderes når reell bruk, trafikk, lagringsbehov eller driftskostnader gjør det nødvendig.

Mulige fremtidige betalingsområder kan være:

- utvidet skylagring
- ekstra albumfunksjoner
- eksport og fotobøker
- alternative albumdesign
- familie- eller gruppefunksjoner med høyere ressursbruk

Kjerneopplevelsen skal ikke ødelegges av tidlig eller unødvendig funksjonslåsing.

---

## 11. Beslutningsregel for nye funksjoner

Før en ny funksjon legges til, skal vi spørre:

1. Hjelper funksjonen brukeren med å bevare eller dele et minne?
2. Gjør funksjonen albumet bedre, mer oversiktlig eller hyggeligere å bruke?
3. Gjør funksjonen appen roligere eller mer støyende?
4. Flytter funksjonen appen mot et privat fotoalbum eller mot et sosialt nettverk?
5. Er funksjonen nødvendig nå, eller kan den vente?
6. Bevarer funksjonen brukerens kontroll og personvern?
7. Kan funksjonen bygges som en avgrenset utvidelse uten å låse fremtidige kilder eller medietyper?

Dersom en funksjon gjør husk'et mer lik et offentlig sosialt nettverk eller en chat-app, skal den som hovedregel ikke bygges.

---

## 12. Åpne hovedbeslutninger

Følgende områder må avklares og dokumenteres før de bygges:

- autentiseringsmodell
- hvordan brukere finner og legger til hverandre
- backend og database
- bildeopplasting og skylagring
- lokal/offline lagring
- synkronisering
- personvernmodell
- kryptering og tilgangskontroll
- håndtering av sletting og kontoavslutning
- endelig format og metadata for et husk'et
- innboksens livssyklus
- albumstruktur, sideoppslag og bokvisning
- søk, tidsnavigasjon og større albumsamlinger
- konkret sett med følelsesemoji
- om og hvordan merkelapper skal innføres senere
- om v2 erstatter eksisterende butikkapp
- fremtidig betalingsmodell

---

## 13. Dokumentstatus

- Dokumentversjon: 0.2
- Opprettet: 15. juli 2026
- Sist oppdatert: 16. juli 2026
- Status: Oppdatert produkt-, album- og importgrunnlag
