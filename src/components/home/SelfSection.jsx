import React from 'react';
import Button from '../common/Button';

export default function SelfSection() {
  return (
    <section className="section section-pad about-section" id="self">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">04 / SELF</div>
          <h2>
            Who I <em>am.</em>
          </h2>
        </div>
        <p className="section-intro">
          A personal space exploring identity, curiosity, and the craft of seeing.
        </p>
      </div>

      <div className="about-grid reveal">
        {/* TALL SLENDER EDITORIAL PORTRAIT CARD */}
        <div className="portrait-card portrait-card-tall">
          <div className="portrait-image-wrap">
            <img
              src="/images/portrait.jpg"
              alt="Shahriar Khan"
              loading="lazy"
            />
            <div className="portrait-ambient-glow" aria-hidden="true" />
          </div>

          <div className="portrait-overlay">
            <div className="portrait-badge">
              <span className="portrait-status-dot" />
              <span>DHAKA · BANGLADESH</span>
            </div>
            <h3>SHAHRIAR</h3>
            <p>Observer / Developer</p>
          </div>
        </div>

        {/* PROMINENT EDITORIAL CONTENT: THE OBSERVER */}
        <div className="about-editorial-simple">
          <div className="about-observer-block">
            <div className="about-kicker">PERSONAL IDENTITY · PHILOSOPHY</div>
            <h3 className="observer-title">THE OBSERVER</h3>
            <p className="observer-statement">
              “I’m curious about how things work, how people see the world, and what lies beneath the surface. I build with code, capture what catches my eye, and write about the questions that stay with me.”
            </p>
          </div>

          {/* EDITORIAL CONTEXT & IDENTITY METADATA */}
          <div className="observer-editorial-meta">
            <div className="observer-meta-tag">
              <span className="meta-tag-dot" />
              <span>CSE Undergraduate / Aspiring Full-Stack Developer</span>
            </div>
            <div className="observer-meta-location">
              <span>Southeast University · Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* VIEW PROFILE BUTTON */}
          <div className="about-action-row">
            <Button
              to="/self"
              variant="solid"
              ariaLabel="View Shahriar's complete profile and curriculum vitae"
            >
              View profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
