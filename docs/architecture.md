# MVC un REST principi

## Galvenie MVC principi
- Model: atbild par datu piekļuvi un darbu ar persistentiem datiem (SQL/DB vaicājumi).
- View: šajā backend projektā nav atsevišķas UI view kā server-side templating, jo API atgriež JSON.
- Controller: apstrādā HTTP pieprasījumu, validāciju un atbildes formēšanu.
- Service slānis: satur biznesa loģiku starp controller un model slāņiem.
- Atbildību nodalīšana: katrs slānis dara vienu lietu, samazinot sasaisti un atvieglojot testēšanu.

## Galvenie REST principi
- Resursu orientācija: endpointi pārstāv resursus, piemēram, /users.
- HTTP metožu semantika: GET lasīšanai, POST izveidei.
- Stateless pieprasījumi: katrs pieprasījums satur visu nepieciešamo informāciju.
- Vienots datu formāts: API atbildes JSON formātā.
- Korekti status kodi: 201 izveidei, 400 validācijas kļūdām, 409 konfliktam, 500 servera kļūdām.

## Augsta līmeņa arhitektūra

### Moduļi
- routes: maršrutē URL uz atbilstošiem controller handleriem.
- controllers: pieņem req/res, validē ievadi, izsauc servisus un atgriež HTTP atbildes.
- services: realizē biznesa noteikumus (piemēram, paroles hešošanu ar bcrypt).
- models: piekļūst datu slānim un izsauc DB funkcijas.
- db: satur savienojumu ar MySQL un SQL vaicājumu funkcijas.
- middleware: kopējā šķērslayer loģika, piemēram, centralizēta kļūdu apstrāde.

### Datu plūsma
1. Klients sūta HTTP pieprasījumu uz routes.
2. routes deleģē apstrādi controllerim.
3. controller validē datus un izsauc service slāni.
4. service izpilda biznesa loģiku un izsauc model slāni.
5. model izmanto db funkcijas SQL vaicājumiem.
6. Rezultāts atgriežas atpakaļ uz controller un klientu.
7. Kļūdas nonāk middleware error handlerī.

## Pielāgotā mapju struktūra
- src/app.js: Express inicializācija un middleware pieslēgšana.
- src/routes/users.js: lietotāju maršruti.
- src/controllers/users.js: lietotāju pieprasījumu kontrolieri.
- src/services/users.js: lietotāju biznesa loģika.
- src/models/users.js: lietotāju datu piekļuve caur db slāni.
- src/middlewares/errorHandler.js: globālā kļūdu apstrāde.
- src/validators/users.js: ieejas datu validācija.
- db/index.js: MySQL pool un SQL funkcijas.
