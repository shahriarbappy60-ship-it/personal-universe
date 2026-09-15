import React from 'react';
import Button from '../common/Button';

export default function CreateSection() {
  return (
    <section className="section section-pad" id="create">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">03 / CREATE</div>
          <h2>
            What I <em>build.</em>
          </h2>
        </div>
        <p className="section-intro">
          Turning curiosity into interfaces, experiments,
          software and things that can exist beyond an idea.
        </p>
      </div>

      <article className="project-feature reveal">
        <div className="project-visual" id="projectVisual">
          {/* ARCHITECTURAL CONSTRUCTION VISUAL */}
          <div className="create-architectural-preview" aria-hidden="true">
            <div className="arch-plane arch-plane-1" />
            <div className="arch-plane arch-plane-2" />
            <div className="arch-plane arch-plane-3" />
            <div className="arch-core-light" />
          </div>

          <span className="visual-label">EXPERIMENT / 001</span>
          <span className="visual-caption">A LIVING DIGITAL UNIVERSE</span>
        </div>

        <div className="project-info">
          <span className="project-type">PERSONAL SYSTEM / WEB EXPERIENCE</span>
          <h3>
            Personal<br />
            Universe
          </h3>
          <p>
            A living digital space built around observation,
            thought, creativity, learning, music and the
            evolving identity of its creator.
          </p>

          <div className="tag-row">
            <span>HTML</span>
            <span>CSS</span>
            <span>JAVASCRIPT</span>
            <span>DJANGO</span>
          </div>

          <a href="#home" className="arrow-link">
            <span>Current chapter</span>
            <span>↗</span>
          </a>
        </div>
      </article>

      <div className="project-grid">
        <article className="project-card reveal-item">
          <span className="project-index">02 / ACADEMIC UTILITY</span>
          <h3>Student Assignment Portal</h3>
          <p>
            A university-focused interface for organizing
            assignments, deadlines and academic workflow.
          </p>
          <div className="project-bottom">
            <span>WEB DEVELOPMENT</span>
            <span>2025</span>
          </div>
        </article>

        <article className="project-card reveal-item delay-1">
          <span className="project-index">03 / EVENT PLATFORM</span>
          <h3>SEU Tech Event</h3>
          <p>
            An event information and registration experience
            designed for a university technology symposium.
          </p>
          <div className="project-bottom">
            <span>HTML / CSS / UI</span>
            <span>2024</span>
          </div>
        </article>
      </div>

      {/* UNIFIED ARCHIVE CTA */}
      <div
        className="section-archive-link reveal"
        style={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button to="/create" variant="glass">
          View projects
        </Button>
      </div>
    </section>
  );
}
