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
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=prakse_db
```

## MySQL shēmas imports

Izveidot datubāzi un tabulu no SQL shēmas:

```bash
mysql -u root -p < db/schema.sql
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

## Testēšana

Testēšanas pieeja un plāns aprakstīti dokumentā `docs/testing_strategy.md`.

Dokumentā ir:
- testu veidu salīdzinājums (unit, integration, functional, E2E) ar piemēriem;
- projekta testēšanas stratēģija ar rīkiem (`Jest`, `Supertest`, `Postman`);
- testu plāna tabula ar testa gadījumiem, sagaidāmajiem rezultātiem un atbildīgo personu.

Pašreiz testu skripti repozitorijā vēl nav ieviesti; dokuments nosaka mērķa pieeju turpmākai ieviešanai.
