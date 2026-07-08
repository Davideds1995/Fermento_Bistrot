# Autenticazione Admin — come funziona e come modificarla

Questo documento spiega il sistema di login introdotto per `/admin`
(prenotazioni) e `/menu-admin` (menù), e come intervenire in autonomia
su permessi e accessi in futuro.

## Il problema che risolve

Prima di questa modifica, `/admin` e `/menu-admin` erano protette solo
da una password fissa (`admin`) controllata **nel browser**, lato
client. Il database (Supabase) non sapeva nulla di questo "login": il
client si collegava sempre con la stessa chiave pubblica (`anon key`),
identica a quella usata dal sito pubblico.

Questo causava un problema concreto: le prenotazioni venivano salvate
correttamente (il form pubblico ha il permesso di scrivere), ma il
pannello Admin non riusciva a **leggerle né aggiornarle**, perché nel
database non esisteva alcun permesso che lo consentisse alla chiave
anonima. Non c'era un errore visibile: la query tornava semplicemente
una lista vuota.

## Come funziona ora

Ci sono due livelli, che devono essere allineati perché tutto funzioni:

### 1. Supabase Auth (chi sei)

Supabase gestisce utenti reali (email + password) tramite
`supabase.auth`. Quando un utente fa login con successo, il client
JS salva una **sessione** (token JWT) nel `localStorage` del browser e
la allega automaticamente a ogni richiesta successiva verso il
database. Da quel momento, per il database quella richiesta non è più
"anonima" ma proviene dal ruolo Postgres `authenticated`.

Il codice che gestisce questo è:

- [src/lib/auth.tsx](src/lib/auth.tsx) — `AuthProvider` +
  hook `useAuth()`. Tiene traccia della sessione corrente e si
  aggiorna automaticamente quando l'utente fa login/logout (anche in
  un'altra tab, o al refresh della pagina).
- [src/components/AdminGate.tsx](src/components/AdminGate.tsx) —
  componente che mostra il form di login (email + password) se non
  c'è una sessione attiva, altrimenti mostra i suoi `children`.
  Usato sia da [src/pages/Admin.tsx](src/pages/Admin.tsx) che da
  [src/pages/MenuAdmin.tsx](src/pages/MenuAdmin.tsx).
- Il login è **unico e condiviso**: fare accesso su `/admin` autentica
  automaticamente anche `/menu-admin` (e viceversa), perché entrambi
  leggono la stessa sessione tramite `useAuth()`. Il pulsante "Esci"
  chiama `supabase.auth.signOut()`, che invalida la sessione ovunque.

### 2. Row Level Security / RLS (cosa puoi fare)

Sapere *chi sei* non basta: Postgres deve anche sapere *cosa quel
ruolo può fare* su ogni tabella. Questo si configura con le **RLS
policy**, definite nel database (non nel codice frontend). Ogni
policy dice: per questo comando (`SELECT`/`INSERT`/`UPDATE`/`DELETE`),
per questo ruolo (`public` = chiunque, `authenticated` = utenti
loggati), è permesso se questa condizione è vera.

Le policy attuali (introdotte in
[supabase/migrations/20260708120000_admin_auth_rls.sql](supabase/migrations/20260708120000_admin_auth_rls.sql)):

| Tabella | Comando | Ruolo | Effetto |
|---|---|---|---|
| `reservations` | `INSERT` | `public` | Chiunque può inviare una prenotazione (form pubblico) |
| `reservations` | `SELECT` | `authenticated` | Solo admin loggato vede le prenotazioni |
| `reservations` | `UPDATE` | `authenticated` | Solo admin loggato può confermare/cancellare |
| `menu_items` | `SELECT` | `public` | Chiunque vede il menù (pagina pubblica) |
| `menu_items` | `INSERT`/`UPDATE`/`DELETE` | `authenticated` | Solo admin loggato può modificare il menù |
| `menu_categories` | `SELECT` | `public` | Chiunque vede le categorie (pagina pubblica) |

Nota: **non esiste ancora** una policy di scrittura su
`menu_categories` — nel pannello attuale le categorie si leggono ma
non si creano/modificano da UI. Se in futuro aggiungi quella
funzionalità, dovrai aggiungere anche la policy corrispondente (vedi
sotto "Aggiungere una nuova policy").

Senza la combinazione **sessione valida + policy che lo permette**,
ogni operazione fallisce (silenziosamente per `SELECT`, con un errore
esplicito per `INSERT`/`UPDATE`/`DELETE`).

## Come creare un utente admin

Gli account admin si creano dalla Dashboard di Supabase, non dal
codice (è un'azione sensibile, va fatta consapevolmente da chi
gestisce il progetto):

1. Vai su [supabase.com/dashboard](https://supabase.com/dashboard) →
   progetto **Fermento-bistrot**.
2. Nel menu laterale: **Authentication** → **Users** → **Add user** →
   **Create new user**.
3. Inserisci l'email e una password. Spunta **Auto Confirm User**
   (altrimenti Supabase invierebbe un'email di conferma che, senza
   configurazione SMTP, potrebbe non arrivare).
4. Salva. Da ora quell'email/password può fare login su `/admin` e
   `/menu-admin`.

Per revocare l'accesso a qualcuno, elimina il suo utente dalla stessa
schermata (**Authentication → Users**).

Non esiste un ruolo "solo prenotazioni" o "solo menù": chiunque ha un
account admin vede e modifica entrambe le sezioni. Se in futuro serve
distinguere permessi diversi tra persone, va introdotto un sistema di
ruoli (es. una tabella `admin_roles` + policy che controllano anche il
ruolo, non solo `auth.role() = 'authenticated'`) — non è stato fatto
qui perché al momento non serve.

## Come intervenire in futuro

### Aggiungere una nuova tabella gestita dall'admin

Quando crei una nuova tabella che il pannello admin deve poter
leggere/scrivere:

1. Abilita RLS sulla tabella (Supabase lo richiede quasi sempre):
   ```sql
   alter table public.nome_tabella enable row level security;
   ```
2. Aggiungi le policy necessarie, seguendo lo stesso schema di
   `reservations`/`menu_items`:
   ```sql
   create policy "authenticated read nome_tabella"
     on public.nome_tabella for select to authenticated using (true);

   create policy "authenticated write nome_tabella"
     on public.nome_tabella for insert to authenticated with check (true);
   ```
   Se la tabella deve essere leggibile anche dal sito pubblico (come
   `menu_items`), aggiungi anche una policy `for select to public
   using (true)`.
3. Salva la policy come nuovo file in `supabase/migrations/` (stesso
   pattern del file esistente, con timestamp nel nome) — serve come
   storico di cosa è stato cambiato e perché, non solo come comando
   da lanciare una volta.

### Applicare una modifica al database

Questo progetto non usa ancora `supabase db push` in modo continuativo
(lo schema esistente è stato creato a mano dalla Dashboard, non ci
sono migration precedenti tracciate). Il modo più diretto per
applicare un file SQL al progetto collegato:

```bash
npx supabase db query --linked -f supabase/migrations/nome_file.sql
```

Per controllare le policy attive su una tabella:

```bash
npx supabase db query --linked "select policyname, cmd, roles from pg_policies where tablename='nome_tabella';"
```

`--linked` esegue la query sul progetto remoto collegato (quello vero,
non uno locale) — richiede di essere loggati con `npx supabase login`
(fatto una volta sola, il CLI ricorda le credenziali).

### Diagnosticare "il pannello admin non mostra i dati"

Sintomo tipico di una policy `SELECT` mancante per `authenticated`:
nessun errore in console, la tabella è semplicemente vuota. Verifica
in due passi:

1. Conferma che i dati esistano davvero nel database (non è un
   problema di scrittura):
   ```bash
   npx supabase db query --linked "select count(*) from nome_tabella;"
   ```
2. Controlla le policy della tabella (comando sopra). Se manca una
   riga con `cmd = SELECT` e `roles = {authenticated}`, è quella la
   causa.

## File coinvolti

| File | Ruolo |
|---|---|
| [src/lib/auth.tsx](src/lib/auth.tsx) | Contesto React con la sessione Supabase corrente |
| [src/components/AdminGate.tsx](src/components/AdminGate.tsx) | Form di login + gate condiviso da entrambi i pannelli |
| [src/pages/Admin.tsx](src/pages/Admin.tsx) | Pannello prenotazioni, avvolto da `AdminGate` |
| [src/pages/MenuAdmin.tsx](src/pages/MenuAdmin.tsx) | Pannello menù, avvolto da `AdminGate` |
| [src/App.tsx](src/App.tsx) | Monta `AuthProvider` attorno al router |
| [supabase/migrations/20260708120000_admin_auth_rls.sql](supabase/migrations/20260708120000_admin_auth_rls.sql) | Policy RLS che concedono accesso a `authenticated` |
