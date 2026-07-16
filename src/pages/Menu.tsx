import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Flourish } from '../components/Divider'
import Seo from '../components/Seo'
import { MenuCategorySection } from '../components/MenuCategorySection'
import { supabase } from '../lib/supabase'
import { ALLERGENS, COPERTO } from '../data/content'
import { useLanguage } from '../lib/i18n'
import type { MenuCategory as MenuCategoryType } from '../types'

export default function Menu() {
  const { lang, t } = useLanguage()
  const allergens = ALLERGENS[lang]
  const [menu, setMenu] = useState<MenuCategoryType[]>([])
  const [active, setActive] = useState('')
  const [loading, setLoading] = useState(true)
  const [coperto, setCoperto] = useState(COPERTO)

  useEffect(() => {
    async function load() {
      const { data: categories } = await supabase
        .from('menu_categories')
        .select('id, name, note')
        .order('sort_order')

      const { data: items } = await supabase
        .from('menu_items')
        .select('id, category_id, name, description, price, subcategory, zona')
        .order('sort_order')

      const { data: settings } = await supabase
        .from('site_settings')
        .select('coperto')
        .eq('id', 1)
        .single()

      if (settings?.coperto) setCoperto(settings.coperto)

      if (!categories || !items) return

      const built: MenuCategoryType[] = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        note: cat.note,
        items: items
          .filter(i => i.category_id === cat.id)
          .map(i => ({ id: i.id, name: i.name, description: i.description, price: i.price, subcategory: i.subcategory ?? null, zona: i.zona ?? null })),
      }))

      setMenu(built)
      if (built.length > 0) setActive(built[0].id)
      setLoading(false)
    }
    load()
  }, [])

  function selectCategory(id: string) {
    setActive(id)
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeCategory = menu.find(cat => cat.id === active)

  return (
    <>
      <Seo
        title={t('menuPage.seoTitle')}
        description={t('menuPage.seoDesc')}
        path="/menu"
      />
      <Header />
      <main>

        {/* ── Page header ── */}
        <section className="section-tight" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center' }}>
          <div className="wrap">
            <div className="eyebrow-row">
              <span className="eyebrow">{t('menuPage.ourKitchen')}</span>
            </div>
            <h1>{t('menuPage.title')}</h1>
            <p className="lead" style={{ maxWidth: 560, margin: '0 auto var(--sp-6)' }}>
              {t('menuPage.lead')}
            </p>
            <Flourish small />
          </div>
        </section>

        {/* ── Category nav (sticky) ── */}
        {menu.length > 0 && (
          <div style={{
            position: 'sticky', top: 78, zIndex: 20,
            background: 'rgba(244,236,218,0.92)', backdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--line)', padding: 'var(--sp-4) 0',
          }}>
            <div className="wrap">
              <div className="cat-nav">
                {menu.map(cat => (
                  <button
                    key={cat.id}
                    className={active === cat.id ? 'active' : ''}
                    onClick={() => selectCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Menu section (solo categoria selezionata) ── */}
        <section className="section" id="menu-section">
          <div className="wrap-narrow">
            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--ink-500)', padding: 'var(--sp-8) 0' }}>
                {t('menuPage.loading')}
              </p>
            ) : activeCategory ? (
              <MenuCategorySection cat={activeCategory} />
            ) : null}
          </div>
        </section>

        {/* ── Allergeni & coperto ── */}
        <section className="section-tight" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)' }}>
          <div className="wrap-narrow">
            <div className="center" style={{ marginBottom: 'var(--sp-6)' }}>
              <Flourish flip small />
              <div className="eyebrow-row">
                <span className="eyebrow">{t('menuPage.usefulInfo')}</span>
              </div>
              <h2>{t('menuPage.allergensAndCover')}</h2>
            </div>

            <div className="allergen-grid">
              {allergens.map(a => (
                <div className="allergen-item" key={a.n}>
                  <span className="allergen-num">{a.n}</span>
                  <span className="allergen-label">{a.label}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--ink-500)', fontStyle: 'italic', textAlign: 'center', margin: 'var(--sp-5) 0 0' }}>
              {t('menuPage.allergensNote')}
            </p>

            <div className="coperto-note">
              <span className="coperto-label">{t('menuPage.cover')}</span>
              <span className="coperto-price">€ {coperto}</span>
              <span className="coperto-desc">{t('menuPage.perPerson')}</span>
            </div>

            <p style={{ color: 'var(--ink-500)', fontStyle: 'italic', textAlign: 'center', margin: 'var(--sp-5) 0 0' }}>
              {t('menuPage.weeklyChange')}
            </p>
          </div>
        </section>

        {/* ── Reservation ── */}
        <section className="section reserve" id="prenotazione">
          <div className="wrap-narrow">
            <div className="center" style={{ marginBottom: 'var(--sp-7)' }}>
              <Flourish flip small />
              <div className="eyebrow-row">
                <span className="eyebrow">{t('menuPage.reservations')}</span>
              </div>
              <h2>{t('menuPage.bookYourTable')}</h2>
              <p className="lead">
                {t('menuPage.bookLead')}
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
