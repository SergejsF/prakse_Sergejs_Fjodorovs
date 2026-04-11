# Testēšanas stratēģija

## 1. Testu veidi: atšķirības un piemēri

### Unit testi (vienību testi)
- Mērķis: pārbaudīt vienu izolētu vienību (funkciju/moduli).
- Ātrums: ļoti ātri.
- Atkarības: jāmocko ārējās atkarības (DB, bcrypt, HTTP).
- Piemēri šajā projektā:
  - `validateUser` atgriež kļūdu, ja e-pasts ir tukšs.
  - `validateUser` atgriež kļūdu, ja parole īsāka par 8 simboliem.
  - `registerUser` izsauc `bcrypt.hash(password, 10)` un nodod hešu modelim.
  - `errorHandler` pie `ER_DUP_ENTRY` atgriež 409 + `EMAIL_EXISTS`.

### Integration testi (integrācijas testi)
- Mērķis: pārbaudīt vairāku slāņu sadarbību (piem., route -> controller -> service -> model -> DB).
- Ātrums: vidējs.
- Atkarības: parasti izmanto test DB vai izolētu DB shēmu.
- Piemēri šajā projektā:
  - `POST /users` ar derīgiem datiem izveido ierakstu DB un atgriež `201` ar `id`.
  - Dublēts e-pasts DB līmenī izraisa `409 EMAIL_EXISTS`.
  - `GET /users?page=2&limit=5` atgriež korektu lapošanu.

### Funkcionālie testi (functional)
- Mērķis: pārbaudīt sistēmas funkciju no API lietotāja skatpunkta pret prasībām.
- Ātrums: vidējs vai lēnāks par unit/integration.
- Atkarības: var ietvert vairāk komponentes, bet fokusējas uz biznesa rezultātu.
- Piemēri šajā projektā:
  - Reģistrācija ar nederīgu e-pastu tiek noraidīta ar `400 VALIDATION_ERROR`.
  - Lietotāju saraksta filtrs pēc e-pasta daļas atgriež tikai atbilstošus lietotājus.
  - Health pārbaude atgriež `status=ok` un ISO timestamp.

### End-to-End testi (E2E)
- Mērķis: pārbaudīt pilnu plūsmu caur reālu vidi (HTTP + DB + konfigurācija) kā produkcijā.
- Ātrums: vislēnākie.
- Atkarības: nepieciešama palaista lietotne un DB.
- Piemēri šajā projektā:
  - Pilna plūsma: lietotāja reģistrācija -> lietotāju saraksta iegūšana ar filtru -> verifikācija, ka jaunais lietotājs redzams rezultātā.
  - Nākamajā etapā: login -> autorizēta piekļuve aizsargātam endpointam -> logout -> piekļuve liegta.

## 2. Testēšanas pieeja šim projektam

### Mērķis
Nodrošināt, ka API darbība atbilst dokumentētajām prasībām, kļūdas tiek apstrādātas paredzami un kritiskās plūsmas neplīst pēc izmaiņām.

### Rīki
- Jest: unit un integrācijas testu palaide, assertions, mocki, coverage atskaites.
- Supertest: HTTP endpoint testēšanai Node.js/Express lietotnei bez ārēja klienta.
- Postman: manuālajiem/eksploratīvajiem un regressijas API testiem, kā arī kolekcijas dokumentēšanai (`docs/postman_collection.json`).

### Testu līmeņi un apjoms
- Unit testi:
  - `src/validators/users.js`
  - `src/services/users.js`
  - `src/middlewares/errorHandler.js`
- Integrācijas testi:
  - `POST /users`
  - `GET /users`
  - `GET /health`
  - Kļūdu scenāriji ar DB (piem., duplicate email)
- Funkcionālie/E2E testi:
  - Galvenās biznesa plūsmas no `docs/requirements.md`
  - Kritiskie negatīvie scenāriji (nederīga ievade, konflikti, 5xx fallback)

### Testu izpildes biežums
- Unit testi: katrā pull request.
- Integrācijas testi: katrā pull request.
- Funkcionālie/E2E testi: pirms release un pēc būtiskām API izmaiņām.
- Postman regresija: pirms demo/release un pēc izmaiņām maršrutos/validācijā.

### Pārklājuma (coverage) mērķi
- Globālais minimālais mērķis: 80% (lines/statements).
- Kritiskajiem moduļiem (`validators`, `services`, `controllers`, `middlewares`): 90%.
- Kritiskajiem endpointiem (`POST /users`, `GET /users`, `GET /health`): obligāti pozitīvie un negatīvie scenāriji.

### Izejas kritēriji (Definition of Done testēšanai)
- Visi unit un integrācijas testi ir zaļi.
- Nav neapstrādātu kritisku kļūdu (`P1/P2`) testu rezultātos.
- Coverage nav zem mērķa.
- Postman kolekcija atjaunota, ja mainīts API kontrakts.

## 3. Testu plāns

| ID | Funkcija | Testa gadījums | Testa veids | Sagaidāmais rezultāts | Atbildīgā persona |
|---|---|---|---|---|---|
| TC-001 | Veselības pārbaude (`GET /health`) | Pieprasījums bez parametriem | Integration | `200`, `status=ok`, ir `timestamp` ISO formātā | Sergejs Fjodorovs |
| TC-002 | Reģistrācija (`POST /users`) | Reģistrācija ar derīgiem datiem | Integration | `201`, atgriež izveidotā lietotāja `id` | Sergejs Fjodorovs |
| TC-003 | Reģistrācija (`POST /users`) | Reģistrācija ar tukšu e-pastu | Functional | `400`, `VALIDATION_ERROR`, `details.email` aizpildīts | Sergejs Fjodorovs |
| TC-004 | Reģistrācija (`POST /users`) | Reģistrācija ar nederīgu e-pasta formātu | Functional | `400`, `VALIDATION_ERROR` | Sergejs Fjodorovs |
| TC-005 | Reģistrācija (`POST /users`) | Reģistrācija ar tukšu paroli | Functional | `400`, `VALIDATION_ERROR`, `details.password` aizpildīts | Sergejs Fjodorovs |
| TC-006 | Reģistrācija (`POST /users`) | Reģistrācija ar paroli īsāku par 8 simboliem | Functional | `400`, `VALIDATION_ERROR` | Sergejs Fjodorovs |
| TC-007 | Reģistrācija (`POST /users`) | Reģistrācija ar jau eksistējošu e-pastu | Integration | `409`, `EMAIL_EXISTS` | Sergejs Fjodorovs |
| TC-008 | Lietotāju saraksts (`GET /users`) | Noklusētā lapošana bez parametriem | Integration | `200`, struktūra `{ data, page, limit }`, `page=1`, `limit=10` | Sergejs Fjodorovs |
| TC-009 | Lietotāju saraksts (`GET /users`) | Lapošana ar `page=2&limit=5` | Integration | `200`, atgriež ne vairāk kā 5 ierakstus un korektus `page/limit` | Sergejs Fjodorovs |
| TC-010 | Lietotāju saraksts (`GET /users`) | Filtrs ar `email=abc` | Functional | `200`, atgrieztie lietotāji atbilst filtram | Sergejs Fjodorovs |
| TC-011 | Kļūdu apstrāde | Neparedzēta servera kļūda servisā/modelī | Unit | `errorHandler` atgriež `500` un `Iekšēja servera kļūda` | Sergejs Fjodorovs |
| TC-012 | Validācija (`validateUser`) | Derīgi dati (`email`, `password>=8`) | Unit | `isValid=true`, `errors` tukšs | Sergejs Fjodorovs |
| TC-013 | Validācija (`validateUser`) | Nederīgs e-pasts + īsa parole | Unit | `isValid=false`, kļūdas abiem laukiem | Sergejs Fjodorovs |
| TC-014 | Serviss (`registerUser`) | Parole tiek hešota ar salt rounds = 10 | Unit | `bcrypt.hash` izsaukts ar `10`, modelim padots hešs | Sergejs Fjodorovs |
| TC-015 | E2E plūsma v0.1 | Reģistrēt lietotāju un pēc tam atrast to `GET /users?email=...` | E2E | Reģistrācija veiksmīga un lietotājs redzams sarakstā | Sergejs Fjodorovs |
| TC-016 | Login (plānots) | Pieteikšanās ar derīgiem datiem | Functional | `200`, izsniegts autentifikācijas tokens/sesija | Sergejs Fjodorovs |
| TC-017 | Login (plānots) | Pieteikšanās ar nepareizu paroli | Functional | `401`, `UNAUTHORIZED` | Sergejs Fjodorovs |
| TC-018 | Logout (plānots) | Izrakstīšanās pēc veiksmīga login | Functional | `200`, sesija/token invalīds | Sergejs Fjodorovs |
| TC-019 | Ziņu pievienošana (plānots) | Ziņas izveide ar derīgiem datiem | Functional | `201`, ziņa saglabāta DB | Sergejs Fjodorovs |
| TC-020 | Ziņu pievienošana (plānots) | Ziņas izveide ar tukšu saturu | Functional | `400`, `VALIDATION_ERROR` | Sergejs Fjodorovs |
| TC-021 | Ziņu skatīšana (plānots) | Ziņu saraksta iegūšana | Integration | `200`, atgriezts ziņu masīvs | Sergejs Fjodorovs |
| TC-022 | Admin: lietotāju saraksts (plānots) | Ne-admin mēģina piekļūt admin endpointam | Functional | `403`, `FORBIDDEN` | Sergejs Fjodorovs |
| TC-023 | Admin: lietotāju pārvaldība (plānots) | Admin bloķē/noņem lietotāju | Functional | `200/204`, lietotāja statuss mainīts | Sergejs Fjodorovs |

## 4. Piezīmes par ieviešanas secību
- 1. posms (v0.1): TC-001 līdz TC-015.
- 2. posms (nākamās funkcijas): TC-016 līdz TC-023.
- Testu plāns jāatjauno, tiklīdz tiek pievienoti jauni endpointi vai mainīti validācijas noteikumi.
