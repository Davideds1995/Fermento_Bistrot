import type { HoursEntry, AtmosphereEntry, AboutSection } from '../types'

/* ============================================================
   FERMENTO — content data (realistic Italian bistrot copy)
   Static sample data. Wire to Supabase later.
   ============================================================ */

export const COPY = {
  claim: "Dove il tempo lievita lento — caffè di torrefazione artigianale, cucina di mercato e buon vino, dal mattino al calar della sera.",
  est: "Fondato nel 2017 · Roma",
  introTitle: "Una bottega del gusto, dal lievito al calice",
  introBody:
    "Fermento nasce dall'idea che le cose buone richiedano tempo. Il pane fermenta con lievito madre per trentasei ore, il caffè riposa dopo la tostatura, il vino attende nella nostra piccola cantina. Vi accogliamo dalla colazione all'aperitivo in una sala dove il marmo, il legno e l'ottone raccontano un'eleganza senza fretta.",
};

export const ABOUT: AboutSection[] = [
  {
    h: "Il principio di una fermentazione",
    p: "Tutto cominciò in una vecchia drogheria del centro, di quelle con gli scaffali fino al soffitto e l'odore di caffè tostato che si attaccava ai cappotti. Era il 2014 quando Lucia e Tommaso Bianchi rilevarono quei quaranta metri quadri di storia bolognese, decisi a farne qualcosa che somigliasse alle botteghe di una volta — ma con la cura di chi ha studiato il mestiere nelle cucine e nei caffè d'Europa."
  },
  {
    h: "Il lievito madre e le ore lente",
    p: "Il nome non è un vezzo. Fermento è il nostro modo di intendere il cibo: una lunga attesa che trasforma la materia. La nostra pasta madre, battezzata «Genoveffa», ha più anni del locale e viene rinfrescata ogni alba. Da lei nascono i pani, le brioche sfogliate a mano e i lievitati che riempiono la vetrina al mattino. Nulla ha fretta, da noi: nemmeno il caffè, che lasciamo riposare dopo la tostatura prima di macinarlo all'istante."
  },
  {
    h: "La sala, l'ottone e il marmo",
    p: "Abbiamo conservato il bancone originale in marmo di Verona e le vetrine in legno di noce, aggiungendo specchi molati, lampade d'ottone e un lungo tavolo conviviale ricavato da una vecchia porta di cascina. Volevamo una sala che invitasse a restare: a leggere il giornale davanti a un cappuccino, a discutere di vino al tramonto, a festeggiare senza guardare l'orologio."
  },
  {
    h: "Di mercato, di stagione, di vicinato",
    p: "La cucina cambia con ciò che il mercato offre. Lavoriamo con un piccolo cerchio di contadini, casari e vignaioli dell'Appennino: le uova arrivano da Monghidoro, il Parmigiano da una stalla di trentasei mesi, le verdure dall'orto di Sasso Marconi. Crediamo che un bistrot debba assomigliare al suo quartiere — e nutrirlo, ogni giorno, con la stessa generosità di una tavola di famiglia."
  },
];

export const ATMOSPHERE: AtmosphereEntry[] = [
  { n: "I", title: "Il bancone all'alba", desc: "Brioche calde, caffè in tazza grande e il primo sole che entra dalle vetrine.", slot: "atm-1", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/calice-e-pane.webp"},
  { n: "II", title: "La sala conviviale", desc: "Marmo, ottone e il lungo tavolo di noce dove i tavoli si incontrano.", slot: "atm-2", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/tartare.webp" },
  { n: "III", title: "L'ora dell'aperitivo", desc: "Calici di naturale, taglieri del nostro casaro e luce dorata di sera.", slot: "atm-3", img:"https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/pasta-e-vino.webp" },
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
