import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wonderArticles } from '../data/wonderData';
import WonderReaderModal from '../components/modals/WonderReaderModal';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function WonderPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useScrollReveal([activeFilter]);
  useMagnetic([activeFilter]);

  useEffect(() => {
    document.title = "Wonder — Shahriar's Personal Universe";
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'all') return wonderArticles;
    return wonderArticles.filter(a =>
      a.category.toLowerCase().replace(/\s+/g, '-').includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <main className="wonder-page" id="mainContent">
      {/* ABSTRACT SPATIAL ATMOSPHERE HERO */}
      <section className="wonder-hero">
        <div className="wonder-spatial-atmosphere" aria-hidden="true">
          <div className="spatial-central-bloom" />
          <div className="spatial-concentric-ring ring-1" />
          <div className="spatial-concentric-ring ring-2" />
        </div>

        <div className="wonder-hero-inner">
          <div className="wonder-hero-top reveal">
            <div className="wonder-kicker">
              <span className="eyebrow">02 / WONDER</span>
              <span className="wonder-rule" aria-hidden="true" />
              <span>WRITTEN ARCHIVE</span>
            </div>
            <div className="wonder-counter">
              <span>ENTRIES</span>
              <strong>{String(wonderArticles.length).padStart(2, '0')}</strong>
            </div>
          </div>

          <div className="wonder-hero-main">
            <div className="wonder-hero-copy">
              <h1 className="reveal delay-1">
                Questions that<br />
                refuse to<br />
                <em>leave.</em>
              </h1>

              <p className="wonder-hero-description reveal delay-2">
                A place for ideas I keep returning to —
                sometimes to understand them,
                sometimes simply to stay with the question.
              </p>

              <div className="wonder-hero-actions reveal delay-2">
                <Button href="#wonderArchive" variant="solid" icon="↓">
                  Read the archive
                </Button>
              </div>
            </div>

            <div className="wonder-hero-side reveal delay-2">
              <span className="wonder-side-index">02</span>
              <p>
                Some thoughts are better
                explored than resolved.
              </p>
              <span className="wonder-side-location">
                DHAKA · BANGLADESH
              </span>
            </div>
          </div>

          <div className="wonder-hero-bottom reveal delay-2">
            <div>
              <span>ARCHIVE</span>
              <strong>WRITING</strong>
            </div>
            <div>
              <span>FORM</span>
              <strong>INQUIRY · FIELD NOTES · FRAGMENTS</strong>
            </div>
            <div>
              <span>STATUS</span>
              <strong>OPEN ARCHIVE</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ESSAY & INQUIRY ARCHIVE */}
      <section className="wonder-archive-section section-pad" id="wonderArchive">
        <div className="wonder-shell">
          <div className="wonder-filter-bar reveal">
            {[
              { key: 'all', label: 'All' },
              { key: 'philosophy', label: 'Philosophy' },
              { key: 'consciousness', label: 'Consciousness' },
              { key: 'notes', label: 'Field Notes' }
            ].map(f => (
              <button
                key={f.key}
                className={`wonder-filter-chip ${activeFilter === f.key ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="wonder-articles-grid reveal">
            {filteredArticles.map((article, idx) => (
              <article
                key={article.id || idx}
                className="wonder-article-card"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-card-meta">
                  <span className="article-number">0{idx + 1}</span>
                  <span className="article-category">{article.category}</span>
                </div>
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-excerpt">{article.excerpt}</p>
                <div className="article-card-footer">
                  <span className="article-read-time">{article.readTime || '3 MIN READ'}</span>
                  <span className="article-arrow" aria-hidden="true">↗</span>
                </div>
              </article>
            ))}
          </div>

          {/* GATEWAY TO CREATE — BOXLESS & RESTRAINED */}
          <div className="wonder-gateway reveal">
            <span className="gateway-eyebrow">NEXT CHAPTER · 03 / CREATE</span>
            <h2 className="gateway-title">
              From inquiry to<br />
              <em>construction.</em>
            </h2>
            <p className="gateway-subtitle">
              Turning curiosity into software, interfaces, and architecture.
            </p>
            <div className="gateway-actions">
              <Button to="/create" variant="solid">
                View projects
              </Button>
              <Button to="/" variant="outline">
                Back home
              </Button>
            </div>
          </div>
        </div>
      </section>

      <WonderReaderModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </main>
  );
}
