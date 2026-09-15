import React from 'react';

export default function NowSection() {
  return (
    <section className="section section-pad" id="now">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">07 / NOW</div>
          <h2>
            The current <em>chapter.</em>
          </h2>
        </div>
        <p className="section-intro">
          A small record of what currently occupies my attention.
        </p>
      </div>

      <div className="now-grid">
        <article className="now-card reveal-item">
          <span>LEARNING</span>
          <h3>Full-Stack Web</h3>
          <p>
            Moving from HTML and CSS into JavaScript,
            Python, Django and databases.
          </p>
        </article>

        <article className="now-card reveal-item delay-1">
          <span>BUILDING</span>
          <h3>Personal Universe</h3>
          <p>
            Turning this website into a real Django-powered
            personal CMS and digital archive.
          </p>
        </article>

        <article className="now-card reveal-item delay-2">
          <span>EXPLORING</span>
          <h3>Consciousness</h3>
          <p>
            Questions around perception, identity,
            existence, time and the observer.
          </p>
        </article>
      </div>
    </section>
  );
}
