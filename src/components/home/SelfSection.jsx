import React from 'react';
import Button from '../common/Button';

export default function SelfSection() {
  return (
    <section className="section section-pad about-section pt-32 md:pt-36 scroll-mt-28" id="self">
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
        <div className="portrait-card portrait-card-tall shadow-xl rounded-3xl overflow-hidden">
          <div className="portrait-image-wrap">
            <img
              src="/images/portrait.jpg"
              alt="Shahriar Khan"
              loading="lazy"
            />
            <div className="portrait-ambient-glow" aria-hidden="true" />
          </div>

          <div className="portrait-overlay bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <h3>SHAHRIAR KHAN</h3>
            <p>THE OBSERVER</p>
          </div>
        </div>

        {/* PROMINENT EDITORIAL CONTENT: THE OBSERVER */}
        <div className="about-editorial-simple">
          <div className="about-observer-block">
            <div className="about-kicker hide-on-mobile">PERSONAL IDENTITY</div>
            <h3 className="observer-title hide-on-mobile">SHAHRIAR KHAN</h3>
            <div className="observer-role-sub hide-on-mobile">OBSERVER · DEVELOPER</div>
            <p className="observer-statement">
              “I’m curious about how things work, how people see the world, and what lies beneath the surface. I build with code, capture what catches my eye, and write about the questions that stay with me.”
            </p>
          </div>

          {/* VIEW PROFILE BUTTON */}
          <div className="about-action-row">
            <Button
              to="/self"
              variant="glass"
              icon="→"
              ariaLabel="View Shahriar's complete profile"
              className="rounded-full px-6 py-2.5 text-sm"
            >
              VIEW PROFILE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
