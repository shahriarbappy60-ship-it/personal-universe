import React, { useEffect } from 'react';
import { projectsData } from '../data/projectsData';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import '../styles/self-page.css';

export default function SelfPage() {
  useScrollReveal([]);
  useMagnetic([]);
  useEffect(() => { document.title = 'Self — Shahriar Khan'; window.scrollTo(0, 0); }, []);

  const exploringAreas = [
    ['01','MIND',['Consciousness','Perception','Identity','Human behaviour']],
    ['02','IDEAS',['Philosophy','Existence','Reality','Time']],
    ['03','TECHNOLOGY',['Software','Interfaces','Systems','Experimentation']],
    ['04','CREATIVE',['Photography','Cinema','Music','Writing']]
  ];
  const outsidePursuits = [
    ['MUSIC','I listen to music frequently and return to songs because of the feelings they leave behind.'],
    ['PHOTOGRAPHY','I like capturing scenes, moments, light, atmosphere, and things that make me pause.'],
    ['CINEMA','I’m drawn to films that entertain me first and leave me thinking afterward.'],
    ['EXPLORATION','I can disappear into a completely new topic simply because something made me curious.']
  ];

  return (
    <main className="self-page self-page-v2" id="mainContent">
      <section className="self-v2-section self-v2-hero" id="identity">
        <div className="self-v2-container">
          <div className="self-v2-hero-bar reveal"><span className="self-v2-eyebrow">01 / IDENTITY</span><span className="self-v2-rule" aria-hidden="true" /><span>THE PERSON BEHIND IT ALL</span></div>
          <div className="self-v2-hero-grid">
            <div className="self-v2-hero-copy reveal delay-1">
              <h1 className="self-v2-name">SHAHRIAR <em>KHAN.</em></h1>
              <div className="self-v2-role"><span>THE OBSERVER</span><span>·</span><span>CSE UNDERGRADUATE</span><span>·</span><span>DHAKA · BANGLADESH</span></div>
              <p className="self-v2-lead">I’m a Computer Science student drawn to the space between technology, creativity, perception, and the questions that make us look at life differently.</p>
              <p className="self-v2-lead-secondary">I learn by building and exploring. Sometimes that becomes software. Sometimes a photograph. Sometimes, simply, another question.</p>
              <div className="self-v2-actions"><Button href="#perspective" variant="glass" icon="↓">The way I see things</Button><Button href="/assets/Shahriar_Khan_CV.pdf" variant="outline" icon="↗" ariaLabel="Download Shahriar Khan's Curriculum Vitae as PDF">DOWNLOAD CV</Button></div>
            </div>
            <div className="self-v2-portrait reveal delay-2"><figure className="self-v2-portrait-frame self-v2-photo-card"><div className="self-v2-photo-media"><img src="/images/portrait.jpg" alt="Shahriar Khan" /></div><figcaption className="self-v2-portrait-caption"><span className="self-v2-photo-index">01 / PORTRAIT</span><strong>SHAHRIAR KHAN</strong><span>THE OBSERVER</span></figcaption></figure></div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="perspective"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">02 / PERSPECTIVE</span><h2>The way I <em>see things.</em></h2></div><p className="self-v2-section-intro">How I move through the world: with attention, curiosity, and a tendency to look twice.</p></div><p className="self-v2-statement reveal">I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I like asking why something is the way it is, exploring different perspectives, and following questions even when they lead somewhere unexpected.</p></div></section>

      <section className="self-v2-section" id="exploring"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">03 / CURIOSITY</span><h2>Things I keep <em>exploring.</em></h2></div><p className="self-v2-section-intro">Some questions keep returning, even when I stop looking for them.</p></div><div className="self-v2-explore-grid reveal">{exploringAreas.map(([index,category,topics])=><article className="self-v2-explore-item" key={category}><span className="self-v2-index">{index}</span><h3>{category}</h3><ul className="self-v2-topics">{topics.map(topic=><li key={topic}>{topic}</li>)}</ul></article>)}</div></div></section>

      <section className="self-v2-section" id="outside"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">04 / LIFE</span><h2>Outside the <em>code.</em></h2></div><p className="self-v2-section-intro">The things I return to when I’m away from a screen.</p></div><div className="self-v2-life-grid reveal"><div className="self-v2-life-list">{outsidePursuits.map(([title,note])=><div className="self-v2-life-row" key={title}><h3>{title}</h3><p>{note}</p></div>)}</div><figure><div className="self-v2-life-image"><img src="/images/ontario-cover.jpg" alt="Atmospheric frame" loading="lazy" /></div><figcaption className="self-v2-image-caption">A FRAME I KEEP RETURNING TO</figcaption></figure></div></div></section>






      <section className="self-v2-section" id="observation">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">05 / OBSERVATION</span><h2>I notice <em>things.</em></h2></div>
            <p className="self-v2-section-intro">Photography gives me another way to slow down and pay attention.</p>
          </div>
          <div className="self-v2-observe reveal">
            <figure>
              <div className="self-v2-observe-image"><img src="/images/quiet-horizon.jpg" alt="The Quiet Horizon" loading="lazy" /></div>
              <figcaption className="self-v2-image-caption">THE QUIET HORIZON · OBSERVE</figcaption>
            </figure>
            <div className="self-v2-observe-copy">
              <p>I like photographs that leave enough room for the viewer to bring something of themselves into the frame.</p>
              <p className="self-v2-small">I’m interested in light, atmosphere, distance, geometry, and the small details that make an ordinary moment feel worth remembering.</p>
              <Button to="/observe" variant="glass" icon="↗" className="rounded-full">EXPLORE OBSERVE</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="education">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">06 / FOUNDATION</span><h2>Where I’ve <em>learned.</em></h2></div>
            <p className="self-v2-section-intro">The academic foundation behind the person and the work.</p>
          </div>
          <div className="self-v2-edu-list reveal">
            <div className="self-v2-edu-row"><span className="self-v2-period">2024 — PRESENT</span><div><h3>B.Sc. in Computer Science &amp; Engineering</h3><p>Southeast University · Dhaka, Bangladesh</p></div><span className="self-v2-status">ONGOING</span></div>
            <div className="self-v2-edu-row"><span className="self-v2-period">2023</span><div><h3>Diploma in Computer Engineering</h3><p>Bangladesh Skill Development Institute (BSDI), Chandpur · CGPA 3.51 / 4.00</p></div><span className="self-v2-status">COMPLETED</span></div>
            <div className="self-v2-edu-row"><span className="self-v2-period">2019</span><div><h3>Secondary School Certificate · Science</h3><p>Matlabganj J.B. Pilot High School · GPA 3.79 / 5.00</p></div><span className="self-v2-status">COMPLETED</span></div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="skills">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">07 / TECHNICAL CRAFT</span><h2>What I’m <em>building with.</em></h2></div>
            <p className="self-v2-section-intro">A concise view of the technologies I’m learning and using.</p>
          </div>
          <div className="self-v2-skill-list reveal">
            <div className="self-v2-skill-row"><span className="self-v2-index">01</span><span className="self-v2-skill-name">HTML · CSS</span><span className="self-v2-skill-status">FOUNDATION</span><span className="self-v2-skill-note">Semantic structure, responsive layout, visual systems.</span></div>
            <div className="self-v2-skill-row"><span className="self-v2-index">02</span><span className="self-v2-skill-name">JavaScript · React</span><span className="self-v2-skill-status">DEVELOPING</span><span className="self-v2-skill-note">Interactive interfaces, component architecture, modern frontend workflows.</span></div>
            <div className="self-v2-skill-row"><span className="self-v2-index">03</span><span className="self-v2-skill-name">Python · Django</span><span className="self-v2-skill-status">LEARNING</span><span className="self-v2-skill-note">Programming fundamentals and backend/web development foundations.</span></div>
            <div className="self-v2-skill-row"><span className="self-v2-index">04</span><span className="self-v2-skill-name">Git · GitHub</span><span className="self-v2-skill-status">WORKFLOW</span><span className="self-v2-skill-note">Version control and collaborative project workflow.</span></div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="works">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">08 / SELECTED WORKS</span><h2>Things I’ve <em>made.</em></h2></div>
            <p className="self-v2-section-intro">A few projects that mark where curiosity has become something tangible.</p>
          </div>
          <div className="self-v2-project-list reveal">
            {projectsData.map(project => (
              <article className="self-v2-project-row" key={project.id}>
                <span className="self-v2-index">{project.index}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p className="self-v2-project-desc">{project.description}</p>
                </div>
                <div className="self-v2-project-meta">
                  <span>{project.selfType}</span>
                  <span className="self-v2-project-tech">{project.selfTech}{project.selfNote ? ` · ${project.selfNote}` : ''}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="self-v2-inline-action reveal"><Button to="/create" variant="glass" icon="↗" className="rounded-full">SEE ALL PROJECTS</Button></div>
        </div>
      </section>

      <section className="self-v2-section" id="direction">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">09 / DIRECTION</span><h2>Where I’m <em>heading.</em></h2></div>
            <p className="self-v2-section-intro">The direction is still taking shape.</p>
          </div>
          <div className="self-v2-direction reveal">
            <p className="self-v2-direction-statement">I’m still figuring out exactly where I want to take all of this. For now, I’m building a foundation in software, learning through real projects, and looking for opportunities that let me grow through people, problems, and experience.</p>
            <div className="self-v2-direction-meta">
              <div className="self-v2-meta-row"><span>CURRENTLY LEARNING</span><strong>Web development · Software · Backend fundamentals</strong></div>
              <div className="self-v2-meta-row"><span>BUILDING TOWARD</span><strong>Full-stack web development</strong></div>
              <div className="self-v2-meta-row"><span>BASED IN</span><strong>Dhaka, Bangladesh</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="self-v2-section self-v2-cv-section" id="cv">
        <div className="self-v2-container">
          <div className="self-v2-cv reveal">
            <span className="self-v2-eyebrow">10 / PROFESSIONAL SNAPSHOT</span>
            <h2>Curriculum <em>Vitae.</em></h2>
            <p>A concise overview of my academic background, skills, and current direction.</p>
            <Button href="/assets/Shahriar_Khan_CV.pdf" variant="outline" icon="↗" ariaLabel="Download Shahriar Khan's Curriculum Vitae as PDF">DOWNLOAD CV</Button>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="elsewhere">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">11 / ELSEWHERE</span><h2>Find me <em>online.</em></h2></div>
            <p className="self-v2-section-intro">A few places beyond this universe.</p>
          </div>
          <div className="self-v2-footer-grid reveal">
            <nav className="self-v2-links" aria-label="Online profiles">
              <a className="self-v2-link" href="https://github.com/shahriarbappy60-ship-it" target="_blank" rel="noopener noreferrer"><span className="self-v2-link-main"><span>GitHub</span></span><small>ACTIVE ↗</small></a>
              <a className="self-v2-link" href="https://instagram.com/_shahriar.bappy_" target="_blank" rel="noopener noreferrer"><span className="self-v2-link-main"><span>Instagram</span></span><small>ACTIVE ↗</small></a>
              <span className="self-v2-link is-disabled" aria-disabled="true"><span className="self-v2-link-main"><span>Facebook</span></span><small>SOON</small></span>
              <span className="self-v2-link is-disabled" aria-disabled="true"><span className="self-v2-link-main"><span>LinkedIn</span></span><small>SOON</small></span>
            </nav>
          </div>
          <p className="self-v2-closing reveal">Still observing. Still becoming.</p>
        </div>
      </section>
    </main>
  );
}
