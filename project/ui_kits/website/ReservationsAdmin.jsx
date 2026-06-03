/* ============================================================
   FERMENTO — Admin prenotazioni (/admin)
   Protected (demo). Reservations table, date filter, confirm/cancel.
   ============================================================ */

function ReservationsAdmin({ go }) {
  const [unlocked, setUnlocked] = useState(false);
  const [rows, setRows] = useState(() => window.FERMENTO_RESERVATIONS.map(r => ({ ...r })));
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  if (!unlocked) {
    return <PasswordGate
      title="Area Prenotazioni"
      subtitle="Consultate, confermate o cancellate le prenotazioni in arrivo."
      onUnlock={() => setUnlocked(true)} />;
  }

  const dates = Array.from(new Set(window.FERMENTO_RESERVATIONS.map(r => r.date))).sort();
  let shown = rows;
  if (dateFilter !== "all") shown = shown.filter(r => r.date === dateFilter);
  if (statusFilter !== "all") shown = shown.filter(r => r.status === statusFilter);
  shown = [...shown].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const setStatus = (id, status) => setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  const counts = {
    total: rows.length,
    confirmed: rows.filter(r => r.status === "confirmed").length,
    pending: rows.filter(r => r.status === "pending").length,
    covers: rows.filter(r => r.status !== "cancelled").reduce((s, r) => s + r.people, 0),
  };

  return (
    <div className="admin-shell">
      <AdminTop tag="Prenotazioni" current="res"
        onLogout={() => setUnlocked(false)} onSwitch={go} />
      <div className="wrap section-tight">
        <div className="admin-head">
          <div>
            <h1>Prenotazioni</h1>
            <p className="sub">Vista sala · giugno 2026</p>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat"><div className="n">{counts.total}</div><div className="l">Totali</div></div>
          <div className="stat"><div className="n">{counts.confirmed}</div><div className="l">Confermate</div></div>
          <div className="stat"><div className="n">{counts.pending}</div><div className="l">In attesa</div></div>
          <div className="stat"><div className="n">{counts.covers}</div><div className="l">Coperti attesi</div></div>
        </div>

        <div className="toolbar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="calendar" size={16} style={{ color: "var(--ink-500)" }} />
            <Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ width: "auto", minWidth: 180 }}>
              <option value="all">Tutte le date</option>
              {dates.map(d => <option key={d} value={d}>{formatDate(d)}</option>)}
            </Select>
          </div>
          <div className="seg">
            {[["all", "Tutte"], ["pending", "In attesa"], ["confirmed", "Confermate"], ["cancelled", "Cancellate"]].map(([k, l]) => (
              <button key={k} className={statusFilter === k ? "active" : ""} onClick={() => setStatusFilter(k)}>{l}</button>
            ))}
          </div>
          <div className="spacer"></div>
          <span className="muted" style={{ fontSize: "0.85rem", fontStyle: "italic" }}>{shown.length} risultati</span>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 130 }}>Data / Ora</th>
                <th>Cliente</th>
                <th style={{ width: 80 }}>Pax</th>
                <th>Contatti</th>
                <th style={{ width: 120 }}>Stato</th>
                <th style={{ width: 180, textAlign: "right" }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="t-name" style={{ fontSize: "0.98rem" }}>{formatDateShort(r.date)}</div>
                    <div className="t-sub" style={{ fontStyle: "normal", color: "var(--gold-deep)" }}>{r.time}</div>
                  </td>
                  <td>
                    <div className="t-name">{r.name}</div>
                    {r.note && <div className="t-sub" title={r.note}>“{r.note.length > 46 ? r.note.slice(0, 46) + "…" : r.note}”</div>}
                  </td>
                  <td><span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--ink-900)" }}>{r.people}</span></td>
                  <td>
                    <div style={{ fontSize: "0.92rem", color: "var(--ink-700)" }}>{r.phone}</div>
                    <div className="t-sub" style={{ fontStyle: "normal" }}>{r.email}</div>
                  </td>
                  <td><Badge status={r.status} /></td>
                  <td className="cell-actions">
                    <div className="t-actions">
                      {r.status !== "confirmed" && (
                        <Button variant="outline" size="sm" icon="check" onClick={() => setStatus(r.id, "confirmed")}>Conferma</Button>
                      )}
                      {r.status !== "cancelled" && (
                        <Button variant="danger" size="sm" icon="x" onClick={() => setStatus(r.id, "cancelled")}>Cancella</Button>
                      )}
                      {r.status === "cancelled" && (
                        <Button variant="ghost" size="sm" onClick={() => setStatus(r.id, "pending")}>Ripristina</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: "center", color: "var(--ink-500)", fontStyle: "italic", padding: 40 }}>
                  Nessuna prenotazione per i filtri selezionati.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="muted" style={{ fontStyle: "italic", fontSize: "0.82rem", marginTop: 16 }}>
          Anteprima dimostrativa — le modifiche non vengono salvate. I dati saranno collegati a Supabase.
        </p>
      </div>
    </div>
  );
}

function formatDateShort(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
  return `${d} ${mesi[m - 1]}`;
}

Object.assign(window, { ReservationsAdmin, formatDateShort });
