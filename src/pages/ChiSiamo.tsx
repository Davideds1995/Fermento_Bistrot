import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Flourish, Divider } from '../components/Divider'
import { ABOUT } from '../data/content'

export default function ChiSiamo() {
  return (
    <>
      <Header />
      <main>

        {/* ── Page header ── */}
        <section className="section" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center', paddingBottom: 'var(--sp-7)' }}>
          <div className="wrap-narrow">
            <div className="eyebrow-row">
              <span className="eyebrow">La nostra storia</span>
            </div>
            <h1>Chi siamo</h1>
            <p className="lead">
              Una vecchia drogheria, un lievito madre di nome Genoveffa
              e l'idea che il buono richieda tempo.
            </p>
            <Flourish small />
          </div>
        </section>

        {/* ── Story sections ── */}
        <section className="section">
          <div className="wrap-narrow">
            {ABOUT.map(({ h, p, img }, i) => {
              const plate = (
                <div className="plate plate-square" style={{ minHeight: 240, borderRadius: 'var(--r-md)' }}>
                  {img ? (
                    <img src={img} alt={h} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--r-md)' }} />
                  ) : (
                    <div className="plate-label">
                      <span className="ico" style={{ fontFamily: 'var(--font-engrave)', fontSize: '1.2rem' }}>
                        {['I', 'II', 'III', 'IV'][i]}
                      </span>
                      <em>{h}</em>
                    </div>
                  )}
                </div>
              )
              const text = (
                <div>
                  <h2 style={{ marginBottom: 'var(--sp-4)' }}>{h}</h2>
                  <p style={{ margin: 0 }}>{p}</p>
                </div>
              )
              return (
                <div key={h}>
                  <div className="feature-2" style={{ marginBottom: 'var(--sp-8)', alignItems: 'flex-start' }}>
                    {/* alternating layout: text / plate */}
                    {i % 2 === 0 ? (
                      <>
                        {text}
                        {plate}
                      </>
                    ) : (
                      <>
                        {plate}
                        {text}
                      </>
                    )}
                  </div>
                  {i < ABOUT.length - 1 && <Divider />}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Pull quote ── */}
        <section className="section-tight" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center' }}>
          <div className="wrap-narrow">
            <Flourish flip small />
            <blockquote style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--ink-900)',
              margin: 'var(--sp-6) 0',
              lineHeight: 1.4,
            }}>
              "Le cose buone non si fanno in fretta.
              Si aspettano, si curano, si condividono."
            </blockquote>
            <p className="eyebrow" style={{ color: 'var(--gold-deep)' }}>
              — Lucia e Tommaso Bianchi, fondatori
            </p>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section">
          <div className="wrap">
            <div className="center" style={{ marginBottom: 'var(--sp-7)' }}>
              <div className="eyebrow-row">
                <span className="eyebrow">I nostri valori</span>
              </div>
              <h2>Quello in cui crediamo</h2>
            </div>
            <div className="feature-3">
              {[
                { title: 'Filiera corta', body: 'Lavoriamo con contadini, casari e vignaioli dell\'Appennino bolognese. Sappiamo sempre chi ha coltivato quello che vi mettiamo nel piatto.' },
                { title: 'Fermentazione naturale', body: 'Niente lieviti di birra industriali. Solo Genoveffa — il nostro lievito madre — per il pane, le brioche e tutti i lievitati.' },
                { title: 'Niente sprechi', body: 'Dagli scarti della panificazione al brodo di bollito: ogni ingrediente viene usato fino all\'ultima possibilità, in cucina e al banco.' },
              ].map(({ title, body }) => (
                <div key={title} className="framed" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>
                  <h3 style={{ marginBottom: 'var(--sp-3)' }}>{title}</h3>
                  <p style={{ color: 'var(--ink-500)', margin: 0, fontStyle: 'italic' }}>{body}</p>
                </div>
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
              <h2>Vieni a trovarci</h2>
              <p className="lead">
                Riserva il tuo posto alla nostra tavola.
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
