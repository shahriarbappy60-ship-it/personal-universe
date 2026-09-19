import React from 'react';
import { Link } from 'react-router-dom';
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

      {/* ASYMMETRIC CREATE COMPOSITION: PORTRAIT FEATURED ON LEFT, DUAL STACKED ON RIGHT */}
      <div className="create-composition reveal">
        {/* LEFT: PORTRAIT PERSONAL UNIVERSE CARD */}
        <article className="project-feature project-feature-portrait">
          <div className="project-visual" id="projectVisual">
            {/* REUSED HOME HERO CELESTIAL VISUAL SYSTEM */}
            <div className="project-celestial-stage" aria-hidden="true">
              {/* Volumetric ambient starlight / corona glow */}
              <div className="celestial-corona-aura" />

              {/* REAR ORBITAL RINGS LAYER — Sits BEHIND the celestial sphere (z-index: 2) */}
              <div className="celestial-rings-layer celestial-rings-rear" aria-hidden="true">
                <div className="celestial-ring ring-outer">
                  <span className="stellar-satellite node-outer-1" />
                  <span className="stellar-satellite node-outer-2" />
                </div>

                <div className="celestial-ring ring-accretion">
                  <div className="accretion-dust-texture" />
                  <span className="stellar-satellite node-mid" />
                </div>

                <div className="celestial-ring ring-inner">
                  <span className="stellar-satellite node-inner" />
                </div>
              </div>

              {/* CENTRAL 3D CELESTIAL BODY — Layered between rear and front rings (z-index: 5) */}
              <div className="celestial-body">
                <div className="celestial-atmosphere" />
                <div className="celestial-inner-core" />
                <div className="celestial-rim-light" />
              </div>

              {/* FRONT ORBITAL RINGS LAYER — Passes IN FRONT OF the celestial sphere (z-index: 8) */}
              <div className="celestial-rings-layer celestial-rings-front" aria-hidden="true">
                <div className="celestial-ring ring-outer">
                  <span className="stellar-satellite node-outer-1" />
                  <span className="stellar-satellite node-outer-2" />
                </div>

                <div className="celestial-ring ring-accretion">
                  <div className="accretion-dust-texture" />
                  <span className="stellar-satellite node-mid" />
                </div>

                <div className="celestial-ring ring-inner">
                  <span className="stellar-satellite node-inner" />
                </div>
              </div>
            </div>

            <span className="visual-label">EXPERIMENT / 001</span>
            <span className="visual-caption">A LIVING DIGITAL UNIVERSE</span>
          </div>

          <div className="project-info">
            <div>
              <span className="project-type">PERSONAL SYSTEM / WEB EXPERIENCE</span>
              <h3>Personal Universe</h3>
              <p>
                A personal digital space that brings together my photography,
                writing, projects, ideas, and evolving identity in one interactive
                web experience.
              </p>
            </div>

            <div>
              <div className="tag-row" aria-label="Technologies used">
                <span>REACT</span>
                <span>JAVASCRIPT</span>
                <span>CSS</span>
                <span>VITE</span>
              </div>

              <a href="#home" className="arrow-link">
                <span>Current chapter</span>
                <span className="arrow-icon" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>

        {/* RIGHT: TWO SECONDARY PROJECT CARDS STACKED VERTICALLY */}
        <div className="project-secondary-column">
          <Link to="/create" className="project-card reveal-item" aria-label="Explore Student Assignment Portal">
            <div className="project-card-header">
              <span className="project-index">02 / ACADEMIC UTILITY</span>
              <span className="project-card-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>Student Assignment Portal</h3>
            <p>
              A university-focused interface for organizing
              assignments, deadlines and academic workflow.
            </p>
            <div className="project-bottom">
              <span>WEB DEVELOPMENT</span>
              <span>2025</span>
            </div>
          </Link>

          <Link to="/create" className="project-card reveal-item delay-1" aria-label="Explore SEU Tech Event">
            <div className="project-card-header">
              <span className="project-index">03 / EVENT PLATFORM</span>
              <span className="project-card-arrow" aria-hidden="true">↗</span>
            </div>
            <h3>SEU Tech Event</h3>
            <p>
              An event information and registration experience
              designed for a university technology symposium.
            </p>
            <div className="project-bottom">
              <span>HTML / CSS / UI</span>
              <span>2024</span>
            </div>
          </Link>
        </div>
      </div>

      {/* UNIFIED ARCHIVE CTA — INHERITS MOTHER BUTTON SYSTEM */}
      <div className="create-archive-action reveal">
        <Button to="/create" variant="glass">
          View projects
        </Button>
      </div>
    </section>
  );
}
