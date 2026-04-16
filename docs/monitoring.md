**PM2 Dashboard un New Relic — īss pārskats un pieslēgšanas soļi**

- **PM2 (procesu pārvaldnieks)**: viegli iestatāms lokāli vai serverī. PM2 nodrošina procesu restartus, logu skatu un bezmaksas `pm2 monit` / `pm2 dashboard` interaktīvu skatu.
  - Iespējas: procesu statuss, izmantojums (CPU, RAM), restartu vēsture, enkapsulēti log faili.
  - Kā pieslēgt: uzinstalēt `pm2` globāli (`npm i -g pm2`), palaist serveri ar `pm2 start src/app.js --name prakse-app`.
  - Papildu: PM2 Plus / Keymetrics piedāvā web dashboard, bet tas ir komerciāls.

- **PM2 lokālā dashboard piemērs**:
  - Startē aplikāciju: `pm2 start src/app.js --name prakse-app`
  - Atver monitoru: `pm2 monit`
  - Skati logus: `pm2 logs prakse-app`

- **New Relic (bezmaksas iespējas)**: nodrošina plašāku APM (Application Performance Monitoring) rīku komplektu — request tracing, ārējo servisu latenci, mēraparātus.
  - Iespējas free plānā: pamatā APM mēraparāti, dažas iespējas ierobežotas; pilns funkciju klāsts pie maksas plāniem.
  - Kā pieslēgt Node.js: reģistrē kontu New Relic, iegūsti `NEW_RELIC_LICENSE_KEY` un instalē `newrelic` npm pakotni (`npm i newrelic`).
  - Pievieno `require('newrelic')` kā pirmo rindu projektā (pirms citiem moduļiem), vai izmanto `NEW_RELIC_APP_NAME` un `NEW_RELIC_LICENSE_KEY` vidē.

- **Ātrie iestatīšanas soļi New Relic**:
  1. Reģistrējies New Relic un izveido lietotni.
  2. Instalē `newrelic` paketīti un pievieno `newrelic.js` konfigurāciju vai izmanto vides mainīgos.
  3. Pirms `src/app.js` importēšanas (servera startā) ausi `require('newrelic')`.

- **Ieteikums**: lokālai un vieglai uzraudzībai izmanto PM2. Ja vajadzīga dziļāka APM analīze un request tracing, izmēģini New Relic free plānu.

Ja vēlies, varu:
- pievienot `pm2` instrukcijas `README.local.md` un `Procfile` piemēru;
- sagatavot `newrelic` piemēra konfigurāciju projektam.
