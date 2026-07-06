import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { supabase } from '../lib/supabase'
import { sendReservationEmail } from '../lib/email'
import { formatDate } from '../data/content'
import type { Reservation } from '../types'

const PASS = 'admin'

/* ── Gate ── */
function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (pw === PASS) { onUnlock() } else { setErr(true); setPw('') }
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" className="gate-logo" />
        <div className="lock">
          <Icon name="lock" size={22} />
        </div>
        <h2 style={{ margin: 'var(--sp-2) 0 var(--sp-3)', fontSize: 'var(--fs-h3)' }}>
          Accesso Admin
        </h2>
        <form onSubmit={submit}>
          <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false) }}
              placeholder="••••••••"
              autoFocus
            />
          </div>
          {err && <p style={{ color: 'var(--terracotta)', marginBottom: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>Password errata.</p>}
          <button className="btn btn-primary btn-block" type="submit">Accedi</button>
        </form>
        <p className="hint">Usa <code>admin</code> per questo ambiente di demo.</p>
      </div>
    </div>
  )
}

const STATUS_LABELS: Record<Reservation['status'], string> = {
  confirmed: 'Confermata',
  pending: 'In attesa',
  cancelled: 'Cancellata',
}

function StatusBadge({ status }: { status: Reservation['status'] }) {
  return (
    <span className={`badge badge-${status}`}>
      <span className="dot" />
      {STATUS_LABELS[status]}
    </span>
  )
}

interface RespondingState {
  reservation: Reservation
  action: 'confirmed' | 'cancelled'
}

/* ── Response modal ── */
function ResponseModal({ state, onConfirm, onClose }: {
  state: RespondingState
  onConfirm: (message: string) => void
  onClose: () => void
}) {
  const [message, setMessage] = useState(state.reservation.admin_message ?? '')
  const isConfirm = state.action === 'confirmed'

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onConfirm(message)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <h3>{isConfirm ? 'Conferma prenotazione' : 'Cancella prenotazione'}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            <p style={{ marginTop: 0 }}>
              {state.reservation.name} · {formatDate(state.reservation.date)} alle {state.reservation.time} · {state.reservation.people} persone
            </p>
            <div className="field">
              <label>Risposta al cliente (facoltativa)</label>
              <textarea
                className="textarea"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Es. Vi aspettiamo al tavolo vicino alla vetrina. A presto!"
              />
            </div>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Annulla</button>
            <button type="submit" className="btn btn-primary">
              Invia {isConfirm ? 'conferma' : 'cancellazione'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Admin panel ── */
function Panel() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Reservation['status']>('all')
  const [responding, setResponding] = useState<RespondingState | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('reservations')
        .select('*')
        .order('date')
        .order('time')

      if (data) {
        setReservations(data.map(r => ({
          ...r,
          time: r.time.slice(0, 5),
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    return reservations
      .filter(r => !dateFilter || r.date === dateFilter)
      .filter(r => statusFilter === 'all' || r.status === statusFilter)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  }, [reservations, dateFilter, statusFilter])

  async function respond(reservation: Reservation, status: 'confirmed' | 'cancelled', message: string) {
    const admin_message = message.trim() || null
    const { error } = await supabase
      .from('reservations')
      .update({ status, admin_message })
      .eq('id', reservation.id)

    if (!error) {
      setReservations(rs => rs.map(r => r.id === reservation.id ? { ...r, status, admin_message } : r))
      setResponding(null)
      sendReservationEmail({
        type: status,
        name: reservation.name,
        email: reservation.email,
        date: reservation.date,
        time: reservation.time,
        people: reservation.people,
        adminMessage: admin_message,
      })
    }
  }

  const stats = useMemo(() => ({
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    pending: reservations.filter(r => r.status === 'pending').length,
    people: reservations.filter(r => r.status !== 'cancelled').reduce((s, r) => s + r.people, 0),
  }), [reservations])

  const statusOptions: Array<'all' | Reservation['status']> = ['all', 'pending', 'confirmed', 'cancelled']

  return (
    <div className="admin-shell">
      {/* Admin top bar */}
      <div className="admin-top">
        <div className="wrap">
          <div className="bar">
            <div className="a-brand">
              <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" style={{ height: 26 }} />
              <span className="a-tag">Gestione Prenotazioni</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <Link to="/menu-admin" className="btn btn-ghost btn-sm">Menù</Link>
              <Link to="/" className="btn btn-outline btn-sm">
                <Icon name="logout" size={14} /> Esci
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap section">
        {/* Head */}
        <div className="admin-head">
          <div>
            <h1>Prenotazioni</h1>
            <p className="sub">Pannello di gestione</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-row">
          <div className="stat">
            <p className="n">{stats.total}</p>
            <p className="l">Totali</p>
          </div>
          <div className="stat">
            <p className="n" style={{ color: '#4A6B3F' }}>{stats.confirmed}</p>
            <p className="l">Confermate</p>
          </div>
          <div className="stat">
            <p className="n" style={{ color: 'var(--gold-deep)' }}>{stats.pending}</p>
            <p className="l">In attesa</p>
          </div>
          <div className="stat">
            <p className="n">{stats.people}</p>
            <p className="l">Coperti attivi</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--sp-3)', margin: 0 }}>
            <Icon name="calendar" size={16} style={{ color: 'var(--ink-500)', flexShrink: 0 }} />
            <input
              className="input"
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              style={{ width: 180, padding: '8px 12px' }}
            />
            {dateFilter && (
              <button className="btn btn-ghost btn-sm" onClick={() => setDateFilter('')}>
                <Icon name="x" size={13} /> Rimuovi filtro
              </button>
            )}
          </div>
          <div className="seg">
            {statusOptions.map(s => (
              <button key={s} className={statusFilter === s ? 'active' : ''} onClick={() => setStatusFilter(s)}>
                {s === 'all' ? 'Tutte' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
          <div className="spacer" />
          <p style={{ color: 'var(--ink-500)', fontSize: 'var(--fs-small)', margin: 0 }}>
            {filtered.length} risultati
          </p>
        </div>

        {/* Table */}
        <div className="table-scroll">
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--ink-500)', padding: 'var(--sp-8) 0' }}>
              Caricamento prenotazioni…
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data e ora</th>
                  <th>Ospiti</th>
                  <th>Nome</th>
                  <th>Contatti</th>
                  <th>Note</th>
                  <th>Stato</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td style={{ fontFamily: 'var(--font-engrave)', fontSize: 'var(--fs-micro)', letterSpacing: '0.1em', color: 'var(--ink-500)' }}>
                      {r.id}
                    </td>
                    <td>
                      <p className="t-name" style={{ margin: 0 }}>{formatDate(r.date)}</p>
                      <p className="t-sub" style={{ margin: 0 }}>
                        <Icon name="clock" size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                        {r.time}
                      </p>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--ink-900)' }}>
                        {r.people}
                      </span>
                      {' '}persone
                    </td>
                    <td>
                      <p className="t-name" style={{ margin: 0 }}>{r.name}</p>
                    </td>
                    <td>
                      <p style={{ margin: 0, fontSize: 'var(--fs-small)' }}>
                        <Icon name="phone" size={11} style={{ verticalAlign: 'middle', marginRight: 4, color: 'var(--ink-500)' }} />
                        {r.phone}
                      </p>
                      <p style={{ margin: 0, fontSize: 'var(--fs-small)' }}>
                        <Icon name="mail" size={11} style={{ verticalAlign: 'middle', marginRight: 4, color: 'var(--ink-500)' }} />
                        {r.email}
                      </p>
                    </td>
                    <td style={{ maxWidth: 180 }}>
                      {r.note
                        ? <p style={{ margin: 0, fontStyle: 'italic', fontSize: 'var(--fs-small)', color: 'var(--ink-500)' }}>{r.note}</p>
                        : <span style={{ color: 'var(--ink-300)', fontSize: 'var(--fs-small)' }}>—</span>
                      }
                    </td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="cell-actions">
                      <div className="t-actions">
                        {r.status !== 'confirmed' && (
                          <button
                            className="btn btn-sm"
                            style={{ color: '#4A6B3F', borderColor: 'rgba(74,107,63,0.4)', background: 'transparent', fontSize: '0.68rem' }}
                            onClick={() => setResponding({ reservation: r, action: 'confirmed' })}
                          >
                            <Icon name="check" size={13} /> Conferma
                          </button>
                        )}
                        {r.status !== 'cancelled' && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => setResponding({ reservation: r, action: 'cancelled' })}
                          >
                            <Icon name="x" size={13} /> Cancella
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: 'var(--sp-8)', color: 'var(--ink-500)', fontStyle: 'italic' }}>
                      Nessuna prenotazione trovata con i filtri selezionati.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {responding && (
        <ResponseModal
          state={responding}
          onClose={() => setResponding(null)}
          onConfirm={message => respond(responding.reservation, responding.action, message)}
        />
      )}
    </div>
  )
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false)
  return unlocked ? <Panel /> : <Gate onUnlock={() => setUnlocked(true)} />
}
