import { useState } from 'react'
import { useLanguage } from '../lib/i18n'
import type { MenuCategory } from '../types'

interface ExportMenuModalProps {
  categories: MenuCategory[]
  onClose: () => void
  onExport: (selectedIds: string[], includeAllergens: boolean) => void
}

export default function ExportMenuModal({ categories, onClose, onExport }: ExportMenuModalProps) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<Set<string>>(() => new Set(categories.map(c => c.id)))
  const [includeAllergens, setIncludeAllergens] = useState(true)

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(prev => (prev.size === categories.length ? new Set() : new Set(categories.map(c => c.id))))
  }

  function submit() {
    if (selected.size === 0) return
    onExport(categories.filter(c => selected.has(c.id)).map(c => c.id), includeAllergens)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <h3>{t('menuPage.exportModalTitle')}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <div className="modal-body">
          <p style={{ marginTop: 0, color: 'var(--ink-500)' }}>{t('menuPage.exportModalLead')}</p>

          <button type="button" className="export-select-all" onClick={toggleAll}>
            {selected.size === categories.length ? t('menuPage.exportDeselectAll') : t('menuPage.exportSelectAll')}
          </button>

          <div className="export-cat-list">
            {categories.map(cat => (
              <label className="export-cat-item" key={cat.id}>
                <input
                  type="checkbox"
                  checked={selected.has(cat.id)}
                  onChange={() => toggle(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>

          <label className="export-cat-item" style={{ marginTop: 'var(--sp-4)' }}>
            <input
              type="checkbox"
              checked={includeAllergens}
              onChange={() => setIncludeAllergens(v => !v)}
            />
            {t('menuPage.exportIncludeAllergens')}
          </label>

          {selected.size === 0 && (
            <p style={{ color: 'var(--terracotta)', fontSize: 'var(--fs-small)' }}>
              {t('menuPage.exportNoneSelected')}
            </p>
          )}
        </div>
        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>{t('menuPage.exportCancel')}</button>
          <button type="button" className="btn btn-primary" disabled={selected.size === 0} onClick={submit}>
            {t('menuPage.exportConfirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
