/* ============================================================
   FERMENTO — Chi siamo (About)
   ============================================================ */

function About() {
  const story = window.FERMENTO_ABOUT;
  return (
    <main className="fade-in">
      {/* Page head */}
      <section className="section-tight" style={{ paddingBottom: 24 }}>
        <div className="wrap-narrow center">
          <div className="est" style={{ fontFamily: "var(--font-engrave)", letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "0.74rem", color: "var(--gold-deep)", marginBottom: 20 }}>
            La nostra storia
          </div>
          <h1 style={{ fontSize: "var(--fs-h1)" }}>Chi siamo</h1>
          <p className="lead">
            Una drogheria del 1928 diventata bottega del gusto. La storia di Fermento è fatta
            di ore lente, di mani in pasta e di una sala che non vuole mai mandarvi via.
          </p>
          <Flourish variant="gold" />
        </div>
      </section>

      {/* Lead image */}
      <section className="wrap" style={{ marginBottom: 24 }}>
        <PhotoPlate shape="wide" label="Fotografia" caption="La sala storica di Fermento, Bologna"
          style={{ maxHeight: 460 }} />
      </section>

      {/* Story body — alternating text & plates */}
      <section className="section-tight">
        <div className="wrap-narrow">
          {story.map((s, i) => (
            <article key={i} style={{ marginBottom: 48 }}>
              <h2 style={{ textAlign: "left", fontSize: "var(--fs-h3)", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-engrave)", color: "var(--gold)", fontSize: "0.9rem", marginRight: 10 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>{s.h}
              </h2>
              <p style={{ fontSize: "var(--fs-body)", color: "var(--ink-700)" }}>{s.p}</p>
              {i === 1 && (
                <div className="feature-2" style={{ margin: "32px 0 8px" }}>
                  <PhotoPlate shape="square" label="Fotografia" caption="Genoveffa, la pasta madre" />
                  <PhotoPlate shape="square" label="Fotografia" caption="La tostatrice al bancone" />
                </div>
              )}
            </article>
          ))}

          <div className="center">
            <Divider mark="❦" />
            <blockquote style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.7rem", color: "var(--ink-900)", lineHeight: 1.4, maxWidth: 640, margin: "0 auto" }}>
              «Un bistrot dovrebbe assomigliare al suo quartiere — e nutrirlo, ogni giorno,
              con la generosità di una tavola di famiglia.»
            </blockquote>
            <p className="muted" style={{ marginTop: 16, fontFamily: "var(--font-engrave)", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.74rem" }}>
              Lucia & Tommaso Bianchi
            </p>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="section" style={{ background: "var(--paper-3)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="feature-3">
            {[
              { n: "I", t: "Lievitazione lenta", d: "Trentasei ore di pasta madre per ogni pane e lievitato della vetrina." },
              { n: "II", t: "Filiera di vicinato", d: "Contadini, casari e vignaioli dell'Appennino bolognese, a chilometro vero." },
              { n: "III", t: "Ospitalità senza fretta", d: "Una sala fatta per restare, dal primo caffè all'ultimo calice." },
            ].map(v => (
              <div className="feature-item center" key={v.n}>
                <div className="fi-num" style={{ marginBottom: 10 }}>{v.n}</div>
                <h3 className="fi-title" style={{ marginTop: 0 }}>{v.t}</h3>
                <p className="muted" style={{ marginBottom: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReservationSection />
    </main>
  );
}

Object.assign(window, { About });
