import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useLanguage } from '../lib/i18n'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="bar">
          <NavLink to="/" className="brand-link" onClick={() => setOpen(false)}>
            <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" />
          </NavLink>

          <nav className="nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
              {t('header.home')}
            </NavLink>
            <NavLink to="/chi-siamo" className={({ isActive }) => isActive ? 'active' : ''}>
              {t('header.about')}
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>
              {t('header.menu')}
            </NavLink>
            <NavLink to="/menu#prenotazione" className="nav-cta btn btn-primary btn-sm"
              onClick={e => {
                e.preventDefault()
                document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })
              }}>
              {t('header.book')}
            </NavLink>
            <button
              type="button"
              className={`lang-toggle btn-toogle ${lang === 'it' ? 'lang-toggle--it' : 'lang-toggle--en'}`}
              onClick={toggleLang}
              aria-label={lang === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
            />
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
              { to: '/', label: t('header.home'), end: true },
              { to: '/chi-siamo', label: t('header.about') },
              { to: '/menu', label: t('header.menu') },
            ].map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) => `caps ${isActive ? 'active' : ''}`}
                style={{ fontSize: '0.9rem', color: 'var(--ink-700)', letterSpacing: '0.18em' }}
                onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={toggleLang}
              className="caps"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: '0.9rem', color: 'var(--ink-700)', letterSpacing: '0.18em',
                background: 'transparent', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer',
              }}
            >
              <span className={`lang-flag ${lang === 'it' ? 'lang-toggle--en' : 'lang-toggle--it'}`} aria-hidden="true" />
              {lang === 'it' ? 'English' : 'Italiano'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
