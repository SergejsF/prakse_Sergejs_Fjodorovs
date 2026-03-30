# Kopsavilkums

## Sakārtota projekta struktūra
- Izveidotas mapes: `src/routes`, `src/services`, `src/validators`, `src/middlewares`.
- Maršrutu loģika atstāta `src/routes/users.js`.
- Validācija atrodas `src/validators/users.js`.
- Biznesa loģika (paroles hešošana un lietotāju iegūšana) pārvietota uz `src/services/users.js`.
- Kļūdu apstrāde pārvietota uz `src/middlewares/errorHandler.js`.

## Noņemts liekais kods
- No `src/routes/users.js` noņemta tieša `bcrypt` izmantošana un tieša piekļuve DB slānim.
- No `src/app.js` noņemts inline error middleware.
- Dublēta kļūdu apstrādes loģika pārvietota uz vienu centralizētu middleware.

## Piezīme par commit
Ieteicamā commit ziņa:
`Sakārtota projekta struktūra ar routes/services/validators/middlewares un centralizētu kļūdu apstrādi`
