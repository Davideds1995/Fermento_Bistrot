import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import AdminGate from '../components/AdminGate'
import Seo from '../components/Seo'
import ExportMenuModal from '../components/ExportMenuModal'
import { MenuCategorySection } from '../components/MenuCategorySection'
import { supabase } from '../lib/supabase'
import { CATEGORY_SUBCATEGORIES, CATEGORY_ZONES } from '../lib/menuSubcategories'
import { ALLERGENS, COPERTO } from '../data/content'
import { useLanguage } from '../lib/i18n'
import type { Product, MenuCategory as MenuCategoryType } from '../types'

interface Category { id: string; name: string; note?: string }
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
    subcategory: null,
    zona: null,
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
      subcategory: CATEGORY_SUBCATEGORIES[form.categoryId] ? (form.subcategory || null) : null,
      zona: CATEGORY_ZONES[form.categoryId] && form.subcategory ? (form.zona || null) : null,
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
              {CATEGORY_SUBCATEGORIES[form.categoryId] && (
                <div className="field">
                  <label>Sottocategoria</label>
                  <select className="select" value={form.subcategory ?? ''} onChange={set('subcategory')}>
                    <option value="">— Nessuna —</option>
                    {CATEGORY_SUBCATEGORIES[form.categoryId].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}
              {CATEGORY_ZONES[form.categoryId] && form.subcategory && (
                <div className="field">
                  <label>Zona</label>
                  <select className="select" value={form.zona ?? ''} onChange={set('zona')}>
                    <option value="">— Nessuna —</option>
                    {CATEGORY_ZONES[form.categoryId].map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
              )}
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

interface BulkRow {
  key: string
  name: string
  description: string
  price: string
  categoryId: string
  subcategory: string
  zona: string
}

function emptyBulkRow(categories: Category[]): BulkRow {
  return {
    key: `r-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: '', description: '', price: '',
    categoryId: categories[0]?.id ?? '',
    subcategory: '',
    zona: '',
  }
}

interface BulkAddModalProps {
  categories: Category[]
  onSave: (rows: BulkRow[]) => void
  onClose: () => void
}

/* ── Bulk product form modal ── */
function BulkAddModal({ categories, onSave, onClose }: BulkAddModalProps) {
  const [rows, setRows] = useState<BulkRow[]>(() => [
    emptyBulkRow(categories), emptyBulkRow(categories), emptyBulkRow(categories),
  ])

  function patchRow(key: string, patch: Partial<BulkRow>) {
    setRows(rs => rs.map(r => r.key === key ? { ...r, ...patch } : r))
  }

  function addRow() {
    setRows(rs => [...rs, emptyBulkRow(categories)])
  }

  function removeRow(key: string) {
    setRows(rs => rs.length > 1 ? rs.filter(r => r.key !== key) : rs)
  }

  const validRows = rows.filter(r => r.name.trim() && r.price.trim() && r.categoryId)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (validRows.length === 0) return
    onSave(validRows)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-wide">
        <div className="modal-head">
          <h3>Aggiungi prodotti in blocco</h3>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            <div className="bulk-rows">
              {rows.map((row, i) => (
                <div className="bulk-row" key={row.key}>
                  <span className="bulk-row-n">{i + 1}</span>
                  <input className="input" placeholder="Nome *" value={row.name}
                    onChange={e => patchRow(row.key, { name: e.target.value })} />
                  <input className="input" placeholder="Descrizione" value={row.description}
                    onChange={e => patchRow(row.key, { description: e.target.value })} />
                  <input className="input" placeholder="Prezzo *" value={row.price}
                    onChange={e => patchRow(row.key, { price: e.target.value })} />
                  <select className="select" value={row.categoryId}
                    onChange={e => patchRow(row.key, { categoryId: e.target.value, subcategory: '', zona: '' })}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {CATEGORY_SUBCATEGORIES[row.categoryId] ? (
                    <select className="select" value={row.subcategory}
                      onChange={e => patchRow(row.key, { subcategory: e.target.value, zona: '' })}>
                      <option value="">— Sottocategoria —</option>
                      {CATEGORY_SUBCATEGORIES[row.categoryId].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : <span />}
                  {CATEGORY_ZONES[row.categoryId] && row.subcategory ? (
                    <select className="select" value={row.zona}
                      onChange={e => patchRow(row.key, { zona: e.target.value })}>
                      <option value="">— Zona —</option>
                      {CATEGORY_ZONES[row.categoryId].map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                  ) : <span />}
                  <button type="button" className="icon-btn danger" title="Rimuovi riga"
                    onClick={() => removeRow(row.key)} disabled={rows.length === 1}>
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addRow} style={{ marginTop: 'var(--sp-4)' }}>
              <Icon name="plus" size={14} /> Aggiungi riga
            </button>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Annulla</button>
            <button type="submit" className="btn btn-primary" disabled={validRows.length === 0}>
              Aggiungi {validRows.length > 0 && `${validRows.length} `}prodott{validRows.length === 1 ? 'o' : 'i'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface DeleteConfirmModalProps {
  products: Product[]
  onConfirm: () => void
  onClose: () => void
}

/* ── Bulk delete confirmation modal ── */
function DeleteConfirmModal({ products, onConfirm, onClose }: DeleteConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <h3>Elimina prodotti</h3>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <div className="modal-body">
          <p style={{ margin: 0 }}>Confermi di voler eliminare i seguenti prodotti?</p>
          <ul className="delete-list">
            {products.map(p => (
              <li key={p.id}>
                <span className="t-name">{p.name}</span>{' '}
                <span className="muted">— {p.category}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Annulla</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Elimina {products.length} prodott{products.length === 1 ? 'o' : 'i'}
          </button>
        </div>
      </div>
    </div>
  )
}

type ModalState = Product | 'new' | null

/* ── Admin panel ── */
function Panel() {
  const { lang, t } = useLanguage()
  const allergens = ALLERGENS[lang]
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState>(null)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [catFilter, setCatFilter] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [printJob, setPrintJob] = useState<{ categories: MenuCategoryType[]; includeAllergens: boolean } | null>(null)
  const [coperto, setCoperto] = useState(COPERTO)
  const [copertoInput, setCopertoInput] = useState(COPERTO)
  const [savingCoperto, setSavingCoperto] = useState(false)
  const [copertoSaved, setCopertoSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const [{ data: cats }, { data: items }, { data: settings }] = await Promise.all([
        supabase.from('menu_categories').select('id, name, note').order('sort_order'),
        supabase.from('menu_items').select('id, category_id, name, description, price, subcategory, zona').order('sort_order'),
        supabase.from('site_settings').select('coperto').eq('id', 1).single(),
      ])

      if (cats) setCategories(cats)
      if (cats && items) {
        setProducts(items.map(i => ({
          id: i.id,
          name: i.name,
          description: i.description,
          price: i.price,
          subcategory: i.subcategory ?? null,
          zona: i.zona ?? null,
          categoryId: i.category_id,
          category: cats.find(c => c.id === i.category_id)?.name ?? i.category_id,
        })))
      }
      if (settings?.coperto) {
        setCoperto(settings.coperto)
        setCopertoInput(settings.coperto)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function saveCoperto() {
    const value = copertoInput.trim()
    if (!value || value === coperto) return
    setSavingCoperto(true)
    const { data, error } = await supabase.from('site_settings').update({ coperto: value }).eq('id', 1).select().single()
    setSavingCoperto(false)
    if (error || !data) { alert('Errore durante il salvataggio: ' + (error?.message ?? 'riprova.')); return }
    setCoperto(data.coperto)
    setCopertoInput(data.coperto)
    setCopertoSaved(true)
    setTimeout(() => setCopertoSaved(false), 2000)
  }

  const filtered = catFilter === 'all' ? products : products.filter(p => p.categoryId === catFilter)

  const menuCategories: MenuCategoryType[] = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    note: cat.note ?? '',
    items: products.filter(p => p.categoryId === cat.id),
  }))

  function handleExport(selectedIds: string[], includeAllergens: boolean) {
    setExportOpen(false)
    setPrintJob({ categories: menuCategories.filter(c => selectedIds.includes(c.id)), includeAllergens })
  }

  useEffect(() => {
    if (!printJob) return
    const frame = requestAnimationFrame(() => window.print())
    return () => cancelAnimationFrame(frame)
  }, [printJob])

  useEffect(() => {
    function handleAfterPrint() { setPrintJob(null) }
    window.addEventListener('afterprint', handleAfterPrint)
    return () => window.removeEventListener('afterprint', handleAfterPrint)
  }, [])

  async function save(data: Product) {
    if (modal === 'new') {
      const { data:  inserted, error } = await supabase
        .from('menu_items')
        .insert({
          id: `p-${Date.now()}`,
          category_id: data.categoryId,
          name: data.name,
          description: data.description,
          price: data.price,
          subcategory: data.subcategory,
          zona: data.zona,
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
          subcategory: data.subcategory,
          zona: data.zona,
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

  async function saveBulk(rows: BulkRow[]) {
    const countByCategory: Record<string, number> = {}
    const payload = rows.map((r, i) => {
      const already = countByCategory[r.categoryId] ?? products.filter(p => p.categoryId === r.categoryId).length
      countByCategory[r.categoryId] = already + 1
      return {
        id: `p-${Date.now()}-${i}`,
        category_id: r.categoryId,
        name: r.name.trim(),
        description: r.description.trim(),
        price: r.price.trim(),
        subcategory: r.subcategory || null,
        zona: r.zona || null,
        sort_order: already + 1,
      }
    })

    const { data: inserted, error } = await supabase.from('menu_items').insert(payload).select()
    if (error) { alert('Errore durante il salvataggio: ' + error.message); return }

    setProducts(ps => [...ps, ...inserted.map(i => ({
      id: i.id,
      name: i.name,
      description: i.description,
      price: i.price,
      subcategory: i.subcategory ?? null,
      zona: i.zona ?? null,
      categoryId: i.category_id,
      category: categories.find(c => c.id === i.category_id)?.name ?? i.category_id,
    }))])
    setBulkOpen(false)
  }

  async function del(id: string) {
    if (!confirm('Eliminare questo prodotto?')) return
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (!error) {
      setProducts(ps => ps.filter(p => p.id !== id))
      setSelected(s => { const next = new Set(s); next.delete(id); return next })
    }
  }

  function toggleSelect(id: string) {
    setSelected(s => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allFilteredSelected = filtered.length > 0 && filtered.every(p => selected.has(p.id))

  function toggleSelectAllFiltered() {
    setSelected(s => {
      const next = new Set(s)
      if (allFilteredSelected) filtered.forEach(p => next.delete(p.id))
      else filtered.forEach(p => next.add(p.id))
      return next
    })
  }

  const selectedProducts = products.filter(p => selected.has(p.id))

  async function deleteSelected() {
    const ids = selectedProducts.map(p => p.id)
    const { error } = await supabase.from('menu_items').delete().in('id', ids)
    if (error) { alert('Errore durante l\'eliminazione: ' + error.message); return }
    setProducts(ps => ps.filter(p => !selected.has(p.id)))
    setSelected(new Set())
    setConfirmDelete(false)
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
          <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
            <button className="btn btn-outline" onClick={() => setExportOpen(true)} disabled={loading || categories.length === 0}>
              <Icon name="download" size={16} /> Esporta PDF
            </button>
            <button className="btn btn-outline" onClick={() => setBulkOpen(true)} disabled={loading}>
              <Icon name="plus" size={16} /> Aggiungi in blocco
            </button>
            <button className="btn btn-primary" onClick={() => setModal('new')} disabled={loading}>
              <Icon name="plus" size={16} /> Aggiungi prodotto
            </button>
          </div>
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

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="bulk-bar">
            <span className="count">{selected.size} selezionat{selected.size === 1 ? 'o' : 'i'}</span>
            <div className="spacer" />
            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(new Set())}>Deseleziona</button>
            <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(true)}>
              <Icon name="trash" size={14} /> Elimina selezionati
            </button>
          </div>
        )}

        {/* Coperto */}
        <div className="coperto-edit">
          <div>
            <p className="coperto-edit-label">Prezzo del coperto</p>
            <p className="coperto-edit-hint">Mostrato nel menù pubblico e nei PDF esportati</p>
          </div>
          <div className="coperto-edit-form">
            <span className="coperto-edit-prefix">€</span>
            <input
              className="input"
              value={copertoInput}
              onChange={e => setCopertoInput(e.target.value)}
              style={{ width: 100 }}
              disabled={loading}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={saveCoperto}
              disabled={loading || savingCoperto || copertoInput.trim() === coperto || !copertoInput.trim()}
            >
              {savingCoperto ? 'Salvataggio…' : 'Salva'}
            </button>
            {copertoSaved && (
              <span className="coperto-edit-saved">
                <Icon name="check" size={13} /> Salvato
              </span>
            )}
          </div>
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
                  <th className="check-col">
                    <input type="checkbox" className="check" checked={allFilteredSelected}
                      onChange={toggleSelectAllFiltered} aria-label="Seleziona tutti" />
                  </th>
                  <th>Prodotto</th>
                  <th>Categoria</th>
                  <th>Zona</th>
                  <th>Prezzo</th>
                  <th style={{ textAlign: 'right' }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <input type="checkbox" className="check" checked={selected.has(p.id)}
                        onChange={() => toggleSelect(p.id)} aria-label={`Seleziona ${p.name}`} />
                    </td>
                    <td>
                      <p className="t-name" style={{ margin: 0 }}>{p.name}</p>
                      {p.description && <p className="t-sub" style={{ margin: 0 }}>{p.description}</p>}
                    </td>
                    <td>
                      <span className="badge badge-cat">{p.category}</span>
                    </td>
                    <td>
                      {p.zona ? <span className="badge badge-cat">{p.zona}</span> : <span className="muted">—</span>}
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

      {bulkOpen && (
        <BulkAddModal
          categories={categories}
          onSave={saveBulk}
          onClose={() => setBulkOpen(false)}
        />
      )}

      {confirmDelete && (
        <DeleteConfirmModal
          products={selectedProducts}
          onConfirm={deleteSelected}
          onClose={() => setConfirmDelete(false)}
        />
      )}

      {exportOpen && (
        <ExportMenuModal
          categories={menuCategories}
          onClose={() => setExportOpen(false)}
          onExport={handleExport}
        />
      )}

      {printJob && createPortal(
        <div className="print-sheet">
          <div className="wrap-narrow">
            <div className="print-sheet-head">
              <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento.png" alt="Fermento" />
              <h1>{t('menuPage.title')}</h1>
              <p>{t('menuPage.exportPrintSubtitle')}</p>
            </div>

            {printJob.categories.map(cat => (
              <MenuCategorySection cat={cat} key={cat.id} />
            ))}

            {printJob.includeAllergens && (
              <div className="print-sheet-footer">
                <div className="allergen-grid">
                  {allergens.map(a => (
                    <div className="allergen-item" key={a.n}>
                      <span className="allergen-num">{a.n}</span>
                      <span className="allergen-label">{a.label}</span>
                    </div>
                  ))}
                </div>
                <p className="print-sheet-note">{t('menuPage.allergensNote')}</p>
                <div className="coperto-note">
                  <span className="coperto-label">{t('menuPage.cover')}</span>
                  <span className="coperto-price">€ {coperto}</span>
                  <span className="coperto-desc">{t('menuPage.perPerson')}</span>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default function MenuAdmin() {
  return (
    <>
      <Seo
        title="Area riservata — Gestione Menù | Fermento"
        description="Area riservata di gestione del menù."
        path="/menu-admin"
        noindex
      />
      <AdminGate title="Accesso Menù">
        <Panel />
      </AdminGate>
    </>
  )
}
