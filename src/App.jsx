import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import StarCanvas from './components/common/StarCanvas';
import CustomCursor from './components/common/CustomCursor';
import ContactModal from './components/modals/ContactModal';
import HomePage from './pages/HomePage';
import ObservePage from './pages/ObservePage';
import WonderPage from './pages/WonderPage';
import IdentityPage from './pages/IdentityPage';
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
  const [displayLocation, setDisplayLocation] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('js-ready');
  }, []);

  useEffect(() => {
    if (!displayLocation) {
      setDisplayLocation(location);
      return;
    }

    if (
      location.pathname === displayLocation.pathname &&
      location.search === displayLocation.search &&
      location.hash === displayLocation.hash
    ) {
      return;
    }

    setTransitionPhase('exit');

    const swapTimer = window.setTimeout(() => {
      setDisplayLocation(location);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionPhase('enter'));
      });
    }, 140);

    return () => window.clearTimeout(swapTimer);
  }, [location, displayLocation]);

  // Handle hashes only after the incoming page has been mounted.
  useEffect(() => {
    if (!displayLocation || location.pathname !== displayLocation.pathname || location.search !== displayLocation.search || location.hash !== displayLocation.hash) return;
    if (!location.hash) return;

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

    const timer = window.setTimeout(tryScroll, 40);
    return () => window.clearTimeout(timer);
  }, [location, displayLocation]);

  const renderedLocation = displayLocation || location;
  const chapter = getChapterLabel(renderedLocation.pathname);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <StarCanvas />
      <CustomCursor />

      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
        activeSection={activeSection}
      />

      <main
        className={`page-transition page-transition--${transitionPhase}`}
        data-route={renderedLocation.pathname}
      >
        <div className="page-transition__veil" aria-hidden="true">
          {chapter && (
            <span className="page-transition__chapter">{chapter}</span>
          )}
        </div>

        <div className="page-transition__stage">
          <Routes location={renderedLocation}>
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
            <Route path="/identity" element={<IdentityPage />} />
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
        </div>
      </main>

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}

function getChapterLabel(pathname) {
  const chapters = {
    '/observe': '01 / OBSERVE',
    '/wonder': '02 / THINK',
    '/create': '03 / CREATE',
    '/identity': '04 / IDENTITY',
    '/contact': '05 / CONNECT',
    '/get-in-touch': '05 / CONNECT',
  };

  return chapters[pathname] || '';
}
