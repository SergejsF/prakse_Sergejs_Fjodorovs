# Veiktspējas testi (Apache Bench)

## Izmantotais rīks

Izvēlēts **Apache Bench (ab)**.

## Izveidotie skripti

- `scripts/performance_ab.sh` — nosūta paralēlus pieprasījumus uz `GET /users` un `POST /posts`.

Parametri testam:

- Pieprasījumu skaits (`-n`): 100
- Paralēlisms (`-c`): 50

## Palaišanas komandas

```bash
./scripts/performance_ab.sh before_indexes
# indeksu pārbaude/pievienošana MySQL
# (ja indeksi neeksistē)
mysql -u <lietotajs> -p <datubaze> -e "CREATE INDEX idx_users_email ON users(email);"
mysql -u <lietotajs> -p <datubaze> -e "CREATE INDEX idx_posts_user_id ON posts(user_id);"

./scripts/performance_ab.sh after_indexes
```

## Mērījumu rezultāti

### GET /users

Pirms indeksiem (`before_indexes`):

- Atbildes laiks: **14.060 ms**
- Caurlaidība: **3556.06 req/s**
- Kļūdu skaits: **100**

Pēc indeksiem (`after_indexes`):

- Atbildes laiks: **11.692 ms**
- Caurlaidība: **4276.61 req/s**
- Kļūdu skaits: **100**

Piezīme: `GET /users` testa laikā atgriež 500 kļūdas (kļūdu skaits paliek 100/100), tāpēc šī endpointa mērījumi nav reprezentatīvi SQL indeksu ietekmes salīdzināšanai.

### POST /posts

Pirms indeksiem (`before_indexes`):

- Atbildes laiks: **12.854 ms**
- Caurlaidība: **3889.84 req/s**
- Kļūdu skaits: **0**

Pēc indeksiem (`after_indexes`):

- Atbildes laiks: **5.885 ms**
- Caurlaidība: **8496.18 req/s**
- Kļūdu skaits: **0**

Salīdzinājums `POST /posts`:

- Atbildes laiks samazinājās aptuveni par **54.2%**
- Caurlaidība pieauga aptuveni par **118.4%**

## Secinājumi

1. Slodzes tests ar 100 pieprasījumiem un 50 paralēliem savienojumiem ir veiksmīgi izpildīts abiem endpointiem.
2. `POST /posts` endpointam kļūdu nav, un pēc indeksu pārbaudes/pielāgošanas novērojama būtiska veiktspējas uzlabošanās.
3. `GET /users` endpointā ir iekšēja kļūda (HTTP 500), kas maskē indeksu efektu šim maršrutam.
4. Kāpēc indeksi uzlabo ātrumu:
   - Indekss uz `users.email` paātrina meklēšanu pēc e-pasta (`WHERE email = ?`), jo DB var izmantot B-tree navigāciju, nevis pilnu tabulas skenēšanu.
   - Indekss uz `posts.user_id` paātrina filtrēšanu pēc lietotāja (`WHERE user_id = ?`) un samazina lasāmo rindu apjomu pie lielākas datu tabulas.
   - Mazāk pilnu skenējumu nozīmē mazāku I/O slodzi un īsāku vaicājuma izpildes laiku, īpaši pie augsta paralēlisma.