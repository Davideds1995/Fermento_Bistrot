import type { HoursEntry, AtmosphereEntry, AboutSection } from '../types'
import type { Lang } from '../lib/i18n'

/* ============================================================
   FERMENTO — content data (realistic Italian bistrot copy)
   Static sample data. Wire to Supabase later.
   ============================================================ */

export const COPY = {
  it: {
    claim: "Dove il tempo lievita lento — cucina ricercata e buon vino, dal mattino al calar della sera.",
    est: "Fondato nel 2014 · Roma",
    introTitle: "Una bottega del gusto, dal vino all'olio",
    introBody:
      "Fermento nasce dall'idea che le cose buone richiedono tempo. Tradizione e ricerca rendono un'esperienza unica il vostro momento. Vi accogliamo dalla colazione fino alla cena in una sala dove il marco, il legno e l'ottone raccontano un'elenganza senza fretta.",
  },
  en: {
    claim: "Where time rises slowly — refined cooking and good wine, from morning until dusk.",
    est: "Founded in 2014 · Rome",
    introTitle: "A shop of taste, from wine to oil",
    introBody:
      "Fermento was born from the idea that good things take time. Tradition and research make your moment a unique experience. We welcome you from breakfast until dinner in a room where marble, wood and brass speak of an unhurried elegance.",
  },
};

export const ABOUT: Record<Lang, AboutSection[]> = {
  it: [
    {
      h: "Un piatto che nasce da ore, non da minuti",
      p: "La guancia di manzo cuoce a lungo nel suo fondo, finché la carne non cede alla forchetta. La serviamo su una crema di patate, chiusa da una riduzione al vino rosso e rosmarino fresco: è il piatto che racconta meglio la nostra idea di cucina — poca fretta, molta ricerca, un gusto che si costruisce per strati e non per scorciatoie.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/guancia.webp"
    },
    {
      h: "Un tagliere, tante materie prime da raccontare",
      p: "Selezioniamo formaggi di piccola produzione — vaccino, pecorino, caciotte stagionate — e li accompagniamo con miele al tartufo, confetture di stagione e noci. Ogni tagliere è un piccolo censimento dei produttori con cui lavoriamo: caseifici a conduzione familiare, apicoltori, chi ancora fa le cose con lentezza.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/miele.webp"
    },
    {
      h: "La tavola, fuori, tra amici",
      p: "Quando il tempo lo permette la sala si allunga in strada: tavoli conditi da piatti pensati per essere condivisi, pomodori e mozzarella di giornata, un bicchiere d'acqua sempre pieno. È l'ora in cui il servizio rallenta e le chiacchiere si allungano — la parte del nostro mestiere che non sta in nessuna ricetta.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/tavolo.webp"
    },
    {
      h: "Una cantina che racconta l'Italia, calice dopo calice",
      p: "Dietro il bancone custodiamo un'ampia selezione di etichette — bollicine, rossi importanti, vini naturali di piccoli produttori — scelta per accompagnare ogni piatto del menù, dall'aperitivo al fine cena. La collezione cresce ogni stagione, guidata da chi il vino lo assaggia prima di metterlo in carta.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/vini.webp"
    },
  ],
  en: [
    {
      h: "A dish born from hours, not minutes",
      p: "The beef cheek cooks slowly in its own juices, until the meat gives way to the fork. We serve it over a potato cream, finished with a red wine and fresh rosemary reduction: it's the dish that best tells our idea of cooking — little haste, much research, a flavour built in layers rather than shortcuts.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/guancia.webp"
    },
    {
      h: "A sharing board, many stories to tell",
      p: "We select small-production cheeses — cow's milk, pecorino, aged caciotte — paired with truffle honey, seasonal preserves and walnuts. Every board is a small census of the producers we work with: family-run dairies, beekeepers, people who still do things slowly.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/miele.webp"
    },
    {
      h: "The table, outside, among friends",
      p: "When the weather allows, the room stretches out onto the street: tables laid with dishes meant to be shared, tomatoes and mozzarella of the day, a glass of water always full. It's the hour when service slows down and conversation lengthens — the part of our craft that's in no recipe.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/tavolo.webp"
    },
    {
      h: "A cellar that tells Italy's story, glass after glass",
      p: "Behind the counter we keep a wide selection of labels — sparkling wines, important reds, natural wines from small producers — chosen to accompany every dish on the menu, from aperitivo to the end of dinner. The collection grows every season, guided by those who taste the wine before putting it on the list.",
      img: "https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/vini.webp"
    },
  ],
};

export const ATMOSPHERE: Record<Lang, AtmosphereEntry[]> = {
  it: [
    { n: "I", title: "La cantina, calice dopo calice", desc: "Un rosso in carta, il pane appena scaldato, le luci della strada che si accendono: il vino non è un accessorio, è una selezione che curiamo etichetta per etichetta.", slot: "atm-1", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/calice-e-pane.webp"},
    { n: "II", title: "La materia prima, prima di tutto", desc: "Una tartare al coltello nasce da un solo ingrediente scelto bene: carne selezionata, tagliata a mano, condimenti che accompagnano senza coprire.", slot: "atm-2", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/tartare.webp" },
    { n: "III", title: "La ricerca dietro ogni piatto", desc: "Una pappardella al ragù lento, pensata per stare accanto a un grande rosso come il Brunello di Montalcino: ogni accostamento in carta nasce da prove e assaggi in cucina.", slot: "atm-3", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/pasta-e-vino.webp" },
  ],
  en: [
    { n: "I", title: "The cellar, glass after glass", desc: "A red on the list, bread just warmed, the street lights coming on: wine isn't an accessory, it's a selection we curate label by label.", slot: "atm-1", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/calice-e-pane.webp"},
    { n: "II", title: "The ingredient, above all else", desc: "A hand-cut tartare is born from a single well-chosen ingredient: selected meat, hand-cut, dressings that complement without covering.", slot: "atm-2", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/tartare.webp" },
    { n: "III", title: "The research behind every dish", desc: "A pappardella with slow-cooked ragù, designed to sit alongside a great red like Brunello di Montalcino: every pairing on the menu comes from trials and tastings in the kitchen.", slot: "atm-3", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/pasta-e-vino.webp" },
  ],
};

export const HOURS: Record<Lang, HoursEntry[]> = {
  it: [
    { d: "Lunedì – Venerdì", h: "06:30 – 15:00 / 18:00 – 00:00" },
    { d: "Sabato – Domenica", h: "07:00 – 15:00 / 18:00 – 00:00" },
  ],
  en: [
    { d: "Monday – Friday", h: "06:30 – 15:00 / 18:00 – 00:00" },
    { d: "Saturday – Sunday", h: "07:00 – 15:00 / 18:00 – 00:00" },
  ],
};

export const COPERTO = "2";

export const ALLERGENS: Record<Lang, { n: string; label: string }[]> = {
  it: [
    { n: "A", label: "Arachidi e derivati" },
    { n: "B", label: "Frutta a guscio" },
    { n: "C", label: "Latte e latticini" },
    { n: "D", label: "Molluschi" },
    { n: "E", label: "Pesce" },
    { n: "F", label: "Sesamo e semi" },
    { n: "G", label: "Soia" },
    { n: "H", label: "Crostacei" },
    { n: "I", label: "Glutine" },
    { n: "L", label: "Lupini" },
    { n: "M", label: "Senape" },
    { n: "N", label: "Sedano" },
    { n: "O", label: "Anidride solforosa" },
    { n: "P", label: "Uova" },
  ],
  en: [
    { n: "A", label: "Peanuts and derivatives" },
    { n: "B", label: "Tree nuts" },
    { n: "C", label: "Milk and dairy" },
    { n: "D", label: "Molluscs" },
    { n: "E", label: "Fish" },
    { n: "F", label: "Sesame and seeds" },
    { n: "G", label: "Soy" },
    { n: "H", label: "Crustaceans" },
    { n: "I", label: "Gluten" },
    { n: "L", label: "Lupin" },
    { n: "M", label: "Mustard" },
    { n: "N", label: "Celery" },
    { n: "O", label: "Sulphur dioxide" },
    { n: "P", label: "Eggs" },
  ],
};

/* ---- date helpers ---- */
const MESI: Record<Lang, string[]> = {
  it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
export function formatDate(iso: string, lang: Lang = 'it') {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESI[lang][m - 1]} ${y}`;
}
export function formatDateShort(iso: string, lang: Lang = 'it') {
  const [, m, d] = iso.split("-").map(Number);
  const mesi: Record<Lang, string[]> = {
    it: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  };
  return `${d} ${mesi[lang][m - 1]}`;
}
