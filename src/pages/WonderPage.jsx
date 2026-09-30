import React, { useState, useEffect, useRef } from 'react';
import { contemplationQuotes, reflections, essays } from '../data/wonderData';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import WonderReaderModal from '../components/modals/WonderReaderModal';

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
        aria-controls={`wonder-reflection-body-${reflection.id}`}
        aria-label={`${expanded ? 'Collapse' : 'Read'} reflection: ${reflection.titleBase} ${reflection.titleAccent}`}
      >
        <div className="wonder-row-meta">
          <span className="wonder-row-number">{Number(reflection.number)}</span>
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
      <div id={`wonder-reflection-body-${reflection.id}`} className={`wonder-reflection-body${expanded ? ' is-open' : ''}`} aria-hidden={!expanded}>
        <div className="wonder-reflection-body-clip">
          <div className="wonder-reflection-body-inner" dangerouslySetInnerHTML={{ __html: reflection.body }} />
        </div>
      </div>

      {expanded && (
        <div className="wonder-reflection-end">
          <span>{reflection.tag}</span>
          <span>{reflection.readTime}</span>
        </div>
      )}
    </article>
  );
}

// ─── WONDER PAGE MASTER COMPONENT ───────────────────────────────────────────
export default function WonderPage() {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useScrollReveal();
  useMagnetic();

  useEffect(() => {
    document.title = "Wonder — Shahriar's Personal Universe";
  }, []);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSelectQuote = index => {
    if (index === activeQuoteIndex) return;
    setActiveQuoteIndex(index);
  };

  const handleTouchStart = e => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = e => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left -> next
        handleSelectQuote((activeQuoteIndex + 1) % contemplationQuotes.length);
      } else {
        // swipe right -> prev
        handleSelectQuote((activeQuoteIndex - 1 + contemplationQuotes.length) % contemplationQuotes.length);
      }
    }
  };

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
          <div 
            className="wonder-centerpiece-stage reveal swipe-hint-nudge"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  width: '100%',
                  transition: 'transform 0.7s ease-in-out',
                  transform: `translateX(-${activeQuoteIndex * 100}%)`
                }}
              >
                {contemplationQuotes.map((quote, idx) => (
                  <div key={idx} style={{ flex: '0 0 100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <blockquote
                      className="wonder-centerpiece-quote"
                      aria-live="polite"
                    >
                      “{quote.thought}”
                    </blockquote>
                    <div className="wonder-centerpiece-meta">
                      <span className="wonder-centerpiece-attribution">{quote.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
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
                    aria-current={isActive ? 'true' : undefined}
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

          <div className="wonder-reflections-ledger">
            {reflections.map(r => (
              <ReflectionRow key={r.id} reflection={r} />
            ))}
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

          {/* ESSAY LEDGER — quiet editorial entries; full reading opens in the modal */}
          <div className="wonder-essays-ledger">
            {essays.map(e => (
              <div key={e.id} className="reveal">
                <button
                  type="button"
                  className="wonder-editorial-row wonder-essay-trigger"
                  onClick={() => setSelectedEssay(e)}
                  aria-label={`Open essay: ${e.title}`}
                >
                  <div className="wonder-row-meta">
                    <span className="wonder-row-number">{Number(e.number)}</span>
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
                      READ ESSAY
                      <span className="wonder-read-arrow" aria-hidden="true">↗</span>
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <WonderReaderModal
            article={selectedEssay}
            isOpen={Boolean(selectedEssay)}
            onClose={() => setSelectedEssay(null)}
          />

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
                ENTER CREATE
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
