import React, { useState } from 'react';
import { wonderEntries } from '../../data/wonderData';
import Button from '../common/Button';

export default function WonderSection({ onOpenEssay }) {
  // Default to index 0
  const [selectedThoughtIndex, setSelectedThoughtIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeEntry = wonderEntries[selectedThoughtIndex] || wonderEntries[0];

  const handleSelectThought = index => {
    if (index === selectedThoughtIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setSelectedThoughtIndex(index);
      setIsFading(false);
    }, 220);
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
      <div className="wonder-editorial-stage reveal">
        <div className="wonder-thought-display">
          <blockquote
            className={`wonder-thought-quote ${isFading ? 'fading' : ''}`}
            aria-live="polite"
          >
            “{activeEntry.thought}”
          </blockquote>

          <div className={`wonder-thought-meta ${isFading ? 'fading' : ''}`}>
            <span className="wonder-thought-tag">{activeEntry.tag}</span>
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
