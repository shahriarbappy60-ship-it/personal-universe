import React, { useEffect, useState } from 'react';
import { projectsData } from '../data/projectsData';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

function ProjectArchiveRow({ project, isExpanded, onToggle }) {
  const isExternal = project.link && project.link.startsWith('http');
  const isFeatured = project.id === 'project-01';

  return (
    <article 
      className={`project-archive-row ${isExpanded ? 'is-expanded' : ''} ${isFeatured ? 'is-featured' : ''}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={`project-archive-body-${project.id}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
    >
      <div className="archive-row-header">
        <div className="archive-row-main">
          {isFeatured && (\n          <div className="archive-feature-visual" aria-hidden="true">
            <div className="project-celestial-stage">
              <div className="celestial-corona-aura" />
              <div className="celestial-rings-layer celestial-rings-rear">
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
              <div className="celestial-body">
                <div className="celestial-atmosphere" />
                <div className="celestial-inner-core" />
                <div className="celestial-rim-light" />
              </div>
              <div className="celestial-rings-layer celestial-rings-front">
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
            <span className="archive-visual-label">EXPERIMENT / 001</span>
            <span className="archive-visual-caption">A LIVING DIGITAL UNIVERSE</span>
          </div>
          )}\n          <div className="archive-row-meta">
            <span>{project.index} / {isFeatured ? 'CURRENT BUILD' : project.status.toUpperCase()}</span>
          </div>
          
          <div className="archive-row-title-block">
            <h3 className="archive-row-title">
              {project.title}
            </h3>
            <span className="archive-row-type">{project.type}</span>
          </div>

          <p className="archive-row-desc">{project.description}</p>
        </div>

        <div className="archive-row-side">
          <div className="archive-side-rail">
            <div className="rail-item">
              <span className="rail-label">FOCUS</span>
              <span className="rail-value">{project.highlight || project.focus}</span>
            </div>
            <div className="rail-item">
              <span className="rail-label">STACK</span>
              <span className="rail-value">{project.technologies.join(' · ')}</span>
            </div>
            <div className="rail-item">
              <span className="rail-label">STATUS</span>
              <span className="rail-value">{project.status}</span>
            </div>
            <div className="rail-item">
              <span className="rail-label">YEAR</span>
              <span className="rail-value">{project.year}</span>
            </div>
          </div>
          
          <div className="archive-row-arrow-wrap">
            <span className="archive-row-arrow" aria-hidden="true">
              {isExpanded ? 'VIEW LESS ↑' : 'VIEW MORE ↗'}
            </span>
          </div>
        </div>
      </div>

      <div id={`project-archive-body-${project.id}`} className="archive-row-body" aria-hidden={!isExpanded}>
        <div className="archive-row-body-inner" style={{ minHeight: 0 }}>
          <div className="archive-row-divider" />
          
          <div className="archive-expanded-grid">
            <div className="expanded-main-col">
              <div className="expanded-block">
                <span className="expanded-eyebrow">ABOUT</span>
                <p>{project.overview || project.description}</p>
              </div>
              {project.buildNote && (
                <div className="expanded-block">
                  <span className="expanded-eyebrow">BUILD NOTE</span>
                  <p>{project.buildNote}</p>
                </div>
              )}
            </div>

            <div className="expanded-side-col">
              {project.role && (
                <div className="expanded-block">
                  <span className="expanded-eyebrow">MY ROLE</span>
                  <ul className="expanded-list">
                    {project.role.map(r => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              )}
              <div className="expanded-block">
                <span className="expanded-eyebrow">BUILT WITH</span>
                <ul className="expanded-list">
                  {project.technologies.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
          
          {project.link && (
             <div className="archive-row-actions">
               <a 
                 href={project.link} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="archive-visit-link"
                 onClick={e => e.stopPropagation()}
               >
                 VIEW SOURCE ↗
               </a>
             </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CreatePage() {
  useScrollReveal([]);
  useMagnetic([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    document.title = "Create — Shahriar's Personal Universe";
  }, []);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <main className="create-page" id="mainContent">
      {/* ═══════════════════════════════════════════════════
          SECTION 1: CREATE HERO (LOCKED DESIGN AREA)
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

      {/* ═══════════════════════════════════════════════════
          SECTION 2: SELECTED WORKS / EDITORIAL ARCHIVE
      ═══════════════════════════════════════════════════ */}
      <section className="section-pad" id="projects">
        <div className="wonder-shell">
          <div className="wonder-tier-header">
            <span className="wonder-tier-eyebrow reveal">SYSTEMS & EXPERIMENTS</span>
            <p className="wonder-tier-subtitle reveal">Selected works.</p>
          </div>

          <div className="create-vertical-archive mt-10 reveal">
            {projectsData.map(project => (
              <ProjectArchiveRow 
                key={project.id} 
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() => handleToggle(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: ENDING GATEWAY (TO IDENTITY)
      ═══════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ paddingBottom: '120px' }}>
        <div className="wonder-shell">
          <div className="wonder-gateway reveal">
            <span className="gateway-eyebrow">NEXT CHAPTER · 04 / IDENTITY</span>
            <h2 className="gateway-title">
              The observer behind<br />
              <em>the craft.</em>
            </h2>
            <p className="gateway-subtitle">
              Exploring identity, curriculum vitae, and the questions that shape each build.
            </p>
            <div className="gateway-actions">
              <Button to="/identity" variant="glass">
                VIEW IDENTITY
              </Button>
              <Button to="/contact" variant="outline">
                GET IN TOUCH
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
