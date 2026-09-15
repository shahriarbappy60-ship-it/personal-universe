import React from 'react';
import { resonanceFeatured, resonanceCurated } from '../../data/resonanceData';

export default function ResonanceSection() {
  return (
    <section className="section section-pad resonance-section" id="resonance">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">05 / RESONANCE</div>
          <h2>
            What stays <em>with me.</em>
          </h2>
        </div>
        <p className="section-intro">
          Soundtracks, cinematic moods, and atmospheric frequencies that shape how time feels.
        </p>
      </div>

      <div className="resonance-master-grid reveal">
        {/* FEATURED IMMERSIVE PLAYER (ONTARIO) */}
        <article className="resonance-feature-card">
          <div className="feature-vinyl-wrap">
            <img
              src={resonanceFeatured.cover}
              alt={resonanceFeatured.title}
              loading="lazy"
            />
            <div className="vinyl-overlay-glow" />
          </div>

          <div className="feature-content">
            <div className="feature-meta-top">
              <span className="badge-live">CURRENT RECORD</span>
              <small className="track-code">VINYL · 2024</small>
            </div>

            <div className="track-details">
              <h3>{resonanceFeatured.title}</h3>
              <p>{resonanceFeatured.artist}</p>
            </div>

            <div className="player-timeline-box">
              <div className="time-track">
                <span className="time-bar" style={{ width: `${resonanceFeatured.progress}%` }} />
              </div>
              <div className="time-stamps">
                <span>{resonanceFeatured.currentTime}</span>
                <span>{resonanceFeatured.totalTime}</span>
              </div>
            </div>
          </div>
        </article>

        {/* CURATED ARCHIVE LIST */}
        <div className="resonance-collection-card">
          <div className="collection-header">
            <span>SELECTED SOUNDTRACKS</span>
            <span>05 ITEMS</span>
          </div>

          <div className="curated-items-list">
            {resonanceCurated.map(item => (
              <div key={item.id} className="curated-item">
                <div className="item-thumb">
                  <img src={item.cover} alt={item.title} loading="lazy" />
                </div>
                <div className="item-text">
                  <strong>{item.title}</strong>
                  <small>{item.artist}</small>
                </div>
                <span className="item-badge">{item.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
