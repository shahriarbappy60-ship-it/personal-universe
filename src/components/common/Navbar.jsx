import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useDhakaClock } from '../../hooks/useDhakaClock';
import { useHeaderScroll } from '../../hooks/useHeaderScroll';

export default function Navbar({ onOpenContact, onToggleMobileMenu, isMobileMenuOpen, activeSection }) {
  const { theme, toggleTheme } = useTheme();
  const dhakaTime = useDhakaClock();
  const isScrolled = useHeaderScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/' || location.pathname === '';
  const isObserve = location.pathname.startsWith('/observe');
  const isWonder = location.pathname.startsWith('/wonder');
  const isCreate = location.pathname.startsWith('/create');
  const isIdentity = location.pathname.startsWith('/identity');
  const isContact = location.pathname.startsWith('/contact') || location.pathname.startsWith('/get-in-touch');

  const handleBack = e => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <>
      {!isHome && (
        <button
          type="button"
          className={`navbar-floating-back-btn ${isScrolled ? 'scrolled' : ''}`}
          onClick={handleBack}
          aria-label="Go back to previous page"
          title="Go back"
        >
          <svg
            className="navbar-back-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'has-back-btn' : ''}`} id="siteHeader">
      <Link to="/" className="brand" aria-label="Shahriar Personal Universe home">
        <span className="brand-mark" aria-hidden="true" />
        <span>SHAHRIAR</span>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link to="/observe" className={isObserve ? 'active' : ''}>Observe</Link>
        <Link to="/wonder" className={isWonder ? 'active' : ''}>Wonder</Link>
        <Link to="/create" className={isCreate ? 'active' : ''}>Create</Link>
        <Link to="/identity" className={isIdentity ? 'active' : ''}>Identity</Link>
      </nav>

      {/* HEADER RIGHT */}
      <div className="header-right">
        <span className="clock" id="dhakaClock" aria-label="Current time in Dhaka">
          {dhakaTime}
        </span>

        <button
          className="theme-toggle magnetic"
          id="themeToggle"
          type="button"
          aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          aria-pressed={theme === 'light'}
          onClick={toggleTheme}
        >
          <span className="theme-icon" aria-hidden="true">
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.35"/>
                <path d="M12 2.5v2.25M12 19.25v2.25M21.5 12h-2.25M4.75 12H2.5M18.72 5.28l-1.6 1.6M6.88 17.12l-1.6 1.6M18.72 18.72l-1.6-1.6M6.88 6.88l-1.6-1.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 15.1A8.25 8.25 0 0 1 8.9 4 8.25 8.25 0 1 0 20 15.1Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        </button>

        <Link
          to="/contact"
          className={`connect-button magnetic ${isContact ? 'active' : ''}`}
          aria-label="Get in touch with Shahriar"
        >
          <span>GET IN TOUCH</span>
          <span aria-hidden="true">↗</span>
        </Link>

        <button
          className="menu-button"
          id="menuButton"
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobileMenu"
          onClick={onToggleMobileMenu}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  </>
  );
}
