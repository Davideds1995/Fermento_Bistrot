import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Flourish } from '../components/Divider'
import Seo from '../components/Seo'
import { useLanguage } from '../lib/i18n'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <>
      <Seo
        title={t('notFound.seoTitle')}
        description={t('notFound.seoDesc')}
        path="/404"
        noindex
      />
      <Header />
      <main>
        <section className="section" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center' }}>
          <div className="wrap-narrow">
            <div className="eyebrow-row">
              <span className="eyebrow">{t('notFound.eyebrow')}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', margin: '0 0 var(--sp-3)', color: 'var(--gold-deep)' }}>404</h1>
            <h2 style={{ marginTop: 0 }}>{t('notFound.title')}</h2>
            <p className="lead" style={{ maxWidth: 480, margin: '0 auto var(--sp-6)' }}>
              {t('notFound.lead')}
            </p>
            <Flourish small />
            <div className="hero-actions" style={{ marginTop: 'var(--sp-6)' }}>
              <Link to="/" className="btn btn-primary">{t('notFound.backHome')}</Link>
              <Link to="/menu" className="btn btn-outline">{t('notFound.viewMenu')}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
