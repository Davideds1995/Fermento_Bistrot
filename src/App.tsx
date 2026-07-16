import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { LanguageProvider } from './lib/i18n'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Menu from './pages/Menu'
import MenuAdmin from './pages/MenuAdmin'
import Admin from './pages/Admin'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu-admin" element={<MenuAdmin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}
