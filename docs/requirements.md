# Prasības

## Projekta mērķis
Izveidot vienkāršu backend sistēmu lietotāju pārvaldībai un ziņu apmaiņai ar autentifikācijas (login) plūsmu un administrēšanas iespējām.

## Galvenās funkcijas
- Lietotāju reģistrācija ar e-pastu un paroli.
- Login sistēma (pieteikšanās/izrakstīšanās).
- Ziņu pievienošana un ziņu saraksta skatīšana.
- Lietotāju saraksta pārvaldība ar administratora tiesībām.
- Kļūdu apstrāde un API veselības pārbaude.

## Lietotāja stāsti
- Kā lietotājs es vēlos reģistrēties ar e-pastu un paroli, lai varētu izmantot sistēmu.
- Kā lietotājs es vēlos pieteikties sistēmā, lai piekļūtu saviem datiem un funkcijām.
- Kā lietotājs es vēlos izrakstīties no sistēmas, lai droši beigtu darbu koplietotā ierīcē.
- Kā lietotājs es vēlos pievienot ziņu, lai varētu dalīties ar informāciju.
- Kā lietotājs es vēlos redzēt ziņu sarakstu, lai sekotu aktuālajai informācijai.
- Kā administrators es vēlos redzēt lietotāju sarakstu, lai varētu uzraudzīt sistēmas lietošanu.
- Kā administrators es vēlos pārvaldīt lietotājus (piemēram, bloķēt/noņemt), lai uzturētu drošu vidi.

## Aktori
- Lietotājs
- Administrators

## Use case saraksts
- Reģistrēties
- Pieteikties sistēmā
- Izrakstīties
- Pievienot ziņu
- Skatīt ziņas
- Skatīt lietotāju sarakstu (administrators)
- Pārvaldīt lietotājus (administrators)
- Pārbaudīt sistēmas pieejamību (health)

## Piezīme par pašreizējo realizāciju
Pašreizējā koda bāzē jau ir realizēts:
- Lietotāju reģistrācijas endpoints.
- Lietotāju saraksta iegūšana.
- Health pārbaude.

Ziņu pievienošana un pilna login sistēma ir prasību daļa nākamajiem ieviešanas soļiem.
