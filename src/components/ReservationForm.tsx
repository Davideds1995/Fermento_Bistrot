import { useState } from 'react'
import Icon from './Icon'
import { supabase } from '../lib/supabase'
import { sendReservationEmail } from '../lib/email'

const TIMES = [
  '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

interface FormState {
  nome: string
  telefono: string
  email: string
  data: string
  ora: string
  persone: string
  note: string
}

const empty: FormState = { nome: '', telefono: '', email: '', data: '', ora: '', persone: '2', note: '' }

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function set(k: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const { error: err } = await supabase.from('reservations').insert({
      date: form.data,
      time: form.ora,
      people: Number(form.persone),
      name: form.nome,
      phone: form.telefono,
      email: form.email,
      note: form.note,
      status: 'pending',
    })

    setBusy(false)
    if (err) {
      setError('Si è verificato un errore. Riprova o chiamaci direttamente.')
    } else {
      setSent(true)
      sendReservationEmail({
        type: 'request_received',
        name: form.nome,
        email: form.email,
        date: form.data,
        time: form.ora,
        people: form.persone,
      })
    }
  }

  if (sent) {
    return (
      <div className="confirm-msg fade-in">
        <div className="seal">
          <Icon name="check" size={20} />
        </div>
        <div>
          <p className="ct">Prenotazione ricevuta, {form.nome.split(' ')[0]}!</p>
          <p className="cs">
            Ti confermiamo il tavolo per <strong>{form.persone} persone</strong> il{' '}
            <strong>{form.data}</strong> alle <strong>{form.ora}</strong>.
            Riceverai una mail di conferma a <strong>{form.email}</strong>.
          </p>
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 12, color: 'rgba(244,236,218,0.7)' }}
            onClick={() => { setSent(false); setForm(empty) }}
          >
            Nuova prenotazione
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="field">
          <label>Nome e cognome <span className="req">*</span></label>
          <input className="input" required value={form.nome} onChange={set('nome')}
            placeholder="Mario Rossi" />
        </div>
        <div className="field">
          <label>Telefono <span className="req">*</span></label>
          <input className="input" type="tel" required value={form.telefono} onChange={set('telefono')}
            placeholder="+39 333 000 0000" />
        </div>
        <div className="field col-2">
          <label>Email <span className="req">*</span></label>
          <input className="input" type="email" required value={form.email} onChange={set('email')}
            placeholder="mario@esempio.it" />
        </div>
        <div className="field">
          <label>Data <span className="req">*</span></label>
          <input className="input" type="date" required value={form.data} onChange={set('data')} />
        </div>
        <div className="field">
          <label>Ora <span className="req">*</span></label>
          <select className="select" required value={form.ora} onChange={set('ora')}>
            <option value="">Scegli orario</option>
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Numero di persone <span className="req">*</span></label>
          <select className="select" required value={form.persone} onChange={set('persone')}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'persone'}</option>
            ))}
          </select>
        </div>
        <div className="field col-2">
          <label>Note (allergie, occasioni speciali…)</label>
          <textarea className="textarea" value={form.note} onChange={set('note')}
            placeholder="Es. allergia ai crostacei, seggiolone per bambino, tavolo finestra…" />
        </div>
        {error && (
          <div className="col-2">
            <p style={{ color: 'var(--terracotta)', fontSize: 'var(--fs-small)', margin: 0 }}>{error}</p>
          </div>
        )}
        <div className="col-2">
          <button className="btn btn-gold btn-block" type="submit" disabled={busy}>
            {busy ? 'Invio in corso…' : 'Richiedi il tuo tavolo'}
          </button>
        </div>
      </div>
    </form>
  )
}
