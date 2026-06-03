import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Menu from './pages/Menu'
import MenuAdmin from './pages/MenuAdmin'
import Admin from './pages/Admin'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-admin" element={<MenuAdmin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  )
}
