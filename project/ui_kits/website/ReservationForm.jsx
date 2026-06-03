/* ============================================================
   FERMENTO — shared reservation block (ReservationForm.jsx)
   Static front-end only — Supabase wired later.
   ============================================================ */

function ReservationSection({ id = "reserve" }) {
  const today = "2026-06-04";
  const empty = { name: "", phone: "", email: "", date: today, time: "20:00", people: "2", note: "" };
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(null);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const times = [];
  for (let h = 8; h <= 22; h++) for (const m of ["00", "30"]) times.push(`${String(h).padStart(2, "0")}:${m}`);

  const submit = (e) => {
    e.preventDefault();
    setDone({ ...form });
  };
  const reset = () => { setForm(empty); setDone(null); };

  return (
    <section id={id} className="reserve section">
      <div className="wrap-narrow center">
        <Eyebrow>Prenotazioni</Eyebrow>
        <h2>Riservate la vostra tavola</h2>
        <p className="lead" style={{ marginBottom: 8 }}>
          Vi aspettiamo dalla colazione all'ultimo calice. Indicateci data, ora e numero di
          coperti: confermeremo la vostra prenotazione a breve.
        </p>
        <Divider mark="❦" />

        {done ? (
          <div className="panel panel-pad" style={{ background: "rgba(244,236,218,0.05)", borderColor: "rgba(244,236,218,0.18)", textAlign: "left" }}>
            <div className="confirm-msg" style={{ marginTop: 0 }}>
              <div className="seal"><Icon name="check" size={22} /></div>
              <div>
                <div className="ct">Grazie, {done.name.split(" ")[0] || "a presto"}!</div>
                <p className="cs">
                  Abbiamo ricevuto la richiesta per <strong style={{ color: "var(--paper-2)" }}>{done.people} {Number(done.people) === 1 ? "persona" : "persone"}</strong> il{" "}
                  <strong style={{ color: "var(--paper-2)" }}>{formatDate(done.date)}</strong> alle{" "}
                  <strong style={{ color: "var(--paper-2)" }}>{done.time}</strong>. Riceverete una conferma via e-mail
                  all'indirizzo {done.email || "indicato"}.
                </p>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Button variant="outline" onClick={reset}
                style={{ color: "var(--paper-2)", borderColor: "rgba(244,236,218,0.3)" }}>
                Nuova prenotazione
              </Button>
            </div>
            <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.78rem", color: "rgba(244,236,218,0.4)", fontStyle: "italic" }}>
              Dimostrazione — nessun dato viene salvato in questa anteprima.
            </p>
          </div>
        ) : (
          <form className="panel panel-pad" onSubmit={submit}
            style={{ background: "rgba(244,236,218,0.05)", borderColor: "rgba(244,236,218,0.18)", textAlign: "left" }}>
            <div className="form-grid">
              <Field label="Nome e cognome" required>
                <Input value={form.name} onChange={set("name")} placeholder="Es. Giulia Ferrari" required />
              </Field>
              <Field label="Telefono" required>
                <Input value={form.phone} onChange={set("phone")} placeholder="+39 ___ ___ ____" required />
              </Field>
              <Field label="E-mail" required full>
                <Input type="email" value={form.email} onChange={set("email")} placeholder="nome@email.it" required />
              </Field>
              <Field label="Data" required>
                <Input type="date" value={form.date} onChange={set("date")} required />
              </Field>
              <Field label="Ora" required>
                <Select value={form.time} onChange={set("time")}>
                  {times.map(t => <option key={t} value={t}>{t}</option>)}
                </Select>
              </Field>
              <Field label="Persone" required full>
                <Select value={form.people} onChange={set("people")}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "persona" : "persone"}</option>
                  ))}
                  <option value="13">Più di 12 — gruppo</option>
                </Select>
              </Field>
              <Field label="Note (allergie, occasioni, richieste)" full>
                <Textarea value={form.note} onChange={set("note")}
                  placeholder="Un tavolo tranquillo, un'allergia, un anniversario da festeggiare…" />
              </Field>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.82rem", color: "rgba(244,236,218,0.5)", fontStyle: "italic" }}>
                I campi con <span style={{ color: "var(--terracotta)" }}>*</span> sono obbligatori.
              </span>
              <Button variant="gold" type="submit" iconRight="arrowRight">Prenota</Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  return `${d} ${mesi[m - 1]} ${y}`;
}

Object.assign(window, { ReservationSection, formatDate });
