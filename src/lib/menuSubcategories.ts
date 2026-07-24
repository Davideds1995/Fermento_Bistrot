// Sotto-sezioni fisse per alcune categorie del menù.
// Chiave = id della categoria (menu_categories.id), valore = nomi delle
// sottosezioni nell'ordine in cui devono comparire in pagina.
export const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
  pranzo: [
    'Antipasti di mare',
    'Antipasti di terra',
    'Le bruschette',
    'Primi di terra',
    'Primi di pesce',
    'Primi speciali',
    'Le carni',
    'Secondi di mare',
    'Panini',
    'Pinse',
    'Contorni',
    'Dolci',
  ],
  vini: [
    'Bianco',
    'Bollicine',
    'Rosso',
    'Rosato',
  ],
  drinks:[
    'Amari',
    'Bevande',
    'Birre',
    'Birre alla spina',
    'Birre artigianali',
    'Gin',
    'Grappe Barrique',
    'Grappe bianche',
    'Rum',
    'Whisky',

  ]
}

// Zone dei vini: sotto-sottocategoria, disponibile solo per la categoria "vini".
// Es. vini > Rosso > Sicilia
export const CATEGORY_ZONES: Record<string, string[]> = {
  vini: [
    'Abruzzo',
    'Basilicata',
    'Campania',
    'Francia',
    'Friuli Venezia Giulia',
    'Lazio',
    'Lombardia',
    'Marche',
    'Mosella (Germania)',
    'Piemonte',
    'Puglia',
    'Sardegna',
    'Sicilia',
    'Spagna',
    'Toscana',
    'Trentino - Alto Adige',
    'Umbria',
    'Veneto',

  ],
}
