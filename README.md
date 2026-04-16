# prakse_Sergejs_Fjodorovs

Dinamisks Node.js projekts ar Express serveri, MySQL datu bāzi, lietotāju autentifikāciju, postu vadības sistēmu un automātisko žurnālēšanu.

## Projektā Iekļautais Funkcionalitāte

**Lietotāju Vadība**
- Reģistrēšanās ar e-pasta validāciju un bcrypt paroles šifrēšanu
- Ielogu forma ar pierakstīšanās verifikāciju
- Izlogu saite
- Pārlūkošana ar lapošanu un e-pasta filtrēšanu

**Postu Vadība**
- Jaunu postu izveide ar nosaukumu un saturu
- Postu pārlūkošana ar lapošanu un lietotāja filtru
- Automātiski saistīti ar lietotāju, kurš tos izveidoja

**Automātiskā Žurnālēšana**
- Reģistrē visas lietotāja darbības (reģistrēšanās, ielogu, izlogu, postu izveidošanu)
- Atbalsta dažādus log-līmeņus (info, warn, error)
- REST API logu apskatei ar filtrēšanu pēc līmeņa un lapošanu
- Dati persistenti saglabāti MySQL datubāzē

**Formu Validācija**
- Reāllaikā kļūdu izcēlums nevajadzīgi aizpildītajos laukos (sarkana apmale)
- Server-side validācija ar detalizētiem kļūdu paziņojumiem
- Lauku validācijas kļūdas tiek pieņemtas no servera responses

**UI/UX Uzlabojumi**
- Bootstrap 5.3.3 integrācija
- Ārējā CSS stilizācija (public/styles.css)
- Pogu atskaņošanas stāvokļi ar pūļojošo animāciju
- Multislāņu gradients fons
- Responzīvs dizains

## Prasības

- Node.js (ieteicams 18+)
- npm
- MySQL 8.0+

## Instalēšana

```bash
npm install
```

## Konfigurācija

Projektā tiek izmantots `.env` fails. Piemērs:

```env
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=prakse_db
```

### MySQL shēmas imports

Izveidot datubāzi un tabulas no SQL shēmas:

```bash
mysql -u root -p < db/schema.sql
```

## Palaišana

```bash
npm start
```

Serveris tiks palaists uz porta 3001.

## Izvietošana

Šajā projektā iespējami vairāki izvietošanas veidi. Zemāk īsi aprakstīts, kā palaist ar Docker un lokālā VM ar Vagrant.

### Docker (lokāli)

- Uzbūvē attēlu no projekta saknes:

    docker build -t prakse_app .

- Palaid konteineri un kartē portu 3001:

    docker run -p 3001:3001 prakse_app

- Pārbaudiet health endpoint:

    curl http://localhost:3001/health

Piezīme: projektā ir pievienots `.dockerignore`, lai neiekļautu lokālās `node_modules` kopijas attēlā.

### Lokāla VM ar Vagrant

- Priekšnoteikumi: `vagrant` un `virtualbox` uz hosta.
- No projekta saknes izpildiet:

    vagrant up

- Provision skripts instalēs Node.js un palaiž aplikāciju; piekļuve no hosta pieejama pie `http://localhost:3001/health`.

### Render / Heroku (īss)

- Var izmantot `Procfile` (projekta saknē) — `web: npm start`.
- Ja izvietojat uz PaaS, nodrošiniet vides mainīgos (`.env`) un, ja nepieciešams, iestatiet `PORT` saskaņā ar hostinga prasībām.

### Detalizētas izvietošanas vadlīnijas

Šeit īsi un skaidri — kā veidot prod attēlu, kā darboties lokāli ar `docker-compose` un kā konfigurēt PaaS.

1) Docker — production bilde

- Ieteicamā prakse prod bildes būvēšanai:

```bash
docker build -t prakse_app:latest .
```

- Piemērs Dockerfile piezīmēm (prod):

```Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "src/app.js"]
```

- Prod konteinera palaišana (izolēti ar vides mainīgajiem):

```bash
docker run --rm -p 3001:3001 \
    -e NODE_ENV=production \
    -e DB_HOST=... -e DB_USER=... -e DB_PASSWORD=... \
    prakse_app:latest
```

Piezīme: `npm ci --only=production` paredz, ka `package-lock.json` un `package.json` ir saskaņoti. Ja veicat izmaiņas atkarībās, atjauniniet lockfailu ar `npm install` lokāli un iespējamiem CI soļiem.

2) Docker Compose — lokāla izstrāde un dev režīms

- Bāzes `docker-compose.yml` var palaist app + db. Lai ērtāk strādātu lokāli, pievienojiet `docker-compose.override.yml` ar bind‑mount un `nodemon` komandu:

`docker-compose.override.yml` (piemērs):

```yaml
version: '3.8'
services:
    app:
        volumes:
            - ./:/app
            - node_modules:/app/node_modules
        command: npm run dev
volumes:
    node_modules:
```

- Tad startējiet dev vidi:

```bash
docker compose up --build
```

3) Procfile (Heroku / Render)

- Vienkāršs `Procfile` piemērs projekta saknē:

```
web: npm start
```

- Uz PaaS nodrošiniet `PORT` un datubāzes parametrus kā vides mainīgos. Lietotne izmanto `process.env.PORT`.

4) Dev vs Prod — īsie ieteikumi

- Dev:
    - izmantojiet bind‑mount, `nodemon`, `npm install` dev bildēs;
    - atstājiet detalizētāku logēšanu un error middleware.
- Prod:
    - izmantojiet `npm ci --only=production`, minimālu attēlu saturu, un atslēdziet dev‑middleware;
    - konfigurējiet centralizētu logu izvadi (vai ārējo servisu).

5) Migrācijas / seeds

- Ja plānojat lietot migrācijas (Knex/Sequelize), iekļaujiet migrāciju soļus CI/CD vai Docker entrypoint, lai droši piemērotu shēmas pirms app starta.

Ātrās komandas:

```bash
# Build prod image
docker build -t prakse_app:latest .

# Run prod container
docker run -p 3001:3001 -e NODE_ENV=production prakse_app:latest

# Run dev stack
docker compose up --build
```

Ja vēlaties, es varu: izveidot `docs/deployment_instructions.md` latviski, ģenerēt `docker-compose.override.yml` failu un pievienot piemēru `Procfile` repo. Kuru no šiem veikt tagad? 


## Testēšana

```bash
npm test -- --silent
```

Kopumā 37 testi, kas pārbauda validāciju, servisa slāni, maršrutus un middleware.

## API Endpoints

### Lietotāji
- `POST /users` — Reģistrēt jaunu lietotāju
- `GET /users` — Iegūt lietotājus ar lapošanu un filtru
- `POST /login` — Autentificēt lietotāju

### Raksti
- `POST /posts` — Izveidot jaunu rakstiņu
- `GET /posts` — Iegūt rakstiņus ar lapošanu

### Žurnāls
- `POST /logs` — Izveidot žurnāla ierakstu
- `GET /logs` — Iegūt žurnāla ierakstus ar filtrēšanu

### Veselības Pārbaude
- `GET /health` — Pārbaude API pieejamībai

## Projekta Struktūra

```
src/
├── app.js                    # Express lietotne un maršruti
├── controllers/
│   ├── users.js             # Lietotāju loģika
│   ├── posts.js             # Postu loģika
│   └── logs.js              # Žurnāla loģika
├── services/
│   ├── users.js             # Lietotāju biznesa loģika
│   ├── posts.js             # Postu biznesa loģika
│   └── logs.js              # Žurnāla serviss
├── models/
│   ├── users.js             # Lietotāju modeļi
│   ├── posts.js             # Postu modeļi
│   └── logs.js              # Žurnāla modeļi
├── routes/
│   ├── users.js             # Lietotāju maršruti
│   ├── posts.js             # Postu maršruti
│   └── logs.js              # Žurnāla maršruti
├── validators/
│   ├── users.js             # Lietotāja validācija
│   ├── posts.js             # Postu validācija
│   └── logs.js              # Žurnāla validācija
└── middlewares/
    └── errorHandler.js      # Centralizēts kļūdu apstrādi

db/
├── index.js                 # MySQL savienojums un vaicājumi
└── schema.sql               # Datu bāzes shēma

public/
├── index.html               # Galvenā formu lapa
└── styles.css               # Ārējie stili

docs/
├── postman_collection.json  # API testa pieprasījumi
├── testing_strategy.md      # Testa stratēģija
└── ...

tests/
├── validateUser.test.js
├── validatePost.test.js
├── validateLog.test.js
└── ...
```

## Datu Bāzes Shēma

**users**
- id: INT AUTO_INCREMENT PRIMARY KEY
- email: VARCHAR(255) UNIQUE
- password_hash: VARCHAR(255)
- created_at: TIMESTAMP

**posts**
- id: INT AUTO_INCREMENT PRIMARY KEY
- user_id: INT FOREIGN KEY
- title: VARCHAR(255)
- content: TEXT
- created_at: TIMESTAMP

**logs**
- id: INT AUTO_INCREMENT PRIMARY KEY
- level: ENUM('info', 'warn', 'error')
- message: TEXT
- created_at: TIMESTAMP

## Draudzīgā Vieta Lai Sākt

1. Atveriet `public/index.html` pārlūkā (pēc tam, kad sāk npm start)
2. Pierregistrējieties ar e-pasta adresi un paroli
3. Pierakstieties un izveidojiet jaunus rakstus
4. Skatiet `GET /logs` lai redzētu reģistrētos notikumus
5. Pārbaudiet visas formu validācijas kļūdas

## Tehnoloģijas

- **Node.js / Express 5.2.1** — Servera puse un API
- **MySQL 8.0 (mysql2/promise)** — Datu bāze
- **Bcrypt 5.1.1** — Paroles šifrēšana
- **Bootstrap 5.3.3** — CSS struktūra
- **Jest** — Testa ietvaras
- **dotenv** — Vides mainīgie

## Autors

Sergejs Fjodorovs (prakse projekts)

## Licencija

ISC

## Koda pārskatīšanas vadlīnijas un Git darba plūsma

- Koda pārskatīšanas vadlīnijas: [docs/code_review_guidelines.md](docs/code_review_guidelines.md)
- Git darba plūsma (feature branch, PR): [docs/git_workflow.md](docs/git_workflow.md)
- Pull request veidne: `.github/pull_request_template.md`

Lūdzu izmantojiet šos resursus, lai pieprasītu recenzijas un sekotu komandas praktikām.

## Jaunākie papildinājumi

### Winston žurnālošana (servera puse)

- Projektā integrēts `winston` ar konfigurāciju faila un DB žurnāliem.
- Žurnāli tiek rakstīti:
    - failā `logs/app.log`;
    - datubāzes tabulā `logs` (JSON ziņojuma saturs ar laiku un meta datiem).
- Kļūdu apstrādes slānis (`errorHandler`) reģistrē:
    - nepareizu JSON (`INVALID_JSON`);
    - servera kļūdas ar kodu, steku un pieprasījuma metadatiem.

### Monitorings

- Papildināta dokumentācija par monitoringa iespējām failā `docs/monitoring.md`.
- Apskatītie varianti:
    - PM2 (`pm2 monit`, `pm2 logs`) vienkāršai uzraudzībai;
    - New Relic free plāns dziļākai APM analīzei.

### Ātrā verifikācija

```bash
# instalēt atkarības
npm install

# palaist testus
npm test

# startēt serveri
npm start
```

Pēc palaišanas atveriet `http://localhost:3001/` un pārbaudiet:
- neautorizētam lietotājam postu forma rāda autorizācijas prasību;
- pēc veiksmīgas autorizācijas iepriekšējais posta kļūdas ziņojums tiek notīrīts.
