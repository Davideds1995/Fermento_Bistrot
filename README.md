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

## SEO

Il sito è una **SPA** (Single Page Application): esiste un solo `index.html`, e React Router
scambia il contenuto della pagina via JavaScript in base all'URL. Google e Bing eseguono
JavaScript prima di indicizzare, quindi questo approccio funziona — ma di default un solo
`<head>` servirebbe per *tutte* le pagine (stesso titolo, stessa descrizione ovunque). Il
setup SEO risolve questo, più il blocco delle aree riservate.

### File statici

| File | Ruolo |
|---|---|
| `public/robots.txt` | Regole di crawling per i motori di ricerca |
| `public/sitemap.xml` | Elenco delle pagine pubbliche indicizzabili |

**`robots.txt`**
```
User-agent: *
Disallow: /admin
Disallow: /menu-admin
Allow: /

Sitemap: https://fermentobistrot.com/sitemap.xml
```
`User-agent: *` si applica a tutti i crawler (Googlebot, Bingbot compresi — non serve
differenziarli a meno di regole diverse per bot specifici). `Disallow` dice di non
*scansionare* quelle route; `Sitemap` indica dove trovare l'elenco delle pagine da indicizzare.

**`sitemap.xml`** elenca `/`, `/chi-siamo`, `/menu` con priorità e frequenza di aggiornamento
indicative. È statico: se si aggiunge una nuova pagina pubblica va aggiornato a mano.

> ⚠️ `robots.txt` impedisce la *scansione*, non garantisce da solo che una pagina non venga
> mai mostrata nei risultati (se qualcuno la linka da fuori, un motore di ricerca può comunque
> indicizzarla "alla cieca", senza contenuto). Per le pagine admin la barriera che conta
> davvero è il tag `<meta name="robots" content="noindex, nofollow">`, impostato via
> `Seo.tsx` — vedi sotto.

### `src/components/Seo.tsx` — come funziona

Componente "invisibile" (ritorna `null`) che ogni pagina monta per riscrivere manualmente i
tag `<head>` in base a se stessa. Non usa librerie esterne (niente `react-helmet`): è
manipolazione diretta del DOM tramite `useEffect`.

**1. Perché serve un helper "trova o crea"**

Un tag come `<meta name="description">` esiste già in `index.html`. Se ogni cambio pagina ne
creasse uno nuovo senza controllare, l'`<head>` finirebbe con decine di meta duplicati — i
motori di ricerca si confondono su quale usare. La regola è sempre *cerca, se esiste
aggiorna, altrimenti crea*:

```ts
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
```

`attr` distingue due standard diversi: i meta "normali" e Twitter usano `name="..."`
(`<meta name="description">`), mentre Open Graph (Facebook/WhatsApp) usa `property="..."`
(`<meta property="og:title">`). `setLink()` fa lo stesso per i tag `<link>` (usato per il
`canonical`).

**2. Perché `useEffect` e non codice diretto nel corpo del componente**

Toccare `document.head` è un *side effect*: modifica qualcosa fuori dall'albero React. React
vuole che questi effetti girino dopo il render, non durante — è la regola base degli hook.
L'array di dipendenze alla fine (`[title, description, path, noindex, image, jsonLd]`) dice a
React di rilanciare l'effetto solo quando una di quelle props cambia: è quello che fa
aggiornare i tag quando si naviga da una pagina all'altra.

**3. Il caso JSON-LD (dati strutturati)**

```ts
let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]')
if (jsonLd) {
  if (!script) { /* crea lo <script type="application/ld+json"> */ }
  script.textContent = JSON.stringify(jsonLd)
} else if (script) {
  script.remove()
}
```

Stesso pattern "trova o crea", ma con una rimozione esplicita: se la pagina corrente non
passa `jsonLd` (es. `/chi-siamo`) e prima c'era uno script lasciato da un'altra pagina (es.
Home), va **rimosso** — altrimenti resterebbe lì, sbagliato per quella pagina. L'attributo
`data-seo-jsonld="true"` serve solo a riconoscere "il nostro" script tra i tanti presenti
nell'head.

**4. Uso in una pagina**

```tsx
<Seo
  title="Menù — Fermento Caffè Bistrot Roma"
  description="Scopri il menù di Fermento: colazione, cucina di mercato, taglieri e vini naturali."
  path="/menu"
/>
```

Per le pagine admin si aggiunge `noindex` — questo fa scrivere
`<meta name="robots" content="noindex, nofollow">` invece di `index, follow`, la vera difesa
contro l'indicizzazione (vedi nota sopra su `robots.txt`).

**5. Limite da conoscere**

Questo approccio funziona bene per Google e Bing perché entrambi eseguono JavaScript prima di
indicizzare. Non basterebbe per crawler "primitivi" che leggono solo l'HTML grezzo (alcuni bot
di anteprima social più datati, alcuni scraper). Per quella garanzia servirebbe SSR o
prerendering statico (Next.js, Astro, o un prerender build-time) — non necessario per le
esigenze attuali del sito.

### Dati strutturati (JSON-LD) sulla Home

`Home.tsx` passa a `Seo` un oggetto `JSON_LD` di tipo `CafeOrCoffeeShop` (schema.org) con
indirizzo, telefono e orari di apertura. È quello che permette a Google di mostrare una scheda
"locale" arricchita (orari, indirizzo, tipo di attività) nei risultati di ricerca, invece del
solo link blu.

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
           text[] DEFAULT '{}',
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
