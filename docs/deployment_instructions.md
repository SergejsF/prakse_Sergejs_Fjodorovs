# Izvietošanas instrukcija

Šī lapa apraksta, kā palaist projektu konteinerā lokāli un kā to izvietot uz populāriem bezmaksas servisiem.

1) Lokāla palaišana ar Docker

- Uzbūvē attēlu no repozitorija saknes:

  docker build -t prakse_app .

- Palaid konteineri, atverot portu 3001:

  docker run -p 3001:3001 prakse_app

- Pārbaude: health endpoint

  Pārlūkā vai ar curl pārbaudiet: http://<HOST_IP>:3001/health

  Atbilde: { "status": "ok", "timestamp": "..." }

2) Heroku (Procfile nepieciešams)

- Izveido Heroku aplikāciju un push uz Heroku git. Procfile jau ir sakārtots (`web: npm start`).

- Heroku automātiski palaidīs `npm start`, kas izsauc `node src/app.js`.

3) Render (Git deploy)

- Repozitoriju sasaista ar Render. Izvēlies "Web Service".
- Build command: atstāj tukšu vai `npm ci --production` ja nepieciešams.
- Start command: `npm start`.

Svarīgi piezīmes
- Lietotne klausās pie porta 3001. Ja hosting serviss pieprasa izmantot vides maini `PORT`, nepieciešams modificēt `src/app.js`, lai izmantotu `process.env.PORT || 3001`.
- Ja izmanto ārējo DB (MySQL), konfigurējiet `DATABASE_URL` vai attiecīgās vides mainīgās (`.env`) servisā.
