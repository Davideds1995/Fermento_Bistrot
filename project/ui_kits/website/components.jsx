/* ============================================================
   FERMENTO — shared atoms (components.jsx)
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---- Icons: thin-stroke (1.5px) line set, Lucide-style ----
   Functional UI affordances only; brand ornaments come from the logo. */
const ICON_PATHS = {
  plus: "M12 5v14M5 12h14",
  edit: "M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
  trash: "M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6 M10 11v6 M14 11v6",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  lock: "M5 11h14a0 0 0 0 1 0 0v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a0 0 0 0 1 0 0Z M8 11V7a4 4 0 0 1 8 0v4",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2",
  calendar: "M8 2v4M16 2v4M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M22 7l-10 6L2 7",
  mapPin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  menu: "M3 6h18M3 12h18M3 18h18",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3Z",
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
};
function Icon({ name, size = 18, stroke = 1.6, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
      strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={ICON_PATHS[name] || ""} />
    </svg>
  );
}

/* ---- Brand logo (image asset) ---- */
function Logo({ variant = "ink", style, className }) {
  const src = variant === "ivory"
    ? "assets/logo-fermento-ivory.png"
    : "assets/logo-fermento.png";
  return <img src={src} alt="Fermento — Caffè · Bistrot" className={className} style={style} />;
}

/* ---- Eyebrow with side rules ---- */
function Eyebrow({ children, className = "" }) {
  return (
    <div className={"eyebrow-row " + className}>
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/* ---- Ornamental divider (typographic) ---- */
function Divider({ mark = "❧" }) {
  return <div className="divider"><span className="mark">{mark}</span></div>;
}

/* ---- Flourish ornament (extracted from the logo) ---- */
function Flourish({ variant = "gold", flip = false, className = "" }) {
  const src = variant === "ivory" ? "assets/ornament-flourish-ivory.png"
    : variant === "ink" ? "assets/ornament-flourish.png"
    : "assets/ornament-flourish-gold.png";
  return <img src={src} alt="" aria-hidden="true"
    className={"flourish " + (flip ? "flip " : "") + className} />;
}

/* ---- Button ---- */
function Button({ variant = "primary", size, block, children, icon, iconRight, ...rest }) {
  const cls = ["btn", "btn-" + variant, size === "sm" ? "btn-sm" : "", block ? "btn-block" : ""]
    .filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : 16} />}
    </button>
  );
}

/* ---- Form field wrappers ---- */
function Field({ label, required, children, className = "", full }) {
  return (
    <div className={"field " + (full ? "col-2 " : "") + className}>
      {label && <label>{label}{required && <span className="req"> *</span>}</label>}
      {children}
    </div>
  );
}
function Input(props) { return <input className="input" {...props} />; }
function Textarea(props) { return <textarea className="textarea" {...props} />; }
function Select({ children, ...rest }) { return <select className="select" {...rest}>{children}</select>; }

/* ---- Photo plate (placeholder imagery; replace with real photos) ---- */
function PhotoPlate({ shape = "wide", label = "Fotografia", caption, src, style, className = "" }) {
  const shapeCls = shape === "tall" ? "plate-tall" : shape === "square" ? "plate-square" : "plate-wide";
  return (
    <figure className={"plate " + shapeCls + " " + className} style={style}>
      {src
        ? <img src={src} alt={caption || label} />
        : <figcaption className="plate-label">
            <span className="ico">✦</span>{label}
            {caption && <div style={{ marginTop: 4, fontSize: "0.82rem" }}>{caption}</div>}
          </figcaption>}
    </figure>
  );
}

/* ---- Status badge ---- */
function Badge({ status, children }) {
  const map = { confirmed: "Confermata", pending: "In attesa", cancelled: "Cancellata" };
  return (
    <span className={"badge badge-" + status}>
      <span className="dot"></span>{children || map[status] || status}
    </span>
  );
}

/* ---- Modal ---- */
function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, Logo, Eyebrow, Divider, Flourish, Button,
  Field, Input, Textarea, Select, PhotoPlate, Badge, Modal,
});
