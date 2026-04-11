
# Testu atskaite

## Automātisko testu kopsavilkums

- Komanda: `npm test`
- Rezultāts: **OK**
- Test Suites: **9 passed, 9 total**
- Tests: **40 passed, 40 total**

## 1) Validācijas testi

- `tests/validateUser.test.js`
	- Pozitīvs: derīgs `name`, `email`, `password` -> `isValid=true` — **OK**
	- Negatīvi: tukšs/īss `name`, nederīgs/tukšs `email`, īsa/trūkstoša `password` — **OK**

- `tests/validatePost.test.js`
	- Pozitīvs: derīgs `title`, `content` — **OK**
	- Negatīvi: tukšs/īss `title`, tukšs/īss `content` — **OK**

- `tests/validateLog.test.js`
	- Pozitīvi: `level=info|warn`, derīgs `message` — **OK**
	- Negatīvi: nederīgs `level`, tukšs/trūkstošs `message` — **OK**

## 2) DB funkciju testi (ar Jest mokiem)

- `tests/services/userService.test.js`
	- `createUser()` veiksmīgs INSERT (`insertId`) — **OK**
	- `createUser()` kļūdas propagācija — **OK**
	- `getUsers()` veiksmīgs SELECT — **OK**
	- `getUsers()` kļūdas propagācija — **OK**

- `tests/services/postsService.test.js`
	- `createPost()` veiksmīgs INSERT — **OK**
	- `createPost()` kļūdas propagācija — **OK**
	- `getPosts()` veiksmīgs SELECT — **OK**
	- `getPosts()` kļūdas propagācija — **OK**

- `tests/services/logsService.test.js`
	- `createLog()` veiksmīgs INSERT — **OK**
	- `createLog()` kļūdas propagācija — **OK**
	- `getLogs()` veiksmīgs SELECT — **OK**
	- `getLogs()` kļūdas propagācija — **OK**

Piezīme: datubāzes izsaukumi ir izolēti ar mokiem (`mysql2/promise`), reāli dati netiek dzēsti un netiek mainīti.

## 3) Middleware kļūdu apstrādes testi

- `tests/middlewares/errorHandler.test.js`
	- `ER_DUP_ENTRY` -> HTTP **409**, body `{ error: 'EMAIL_EXISTS' }` — **OK**
	- Vispārīga kļūda -> HTTP **500**, body `{ error: 'Iekšēja servera kļūda' }` — **OK**

## 4) Integration testi (Supertest)

- `tests/integration/users.routes.test.js`
	- `POST /users` ar derīgiem datiem -> HTTP **201** — **OK**
	- `POST /users` dublikāts e-pastam -> HTTP **409** — **OK**
	- `POST /users` tukšs body -> HTTP **400** — **OK**
	- `GET /users` veiksmīgs saraksts -> HTTP **200** — **OK**

- `tests/integration/posts.routes.test.js`
	- `POST /posts` ar derīgiem datiem -> HTTP **201** — **OK**
	- `POST /posts` tukšs body -> HTTP **400** — **OK**
	- `GET /posts` veiksmīgs saraksts -> HTTP **200** — **OK**
	- `GET /posts` servisa kļūda -> HTTP **500** — **OK**

Piezīme: integration testos DB piekļuve ir izolēta ar mokiem, un `beforeEach` tiek atiestatīts mock stāvoklis (izolācija starp testiem).

## 5) Statuss

- Kopējais statuss: **OK**
- Bloķējošas kļūdas: **nav**

