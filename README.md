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
