import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { supabase } from '../lib/supabase'
import { sendReservationEmail } from '../lib/email'
import { useLanguage } from '../lib/i18n'

const TIMES = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00','22:30','23:00'
]

interface FormState {
  nome: string
  telefono: string
  email: string
  data: string
  ora: string
  persone: string
  note: string
  privacy: boolean
}

const empty: FormState = { nome: '', telefono: '', email: '', data: '', ora: '', persone: '2', note: '', privacy: false }

export default function ReservationForm() {
  const { t } = useLanguage()
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

    if (!form.privacy) {
      setError(t('reservationForm.privacyRequired'))
      return
    }

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
      setError(t('reservationForm.genericError'))
    } else {
      setSent(true)
      sendReservationEmail({
        type: 'request_received',
        name: form.nome,
        email: form.email,
        date: form.data,
        time: form.ora,
        people: form.persone,
        phone: form.telefono,
        note: form.note,
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
          <p className="ct">{t('reservationForm.received')}, {form.nome.split(' ')[0]}!</p>
          <p className="cs">
            {t('reservationForm.confirmPrefix')} <strong>{form.persone} {Number(form.persone) === 1 ? t('reservationForm.person') : t('reservationForm.people')}</strong> {t('reservationForm.confirmMiddle')}{' '}
            <strong>{form.data}</strong> {t('reservationForm.confirmAt')} <strong>{form.ora}</strong>.
            {' '}{t('reservationForm.confirmSuffix')} <strong>{form.email}</strong>.
          </p>
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 12, color: 'rgba(244,236,218,0.7)' }}
            onClick={() => { setSent(false); setForm(empty) }}
          >
            {t('reservationForm.newReservation')}
          </button>
        </div>
      </div>
    )
  }

const numeri = Array.from({length:50}, (_,i) => i+1)
  
  return (
    <form onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="field">
          <label>{t('reservationForm.fullName')} <span className="req">*</span></label>
          <input className="input" required value={form.nome} onChange={set('nome')}
            placeholder={t('reservationForm.namePlaceholder')} />
        </div>
        <div className="field">
          <label>{t('reservationForm.phone')} <span className="req">*</span></label>
          <input className="input" type="tel" required value={form.telefono} onChange={set('telefono')}
            placeholder="+39 333 000 0000" />
        </div>
        <div className="field col-2">
          <label>{t('reservationForm.email')} <span className="req">*</span></label>
          <input className="input" type="email" required value={form.email} onChange={set('email')}
            placeholder={t('reservationForm.emailPlaceholder')} />
        </div>
        <div className="field">
          <label>{t('reservationForm.date')} <span className="req">*</span></label>
          <input className="input" type="date" required value={form.data} onChange={set('data')} />
        </div>
        <div className="field">
          <label>{t('reservationForm.time')} <span className="req">*</span></label>
          <select className="select" required value={form.ora} onChange={set('ora')}>
            <option value="">{t('reservationForm.chooseTime')}</option>
            {TIMES.map(time => <option key={time} value={time}>{time}</option>)}
          </select>
        </div>
        <div className="field">
          <label>{t('reservationForm.peopleCount')} <span className="req">*</span></label>
          <select className="select" required value={form.persone} onChange={set('persone')}>
            {numeri.map(n => (
              <option key={n} value={n}>{n} {n === 1 ? t('reservationForm.person') : t('reservationForm.people')}</option>
            ))}
          </select>
        </div>
        <div className="field col-2">
          <label>{t('reservationForm.notes')}</label>
          <textarea className="textarea" value={form.note} onChange={set('note')}
            placeholder={t('reservationForm.notesPlaceholder')} />
        </div>
        <div className="field col-2" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
          <input
            type="checkbox"
            id="privacy-consent"
            checked={form.privacy}
            onChange={e => setForm(f => ({ ...f, privacy: e.target.checked }))}
            style={{ marginTop: 4 }}
          />
          <label htmlFor="privacy-consent" style={{
            fontFamily: 'var(--font-body)', textTransform: 'none', letterSpacing: 'normal',
            fontSize: 'var(--fs-small)', fontWeight: 400,
          }}>
            {t('reservationForm.privacyLabel')} <Link to="/privacy" target="_blank" rel="noopener noreferrer">{t('reservationForm.privacyPolicy')}</Link>{' '}
            {t('reservationForm.privacyConsent')} <span className="req">*</span>
          </label>
        </div>
        {error && (
          <div className="col-2">
            <p style={{ color: 'var(--terracotta)', fontSize: 'var(--fs-small)', margin: 0 }}>{error}</p>
          </div>
        )}
        <div className="col-2">
          <button className="btn btn-gold btn-block" type="submit" disabled={busy}>
            {busy ? t('reservationForm.sending') : t('reservationForm.submit')}
          </button>
        </div>
      </div>
    </form>
  )
}
