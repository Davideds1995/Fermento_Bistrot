import { useState, type FormEvent, type ReactNode } from 'react'
import Icon from './Icon'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

function LoginForm({ title }: { title: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (err) setError('Email o password non corrette.')
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" className="gate-logo" />
        <div className="lock">
          <Icon name="lock" size={22} />
        </div>
        <h2 style={{ margin: 'var(--sp-2) 0 var(--sp-3)', fontSize: 'var(--fs-h3)' }}>
          {title}
        </h2>
        <form onSubmit={submit}>
          <div className="field" style={{ marginBottom: 'var(--sp-3)' }}>
            <label>Email</label>
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nome@fermentobistrot.com"
              autoFocus
            />
          </div>
          <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
            <label>Password</label>
            <input
              className="input"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p style={{ color: 'var(--terracotta)', marginBottom: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{error}</p>}
          <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
            {busy ? 'Accesso in corso…' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminGate({ title, children }: { title: string; children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <LoginForm title={title} />
  return <>{children}</>
}
