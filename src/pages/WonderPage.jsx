import React, { useState, useEffect } from 'react';
import { contemplationQuotes, reflections, essays } from '../data/wonderData';
import WonderReaderModal from '../components/modals/WonderReaderModal';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

// ─── TIER 2: REFLECTION ROW — in-place accordion with glass enclosure ─────────
function ReflectionRow({ reflection }) {
  const [expanded, setExpanded] = useState(false);
  const toggle  = () => setExpanded(v => !v);
  const onKey   = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } };

  return (
    <article className={`wonder-reflection-row${expanded ? ' is-expanded' : ''}`}>
      <div
        className="wonder-reflection-header"
        onClick={toggle}
        onKeyDown={onKey}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Collapse' : 'Read'} reflection: ${reflection.titleBase} ${reflection.titleAccent}`}
      >
        <div className="wonder-row-meta">
          <span className="wonder-row-number">{reflection.number}</span>
          <span className="wonder-row-sep">—</span>
          <span className="wonder-row-category">{reflection.tag}</span>
          <span className="wonder-row-sep">·</span>
          <span className="wonder-row-category">{reflection.readTime}</span>
        </div>

        <h3 className="wonder-row-title">
          {reflection.titleBase} <em>{reflection.titleAccent}</em>
        </h3>

        <p className="wonder-row-description">{reflection.excerpt}</p>

        <div className="wonder-row-action">
          <span className="wonder-read-action">
            {expanded ? 'CLOSE' : 'READ REFLECTION'}
            <span className={`wonder-read-arrow${expanded ? ' is-open' : ''}`} aria-hidden="true"> ↘</span>
          </span>
        </div>
      </div>

      {/* Accordion body — in-place serene glass enclosure */}
      <div className="wonder-reflection-body" aria-hidden={!expanded}>
        <div
          className="wonder-reflection-body-inner"
          dangerouslySetInnerHTML={{ __html: reflection.body }}
        />
      </div>

      {expanded && (
        <div className="wonder-reflection-end">
          <span>{reflection.tag}</span>
          <span>{reflection.readTime} · {reflection.date}</span>
        </div>
      )}
    </article>
  );
}

// ─── WONDER PAGE MASTER COMPONENT ───────────────────────────────────────────
export default function WonderPage() {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [isQuoteFading, setIsQuoteFading] = useState(false);

  useScrollReveal();
  useMagnetic();

  useEffect(() => {
    document.title = "Wonder — Shahriar's Personal Universe";
    window.scrollTo(0, 0);
  }, []);

  const activeQuote = contemplationQuotes[activeQuoteIndex] || contemplationQuotes[0];

  const handleSelectQuote = index => {
    if (index === activeQuoteIndex || isQuoteFading) return;
    setIsQuoteFading(true);
    setTimeout(() => {
      setActiveQuoteIndex(index);
      setIsQuoteFading(false);
    }, 220);
  };

  const modalArticle = selectedEssay ? {
    ...selectedEssay,
    category: 'ESSAY',
    time: selectedEssay.readTime,
  } : null;

  return (
    <main className="wonder-page" id="mainContent">

      {/* ═══════════════════════════════════════════════════
          SECTION 1: WONDER HERO (LOCKED DESIGN AREA)
          "The mind, before it speaks." is permanently sealed.
      ═══════════════════════════════════════════════════ */}
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
              <Button href="#wonderCenterpiece" variant="glass" icon="↓">
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

      {/* ═══════════════════════════════════════════════════
          SECTION 2: THE MONUMENTAL CENTERPIECE
          Direct Home Wonder Mirror — Floating Quote on Void
      ═══════════════════════════════════════════════════ */}
      <section className="wonder-centerpiece-section section-pad" id="wonderCenterpiece">
        <div className="wonder-shell">
          <div className="wonder-centerpiece-stage reveal">
            <blockquote
              className={`wonder-centerpiece-quote ${isQuoteFading ? 'fading' : ''}`}
              aria-live="polite"
            >
              “{activeQuote.thought}”
            </blockquote>

            <div className={`wonder-centerpiece-meta ${isQuoteFading ? 'fading' : ''}`}>
              <span className="wonder-centerpiece-attribution">{activeQuote.tag}</span>
            </div>

            {/* Philosophical Focus Anchors */}
            <nav className="wonder-centerpiece-anchors" aria-label="Contemplation themes">
              {contemplationQuotes.map((item, index) => {
                const isActive = index === activeQuoteIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`wonder-anchor-item ${isActive ? 'is-active' : ''}`}
                    aria-selected={isActive}
                    onClick={() => handleSelectQuote(index)}
                  >
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Trigger */}
            <div className="wonder-centerpiece-action">
              <Button href="#wonderReflections" variant="glass" icon="↓">
                READ REFLECTIONS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: SCROLLABLE REFLECTIONS
          Focused Notes Feed with in-place accordion reader
      ═══════════════════════════════════════════════════ */}
      <section className="wonder-tier-section wonder-reflections-section section-pad" id="wonderReflections">
        <div className="wonder-shell">
          <div className="wonder-tier-header">
            <span className="wonder-tier-eyebrow reveal">REFLECTIONS</span>
            <p className="wonder-tier-subtitle reveal">Things worth sitting with.</p>
          </div>

          <div className="wonder-reflections-scroll wonder-reflections-scroll-wrap">
            <div className="wonder-reflections-ledger">
              {reflections.map(r => (
                <ReflectionRow key={r.id} reflection={r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: ESSAYS (THE LONG-FORM CHAMBER)
          Flagship tactile glass card + subsequent ledger rows
      ═══════════════════════════════════════════════════ */}
      <section className="wonder-tier-section wonder-essays-section section-pad" id="wonderEssays">
        <div className="wonder-shell">
          <div className="wonder-tier-header">
            <span className="wonder-tier-eyebrow reveal">ESSAYS</span>
            <p className="wonder-tier-subtitle reveal">Long-form explorations of difficult questions.</p>
          </div>

          {/* FLAGSHIP HEROIC GLASS CARD */}
          <div
            className="wonder-essay-heroic-card reveal"
            onClick={() => setSelectedEssay(essays[0])}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEssay(essays[0]); } }}
            tabIndex={0}
            role="button"
            aria-label={`Read essay: ${essays[0].title}`}
          >
            <span className="wonder-essay-card-tag">
              ESSAY · {essays[0].number} · {essays[0].tag}
            </span>
            <h2 className="wonder-essay-card-title">
              {essays[0].titleBase}<br /><em>{essays[0].titleAccent}</em>
            </h2>
            <p className="wonder-essay-card-excerpt">{essays[0].excerpt}</p>
            <span className="wonder-essay-pill-cta" aria-hidden="true">
              ENTER ESSAY <span className="wonder-cta-arrow">↘</span>
            </span>
          </div>

          {/* SUBSEQUENT ESSAY LEDGER */}
          <div className="wonder-essays-ledger">
            {essays.slice(1).map(e => (
              <article
                key={e.id}
                className="wonder-editorial-row reveal"
                onClick={() => setSelectedEssay(e)}
                onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setSelectedEssay(e); } }}
                tabIndex={0}
                role="button"
                aria-label={`Read essay: ${e.title}`}
              >
                <div className="wonder-row-meta">
                  <span className="wonder-row-number">{e.number}</span>
                  <span className="wonder-row-sep">—</span>
                  <span className="wonder-row-category">ESSAY</span>
                  <span className="wonder-row-sep">·</span>
                  <span className="wonder-row-category">{e.readTime}</span>
                </div>
                <h3 className="wonder-row-title">
                  {e.titleBase} <em>{e.titleAccent}</em>
                </h3>
                <p className="wonder-row-description">{e.excerpt}</p>
                <div className="wonder-row-action">
                  <span className="wonder-read-action">
                    Enter Essay <span className="wonder-read-arrow" aria-hidden="true">↘</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════════
              SECTION 5: FOOTER TRANSITION (CHAPTER 03: CREATE)
          ═══════════════════════════════════════════════════ */}
          <div className="wonder-gateway reveal">
            <span className="gateway-eyebrow">NEXT CHAPTER · 03 / CREATE</span>
            <h2 className="gateway-title">
              From wonder to<br />
              <em>construction.</em>
            </h2>
            <p className="gateway-subtitle">
              Turning curiosity into software, interfaces, and architecture.
            </p>
            <div className="gateway-actions">
              <Button to="/create" variant="glass">
                ENTER CHAPTER 03: CREATE →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* READING CHAMBER MODAL — Essays only */}
      <WonderReaderModal
        article={modalArticle}
        isOpen={Boolean(selectedEssay)}
        onClose={() => setSelectedEssay(null)}
      />

    </main>
  );
}
