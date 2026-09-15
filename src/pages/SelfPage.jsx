import React, { useEffect } from 'react';
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

  const skills = [
    { name: 'HTML & Semantic Architecture', status: 'Foundation', note: 'Accessible structure, DOM hierarchy, performance standards' },
    { name: 'CSS Architecture & Systems', status: 'Foundation', note: 'Bespoke design systems, responsive grid/flexbox, custom animations' },
    { name: 'JavaScript (ES6+)', status: 'Learning', note: 'Asynchronous state, event pipelines, modern UI logic' },
    { name: 'Python', status: 'Learning', note: 'Core programming, algorithmic thinking, scripting' },
    { name: 'Django & REST Framework', status: 'Building', note: 'Models, views, ORM query optimization, backend architecture' },
    { name: 'Databases & Relational Schema', status: 'Exploring', note: 'SQL modeling, relational tables, PostgreSQL integration' },
  ];

  const education = [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      institution: 'Southeast University, Dhaka',
      period: '2024 – Present',
      status: 'Ongoing',
      grade: null
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'Bangladesh Skill Development Institute, Chandpur',
      period: 'Graduated: 2023',
      status: 'Completed',
      grade: 'CGPA 3.51 / 4.00'
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Matlabganj J.B. Pilot High School, Chandpur',
      period: 'Graduated: 2019',
      status: 'Completed',
      grade: 'GPA 3.79 / 5.00 · Science'
    }
  ];

  return (
    <main className="self-page minimalist-dossier" id="mainContent">
      {/* IDENTITY HERO */}
      <section className="self-hero section-pad">
        <div className="self-container">
          <div className="self-hero-top reveal">
            <div className="self-kicker">
              <span className="eyebrow">04 / SELF</span>
              <span className="self-rule" aria-hidden="true" />
              <span>IDENTITY & CURRICULUM VITAE</span>
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
                <span>Observer / Developer</span>
                <span className="bullet-sep">·</span>
                <span>CSE Undergraduate @ Southeast University</span>
              </div>

              <p className="self-lead">
                I observe the world, build software from curiosity, and write about the questions that stay with me.
                Currently focused on modern web architectures, Python, Django, JavaScript, and thoughtful design systems.
              </p>

              <div className="self-hero-actions">
                <Button href="#skills" variant="solid" icon="↓">
                  Capabilities
                </Button>
                <Button to="/connect" variant="outline">
                  Get in touch
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
                  <small>OBSERVER / DEVELOPER</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITATIVE CAPABILITIES (CLEAN EDITORIAL TABLE — NO FAKE PERCENTAGES, NO CLUNKY GLASS) */}
      <section className="self-section-block section-pad" id="skills">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">TECHNICAL CRAFT</div>
              <h2>
                Qualitative <em>capabilities.</em>
              </h2>
            </div>
            <p className="section-intro">
              Engineering growth measured by depth of practice rather than arbitrary percentages.
            </p>
          </div>

          <div className="self-qualitative-table reveal">
            {skills.map((skill, idx) => (
              <div key={skill.name} className="self-qualitative-row">
                <div className="skill-col-main">
                  <span className="skill-col-index">0{idx + 1}</span>
                  <span className="skill-col-name">{skill.name}</span>
                </div>
                <div className="skill-col-status">
                  <span className={`self-skill-badge badge-${skill.status.toLowerCase()}`}>
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

      {/* ACADEMIC FOUNDATIONS */}
      <section className="self-section-block section-pad" id="education">
        <div className="self-container">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">ACADEMIC FOUNDATION</div>
              <h2>
                Formal <em>education.</em>
              </h2>
            </div>
          </div>

          <div className="minimal-edu-list reveal">
            {education.map((item, idx) => (
              <div key={idx} className="minimal-edu-row">
                <div className="edu-time-col">
                  <span className="edu-year">{item.period}</span>
                  <span className="edu-status-pill">{item.status}</span>
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

      {/* EDITORIAL CRAFT PHILOSOPHY (AUTHENTIC, RESTRAINED — NO CLUNKY BOXES) */}
      <section className="self-section-block section-pad" id="craft">
        <div className="self-container">
          <div className="self-narrative-panel reveal">
            <div className="eyebrow">PERSPECTIVE & SYSTEMS</div>
            <h2 className="self-narrative-title">
              Software as an editorial craft, built with<br />
              <em>restraint and curiosity.</em>
            </h2>
            <p className="self-narrative-copy">
              I approach engineering as an extension of perception. Clean DOM hierarchies, structured databases, and accessible interfaces are not just technical requirements — they are how software respects the human using it.
            </p>
            <div className="self-narrative-meta">
              <div className="narrative-meta-col">
                <span>VALUES</span>
                <strong>Clarity · Purpose · Craft</strong>
              </div>
              <div className="narrative-meta-col">
                <span>CURRENT STUDY</span>
                <strong>Full-Stack Architecture & Django REST</strong>
              </div>
              <div className="narrative-meta-col">
                <span>LOCATION</span>
                <strong>Dhaka, Bangladesh · GMT+6</strong>
              </div>
            </div>
            <div className="self-narrative-actions">
              <Button to="/create" variant="solid">
                View projects
              </Button>
              <Button to="/connect" variant="outline">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
