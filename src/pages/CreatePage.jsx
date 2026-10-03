import React, { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import { projectsData } from '../data/projectsData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import '../styles/create-page.css';

const createProjects = projectsData.map(project => ({
  ...project,
  index: String(project.index).padStart(2, '0')
}));

const setMeta = (name, content, attribute = 'name') => {
  let element = document.head.querySelector(`meta[${attribute}="${name}"][data-create-seo]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
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

function CelestialVisual({ project }) {
  return (
    <div className="create-celestial-visual" aria-hidden="true">
      <div className="create-celestial-stage">
        <div className="celestial-corona-aura" />
        <div className="celestial-rings-layer celestial-rings-rear">
          <div className="celestial-ring ring-outer" />
          <div className="celestial-ring ring-accretion"><div className="accretion-dust-texture" /></div>
          <div className="celestial-ring ring-inner" />
        </div>
        <div className="celestial-body">
          <div className="celestial-atmosphere" />
          <div className="celestial-inner-core" />
          <div className="celestial-rim-light" />
        </div>
        <div className="celestial-rings-layer celestial-rings-front">
          <div className="celestial-ring ring-outer" />
          <div className="celestial-ring ring-accretion"><div className="accretion-dust-texture" /></div>
          <div className="celestial-ring ring-inner" />
        </div>
      </div>
      <span className="create-visual-label">{project.visualLabel}</span>
      <span className="create-visual-caption">{project.visualCaption}</span>
    </div>
  );
}

function DetailContent({ project, featured = false }) {
  return (
    <div className={featured ? 'create-detail-grid create-detail-grid-featured' : 'create-detail-grid'}>
      <div>
        <span>OVERVIEW</span>
        <p>{project.overview}</p>
      </div>
      <div>
        <span>ROLE</span>
        <p>{project.role.join(' · ')}</p>
      </div>
      <div>
        <span>FOCUS</span>
        <p>{project.focus}</p>
      </div>
      <div>
        <span>BUILD NOTE</span>
        <p>{project.buildNote}</p>
      </div>
    </div>
  );
}

function ProjectAction({ project, isOpen, onToggle }) {
  return (
    <div className="create-project-actions">
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
      {project.link && (
        <a className="create-source-link" href={project.link} target="_blank" rel="noreferrer">
          SOURCE <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ project, isOpen, onToggle }) {
  return (
    <article className={`create-featured-project${isOpen ? ' is-open' : ''}`}>
      <div className="create-featured-header">
        <div className="create-project-index">{project.index}</div>
        <div className="create-featured-heading">
          <div className="create-project-kicker">
            <span>{project.type}</span>
            <span>{project.year}</span>
          </div>
          <span className="create-project-state">{project.status}</span>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      </div>

      <CelestialVisual project={project} />

      <div className="create-featured-bottom">
        <div className="create-featured-meta">
          <div><span>STATUS</span><strong>{project.status}</strong></div>
          <div><span>BUILT WITH</span><strong>{project.technologies.join(' · ')}</strong></div>
        </div>
        <ProjectAction project={project} isOpen={isOpen} onToggle={onToggle} />
      </div>

      <div
        id={`create-detail-${project.id}`}
        className={`create-project-details${isOpen ? ' is-visible' : ''}`}
        aria-hidden={!isOpen}
      >
        <DetailContent project={project} featured />
      </div>
    </article>
  );
}

function ArchiveProject({ project, isOpen, onToggle }) {
  return (
    <article className={`create-archive-project${isOpen ? ' is-open' : ''}`}>
      <div className="create-archive-index">{project.index}</div>
      <div className="create-archive-content">
        <div className="create-project-kicker">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
        <div className="create-archive-title-row">
          <h3>{project.title}</h3>
          <span className="create-project-state">{project.status}</span>
        </div>
        <p className="create-archive-description">{project.description}</p>
        <div className="create-archive-footer">
          <span>{project.technologies.join(' · ')}</span>
          <ProjectAction project={project} isOpen={isOpen} onToggle={onToggle} />
        </div>
        <div
          id={`create-detail-${project.id}`}
          className={`create-project-details${isOpen ? ' is-visible' : ''}`}
          aria-hidden={!isOpen}
        >
          <DetailContent project={project} />
        </div>
      </div>
    </article>
  );
}

export default function CreatePage() {
  const [openProject, setOpenProject] = useState(null);
  useScrollReveal([openProject]);
  useMagnetic([]);

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

  const toggleProject = id => {
    setOpenProject(current => current === id ? null : id);
  };

  return (
    <main className="create-page" id="mainContent">
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
              <Button href="#projects" variant="glass" icon="↓">EXPLORE ARCHIVE</Button>
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
              onToggle={() => toggleProject(featured.id)}
            />
          </div>
        </section>
      )}

      <section className="create-archive-section section-pad" aria-label="Earlier work">
        <div className="create-shell">
          <div className="create-archive-heading">
            <span className="create-eyebrow">EARLIER WORK</span>
            <h2>Other things<br /><em>I’ve built.</em></h2>
            <p>Earlier pieces of the same learning curve.</p>
          </div>

          <div className="create-archive-list">
            {archive.map(project => (
              <ArchiveProject
                key={project.id}
                project={project}
                isOpen={openProject === project.id}
                onToggle={() => toggleProject(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="create-closing section-pad" aria-label="Current chapter">
        <div className="create-closing-inner">
          <span className="create-eyebrow">CURRENT CHAPTER</span>
          <p>Still learning.<br />Still building.<br />Still becoming.</p>
          <a href="/" className="create-closing-link">RETURN TO HOME <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
