# Fermento — Caffè · Bistrot

Sito web e sistema di gestione per *Fermento*, un caffè-bistrot artigianale a Roma.
Stack: **React 18 + Vite 5 + TypeScript 5** (frontend) · **Supabase** (backend, da configurare).

---

## Struttura del progetto

```
fermento_bistrot/
├── project/
│   ├── assets/               ← logo, flourish (brand assets)
│   ├── colors_and_type.css   ← design tokens canonici
│   ├── preview/              ← specimen HTML del design system
│   ├── ui_kits/website/      ← prototipo HTML/JSX originale (riferimento design)
│   └── fermento-site/        ← ✅ CODEBASE PRINCIPALE (React + Vite + TypeScript)
│       ├── src/
│       │   ├── components/   ← Header, Footer, Icon, Divider, ReservationForm
│       │   ├── data/         ← content.ts (dati statici, da sostituire con API)
│       │   ├── pages/        ← Home, ChiSiamo, Menu, MenuAdmin, Admin
│       │   ├── styles/       ← colors_and_type.css, site.css
│       │   ├── types.ts      ← interfacce TypeScript condivise
│       │   ├── App.tsx       ← router (HashRouter)
│       │   └── main.tsx      ← entry point
│       ├── public/assets/    ← logo e flourish serviti staticamente
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
└── chats/                    ← trascrizioni del design system originale
```

---

## Route del sito

| Percorso | Pagina | Descrizione |
|---|---|---|
| `#/` | Home | Hero, presentazione, galleria Ambiente, form prenotazione |
| `#/chi-siamo` | Chi siamo | Storia del locale, valori, form prenotazione |
| `#/menu` | Menù | Categorie con navigazione sticky, piatti, prezzi, tag dieta |
| `#/menu-admin` | Admin Menù | Login Supabase → tabella prodotti con CRUD |
| `#/admin` | Admin Prenotazioni | Login Supabase → tabella prenotazioni con filtri e conferma |

> Le route `/menu-admin` e `/admin` non sono nel nav pubblico (solo via URL).
> Login reale con Supabase Auth (email + password), condiviso tra le due sezioni.
> Vedi [ADMIN_AUTH.md](ADMIN_AUTH.md) per come funziona e come creare/gestire gli account admin.

---

## Avvio del Frontend (FE)

```bash
# 1. Entra nella cartella del progetto
cd project/fermento-site

# 2. Installa le dipendenze (solo la prima volta)
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su **http://localhost:5173**

### Altri comandi utili

```bash
# Type-check TypeScript senza compilare
npm run typecheck

# Build di produzione (tsc + vite build)
npm run build

# Anteprima della build di produzione
npm run preview
```

---

## Preparazione del Backend (BE)

Il backend è pianificato su **Supabase** (PostgreSQL + Auth + Realtime).

### Tabelle previste

```sql
-- Prenotazioni
CREATE TABLE reservations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date        date NOT NULL,
  time        text NOT NULL,
  people      int  NOT NULL,
  name        text NOT NULL,
  phone       text NOT NULL,
  email       text NOT NULL,
  note        text DEFAULT '',
  status      text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at  timestamptz DEFAULT now()
);

-- Prodotti del menù
CREATE TABLE menu_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  desc        text DEFAULT '',
  price       text NOT NULL,
  category_id text NOT NULL,
  category    text NOT NULL,
  tags        text[] DEFAULT '{}',
  active      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);
```

### Prossimi passi BE

1. Creare un progetto su [Supabase](https://supabase.com)
2. Aggiungere le variabili d'ambiente in `project/fermento-site/.env.local`:
   ```
   VITE_SUPABASE_URL=https://<project>.supabase.co
   VITE_SUPABASE_ANON_KEY=<anon-key>
   ```
3. Installare il client: `npm install @supabase/supabase-js`
4. Creare `src/lib/supabase.ts` e sostituire i dati statici in `src/data/content.ts` con chiamate API
5. Configurare Row Level Security (RLS) su Supabase per proteggere le route admin

---

## Design System

Il design system completo è in `project/`. Palette, tipografia, spaziature e componenti seguono
un'estetica *incisione ottocentesca*: inchiostro `#2C2E35` su carta crema `#F4ECDA`,
oro antico `#9C7C46` come unico accento, font Cinzel / Playfair Display / EB Garamond.

Vedi `project/README.md` e `project/SKILL.md` per i dettagli completi.
