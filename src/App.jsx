import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import MobileMenu from './components/common/MobileMenu';
import Footer from './components/common/Footer';
import StarCanvas from './components/common/StarCanvas';
import CustomCursor from './components/common/CustomCursor';
import ContactModal from './components/modals/ContactModal';
import HomePage from './pages/HomePage';
import ObservePage from './pages/ObservePage';
import WonderPage from './pages/WonderPage';
import SelfPage from './pages/SelfPage';
import CreatePage from './pages/CreatePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import './styles/style.css';
import './styles/observe.css';
import './styles/wonder.css';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('js-ready');
  }, []);

  // Resilient hash navigation smoothly handling cross-page transitions
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 8) {
          attempts++;
          setTimeout(tryScroll, 60);
        }
      };
      setTimeout(tryScroll, 40);
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <StarCanvas />
      <CustomCursor />

      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
        activeSection={activeSection}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onOpenContact={() => setIsContactOpen(true)}
              setActiveSection={setActiveSection}
            />
          }
        />
        <Route path="/observe" element={<ObservePage />} />
        <Route path="/wonder" element={<WonderPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/self" element={<SelfPage />} />
        <Route
          path="/contact"
          element={<ContactPage onOpenContact={() => setIsContactOpen(true)} />}
        />
        <Route
          path="/get-in-touch"
          element={<ContactPage onOpenContact={() => setIsContactOpen(true)} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
