# Fermento — Caffè · Bistrot · Design System

A monochrome, 19th-century **engraved-sign** identity for *Fermento*, an artisanal
caffè-bistrot in Bologna (lievito madre, in-house coffee roasting, market kitchen,
natural wine). The whole system descends from one asset — the ornate Fermento
wordmark — and extends it into type, colour, ornament and a full website.

> **Brief, in short:** vintage-elegant, like an Ottocento shop sign. Engraved
> lettering, ornamental flourishes, an artisanal-yet-refined mood. Monochrome
> like the logo — black ink on ivory/cream — with one discreet warm accent
> (antique gold / soft terracotta). Paper texture, fine decorative filets, lots
> of white space, no flat-modern effects.

---

## Sources

| Source | What it is | Notes |
|---|---|---|
| `uploads/logo Fermento Bistrot.pdf` | The original brand asset (Adobe Illustrator vector) | All-outlined vector engraving, ~1 MB, no embedded images or live text. Also kept at `assets/logo-fermento.pdf`. |

The logo was rasterised from the PDF's vector path list (the file's nested clip
paths hang ordinary renderers, so paths were replayed onto a canvas). From it we
derived: the **ink colour** (`#2C2E35`), the transparent wordmark, an ivory
reverse, and a **scroll-flourish ornament** cropped from the artwork.

There is **no prior codebase or Figma file** — this design system *is* the
ground truth. The website in `ui_kits/website/` is the primary product surface.

---

## What's here (index)

```
README.md                      ← this file
colors_and_type.css            ← canonical design tokens (colour + type + spacing)
SKILL.md                       ← Agent-Skill manifest (for Claude Code use)

assets/                        ← brand assets
  logo-fermento.png            ← wordmark, ink, transparent (2109×1148)
  logo-fermento-ivory.png      ← wordmark recoloured ivory, for dark grounds
  ornament-flourish.png        ← scroll flourish (ink), cropped from the logo
  ornament-flourish-gold.png   ← flourish, antique gold
  ornament-flourish-ivory.png  ← flourish, ivory (dark grounds)
  logo-fermento.pdf            ← original vector source

preview/                       ← Design-System tab cards (colour, type, components, brand)

ui_kits/website/               ← THE WEBSITE (React + Babel, hash-routed)
  index.html                   ← entry; loads all .jsx below
  site.css  colors_and_type.css
  data.jsx                     ← all realistic copy: menu, story, reservations
  components.jsx               ← atoms (Icon, Logo, Button, Field, Badge, Modal…)
  chrome.jsx                   ← Header + Footer
  ReservationForm.jsx          ← shared reservation block (Home & Chi siamo)
  admin-common.jsx             ← PasswordGate + AdminTop
  Home.jsx  About.jsx  Menu.jsx  MenuAdmin.jsx  ReservationsAdmin.jsx
  app.jsx                      ← hash router (#/ #/chi-siamo #/menu #/menu-admin #/admin)
  assets/                      ← logo + flourish copies (keeps the kit portable)
```

### Website routes
- `#/` **Home** — hero with the large logo + claim, presentation, *Ambiente*
  gallery, signature strip, and the table-reservation block.
- `#/chi-siamo` **Chi siamo** — long, written brand story with images, pull-quote,
  values, and the same reservation block at the foot.
- `#/menu` **Menù** — sticky category index (Colazioni · Pranzo · Aperitivi ·
  Dolci · Bevande), each with realistic dishes, descriptions, € prices, diet tags.
- `#/menu-admin` **Menù-Admin** — password gate (demo) → editable product table
  with *Aggiungi / Modifica / Elimina* and an insert/edit modal.
- `#/admin` **Admin prenotazioni** — password gate (demo) → reservations table
  with stat cards, date + status filters, and *Conferma / Cancella* per row.
- Admin routes are **not** in the public nav (reachable only by URL/hash), per brief.

> All data is **static sample data** — the front-end is complete and navigable;
> reservations & menu persistence will be wired to **Supabase** later.

---

## CONTENT FUNDAMENTALS

**Language.** Italian, throughout — including UI labels, buttons and admin.

**Voice.** Warm, artisanal, unhurried — a neighbourhood bottega that takes its
time. Sensory and concrete (lievito madre, marmo di Verona, ottone, Appennino),
never corporate or salesy. Lightly literary but plain-spoken.

**Person.** Speaks as *noi* ("la nostra pasta madre", "tostiamo il caffè") and
addresses the guest as the formal-plural *voi* ("Vi aspettiamo", "Riservate la
vostra tavola"). Never the casual *tu*.

**Casing.** Sentence case for body and headings. **Engraved labels, eyebrows,
nav and buttons are UPPERCASE** with wide tracking (the inscription motif).
Titles use Italian capitalisation (only first word + proper nouns).

**Punctuation & detail.** Italian guillemets «…» for names/quotes; the middot ·
as a separator ("Caffè · Bistrot", "7 · Bologna"); € prices written the Italian
way with a comma — **€ 13,00**, space after the symbol. Dates in full Italian
("5 giugno 2026"). Times 24-hour ("20:30").

**No emoji. No exclamation spam.** At most one warm "!" in a confirmation
("Grazie, Giulia!"). Ornament is carried by type and filets, not punctuation.

**Examples.**
- Claim: *"Dove il tempo lievita lento — caffè di torrefazione artigianale,
  cucina di mercato e buon vino, dal mattino al calar della sera."*
- Eyebrow: `LA NOSTRA BOTTEGA` · `PRENOTAZIONI` · `L'AMBIENTE`
- Menu item: **Tagliatelle al ragù bianco** — *Sfoglia tirata a mano, ragù
  bianco di maiale e finocchietto.* — **€ 13,00**
- Pull-quote: *«Un bistrot dovrebbe assomigliare al suo quartiere — e nutrirlo,
  ogni giorno, con la generosità di una tavola di famiglia.»*

---

## VISUAL FOUNDATIONS

**Overall.** A printed Ottocento shop sign brought to the screen: ink on cream,
fine engraving, scrollwork, abundant white space. Calm, symmetrical, centred.

**Colour.** Strictly monochrome + one warm accent.
- *Ink* `#2C2E35` (sampled from the logo) with a 900–300 scale for headings,
  text, secondary and faint captions.
- *Cream grounds* — base `#F4ECDA`, raised `#FBF6EA`, alternate bands `#ECE2CC` /
  `#E4D8BE`, and a dark **ink ground** `#23252B` for the footer and the
  reservation block (the only "inverted" surfaces).
- *Accent* — **antique gold** (`#9C7C46`, deep `#7E6231`) used sparingly for
  prices, eyebrows, filets, small detail. **Terracotta** `#AE5A3C` only for
  required-field marks and destructive actions. Never gradients of accent.

**Type.** Three Google-Fonts families standing in for the logo's custom
engraving (see *Substitutions* below):
- **Cinzel** — engraved Roman capitals → eyebrows, nav, buttons, labels, menu
  category heads. Always UPPERCASE, tracking `0.12–0.28em`.
- **Playfair Display** — high-contrast Didone → H1–H3, claims, pull-quotes;
  weights 400–900, italics for decorative leads.
- **EB Garamond** — sober old-style serif → all body copy, menu items,
  descriptions; italic for leads and captions.

**Background & texture.** Cream paper with a very faint `feTurbulence` grain
(opacity ~0.05) layered site-wide. No photographic hero backgrounds — imagery
sits inside framed **photo plates**. Sections separate by colour band + a 1px
filet, occasionally a centred flourish or `❦ / ❧` ornament.

**Imagery.** Warm, slightly sepia duotone (`sepia(.32) saturate(.85)`), always
inside a keyline-framed plate with an inner cream rule. Placeholders are labelled
*"Fotografia"* — see Caveats. Aspect ratios: wide 16:10, tall 3:4, square 1:1.

**Borders & filets.** Hairlines at `rgba(44,46,53,.16)`; stronger `.32`; gold
`rgba(156,124,70,.55)`. Menu separators are **dotted**. The `.filet` double-rule
and the logo-derived flourish are the signature dividers.

**Corner radii.** Almost square — **1–3px** everywhere (vintage print feel).
Only badges/pills and circular seals/locks are fully round.

**Cards.** Cream `#FBF6EA`, 1px hairline border, 3px radius, soft paper shadow
(`0 8px 28px rgba(28,30,35,.07)`) — never glossy, never heavy. A `.framed`
variant adds an inset double-keyline instead of shadow.

**Shadows.** Two soft levels only (`--shadow-card`, `--shadow-raise`); colour is
ink at 5–10% — diffuse, paper-like. No coloured or neon shadows.

**Elevation & blur.** The sticky header and the sticky menu index use a cream
`backdrop-filter: blur(8px)` veil — the only use of blur. No glassmorphism
elsewhere.

**Motion.** Restrained and dignified. Entrance is a 480ms *translate-up only*
(no opacity fade that could strand content), gated to
`prefers-reduced-motion: no-preference`. Hovers are ~320ms `cubic-bezier(.22,.61,.36,1)`.
No bounce, no parallax, no looping decoration.

**Hover / press.**
- Primary button → darkens to `#1C1E23` and lifts `-1px`; settles on press.
- Outline/ghost → faint ink wash `rgba(44,46,53,.04–.05)` + border darkens.
- Links → gold-deep, easing toward ink on hover.
- Inputs → border becomes gold + a 3px `rgba(156,124,70,.14)` focus ring.
- Table rows → faint gold wash `rgba(156,124,70,.05)`.

**Layout rules.** Centred, max 1180px (narrow 760px for prose); section padding
~96px; sticky header at 78px; everything symmetrical. Generous whitespace is the
primary "luxury" signal.

---

## ICONOGRAPHY

Two distinct registers, kept separate on purpose:

1. **Brand ornament** comes *only* from the logo. The scroll flourish
   (`assets/ornament-flourish*.png`) is the hero divider; for inline separators
   we use typographic ornaments — **❦** (floral heart) and **❧** (rotated
   hedera) — plus the `.filet` double-rule and `·` middot. No hand-drawn brand
   SVGs were invented; the flourish is cropped from the real artwork.

2. **Functional UI icons** use a single inline **thin-stroke (1.6px) line set**
   in the spirit of *Lucide / Feather*, defined as path data in
   `components.jsx` (`<Icon name="…">`). The thin, even stroke echoes the
   engraving. Set in use: `plus, edit, trash, check, x, lock, clock, calendar,
   users, phone, mail, mapPin, menu, search, filter, arrowRight, logout`.
   They inherit `currentColor`, so they take ink, gold or terracotta from context.

   > **Substitution flag:** these are *Lucide-style* glyphs drawn inline, not the
   > Lucide package. If you'd prefer the genuine Lucide/Feather set, swap the
   > `ICON_PATHS` map for the CDN — the names already match Lucide.

**Emoji:** never. **Unicode glyphs** are used only as decorative ornaments
(❦ ❧ ✦ ·), never as functional icons.

---

## Substitutions to confirm

- **Fonts.** The logo's *FERMENTO* lettering and *CAFFÈ-BISTROT* caps are custom,
  hand-built engraving — not a retail typeface. We stand in with **Cinzel**
  (engraved caps), **Playfair Display** (display), **EB Garamond** (body), all
  from Google Fonts. If you own the original face (or want a closer fat-face
  Tuscan for big titles), send it and we'll swap `--font-display` / `--font-engrave`.
- **Icons.** Lucide-style inline paths (see Iconography).
- **Photography.** All imagery is placeholder plates — real photos needed.

See `SKILL.md` for how to reuse this system in other tools.
