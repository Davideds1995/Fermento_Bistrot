/* ============================================================
   FERMENTO — admin shared chrome (gate + top bar)
   Password is a static demo stub (any value opens the panel).
   ============================================================ */

function PasswordGate({ title, subtitle, onUnlock }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    // Demo stub: accepts the suggested password (or any non-empty value).
    if (pw.trim().length === 0) { setErr(true); return; }
    onUnlock();
  };
  return (
    <div className="gate">
      <form className="gate-card" onSubmit={submit}>
        <Logo className="gate-logo" />
        <div className="lock"><Icon name="lock" size={22} /></div>
        <h2 style={{ marginBottom: 8 }}>{title}</h2>
        <p className="muted" style={{ fontStyle: "italic", marginBottom: 28 }}>{subtitle}</p>
        <Field label="Password">
          <Input type="password" value={pw} autoFocus
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            placeholder="••••••••" style={err ? { borderColor: "var(--terracotta)" } : null} />
        </Field>
        {err && <p style={{ color: "var(--terracotta)", fontSize: "0.85rem", marginTop: 8, fontStyle: "italic" }}>Inserite la password per accedere.</p>}
        <div style={{ marginTop: 20 }}>
          <Button variant="primary" type="submit" block iconRight="arrowRight">Accedi</Button>
        </div>
        <p className="hint">
          Area riservata allo staff. Anteprima dimostrativa — usate la password
          <strong style={{ color: "var(--gold-deep)" }}> fermento</strong> (o qualunque valore).
        </p>
      </form>
    </div>
  );
}

function AdminTop({ tag, onLogout, onSwitch, current }) {
  return (
    <div className="admin-top">
      <div className="wrap bar">
        <div className="a-brand">
          <Logo style={{ height: 26 }} />
          <span className="a-tag">{tag}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="seg">
            <button className={current === "menu" ? "active" : ""} onClick={() => onSwitch("/menu-admin")}>Menù</button>
            <button className={current === "res" ? "active" : ""} onClick={() => onSwitch("/admin")}>Prenotazioni</button>
          </div>
          <Button variant="ghost" size="sm" icon="logout" onClick={onLogout}>Esci</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PasswordGate, AdminTop });
