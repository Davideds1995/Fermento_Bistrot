import { useState } from 'react'
import { CATEGORY_SUBCATEGORIES, CATEGORY_ZONES } from '../lib/menuSubcategories'
import type { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '../types'

export function MenuItemRow({ name, description, price }: MenuItemType) {
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

export function MenuCategorySection({ cat, subcategoryTabs = false }: { cat: MenuCategoryType; subcategoryTabs?: boolean }) {
  const subcategories = CATEGORY_SUBCATEGORIES[cat.id]
  const zones = CATEGORY_ZONES[cat.id]
  const hasSubcategories = subcategories && cat.items.some(i => i.subcategory)

  const groups = hasSubcategories
    ? subcategories
        .map(sub => ({ sub, items: cat.items.filter(i => i.subcategory === sub) }))
        .filter(g => g.items.length > 0)
    : [{ sub: null, items: cat.items }]

  const [activeSub, setActiveSub] = useState(groups[0]?.sub ?? null)
  const useTabs = subcategoryTabs && hasSubcategories && groups.length > 1
  const visibleGroups = useTabs ? groups.filter(g => g.sub === activeSub) : groups

  return (
    <div className="menu-cat" id={cat.id}>
      <div className="menu-cat-head">
        <div className="eyebrow-row">
          <span className="eyebrow">{cat.name}</span>
        </div>
        <p className="note">{cat.note}</p>
      </div>
      {useTabs && (
        <div className="subcat-nav">
          {groups.map(g => (
            <button
              key={g.sub}
              className={activeSub === g.sub ? 'active' : ''}
              onClick={() => setActiveSub(g.sub)}
            >
              {g.sub}
            </button>
          ))}
        </div>
      )}
      {visibleGroups.map(g => {
        const hasZones = zones && g.items.some(i => i.zona)
        const zoneGroups = hasZones
          ? zones.map(zona => ({ zona, items: g.items.filter(i => i.zona === zona) })).filter(zg => zg.items.length > 0)
          : [{ zona: null, items: g.items }]

        return (
          <div className="menu-subcat" key={g.sub ?? 'all'}>
            {g.sub && !useTabs && <h3 className="menu-subcat-title">{g.sub}</h3>}
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
