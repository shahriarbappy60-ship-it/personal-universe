import React, { useState, useRef } from 'react';
import { wonderEntries } from '../../data/wonderData';
import Button from '../common/Button';

export default function WonderSection({ onOpenEssay }) {
  // Default to index 0
  const [selectedThoughtIndex, setSelectedThoughtIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeEntry = wonderEntries[selectedThoughtIndex] || wonderEntries[0];

  const handleSelectThought = index => {
    if (index === selectedThoughtIndex) return;
    setSelectedThoughtIndex(index);
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
        handleSelectThought((selectedThoughtIndex + 1) % wonderEntries.length);
      } else {
        // swipe right -> prev
        handleSelectThought((selectedThoughtIndex - 1 + wonderEntries.length) % wonderEntries.length);
      }
    }
  };

  return (
    <section className="section section-pad inquiry-section pt-32 md:pt-36 scroll-mt-28" id="wonder">
      {/* SECTION HEADING */}
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">02 / WONDER</div>
          <h2>
            What I <em>wonder.</em>
          </h2>
        </div>
        <p className="section-intro">
          Ideas do not always need answers. Some are valuable simply because they refuse to leave.
        </p>
      </div>

      {/* QUIET EDITORIAL STAGE: THOUGHT DIRECTLY ON THE DARK PAGE (NO LARGE CARD) */}
      <div 
        className="wonder-editorial-stage reveal swipe-hint-nudge"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="wonder-thought-display" style={{ overflow: 'hidden' }}>
          <div 
            style={{ 
              display: 'flex', 
              width: '100%', 
              transition: 'transform 0.7s ease-in-out',
              transform: `translateX(-${selectedThoughtIndex * 100}%)`
            }}
          >
            {wonderEntries.map((entry, idx) => (
              <div key={idx} style={{ flex: '0 0 100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <blockquote
                  className="wonder-thought-quote"
                  aria-live="polite"
                >
                  “{entry.thought}”
                </blockquote>
                <div className="wonder-thought-meta">
                  <span className="wonder-thought-tag">{entry.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUIET EDITORIAL INDEX */}
        <nav className="wonder-thought-index" aria-label="Thought categories">
          {wonderEntries.map((item, index) => {
            const isActive = index === selectedThoughtIndex;
            return (
              <button
                key={item.id || item.number || index}
                type="button"
                className={`wonder-index-item ${isActive ? 'is-active' : ''}`}
                aria-selected={isActive}
                onClick={() => handleSelectThought(index)}
              >
                <span className="wonder-index-title">{item.shortTitle || item.title}</span>
              </button>
            );
          })}
        </nav>

        {/* ARCHIVE INVITATION CTA */}
        <div className="wonder-archive-action">
          <Button to="/wonder" variant="glass">
            Read the archive
          </Button>
        </div>
      </div>
    </section>
  );
}
