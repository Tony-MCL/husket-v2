# husk'et v2 – bibliotekets vekst og bokhyllenavigasjon

## Dokumentstatus

Dette dokumentet fastsetter hvordan husk'ets personlige bibliotek skal vokse når brukeren får flere album enn det er plass til i én bokhylle.

Beslutningen er en del av produktarkitekturen og skal brukes som grunnlag for Sprint 2A, bokplassering, navigasjon og senere albumorganisering.

---

## 1. Grunnprinsipp

Biblioteket består av én eller flere bokhyller.

Brukeren starter med én bokhylle. Nye bokhyller opprettes automatisk først når det er behov for dem.

> Biblioteket skal vokse sammen med brukerens liv, én bokhylle om gangen.

Løsningen skal oppleves som at biblioteket utvides naturlig, ikke som at appen oppretter tekniske sider eller mapper.

---

## 2. Når en ny bokhylle opprettes

Masterbokhyllen definerer et fast antall bokplasser.

Når alle tilgjengelige bokplasser i gjeldende bokhylle er fylt, opprettes neste bokhylle automatisk.

Regler:

- én bokhylle vises så lenge alle albumene får plass der
- neste bokhylle opprettes først når den forrige er full
- tomme fremtidige bokhyller skal aldri vises
- en bokhylle som ikke lenger trengs etter sletting eller flytting av album, skal håndteres uten å etterlate en unødvendig tom sluttseksjon
- ny-album-objektet skal alltid finnes på siste tilgjengelige bokhylle når opprettelse av album er mulig

Brukeren skal ikke møte en dialog om å opprette en ny bokhylle. Dette skjer som en naturlig konsekvens av at biblioteket vokser.

---

## 3. Navigasjon mellom bokhyller

Navigasjon mellom bokhyller skjer primært med horisontal sveiping.

```text
Bokhylle ← sveip → Bokhylle ← sveip → Bokhylle
```

Navigasjonen skal:

- føles som å bevege seg videre til neste bokhylle i samme bibliotek
- bruke rolig og kontrollert sideveis overgang
- stoppe tydelig ved hver bokhylle
- fungere på Android og iOS
- ha et tilgjengelig alternativ til sveiping
- bevare brukerens plass når et album åpnes og lukkes

Brukeren skal normalt ikke møte tekniske betegnelser som:

- «Side 1 av 4»
- «Bokhylle 2»
- sidetall
- pagineringsspråk

En svært diskret visuell antydning om at flere bokhyller finnes kan vurderes dersom testing viser at brukerne ellers ikke oppdager sveipingen. Den skal ikke dominere scenen eller bryte bibliotekmetaforen.

---

## 4. Masterbokhyllen

Alle bokhyller i samme bibliotekstil bruker samme masterbokhylle, perspektiv, lys, proporsjoner og funksjonelle soner.

Masterbokhyllen definerer:

- plassering av hyllenivåer
- hvilke hyller som kan inneholde album
- boksonenes høyde og bredde
- maksimalt antall album per bokhylle
- plassering av kamera, bilderamme og brevbunke
- plassering av ny-album-objektet
- prosentbaserte eller andre responsive ankerpunkter

Det dynamiske innholdet legges over den tomme masterbokhyllen som separate lag.

```text
Tom masterbokhylle

+ interaktive objekter
+ albumrygger
+ ekte albumtitler
+ ny-album-objekt
```

---

## 5. Første og senere bokhyller

Den første bokhyllen er bibliotekets hovedinngang.

Kamera, bilderamme og brevbunke skal som hovedregel stå på første bokhylle. Senere bokhyller skal primært brukes til album og ny-album-objekt.

Dette gir:

- én stabil plass for opprettelse og import av minner
- mindre visuell gjentakelse
- større albumkapasitet på senere bokhyller
- en tydelig følelse av at første bokhylle er inngangen til biblioteket

Dersom brukertesting senere viser at kamera eller import også må være tilgjengelig på andre bokhyller, skal dette løses uten å duplisere alle fysiske objekter på hver scene.

---

## 6. Fordeling av album

Album fordeles sekvensielt mellom bokhyllene etter en stabil rekkefølge.

Første versjon kan bruke albumenes eksisterende sortering. Senere kan brukeren få mulighet til å flytte bøker og velge rekkefølge manuelt.

Regler:

- samme album beholder samme `bookStyleId`
- samme album skal ikke hoppe tilfeldig mellom plasser ved oppstart
- flytting eller sletting skal gi forutsigbar omfordeling
- åpning av et album skal lagre hvilken bokhylle og bokplass brukeren kom fra
- retur fra albumet skal føre brukeren tilbake til samme bokhylle

Ingen algoritme skal omorganisere biblioteket basert på engasjement, åpninger eller popularitet.

---

## 7. Bokkapasitet

Endelig kapasitet per bokhylle fastsettes etter at masterbokhyllen og de første albumryggene er testet i faktisk mobilstørrelse.

Kapasiteten skal bestemmes av:

- lesbare albumtitler
- naturlig variasjon i bokbredde
- tilstrekkelige trykkflater
- visuell ro
- behov for tomrom mellom enkelte bøker
- ytelse og responsiv skalering

Målet er ikke å presse inn flest mulig album. Målet er at hver bokhylle skal føles troverdig, ryddig og behagelig å bruke.

---

## 8. Tomtilstand og vekst

En ny bruker ser bare den første bokhyllen.

Bokhyllen kan være nesten tom uten at appen fyller den med eksempelalbum eller dekor for å skjule tomrommet.

Etter hvert som brukeren oppretter album:

1. den første bokhyllen fylles gradvis
2. neste bokhylle opprettes når kapasiteten er brukt
3. sveiping blir tilgjengelig
4. biblioteket fortsetter å vokse etter samme modell

Veksten skal være stille og selvsagt. Ingen gratulasjonsdialog, streak eller engasjementsmekanisme skal knyttes til at en ny bokhylle opprettes.

---

## 9. Tilgjengelighet

Horisontal sveiping kan ikke være eneste navigasjonsmetode.

Det skal finnes et tilgjengelig alternativ, for eksempel:

- skjermleservennlige neste/forrige-handlinger
- diskrete trykksoner ved kantene
- tastaturnavigasjon på web
- programmatisk fokus på aktiv bokhylle

Hver bokhylle skal ha en forståelig tilgjengelighetsbeskrivelse uten at teknisk sidenummerering nødvendigvis vises visuelt.

---

## 10. Låste beslutninger

Følgende beslutninger er låst:

- biblioteket består av én eller flere bokhyller
- brukeren starter med én bokhylle
- nye bokhyller opprettes automatisk ved behov
- tomme fremtidige bokhyller vises ikke
- navigasjon mellom bokhyller skjer primært med horisontal sveiping
- bokhyller omtales og oppleves som bokhyller, ikke som sider
- normalvisningen bruker ikke synlig «1 av 4»-navigasjon
- alle bokhyller i samme tema bruker samme masterlayout
- dynamiske album er separate objekter over masterbokhyllen
- første bokhylle er bibliotekets hovedinngang
- brukerens posisjon skal bevares ved åpning og lukking av album
- bibliotekets rekkefølge skal ikke styres av en engasjementsalgoritme

---

## 11. Implementeringsrekkefølge

Denne modellen implementeres trinnvis:

1. fastsette masterbokhyllens boksoner
2. fastsette første realistiske bokkapasitet
3. lage datamodell for fordeling av album mellom bokhyller
4. bygge horisontal sveiping med snapping
5. bevare aktiv bokhylle ved navigasjon til og fra album
6. legge til tilgjengelige neste/forrige-handlinger
7. teste med tomt, delvis fylt og flerhylles bibliotek
8. teste på mobilbredde, nettbrett og web

Sideveis bokhyllenavigasjon skal ikke bygges som en uendelig feed. Hver bokhylle er en avgrenset, stabil scene.