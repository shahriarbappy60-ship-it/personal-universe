import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function SelfPage() {
  useScrollReveal([]);
  useMagnetic([]);

  useEffect(() => {
    document.title = "Self — Shahriar Khan";
    window.scrollTo(0, 0);
  }, []);

  // 03 / THINGS I KEEP EXPLORING
  const exploringAreas = [
    {
      category: 'MIND',
      topics: ['Consciousness', 'Perception', 'Identity', 'Human behaviour']
    },
    {
      category: 'IDEAS',
      topics: ['Philosophy', 'Existence', 'Reality', 'Time']
    },
    {
      category: 'TECHNOLOGY',
      topics: ['Software', 'AI', 'Web', 'Digital systems']
    },
    {
      category: 'CREATIVE',
      topics: ['Photography', 'Cinema', 'Music', 'Writing']
    }
  ];

  // 04 / OUTSIDE THE CODE
  const outsidePursuits = [
    {
      title: 'MUSIC',
      note: 'I listen to music frequently and return to songs because of the feelings they leave behind.'
    },
    {
      title: 'PHOTOGRAPHY',
      note: 'I like capturing scenes, moments, light, atmosphere, and things that make me pause.'
    },
    {
      title: 'CINEMA',
      note: 'I’m drawn to films that entertain me first and leave me thinking afterward.'
    },
    {
      title: 'EXPLORATION',
      note: 'I can disappear into a completely new topic simply because something made me curious.'
    }
  ];

  // 06 / WHERE I LEARNED TO BUILD
  const academicHistory = [
    {
      period: '2024 — PRESENT',
      degree: 'B.Sc. in Computer Science & Engineering',
      institution: 'Southeast University, Dhaka',
      status: 'ONGOING',
      grade: null
    },
    {
      period: '2023',
      degree: 'Diploma in Computer Engineering',
      institution: 'Bangladesh Skill Development Institute, Chandpur',
      status: 'COMPLETED',
      grade: 'CGPA 3.51 / 4.00'
    },
    {
      period: '2019',
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Matlabganj J.B. Pilot High School, Chandpur',
      status: 'COMPLETED',
      grade: 'GPA 3.79 / 5.00 · Science'
    }
  ];

  // 07 / WHAT I’M LEARNING TO BUILD
  const capabilities = [
    { index: '01', name: 'HTML', status: 'FOUNDATION', note: 'Semantic structure · accessible markup' },
    { index: '02', name: 'CSS', status: 'FOUNDATION', note: 'Responsive layouts · visual systems · animation' },
    { index: '03', name: 'JAVASCRIPT', status: 'LEARNING', note: 'DOM · interaction · application logic' },
    { index: '04', name: 'REACT', status: 'BUILDING', note: 'Components · reusable interfaces · state' },
    { index: '05', name: 'PYTHON', status: 'LEARNING', note: 'Programming fundamentals · problem solving' },
    { index: '06', name: 'DJANGO', status: 'BUILDING', note: 'Models · views · backend fundamentals' },
    { index: '07', name: 'DATABASES', status: 'EXPLORING', note: 'SQL · relational concepts · data modelling' },
    { index: '08', name: 'GIT / GITHUB', status: 'WORKING KNOWLEDGE', note: 'Version control · collaboration workflows' }
  ];

  // 08 / THINGS I’VE MADE
  const selectedProjects = [
    {
      index: '01',
      title: 'PERSONAL UNIVERSE',
      desc: 'A living digital space built around observation, thought, creativity, learning, and the evolving identity of its creator.',
      tech: 'React · JavaScript · CSS Architecture',
      note: 'Django backend planned',
      status: 'BUILDING',
      year: '2026',
      link: '/'
    },
    {
      index: '02',
      title: 'STUDENT ASSIGNMENT PORTAL',
      desc: 'A university-focused interface engineered for organizing course assignments, tracking deadlines, and structuring academic workflow.',
      tech: 'HTML · CSS · JavaScript',
      status: 'FOUNDATION',
      year: '2025',
      link: 'https://github.com/shahriarbappy60-ship-it'
    },
    {
      index: '03',
      title: 'SEU TECH EVENT',
      desc: 'An interactive event portal and registration interface designed for a university engineering and technology symposium.',
      tech: 'HTML · CSS · JavaScript',
      status: 'FOUNDATION',
      year: '2024',
      link: 'https://github.com/shahriarbappy60-ship-it'
    }
  ];

  return (
    <main className="self-page minimalist-dossier" id="mainContent">

      {/* ==================================================
          01 / IDENTITY
          ================================================== */}
      <section className="self-hero section-pad" id="identity">
        <div className="self-container">
          <div className="self-hero-top reveal">
            <div className="self-kicker">
              <span className="eyebrow">01 / IDENTITY</span>
              <span className="self-rule" aria-hidden="true" />
              <span>THE PERSON BEHIND IT ALL</span>
            </div>
            <div className="self-meta-badge">
              <span>DHAKA · BANGLADESH</span>
            </div>
          </div>

          <div className="self-hero-main">
            <div className="self-hero-copy reveal delay-1">
              <h1>
                SHAHRIAR<br />
                <em>KHAN.</em>
              </h1>

              <div className="self-title-sub">
                <span>OBSERVER · DEVELOPER</span>
                <span className="bullet-sep">·</span>
                <span>CSE UNDERGRADUATE</span>
              </div>

              <div className="self-lead-group">
                <p className="self-lead">
                  I’m a Computer Science student with a curiosity that goes beyond technology — toward creativity, perception, and the many questions that make us look at life a little differently.
                </p>
                <p className="self-lead-secondary">
                  I learn by building, observing, and exploring — turning what I wonder about into things I can create, capture, and experience.
                </p>
              </div>

              <div className="self-hero-actions">
                <Button href="#perspective" variant="solid" icon="↓">
                  The way I see things
                </Button>
                <Button href="#cv" variant="outline">
                  Curriculum Vitae
                </Button>
              </div>
            </div>

            <div className="self-hero-portrait-wrap reveal delay-2">
              <div className="self-portrait-frame">
                <img
                  src="/images/portrait.jpg"
                  alt="Shahriar Khan"
                  loading="lazy"
                />
                <div className="self-portrait-overlay">
                  <span>SHAHRIAR KHAN</span>
                  <small>OBSERVER · DEVELOPER · DHAKA</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          02 / THE WAY I SEE THINGS
          ================================================== */}
      <section className="self-section-block section-pad self-perspective-block" id="perspective">
        <div className="self-container">
          <div className="self-narrative-panel reveal">
            <div className="eyebrow">02 / PERSPECTIVE</div>
            <h2 className="self-narrative-title">
              The way I <em>see things.</em>
            </h2>
            <div className="self-perspective-text-wrap">
              <p className="self-perspective-statement">
                “I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I like asking why something is the way it is, exploring different perspectives, and following questions even when they lead somewhere unexpected.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          03 / THINGS I KEEP EXPLORING
          ================================================== */}
      <section className="self-section-block section-pad" id="exploring">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">03 / CURIOSITY</div>
              <h2>
                Things I keep <em>exploring.</em>
              </h2>
            </div>
            <p className="section-intro">
              Four recurring spheres of curiosity that continuously shape my thinking.
            </p>
          </div>

          <div className="self-exploring-grid reveal">
            {exploringAreas.map(area => (
              <div key={area.category} className="exploring-col">
                <h3 className="exploring-col-title">{area.category}</h3>
                <ul className="exploring-topics-list">
                  {area.topics.map(topic => (
                    <li key={topic} className="exploring-topic-item">
                      <span className="exploring-bullet" aria-hidden="true">—</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          04 / OUTSIDE THE CODE
          ================================================== */}
      <section className="self-section-block section-pad" id="outside">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">04 / LIFE</div>
              <h2>
                Outside the <em>code.</em>
              </h2>
            </div>
            <p className="section-intro">
              The rhythms, mediums, and quiet pursuits that exist beyond the terminal.
            </p>
          </div>

          <div className="self-outside-layout reveal">
            <div className="self-outside-text-grid">
              {outsidePursuits.map(item => (
                <div key={item.title} className="outside-card">
                  <span className="outside-label">{item.title}</span>
                  <p className="outside-note">{item.note}</p>
                </div>
              ))}
            </div>

            {/* ONE SUPPORTING VISUAL */}
            <div className="self-outside-visual-wrap">
              <div className="outside-visual-frame">
                <img
                  src="/images/ontario-cover.jpg"
                  alt="Atmospheric landscape visual reflection"
                  loading="lazy"
                />
                <div className="outside-visual-caption">
                  <span className="visual-caption-tag">ATMOSPHERE & SOUND</span>
                  <span className="visual-caption-note">Textures and feelings that anchor my thoughts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          05 / I NOTICE THINGS
          ================================================== */}
      <section className="self-section-block section-pad" id="notice">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">05 / OBSERVATION</div>
              <h2>
                I notice <em>things.</em>
              </h2>
            </div>
            <p className="section-intro">
              A personal practice of presence through visual stillframes.
            </p>
          </div>

          <div className="self-notice-feature reveal">
            <div className="self-notice-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85"
                alt="Quiet horizon study"
                loading="lazy"
              />
              <div className="self-notice-image-badge">
                <span>SCENES / THE QUIET HORIZON</span>
              </div>
            </div>

            <div className="self-notice-content">
              <p className="self-notice-statement">
                “Photography is one of the ways I slow down. A street, a face, a shadow, a quiet sky — sometimes something simply feels worth keeping.”
              </p>
              <div className="self-notice-actions">
                <Button to="/observe" variant="outline" icon="→">
                  EXPLORE OBSERVE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          06 / WHERE I LEARNED TO BUILD
          ================================================== */}
      <section className="self-section-block section-pad" id="education">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">06 / ACADEMIC FOUNDATION</div>
              <h2>
                Where I learned to <em>build.</em>
              </h2>
            </div>
            <p className="section-intro">
              The factual academic path and formal foundations shaping my engineering perspective.
            </p>
          </div>

          <div className="minimal-edu-list reveal">
            {academicHistory.map((item, idx) => (
              <div key={idx} className="minimal-edu-row">
                <div className="edu-time-col">
                  <span className="edu-year">{item.period}</span>
                  <span className={`edu-status-pill ${item.status === 'ONGOING' ? 'status-ongoing' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <div className="edu-detail-col">
                  <h3 className="edu-degree-title">{item.degree}</h3>
                  <div className="edu-school-line">
                    <span className="edu-school-name">{item.institution}</span>
                    {item.grade && (
                      <span className="edu-score-badge">{item.grade}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          07 / WHAT I’M LEARNING TO BUILD
          ================================================== */}
      <section className="self-section-block section-pad" id="skills">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">07 / TECHNICAL CRAFT</div>
              <h2>
                What I’m learning to <em>build.</em>
              </h2>
            </div>
            <p className="section-intro">
              Engineering growth measured by depth of practice rather than arbitrary percentages.
            </p>
          </div>

          <div className="self-qualitative-table reveal">
            {capabilities.map(skill => (
              <div key={skill.name} className="self-qualitative-row">
                <div className="skill-col-main">
                  <span className="skill-col-index">{skill.index}</span>
                  <span className="skill-col-name">{skill.name}</span>
                </div>
                <div className="skill-col-status">
                  <span className={`self-skill-badge badge-${skill.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {skill.status}
                  </span>
                </div>
                <div className="skill-col-note">
                  <span>{skill.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          08 / THINGS I’VE MADE
          ================================================== */}
      <section className="self-section-block section-pad" id="projects">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">08 / SELECTED WORKS</div>
              <h2>
                Things I’ve <em>made.</em>
              </h2>
            </div>
            <p className="section-intro">
              A concise selection of real software projects built from curiosity and academic initiative.
            </p>
          </div>

          <div className="self-selected-projects-list reveal">
            {selectedProjects.map(proj => {
              const isExternal = proj.link.startsWith('http');
              return (
                <div key={proj.title} className="self-project-editorial-row">
                  <div className="self-project-left">
                    <span className="self-project-index">{proj.index}</span>
                    <div>
                      <h3 className="self-project-title">
                        {isExternal ? (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer">
                            {proj.title} ↗
                          </a>
                        ) : (
                          <Link to={proj.link}>{proj.title} →</Link>
                        )}
                      </h3>
                      <p className="self-project-desc">{proj.desc}</p>
                    </div>
                  </div>

                  <div className="self-project-right">
                    <div className="self-project-tech-line">
                      <span>{proj.tech}</span>
                      {proj.note && (
                        <span className="self-project-backend-note">({proj.note})</span>
                      )}
                    </div>
                    <div className="self-project-meta-pills">
                      <span className="self-project-status-pill">{proj.status}</span>
                      <span className="self-project-year">{proj.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="self-projects-cta reveal">
            <Button to="/create" variant="outline" icon="→">
              SEE ALL PROJECTS
            </Button>
          </div>
        </div>
      </section>

      {/* ==================================================
          09 / WHERE I’M HEADING
          ================================================== */}
      <section className="self-section-block section-pad self-heading-block" id="direction">
        <div className="self-container">
          <div className="self-narrative-panel reveal">
            <div className="eyebrow">09 / DIRECTION</div>
            <h2 className="self-narrative-title">
              Where I’m <em>heading.</em>
            </h2>
            <div className="self-heading-text-wrap">
              <p className="self-heading-statement">
                “I’m still figuring out exactly where I want to take all of this. For now, I’m building a foundation in software, learning through real projects, and looking for opportunities that let me grow through people, problems, and experience.”
              </p>
            </div>
            <div className="self-narrative-meta">
              <div className="narrative-meta-col">
                <span>APPROACH</span>
                <strong>Foundations · Real Builds · Adaptability</strong>
              </div>
              <div className="narrative-meta-col">
                <span>FOCUS</span>
                <strong>Full-Stack Architecture & Modern Web Systems</strong>
              </div>
              <div className="narrative-meta-col">
                <span>LOCATION</span>
                <strong>Dhaka, Bangladesh · GMT+6</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          10 / CURRICULUM VITAE
          ================================================== */}
      <section className="self-section-block section-pad self-cv-section" id="cv">
        <div className="self-container">
          <div className="self-cv-box reveal">
            <div className="self-cv-content">
              <div className="eyebrow">10 / PROFESSIONAL SNAPSHOT</div>
              <h2 className="self-cv-title">
                Curriculum <em>Vitae.</em>
              </h2>
              <p className="self-cv-desc">
                A concise view of my academic background, technical skills, projects, and professional direction.
              </p>
            </div>

            <div className="self-cv-action">
              <a
                href="/assets/Shahriar_Khan_CV.pdf"
                download="Shahriar_Khan_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid self-cv-download-btn"
                aria-label="Download Shahriar Khan's Curriculum Vitae as PDF"
              >
                <span>DOWNLOAD CV</span>
                <span className="btn-icon" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

