# Validācijas noteikumi

## Lietotājs (User)

| Lauks      | Tips          | Noteikums                              | Kļūdas ziņojums                  |
|------------|---------------|----------------------------------------|----------------------------------|
| `email`    | string        | Obligāts; satur `@` un domēnu          | "Invalid email address"          |
| `password` | string        | Obligāts; garums ≥ 8 simboli           | "Password must be at least 8 characters" |

> Piezīme: pašreizējā implementācijā lietotāja modelī netiek izmantots `name` lauks.
> Reģistrācijā tiek validēti tikai `email` un `password`.

---

## Ziņa (Post)

| Lauks     | Tips   | Noteikums                    | Kļūdas ziņojums                   |
|-----------|--------|------------------------------|-----------------------------------|
| `title`   | string | Obligāts; garums ≥ 3 simboli | "Title must be at least 3 characters" |
| `content` | string | Obligāts; nedrīkst būt tukšs | "Content is required"             |

---

## Žurnāls (Log)

| Lauks    | Tips   | Noteikums                             | Kļūdas ziņojums            |
|----------|--------|---------------------------------------|----------------------------|
| `level`  | string | Obligāts; atļautās vērtības: `info`, `warn`, `error` | "Level must be one of: info, warn, error" |
| `action` | string | Obligāts; nedrīkst būt tukšs         | "Action is required"       |

---

## Kļūdu kodi

| Kods               | HTTP statuss | Skaidrojums                                                 |
|--------------------|-------------|-------------------------------------------------------------|
| `VALIDATION_ERROR` | 400         | Ievades dati neatbilst validācijas noteikumiem              |
| `NOT_FOUND`        | 404         | Pieprasītais resurss neeksistē                              |
| `EMAIL_EXISTS`     | 409         | Lietotājs ar šādu e-pastu jau ir reģistrēts                 |
| `UNAUTHORIZED`     | 401         | Pieprasījumam nav autentifikācijas vai tā ir nederīga       |
| `FORBIDDEN`        | 403         | Autentificētajam lietotājam nav tiesību veikt šo darbību    |
| `DB_ERROR`         | 500         | Datubāzes kļūda — SQL vaicājums neizdevās                   |
| `INTERNAL_ERROR`   | 500         | Neparedzēta servera kļūda                                   |

> Piezīme: pašreizējā kodā `NOT_FOUND`, `UNAUTHORIZED` un `FORBIDDEN` ir plānoti kodi nākamajiem ieviešanas soļiem.
