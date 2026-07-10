export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  tags: string[]
  subcategory: string | null
}

export interface MenuCategory {
  id: string
  name: string
  note: string
  items: MenuItem[]
}

export interface Product extends MenuItem {
  category: string
  categoryId: string
}


export interface Reservation {
  id: string
  date: string
  time: string
  people: number
  name: string
  phone: string
  email: string
  note: string
  status: 'confirmed' | 'pending' | 'cancelled'
  admin_message: string | null
}

export interface HoursEntry {
  d: string
  h: string
}

export interface AtmosphereEntry {
  n: string
  title: string
  desc: string
  slot: string
  img?: string
}

export interface AboutSection {
  h: string
  p: string
  img?: string
}

export type IconName =
  | 'plus' | 'edit' | 'trash' | 'check' | 'x' | 'lock' | 'clock'
  | 'calendar' | 'users' | 'phone' | 'mail' | 'mapPin' | 'menu'
  | 'search' | 'filter' | 'arrowRight' | 'logout'
