import type { HoursEntry, AtmosphereEntry, AboutSection } from '../types'

/* ============================================================
   FERMENTO — content data (realistic Italian bistrot copy)
   Static sample data. Wire to Supabase later.
   ============================================================ */

export const COPY = {
  claim: "Dove il tempo lievita lento — cucina ricercata e buon vino, dal mattino al calar della sera.",
  est: "Fondato nel 2014 · Roma",
  introTitle: "Una bottega del gusto, dal vino all'olio",
  introBody:
    "Fermento nasce dall'idea che le cose buone richiedono tempo. Tradizione e ricerca rendono un'esperienza unica il vostro momento. Vi accogliamo dalla colazione fino alla cena in una sala dove il marco, il legno e l'ottone raccontano un'elenganza senza fretta.",
};

export const ABOUT: AboutSection[] = [
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
    img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/vini.webp"
  },
];

export const ATMOSPHERE: AtmosphereEntry[] = [
  { n: "I", title: "La cantina, calice dopo calice", desc: "Un rosso in carta, il pane appena scaldato, le luci della strada che si accendono: il vino non è un accessorio, è una selezione che curiamo etichetta per etichetta.", slot: "atm-1", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/calice-e-pane.webp"},
  { n: "II", title: "La materia prima, prima di tutto", desc: "Una tartare al coltello nasce da un solo ingrediente scelto bene: carne selezionata, tagliata a mano, condimenti che accompagnano senza coprire.", slot: "atm-2", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/tartare.webp" },
  { n: "III", title: "La ricerca dietro ogni piatto", desc: "Una pappardella al ragù lento, pensata per stare accanto a un grande rosso come il Brunello di Montalcino: ogni accostamento in carta nasce da prove e assaggi in cucina.", slot: "atm-3", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/pasta-e-vino.webp" },
];

export const HOURS: HoursEntry[] = [
  { d: "Lunedì – Venerdì", h: "06:30 – 15:00 / 18:00 – 00:00" },
  { d: "Sabato – Domenica", h: "07:00 – 15:00 / 18:00 – 00:00" },
];

export const COPERTO = "1,80";

export const ALLERGENS: { n: string; label: string }[] = [
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
];

/* ---- date helpers ---- */
const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
export function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESI[m - 1]} ${y}`;
}
export function formatDateShort(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  const mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
  return `${d} ${mesi[m - 1]}`;
}
