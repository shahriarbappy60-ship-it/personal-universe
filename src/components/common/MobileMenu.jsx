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
    { label: 'Observe', path: '/observe' },
    { label: 'Wonder', path: '/wonder' },
    { label: 'Create', path: '/create' },
    { label: 'Profile', path: '/self' },
  ];

  return (
    <aside
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      id="mobileMenu"
      aria-hidden={!isOpen}
    >
      {/* 4 CORE COMPACT GLASS PILL BUTTONS */}
      <nav className="mobile-nav-list" aria-label="Mobile navigation">
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
}
