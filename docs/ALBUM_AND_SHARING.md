# husk'et v2 – album, minner og delingskort

## Formål

Dette dokumentet presiserer forholdet mellom album, minner, bilder, tekst, deling og delingskort i husk'et v2.

husk'et har to likeverdige hovedmål:

1. hjelpe brukeren med å ta vare på egne minner
2. gjøre det enkelt å dele utvalgte minner med nære venner og familie

Albumopplevelsen bygges først fordi den er fundamentet for produktet. Deling er ikke mindre viktig, men skal bygges oppå en stabil og meningsfull minnemodell.

husk'et skal være et privat og rolig alternativ til den delen av Snapchat som handler om direkte deling mellom mennesker. Appen skal ikke utvikles til en feed, et sosialt nettverk eller en oppmerksomhetsplattform.

---

## Albumet

Albumet er produktets fundament og den permanente opplevelsen i appen.

Brukerens minner er opplevelsens hjerte.

Et album skal:

- gi følelsen av et klassisk fotoalbum
- være enkelt og oversiktlig å navigere i
- inneholde mange separate minner
- ha egen tittel
- kunne ha egen beskrivende tekst eller introduksjon
- senere kunne støtte egne tekstblokker eller tekstsider mellom minner
- presenteres som oppslag fremfor en endeløs strøm
- gi bilder nok plass og ro

Albumet skal ikke oppleves som:

- et vanlig galleri
- et Masonry-rutenett
- en Instagram-feed
- en teknisk database eller filbehandler

Albumtekst tilhører albumet som helhet og følger ikke automatisk med når et enkelt minne deles.

---

## Oppslag og sidemaler

Et album presenteres som oppslag med tydelige venstre- og høyresider. Oppslagene skal gi følelsen av et fysisk fotoalbum, men bruke digitale fordeler som stabil navigasjon, fleksibel layout og enkel redigering.

Første versjon skal bruke et begrenset sett med faste sidemaler. Aktuelle grunnmaler er:

- ett stort bilde
- to bilder
- ett stort bilde kombinert med to mindre bilder

Brukeren velger selv hvilken sidemal den enkelte siden skal bruke.

Når en sidemal er valgt:

- lagres valget som en del av siden
- brukes samme layout hver gang siden åpnes
- kan brukeren endre sidemalen senere
- skal bilder og metadata ikke gå tapt når malen endres

Hvis en ny sidemal har færre bildefelt enn siden allerede inneholder, skal overskytende minner aldri slettes. De skal flyttes videre på en trygg og forståelig måte, eller plasseres i en tydelig liste over minner som ennå ikke er plassert på en side.

Fri dra-og-slipp-plassering er ikke et krav i første versjon. Faste og gjennomarbeidede sidemaler prioriteres for å sikre stabilitet, enkelhet og et helhetlig visuelt uttrykk.

---

## Minnet

Et minne er en arkivert del av et album.

I første versjon består et minne normalt av:

- ett bilde
- en kort, valgfri kommentar
- en valgfri emoji som uttrykker følelsen eller stemningen i øyeblikket
- opprinnelig dato når denne er kjent
- sted når dette er tilgjengelig og brukeren tillater det

Kommentaren er en del av minnet på lik linje med bildet. Den skal følge minnet når det deles eller legges til i et annet album.

Albumet kan inneholde mange minner fra samme hendelse eller periode. Hvert bilde kan derfor ha sin egen kommentar og følelse, selv om albumet også har en overordnet tekst.

---

## Presentasjon av bilde og metadata

Hvert bildefelt i en sidemal skal ha designerte områder for bilde og tilhørende metadata.

Metadata kan omfatte:

- kommentar
- dato
- følelsesemoji
- GPS- eller stedsindikator

Metadata skal presenteres rolig og diskret, og skal aldri brennes inn i originalbildet.

Følgende regler gjelder:

- GPS-ikon vises bare når stedsdata finnes
- emoji vises bare når brukeren har valgt en emoji
- kommentarfelt skjules eller kollapser når kommentaren er tom
- dato vises som standard når den er kjent
- tomme metadatafelt skal ikke etterlate unødvendig visuell plass

Et GPS-ikon kan senere åpne kart eller stedsinformasjon, men selve albumvisningen skal være rolig og ikke fylles med tekniske detaljer.

---

## Visning, redigering og handlinger

Trykk på selve bildet skal åpne bildet i fullskjerm.

Redigering skal ikke lenger være skjult bak trykk på bildet. Siden skal ha et eget, tydelig ikon eller en egen knapp for redigering av minnet og dets metadata.

Grunnregelen er:

- trykk på bildet åpner fullskjermvisning
- redigeringsikon åpner redigering av minnet
- layoutikon åpner valg eller endring av sidemal
- eksportikon åpner eksportvalg

Fullskjermvisningen skal vise bildet uten påbrent kommentar, dato, emoji eller GPS-ikon.

---

## Originalbilder og visningsfiler

Bildet tilhører brukeren. husk'et skal legge mening og organisering rundt bildet, men skal aldri låse originalfilen inne eller forringe den.

Den tekniske modellen skal skille mellom:

- originalfil
- forhåndsvisning
- miniatyrbilde
- visningsdata som beskjæring, zoom og rotasjon

Originalfilen skal:

- lagres separat fra optimaliserte visningsfiler
- ikke komprimeres eller nedskaleres unødvendig
- ikke overskrives av albumets beskjæring eller visuelle tilpasning
- ikke få husk'et-metadata brent inn i bildefilen
- kunne eksporteres senere i samme tilgjengelige kvalitet og størrelse som ved import eller fotografering

Forhåndsvisning og miniatyrbilder kan optimaliseres for rask visning i bokhylle, album og oppslag. Disse filene skal aldri brukes som erstatning for originalen ved eksport.

---

## Import fra kamerarullen

Import skal alltid opprette en egen, stabil kopi av originalbildet i husk'ets lokale lagringsområde.

husk'et skal ikke være avhengig av en varig peker til bildet i kamerarullen. Etter fullført import skal brukeren kunne slette originalen fra kamerarullen uten at kopien i husk'et blir utilgjengelig.

Importflyten skal følge denne rekkefølgen:

1. brukeren velger ett eller flere bilder
2. husk'et kopierer originalfilene til eget lagringsområde
3. hver kopi kontrolleres før importen regnes som vellykket
4. stabile filreferanser lagres
5. forhåndsvisninger og miniatyrbilder genereres separat
6. minnet opprettes først når originalfilen er trygt lagret

Ved masseimport skal appen kunne vise status per fil og en tydelig oppsummering av vellykkede og mislykkede importer.

---

## Valgfri sletting etter import

I kopieringsdialogen skal brukeren kunne velge:

- `Slett originalene fra kamerarullen etter vellykket kopiering`

Dette valget skal følge disse låste reglene:

- avhukingsboksen er alltid av som standard
- valget lagres aldri som en brukerpreferanse
- hver nye importdialog starter med avhukingsboksen avslått
- brukeren må gjøre et bevisst valg for hver enkelt import
- sletting kan bare forespørres for filer som er bekreftet trygt kopiert
- mislykkede eller uverifiserte importer skal aldri inngå i slettingen
- systemets egen godkjenningsdialog for sletting skal alltid brukes når plattformen krever det
- hvis brukeren avviser slettingen, er importen fortsatt fullført og originalene blir liggende i kamerarullen

Følgende forklaring skal bare vises når brukeren har huket av for sletting:

> Dette valget gjelder bare denne importen. Du må godkjenne slettingen etter at kopieringen er fullført.

Ved delvis vellykket import skal appen bare tilby sletting av de originalfilene som faktisk ble kopiert og kontrollert.

Formålet med funksjonen er å la appen identifisere og slette nøyaktig de filene som ble importert, slik at brukeren slipper å finne igjen og sammenligne bilder manuelt i kamerarullen.

---

## Bilder tatt direkte i husk'et

Bilder som tas direkte i husk'et skal lagres som originalfiler i husk'ets eget arkiv.

De trenger ikke automatisk å kopieres til telefonens kamerarull.

Kameraflyten skal:

- bruke høyest tilgjengelige kvalitet uten reduksjon fra husk'et
- lagre en stabil originalfil før minnet opprettes
- generere separate forhåndsvisninger og miniatyrbilder
- gjøre originalfilen tilgjengelig for eksport og deling
- senere kunne tilby et eksplisitt valg om å lagre bildet i kamerarullen

husk'et skal ikke love at tredjepartskameraet alltid gir identisk behandling som telefonprodusentens native kamera-app, men appen skal aldri selv redusere kvalitet, oppløsning eller størrelse unødvendig.

---

## Eksport

Brukeren skal alltid kunne eksportere originalbildet uten husk'et-metadata eller visuell albumbehandling.

Eksport av original skal:

- bruke den lagrede originalfilen
- beholde full tilgjengelig oppløsning og kvalitet
- ikke bruke skjermbilde av albumvisningen
- ikke bruke albumets beskjæring
- ikke brenne inn kommentar, dato, emoji eller GPS-ikon
- beholde original filtype når plattformen og filtilgangen gjør dette mulig

Dette skal gjøre det mulig å bruke bilder fra husk'et til blant annet:

- fysisk fotobok
- utskrift
- videre bildebehandling
- sikkerhetskopi
- deling uten husk'et-design

Senere kan eksportvalget også tilby en egen ferdig husk'et-presentasjon med bilde og metadata. Denne presentasjonen skal være et tillegg og aldri erstatte eksport av originalfilen.

Eksport av originalbildet skal ikke ligge bak abonnement eller andre begrensninger.

---

## Lokal lagring og sikkerhetskopi

husk'et bygges offline først. Originalbilder og album skal kunne brukes uten nett.

Lokal lagring på enheten er ikke det samme som sikkerhetskopi. Appen skal derfor senere kunne vise tydelig om et bilde eller arkiv:

- bare er lagret på denne enheten
- er sikkerhetskopiert
- venter på sikkerhetskopiering
- ikke kunne sikkerhetskopieres

Backup og synkronisering er en separat trygghetstjeneste og skal ikke være en forutsetning for å åpne brukerens egne bilder lokalt.

---

## To tekstnivåer

husk'et v2 skal støtte to tydelig adskilte tekstnivåer:

### Tekst på minnenivå

- kort kommentar knyttet til det enkelte bildet
- beskriver øyeblikket, situasjonen eller følelsen
- følger minnet ved deling

### Tekst på albumnivå

- tittel og beskrivende tekst for albumet som helhet
- kan introdusere en reise, periode, familiehistorie eller hendelse
- følger albumet, ikke det enkelte minnet

Senere kan albumet utvides med egne tekstblokker eller tekstsider uten bilde.

---

## Deling er et hovedmål

Deling er en sentral del av husk'et og et av produktets to hovedformål.

Målet er at brukeren skal kunne bruke husk'et både til å bevare egne minner og til å dele utvalgte minner med nære venner og familie.

Deling skal være:

- direkte
- privat
- personlig
- fri for algoritmer
- fri for stories og offentlig eksponering
- fri for chat og forventning om kontinuerlig aktivitet

Et delt minne er ikke en melding som forsvinner inn i en samtale. Det er et minne mottakeren kan oppleve, reagere på og frivillig legge til i sitt eget album.

Mottakeren skal aldri få et delt minne automatisk lagret i sitt personlige album.

---

## Kort brukes til deling

Kortene fra husk'et v1 videreføres, men får en tydelig og avgrenset rolle.

Kort skal ikke være hovedvisningen i albumet og skal ikke brukes som albumets permanente lagringsformat.

Et husk'et-kort brukes kun som presentasjon når et minne deles.

Delingskortet kan inneholde:

- valgt kortbakgrunn
- bilde
- kort kommentar
- følelsesemoji
- diskret dato og sted
- avsender

Kortbakgrunn, layout og andre visuelle valg tilhører delingspresentasjonen. De skal ikke endre selve minnet i albumet.

Det skal ikke være noe visuelt eller funksjonelt skille mellom et minne som deles rett etter at bildet er tatt og et eldre minne som deles fra et album.

---

## Mottak, reaksjon og arkivering

Når mottakeren åpner et delt husk'et, vises minnet som et kort.

Mottakeren skal kunne:

- se minnet
- reagere med en emoji
- velge å legge minnet til i sitt eget album
- la minnet bli liggende uten å arkivere det

En emoji-reaksjon skal ikke starte en chat. Senderen får kun et enkelt varsel, for eksempel «Nellie likte din husk'et».

Når mottakeren velger å legge minnet til i sitt album, arkiveres selve minnet:

- bildet
- kommentaren
- følelsesemojien
- dato og sted
- eventuell diskret informasjon om hvem som delte det

Delingskortets bakgrunn og layout skal normalt ikke lagres som en del av albumminnet.

---

## Teknisk skille

Den tekniske modellen skal skille mellom:

- `Album` – permanent organisering og albumopplevelse
- `AlbumPage` – valgt sidemal, rekkefølge og plassering av minner
- `Memory` – bilde og tilhørende personlig kontekst
- `MediaAsset` – originalfil, forhåndsvisning, miniatyr og filstatus
- `SharePresentation` – valgt kortdesign og layout
- `SharedMemory` – den konkrete delingshendelsen

Visuell beskjæring, zoom og rotasjon tilhører albumplasseringen eller visningslaget og skal ikke endre `MediaAsset` sin originalfil.

Dette gjør at nye sidemaler, kortdesign og delingsfunksjoner kan utvikles uten å påvirke originalbildet eller den grunnleggende minnemodellen.

---

## Grunnregler

> Albumet bevarer minnet. Kortet presenterer minnet når det deles.

> Bildet tilhører brukeren. husk'et organiserer og beriker det, men skal aldri redusere, låse eller erstatte originalen.

> Import betyr at originalen kopieres trygt til husk'et. Sletting fra kamerarullen skjer bare etter et nytt, bevisst valg fra brukeren.

> husk'et skal hjelpe brukeren både med å ta vare på minner og med å gi minner videre til mennesker som betyr noe.
