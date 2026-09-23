import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-left">
        <Link to="/" className="footer-brand" aria-label="Go to Home">SHAHRIAR'S PERSONAL UNIVERSE</Link>
        <span className="footer-nav-dot" aria-hidden="true">·</span>
        <span className="footer-copy">© 2026</span>
      </div>

      <div className="footer-center">
        <span className="footer-coords">23° 48′ N · 90° 24′ E · DHAKA</span>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/observe" className="footer-nav-link">OBSERVE</Link>
          <span className="footer-nav-dot" aria-hidden="true">·</span>
          <Link to="/wonder" className="footer-nav-link">WONDER</Link>
          <span className="footer-nav-dot" aria-hidden="true">·</span>
          <Link to="/create" className="footer-nav-link">CREATE</Link>
        </nav>
      </div>

      <div className="footer-right">
        <a
          href="https://github.com/shahriarbappy60-ship-it"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="Shahriar on GitHub"
        >
          <span>GITHUB ↗</span>
        </a>
        <a
          href="https://instagram.com/_shahriar.bappy_"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="Shahriar on Instagram"
        >
          <span>INSTAGRAM ↗</span>
        </a>
      </div>
    </footer>
  );
}
