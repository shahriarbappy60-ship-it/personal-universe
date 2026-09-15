import React from 'react';

const featuredResonance = {
  title: "Ontario",
  artist: "Novo Amor & Ed Tullett",
  cover: "/images/ontario-cover.jpg",
  note: "A song I keep coming back to when everything feels quieter."
};

const returningItems = [
  {
    index: "01",
    title: "Holocene",
    creator: "Bon Iver · Music",
    cover: "/images/holocene-cover.jpg"
  },
  {
    index: "02",
    title: "Faasle",
    creator: "Kaavish · Music",
    cover: "/images/faasle-cover.jpg",
    note: "The song I’ve returned to most over the past two years."
  },
  {
    index: "03",
    title: "Into the Wild",
    creator: "Sean Penn · Film",
    cover: "/images/into-the-wild-cover.jpg"
  }
];

export default function ResonanceSection() {
  return (
    <section className="section section-pad resonance-section" id="resonance">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">RESONANCE</div>
          <h2>
            What stays <em>with me.</em>
          </h2>
        </div>
        <p className="section-intro">
          The sounds, stories, and fragments I keep returning to.
        </p>
      </div>

      <div className="resonance-composition reveal delay-1">
        {/* LEFT: GLASSY PHOTOCARD WITH 1:1 COVER & DETAILS */}
        <div className="resonance-featured-card">
          <div className="resonance-feature-frame">
            <img
              src={featuredResonance.cover}
              alt={`${featuredResonance.title} by ${featuredResonance.artist}`}
              loading="lazy"
            />
            <div className="resonance-visual-scrim" aria-hidden="true" />
          </div>

          <div className="resonance-feature-content">
            <span className="resonance-meta-kicker">CURRENTLY WITH ME</span>
            <h3 className="resonance-featured-title">{featuredResonance.title}</h3>
            <p className="resonance-featured-artist">{featuredResonance.artist}</p>
            <p className="resonance-featured-note">{featuredResonance.note}</p>
          </div>
        </div>

        {/* RIGHT: SECONDARY LIST WITH THUMBNAIL COVERS */}
        <div className="resonance-returning">
          <span className="resonance-returning-heading">
            A FEW THINGS I KEEP RETURNING TO
          </span>

          <div className="resonance-returning-list">
            {returningItems.map(item => (
              <div key={item.index} className="resonance-item-row">
                <span className="resonance-item-idx">{item.index}</span>

                <div className="resonance-item-thumb">
                  <img src={item.cover} alt={item.title} loading="lazy" />
                </div>

                <div className="resonance-item-info">
                  <h4 className="resonance-item-title">{item.title}</h4>
                  <span className="resonance-item-creator">{item.creator}</span>
                  {item.note && (
                    <p className="resonance-item-note">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="resonance-closing-thought">
            Some things become part of you without asking to.
          </p>
        </div>
      </div>
    </section>
  );
}
