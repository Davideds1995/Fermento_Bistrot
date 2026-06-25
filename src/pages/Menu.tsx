import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReservationForm from '../components/ReservationForm'
import { Flourish, Divider } from '../components/Divider'
import { MENU } from '../data/content'
import type { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '../types'

const TAG_LABELS: Record<string, string> = { veg: 'Vegetariano', vegan: 'Vegano' }

function DietTag({ tag }: { tag: string }) {
  return <span className="diet-tag">{TAG_LABELS[tag] ?? tag}</span>
}

function MenuItemRow({ name, desc, price, tags }: MenuItemType) {
  return (
    <div className="menu-item">
      <div>
        <span className="mi-name">{name}</span>
        {tags.length > 0 && (
          <span className="mi-tags">
            {tags.map(t => <DietTag key={t} tag={t} />)}
          </span>
        )}
        <p className="mi-desc">{desc}</p>
      </div>
      <span className="mi-price">€ {price}</span>
    </div>
  )
}

function MenuCategorySection({ cat }: { cat: MenuCategoryType }) {
  return (
    <div className="menu-cat" id={cat.id}>
      <div className="menu-cat-head">
        <div className="eyebrow-row">
          <span className="eyebrow">{cat.name}</span>
        </div>
        <p className="note">{cat.note}</p>
      </div>
      <div>
        {cat.items.map(item => <MenuItemRow key={item.id} {...item} />)}
      </div>
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState(MENU[0].id)

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
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
        <div style={{
          position: 'sticky', top: 78, zIndex: 20,
          background: 'rgba(244,236,218,0.92)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--line)', padding: 'var(--sp-4) 0',
        }}>
          <div className="wrap">
            <div className="cat-nav">
              {MENU.map(cat => (
                <button
                  key={cat.id}
                  className={active === cat.id ? 'active' : ''}
                  onClick={() => scrollTo(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Menu sections ── */}
        <section className="section">
          <div className="wrap-narrow">
            {MENU.map((cat, i) => (
              <div key={cat.id}>
                <MenuCategorySection cat={cat} />
                {i < MENU.length - 1 && (
                  <div style={{ margin: 'var(--sp-6) 0' }}>
                    <Divider />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Notes ── */}
        <section className="section-tight" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center' }}>
          <div className="wrap-narrow">
            <Flourish flip small />
            <p style={{ color: 'var(--ink-500)', fontStyle: 'italic', margin: 'var(--sp-5) 0 0' }}>
              Il menù cambia ogni settimana in base alla disponibilità del mercato e della stagione.
              Informate il servizio di allergie o intolleranze alimentari.
              Coperto e acqua non sono inclusi nel prezzo.
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
