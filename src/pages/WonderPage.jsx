import React, { useState, useEffect, useRef } from 'react';
import { contemplationQuotes, writings } from '../data/wonderData';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

// ─── UNIFIED WRITING ROW ─────────────────────────────────────────────────────
function getWritingTitle(entry) {
  if (entry.title) return entry.title;
  return [entry.titleBase, entry.titleAccent].filter(Boolean).join(' ');
}

function ShareButton({ entry, className = '' }) {
  const [shared, setShared] = useState(false);
  const handleShare = async e => {
    e?.stopPropagation?.();
    const url = `${window.location.origin}/wonder#writing-${entry.id}`;
    const shareData = { title: getWritingTitle(entry), text: entry.excerpt || '', url };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
      }
    } catch (error) {
      if (error?.name !== 'AbortError' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
      }
    }
  };
  return <button type="button" className={`wonder-share-action ${className}`} onClick={handleShare} aria-label={`Share: ${getWritingTitle(entry)}`}>{shared ? 'COPIED' : 'SHARE'} <span aria-hidden="true">↗</span></button>;
}

function WritingRow({ writing, index, onOpen, isOpen, onClose }) {
  const rowRef = useRef(null);
  const isLong = writing.length === 'long';
  const title = getWritingTitle(writing);

  const handleOpen = e => {
    e?.stopPropagation?.();
    if (isLong) onOpen(writing);
  };

  const handleClose = e => {
    e?.stopPropagation?.();
    const beforeTop = rowRef.current?.getBoundingClientRect().top ?? null;
    onClose(writing);
    if (beforeTop === null) return;
    window.requestAnimationFrame(() => {
      const afterTop = rowRef.current?.getBoundingClientRect().top ?? beforeTop;
      const delta = afterTop - beforeTop;
      if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: 'auto' });
    });
  };

  return (
    <article
      ref={rowRef}
      id={`writing-${writing.id}`}
      className={`wonder-writing-row wonder-writing-${writing.length}${isOpen ? ' is-open' : ''}`}
    >
      <div className="wonder-writing-main">
        <div className="wonder-writing-meta">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{writing.tag || 'WRITING'}</span>
          <span>{writing.date}</span>
        </div>

        <h3 className="wonder-writing-title">
          {writing.titleBase ? <>{writing.titleBase} <em>{writing.titleAccent}</em></> : title}
        </h3>

        <div className={`wonder-writing-expand${isOpen ? ' is-expanded' : ''}`}>
          <div id={`writing-body-${writing.id}`} className="wonder-writing-expand-inner">
            <div
              className="wonder-writing-body"
              dangerouslySetInnerHTML={{ __html: writing.body }}
            />
          </div>
        </div>

        <div className="wonder-writing-footer">
          {!isLong ? null : !isOpen ? (
            <button
              type="button"
              className="wonder-writing-read"
              onClick={handleOpen}
              aria-expanded="false"
              aria-controls={`writing-body-${writing.id}`}
            >
              READ <span aria-hidden="true">↗</span>
            </button>
          ) : (
            <>
              <ShareButton entry={writing} />
              <button
                type="button"
                className="wonder-writing-close"
                onClick={handleClose}
                aria-expanded="true"
                aria-controls={`writing-body-${writing.id}`}
              >
                CLOSE <span aria-hidden="true">×</span>
              </button>
            </>
          )}
          {!isLong && <ShareButton entry={writing} />}
        </div>
      </div>
    </article>
  );
}

// ─── WONDER PAGE MASTER COMPONENT ───────────────────────────────────────────
export default function WonderPage() {
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useScrollReveal();
  useMagnetic();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith('#writing-')) return;
    const id = hash.slice('#writing-'.length);
    const entry = writings.find(item => item.id === id);
    window.requestAnimationFrame(() => {
      if (entry?.length === 'long') {
        setSelectedWriting(entry);
        window.setTimeout(() => {
          document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 80);
      } else {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  }, []);

  useEffect(() => {
    document.title = "Wonder — Shahriar's Personal Universe";
  }, []);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleOpenWriting = writing => {
    setSelectedWriting(writing);
    window.history.replaceState(null, '', `/wonder#writing-${writing.id}`);
  };

  const handleCloseWriting = writing => {
    setSelectedWriting(current => current?.id === writing.id ? null : current);
    if (window.location.hash === `#writing-${writing.id}`) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

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
              <Button href="#wonderWritings" variant="glass" icon="↓">
                READ WRITINGS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: WRITINGS — ONE CONTINUOUS THOUGHT ARCHIVE
      ═══════════════════════════════════════════════════ */}
      <section className="wonder-tier-section wonder-writings-section section-pad" id="wonderWritings">
        <div className="wonder-shell">
          <div className="wonder-tier-header">
            <span className="wonder-tier-eyebrow reveal">WRITINGS</span>
            <p className="wonder-tier-subtitle reveal">Thoughts, questions, and things worth sitting with.</p>
          </div>
          <div className="wonder-writings-ledger">
            {writings.map((writing, index) => (
              <WritingRow
                key={writing.id}
                writing={writing}
                index={index}
                onOpen={handleOpenWriting}
                isOpen={selectedWriting?.id === writing.id}
                onClose={handleCloseWriting}
              />
            ))}
          </div>
        {/* ═══════════════════════════════════════════════════
              SECTION 4: FOOTER TRANSITION (CHAPTER 03: CREATE)
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
