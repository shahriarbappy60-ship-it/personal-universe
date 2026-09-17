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

  const academicHistory = [
    {
      period: '2024–Present',
      degree: 'B.Sc. in Computer Science & Engineering',
      institution: 'Southeast University, Dhaka',
      status: 'Ongoing'
    },
    {
      period: '2023',
      degree: 'Diploma in Computer Engineering',
      institution: 'Bangladesh Skill Development Institute, Chandpur',
      status: 'Completed'
    },
    {
      period: '2019',
      degree: 'SSC',
      institution: 'Matlabganj J.B. Pilot High School, Chandpur',
      discipline: 'Science',
      status: 'Completed'
    }
  ];

  const capabilities = [
    { index: '01', name: 'HTML', status: 'Foundation', note: 'Semantic structure · accessible markup' },
    { index: '02', name: 'CSS', status: 'Foundation', note: 'Responsive layouts · visual systems · animation' },
    { index: '03', name: 'JavaScript', status: 'Learning', note: 'DOM · interaction · application logic' },
    { index: '04', name: 'React', status: 'Building', note: 'Components · reusable interfaces · state' },
    { index: '05', name: 'Python', status: 'Learning', note: 'Programming fundamentals · problem solving' },
    { index: '06', name: 'Django', status: 'Learning', note: 'Models · views · backend fundamentals' },
    { index: '07', name: 'Databases', status: 'Exploring', note: 'SQL · relational concepts · data modelling' },
    { index: '08', name: 'Git / GitHub', status: 'Working Knowledge', note: 'Version control · collaboration workflows' }
  ];

  const selectedProjects = [
    {
      index: '01',
      title: 'Personal Universe',
      type: 'Digital Space · Ongoing',
      desc: 'A living digital space built around observation, thought, creativity, learning, and the evolving identity of its creator.',
      tech: 'React · JavaScript · CSS Architecture',
      note: 'Django backend planned',
      link: '/'
    },
    {
      index: '02',
      title: 'Student Assignment Portal',
      type: 'Academic Project',
      desc: 'A university-focused interface engineered for organizing course assignments, tracking deadlines, and structuring academic workflow.',
      tech: 'HTML · CSS · JavaScript',
      link: null
    },
    {
      index: '03',
      title: 'SEU Tech Event',
      type: 'Academic Project',
      desc: 'An interactive event portal and registration interface designed for a university engineering and technology symposium.',
      tech: 'HTML · CSS · JavaScript',
      link: null
    }
  ];

  return (
    <main className="self-page minimalist-dossier" id="mainContent">
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
                SHAHRIAR <em>KHAN.</em>
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
                <div className="self-portrait-image-inner">
                  <img
                    src="/images/portrait.jpg"
                    alt="Shahriar Khan"
                    loading="lazy"
                  />
                  <div className="portrait-ambient-glow" aria-hidden="true" />
                </div>
                <div className="self-portrait-overlay">
                  <span className="self-portrait-overlay-name">SHAHRIAR KHAN</span>
                  <small className="self-portrait-overlay-role">OBSERVER · DEVELOPER</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              Some questions keep returning, even when I stop looking for them.
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

            <div className="self-outside-visual-wrap">
              <div className="outside-visual-frame">
                <img
                  src="/images/ontario-cover.jpg"
                  alt="Atmospheric reflection"
                  loading="lazy"
                />
                <div className="outside-visual-caption">
                  <span className="visual-caption-tag">A FRAME I KEEP RETURNING TO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                alt="Quiet horizon contemplation"
                loading="lazy"
              />
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
                  <span className={`edu-status-pill ${item.status === 'Ongoing' ? 'status-ongoing' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <div className="edu-detail-col">
                  <h3 className="edu-degree-title">{item.degree}</h3>
                  <div className="edu-school-line">
                    <span className="edu-school-name">{item.institution}</span>
                    {item.discipline && (
                      <span className="edu-discipline-tag">· {item.discipline}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              What I’m learning, building, and slowly getting better at.
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
            {selectedProjects.map(proj => (
              <div key={proj.title} className="self-project-editorial-row">
                <div className="self-project-left">
                  <span className="self-project-index">{proj.index}</span>
                  <div>
                    <h3 className="self-project-title">
                      {proj.link ? (
                        <Link to={proj.link}>{proj.title} →</Link>
                      ) : (
                        <span>{proj.title}</span>
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
                    <span className="self-project-type-pill">{proj.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="self-projects-cta reveal">
            <Button to="/create" variant="outline" icon="→">
              SEE ALL PROJECTS
            </Button>
          </div>
        </div>
      </section>

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
                <span>CURRENTLY LEARNING</span>
                <strong>Web development · Software · Backend fundamentals</strong>
              </div>
              <div className="narrative-meta-col">
                <span>BUILDING TOWARD</span>
                <strong>Full-stack web development</strong>
              </div>
              <div className="narrative-meta-col">
                <span>BASED IN</span>
                <strong>Dhaka, Bangladesh</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="self-section-block section-pad self-elsewhere-block" id="elsewhere">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">ELSEWHERE</div>
              <h2>
                Find me <em>online.</em>
              </h2>
            </div>
            <p className="section-intro">
              Places where I publish code, share frames, or keep an active presence.
            </p>
          </div>

          <div className="self-elsewhere-list reveal">
            <a
              href="https://github.com/shahriarbappy60-ship-it"
              target="_blank"
              rel="noopener noreferrer"
              className="elsewhere-link"
              aria-label="Shahriar on GitHub"
            >
              <span className="elsewhere-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </span>
              <span className="elsewhere-name">GitHub</span>
              <span className="elsewhere-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              href="https://instagram.com/_shahriar.bappy_"
              target="_blank"
              rel="noopener noreferrer"
              className="elsewhere-link"
              aria-label="Shahriar on Instagram"
            >
              <span className="elsewhere-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <span className="elsewhere-name">Instagram</span>
              <span className="elsewhere-arrow" aria-hidden="true">↗</span>
            </a>

            <div
              className="elsewhere-link elsewhere-pending"
              aria-disabled="true"
              title="Profile link to be configured"
            >
              <span className="elsewhere-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </span>
              <span className="elsewhere-name">Facebook</span>
              <span className="elsewhere-status">SOON</span>
            </div>

            <div
              className="elsewhere-link elsewhere-pending"
              aria-disabled="true"
              title="Profile link to be configured"
            >
              <span className="elsewhere-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </span>
              <span className="elsewhere-name">LinkedIn</span>
              <span className="elsewhere-status">SOON</span>
            </div>
          </div>
        </div>
      </section>

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

