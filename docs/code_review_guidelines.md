# Koda pārskatīšanas vadlīnijas

Šīs vadlīnijas nosaka procesu un pārbaudes kritērijus koda pārskatīšanai projektā.

## 1. Kā pieprasīt recenziju

- Izveido Pull Request (PR) no atsevišķas feature zara uz `main` vai attiecīgo mērķzaru.
- PR nosaukumā norādi īsu aprakstu un, ja nepieciešams, Issue numuru: `feat(auth): pievienot OIDC atbalstu. Fixes #12`.
- PR aprakstā uzraksti īsu kopsavilkumu, galvenās izmaiņas un jebkādas ieviešanas instrukcijas.
- Pievieno pārbaudīšanas soļus (`Steps to reproduce` / `Pārbaudīšanas soļi`) un norādi, kuri testi jāizpilda lokāli.
- Norādi, kādu veidu pārskatīšanu vēlies (piem., drošība, performanse, UI, refaktoring).

## 2. Kā recenzents pārbauda

Recenzents pārbauda šādus aspektus:

- **Koda kvalitāte:** skaidrība, lasāmība, loģikas vienkāršība, neatkārtošanās (DRY), adekvāti nosaukti simboli.
- **Funkcionalitāte:** izmaiņas dara to, kas aprakstīts PR aprakstā; netiek bojātas esošas funkcijas.
- **Testi:** ir pievienoti atbilstoši vienību/integrācijas testi un tie iziet lokāli/CI; pārbaudi jaunu testu saturu un segumu.
- **Drošība:** nav ievainojamību (SQL injekcija, XSS, atklāti sensitīvi dati žurnālos); ievērota datu validācija un autorizācijas loģika.
- **Veiktspēja:** izvairīšanās no smagiem N+1 vaicājumiem, liekiem I/O vai resursu izmantojumiem; ja nepieciešams — ieteikumi optimizācijai.
- **Atkarības:** pārbaudi jaunas dependences — vai tās ir uzticamas un vajadzīgas.
- **Migrācijas un DB izmaiņas:** pārbaudi migration skriptus, rollback iespējas un datu drošību.
- **Dokumentācija:** atjaunināta README, changelog vai citi dokumenti, ja izmaiņas ietekmē lietotāja vai izstrādātāja darba plūsmu.
- **Stils un formāts:** atbilst projektu kodēšanas standartiem (linters, formatters).

## 3. Kā sniegt atsauksmes

- Sniedz konstrukitvu, laipnu un konkrētu atsauksmi. Izmanto komentārus uz konkrētām rindiņām, ja nepieciešams.
- Piedāvā alternatīvus risinājumus, ja identificē problēmu.
- Atzīmē, ja izmaiņas ir OK (`Approve`) vai nepieciešamas izmaiņas (`Request changes`).
- Ja ir tikai nelielas piezīmes (stila vai smalkas uzlabošanas iespējas), izmanto `Comment` bez `Request changes` statusa.
- Ja nepieciešama papildu diskusija, pievieno saistītu komentāru PR un, ja nepieciešams, uzaicini konkrētus komandas biedrus (`@user`).

## 4. Pārskatīšanas laiks un SLA

- Mērķis: atbildēt uz PR pieprasījumu 48 stundu laikā darba dienās.
- Par prioritārajiem vai kritiskiem labojumiem vienojieties komandā un sazinieties tieši (Slack/Discord).

## 5. PR apvienošana

- Pēc nepieciešamajām korekcijām un apstiprinājumiem apvieno PR ar `main` izmantojot komandas izvēlēto strategiju (piem., `Squash and merge` vai `Merge commit`).
- Nodrošini, ka CI (ja ir) ir izpildījis visus testus pirms merge.
- Pēc sapludināšanas izdzēs atbalsta zaru (`feature/...`).

## 6. Saziņas rīki (Slack/Discord u.c.) — īss apraksts

- **Kāpēc izmantot:** ātra ikdienas komunikācija, ātras konsultācijas par PR, paziņojumi par CI kļūdām un izmaiņām.
- **Kā lietot:**
  - Izveido kanālus pēc tēmām (`#backend`, `#frontend`, `#devops`, `#prs`).
  - PR diskusijas galvenokārt turpini GitHub PR komentāros, bet izmanto Slack/Discord, lai pievērstu uzmanību vai ātri saskaņotu risinājumu.
  - Lai ziņotu par kritisku kļūdu vai ilgstošu problēmu, atzīmē atbildīgos (`@user`) un norādi PR/Issue linku.
  - Izmanto paziņojumus (integrācijas) no GitHub, lai kanālā redzētu jaunos PR, merge un CI stāvokļus.

- **Labās prakses:**
  - Neliec visu diskusiju ārpus PR — svarīgs konteksts jāglabā PR komentāros.
  - Rūpējies par kanālu pieklājību un skaidrību — īsi apraksti problēmu un pievieno saites uz PR/Issue.

---

Šīs vadlīnijas ir paredzētas, lai pārskatīšana būtu efektīva, konstruktīva un droša. Ja ir papildprasības (piem., drošības audits), iekļauj tās PR aprakstā vai projekta dokumentācijā.