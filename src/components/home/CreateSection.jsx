import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { projectsData } from '../../data/projectsData';

export default function CreateSection() {
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  const secondaryProjects = projectsData.filter(p => !p.featured);

  return (
    <section className="section section-pad pt-32 md:pt-36 scroll-mt-28" id="create">
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

            <span className="visual-label hide-on-mobile">{featuredProject.visualLabel}</span>
            <span className="visual-caption">{featuredProject.visualCaption}</span>
          </div>

          <div className="project-info">
            <div>
              <span className="project-type hide-on-mobile">{featuredProject.type.toUpperCase()}</span>
              <h3>{featuredProject.title}</h3>
              <p>
                {featuredProject.homeDescription}
              </p>
            </div>

            <div>
              <div className="tag-row hide-on-mobile" aria-label="Technologies used">
                {featuredProject.technologies.map(tech => (
                  <span key={tech}>{tech.toUpperCase()}</span>
                ))}
              </div>

              <a href={featuredProject.homeLink} className="arrow-link">
                <span>{featuredProject.homeLinkText}</span>
                <span className="arrow-icon" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>

        {/* RIGHT: TWO SECONDARY PROJECT CARDS STACKED VERTICALLY */}
        <div className="project-secondary-column">
          {secondaryProjects.map((project, idx) => (
            <Link
              key={project.id}
              to="/create"
              className={`project-card reveal-item ${idx > 0 ? `delay-${idx}` : ''}`}
              aria-label={`Explore ${project.title}`}
            >
              <div className="project-card-header">
                <span className="project-index">{project.index} / {project.cardCategory}</span>
                <span className="project-card-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{project.title}</h3>
              <p>
                {project.cardDescription}
              </p>
              <div className="project-bottom">
                <span>{project.categoryTag}</span>
                <span>{project.year}</span>
              </div>
            </Link>
          ))}
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
