# Middleware dizains — pseudo kods

> Svarīgi: šis dokuments apvieno esošo realizāciju un plānoto arhitektūru.
> `validatePost` un `validateLog` apraksti ir nākamajiem ieviešanas soļiem.

## 1. Lietotāja validācijas middleware

Pašreizējā kodā (`src/validators/users.js`) lietotāja validācija ir realizēta kā funkcija,
kas pārbauda `email` un `password` (`>= 8`) un tiek izsaukta kontrolierī.
Zemāk redzamais middleware piemērs ir mērķa variants, ja validāciju pārvieto uz middleware slāni.

```js
function validateUser(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  // E-pasta validācija
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email address");
  }

  // Paroles validācija
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: errors.join(", ")
      }
    });
  }

  next();
}
```

---

## 2. Ziņas validācijas middleware

Plānots nākamajam etapam (posts funkcionalitātei).

```js
function validatePost(req, res, next) {
  const { title, content } = req.body;
  const errors = [];

  // Virsraksta validācija
  if (!title || title.length < 3) {
    errors.push("Title must be at least 3 characters");
  }

  // Satura validācija
  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: errors.join(", ")
      }
    });
  }

  next();
}
```

---

## 3. Žurnāla validācijas middleware

Plānots nākamajam etapam (audit/log funkcionalitātei).

```js
const ALLOWED_LEVELS = ["info", "warn", "error"];

function validateLog(req, res, next) {
  const { level, action } = req.body;
  const errors = [];

  // Līmeņa validācija
  if (!level || !ALLOWED_LEVELS.includes(level)) {
    errors.push("Level must be one of: info, warn, error");
  }

  // Darbības validācija
  if (!action || action.trim().length === 0) {
    errors.push("Action is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: errors.join(", ")
      }
    });
  }

  next();
}
```

---

## 4. Centralizētā kļūdu apstrādes middleware

Piezīme: pašreizējā implementācijā kļūdu atbildes forma ir vienkāršota
(`{ error: 'EMAIL_EXISTS' }` un `{ error: 'Internal server error' }`).
Zemāk esošais variants apraksta mērķa, detalizētāku kļūdu formātu.

```js
function errorHandler(err, req, res, next) {
  // Dublēts e-pasts (MySQL ER_DUP_ENTRY)
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      error: { code: "EMAIL_EXISTS", message: "Email already registered" }
    });
  }

  // Datubāzes kļūda
  if (err.type === "DB_ERROR") {
    return res.status(500).json({
      error: { code: "DB_ERROR", message: "Database operation failed" }
    });
  }

  // Nav atrasts
  if (err.type === "NOT_FOUND") {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: err.message || "Resource not found" }
    });
  }

  // Neparedzēta kļūda
  console.error(err);
  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Internal server error" }
  });
}
```

---

## Datu plūsma ar middleware

```
HTTP pieprasījums
      |
      v
  [routes]
      |
      v
  [validateUser / validatePost / validateLog]  <-- validācija
      |  (kļūda → 400 VALIDATION_ERROR)
      v
  [controller]
      |
      v
  [service] --> [model] --> [db]
      |  (kļūda → throw err)
      v
  [errorHandler]  <-- centralizēta kļūdu apstrāde
      |
      v
  HTTP atbilde
```
