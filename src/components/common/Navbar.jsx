import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useDhakaClock } from '../../hooks/useDhakaClock';
import { useHeaderScroll } from '../../hooks/useHeaderScroll';

export default function Navbar({ onOpenContact, onToggleMobileMenu, isMobileMenuOpen, activeSection }) {
  const { theme, toggleTheme } = useTheme();
  const dhakaTime = useDhakaClock();
  const isScrolled = useHeaderScroll();
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '';
  const isObserve = location.pathname.startsWith('/observe');
  const isWonder = location.pathname.startsWith('/wonder');
  const isCreate = location.pathname.startsWith('/create');
  const isSelf = location.pathname.startsWith('/self');

  const handleNavClick = (e, targetId) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
      <Link to="/" className="brand" aria-label="Shahriar Personal Universe home">
        <span className="brand-mark" aria-hidden="true" />
        <span>SHAHRIAR</span>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <nav className="desktop-nav" aria-label="Primary navigation">
        {isHome ? (
          <>
            <a href="#observe" className={activeSection === 'observe' ? 'active' : ''} onClick={e => handleNavClick(e, 'observe')} data-section-link="observe">Observe</a>
            <a href="#wonder" className={activeSection === 'wonder' ? 'active' : ''} onClick={e => handleNavClick(e, 'wonder')} data-section-link="wonder">Wonder</a>
            <a href="#create" className={activeSection === 'create' ? 'active' : ''} onClick={e => handleNavClick(e, 'create')} data-section-link="create">Create</a>
            <Link
              to="/self"
              className={`nav-profile-btn magnetic ${isSelf ? 'active' : ''}`}
              aria-label="Shahriar Khan Profile"
              title="Profile — Shahriar Khan"
            >
              <span className="nav-profile-glass-lens">
                <span className="nav-profile-avatar-frame">
                  <img
                    src="/images/portrait-avatar.jpg"
                    onError={e => { e.currentTarget.src = '/images/portrait.jpg'; }}
                    alt="Shahriar Khan"
                  />
                </span>
                <span className="nav-profile-specular" aria-hidden="true" />
              </span>
              <span className="nav-profile-rim" aria-hidden="true" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/observe" className={isObserve ? 'active' : ''}>Observe</Link>
            <Link to="/wonder" className={isWonder ? 'active' : ''}>Wonder</Link>
            <Link to="/create" className={isCreate ? 'active' : ''}>Create</Link>
            <Link
              to="/self"
              className={`nav-profile-btn magnetic ${isSelf ? 'active' : ''}`}
              aria-label="Shahriar Khan Profile"
              title="Profile — Shahriar Khan"
            >
              <span className="nav-profile-glass-lens">
                <span className="nav-profile-avatar-frame">
                  <img
                    src="/images/portrait-avatar.jpg"
                    onError={e => { e.currentTarget.src = '/images/portrait.jpg'; }}
                    alt="Shahriar Khan"
                  />
                </span>
                <span className="nav-profile-specular" aria-hidden="true" />
              </span>
              <span className="nav-profile-rim" aria-hidden="true" />
            </Link>
          </>
        )}
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
  );
}
