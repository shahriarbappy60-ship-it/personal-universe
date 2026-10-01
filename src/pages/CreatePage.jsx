import React, { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import { projectsData } from '../data/projectsData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import '../styles/create-page.css';

const createProjects = projectsData.map(project => ({
  ...project,
  index: String(project.index).padStart(3, '0')
}));

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

const setCanonical = href => {
  let link = document.head.querySelector('link[data-create-seo="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('data-create-seo', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

function FeaturedProject({ project, isOpen, onToggle }) {
  return (
    <article className={`create-featured ${isOpen ? 'is-open' : ''}`}>
      <div className="create-featured-visual" aria-hidden="true">
        <div className="create-featured-orbit create-featured-orbit-one" />
        <div className="create-featured-orbit create-featured-orbit-two" />
        <div className="create-featured-orbit create-featured-orbit-three" />
        <div className="create-featured-star create-featured-star-one" />
        <div className="create-featured-star create-featured-star-two" />
        <div className="create-featured-core">
          <span>{project.index}</span>
        </div>
        <div className="create-featured-caption">
          <span>{project.visualLabel}</span>
          <span>{project.visualCaption}</span>
        </div>
      </div>

      <div className="create-featured-content">
        <div className="create-project-kicker">
          <span>{project.index} / {project.type}</span>
          <span>{project.year}</span>
        </div>

        <div className="create-featured-heading">
          <span className="create-project-state">{project.status}</span>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>

        <div className="create-featured-meta">
          <div>
            <span>FOCUS</span>
            <strong>{project.focus}</strong>
          </div>
          <div>
            <span>BUILT WITH</span>
            <strong>{project.technologies.join(' · ')}</strong>
          </div>
        </div>

        <div className="create-featured-actions">
          <button
            type="button"
            className="create-detail-toggle"
            aria-expanded={isOpen}
            aria-controls={`create-detail-${project.id}`}
            onClick={onToggle}
          >
            <span>{isOpen ? 'CLOSE DETAILS' : 'READ THE BUILD'}</span>
            <span aria-hidden="true">{isOpen ? '×' : '↓'}</span>
          </button>
          {project.link && (
            <a
              className="create-source-link"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              SOURCE <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <div id={`create-detail-${project.id}`} className="create-featured-details" hidden={!isOpen}>
          <div>
            <span>ROLE</span>
            <p>{project.role.join(' · ')}</p>
          </div>
          <div>
            <span>OVERVIEW</span>
            <p>{project.overview}</p>
          </div>
          <div>
            <span>BUILD NOTE</span>
            <p>{project.buildNote}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ArchiveProject({ project, isOpen, onToggle }) {
  return (
    <article className={`create-archive-item ${isOpen ? 'is-open' : ''}`}>
      <div className="create-archive-index" aria-hidden="true">{project.index}</div>

      <div className="create-archive-main">
        <div className="create-project-kicker">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>

        <div className="create-archive-title-row">
          <h3>{project.title}</h3>
          <span className="create-project-state">{project.status}</span>
        </div>

        <p>{project.description}</p>

        <div className="create-archive-footer">
          <span>{project.technologies.join(' · ')}</span>
          <button
            type="button"
            className="create-detail-toggle"
            aria-expanded={isOpen}
            aria-controls={`create-detail-${project.id}`}
            onClick={onToggle}
          >
            <span>{isOpen ? 'CLOSE' : 'DETAILS'}</span>
            <span aria-hidden="true">{isOpen ? '×' : '↓'}</span>
          </button>
        </div>
      </div>

      <div id={`create-detail-${project.id}`} className="create-archive-details" hidden={!isOpen}>
        <div>
          <span>FOCUS</span>
          <p>{project.focus}</p>
        </div>
        <div>
          <span>ROLE</span>
          <p>{project.role.join(' · ')}</p>
        </div>
        <div>
          <span>OVERVIEW</span>
          <p>{project.overview}</p>
        </div>
        <div>
          <span>BUILD NOTE</span>
          <p>{project.buildNote}</p>
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
    const title = 'Create — Shahriar’s Personal Universe';
    const description = 'Projects, interfaces, systems, and experiments by Shahriar Khan.';
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

  const featured = createProjects.find(project => project.featured);
  const archive = createProjects.filter(project => !project.featured);

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

      <section className="create-intro section-pad" id="projects">
        <div className="create-intro-line" />
        <div className="create-intro-grid">
          <span className="create-eyebrow">03 / THE ARCHIVE</span>
          <div>
            <h2>Things that<br /><em>took shape.</em></h2>
            <p>Interfaces, systems, and experiments made while figuring things out.</p>
          </div>
        </div>
      </section>

      {featured && (
        <section className="create-featured-section section-pad" aria-label="Featured project">
          <div className="create-shell">
            <FeaturedProject
              project={featured}
              isOpen={openProject === featured.id}
              onToggle={() => setOpenProject(current => current === featured.id ? null : featured.id)}
            />
          </div>
        </section>
      )}

      <section className="create-archive-section section-pad" aria-label="Other projects">
        <div className="create-shell">
          <div className="create-archive-heading">
            <div>
              <span className="create-eyebrow">02—03 / EARLIER WORK</span>
              <h2>Other things<br /><em>I’ve built.</em></h2>
            </div>
            <p>Earlier pieces of the same learning curve.</p>
          </div>

          <div className="create-archive-list">
            {archive.map(project => (
              <ArchiveProject
                key={project.id}
                project={project}
                isOpen={openProject === project.id}
                onToggle={() => setOpenProject(current => current === project.id ? null : project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="create-closing section-pad" aria-label="Return to homepage">
        <div className="create-closing-inner">
          <span className="create-eyebrow">CURRENT CHAPTER</span>
          <p>Still learning. Still building. Still becoming.</p>
          <a href="/" className="create-closing-link">
            RETURN TO HOME <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
