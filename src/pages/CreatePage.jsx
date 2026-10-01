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
  let element = document.head.querySelector(`meta[${attribute}="${name}"][data-create-seo]`);
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

function CreateProjectCard({ project, isOpen, onToggle }) {
  return (
    <article className={`create-project-card ${isOpen ? 'is-open' : ''}`}>
      <div className="create-project-card-top">
        <span className="create-project-ghost-number" aria-hidden="true">{project.index}</span>

        <div className="create-project-copy">
          <div className="create-project-meta">
            <span>{project.index} / PROJECT</span>
            <span>[ADD STATUS]</span>
          </div>

          <h3 className="create-project-title">{project.title}</h3>

          <p className="create-project-description">{project.description}</p>

          <div className="create-project-tags" aria-label="Project stack">
            <span>[ADD STACK]</span>
          </div>

          <button
            type="button"
            className="create-project-open"
            aria-expanded={isOpen}
            aria-controls={`create-project-details-${project.index}`}
            onClick={onToggle}
          >
            <span>{isOpen ? 'CLOSE PROJECT' : 'EXPLORE PROJECT'}</span>
            <span aria-hidden="true">{isOpen ? '↑' : '↗'}</span>
          </button>
        </div>

        <div className="create-project-visual" role="img" aria-label={`Screenshot placeholder for ${project.title}`}>
          <div className="create-project-visual-grid" aria-hidden="true" />
          <div className="create-project-visual-mark" aria-hidden="true">
            <span>{project.index}</span>
          </div>
          <span className="create-project-visual-label">[ADD SCREENSHOT]</span>
        </div>
      </div>

      <div
        id={`create-project-details-${project.index}`}
        className="create-project-details"
        hidden={!isOpen}
      >
        <div className="create-project-details-inner">
          <div>
            <span className="create-project-label">PROBLEM</span>
            <p>[ADD TEXT]</p>
          </div>
          <div>
            <span className="create-project-label">WHAT I BUILT</span>
            <p>[ADD TEXT]</p>
          </div>
          <div>
            <span className="create-project-label">WHAT I LEARNED</span>
            <p>[ADD TEXT]</p>
          </div>
          <div>
            <span className="create-project-label">LINKS</span>
            <p>No live or GitHub link provided.</p>
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
    const description = 'A curated archive of projects and experiments by Shahriar Khan.';
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
      {/* HERO IS LOCKED — unchanged */}
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
            <div className="create-projects-heading">
              <span className="create-section-number">03 / CREATE</span>
              <h2 className="create-projects-title">Create</h2>
              <p className="create-projects-subtitle">projects & experiments</p>
            </div>
            <div className="create-projects-intro">
              <span>SELECTED WORK</span>
              <p>Two pieces of work from an evolving digital practice.</p>
            </div>
          </header>

          <div className="create-project-archive" id="create-project-archive">
            {createProjects.map((project) => (
              <CreateProjectCard
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
          <p className="create-closing-line">Built from curiosity. Still becoming.</p>
          <a className="create-closing-link" href="/">
            RETURN TO HOME <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
