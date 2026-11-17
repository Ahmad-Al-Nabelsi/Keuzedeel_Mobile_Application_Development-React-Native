# Retrospective Sprint 1

## Behaald resultaat

De basis van ReisLog is klaar. De gebruiker kan plekken toevoegen, bekijken, bewerken en verwijderen. De app toont de plekken per land en stad. De gegevens worden lokaal opgeslagen met SQLite.

## Wat ging goed?

- Het project is in kleine stappen opgebouwd.
- Voor elk onderdeel is een aparte branch gebruikt.
- De wijzigingen zijn via pull requests samengevoegd met main.
- De schermen voor landen, steden en plekken zijn met elkaar verbonden.

## Welke problemen waren er?

### Een codeblok stond op de verkeerde plaats

In edit.tsx stond hetzelfde codeblok twee keer. Eén blok stond op de verkeerde plaats. Hierdoor kon de app niet starten. Na het verwijderen van het dubbele blok werkte de app weer.

### Opdrachten werden vanuit de verkeerde map uitgevoerd

Sommige opdrachten zijn vanuit de hoofdmap van het project uitgevoerd. Daar staat geen package.json van de app. De opdrachten moesten vanuit de map ReisLog worden uitgevoerd.

## Wat heb ik geleerd?

Ik heb geleerd hoe ik schermen met Expo Router verbind en gegevens met SQLite opsla.

Bij het aanpassen van code moet ik goed letten op de plaats van codeblokken en de map waarin ik werk.

## Wat kan beter?

Ik wil wijzigingen klein houden en foutmeldingen goed lezen. Zo kan ik de oorzaak van een probleem sneller vinden en oplossen.

## Volgende sprint

In Sprint 2 voeg ik foto's, locatie, beoordelingen en favorieten toe. Ook komen er functies om plekken te zoeken, filteren en sorteren.

## Testen aan het einde van het project

In de laatste fase van het project voer ik handmatige en automatische tests uit. Na een oplossing controleer ik opnieuw of de functie goed werkt.

De testmethodes, stappen, verwachte resultaten en echte resultaten komen in een apart bestand: Testplan. Dit bestand wordt los van de RETRO ingeleverd.
