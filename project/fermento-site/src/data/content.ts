import type { MenuCategory, Product, Reservation, HoursEntry, AtmosphereEntry, AboutSection } from '../types'

/* ============================================================
   FERMENTO — content data (realistic Italian bistrot copy)
   Static sample data. Wire to Supabase later.
   ============================================================ */

export const COPY = {
  claim: "Dove il tempo lievita lento — caffè di torrefazione artigianale, cucina di mercato e buon vino, dal mattino al calar della sera.",
  est: "Fondato nel 2014 · Bologna",
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
  { n: "I", title: "Il bancone all'alba", desc: "Brioche calde, caffè in tazza grande e il primo sole che entra dalle vetrine.", slot: "atm-1" },
  { n: "II", title: "La sala conviviale", desc: "Marmo, ottone e il lungo tavolo di noce dove i tavoli si incontrano.", slot: "atm-2" },
  { n: "III", title: "L'ora dell'aperitivo", desc: "Calici di naturale, taglieri del nostro casaro e luce dorata di sera.", slot: "atm-3" },
];

/* ---- Menu: categories with realistic Italian bistrot items ---- */
export const MENU: MenuCategory[] = [
  {
    id: "colazioni", name: "Colazioni", note: "Servite dalle 7:30 alle 11:30",
    items: [
      { id: "c1", name: "Cappuccino & cornetto", desc: "Cornetto sfogliato a lievito madre, vuoto o con confettura di albicocche.", price: "3,80", tags: [] },
      { id: "c2", name: "Caffè della casa", desc: "Miscela arabica a tostatura chiara, estratta in espresso o filtro.", price: "1,50", tags: [] },
      { id: "c3", name: "Uova alla Genoveffa", desc: "Uova in cocotte, pane tostato a lievito madre, erba cipollina.", price: "8,50", tags: ["veg"] },
      { id: "c4", name: "Yogurt, granola & miele", desc: "Yogurt di malga, granola tostata in casa, miele di castagno.", price: "6,50", tags: ["veg"] },
      { id: "c5", name: "Pane, burro & marmellata", desc: "Pagnotta di grani antichi, burro di affioramento, confettura del giorno.", price: "5,00", tags: ["veg"] },
    ],
  },
  {
    id: "pranzo", name: "Pranzo", note: "Servito dalle 12:00 alle 15:00",
    items: [
      { id: "p1", name: "Tagliatelle al ragù bianco", desc: "Sfoglia tirata a mano, ragù bianco di maiale e finocchietto.", price: "13,00", tags: [] },
      { id: "p2", name: "Risotto alla zucca & taleggio", desc: "Carnaroli mantecato, zucca arrosto, taleggio di grotta.", price: "12,50", tags: ["veg"] },
      { id: "p3", name: "Insalata del fermento", desc: "Farro, radicchio tardivo, noci, pere e scaglie di Parmigiano.", price: "11,00", tags: ["veg"] },
      { id: "p4", name: "Polpette di bollito", desc: "Polpette di recupero, salsa verde e purè di patate di montagna.", price: "13,50", tags: [] },
      { id: "p5", name: "Sandwich di mortadella", desc: "Pane al latte, mortadella di Bologna, crema di pistacchio.", price: "9,00", tags: [] },
      { id: "p6", name: "Zuppa del giorno", desc: "Verdure di mercato e legumi, crostino all'olio nuovo. Chiedete al servizio.", price: "9,50", tags: ["veg", "vegan"] },
    ],
  },
  {
    id: "aperitivi", name: "Aperitivi", note: "Dalle 18:00 — accompagnati da stuzzichini della casa",
    items: [
      { id: "a1", name: "Spritz Fermento", desc: "Aperitivo artigianale dell'Appennino, prosecco e scorza d'arancia.", price: "7,00", tags: [] },
      { id: "a2", name: "Calice di vino naturale", desc: "Selezione di vignaioli del giorno: bianco, rosso o macerato.", price: "6,00", tags: [] },
      { id: "a3", name: "Tagliere del casaro", desc: "Quattro formaggi di malga, miele, mostarda e pane tostato.", price: "14,00", tags: ["veg"] },
      { id: "a4", name: "Tagliere del norcino", desc: "Salumi dell'Appennino, giardiniera fatta in casa, focaccia.", price: "15,00", tags: [] },
      { id: "a5", name: "Olive ascolane & frittura", desc: "Olive ripiene, salvia e fiori di zucca in pastella leggera.", price: "8,00", tags: ["veg"] },
    ],
  },
  {
    id: "dolci", name: "Dolci", note: "Dal nostro laboratorio di pasticceria",
    items: [
      { id: "d1", name: "Tiramisù al cucchiaio", desc: "Savoiardi inzuppati nel nostro espresso, crema al mascarpone.", price: "6,50", tags: ["veg"] },
      { id: "d2", name: "Torta di mele e lievito madre", desc: "Mele renette, impasto lievitato, gelato alla vaniglia bourbon.", price: "7,00", tags: ["veg"] },
      { id: "d3", name: "Bonet piemontese", desc: "Budino al cacao, amaretti e un cucchiaio di rum.", price: "6,00", tags: ["veg"] },
      { id: "d4", name: "Sorbetto al limone & timo", desc: "Sorbetto agli agrumi di Sicilia con timo del nostro orto.", price: "5,50", tags: ["vegan"] },
    ],
  },
  {
    id: "bevande", name: "Bevande", note: "Caffetteria, infusi e cantina",
    items: [
      { id: "b1", name: "Espresso / Macchiato", desc: "Miscela della casa, tostata a Bologna ogni settimana.", price: "1,50", tags: [] },
      { id: "b2", name: "Caffè filtro V60", desc: "Monorigine in rotazione, estratto a mano al bancone.", price: "4,00", tags: [] },
      { id: "b3", name: "Cioccolata calda densa", desc: "Cacao monorigine, panna montata a parte.", price: "5,00", tags: ["veg"] },
      { id: "b4", name: "Infuso d'erbe dell'Appennino", desc: "Tisana di montagna, menta, melissa e fiori.", price: "4,50", tags: ["vegan"] },
      { id: "b5", name: "Bottiglia di vino naturale", desc: "Carta dei vini in continua evoluzione. Chiedete la lista completa.", price: "24,00", tags: [] },
    ],
  },
];

/* flat product list for the menu-admin table */
export const PRODUCTS: Product[] = MENU.flatMap(cat =>
  cat.items.map(it => ({ ...it, category: cat.name, categoryId: cat.id }))
);

/* ---- Sample reservations for /admin ---- */
export const RESERVATIONS: Reservation[] = [
  { id: "R-1042", date: "2026-06-05", time: "13:00", people: 2, name: "Giulia Ferrari", phone: "+39 340 118 4477", email: "giulia.ferrari@gmail.com", note: "Tavolo vicino alla finestra, se possibile.", status: "confirmed" },
  { id: "R-1043", date: "2026-06-05", time: "20:30", people: 4, name: "Marco De Santis", phone: "+39 333 902 1180", email: "m.desantis@outlook.it", note: "Allergia alle noci per un commensale.", status: "pending" },
  { id: "R-1044", date: "2026-06-05", time: "19:00", people: 6, name: "Studio Lombardi", phone: "+39 051 224 880", email: "eventi@studiolombardi.it", note: "Cena di lavoro, fattura aziendale.", status: "confirmed" },
  { id: "R-1045", date: "2026-06-06", time: "12:30", people: 2, name: "Elena Conti", phone: "+39 347 556 9021", email: "elena.conti@libero.it", note: "", status: "pending" },
  { id: "R-1046", date: "2026-06-06", time: "21:00", people: 3, name: "Paolo Ricci", phone: "+39 320 447 1199", email: "paolo.ricci@gmail.com", note: "Anniversario — gradito un dolce con candelina.", status: "confirmed" },
  { id: "R-1047", date: "2026-06-06", time: "13:30", people: 5, name: "Famiglia Greco", phone: "+39 348 771 2245", email: "greco.fam@gmail.com", note: "Seggiolone per bambino.", status: "cancelled" },
  { id: "R-1048", date: "2026-06-07", time: "11:00", people: 2, name: "Sofia Marchetti", phone: "+39 351 660 3398", email: "sofia.m@icloud.com", note: "Brunch tranquillo.", status: "pending" },
  { id: "R-1049", date: "2026-06-07", time: "20:00", people: 8, name: "Compleanno Bruno", phone: "+39 342 889 1102", email: "bruno.r@gmail.com", note: "Tavolo unico, brindisi a sorpresa.", status: "confirmed" },
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
