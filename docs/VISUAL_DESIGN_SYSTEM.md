# husk'et v2 – visuelt designsystem

## Dokumentstatus

Dette dokumentet fastsetter den visuelle arkitekturen og stilguiden for husk'et v2.

Det skal brukes som beslutningsgrunnlag før nye visuelle assets genereres eller nye identitetsbærende elementer implementeres.

Stilguiden er et levende dokument. Den kan videreutvikles når produktet modnes, men sentrale prinsipper skal ikke endres gjennom tilfeldige UI-valg under implementering.

---

## 1. Visuell hovedidé

Når brukeren åpner husk'et, skal det føles som å gå bort til en bokhylle hjemme – ikke som å åpne enda en app.

Den visuelle identiteten skal støtte produktets grunnidé:

- et personlig bibliotek
- varme og varige minner
- rolig privat deling
- ingen oppmerksomhetsjakt
- ingen feed- eller dashboardfølelse

Målet er ikke fotorealisme.

Målet er varme, gjenkjennelighet og en tydelig egenart.

---

## 2. Assets fremfor kodet identitet

Identitetsbærende objekter skal primært utvikles som egne illustrerte assets, ikke tegnes ferdig med generiske React Native-flater, standardikoner eller emoji.

Koden skal definere:

- plassering
- størrelse
- responsiv skalering
- interaksjon
- animasjon
- tilgjengelighet
- tilstand
- hvilket tema og hvilken asset som brukes

Illustrasjonene skal definere:

- utseende
- materialer
- tekstur
- lys og skygge
- detaljer
- personlighet
- visuell sammenheng

Logikk og illustrasjon skal være frikoblet.

En bokhylle, bokrygg eller bilderamme skal kunne erstattes visuelt uten at navigasjon, datamodell eller funksjonslogikk må bygges om.

---

## 3. Sentrale illustrasjoner

Følgende elementer skal utvikles spesifikt for husk'et:

- bokhylle
- albumrygger
- kamera
- bilderamme
- brevbunke
- bok eller objekt for opprettelse av nytt album
- eventuelle senere dekorative objekter

Sentrale produktobjekter skal ikke baseres på:

- Material Icons
- Font Awesome
- tilfeldige ikonpakker
- stockillustrasjoner
- usammenhengende AI-genererte bilder
- emoji som permanent produktgrafikk

Standardikoner kan fortsatt brukes til mindre funksjonsikoner der de ikke bærer produktidentiteten, for eksempel tilbake, lukk, rediger og innstillinger.

---

## 4. Illustrasjonsstil

Uttrykket skal være:

- illustrert
- varmt
- rolig
- tidløst
- lett håndlaget
- mykt uten å bli barnslig
- detaljert nok til å føles personlig
- enkelt nok til å fungere tydelig på små skjermer

Uttrykket skal ikke være:

- fotorealistisk
- hyperdetaljert 3D
- glatt og generisk app-grafikk
- neonpreget
- gaming-inspirert
- plastaktig
- industrielt
- visuelt støyende

Alle assets i samme bibliotekstil skal oppleves som om de er laget av samme illustratør.

---

## 5. Perspektiv og komposisjon

Alle objekter som står i samme scene skal bruke samme perspektiv.

Foreløpig hovedretning:

- frontvendt bokhylle
- lett innsyn ovenfra i løse objekter på toppflaten
- svak dybde, men uten dramatisk perspektiv
- naturlig og stabil horisont

Kamera, bilderamme, brev og bøker skal kunne plasseres sammen uten at perspektivet avslører at de er generert hver for seg.

Før første komplette assetsett godkjennes, skal vi låse:

- kameraets synsvinkel
- bokhyllens synsvinkel
- objektenes horisontlinje
- lyskildens retning
- referansestørrelser mellom objektene

Når dette er låst, skal senere assets følge samme system.

---

## 6. Lys og skygge

Standarduttrykket skal bruke mykt og varmt dagslys.

Lyssettingen skal:

- være rolig
- gi lesbar form
- skape lett dybde
- være konsistent mellom assets
- unngå harde høylys og svarte slagskygger

Skygger skal først og fremst hjelpe objektene med å stå naturlig på hyllen.

Skygger skal ikke brukes som dramatisk effekt.

Transparent-assetter skal normalt ha interne objektskygger som passer den låste lysretningen. Kontakt- og plasskygger kan legges i kode eller følge asseten avhengig av hva som gir mest stabil skalering.

---

## 7. Materialer

Foretrukne materialer:

- eik
- valnøtt
- malt tre
- papir
- kartong
- lær
- bokstoff
- glass
- keramikk i eventuelle senere dekorobjekter

Materialene skal oppleves varme og brukte nok til å ha personlighet, men ikke skitne eller slitte.

Materialer som normalt skal unngås i bibliotekets hovedidentitet:

- krom
- karbonfiber
- neonplast
- blank teknologiplast
- aggressive metallflater

Kameraet kan naturlig inneholde metall og glass, men skal fortsatt passe inn i det varme biblioteksmiljøet.

---

## 8. Fargefilosofi

Grunnmiljøet skal bruke varme, dempede farger.

Farger skal i størst mulig grad komme fra:

- treverket
- albumryggene
- papir og stoff
- brukerens egne bilder og minner

Selve UI-et skal ikke konkurrere med minnene gjennom sterke fargeflater.

Albumrygger kan ha tydelig variasjon, men skal tilhøre en samlet palett.

En standardpalett bør inneholde flere toner innenfor:

- skoggrønn
- dempet blå
- rust og terrakotta
- burgunder
- sennep
- krem
- brun
- grågrønn

Fargene skal testes både mot lyst og mørkt tekstinnhold.

---

## 9. Bokhyllen

Bokhyllen skal utvikles som en illustrert bakgrunn eller et modulært illustrert bakgrunnssystem.

Bokhyllen skal definere:

- treverk og materialfølelse
- sidevegger
- toppflate
- hyller
- dybde
- lys
- skygger
- visuelle soner for interaktive objekter

Koden skal legge interaktive elementer over bokhyllen i definerte soner.

Bokhyllen skal ikke bake inn brukerens dynamiske innhold i selve bakgrunnsbildet.

Album, kamera, bilderamme og brev skal være separate lag.

Bakgrunnen må utformes slik at den kan skaleres på ulike skjermstørrelser uten at hyllenes funksjonelle plassering blir uforutsigbar.

Foretrukket løsning er én av følgende:

1. en responsiv helillustrasjon med dokumenterte prosentbaserte ankerpunkter
2. en modulær bakgrunn med topp, sidevegger, bakplate og repeterbare hylleelementer
3. en hybrid hvor bokhyllen er illustrert, men hyllenivåene styres av kode

Valget skal tas etter en prototype på mobilbredde, nettbrett og web.

---

## 10. Albumrygger

Albumene skal vises som bøker i bokhyllen.

Hver albumrygg skal:

- være en egen illustrert asset eller bygges fra et kontrollert assetsett
- tilhøre samme perspektiv og lyssetting som bokhyllen
- støtte lesbar albumtittel
- kunne variere i høyde, bredde, farge og materiale
- beholde samme visuelle identitet for samme album

Et album skal ikke få en ny tilfeldig bokrygg hver gang appen åpnes.

Albumets bokstil skal bestemmes stabilt, for eksempel ved:

- lagret `bookStyleId`
- deterministisk valg basert på album-ID
- brukerens eksplisitte valg senere

Bokryggsettet skal støtte variasjon uten å bli visuelt kaotisk.

Første komplette sett bør inneholde et begrenset antall gjennomarbeidede varianter, ikke mange nesten like eller inkonsistente bilder.

Foreløpig mål for første sett:

- 8–12 grunnformer
- flere fargevarianter
- noen stoffrygger
- noen lær- eller papirrygger
- én tydelig, men diskret ny-album-bok

Albumtittel skal normalt legges som ekte tekst over ryggen, ikke genereres inn i bildet. Det gir korrekt språk, skarpere tekst, tilgjengelighet og støtte for brukerens egne titler.

---

## 11. Kameraet

Kameraet er inngangen til et nytt minne tatt nå.

Det skal:

- oppleves som et fysisk objekt på toppen av bokhyllen
- åpne telefonens kamera direkte ved trykk
- være tydelig uten en stor handlingsknapp
- ha et eget husk'et-uttrykk
- fungere i liten størrelse

Kameraet skal ikke ligne et bestemt varemerkebeskyttet produkt så tett at det oppleves som en kopi.

Det skal være et generisk, varmt og gjenkjennelig kameraobjekt laget for husk'et.

---

## 12. Bilderammen

Bilderammen er inngangen til eksisterende minner.

Den skal:

- oppleves som et fysisk objekt ved siden av kameraet
- åpne telefonens kamerarull direkte ved trykk
- senere kunne representere flere importkilder uten å endre hovedmetaforen
- ha plass til et generisk eller brukerbasert motiv

Før vi bruker et personlig bilde i rammen, skal personvern, tomtilstand og fallback være definert.

Første versjon kan bruke et rolig, nøytralt motiv laget spesielt for husk'et.

---

## 13. Brevbunken

Brevbunken representerer mottatte husk'et.

Den skal:

- være helt skjult når innboksen er tom
- dukke opp som et naturlig objekt når mottatte husk'et finnes
- ikke bruke rødt badge eller aggressiv varslingsgrafikk
- åpne innboksen ved trykk
- kunne variere diskret med antall uleste elementer uten å bli en tellerbasert oppmerksomhetsmekanisme

Brevbunken skal føles som at det ligger post til brukeren, ikke som et varslingssenter.

---

## 14. Dekorative objekter

Dekor skal brukes svært forsiktig.

Mulige senere objekter kan være:

- liten plante
- kaffekopp
- lampe
- bokstøtte
- liten eske

Dekor skal aldri:

- redusere tydeligheten til interaktive objekter
- fylle tomrom bare fordi det finnes plass
- endre plassering av grunnleggende funksjoner
- bli en samlemekanisme eller et spill uten en egen produktbeslutning

Luft og tom plass er en del av designet.

---

## 15. Temasystem

Et bibliotekstema skal kunne bytte atmosfære uten å endre produktstruktur.

Et tema kan inneholde:

```text
assets/library/themes/<theme-id>/
├── bookshelf/
│   ├── background.png
│   └── metadata.ts
├── objects/
│   ├── camera.png
│   ├── picture-frame.png
│   ├── letter-stack.png
│   └── new-album-book.png
└── books/
    ├── book-01.png
    ├── book-02.png
    └── ...
```

Den endelige mappestrukturen fastsettes når første assetsett integreres.

Tema kan endre:

- treverk
- farger
- teksturer
- materialfølelse
- lys
- atmosfære
- bokpalett

Tema skal ikke endre:

- navigasjon
- bokhyllens funksjonelle soner
- kameraets funksjon
- bilderammens funksjon
- innbokslogikk
- albumform
- oppslagsmodell

Strukturen er konstant.

Atmosfæren er valgfri.

---

## 16. Assetkrav

Alle genererte assets skal vurderes mot disse kravene:

- riktig perspektiv
- konsistent lysretning
- transparent bakgrunn når objektet skal legges over scenen
- tilstrekkelig oppløsning for moderne mobilskjermer
- tydelig silhuett i faktisk visningsstørrelse
- ingen innebygget tekst som må lokaliseres
- ingen tilfeldige logoer eller varemerker
- ingen uønskede artefakter
- ingen bakgrunnspiksler rundt transparente kanter
- konsistent fargeprofil
- kontrollert filstørrelse

Originale høyoppløselige arbeidsfiler kan beholdes utenfor runtime-mappen.

Appen skal bruke optimaliserte eksportfiler.

Ingen fontfiler skal distribueres som en del av assetarbeidet uten en egen og kontrollert lisensbeslutning.

---

## 17. Genereringsprosess

AI-generering skal brukes som en kontrollert produksjonsprosess, ikke som tilfeldig bildeleting.

For hver assetfamilie skal vi:

1. fastsette stil, perspektiv, lys og proporsjoner
2. generere et begrenset antall kandidater
3. velge én visuell retning
4. korrigere åpenbare skivebommer
5. generere relaterte elementer med samme referanser
6. kontrollere elementene sammen i faktisk appscene
7. optimalisere og navngi filene
8. dokumentere godkjent variant og bruksområde

Nye objekter skal genereres mot den eksisterende stilguiden og det godkjente referansesettet.

De skal ikke starte en ny stilretning hver gang.

---

## 18. Ansvar og godkjenning

ChatGPT har ansvar for å:

- forvalte og videreutvikle stilguiden
- foreslå konsistente visuelle løsninger
- generere app-spesifikke assets
- bevare perspektiv, lys, materialer og proporsjoner
- dokumentere nye visuelle beslutninger
- unngå å introdusere usammenhengende elementer

Produkteier har ansvar for å:

- korrigere retningen når noe ikke føles som husk'et
- godkjenne den overordnede atmosfæren
- prioritere mellom alternative retninger
- stoppe visuelle valg som oppleves feil for produktet

Stilguiden skal oppdateres når en korrigering blir en varig produktbeslutning.

---

## 19. Låste regler

Følgende regler er låst før første komplette assetsett genereres:

- bokhyllen skal være en illustrert scene, ikke produktets endelige kodede utseende
- dynamiske og interaktive objekter skal ligge i separate lag over bakgrunnen
- kode styrer oppførsel; assets styrer identitet
- alle sentrale illustrasjoner skal utvikles spesielt for husk'et
- samme album skal beholde samme bokstil
- brukerens albumtitler legges som ekte tekst, ikke som generert bildetekst
- tema endrer atmosfære, ikke struktur
- brevbunken er skjult når innboksen er tom
- tom plass er tillatt og ønsket
- ingen nye identitetsbærende illustrasjoner tas inn uten å følge stilguiden

---

## 20. Neste visuelle milepæl

Før videre polering av den kodede bokhyllen skal vi:

1. låse første bibliotekstils perspektiv og lysretning
2. generere og velge første bokhyllebakgrunn
3. generere kamera og bilderamme i samme stil
4. generere et lite første sett med albumrygger
5. teste assets samlet i Sprint 2A-scenen
6. avgjøre om bokhyllen skal bruke helillustrasjon, moduler eller hybrid

Første mål er ikke et stort temabibliotek.

Første mål er ett konsistent, app-spesifikt og produksjonsklart biblioteksett.