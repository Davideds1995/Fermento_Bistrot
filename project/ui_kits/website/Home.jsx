/* ============================================================
   FERMENTO — Home page
   ============================================================ */

function Home() {
  const C = window.FERMENTO_COPY;
  const atm = window.FERMENTO_ATMOSPHERE;
  return (
    <main className="fade-in">
      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <div className="est">{C.est}</div>
          <Logo className="hero-logo" />
          <p className="claim">{C.claim}</p>
          <div className="hero-actions">
            <Button variant="primary" onClick={() => scrollToId("reserve")} iconRight="arrowRight">Prenota un tavolo</Button>
            <a className="btn btn-outline" href="#/menu" onClick={(e) => { e.preventDefault(); window.__go("/menu"); }}>Sfoglia il menù</a>
          </div>
        </div>
      </section>

      {/* Intro presentation */}
      <section className="section-tight">
        <div className="wrap-narrow center">
          <Flourish variant="gold" className="sm" flip />
          <Eyebrow>La nostra bottega</Eyebrow>
          <h2>{C.introTitle}</h2>
          <p className="lead">{C.introBody}</p>
        </div>
      </section>

      {/* Atmosphere */}
      <section className="section" style={{ background: "var(--paper-3)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}>
            <Eyebrow>L'ambiente</Eyebrow>
            <h2>Tre momenti di una giornata da Fermento</h2>
          </div>
          <div className="feature-3">
            {atm.map(a => (
              <article className="feature-item" key={a.n}>
                <PhotoPlate shape="tall" label="Fotografia" caption={a.title} />
                <div className="fi-num">{a.n}</div>
                <h3 className="fi-title">{a.title}</h3>
                <p className="muted" style={{ marginBottom: 0 }}>{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature strip */}
      <section className="section-tight">
        <div className="wrap feature-2">
          <PhotoPlate shape="wide" label="Fotografia" caption="Il bancone in marmo di Verona" />
          <div>
            <Eyebrow className="" >Dal 2014</Eyebrow>
            <h2 style={{ textAlign: "left" }}>Lievito madre, caffè in lenta tostatura, vino dei nostri vignaioli</h2>
            <p className="muted">
              Ogni mattina rinfreschiamo «Genoveffa», la nostra pasta madre, e tostiamo il caffè
              a pochi passi dal bancone. La cucina segue il mercato: pochi piatti, fatti bene,
              con ciò che la stagione ci porta dall'Appennino.
            </p>
            <a className="btn btn-outline" href="#/chi-siamo" onClick={(e) => { e.preventDefault(); window.__go("/chi-siamo"); }}>La nostra storia</a>
          </div>
        </div>
      </section>

      <ReservationSection />
    </main>
  );
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
}

Object.assign(window, { Home, scrollToId });
