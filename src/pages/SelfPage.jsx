import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import { projectsData } from '../data/projectsData';
import '../styles/self-page.css';

export default function SelfPage() {
  useScrollReveal([]);
  useMagnetic([]);
  useEffect(() => { document.title = 'Self — Shahriar Khan'; window.scrollTo(0, 0); }, []);

  const exploringAreas = [
    ['01','MIND',['Consciousness','Perception','Identity','Human behaviour']],
    ['02','IDEAS',['Philosophy','Existence','Reality','Time']],
    ['03','TECHNOLOGY',['Software','AI','Web','Digital systems']],
    ['04','CREATIVE',['Photography','Cinema','Music','Writing']]
  ];
  const outsidePursuits = [
    ['MUSIC','I listen to music frequently and return to songs because of the feelings they leave behind.'],
    ['PHOTOGRAPHY','I like capturing scenes, moments, light, atmosphere, and things that make me pause.'],
    ['CINEMA','I’m drawn to films that entertain me first and leave me thinking afterward.'],
    ['EXPLORATION','I can disappear into a completely new topic simply because something made me curious.']
  ];
  const academicHistory = [
    ['2024–Present','B.Sc. in Computer Science & Engineering','Southeast University, Dhaka','Ongoing'],
    ['2023','Diploma in Computer Engineering','Bangladesh Skill Development Institute, Chandpur','Completed'],
    ['2019','SSC','Matlabganj J.B. Pilot High School, Chandpur · Science','Completed']
  ];
  const capabilities = [
    ['01','HTML','Foundation','Semantic structure · accessible markup'],
    ['02','CSS','Foundation','Responsive layouts · visual systems · animation'],
    ['03','JavaScript','Learning','DOM · interaction · application logic'],
    ['04','React','Building','Components · reusable interfaces · state'],
    ['05','Python','Learning','Programming fundamentals · problem solving'],
    ['06','Django','Learning','Models · views · backend fundamentals'],
    ['07','Databases','Exploring','SQL · relational concepts · data modelling'],
    ['08','Git / GitHub','Working Knowledge','Version control · collaboration workflows']
  ];
  const selectedProjects = projectsData.map(proj => ({
    index: proj.index, title: proj.title, type: proj.selfType || proj.type, desc: proj.description,
    tech: proj.selfTech || proj.technologies.join(' · '), note: proj.selfNote, link: proj.selfLink
  }));

  return (
    <main className="self-page self-page-v2" id="mainContent">
      <section className="self-v2-section self-v2-hero" id="identity">
        <div className="self-v2-container">
          <div className="self-v2-hero-bar reveal"><span className="self-v2-eyebrow">01 / IDENTITY</span><span className="self-v2-rule" aria-hidden="true" /><span>THE PERSON BEHIND IT ALL</span></div>
          <div className="self-v2-hero-grid">
            <div className="self-v2-hero-copy reveal delay-1">
              <h1 className="self-v2-name">SHAHRIAR <em>KHAN.</em></h1>
              <div className="self-v2-role"><span>OBSERVER · DEVELOPER</span><span>·</span><span>CSE UNDERGRADUATE</span><span>·</span><span>DHAKA · BANGLADESH</span></div>
              <p className="self-v2-lead">I’m a Computer Science student with a curiosity that goes beyond technology — toward creativity, perception, and the many questions that make us look at life a little differently.</p>
              <p className="self-v2-lead-secondary">I learn by building, observing, and exploring — turning what I wonder about into things I can create, capture, and experience.</p>
              <div className="self-v2-actions"><Button href="#perspective" variant="glass" icon="↓">The way I see things</Button><Button href="#cv" variant="outline">Curriculum Vitae</Button></div>
            </div>
            <div className="self-v2-portrait reveal delay-2"><figure className="self-v2-portrait-frame"><img src="/images/portrait.jpg" alt="Shahriar Khan" /><figcaption className="self-v2-portrait-caption"><strong>SHAHRIAR KHAN</strong><span>OBSERVER · DEVELOPER</span></figcaption></figure></div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="perspective"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">02 / PERSPECTIVE</span><h2>The way I <em>see things.</em></h2></div><p className="self-v2-section-intro">A little more attention to the things most of us pass without noticing.</p></div><p className="self-v2-statement reveal">I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I like asking why something is the way it is, exploring different perspectives, and following questions even when they lead somewhere unexpected.</p></div></section>

      <section className="self-v2-section" id="exploring"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">03 / CURIOSITY</span><h2>Things I keep <em>exploring.</em></h2></div><p className="self-v2-section-intro">Some questions keep returning, even when I stop looking for them.</p></div><div className="self-v2-explore-grid reveal">{exploringAreas.map(([index,category,topics])=><article className="self-v2-explore-item" key={category}><span className="self-v2-index">{index}</span><h3>{category}</h3><ul className="self-v2-topics">{topics.map(topic=><li key={topic}>{topic}</li>)}</ul></article>)}</div></div></section>

      <section className="self-v2-section" id="outside"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">04 / LIFE</span><h2>Outside the <em>code.</em></h2></div><p className="self-v2-section-intro">The rhythms, mediums, and quiet pursuits that exist beyond the terminal.</p></div><div className="self-v2-life-grid reveal"><div className="self-v2-life-list">{outsidePursuits.map(([title,note])=><div className="self-v2-life-row" key={title}><h3>{title}</h3><p>{note}</p></div>)}</div><figure><div className="self-v2-life-image"><img src="/images/ontario-cover.jpg" alt="Atmospheric frame" loading="lazy" /></div><figcaption className="self-v2-image-caption">A FRAME I KEEP RETURNING TO</figcaption></figure></div></div></section>

      <section className="self-v2-section" id="notice"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">05 / OBSERVATION</span><h2>I notice <em>things.</em></h2></div><p className="self-v2-section-intro">A personal practice of presence through visual stillframes.</p></div><div className="self-v2-observe reveal"><div className="self-v2-observe-image"><img src="/images/portrait.jpg" alt="Shahriar Khan observing" loading="lazy" /></div><div className="self-v2-observe-copy"><p>Photography is one of the ways I slow down. A street, a face, a shadow, a quiet sky — sometimes something simply feels worth keeping.</p><p className="self-v2-small">The same instinct continues through <strong>Observe</strong> — a place for the frames and moments I choose to keep.</p><div className="self-v2-actions"><Button to="/observe" variant="outline" icon="→">EXPLORE OBSERVE</Button></div></div></div></div></section>

      <section className="self-v2-section" id="education"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">06 / FOUNDATION</span><h2>Where I learned to <em>build.</em></h2></div><p className="self-v2-section-intro">The academic path and formal foundations shaping my engineering perspective.</p></div><div className="self-v2-edu-list reveal">{academicHistory.map(([period,degree,institution,status])=><article className="self-v2-edu-row" key={period+degree}><span className="self-v2-period">{period}</span><div><h3>{degree}</h3><p>{institution}</p></div><span className="self-v2-status">{status}</span></article>)}</div></div></section>

      <section className="self-v2-section" id="skills"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">07 / TECHNICAL CRAFT</span><h2>What I’m learning to <em>build.</em></h2></div><p className="self-v2-section-intro">What I’m learning, building, and slowly getting better at.</p></div><div className="self-v2-skill-list reveal">{capabilities.map(([index,name,status,note])=><div className="self-v2-skill-row" key={name}><span className="self-v2-index">{index}</span><strong className="self-v2-skill-name">{name}</strong><span className="self-v2-skill-status">{status}</span><span className="self-v2-skill-note">{note}</span></div>)}</div></div></section>

      <section className="self-v2-section" id="projects"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">08 / SELECTED WORKS</span><h2>Things I’ve <em>made.</em></h2></div><p className="self-v2-section-intro">A concise selection of real software projects built from curiosity and academic initiative.</p></div><div className="self-v2-project-list reveal">{selectedProjects.map(proj=><article className="self-v2-project-row" key={proj.title}><span className="self-v2-index">{proj.index}</span><div><h3>{proj.link?<Link to={proj.link}>{proj.title} →</Link>:proj.title}</h3><p className="self-v2-project-desc">{proj.desc}</p></div><div className="self-v2-project-meta"><span>{proj.type}</span><span className="self-v2-project-tech">{proj.tech}{proj.note?' · '+proj.note:''}</span></div></article>)}</div><div className="self-v2-actions reveal"><Button to="/create" variant="outline" icon="→">SEE ALL PROJECTS</Button></div></div></section>

      <section className="self-v2-section" id="direction"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">09 / DIRECTION</span><h2>Where I’m <em>heading.</em></h2></div><p className="self-v2-section-intro">Still becoming, one project and one question at a time.</p></div><div className="self-v2-direction reveal"><p className="self-v2-direction-statement">I’m still figuring out exactly where I want to take all of this. For now, I’m building a foundation in software, learning through real projects, and looking for opportunities that let me grow through people, problems, and experience.</p><div className="self-v2-direction-meta"><div className="self-v2-meta-row"><span>CURRENTLY LEARNING</span><strong>Web development · Software · Backend fundamentals</strong></div><div className="self-v2-meta-row"><span>BUILDING TOWARD</span><strong>Full-stack web development</strong></div><div className="self-v2-meta-row"><span>BASED IN</span><strong>Dhaka, Bangladesh</strong></div></div></div></div></section>

      <section className="self-v2-section" id="elsewhere"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">10 / ELSEWHERE</span><h2>Find me <em>online.</em></h2></div><p className="self-v2-section-intro">Places where I publish code, share frames, or keep an active presence.</p></div><div className="self-v2-footer-grid reveal"><nav className="self-v2-links" aria-label="Online profiles"><a className="self-v2-link" href="https://github.com/shahriarbappy60-ship-it" target="_blank" rel="noopener noreferrer"><span>GitHub</span><small>ACTIVE ↗</small></a><a className="self-v2-link" href="https://instagram.com/_shahriar.bappy_" target="_blank" rel="noopener noreferrer"><span>Instagram</span><small>ACTIVE ↗</small></a><span className="self-v2-link" aria-disabled="true"><span>Facebook</span><small>SOON</small></span><span className="self-v2-link" aria-disabled="true"><span>LinkedIn</span><small>SOON</small></span></nav><div className="self-v2-cv" id="cv"><span className="self-v2-eyebrow">CURRICULUM VITAE</span><h2>A concise <em>snapshot.</em></h2><p>A concise view of my academic background, technical skills, projects, and professional direction.</p><a href="/assets/Shahriar_Khan_CV.pdf" download="Shahriar_Khan_CV.pdf" className="btn btn-solid" aria-label="Download Shahriar Khan's Curriculum Vitae as PDF"><span>DOWNLOAD CV</span><span className="btn-icon" aria-hidden="true">↗</span></a></div></div></div></section>
    </main>
  );
}
