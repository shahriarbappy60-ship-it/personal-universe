import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDhakaClock } from '../../hooks/useDhakaClock';

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const dhakaTime = useDhakaClock();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { label: 'Home', number: '00', path: '/' },
    { label: 'Observe', number: '01', path: '/observe' },
    { label: 'Wonder', number: '02', path: '/wonder' },
    { label: 'Create', number: '03', path: '/create' },
    { label: 'Profile', number: '04', path: '/self', avatar: true },
  ];

  return (
    <aside
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      id="mobileMenu"
      aria-hidden={!isOpen}
    >
      <div className="mobile-menu-top">
        <div className="mobile-brand-pill">
          <span className="brand-dot" />
          <span>SHAHRIAR</span>
        </div>
        <span>PERSONAL UNIVERSE</span>
      </div>

      {/* CANONICAL UNIVERSE NAVIGATION */}
      <nav className="mobile-nav-list" aria-label="Mobile navigation">
        {navItems.map(item => {
          const isCurrentRoute =
            (item.path === '/' && location.pathname === '/' && !location.hash) ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.number}
              to={item.path}
              className={`mobile-nav-link ${isCurrentRoute ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="mobile-link-main">
                <span className="mobile-link-indicator" />
                {item.avatar && (
                  <span className="mobile-link-avatar-frame">
                    <img src="/images/portrait.jpg" alt="Shahriar Khan" />
                  </span>
                )}
                <span className="mobile-link-text">{item.label}</span>
              </div>
              <small className="mobile-link-num">{item.number}</small>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM PANEL */}
      <div className="mobile-menu-bottom">
        <div className="mobile-meta-info">
          <span>{dhakaTime} · DHAKA</span>
          <small>23° 48′ N · 90° 24′ E</small>
        </div>
        <Link
          to="/#get-in-touch"
          className="mobile-connect-btn"
          onClick={onClose}
        >
          <span>Get in touch</span>
          <span>→</span>
        </Link>
      </div>
    </aside>
  );
}
