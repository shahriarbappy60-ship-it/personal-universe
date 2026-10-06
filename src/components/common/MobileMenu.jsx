import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDhakaClock } from '../../hooks/useDhakaClock';

export default function MobileMenu({ isOpen, onClose = () => {} }) {
  const location = useLocation();
  const dhakaTime = useDhakaClock();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handlePointerDown = event => {
      if (!isOpen) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      if (!target.closest('#siteHeader')) {
        onClose();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 950 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  const navItems = [
    { label: 'Observe', path: '/observe' },
    { label: 'Wonder', path: '/wonder' },
    { label: 'Create', path: '/create' },
    { label: 'Identity', path: '/identity' },
  ];

  const menu = (
    <aside
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      id="mobileMenu"
      aria-hidden={!isOpen}
    >
      {/* PRIMARY NAVIGATION */}
      <nav className="mobile-nav-list" aria-label="Mobile navigation">
        <Link
          to="/"
          className="mobile-universe-home"
          onClick={onClose}
          aria-label="Universe home"
        >
          <span className="mobile-universe-mark" aria-hidden="true" />
          <span>UNIVERSE</span>
        </Link>
        {navItems.map(item => {
          const isCurrentRoute = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-glass-pill-btn ${isCurrentRoute ? 'active' : ''}`}
              onClick={onClose}
            >
              <div className="mobile-pill-left">
                <span className="mobile-pill-indicator" aria-hidden="true" />
                <span className="mobile-pill-label">{item.label}</span>
              </div>
              <span className="mobile-pill-arrow" aria-hidden="true">→</span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM PANEL */}
      <div className="mobile-menu-bottom">
        <div className="mobile-meta-info">
          <span>{dhakaTime}</span>
        </div>
        <Link
          to="/contact"
          className="mobile-connect-btn"
          onClick={onClose}
        >
          <span>Get in touch</span>
          <span>→</span>
        </Link>
      </div>
    </aside>
  );

  return menu;
}
