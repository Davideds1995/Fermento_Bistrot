/* ============================================================
   FERMENTO — app router (app.jsx)
   Hash routing: #/  #/chi-siamo  #/menu  #/menu-admin  #/admin
   ============================================================ */

function useHashRoute() {
  const parse = () => {
    const h = window.location.hash.replace(/^#/, "") || "/";
    return h.split("?")[0] || "/";
  };
  const [route, setRoute] = useState(parse());
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

function App() {
  const route = useHashRoute();
  const pendingScroll = useRef(null);

  const go = (to, scrollId) => {
    pendingScroll.current = scrollId || null;
    if (("#" + to) === window.location.hash) {
      // same route — just scroll
      applyScroll();
    } else {
      window.location.hash = to;
    }
    if (!scrollId) window.scrollTo({ top: 0, behavior: "auto" });
  };
  window.__go = go;

  const applyScroll = () => {
    const id = pendingScroll.current;
    if (!id) return;
    pendingScroll.current = null;
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
    }, 60);
  };

  useEffect(() => {
    if (pendingScroll.current) applyScroll();
    else window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  // Admin routes — full screen, no public chrome
  if (route === "/menu-admin") return <MenuAdmin go={go} />;
  if (route === "/admin") return <ReservationsAdmin go={go} />;

  // Public pages
  let page;
  if (route === "/chi-siamo") page = <About />;
  else if (route === "/menu") page = <MenuPage />;
  else page = <Home />;

  return (
    <React.Fragment>
      <Header route={route} go={go} />
      {page}
      <Footer go={go} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
