import type { HoursEntry, AtmosphereEntry, AboutSection } from '../types'

/* ============================================================
   FERMENTO — content data (realistic Italian bistrot copy)
   Static sample data. Wire to Supabase later.
   ============================================================ */

export const COPY = {
  claim: "Dove il tempo lievita lento — cucina ricercata e buon vino, dal mattino al calar della sera.",
  est: "Fondato nel 2017 · Roma",
  introTitle: "Una bottega del gusto, dal lievito al calice",
  introBody:
    "Fermento nasce dall'idea che le cose buone richiedano tempo. Il pane fermenta con lievito madre per trentasei ore, il caffè riposa dopo la tostatura, il vino attende nella nostra piccola cantina. Vi accogliamo dalla colazione all'aperitivo in una sala dove il marmo, il legno e l'ottone raccontano un'eleganza senza fretta.",
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
  { d: "Lunedì", h: "Chiuso" },
  { d: "Martedì – Venerdì", h: "07:30 – 23:00" },
  { d: "Sabato", h: "08:30 – 24:00" },
  { d: "Domenica", h: "08:30 – 16:00" },
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
