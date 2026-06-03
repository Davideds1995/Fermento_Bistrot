import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Divider, Flourish } from '../components/Divider'
import { COPY, ATMOSPHERE } from '../data/content'

interface PlateProps {
  title: string
  desc: string
  num: string
}

function Plate({ title, desc, num }: PlateProps) {
  return (
    <div className="feature-item">
      <div className="plate plate-tall">
        <div className="plate-label">
          <span className="ico">{num}</span>
          <em>{title}</em>
        </div>
      </div>
      <p className="fi-num" style={{ marginTop: 'var(--sp-4)' }}>{num}</p>
      <p className="fi-title">{title}</p>
      <p style={{ color: 'var(--ink-500)', fontSize: 'var(--fs-small)', fontStyle: 'italic', margin: 0 }}>
        {desc}
      </p>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="hero section fade-in">
          <div className="wrap center">
            <p className="eyebrow" style={{ marginBottom: 'var(--sp-5)' }}>
              {COPY.est}
            </p>
            <img
              src="/assets/logo-fermento.png"
              alt="Fermento — Caffè · Bistrot"
              className="hero-logo"
            />
            <Flourish small />
            <p className="claim" style={{ marginTop: 'var(--sp-5)' }}>
              {COPY.claim}
            </p>
            <div className="hero-actions">
              <a
                href="#prenotazione"
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Prenota un tavolo
              </a>
              <Link to="/menu" className="btn btn-outline">
                Sfoglia il menù
              </Link>
            </div>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="section" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)' }}>
          <div className="wrap-narrow center">
            <div className="eyebrow-row">
              <span className="eyebrow">Il locale</span>
            </div>
            <h2>{COPY.introTitle}</h2>
            <p className="lead">{COPY.introBody}</p>
            <Divider />
            <div style={{ display: 'flex', gap: 'var(--sp-8)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--sp-6)' }}>
              {[
                { n: '12', l: 'Anni di attività' },
                { n: '36h', l: 'Di fermentazione' },
                { n: '100%', l: 'Lievito madre' },
              ].map(({ n, l }) => (
                <div key={l} className="center">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--gold-deep)', margin: 0, lineHeight: 1 }}>
                    {n}
                  </p>
                  <p className="eyebrow" style={{ marginTop: 'var(--sp-2)', color: 'var(--ink-500)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Atmosphere ── */}
        <section className="section">
          <div className="wrap">
            <div className="center" style={{ marginBottom: 'var(--sp-7)' }}>
              <div className="eyebrow-row">
                <span className="eyebrow">Atmosfera</span>
              </div>
              <h2>Tre momenti di una giornata da noi</h2>
              <p className="lead" style={{ margin: '0 auto', maxWidth: 560 }}>
                Ogni ora ha il suo rituale: il caffè dell'alba, il pranzo di mercato,
                l'aperitivo al tramonto.
              </p>
            </div>
            <div className="feature-3">
              {ATMOSPHERE.map(({ n, title, desc }) => (
                <Plate key={n} num={n} title={title} desc={desc} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Reservation ── */}
        <section className="section reserve" id="prenotazione">
          <div className="wrap-narrow">
            <div className="center" style={{ marginBottom: 'var(--sp-7)' }}>
              <Flourish flip small />
              <div className="eyebrow-row">
                <span className="eyebrow">Prenotazioni</span>
              </div>
              <h2>Riserva il tuo tavolo</h2>
              <p className="lead">
                Compila il modulo e ti confermeremo la disponibilità entro poche ore.
                Per grandi gruppi o eventi, scrivici a{' '}
                <a href="mailto:eventi@fermentobistrot.it" style={{ color: 'var(--gold-soft)' }}>
                  eventi@fermentobistrot.it
                </a>
                .
              </p>
            </div>
            <div className="panel panel-pad framed" style={{
              background: 'rgba(244,236,218,0.04)',
              borderColor: 'rgba(244,236,218,0.16)',
            }}>
              <ReservationForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
