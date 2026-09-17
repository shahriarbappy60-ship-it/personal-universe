import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/common/ProjectCard';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function CreatePage() {
  useScrollReveal([]);
  useMagnetic([]);

  useEffect(() => {
    document.title = "Create — Shahriar Khan";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="create-page" id="mainContent">
      {/* ARCHITECTURAL CONSTRUCTION HERO */}
      <section className="create-hero section-pad">
        <div className="create-hero-bg-grid" aria-hidden="true" />

        <div className="create-hero-content">
          <div className="eyebrow reveal">03 / CREATE</div>
          <h1 className="reveal delay-1">
            Things I <em>make.</em>
          </h1>
          <p className="create-hero-copy reveal delay-2">
            Turning curiosity into interfaces, experiments, software architecture and things that can exist beyond an idea.
          </p>
          <div className="create-hero-actions reveal delay-2">
            <Button href="#projects" variant="solid">
              View projects
            </Button>
            <Button to="/#get-in-touch" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>

        {/* CONSTRUCTION METAPHOR — TRANSLUCENT PLANES & ARCHITECTURAL GEOMETRY */}
        <div className="create-architectural-stage" aria-hidden="true">
          <div className="arch-plane arch-plane-1" />
          <div className="arch-plane arch-plane-2" />
          <div className="arch-plane arch-plane-3" />
          <div className="arch-core-light" />
        </div>
      </section>

      {/* FULL PROJECT ARCHIVE GRID */}
      <section className="section section-pad create-archive-section" id="projects">
        <div className="section-heading reveal">
          <div>
            <div className="eyebrow">SYSTEMS & EXPERIMENTS</div>
            <h2>
              Selected <em>works.</em>
            </h2>
          </div>
          <p className="section-intro">
            An evolving portfolio of web experiences, academic tools, and full-stack software explorations.
          </p>
        </div>

        <div className="create-archive-grid reveal">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* CLOSING EDITORIAL GATEWAY */}
        <div className="create-gateway reveal">
          <span className="gateway-eyebrow">NEXT CHAPTER · WHO I AM</span>
          <h2 className="gateway-title">
            The observer behind<br />
            <em>the craft.</em>
          </h2>
          <p className="gateway-subtitle">
            Exploring identity, curriculum vitae, and the questions that shape each build.
          </p>
          <div className="gateway-actions">
            <Button to="/self" variant="solid">
              View profile
            </Button>
            <Button to="/#get-in-touch" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
