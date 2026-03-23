# prakse_Sergejs_Fjodorovs

Node.js projekts ar Express serveri un dotenv konfigurāciju.

## Prasības

- Node.js (ieteicams 18+)
- npm

## Instalēšana

```bash
npm install
```

## Konfigurācija

Projektā tiek izmantots `.env` fails. Piemērs:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=app_db
```

## Palaišana

```bash
node src/app.js
```

Serveris tiks palaists uz porta no `PORT` (pēc noklusējuma: 3000).

## Veselības pārbaude

Pārbaude pārlūkā vai ar komandu:

```bash
curl http://localhost:3000/health
```

Sagaidāmā atbilde:

```json
{"status":"ok"}
```
