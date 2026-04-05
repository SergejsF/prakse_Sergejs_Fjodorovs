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

## Piezīme par pašreizējo realizāciju (v0.1)

### Šobrīd realizēts
- `POST /users` lietotāju reģistrācija ar e-pasta validāciju un paroles hešošanu (`bcrypt`, 10 salt rounds).
- `GET /users` lietotāju saraksts ar lapošanu (`page`, `limit`) un e-pasta filtru.
- `GET /health` sistēmas pieejamības pārbaude.
- Centralizēta kļūdu apstrāde (`EMAIL_EXISTS` konfliktam un iekšējām kļūdām).

### Nākamie ieviešanas soļi
- Login sistēma (pieteikšanās/izrakstīšanās).
- Ziņu sistēma (pievienošana un saraksta skatīšana).
- Administratora funkcijas lietotāju pārvaldībai.

Tādējādi dokumentā aprakstītais funkcionalitātes apjoms ir mērķa stāvoklis, savukārt iepriekš minētais v0.1 norāda to, kas jau darbojas pašreizējā kodā.
