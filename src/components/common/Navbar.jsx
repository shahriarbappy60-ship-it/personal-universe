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
  const isSelf = location.pathname.startsWith('/self');

  const handleBack = e => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
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
        <Link to="/self" className={isSelf ? 'active' : ''}>Profile</Link>
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
          <span className="theme-icon theme-icon-sun" aria-hidden="true">☼</span>
          <span className="theme-icon theme-icon-moon" aria-hidden="true">◐</span>
        </button>

        {isHome ? (
          <a
            href="#get-in-touch"
            className="connect-button magnetic"
            aria-label="Get in touch with Shahriar"
            onClick={e => handleNavClick(e, 'get-in-touch')}
          >
            <span>Get in touch</span>
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <Link
            to="/#get-in-touch"
            className="connect-button magnetic"
            aria-label="Get in touch with Shahriar"
          >
            <span>Get in touch</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}

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
