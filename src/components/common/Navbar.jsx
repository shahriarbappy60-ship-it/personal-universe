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

  // Close mobile drawer on route changes
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      onToggleMobileMenu();
    }
  }, [location.pathname]);

  // Close mobile drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        onToggleMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, onToggleMobileMenu]);

  // Close mobile drawer on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950 && isMobileMenuOpen) {
        onToggleMobileMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, onToggleMobileMenu]);

  // Close mobile drawer when clicking outside
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = e => {
      const header = document.getElementById('siteHeader');
      if (header && !header.contains(e.target)) {
        onToggleMobileMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, onToggleMobileMenu]);

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

      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'has-back-btn' : ''} ${isMobileMenuOpen ? 'is-mobile-open' : ''}`}
        id="siteHeader"
      >
        <div className="site-header-bar">
          <Link
            to="/"
            className="brand"
            aria-label="Shahriar Personal Universe home"
            onClick={() => {
              if (isMobileMenuOpen) onToggleMobileMenu();
            }}
          >
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
                {theme === 'light' ? '☼' : '◐'}
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
              aria-controls="mobileNavbarDrawer"
              onClick={onToggleMobileMenu}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* MOBILE EXPANDABLE DRAWER */}
        <div
          className="site-header-drawer"
          id="mobileNavbarDrawer"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="site-header-drawer-inner">
            <nav className="mobile-nav-list" aria-label="Mobile navigation">
              <Link
                to="/"
                className={`mobile-nav-link ${isHome ? 'active' : ''}`}
                onClick={() => {
                  if (isMobileMenuOpen) onToggleMobileMenu();
                }}
              >
                <div className="mobile-nav-link-left">
                  <span className="mobile-nav-dot" aria-hidden="true" />
                  <span className="mobile-nav-label">Universe</span>
                </div>
                <span className="mobile-nav-arrow" aria-hidden="true">→</span>
              </Link>

              <Link
                to="/observe"
                className={`mobile-nav-link ${isObserve ? 'active' : ''}`}
                onClick={() => {
                  if (isMobileMenuOpen) onToggleMobileMenu();
                }}
              >
                <div className="mobile-nav-link-left">
                  <span className="mobile-nav-dot" aria-hidden="true" />
                  <span className="mobile-nav-label">Observe</span>
                </div>
                <span className="mobile-nav-arrow" aria-hidden="true">→</span>
              </Link>

              <Link
                to="/wonder"
                className={`mobile-nav-link ${isWonder ? 'active' : ''}`}
                onClick={() => {
                  if (isMobileMenuOpen) onToggleMobileMenu();
                }}
              >
                <div className="mobile-nav-link-left">
                  <span className="mobile-nav-dot" aria-hidden="true" />
                  <span className="mobile-nav-label">Wonder</span>
                </div>
                <span className="mobile-nav-arrow" aria-hidden="true">→</span>
              </Link>

              <Link
                to="/create"
                className={`mobile-nav-link ${isCreate ? 'active' : ''}`}
                onClick={() => {
                  if (isMobileMenuOpen) onToggleMobileMenu();
                }}
              >
                <div className="mobile-nav-link-left">
                  <span className="mobile-nav-dot" aria-hidden="true" />
                  <span className="mobile-nav-label">Create</span>
                </div>
                <span className="mobile-nav-arrow" aria-hidden="true">→</span>
              </Link>

              <Link
                to="/identity"
                className={`mobile-nav-link ${isIdentity ? 'active' : ''}`}
                onClick={() => {
                  if (isMobileMenuOpen) onToggleMobileMenu();
                }}
              >
                <div className="mobile-nav-link-left">
                  <span className="mobile-nav-dot" aria-hidden="true" />
                  <span className="mobile-nav-label">Identity</span>
                </div>
                <span className="mobile-nav-arrow" aria-hidden="true">→</span>
              </Link>
            </nav>

            <div className="mobile-drawer-bottom">
              <span className="mobile-drawer-clock" aria-label="Current time in Dhaka">
                {dhakaTime}
              </span>

              <Link
                to="/contact"
                className={`mobile-drawer-contact ${isContact ? 'active' : ''}`}
                aria-label="Get in touch with Shahriar"
                onClick={() => {
                  if (isMobileMenuOpen) onToggleMobileMenu();
                }}
              >
                <span>Get in touch</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
