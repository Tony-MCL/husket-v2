# husk'et v2 – varsler og tilbakeblikk

## Formål

Dette dokumentet fastsetter hvordan husk'et skal bruke push-varsler og tilbakeblikk.

Varsler skal gi verdi når noe faktisk har skjedd eller når et minne er relevant akkurat nå. De skal aldri brukes for å skape kunstig aktivitet.

> husk'et skal hjelpe mennesker med å ta vare på og dele minner – aldri konkurrere om oppmerksomheten deres.

---

## 1. Tillatte varsler i v1

Følgende varseltyper er tillatt:

### Mottatt husk'et

Når noen deler et husk'et med brukeren, kan mottakeren få et push-varsel.

Eksempel:

> Nellie sendte deg et husk'et.

### Emoji-reaksjon

Når mottakeren reagerer på et delt husk'et med en emoji, får den opprinnelige senderen et enkelt push-varsel.

Eksempel:

> Nellie likte din husk'et.

Reaksjonen skal ikke starte en chat, en tråd eller en videre samtaleflyt i appen.

### Tilbakeblikk

Tilbakeblikk kan gi push-varsel eller vises i appen dersom brukeren selv har aktivert funksjonen i innstillingene.

Når tilbakeblikk er aktivert, skal appen vise relevante tilbakeblikk uten å spørre brukeren på nytt.

---

## 2. Varsler som ikke skal brukes

husk'et skal ikke sende:

- «kom tilbake»-varsler
- varsler om at appen ikke er åpnet på en stund
- streak-varsler
- engasjementsvarsler
- daglige belønninger
- algoritmestyrte forslag
- tilfeldig utvalgte tilbakeblikk
- varsler som bare har som mål å øke skjermtid eller åpninger

Et varsel skal alltid ha en tydelig og forståelig årsak.

---

## 3. Tilbakeblikk skal være datoankret

Tilbakeblikk skal knyttes til en meningsfull tidsmessig sammenheng.

Det betyr at v1 kan vise minner fra:

- samme dato én måned tidligere
- samme dato tre måneder tidligere
- samme dato seks måneder tidligere
- samme dato ett eller flere år tidligere

Tilbakeblikk skal ikke hente et tilfeldig juleminne om sommeren eller et tilfeldig sommerminne om vinteren bare for å ha noe å vise.

> Ingen tilbakeblikk er bedre enn et meningsløst tilbakeblikk.

---

## 4. Oppstartslogikk før biblioteket er ett år gammelt

«På denne dagen» fungerer best etter at brukeren har hatt appen i minst ett år.

For å gi funksjonen verdi tidligere kan husk'et bruke en enkel oppstartslogikk:

1. se etter minner fra samme dato tidligere år
2. hvis ingen finnes, se etter samme dato seks måneder tidligere
3. hvis ingen finnes, se etter samme dato tre måneder tidligere
4. hvis ingen finnes, se etter samme dato én måned tidligere
5. hvis ingen relevante minner finnes, vises ikke noe tilbakeblikk

Dette er ikke tilfeldig utvalg. Alle alternativene er tydelig datoankret.

Når biblioteket har ett eller flere års historikk, skal «På denne dagen» ha prioritet.

---

## 5. Innstillinger

Brukeren skal kunne velge om tilbakeblikk skal være aktivert.

V1 skal gjøre klart for separate varselvalg for:

- mottatte husk'et
- emoji-reaksjoner
- tilbakeblikk

Tilbakeblikk skal være frivillig og kunne slås av når som helst.

Mottatte husk'et og emoji-reaksjoner er knyttet til reelle sosiale hendelser. Den endelige standardinnstillingen for disse fastsettes når push-infrastrukturen bygges.

---

## 6. Produktregel

Et husk'et deles fordi det betyr noe, ikke fordi appen ønsker aktivitet.

Et tilbakeblikk vises fordi datoen gjør minnet relevant, ikke fordi appen trenger innhold å fylle skjermen med.