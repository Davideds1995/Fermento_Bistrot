/* ============================================================
   FERMENTO — Menù-Admin (/menu-admin)
   Protected (demo). Editable product table with add/edit/delete.
   ============================================================ */

function MenuAdmin({ go }) {
  const [unlocked, setUnlocked] = useState(false);
  const [products, setProducts] = useState(() => window.FERMENTO_PRODUCTS.map(p => ({ ...p })));
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null); // product obj or {} for new
  const cats = window.FERMENTO_MENU.map(c => ({ id: c.id, name: c.name }));

  if (!unlocked) {
    return <PasswordGate
      title="Gestione Menù"
      subtitle="Aggiungete, modificate ed eliminate le voci della carta."
      onUnlock={() => setUnlocked(true)} />;
  }

  const shown = filter === "all" ? products : products.filter(p => p.categoryId === filter);

  const save = (data) => {
    setProducts(prev => {
      if (data.id) return prev.map(p => p.id === data.id ? { ...p, ...data } : p);
      const cat = cats.find(c => c.id === data.categoryId);
      return [...prev, { ...data, id: "n" + Date.now(), category: cat ? cat.name : "" }];
    });
    setEditing(null);
  };
  const remove = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <div className="admin-shell">
      <AdminTop tag="Gestione Menù" current="menu"
        onLogout={() => setUnlocked(false)} onSwitch={go} />
      <div className="wrap section-tight">
        <div className="admin-head">
          <div>
            <h1>Voci del menù</h1>
            <p className="sub">{products.length} prodotti in carta · ultima modifica oggi</p>
          </div>
          <Button variant="primary" icon="plus" onClick={() => setEditing({})}>Aggiungi prodotto</Button>
        </div>

        <div className="toolbar">
          <div className="seg">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Tutte</button>
            {cats.map(c => (
              <button key={c.id} className={filter === c.id ? "active" : ""} onClick={() => setFilter(c.id)}>{c.name}</button>
            ))}
          </div>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "34%" }}>Prodotto</th>
                <th>Categoria</th>
                <th style={{ width: 110 }}>Prezzo</th>
                <th style={{ width: 120, textAlign: "right" }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="t-name">{p.name}</div>
                    <div className="t-sub">{p.desc}</div>
                  </td>
                  <td><span className="badge badge-cat">{p.category}</span></td>
                  <td className="t-price">€ {p.price}</td>
                  <td className="cell-actions">
                    <div className="t-actions">
                      <button className="icon-btn" title="Modifica" onClick={() => setEditing(p)}><Icon name="edit" size={15} /></button>
                      <button className="icon-btn danger" title="Elimina" onClick={() => remove(p.id)}><Icon name="trash" size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: "center", color: "var(--ink-500)", fontStyle: "italic", padding: 40 }}>
                  Nessun prodotto in questa categoria.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <ProductForm product={editing} cats={cats}
          onCancel={() => setEditing(null)} onSave={save} onDelete={editing.id ? () => { remove(editing.id); setEditing(null); } : null} />
      )}
    </div>
  );
}

function ProductForm({ product, cats, onCancel, onSave, onDelete }) {
  const [f, setF] = useState({
    id: product.id || null,
    name: product.name || "",
    desc: product.desc || "",
    price: product.price || "",
    categoryId: product.categoryId || cats[0].id,
  });
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));
  const valid = f.name.trim() && f.price.trim();

  return (
    <Modal title={product.id ? "Modifica prodotto" : "Nuovo prodotto"} onClose={onCancel}
      footer={
        <React.Fragment>
          {onDelete && <Button variant="danger" icon="trash" onClick={onDelete} style={{ marginRight: "auto" }}>Elimina</Button>}
          <Button variant="outline" onClick={onCancel}>Annulla</Button>
          <Button variant="primary" disabled={!valid} onClick={() => onSave(f)}>Salva</Button>
        </React.Fragment>
      }>
      <div className="form-grid">
        <Field label="Nome del prodotto" required full>
          <Input value={f.name} onChange={set("name")} placeholder="Es. Tagliatelle al ragù bianco" />
        </Field>
        <Field label="Descrizione" full>
          <Textarea value={f.desc} onChange={set("desc")} placeholder="Ingredienti principali e note di servizio…" />
        </Field>
        <Field label="Prezzo (€)" required>
          <Input value={f.price} onChange={set("price")} placeholder="13,00" />
        </Field>
        <Field label="Categoria" required>
          <Select value={f.categoryId} onChange={set("categoryId")}>
            {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
      </div>
    </Modal>
  );
}

Object.assign(window, { MenuAdmin });
