import { supabase } from './supabase'

export type ReservationEmailType = 'request_received' | 'confirmed' | 'cancelled'

export interface ReservationEmailPayload {
  type: ReservationEmailType
  name: string
  email: string
  date: string
  time: string
  people: number | string
  adminMessage?: string | null
}

export async function sendReservationEmail(payload: ReservationEmailPayload) {
  try {
    await supabase.functions.invoke('send-reservation-email', { body: payload })
  } catch (error) {
    console.error('Invio email prenotazione fallito', error)
  }
}
