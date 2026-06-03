/* ============================================================
   FERMENTO — site chrome (header + footer)
   ============================================================ */

function Header({ route, go }) {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/chi-siamo", label: "Chi siamo" },
    { to: "/menu", label: "Menù" },
  ];
  const nav = (to) => (e) => { e.preventDefault(); go(to); setOpen(false); };
  return (
    <header className="site-header">
      <div className="wrap bar">
        <a href="#/" className="brand-link" onClick={nav("/")}>
          <Logo style={{ height: 40 }} />
        </a>
        <nav className="nav">
          {links.map(l => (
            <a key={l.to} href={"#" + l.to} onClick={nav(l.to)}
              className={route === l.to ? "active" : ""}>{l.label}</a>
          ))}
          <a href="#/" onClick={(e) => { e.preventDefault(); go("/", "reserve"); }}
            className="btn btn-gold btn-sm nav-cta">Prenota un tavolo</a>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <Icon name="menu" size={20} />
        </button>
      </div>
      {open && (
        <div className="wrap" style={{ paddingBottom: 16 }}>
          <div className="stack-sm" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map(l => (
              <a key={l.to} href={"#" + l.to} onClick={nav(l.to)}
                className="caps" style={{ padding: "10px 0", fontSize: "0.82rem" }}>{l.label}</a>
            ))}
            <a href="#/" onClick={(e) => { e.preventDefault(); go("/", "reserve"); setOpen(false); }}
              className="btn btn-gold" style={{ marginTop: 8 }}>Prenota un tavolo</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  const hours = window.FERMENTO_HOURS;
  return (
    <footer className="site-footer">
      <div className="wrap center">
        <Logo variant="ivory" className="foot-logo" />
        <Flourish variant="ivory" className="sm" />
        <div className="foot-cols">
          <div>
            <h4>Orari</h4>
            {hours.map(h => (
              <p key={h.d}>{h.d} · <span style={{ color: "rgba(244,236,218,0.92)" }}>{h.h}</span></p>
            ))}
          </div>
          <div>
            <h4>Dove siamo</h4>
            <p>Via delle Lievitazioni, 7</p>
            <p>40124 Bologna (BO)</p>
            <p style={{ marginTop: 8 }}><a href="#/">Indicazioni →</a></p>
          </div>
          <div>
            <h4>Contatti</h4>
            <p><a href="tel:+390512248800">+39 051 224 8800</a></p>
            <p><a href="mailto:ciao@fermentobistrot.it">ciao@fermentobistrot.it</a></p>
            <p style={{ marginTop: 8 }}>
              <a href="#/" onClick={(e) => { e.preventDefault(); go("/", "reserve"); }}>Prenota un tavolo →</a>
            </p>
          </div>
        </div>
        <div className="legal">
          © 2026 Fermento Caffè · Bistrot — P.IVA 0398 7621 004 · Bologna ·
          {" "}<a href="#/menu-admin" onClick={(e) => { e.preventDefault(); go("/menu-admin"); }} style={{ color: "rgba(244,236,218,0.4)" }}>Gestione menù</a>
          {" · "}<a href="#/admin" onClick={(e) => { e.preventDefault(); go("/admin"); }} style={{ color: "rgba(244,236,218,0.4)" }}>Area prenotazioni</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Footer });
