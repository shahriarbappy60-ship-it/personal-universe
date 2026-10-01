import React, { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import '../styles/create-page.css';

const createProjects = [
  {
    index: '001',
    title: 'Personal Universe',
    description:
      'A personal digital space that brings together my photography, writing, projects, ideas, and evolving identity in one interactive web experience.',
  },
  {
    index: '002',
    title: 'SEU Tech Event',
    description:
      'An event information and registration experience designed for a university technology symposium.',
  },
];

const setMeta = (name, content, attribute = 'name') => {
  let element = document.head.querySelector(
    `meta[${attribute}="${name}"][data-create-seo]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('data-create-seo', 'true');
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (href) => {
  let link = document.head.querySelector('link[data-create-seo="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('data-create-seo', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

function CreateProjectRow({ project, isOpen, onToggle }) {
  return (
    <article
      className={`create-project-card ${isOpen ? 'is-open' : ''}`}
      aria-labelledby={`create-project-title-${project.index}`}
    >
      <button
        type="button"
        className="create-project-toggle"
        aria-expanded={isOpen}
        aria-controls={`create-project-details-${project.index}`}
        onClick={onToggle}
      >
        <span className="create-project-index">{project.index}</span>

        <span className="create-project-heading">
          <span
            className="create-project-title"
            id={`create-project-title-${project.index}`}
          >
            {project.title}
          </span>
          <span className="create-project-description">
            {project.description}
          </span>
        </span>

        <span className="create-project-status">[ADD STATUS]</span>

        <span className="create-project-control" aria-hidden="true">
          {isOpen ? 'CLOSE ×' : 'VIEW PROJECT ↗'}
        </span>
      </button>

      <div
        id={`create-project-details-${project.index}`}
        className="create-project-details"
        hidden={!isOpen}
      >
        <div className="create-project-details-grid">
          <div className="create-project-detail">
            <span className="create-project-label">STACK</span>
            <span className="create-project-value">[ADD STACK]</span>
          </div>

          <div className="create-project-detail">
            <span className="create-project-label">SCREENSHOT</span>
            <span className="create-project-screenshot">[ADD SCREENSHOT]</span>
          </div>

          <div className="create-project-detail">
            <span className="create-project-label">LINKS</span>
            <span className="create-project-value">No live or GitHub link provided.</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CreatePage() {
  useScrollReveal([]);
  useMagnetic([]);
  const [openProject, setOpenProject] = useState(null);

  useEffect(() => {
    const title = 'Create — Projects by Shahriar Khan';
    const description =
      'A curated archive of projects and experiments by Shahriar Khan.';
    const canonical = 'https://shahriarkhan.me/create';

    document.title = title;
    setMeta('description', description);
    setCanonical(canonical);

    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:site_name', "Shahriar's Personal Universe", 'property');
  }, []);

  return (
    <main className="create-page" id="mainContent">
      {/* ═══════════════════════════════════════════════════
          SECTION 1: CREATE HERO (LOCKED DESIGN AREA)
          This section is intentionally unchanged.
      ═══════════════════════════════════════════════════ */}
      <section className="observe-hero section-pad" id="createHero">
        <div className="observe-shell">
          <div className="observe-hero-content">
            <div className="eyebrow reveal">03 / CREATE</div>
            <h1 className="reveal delay-1">
              Things I<br />
              <em>make.</em>
            </h1>
            <p className="observe-hero-copy reveal delay-2">
              Turning curiosity into interfaces, experiments, software architecture and things that can exist beyond an idea.
            </p>
            <div className="observe-hero-actions reveal delay-2">
              <Button href="#projects" variant="glass" icon="↓">
                EXPLORE ARCHIVE
              </Button>
              <span className="observe-status">SYSTEMS ARCHIVE</span>
            </div>
          </div>

          <div className="observe-hero-meta">
            <span>23° 48′ N</span>
            <span>90° 24′ E</span>
            <span>DHAKA · BANGLADESH</span>
          </div>
        </div>
      </section>

      <section className="create-projects-section section-pad" id="projects">
        <div className="create-projects-shell">
          <header className="create-projects-header">
            <div>
              <span className="create-section-number">03 / CREATE</span>
              <h2 className="create-projects-title">Create</h2>
              <p className="create-projects-subtitle">projects & experiments</p>
            </div>

            <a className="create-projects-anchor" href="#create-project-archive">
              <span>ARCHIVE</span>
              <span aria-hidden="true">↓</span>
            </a>
          </header>

          <div
            className="create-project-archive"
            id="create-project-archive"
            aria-label="Projects and experiments"
          >
            {createProjects.map((project) => (
              <CreateProjectRow
                key={project.index}
                project={project}
                isOpen={openProject === project.index}
                onToggle={() =>
                  setOpenProject((current) =>
                    current === project.index ? null : project.index
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="create-closing section-pad" aria-label="Return to homepage">
        <div className="create-closing-inner">
          <span className="create-closing-eyebrow">END OF CURRENT CHAPTER</span>
          <p className="create-closing-line">
            Some things are made to be finished. Others are made to keep becoming.
          </p>
          <a className="create-closing-link" href="/">
            RETURN TO HOME <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
