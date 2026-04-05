# UI Komponentu saraksts un Dizaina pamatnostādnes

> Piezīme: šis UI apraksts ir mērķa stāvoklim (frontend + paplašināts backend).
> Pašreizējā v0.1 backend realizācijā pieejami `health` un `users` endpointi.

## UI Komponenti

### Ievades lauki (Input Fields)

| Komponents        | Izmantošana                          | Validācija               |
|-------------------|--------------------------------------|--------------------------|
| Text input        | Vārds, virsraksts                    | Min/max garums           |
| Email input       | E-pasta adrese                       | Formāts ar `@`           |
| Password input    | Parole, paroles apstiprināšana       | Minimums 8 simboli       |
| Textarea          | Ziņas saturs                         | Nedrīkst būt tukšs       |
| Search input      | Ziņu meklēšana sarakstā              | Neobligāts               |

### Pogas (Buttons)

| Komponents       | Krāsa       | Darbība                           |
|------------------|-------------|-----------------------------------|
| Primārā poga     | #2980B9     | Reģistrēties, Pievienot, Meklēt  |
| Sekundārā poga   | #7F8C8D     | Atcelt, Atpakaļ                   |
| Bīstamā poga     | #E74C3C     | Dzēst lietotāju (admin)           |
| Paginācija       | #2980B9 / #ECF0F1 | Lapošana                    |

### Tabulas (Tables)

| Komponents         | Lauki                              | Funkcijas                     |
|--------------------|------------------------------------|-------------------------------|
| Ziņu tabula        | Virsraksts, Autors, Datums         | Meklēšana, paginācija         |
| Lietotāju tabula   | ID, E-pasts, Reģ. datums, Statuss  | Skatīt, bloķēt (admin)        |

### Kļūdu paziņojumi (Error / Notification)

| Tips              | Krāsa rāmis | Fons     | Lietojums                                |
|-------------------|-------------|----------|------------------------------------------|
| Kļūda (error)     | #E74C3C     | #FDEDEC  | Validācijas kļūdas (400)                 |
| Brīdinājums (warn)| #F39C12     | #FEF9E7  | Konflikts — dublēts e-pasts (409)         |
| Panākumi (success)| #27AE60     | #EAFAF1  | Veiksmīga reģistrācija / pievienošana    |
| Informācija (info)| #2980B9     | #EAF2FB  | Servera kļūda (500), uzziņas             |
| Inline lauka kļūda| #E74C3C     | —        | Rāda tieši zem ievades lauka             |

### Savstarpējās saites starp komponentiem

```
[Search Input] ──filtro──> [Posts Table]
[+ Pievienot poga] ──atver──> [Post Form]
[Post Form] ──submit──> [validatePost MW] ──ok──> [Posts Table atjaunojas]
                                          ──kļūda──> [Error Notification]
[Registration Form] ──submit──> [validateUser MW] ──ok──> [Login lapa]
                                                  ──kļūda──> [Inline Field Error]
[Posts Table] ──paginācija──> [GET /posts?page=N]
```

---

## Dizaina pamatnostādnes

### Krāsu palete

| Loma              | Hex kods  | Lietojums                              |
|-------------------|-----------|----------------------------------------|
| Primārā           | `#2C3E50` | Galvenes, teksts, robežas              |
| Akcents (zils)    | `#2980B9` | Pogas, aktīvi elementi, saites         |
| Fons (gaiši)      | `#F0F2F5` | Lapas fons                             |
| Kartes fons       | `#FFFFFF` | Formu un tabulu fons                   |
| Ievades lauka fons| `#ECF0F1` | Input / textarea fons                  |
| Kļūda             | `#E74C3C` | Kļūdu robežas un teksts                |
| Brīdinājums       | `#F39C12` | Brīdinājuma paziņojumi                 |
| Panākumi          | `#27AE60` | Veiksmīgi paziņojumi                   |
| Pelēks (sekundārs)| `#7F8C8D` | Sekundārās pogas, aizdomāts teksts    |

### Fonti

| Loma            | Fonts                   | Izmērs   | Svars    |
|-----------------|-------------------------|----------|----------|
| Galvenes (h1)   | Helvetica / system-ui   | 22 px    | Bold     |
| Sadaļu virsraksti| Helvetica / system-ui  | 18 px    | SemiBold |
| Formu etiķetes  | Helvetica / system-ui   | 12 px    | Regular  |
| Ievades vērtības| Helvetica / system-ui   | 13 px    | Regular  |
| Tabulas teksts  | Helvetica / system-ui   | 11 px    | Regular  |
| Kļūdu ziņojumi  | Helvetica / system-ui   | 11 px    | Regular  |

### Atstarpes (Spacing)

| Elements              | Vērtība      |
|-----------------------|--------------|
| Lapas sānu atstarpe   | 24 px        |
| Starp formulas laukiem| 16 px        |
| Ievades lauka augstums| 36 px        |
| Pogas augstums        | 36 px        |
| Pogas sānu polsterējums| 16 px       |
| Kartes iekšējā atstarpe | 20 px      |
| Tabulas rindas augstums | 36 px      |

### Robežas un ēnas

- Robežas rādiuss (input, pogas): `4 px`
- Karšu ēna: `2px 2px 6px rgba(0,0,0,0.08)`
- Aktīvais/fokusētais input: zila robeža `#2980B9`, biezums `2 px`
- Kļūdas lauks: sarkana robeža `#E74C3C`, biezums `2 px`
