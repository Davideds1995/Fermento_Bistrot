// Sotto-sezioni fisse per alcune categorie del menù.
// Chiave = id della categoria (menu_categories.id), valore = nomi delle
// sottosezioni nell'ordine in cui devono comparire in pagina.
export const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
  pranzo: [
    'Antipasti di mare',
    'Antipasti di terra',
    'Contorni',
    'Dolci',
    'Le bruschette',
    'Le carni',
    'Panini',
    'Pinse',
    'Primi della tradizione',
    'Primi di mare',
    'Primi speciali',
    'Secondi di mare',
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
