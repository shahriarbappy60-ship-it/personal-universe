import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    ['03','CREATIVE',['Photography','Cinema','Music','Writing']]
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
              <div className="self-v2-actions"><Button href="#perspective" variant="glass" icon="↓">The way I see things</Button><a className="self-v2-cv-download btn btn-outline" href="/assets/Shahriar_Khan_CV.pdf" download="Shahriar_Khan_CV.pdf" aria-label="Download Shahriar Khan's ATS-friendly Curriculum Vitae as PDF"><span>DOWNLOAD CV</span><span className="btn-icon" aria-hidden="true">↗</span></a></div>
            </div>
            <div className="self-v2-portrait reveal delay-2"><figure className="self-v2-portrait-frame self-v2-photo-card"><div className="self-v2-photo-media"><img src="/images/portrait.jpg" alt="Shahriar Khan" /></div><figcaption className="self-v2-portrait-caption"><strong>SHAHRIAR KHAN</strong><span>THE OBSERVER</span></figcaption></figure></div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="perspective"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">02 / PERSPECTIVE</span><h2>The way I <em>see things.</em></h2></div><p className="self-v2-section-intro">How I move through the world: with attention, curiosity, and a tendency to look twice.</p></div><p className="self-v2-statement reveal">I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I like asking why something is the way it is, exploring different perspectives, and following questions even when they lead somewhere unexpected.</p></div></section>

      <section className="self-v2-section" id="exploring"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">03 / CURIOSITY</span><h2>Things I keep <em>exploring.</em></h2></div><p className="self-v2-section-intro">Some questions keep returning, even when I stop looking for them.</p></div><div className="self-v2-explore-grid reveal">{exploringAreas.map(([index,category,topics])=><article className="self-v2-explore-item" key={category}><span className="self-v2-index">{index}</span><h3>{category}</h3><ul className="self-v2-topics">{topics.map(topic=><li key={topic}>{topic}</li>)}</ul></article>)}</div></div></section>

      <section className="self-v2-section" id="outside"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">04 / LIFE</span><h2>Outside the <em>code.</em></h2></div><p className="self-v2-section-intro">The things I return to when I’m away from a screen.</p></div><div className="self-v2-life-grid reveal"><div className="self-v2-life-list">{outsidePursuits.map(([title,note])=><div className="self-v2-life-row" key={title}><h3>{title}</h3><p>{note}</p></div>)}</div><figure><div className="self-v2-life-image"><img src="/images/ontario-cover.jpg" alt="Atmospheric frame" loading="lazy" /></div><figcaption className="self-v2-image-caption">A FRAME I KEEP RETURNING TO</figcaption></figure></div></div></section>






      <section className="self-v2-section" id="education">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div><span className="self-v2-eyebrow">05 / FOUNDATION</span><h2>Where I’ve <em>learned.</em></h2></div>
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
            <div><span className="self-v2-eyebrow">06 / PRACTICE</span><h2>What I’m <em>building with.</em></h2></div>
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

      <section className="self-v2-section" id="direction"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">07 / DIRECTION</span><h2>Where I’m <em>heading.</em></h2></div><p className="self-v2-section-intro">The direction is still taking shape.</p></div><div className="self-v2-direction reveal"><p className="self-v2-direction-statement">I’m still figuring out exactly where I want to take all of this. For now, I’m building a foundation in software, learning through real projects, and looking for opportunities that let me grow through people, problems, and experience.</p><div className="self-v2-direction-meta"><div className="self-v2-meta-row"><span>CURRENTLY LEARNING</span><strong>Web development · Software · Backend fundamentals</strong></div><div className="self-v2-meta-row"><span>BUILDING TOWARD</span><strong>Full-stack web development</strong></div><div className="self-v2-meta-row"><span>BASED IN</span><strong>Dhaka, Bangladesh</strong></div></div></div></div></section>

      <section className="self-v2-section" id="elsewhere"><div className="self-v2-container"><div className="self-v2-section-head reveal"><div><span className="self-v2-eyebrow">08 / ELSEWHERE</span><h2>Find me <em>online.</em></h2></div><p className="self-v2-section-intro">A few places beyond this universe.</p></div><div className="self-v2-footer-grid reveal"><nav className="self-v2-links" aria-label="Online profiles">
<a className="self-v2-link" href="https://github.com/shahriarbappy60-ship-it" target="_blank" rel="noopener noreferrer"><span className="self-v2-link-main"><svg viewBox="0 0 24 24" aria-hidden="true" ><path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.6-4.1-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.3.8 1 .8 2v2.9c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z"/></svg><span>GitHub</span></span><small>ACTIVE ↗</small></a>
<a className="self-v2-link" href="https://instagram.com/_shahriar.bappy_" target="_blank" rel="noopener noreferrer"><span className="self-v2-link-main"><svg viewBox="0 0 24 24" aria-hidden="true" ><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1"/></svg><span>Instagram</span></span><small>ACTIVE ↗</small></a>
<span className="self-v2-link is-disabled" aria-disabled="true"><span className="self-v2-link-main"><svg viewBox="0 0 24 24" aria-hidden="true" ><path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v5h3v-5h3l1-3h-4V9c0-.6.4-1 1-1Z"/></svg><span>Facebook</span></span><small>SOON</small></span>
<span className="self-v2-link is-disabled" aria-disabled="true"><span className="self-v2-link-main"><svg viewBox="0 0 24 24" aria-hidden="true" ><path d="M6.5 8.5A2 2 0 1 0 6.5 4a2 2 0 0 0 0 4.5ZM4.5 20h4V10h-4v10Zm6 0h4v-5.2c0-1.4.3-2.8 2-2.8s2 1.6 2 2.8V20h4v-5.8c0-3.1-.7-5.5-4.6-5.5-1.9 0-3.2 1-3.7 2h-.1v-1.7h-3.8V20Z"/></svg><span>LinkedIn</span></span><small>SOON</small></span>
</nav></div></div></section>
    </main>
  );
}
