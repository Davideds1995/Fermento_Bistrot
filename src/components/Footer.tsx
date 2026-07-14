import { Link } from 'react-router-dom'
import { HOURS } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="center">
          <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento-ivory.png" alt="Fermento" className="foot-logo" />
          <hr className="filet" style={{ maxWidth: 320, margin: '0 auto' }} />
        </div>

        <div className="foot-cols">
          <div>
            <h4>Dove siamo</h4>
            <p>Piazza di Villa Carpegna 38</p>
            <p>00165 Roma (RM)</p>
            <p style={{ marginTop: 12 }}>
              📞:<a href="https://wa.me/393395734497">+39 3395734497</a> <br/>
              ☎️:<a href="tel:+0666000316">+0666000316</a>
            </p>
            <p>
              <a href="mailto:fermentoefamily@gmail.com">fermentoefamily@gmail.com</a>
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
            © {new Date().getFullYear()} Fermento — Caffè · Bistrot · P.IVA IT 15405801000 ·{' '}
            <a href="#">Privacy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
