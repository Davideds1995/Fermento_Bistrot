import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="bar">
          <NavLink to="/" className="brand-link" onClick={() => setOpen(false)}>
            <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" />
          </NavLink>

          <nav className="nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
              Home
            </NavLink>
            <NavLink to="/chi-siamo" className={({ isActive }) => isActive ? 'active' : ''}>
              Chi siamo
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>
              Menù
            </NavLink>
            <NavLink to="/menu#prenotazione" className="nav-cta btn btn-primary btn-sm"
              onClick={e => {
                e.preventDefault()
                document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })
              }}>
              Prenota
            </NavLink>
          </nav>

          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setOpen(o => !o)}
          >
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div style={{
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--line)',
          padding: '24px 32px 28px',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/chi-siamo', label: 'Chi siamo' },
              { to: '/menu', label: 'Menù' },
            ].map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) => `caps ${isActive ? 'active' : ''}`}
                style={{ fontSize: '0.9rem', color: 'var(--ink-700)', letterSpacing: '0.18em' }}
                onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
