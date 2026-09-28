import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { projectsData } from '../../data/projectsData';

export default function CreateSection() {
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  const supportingProjects = projectsData.filter(p => p.id !== featuredProject.id).slice(0, 2);

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

      {/* CURATED CREATE COMPOSITION: one hero build + two quiet supporting previews */}
      <div className="create-composition create-composition-featured-only reveal">
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

        <div className="create-supporting-projects">
          {supportingProjects.map((project, index) => (
            <article className="create-support-card" key={project.id}>
              <div className="create-support-meta">
                <span>0{index + 2} / {project.status.toUpperCase()}</span>
                <span>{project.year}</span>
              </div>
              <div>
                <span className="create-support-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.cardDescription || project.description}</p>
              </div>
              <div className="create-support-footer">
                <span>{project.categoryTag || project.technologies.slice(0, 3).join(' · ')}</span>
                <span>VIEW IN ARCHIVE</span>
              </div>
            </article>
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
