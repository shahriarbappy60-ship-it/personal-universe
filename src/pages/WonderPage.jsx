import React, { useState, useEffect } from 'react';
import { wonderArticles, featuredInquiry } from '../data/wonderData';
import WonderReaderModal from '../components/modals/WonderReaderModal';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function WonderPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useScrollReveal();
  useMagnetic();

  useEffect(() => {
    document.title = "Wonder — Shahriar's Personal Universe";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="wonder-page" id="mainContent">
      {/* 1:1 OBSERVE-MIRRORED HERO — STRICT 100VH ISOLATION */}
      <section className="observe-hero section-pad" id="wonderHero">
        <div className="wonder-shell">
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
              <Button href="#wonderFeatured" variant="glass" icon="↓">
                READ ARCHIVE
              </Button>
              <span className="observe-status">WRITTEN ARCHIVE</span>
            </div>
          </div>

          <div className="observe-hero-meta">
            <span>23° 48′ N</span>
            <span>90° 24′ E</span>
            <span>DHAKA · BANGLADESH</span>
          </div>
        </div>
      </section>

      {/* FEATURED INQUIRY */}
      <section className="wonder-featured-section section-pad" id="wonderFeatured">
        <div className="wonder-shell">
          <div className="wonder-featured-inner reveal">
            <span className="eyebrow">FEATURED INQUIRY</span>

            <h2 className="wonder-featured-title">
              What if you are the universe<br />
              <em>experiencing itself?</em>
            </h2>

            <p className="wonder-featured-copy">
              We spend our lives looking at reality as if we are visitors standing outside of it. But what happens if awareness is not an isolated light trapped inside the skull, but the cosmos turning around to look at its own architecture? Perhaps the mind is not an observer separated from the world, but the universe finally finding silence to perceive what it has built.
            </p>

            <button
              type="button"
              className="wonder-inquiry-link"
              onClick={() => setSelectedArticle(featuredInquiry)}
            >
              <span>ENTER INQUIRY</span>
              <span className="wonder-inquiry-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* SELECTED READINGS / ARCHIVE */}
      <section className="wonder-archive-section section-pad" id="wonderArchive">
        <div className="wonder-shell">
          <div className="wonder-archive-header reveal">
            <span className="eyebrow">SELECTED READINGS</span>
            <p className="wonder-archive-subtitle">Things worth sitting with.</p>
          </div>

          <div className="wonder-editorial-archive">
            {wonderArticles.map((article, idx) => {
              const itemNumber = article.number || String(idx + 1).padStart(2, '0');
              return (
                <article
                  key={article.id || idx}
                  className="wonder-editorial-row reveal"
                  onClick={() => setSelectedArticle(article)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedArticle(article);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read ${article.title}`}
                >
                  <div className="wonder-row-meta">
                    <span className="wonder-row-number">{itemNumber}</span>
                    <span className="wonder-row-sep">—</span>
                    <span className="wonder-row-category">{article.category}</span>
                  </div>

                  <h3 className="wonder-row-title">
                    {article.title}
                  </h3>

                  <p className="wonder-row-description">
                    {article.excerpt}
                  </p>

                  <div className="wonder-row-action">
                    <span className="wonder-read-action">
                      READ <span className="wonder-read-arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* GATEWAY TO CREATE */}
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
              <Button
                to="/create"
                variant="glass"
              >
                ENTER CHAPTER 03: CREATE →
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
