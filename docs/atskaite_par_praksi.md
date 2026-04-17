**Prakses atskaite**

Datums: 2026. gada 17. aprīlis

Kopsavilkums

Šī atskaite apkopo paveikto praksē projektā, kas izstrādāts Node.js vidē. Projekts satur REST API risinājumu ar maršrutiem, servisiem, validācijām un žurnālu apstrādi. Kods atrodas mapē `src/`, datubāzes shēma — `db/schema.sql`, un projektu papildina testu komplekts mapē `tests/`.

Mērķi

- Iegūt pieredzi pilna kausa tīmekļa pakalpojumu izstrādē ar Node.js un Express.
- Izstrādāt un pārbaudīt REST API loģiku (`routes/`, `controllers/`, `services/`).
- Nodrošināt validācijas un kļūdu apstrādi ar starpposma loģiku (`validators/`, `middlewares/`).
- Ieviest žurnālu (logging) un vienību/integrācijas testus.
- Sagatavot projektu palaišanai lokāli un konteinerā (`Dockerfile`, `docker-compose.yml`).

Veiktie uzdevumi

- Izstrādātas un ievietotas REST maršruti `routes/users.js`, `routes/posts.js`, `routes/logs.js`.
- Implementēti kontrolieri un servisi (`src/controllers/`, `src/services/`) datu apstrādei un biznesa loģikai.
- Izveidoti modeļi datu saglabāšanai (`src/models/`) un datubāzes shēma `db/schema.sql`.
- Pievienotas validācijas funkcijas (`validators/`) un globāla kļūdu apstrāde (`middlewares/errorHandler.js`).
- Ieviesta žurnālu apstrāde (`logger.js`, `logs/`) un žurnālu maršruti un serviss.
- Uzrakstīti vienību un integrācijas testi (`tests/`), kas pārbauda validācijas, servisu loģiku un API atbildes.
- Projekta konteinēšanas sagatavošana ar `Dockerfile` un `docker-compose.yml`.

Tehnoloģijas un rīki

- Node.js un Express — servera loģika.
- JavaScript (ES6+) — projektu kodēšanai.
- Testu rīki: Jest (vienību/integrācijas testi).
- Datubāze: lokāla SQL shēma (`db/schema.sql`) — izstrādes nolūkiem.
- Docker un Docker Compose — vides reproducējamībai.
- Papildu rīki: nodrošināta žurnālu apstrāde un vienkārša konfigurācija.

Galvenie sasniegumi

- Funkcionāls REST API ar pilnu request/response plūsmu, validācijām un kļūdu apstrādi.
- Testu kopa, kas aptver kritiskos servisus un maršrutus, nodrošinot koda stabilitāti.
- Projekta sagatavošana lokālai palaišanai un konteinerizācijai, kas atvieglo izvietošanu.

Problēmas un risinājumi

- Sākotnēji bija nepieciešams precizēt datu modeļus un validācijas — atrisināts, pievienojot papildus validācijas slāni `validators/`.
- Testu atkarības un vidi bija jānormalizē — izmantots izolēts testu datubāzes variants un konfigurācijas faili.
- Žurnālu apstrādē konstatētas neatbilstības — uzlabota `logger.js` konfigurācija un kļūdu maršrutēšana uz `logs` servisu.

Ieteikumi turpmākai attīstībai

- Paplašināt testu segumu ar vairāk funkcionāliem un e2e testiem.
- Pievienot automātiskās CI pārbaudes (GitHub Actions vai cita CI sistēma) testi un lintera palaišanai.
- Apsvērt automātisku migrāciju rīku iekļaušanu datubāzes izmaiņu pārvaldībai.
- Uzlabot dokumentāciju (API specifikācija, Postman kolekcija `docs/postman_collection.json`).

Secinājums

Prakse deva praktisku pieredzi pilna kausa tīmekļa pakalpojuma izstrādē, testēšanā un konteinerizācijā. Projekts nodrošina stabilu bāzi turpmākai attīstībai un ražošanas tipa ieviešanai, ja nepieciešams paplašināt funkcionalitāti un automatizēt izvietošanas procesu.


Autors: Sergejs Fjodorovs


