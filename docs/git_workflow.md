# Git darba plusma: feature branch un pull request

Sis dokuments apraksta ieteicamo darba plusmu GitHub/GitLab projektam.

## 1. Atzarojumu veidosana

1. Vienmer sak darbu no atjauninata galvena zara:
   - `git checkout main`
   - `git pull origin main`
2. Izveido atsevisku feature zaru katram uzdevumam:
   - `git checkout -b feature/logging`
   - `git checkout -b feature/ui-fixes`

### Ieteikts zaru nosauksanas formāts

- `feature/<isais-apraksts>` jaunam funkcionalitatem
- `fix/<isais-apraksts>` kludu labojumiem
- `chore/<isais-apraksts>` tehniskiem darbiem bez funkcionalitates izmainam

## 2. Commit zinu nosauksana

Commit zinas raksti isa, konkreta un darbibas forma.

### Ieteikts formatts

- `feat(logging): pievienot detalizetu kludu logu`
- `fix(ui): sakartot mobilo izkartojumu`

Ja ir GitHub Issue, pievieno to commit zinas beigas:

- `feat(logging): pievienot detalizetu kludu logu. Fixes #1`
- `fix(ui): sakartot mobilo izkartojumu. Fixes #2`

## 3. Pull request / merge request process

1. Publice feature zaru:
   - `git push -u origin feature/logging`
2. Izveido Pull Request (GitHub) vai Merge Request (GitLab):
   - no `feature/...` uz `main`
3. PR apraksta noradi:
   - ko izmainiji
   - kapec izmainiji
   - testu rezultatu kopsavilkumu
   - Issue atsauci (`Fixes #<numurs>`)
4. Pagaidi parbaudes un code review.
5. Sapludini PR ar `main` (ieteicams `Squash and merge` vai `Merge commit`, pec komandas standartiem).
6. Pec sapludinasanas izdzes feature zaru:
   - `git branch -d feature/logging`
   - `git push origin --delete feature/logging`

## 4. Praktisks piemers

1. Izveido zaru `feature/logging`, izdari izmainas, izveido commit ar `Fixes #...`.
2. Izveido PR uz `main`, sapludini.
3. Izveido zaru `feature/ui-fixes`, izdari izmainas, izveido commit ar `Fixes #...`.
4. Izveido otro PR uz `main`, sapludini.

Rezultats: katrs uzdevums ir izolets sava zara, viegli parskatatams un drosi sapludinams galvenaja zara.
