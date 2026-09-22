import React, { useState, useMemo, useEffect } from 'react';
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
    return wonderArticles.filter(a => {
      const cat = a.category.toLowerCase().replace(/\s+/g, '-');
      if (activeFilter === 'philosophy') return cat.includes('philosophy') || cat.includes('inquiry');
      if (activeFilter === 'notes') return cat.includes('note') || cat.includes('fragment');
      return cat.includes(activeFilter);
    });
  }, [activeFilter]);

  return (
    <main className="wonder-page" id="mainContent">
      {/* 1:1 OBSERVE-MIRRORED HERO */}
      <section className="observe-hero section-pad" id="wonderHero">
        <div className="observe-hero-content">
          <div className="eyebrow reveal">02 / WONDER</div>
          <h1 className="reveal delay-1">
            <span className="wonder-title-line">The mind, before</span>
            <span className="wonder-title-line"><em>it speaks.</em></span>
          </h1>
          <p className="observe-hero-copy reveal delay-2">
            A collection of questions, thoughts, and ideas that make me pause, observe, and look a little deeper.
          </p>
          <div className="observe-hero-actions reveal delay-2">
            <Button href="#wonderArchive" variant="solid" icon="↓">
              READ
            </Button>
            <span className="observe-status">WRITTEN ARCHIVE</span>
          </div>
        </div>

        <div className="observe-hero-meta">
          <span>23° 48′ N</span>
          <span>90° 24′ E</span>
          <span>DHAKA · BANGLADESH</span>
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
                  <span className="article-read-time">{article.readTime || article.time || '3 MIN READ'}</span>
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
