# husk'et v2 – album, minner og delingskort

## Formål

Dette dokumentet presiserer forholdet mellom album, minner, bilder, tekst og delingskort i husk'et v2.

---

## Albumet

Albumet er den permanente og primære opplevelsen i appen.

Et album skal:

- gi følelsen av et klassisk fotoalbum
- være enkelt og oversiktlig å navigere i
- inneholde mange separate minner
- ha egen tittel
- kunne ha egen beskrivende tekst eller introduksjon
- senere kunne støtte egne tekstblokker eller tekstsider mellom minner

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

## Kort brukes til deling

Kortene fra husk'et v1 videreføres, men får en ny og avgrenset rolle.

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

---

## Mottak og arkivering

Når mottakeren åpner et delt husk'et, vises minnet som et kort.

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

Dette gjør at nye kortdesign kan utvikles uten å påvirke albumet eller minnemodellen.

---

## Grunnregel

> Albumet bevarer minnet. Kortet presenterer minnet når det deles.
