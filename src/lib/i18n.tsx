import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'it' | 'en'

const STORAGE_KEY = 'fermento-lang'

const dict = {
  header: {
    home: { it: 'Home', en: 'Home' },
    about: { it: 'Chi siamo', en: 'About us' },
    menu: { it: 'Menù', en: 'Menu' },
    book: { it: 'Prenota', en: 'Book a table' },
  },
  footer: {
    whereWeAre: { it: 'Dove siamo', en: 'Where we are' },
    hours: { it: 'Orari', en: 'Opening hours' },
    theVenue: { it: 'Il locale', en: 'The venue' },
    about: { it: 'Chi siamo', en: 'About us' },
    menu: { it: 'Il menù', en: 'The menu' },
    book: { it: 'Prenota un tavolo', en: 'Book a table' },
    privacy: { it: 'Privacy', en: 'Privacy' },
    callUs: { it: 'Chiama', en: 'Call us' },
    reviewOnTripadvisor: { it: 'Recensiscici su TripAdvisor', en: 'Review us on TripAdvisor' },
    reviewOnGoogle: { it: 'Recensiscici su Google', en: 'Review us on Google' },
  },
  home: {
    seoTitle: { it: 'Fermento Caffè · Bistrot Roma | Piazza di Villa Carpegna', en: 'Fermento Caffè · Bistrot Rome | Piazza di Villa Carpegna' },
    seoDesc: { it: "Dove il tempo lievita lento — cucina ricercata e buon vino, dal mattino al calar della sera. Bistrot a Villa Carpegna, Roma.", en: 'Where time rises slowly — refined cooking and good wine, from morning until dusk. A bistrot in Villa Carpegna, Rome.' },
    bookTable: { it: 'Prenota un tavolo', en: 'Book a table' },
    browseMenu: { it: 'Sfoglia il menù', en: 'Browse the menu' },
    theVenue: { it: 'Il locale', en: 'The venue' },
    yearsActive: { it: 'Anni di attività', en: 'Years of activity' },
    rawMaterials: { it: 'Materie prime', en: 'Ingredients' },
    ofExcellence: { it: 'Di eccellenza', en: 'Of excellence' },
    selectedWines: { it: 'Vini selezionati', en: 'Selected wines' },
    inCellar: { it: 'in cantina', en: 'in our cellar' },
    ourIdea: { it: 'La nostra idea di cucina', en: 'Our idea of cooking' },
    threeThings: { it: 'Tre cose che ci definiscono', en: 'Three things that define us' },
    threeThingsLead: { it: 'Materie prime selezionate con cura, piatti pensati per accompagnare, una cantina che non smette mai di crescere.', en: 'Carefully selected ingredients, dishes designed to complement each other, a cellar that never stops growing.' },
    reservations: { it: 'Prenotazioni', en: 'Reservations' },
    reserveYourTable: { it: 'Riserva il tuo tavolo', en: 'Reserve your table' },
    reserveLead: { it: 'Compila il modulo e ti confermeremo la disponibilità entro poche ore. Per grandi gruppi o eventi, scrivici su Whatsapp o contattaci telefonicamente.', en: "Fill in the form and we'll confirm availability within a few hours. For large groups or events, message us on WhatsApp or call us." },
  },
  about: {
    seoTitle: { it: 'Chi siamo — La nostra storia | Fermento Caffè Bistrot Roma', en: 'About us — Our story | Fermento Caffè Bistrot Rome' },
    seoDesc: { it: 'La storia di Fermento: da una vecchia drogheria del centro a un caffè-bistrot con lievito madre, marmo di Verona e cucina di mercato, nel cuore di Roma.', en: 'The story of Fermento: from an old downtown grocery store to a caffè-bistrot with sourdough, Verona marble and market cooking, in the heart of Rome.' },
    ourStory: { it: 'La nostra storia', en: 'Our story' },
    title: { it: 'Chi siamo', en: 'About us' },
    quote: { it: '"Le cose buone non si fanno in fretta. Si aspettano, si curano, si condividono."', en: '"Good things aren’t rushed. They’re waited for, cared for, shared."' },
    ourValues: { it: 'I nostri valori', en: 'Our values' },
    whatWeBelieve: { it: 'Quello in cui crediamo', en: 'What we believe in' },
    reservations: { it: 'Prenotazioni', en: 'Reservations' },
    comeVisit: { it: 'Vieni a trovarci', en: 'Come visit us' },
    reserveLead: { it: 'Riserva il tuo posto alla nostra tavola.', en: 'Reserve your seat at our table.' },
  },
  menuPage: {
    seoTitle: { it: 'Menù — Fermento Caffè Bistrot Roma', en: 'Menu — Fermento Caffè Bistrot Rome' },
    seoDesc: { it: 'Scopri il menù di Fermento: colazione, cucina di mercato, taglieri e vini naturali. Bistrot a Villa Carpegna, Roma.', en: 'Discover the Fermento menu: breakfast, market cooking, sharing boards and natural wines. A bistrot in Villa Carpegna, Rome.' },
    ourKitchen: { it: 'La nostra cucina', en: 'Our kitchen' },
    title: { it: 'Il Menù', en: 'The Menu' },
    lead: { it: 'Cucina di mercato, stagionale e di vicinato. Le voci cambiano con quello che il mercato offre — ma i classici restano.', en: 'Market-driven, seasonal, neighbourhood cooking. Dishes change with what the market offers — but the classics stay.' },
    loading: { it: 'Caricamento menù…', en: 'Loading menu…' },
    usefulInfo: { it: 'Informazioni utili', en: 'Useful information' },
    allergensAndCover: { it: 'Allergeni & coperto', en: 'Allergens & cover charge' },
    allergensNote: { it: 'I nostri piatti possono contenere uno o più di questi allergeni. Il personale di sala è a disposizione per ogni informazione su ingredienti e preparazioni.', en: 'Our dishes may contain one or more of these allergens. Our staff is happy to answer any questions about ingredients and preparation.' },
    cover: { it: 'Coperto', en: 'Cover charge' },
    perPerson: { it: 'a persona · pane e servizio inclusi, acqua esclusa', en: 'per person · bread and service included, water excluded' },
    weeklyChange: { it: 'Il menù cambia ogni settimana in base alla disponibilità del mercato e della stagione.', en: 'The menu changes every week based on market and seasonal availability.' },
    reservations: { it: 'Prenotazioni', en: 'Reservations' },
    bookYourTable: { it: 'Prenota il tuo tavolo', en: 'Book your table' },
    bookLead: { it: 'Assicurati il posto per assaporare la nostra cucina.', en: 'Secure your spot to taste our cooking.' },
    exportPdf: { it: 'Esporta PDF', en: 'Export PDF' },
    exportModalTitle: { it: 'Esporta menù in PDF', en: 'Export menu to PDF' },
    exportModalLead: { it: 'Scegli le categorie da includere nel PDF.', en: 'Choose which categories to include in the PDF.' },
    exportSelectAll: { it: 'Seleziona tutte', en: 'Select all' },
    exportDeselectAll: { it: 'Deseleziona tutte', en: 'Deselect all' },
    exportIncludeAllergens: { it: 'Includi legenda allergeni e coperto', en: 'Include allergen legend and cover charge' },
    exportCancel: { it: 'Annulla', en: 'Cancel' },
    exportConfirm: { it: 'Genera PDF', en: 'Generate PDF' },
    exportNoneSelected: { it: 'Seleziona almeno una categoria.', en: 'Select at least one category.' },
    exportPrintSubtitle: { it: 'Cucina di mercato, stagionale e di vicinato', en: 'Market-driven, seasonal, neighbourhood cooking' },
  },
  reservationForm: {
    fullName: { it: 'Nome e cognome', en: 'Full name' },
    phone: { it: 'Telefono', en: 'Phone' },
    email: { it: 'Email', en: 'Email' },
    date: { it: 'Data', en: 'Date' },
    time: { it: 'Ora', en: 'Time' },
    chooseTime: { it: 'Scegli orario', en: 'Choose a time' },
    peopleCount: { it: 'Numero di persone', en: 'Number of guests' },
    person: { it: 'persona', en: 'guest' },
    people: { it: 'persone', en: 'guests' },
    notes: { it: 'Note (allergie, occasioni speciali…)', en: 'Notes (allergies, special occasions…)' },
    notesPlaceholder: { it: 'Es. allergia ai crostacei, seggiolone per bambino, tavolo finestra…', en: 'E.g. shellfish allergy, high chair for a child, window table…' },
    privacyLabel: { it: 'Ho letto e accetto la', en: 'I have read and accept the' },
    privacyPolicy: { it: 'privacy policy', en: 'privacy policy' },
    privacyConsent: { it: 'e acconsento al trattamento dei miei dati per la gestione della prenotazione.', en: 'and I consent to the processing of my data to manage the reservation.' },
    privacyRequired: { it: 'Devi accettare la privacy policy per inviare la richiesta di prenotazione.', en: 'You must accept the privacy policy to send the reservation request.' },
    genericError: { it: 'Si è verificato un errore. Riprova o chiamaci direttamente.', en: 'Something went wrong. Please try again or call us directly.' },
    sending: { it: 'Invio in corso…', en: 'Sending…' },
    submit: { it: 'Richiedi il tuo tavolo', en: 'Request your table' },
    received: { it: 'Prenotazione ricevuta', en: 'Reservation received' },
    confirmPrefix: { it: 'Ti confermiamo il tavolo per', en: "We're confirming your table for" },
    confirmMiddle: { it: 'il', en: 'on' },
    confirmAt: { it: 'alle', en: 'at' },
    confirmSuffix: { it: 'Riceverai una mail di conferma a', en: "You'll receive a confirmation email at" },
    newReservation: { it: 'Nuova prenotazione', en: 'New reservation' },
    namePlaceholder: { it: 'Mario Rossi', en: 'John Smith' },
    emailPlaceholder: { it: 'mario@esempio.it', en: 'john@example.com' },
  },
} as const

type Dict = typeof dict

function resolve(path: string, lang: Lang): string {
  const parts = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = dict
  for (const part of parts) {
    node = node?.[part]
  }
  if (node && typeof node === 'object' && (lang in node)) return node[lang]
  return path
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'it'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'it' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'it'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang: () => setLang(l => (l === 'it' ? 'en' : 'it')),
    t: (path: string) => resolve(path, lang),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

export type { Dict }
