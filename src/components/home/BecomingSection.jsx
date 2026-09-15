import React from 'react';

const skills = [
  { index: '01', name: 'HTML & Semantic Web', status: 'Foundation', description: 'Clean document structure, accessible typography, SEO framing' },
  { index: '02', name: 'CSS Architecture', status: 'Foundation', description: 'Design systems, responsive flexbox/grid, bespoke animations' },
  { index: '03', name: 'JavaScript', status: 'Learning', description: 'DOM lifecycle, async operations, modern ES6+ paradigms' },
  { index: '04', name: 'Python', status: 'Learning', description: 'Core syntax, object-oriented logic, backend scripting' },
  { index: '05', name: 'Django', status: 'Building', description: 'Models, views, ORM queries, template rendering & REST APIs' },
  { index: '06', name: 'Databases & SQL', status: 'Exploring', description: 'Relational data modeling, schema design, PostgreSQL queries' }
];

export default function BecomingSection() {
  return (
    <section className="section section-pad skills-section" id="becoming">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">06 / BECOMING</div>
          <h2>
            What I'm <em>learning.</em>
          </h2>
        </div>
        <p className="section-intro">
          A living measure of technical capability. These are disciplines
          actively practiced, engineered into software, and deepened each day.
        </p>
      </div>

      <div className="skills-matrix reveal">
        {skills.map(skill => (
          <div key={skill.index} className="skill-qualitative-row">
            <span className="skill-row-idx">{skill.index}</span>
            <div className="skill-row-info">
              <strong>{skill.name}</strong>
              <p className="skill-row-desc">{skill.description}</p>
            </div>
            <span className={`skill-status-tag status-${skill.status.toLowerCase()}`}>
              {skill.status}
            </span>
          </div>
        ))}
      </div>

      <div className="becoming-editorial-footer reveal delay-1">
        <div className="becoming-quote">
          <span className="quote-mark">“</span>
          <p>
            The software craftsman does not claim mastery prematurely.
            Every script, schema, and layout is a quiet rehearsal of thought.
          </p>
        </div>
        <div className="becoming-trajectory-pill">
          <span>TRAJECTORY: DIPLOMA → B.SC. CSE → FULL-STACK WEB → BEYOND</span>
        </div>
      </div>
    </section>
  );
}
