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
- `Memory` – bilde og tilhørende personlig kontekst
- `SharePresentation` – valgt kortdesign og layout
- `SharedMemory` – den konkrete delingshendelsen

Dette gjør at nye kortdesign og delingsfunksjoner kan utvikles uten å påvirke albumet eller minnemodellen.

---

## Grunnregler

> Albumet bevarer minnet. Kortet presenterer minnet når det deles.

> husk'et skal hjelpe brukeren både med å ta vare på minner og med å gi minner videre til mennesker som betyr noe.