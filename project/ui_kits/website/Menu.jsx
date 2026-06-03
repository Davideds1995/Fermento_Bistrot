/* ============================================================
   FERMENTO — Menù
   ============================================================ */

function MenuPage() {
  const menu = window.FERMENTO_MENU;
  const [active, setActive] = useState(menu[0].id);

  const goCat = (id) => {
    setActive(id);
    const el = document.getElementById("cat-" + id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  };

  return (
    <main className="fade-in">
      <section className="section-tight" style={{ paddingBottom: 16 }}>
        <div className="wrap-narrow center">
          <Eyebrow>Cucina di mercato</Eyebrow>
          <h1 style={{ fontSize: "var(--fs-h1)" }}>Il Menù</h1>
          <p className="lead">
            Pochi piatti, fatti bene, con ciò che la stagione ci porta. La carta cambia spesso:
            chiedete al servizio i fuori menù del giorno.
          </p>
          <Flourish variant="gold" />
        </div>
      </section>

      {/* Sticky category index */}
      <div style={{ position: "sticky", top: 78, zIndex: 20, background: "rgba(244,236,218,0.9)", backdropFilter: "blur(6px)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "14px 0" }}>
        <div className="wrap">
          <div className="cat-nav">
            {menu.map(c => (
              <button key={c.id} className={active === c.id ? "active" : ""} onClick={() => goCat(c.id)}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="wrap-narrow">
          {menu.map(cat => (
            <div className="menu-cat" id={"cat-" + cat.id} key={cat.id} style={{ scrollMarginTop: 140 }}>
              <div className="menu-cat-head">
                <Flourish variant="gold" className="sm" flip />
                <div className="name">{cat.name}</div>
                {cat.note && <div className="note">{cat.note}</div>}
              </div>
              <div>
                {cat.items.map(it => <MenuRow key={it.id} item={it} />)}
              </div>
            </div>
          ))}

          <div className="center" style={{ marginTop: 48 }}>
            <p className="muted" style={{ fontStyle: "italic" }}>
              Coperto € 2,00 · Per allergie e intolleranze chiedete al personale di sala.
            </p>
            <Button variant="primary" onClick={() => window.__go("/", "reserve")} iconRight="arrowRight">
              Prenota un tavolo
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function MenuRow({ item }) {
  return (
    <div className="menu-item">
      <div>
        <span className="mi-name">{item.name}</span>
        {item.tags.length > 0 && (
          <span className="mi-tags">
            {item.tags.map(t => <span key={t} className="diet-tag">{t === "veg" ? "Veg" : t === "vegan" ? "Vegan" : t}</span>)}
          </span>
        )}
        <div className="mi-desc">{item.desc}</div>
      </div>
      <div className="mi-price">€ {item.price}</div>
    </div>
  );
}

Object.assign(window, { MenuPage });
