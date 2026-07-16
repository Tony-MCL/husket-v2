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

Biblioteket skal oppleves som en troverdig fysisk scene med interaktive objekter.

Målet er ikke å etterligne et vanlig appgrensesnitt. Målet er en varm, realistisk og gjenkjennelig verden som er utviklet spesielt for husk'et.

---

## 2. Realistiske interaktive objekter

Kameraet, bilderammen, brevbunken og albumene skal se så realistiske og fysiske ut som mulig innenfor kravene til lesbarhet, ytelse og små mobilskjermer.

De skal samtidig fungere som de grensesnittelementene de representerer:

- kameraet åpner telefonens kamera
- bilderammen åpner bildebiblioteket
- brevbunken åpner mottatte husk'et
- hver albumrygg åpner riktig album
- ny-album-objektet åpner opprettelse av album

Objektene skal ikke reduseres til standardikoner, emoji eller flate symboler når de bærer produktets visuelle identitet.

Visuell realisme skal ikke gå på bekostning av:

- tydelig trykkflate
- tilgjengelighetsmerking
- rask respons
- responsiv skalering
- forståelig funksjon
- konsistent plassering

Koden skal gjøre objektene tilgjengelige og interaktive selv om selve utseendet kommer fra en grafisk asset.

---

## 3. Format følger kvalitet og funksjon

husk'et låses ikke til ett bestemt filformat for identitetsbærende assets.

Format skal velges ut fra hva som gir best kombinasjon av:

- visuell kvalitet
- realisme
- transparens
- skalerbarhet
- filstørrelse
- ytelse på Android og iOS
- støtte i Expo og React Native
- behov for senere bearbeiding

Aktuelle formater kan være:

- PNG for transparente objekter med høy detaljgrad
- WebP for optimalisert rastergrafikk og bakgrunner
- SVG for elementer som egner seg for vektorgrafikk
- andre produksjonsegnede formater dersom plattformstøtte og ytelse er dokumentert

SVG er et mulig virkemiddel, ikke et produktkrav.

Et realistisk kamera eller en teksturert bokrygg skal ikke tvinges inn i SVG dersom en transparent rasterasset gir et bedre resultat.

Appen skal bruke optimaliserte runtime-filer. Høyoppløselige arbeidsfiler kan beholdes separat.

---

## 4. Assets fremfor kodet identitet

Identitetsbærende objekter skal primært utvikles som egne app-spesifikke assets, ikke tegnes ferdig med generiske React Native-flater, standardikoner eller emoji.

Koden skal definere:

- plassering
- størrelse
- responsiv skalering
- interaksjon
- animasjon
- tilgjengelighet
- tilstand
- hvilket tema og hvilken asset som brukes

Assetene skal definere:

- utseende
- materialer
- tekstur
- lys og skygge
- detaljer
- personlighet
- visuell sammenheng

Logikk og grafikk skal være frikoblet.

En bokhylle, bokrygg, bilderamme eller annet objekt skal kunne erstattes visuelt uten at navigasjon, datamodell eller funksjonslogikk må bygges om.

---

## 5. Sentrale assets

Følgende elementer skal utvikles spesifikt for husk'et:

- tom masterbokhylle
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
- stockgrafikk
- usammenhengende AI-genererte bilder
- emoji som permanent produktgrafikk

Standardikoner kan fortsatt brukes til mindre funksjonsikoner som ikke bærer produktidentiteten, for eksempel tilbake, lukk, rediger og innstillinger.

---

## 6. Masterbokhyllen

Første bibliotekstil skal bygges rundt én godkjent tom masterbokhylle.

Masterbokhyllen skal være en realistisk illustrert eller renderet scene som fastsetter:

- treverk og materialfølelse
- sidevegger
- bakplate
- toppflate
- hyllenivåer
- dybde
- perspektiv
- lysretning
- skygger
- funksjonelle soner for interaktive objekter
- faste referansepunkter for plassering

Masterbokhyllen skal ikke inneholde dynamiske album, albumtitler eller mottatte brev.

Den skal være en tom scene der uavhengige objekter legges inn av appen.

Kamera, bilderamme, brevbunke, albumrygger og ny-album-objekt skal være separate lag over bokhyllen.

Foretrukket arkitektur er:

```text
Tom masterbokhylle som bakgrunn

+ kamera i definert posisjon
+ bilderamme i definert posisjon
+ brevbunke ved behov
+ dynamiske albumrygger i definerte boksoner
+ ekte albumtitler rendret av appen
```

Bokhyllen må kunne skaleres på ulike skjermstørrelser uten at objektene mister sin naturlige plassering.

Vi skal teste om dette best løses med:

1. én responsiv helillustrasjon med prosentbaserte ankerpunkter
2. en modulær scene med separate hylleelementer
3. en hybrid der bakgrunnen er illustrert og plasseringen styres av kode

Valget tas etter prototype på mobilbredde, nettbrett og web.

---

## 7. Perspektiv og komposisjon

Alle objekter som står i samme scene skal bruke samme perspektiv.

Første hovedretning er:

- frontvendt bokhylle
- naturlig, svak dybde
- lett innsyn ovenfra i løse objekter der dette er fysisk riktig
- stabil horisont
- ingen dramatisk vidvinkel

Kamera, bilderamme, brev og bøker skal kunne plasseres sammen uten at perspektivet avslører at de er generert hver for seg.

Før første komplette assetsett godkjennes, skal vi låse:

- bokhyllens synsvinkel
- kameraets synsvinkel
- bilderammens synsvinkel
- brevbunkens synsvinkel
- objektenes horisontlinje
- lyskildens retning
- referansestørrelser mellom objektene
- høyde og dybde for hvert hyllenivå

Senere assets skal følge det godkjente referansesystemet.

---

## 8. Lys og skygge

Standarduttrykket skal bruke mykt, varmt og troverdig lys.

Lyssettingen skal:

- gi tydelig og realistisk form
- skape naturlig dybde
- være konsistent mellom alle separate assets
- passe treverket og materialene
- unngå unaturlige høylys og svarte slagskygger

Skygger skal hjelpe objektene med å stå fysisk på hyllen.

Separate transparente objekter kan ha interne skygger og refleksjoner. Kontakt- og plasskygger kan følge asseten eller legges separat dersom det gir bedre responsiv skalering.

---

## 9. Materialer og realisme

Materialer skal være tydelig lesbare og troverdige.

Foretrukne materialer inkluderer:

- eik
- valnøtt
- malt tre
- papir
- kartong
- lær
- bokstoff
- glass
- metall der objektet naturlig krever det
- keramikk i eventuelle senere dekorobjekter

Materialene kan ha små bruksspor og naturlig variasjon, men skal ikke oppleves skitne, ødelagte eller overdrevent antikke.

Kameraet kan naturlig inneholde metall, glass, lær og mørke detaljer. Det skal ikke tones ned til et flatt ikon for å passe inn.

Realismen skal likevel være kontrollert slik at objektene tilhører samme scene og ikke ser ut som tilfeldige produktbilder fra forskjellige kilder.

---

## 10. Fargefilosofi

Grunnmiljøet skal bruke varme og dempede farger.

Farger skal i størst mulig grad komme fra:

- treverket
- albumryggene
- papir og stoff
- kameraet og andre fysiske objekter
- brukerens egne bilder og minner

Selve UI-et skal ikke konkurrere med minnene gjennom sterke fargeflater.

Albumrygger kan variere tydelig, men skal tilhøre en samlet palett.

Første bokpalett kan inneholde toner innenfor:

- skoggrønn
- dempet blå
- rust og terrakotta
- burgunder
- sennep
- krem
- brun
- grågrønn
- mørkt bokstoff

---

## 11. Albumrygger

Albumene skal vises som uavhengige fysiske bøker i bokhyllen.

Hver albumrygg skal:

- være en egen asset eller bygges fra et kontrollert assetsett
- tilhøre samme perspektiv og lyssetting som masterbokhyllen
- ha troverdig materiale og dybde
- kunne variere i høyde, bredde, farge og materiale
- støtte lesbar albumtittel
- beholde samme visuelle identitet for samme album
- fungere som en faktisk trykkbar inngang til albumet

Et album skal ikke få en ny tilfeldig bokrygg hver gang appen åpnes.

Albumets bokstil skal bestemmes stabilt, for eksempel ved:

- lagret `bookStyleId`
- deterministisk valg basert på album-ID
- brukerens eksplisitte valg senere

Første sett bør inneholde et begrenset antall gjennomarbeidede varianter:

- 8–12 grunnformer
- flere fargevarianter
- noen stoffrygger
- noen lær- eller papirrygger
- én tydelig, men diskret ny-album-bok

Albumtitler skal normalt rendres som ekte tekst av appen over bokryggen. De skal ikke genereres inn i selve bildet.

Dette gir:

- korrekt språk
- skarpere tekst
- tilgjengelighet
- støtte for brukerens egne titler
- mulighet for dynamisk skalering og avkorting

---

## 12. Kameraet

Kameraet er inngangen til et nytt minne tatt nå.

Det skal:

- se ut som et realistisk fysisk kamera
- stå naturlig på bokhyllen
- åpne telefonens kamera direkte ved trykk
- være tydelig uten en stor standardknapp
- ha et eget husk'et-uttrykk
- fungere visuelt og interaktivt i liten størrelse
- ha transparent bakgrunn dersom det brukes som separat lag

Kameraet skal ikke ligne et bestemt varemerkebeskyttet produkt så tett at det oppleves som en kopi.

Det skal være et realistisk, generisk og gjenkjennelig kameraobjekt utviklet spesielt for husk'et.

---

## 13. Bilderammen

Bilderammen er inngangen til eksisterende minner.

Den skal:

- se ut som en realistisk fysisk bilderamme
- stå naturlig ved siden av kameraet
- åpne telefonens kamerarull direkte ved trykk
- senere kunne representere flere importkilder uten å endre hovedmetaforen
- ha transparent bakgrunn dersom den brukes som separat lag
- inneholde et rolig motiv som ikke forveksles med brukerens eget innhold

Før vi bruker et personlig bilde i rammen, skal personvern, tomtilstand og fallback være definert.

Første versjon kan bruke et nøytralt motiv laget spesielt for husk'et.

---

## 14. Brevbunken

Brevbunken representerer mottatte husk'et.

Den skal:

- se ut som en realistisk bunke fysisk post
- være helt skjult når innboksen er tom
- dukke opp som et naturlig objekt når mottatte husk'et finnes
- åpne innboksen ved trykk
- ikke bruke rødt badge eller aggressiv varslingsgrafikk
- kunne variere diskret ved nye mottatte minner uten å bli en tellerbasert oppmerksomhetsmekanisme
- ha transparent bakgrunn dersom den brukes som separat lag

Brevbunken skal føles som at det ligger post til brukeren, ikke som et varslingssenter.

---

## 15. Dekorative objekter

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

## 16. Temasystem

Et bibliotekstema skal kunne bytte atmosfære uten å endre produktstruktur.

Et tema kan eksempelvis inneholde:

```text
assets/library/themes/<theme-id>/
├── bookshelf/
│   ├── background.webp
│   └── metadata.ts
├── objects/
│   ├── camera.webp
│   ├── picture-frame.webp
│   ├── letter-stack.webp
│   └── new-album-book.webp
└── books/
    ├── book-01.webp
    ├── book-02.webp
    └── ...
```

Filendelsene er kun eksempler. Den endelige mappestrukturen og filformatene fastsettes når første assetsett integreres.

Tema kan endre:

- treverk
- farger
- teksturer
- materialfølelse
- lys
- atmosfære
- bokpalett
- utforming av fysiske objekter innenfor samme funksjon

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

## 17. Assetkrav

Alle genererte assets skal vurderes mot disse kravene:

- riktig perspektiv
- konsistent lysretning
- realistisk og sammenhengende materialgjengivelse
- transparent bakgrunn når objektet skal legges over scenen
- tilstrekkelig oppløsning for moderne mobilskjermer
- tydelig silhuett i faktisk visningsstørrelse
- ingen innebygd tekst som må lokaliseres
- ingen tilfeldige logoer eller varemerker
- ingen uønskede genereringsartefakter
- ingen bakgrunnspiksler rundt transparente kanter
- konsistent fargeprofil
- kontrollert filstørrelse
- akseptabel lastetid og minnebruk
- fungerende skalering på Android og iOS

Originale høyoppløselige arbeidsfiler kan beholdes utenfor runtime-mappen.

Appen skal bruke optimaliserte eksportfiler.

Ingen fontfiler skal distribueres som en del av assetarbeidet uten en egen og kontrollert lisensbeslutning.

---

## 18. Genereringsprosess

AI-generering skal brukes som en kontrollert produksjonsprosess, ikke som tilfeldig bildeleting.

For hver assetfamilie skal vi:

1. fastsette stil, perspektiv, lys og proporsjoner
2. bruke masterbokhyllen som visuell referanse
3. generere et begrenset antall kandidater
4. velge én visuell retning
5. korrigere åpenbare skivebommer
6. generere relaterte elementer med samme referanser
7. kontrollere elementene samlet i faktisk appscene
8. kontrollere funksjon i faktisk trykkstørrelse
9. optimalisere og navngi filene
10. dokumentere godkjent variant, format og bruksområde

Nye objekter skal genereres mot den eksisterende stilguiden og det godkjente referansesettet.

De skal ikke starte en ny stilretning hver gang.

---

## 19. Ansvar og godkjenning

ChatGPT har ansvar for å:

- forvalte og videreutvikle stilguiden
- foreslå konsistente visuelle løsninger
- generere app-spesifikke assets
- velge egnet filformat basert på kvalitet og funksjon
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

## 20. Låste regler

Følgende regler er låst før første komplette assetsett genereres:

- masterbokhyllen skal være en tom, realistisk scene
- dynamiske og interaktive objekter skal ligge i separate lag over bakgrunnen
- kamera, bilderamme og brevbunke skal se ut som realistiske fysiske objekter
- albumene skal være uavhengige bokrygger som plasseres dynamisk
- hvert fysisk objekt skal fungere som det grensesnittelementet det representerer
- kode styrer oppførsel; assets styrer identitet
- kvalitet og funksjon avgjør filformatet
- SVG er tillatt, men ikke obligatorisk
- alle sentrale assets skal utvikles spesielt for husk'et
- samme album skal beholde samme bokstil
- brukerens albumtitler legges som ekte tekst, ikke som generert bildetekst
- tema endrer atmosfære, ikke struktur
- brevbunken er skjult når innboksen er tom
- tom plass er tillatt og ønsket
- ingen nye identitetsbærende assets tas inn uten å følge stilguiden

---

## 21. Neste visuelle milepæl

Før videre polering av den kodede bokhyllen skal vi:

1. bruke den godkjente konseptretningen som visuell målestokk
2. generere og velge en tom masterbokhylle
3. dokumentere masterbokhyllens perspektiv, lys og ankerpunkter
4. generere et realistisk kamera som separat transparent asset
5. generere en realistisk bilderamme som separat transparent asset
6. reservere plass og perspektiv for fremtidig brevbunke
7. generere et lite første sett med realistiske albumrygger
8. teste alle elementene samlet i Sprint 2A-scenen
9. optimalisere formatene etter faktisk kvalitet og ytelse

Første mål er ikke et stort temabibliotek.

Første mål er ett konsistent, realistisk, app-spesifikt og produksjonsklart biblioteksett.