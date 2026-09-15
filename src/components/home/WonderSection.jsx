import React, { useState } from 'react';
import { wonderThoughts } from '../../data/wonderData';
import Button from '../common/Button';

export default function WonderSection({ onOpenEssay }) {
  const [selectedThoughtIndex, setSelectedThoughtIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeThought = wonderThoughts[selectedThoughtIndex] || wonderThoughts[0];

  const handleSelectThought = index => {
    if (index === selectedThoughtIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setSelectedThoughtIndex(index);
      setIsFading(false);
    }, 160);
  };

  const handleRandomThought = () => {
    const available = wonderThoughts
      .map((_, i) => i)
      .filter(i => i !== selectedThoughtIndex);
    const pool = available.length ? available : wonderThoughts.map((_, i) => i);
    const randomIndex = pool[Math.floor(Math.random() * pool.length)];
    handleSelectThought(randomIndex);
  };

  return (
    <section className="section section-pad inquiry-section" id="wonder">
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

      <div className="wonder-grid reveal">
        {/* FEATURED THOUGHT CARD */}
        <article className="featured-thought-card">
          <div className="thought-number" id="thoughtNumber">
            {activeThought.number}
          </div>

          <blockquote
            id="featuredThought"
            style={{
              opacity: isFading ? 0 : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            “{activeThought.thought}”
          </blockquote>

          <button
            type="button"
            className="circle-button magnetic"
            id="randomThought"
            aria-label="Show another thought"
            onClick={handleRandomThought}
          >
            ↻
          </button>
        </article>

        {/* THOUGHT LIST CARD */}
        <div className="thought-list-card">
          {wonderThoughts.map((item, index) => {
            const isActive = index === selectedThoughtIndex;
            return (
              <button
                key={item.number}
                className={`thought-item ${isActive ? 'active' : ''}`}
                type="button"
                data-thought={item.thought}
                data-number={item.number}
                aria-selected={isActive}
                onClick={() => handleSelectThought(index)}
              >
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <span>↗</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ESSAY / FIELD NOTE CARD */}
      <article
        className="essay-card reveal"
        style={{
          maxWidth: 'var(--container)',
          margin: '16px auto 0',
          padding: '40px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-soft)'
        }}
      >
        <div>
          <div className="eyebrow">FIELD NOTE / 001</div>
          <h3 style={{ margin: '8px 0', fontSize: '26px', letterSpacing: '-.04em' }}>
            Notes from an unfinished mind.
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
            A collection of questions, fragments and observations.
          </p>
        </div>

        <button
          type="button"
          className="circle-button magnetic"
          aria-label="Read field note"
          onClick={onOpenEssay}
        >
          ↗
        </button>
      </article>

      {/* STANDALONE WONDER ARCHIVE BUTTON */}
      <div
        className="section-archive-link reveal"
        style={{
          marginTop: '28px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button to="/wonder" variant="glass">
          Read the archive
        </Button>
      </div>
    </section>
  );
}
