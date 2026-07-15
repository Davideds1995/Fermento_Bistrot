import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Flourish, Divider } from '../components/Divider'
import Seo from '../components/Seo'
import { ABOUT } from '../data/content'
import { useLanguage } from '../lib/i18n'

const VALUES = {
  it: [
    { title: 'Filiera corta', body: 'Lavoriamo con contadini, casari e vignaioli. Sappiamo sempre chi ha coltivato quello che vi mettiamo nel piatto.' },
    { title: 'Cantina ampia', body: 'Centinaia di etichette, dai piccoli vignaioli naturali alle grandi denominazioni, per trovare sempre il calice giusto per ogni piatto.' },
    { title: 'Niente sprechi', body: "Dagli scarti della panificazione al brodo di bollito: ogni ingrediente viene usato fino all'ultima possibilità, in cucina e al banco." },
  ],
  en: [
    { title: 'Short supply chain', body: 'We work with farmers, cheesemakers and winemakers. We always know who grew what ends up on your plate.' },
    { title: 'A wide cellar', body: 'Hundreds of labels, from small natural winemakers to great appellations, to always find the right glass for every dish.' },
    { title: 'No waste', body: 'From bread scraps to broth: every ingredient is used to its last possibility, in the kitchen and at the counter.' },
  ],
} as const

export default function ChiSiamo() {
  const { lang, t } = useLanguage()
  const about = ABOUT[lang]

  return (
    <>
      <Seo
        title={t('about.seoTitle')}
        description={t('about.seoDesc')}
        path="/chi-siamo"
      />
      <Header />
      <main>

        {/* ── Page header ── */}
        <section className="section" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center', paddingBottom: 'var(--sp-7)' }}>
          <div className="wrap-narrow">
            <div className="eyebrow-row">
              <span className="eyebrow">{t('about.ourStory')}</span>
            </div>
            <h1>{t('about.title')}</h1>
            <Flourish small />
          </div>
        </section>

        {/* ── Story sections ── */}
        <section className="section">
          <div className="wrap-narrow">
            {about.map(({ h, p, img }, i) => {
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
                  {i < about.length - 1 && <Divider />}
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
              {t('about.quote')}
            </blockquote>

          </div>
        </section>

        {/* ── Values ── */}
        <section className="section">
          <div className="wrap">
            <div className="center" style={{ marginBottom: 'var(--sp-7)' }}>
              <div className="eyebrow-row">
                <span className="eyebrow">{t('about.ourValues')}</span>
              </div>
              <h2>{t('about.whatWeBelieve')}</h2>
            </div>
            <div className="feature-3">
              {VALUES[lang].map(({ title, body }) => (
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
                <span className="eyebrow">{t('about.reservations')}</span>
              </div>
              <h2>{t('about.comeVisit')}</h2>
              <p className="lead">
                {t('about.reserveLead')}
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
