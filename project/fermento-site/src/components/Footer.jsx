import { Link } from 'react-router-dom'
import { HOURS } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="center">
          <img src="/assets/logo-fermento-ivory.png" alt="Fermento" className="foot-logo" />
          <hr className="filet" style={{ maxWidth: 320, margin: '0 auto' }} />
        </div>

        <div className="foot-cols">
          <div>
            <h4>Dove siamo</h4>
            <p>Via del Pratello, 14</p>
            <p>40122 Bologna (BO)</p>
            <p style={{ marginTop: 12 }}>
              <a href="tel:+390512345678">+39 051 234 5678</a>
            </p>
            <p>
              <a href="mailto:ciao@fermentobistrot.it">ciao@fermentobistrot.it</a>
            </p>
          </div>

          <div>
            <h4>Orari</h4>
            {HOURS.map(({ d, h }) => (
              <p key={d}>
                <span style={{ color: 'rgba(244,236,218,0.5)', fontSize: '0.8rem' }}>{d}</span>
                <br />
                {h}
              </p>
            ))}
          </div>

          <div>
            <h4>Il locale</h4>
            <p><Link to="/chi-siamo">Chi siamo</Link></p>
            <p><Link to="/menu">Il menù</Link></p>
            <p>
              <a href="#prenotazione" onClick={e => {
                e.preventDefault()
                document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Prenota un tavolo
              </a>
            </p>
          </div>
        </div>

        <div className="legal">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Fermento — Caffè · Bistrot · P.IVA IT 03456789012 ·{' '}
            <a href="#">Privacy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
