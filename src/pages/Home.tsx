import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Divider } from '../components/Divider'
import Seo, { SITE_URL } from '../components/Seo'
import { COPY, ATMOSPHERE } from '../data/content'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  '@id': SITE_URL,
  name: 'Fermento Caffè Bistrot Roma',
  image: `${SITE_URL}/assets/calice-e-pane.webp`,
  url: SITE_URL,
  telephone: '+39 3395734497',
  email: 'fermentoefamily@gmail.com',
  servesCuisine: 'Italiana',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Piazza di Villa Carpegna 38',
    addressLocality: 'Roma',
    postalCode: '00165',
    addressRegion: 'RM',
    addressCountry: 'IT',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:30', closes: '23:59' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '08:30', closes: '16:00' },
  ],
}

interface PlateProps {
  title: string
  desc: string
  num: string
  img?: string
}

function Plate({ title, desc, num, img }: PlateProps) {
  return (
    <div className="feature-item">
      <div className="plate plate-tall">
        {img ? <img src={img} alt={title} /> :
          <div className="plate-label">
            <span className="ico">{num}</span>
            <em>{title}</em>
          </div>
        }
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
      <Seo
        title="Fermento Caffè · Bistrot Roma | Pizza di Villa Carpegna"
        description="Dove il tempo lievita lento — cucina ricercata e buon vino, dal mattino al calar della sera. Bistrot a Villa Carpegna, Roma."
        path="/"
        jsonLd={JSON_LD}
      />
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="hero section fade-in">
          <div className="wrap center">
            <img
              src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png"
              alt="Fermento — Caffè · Bistrot"
              className="hero-brand-logo"
            />
            <p className="eyebrow" style={{ margin: 'var(--sp-3) 0 var(--sp-6)' }}>
              {COPY.est}
            </p>
            <video
              className="hero-video-fullwidth"
              src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/video-sfondo.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <p className="claim" style={{ marginTop: 'var(--sp-6)' }}>
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
                { n: 'Materie prime', l: 'Di eccellenza' },
                { n: 'Vini selezionati', l: 'in cantina' },
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
                <span className="eyebrow">La nostra idea di cucina</span>
              </div>
              <h2>Tre cose che ci definiscono</h2>
              <p className="lead" style={{ margin: '0 auto', maxWidth: 560 }}>
                Materie prime selezionate con cura, piatti pensati per accompagnare, una cantina che non smette mai di crescere.
              </p>
            </div>
            <div className="feature-3">
              {ATMOSPHERE.map(({ n, title, desc, img }) => (
                <Plate key={n} num={n} title={title} desc={desc} img={img} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Reservation ── */}
        <section className="section reserve" id="prenotazione">
          <div className="wrap-narrow">
            <div className="center" style={{ marginBottom: 'var(--sp-7)' }}>
              <div className="eyebrow-row">
                <span className="eyebrow">Prenotazioni</span>
              </div>
              <h2>Riserva il tuo tavolo</h2>
              <p className="lead">
                Compila il modulo e ti confermeremo la disponibilità entro poche ore.
                Per grandi gruppi o eventi, scrivici su Whatsapp o contattaci telefonicamente.
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
