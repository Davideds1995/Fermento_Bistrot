import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import AdminGate from '../components/AdminGate'
import { supabase } from '../lib/supabase'
import type { Product } from '../types'

interface Category { id: string; name: string }
type ProductDraft = Omit<Product, 'id'> & { id?: string }

interface ProductModalProps {
  product: Product | null
  categories: Category[]
  onSave: (data: Product) => void
  onClose: () => void
}

/* ── Product form modal ── */
function ProductModal({ product, categories, onSave, onClose }: ProductModalProps) {
  const [form, setForm] = useState<ProductDraft>(product ?? {
    name: '', description: '', price: '',
    categoryId: categories[0]?.id ?? '',
    category: categories[0]?.name ?? '',
    tags: [],
  })

  function set(k: keyof ProductDraft) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))
  }

  function save(e: React.FormEvent) {
    e.preventDefault()
    onSave({
      ...form,
      id: form.id ?? `p-${Date.now()}`,
      category: categories.find(c => c.id === form.categoryId)?.name ?? form.categoryId,
    })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <h3>{product ? 'Modifica prodotto' : 'Nuovo prodotto'}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <form onSubmit={save}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="field col-2">
                <label>Nome <span className="req">*</span></label>
                <input className="input" required value={form.name} onChange={set('name')} placeholder="Es. Tagliatelle al ragù" />
              </div>
              <div className="field col-2">
                <label>Descrizione</label>
                <textarea className="textarea" value={form.description} onChange={set('description')}
                  placeholder="Ingredienti e breve descrizione del piatto." style={{ minHeight: 72 }} />
              </div>
              <div className="field">
                <label>Prezzo (€) <span className="req">*</span></label>
                <input className="input" required value={form.price} onChange={set('price')} placeholder="12,00" />
              </div>
              <div className="field">
                <label>Categoria <span className="req">*</span></label>
                <select className="select" required value={form.categoryId} onChange={set('categoryId')}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Annulla</button>
            <button type="submit" className="btn btn-primary">
              {product ? 'Salva modifiche' : 'Aggiungi prodotto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

type ModalState = Product | 'new' | null

/* ── Admin panel ── */
function Panel() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState>(null)
  const [catFilter, setCatFilter] = useState('all')

  useEffect(() => {
    async function load() {
      const [{ data: cats }, { data: items }] = await Promise.all([
        supabase.from('menu_categories').select('id, name').order('sort_order'),
        supabase.from('menu_items').select('id, category_id, name, description, price, tags').order('sort_order'),
      ])

      if (cats) setCategories(cats)
      if (cats && items) {
        setProducts(items.map(i => ({
          id: i.id,
          name: i.name,
          description: i.description,
          price: i.price,
          tags: i.tags ?? [],
          categoryId: i.category_id,
          category: cats.find(c => c.id === i.category_id)?.name ?? i.category_id,
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = catFilter === 'all' ? products : products.filter(p => p.categoryId === catFilter)

  async function save(data: Product) {
    if (modal === 'new') {
      const { data: inserted, error } = await supabase
        .from('menu_items')
        .insert({
          id: `p-${Date.now()}`,
          category_id: data.categoryId,
          name: data.name,
          description: data.description,
          price: data.price,
          tags: data.tags,
          sort_order: products.filter(p => p.categoryId === data.categoryId).length + 1,
        })
        .select()
        .single()

      if (error) { alert('Errore durante il salvataggio: ' + error.message); return }
      setProducts(ps => [...ps, {
        ...data,
        id: inserted.id,
        category: categories.find(c => c.id === inserted.category_id)?.name ?? inserted.category_id,
      }])
    } else {
      const { error } = await supabase
        .from('menu_items')
        .update({
          category_id: data.categoryId,
          name: data.name,
          description: data.description,
          price: data.price,
          tags: data.tags,
        })
        .eq('id', data.id)

      if (error) { alert('Errore durante il salvataggio: ' + error.message); return }
      setProducts(ps => ps.map(p => p.id === data.id ? {
        ...data,
        category: categories.find(c => c.id === data.categoryId)?.name ?? data.categoryId,
      } : p))
    }
    setModal(null)
  }

  async function del(id: string) {
    if (!confirm('Eliminare questo prodotto?')) return
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (!error) setProducts(ps => ps.filter(p => p.id !== id))
  }

  return (
    <div className="admin-shell">
      {/* Admin top bar */}
      <div className="admin-top">
        <div className="wrap">
          <div className="bar">
            <div className="a-brand">
              <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" style={{ height: 26 }} />
              <span className="a-tag">Gestione Menù</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <Link to="/admin" className="btn btn-ghost btn-sm">Prenotazioni</Link>
              <button className="btn btn-outline btn-sm" onClick={() => supabase.auth.signOut()}>
                <Icon name="logout" size={14} /> Esci
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap section">
        {/* Head */}
        <div className="admin-head">
          <div>
            <h1>Prodotti del menù</h1>
            <p className="sub">{products.length} voci · aggiornato oggi</p>
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')} disabled={loading}>
            <Icon name="plus" size={16} /> Aggiungi prodotto
          </button>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="seg">
            {(['all', ...categories.map(c => c.id)]).map(c => {
              const label = c === 'all' ? 'Tutti' : categories.find(m => m.id === c)?.name ?? c
              return (
                <button key={c} className={catFilter === c ? 'active' : ''} onClick={() => setCatFilter(c)}>
                  {label}
                </button>
              )
            })}
          </div>
          <div className="spacer" />
          <p style={{ color: 'var(--ink-500)', fontSize: 'var(--fs-small)', margin: 0 }}>
            {filtered.length} voci
          </p>
        </div>

        {/* Table */}
        <div className="table-scroll">
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--ink-500)', padding: 'var(--sp-8) 0' }}>
              Caricamento menù…
            </p>
          ) : (
            <table className="table table--menu">
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th>Categoria</th>
                  <th>Prezzo</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <p className="t-name" style={{ margin: 0 }}>{p.name}</p>
                      {p.description && <p className="t-sub" style={{ margin: 0 }}>{p.description}</p>}
                    </td>
                    <td>
                      <span className="badge badge-cat">{p.category}</span>
                    </td>
                    <td className="t-price">€ {p.price}</td>
                    <td className="cell-actions">
                      <div className="t-actions">
                        <button className="icon-btn" title="Modifica" onClick={() => setModal(p)}>
                          <Icon name="edit" size={15} />
                        </button>
                        <button className="icon-btn danger" title="Elimina" onClick={() => del(p.id)}>
                          <Icon name="trash" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <ProductModal
          product={modal === 'new' ? null : modal}
          categories={categories}
          onSave={save}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default function MenuAdmin() {
  return (
    <AdminGate title="Accesso Menù">
      <Panel />
    </AdminGate>
  )
}
