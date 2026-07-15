import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Flourish } from '../components/Divider'
import Seo from '../components/Seo'
import { supabase } from '../lib/supabase'
import { CATEGORY_SUBCATEGORIES, CATEGORY_ZONES } from '../lib/menuSubcategories'
import { ALLERGENS, COPERTO } from '../data/content'
import type { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '../types'

function MenuItemRow({ name, description, price }: MenuItemType) {
  return (
    <div className="menu-item">
      <div>
        <span className="mi-name">{name}</span>
        <p className="mi-desc">{description}</p>
      </div>
      <span className="mi-price">€ {price}</span>
    </div>
  )
}

function MenuCategorySection({ cat }: { cat: MenuCategoryType }) {
  const subcategories = CATEGORY_SUBCATEGORIES[cat.id]
  const zones = CATEGORY_ZONES[cat.id]
  const hasSubcategories = subcategories && cat.items.some(i => i.subcategory)

  const groups = hasSubcategories
    ? subcategories
        .map(sub => ({ sub, items: cat.items.filter(i => i.subcategory === sub) }))
        .filter(g => g.items.length > 0)
    : [{ sub: null, items: cat.items }]

  return (
    <div className="menu-cat" id={cat.id}>
      <div className="menu-cat-head">
        <div className="eyebrow-row">
          <span className="eyebrow">{cat.name}</span>
        </div>
        <p className="note">{cat.note}</p>
      </div>
      {groups.map(g => {
        const hasZones = zones && g.items.some(i => i.zona)
        const zoneGroups = hasZones
          ? zones.map(zona => ({ zona, items: g.items.filter(i => i.zona === zona) })).filter(zg => zg.items.length > 0)
          : [{ zona: null, items: g.items }]

        return (
          <div className="menu-subcat" key={g.sub ?? 'all'}>
            {g.sub && <h3 className="menu-subcat-title">{g.sub}</h3>}
            {zoneGroups.map(zg => (
              <div className="menu-zone" key={zg.zona ?? 'all'}>
                {zg.zona && <h4 className="menu-zone-title">{zg.zona}</h4>}
                <div>
                  {zg.items.map(item => <MenuItemRow key={item.id} {...item} />)}
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default function Menu() {
  const [menu, setMenu] = useState<MenuCategoryType[]>([])
  const [active, setActive] = useState('')
  const [loading, setLoading] = useState(true)

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
        title="Menù — Fermento Caffè Bistrot Roma"
        description="Scopri il menù di Fermento: colazione, cucina di mercato, taglieri e vini naturali. Bistrot a Villa Carpegna, Roma."
        path="/menu"
      />
      <Header />
      <main>

        {/* ── Page header ── */}
        <section className="section-tight" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center' }}>
          <div className="wrap">
            <div className="eyebrow-row">
              <span className="eyebrow">La nostra cucina</span>
            </div>
            <h1>Il Menù</h1>
            <p className="lead" style={{ maxWidth: 560, margin: '0 auto var(--sp-6)' }}>
              Cucina di mercato, stagionale e di vicinato.
              Le voci cambiano con quello che il mercato offre — ma i classici restano.
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
                Caricamento menù…
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
                <span className="eyebrow">Informazioni utili</span>
              </div>
              <h2>Allergeni &amp; coperto</h2>
            </div>

            <div className="allergen-grid">
              {ALLERGENS.map(a => (
                <div className="allergen-item" key={a.n}>
                  <span className="allergen-num">{a.n}</span>
                  <span className="allergen-label">{a.label}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--ink-500)', fontStyle: 'italic', textAlign: 'center', margin: 'var(--sp-5) 0 0' }}>
              I nostri piatti possono contenere uno o più di questi allergeni. Il personale di sala è a disposizione
              per ogni informazione su ingredienti e preparazioni.
            </p>

            <div className="coperto-note">
              <span className="coperto-label">Coperto</span>
              <span className="coperto-price">€ {COPERTO}</span>
              <span className="coperto-desc">a persona · pane e servizio inclusi, acqua esclusa</span>
            </div>

            <p style={{ color: 'var(--ink-500)', fontStyle: 'italic', textAlign: 'center', margin: 'var(--sp-5) 0 0' }}>
              Il menù cambia ogni settimana in base alla disponibilità del mercato e della stagione.
            </p>
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
              <h2>Prenota il tuo tavolo</h2>
              <p className="lead">
                Assicurati il posto per assaporare la nostra cucina.
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
