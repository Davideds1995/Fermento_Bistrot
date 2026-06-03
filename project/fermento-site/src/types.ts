export interface MenuItem {
  id: string
  name: string
  desc: string
  price: string
  tags: string[]
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
}

export interface AboutSection {
  h: string
  p: string
}

export type IconName =
  | 'plus' | 'edit' | 'trash' | 'check' | 'x' | 'lock' | 'clock'
  | 'calendar' | 'users' | 'phone' | 'mail' | 'mapPin' | 'menu'
  | 'search' | 'filter' | 'arrowRight' | 'logout'
