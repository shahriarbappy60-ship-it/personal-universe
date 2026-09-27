import React, { useEffect } from 'react';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import '../styles/self-page.css';

export default function SelfPage() {
  useScrollReveal([]);
  useMagnetic([]);
  useEffect(() => {
    document.title = 'Self — Shahriar Khan';
    window.scrollTo(0, 0);
  }, []);

  const curiosity = [
    ['01', 'MIND', 'Consciousness · Perception · Identity'],
    ['02', 'IDEAS', 'Philosophy · Existence · Reality'],
    ['03', 'CREATIVE', 'Photography · Cinema · Music · Writing'],
    ['04', 'TECHNOLOGY', 'Software · Interfaces · Systems'],
  ];

  return (
    <main className="self-page self-page-v2" id="mainContent">
      <section className="self-v2-section self-v2-hero" id="identity">
        <div className="self-v2-container">
          <div className="self-v2-hero-bar reveal">
            <span className="self-v2-eyebrow">01 / IDENTITY</span>
            <span className="self-v2-rule" aria-hidden="true" />
            <span>THE PERSON BEHIND IT ALL</span>
          </div>

          <div className="self-v2-hero-grid">
            <div className="self-v2-hero-copy reveal delay-1">
              <h1 className="self-v2-name">SHAHRIAR <em>KHAN.</em></h1>
              <div className="self-v2-role">
                <span>THE OBSERVER</span><span>·</span><span>CSE UNDERGRADUATE</span><span>·</span><span>DHAKA · BANGLADESH</span>
              </div>
              <p className="self-v2-lead">
                I’m a Computer Science student drawn to the space between technology, creativity, perception, and the questions that make us look at life differently.
              </p>
              <p className="self-v2-lead-secondary">
                I learn by building and exploring. Sometimes that becomes software. Sometimes a photograph. Sometimes, simply, another question.
              </p>
              <div className="self-v2-actions">
                <Button href="#perspective" variant="glass" icon="↓">The way I see things</Button>
                <Button href="/assets/Shahriar_Khan_CV.pdf" variant="outline" icon="↗" ariaLabel="Download Shahriar Khan's Curriculum Vitae as PDF">DOWNLOAD CV</Button>
              </div>
            </div>

            <div className="self-v2-portrait reveal delay-2">
              <figure className="self-v2-portrait-frame">
                <div className="self-v2-photo-media">
                  <img src="/images/portrait.jpg" alt="Shahriar Khan" />
                </div>
                <figcaption className="self-v2-portrait-caption">
                  <strong>SHAHRIAR KHAN</strong>
                  <span>THE OBSERVER</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="perspective">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">02 / PERSPECTIVE</span>
              <h2>The way I <em>see things.</em></h2>
            </div>
            <p className="self-v2-section-intro">How I move through the world: with attention, curiosity, and a tendency to look twice.</p>
          </div>
          <p className="self-v2-statement reveal">
            I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I like asking why something is the way it is, exploring different perspectives, and following questions even when they lead somewhere unexpected.
          </p>
        </div>
      </section>

      <section className="self-v2-section" id="curiosity">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">03 / CURIOSITY</span>
              <h2>What keeps me <em>curious.</em></h2>
            </div>
            <p className="self-v2-section-intro">Not a list of interests. Just a few directions my attention naturally returns to.</p>
          </div>
          <div className="self-v2-curiosity-list reveal">
            {curiosity.map(([index, title, text]) => (
              <div className="self-v2-curiosity-row" key={title}>
                <span className="self-v2-index">{index}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="self-v2-section" id="life">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">04 / LIFE</span>
              <h2>Beyond the <em>screen.</em></h2>
            </div>
          </div>
          <p className="self-v2-life-statement reveal">
            Music, photography, cinema, and wandering through unfamiliar ideas all give me different ways to notice the world. They are not separate from how I build; they are part of how I look.
          </p>
        </div>
      </section>

      <section className="self-v2-section" id="foundation">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">05 / FOUNDATION</span>
              <h2>Where the <em>journey began.</em></h2>
            </div>
          </div>
          <div className="self-v2-foundation-list reveal">
            <div className="self-v2-foundation-row">
              <span className="self-v2-period">2024 — PRESENT</span>
              <div><h3>B.Sc. in Computer Science &amp; Engineering</h3><p>Southeast University · Dhaka, Bangladesh</p></div>
            </div>
            <div className="self-v2-foundation-row">
              <span className="self-v2-period">2023</span>
              <div><h3>Diploma in Computer Engineering</h3><p>Bangladesh Skill Development Institute (BSDI), Chandpur</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="self-v2-section self-v2-direction-section" id="direction">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">06 / DIRECTION</span>
              <h2>Still <em>becoming.</em></h2>
            </div>
          </div>
          <div className="self-v2-direction reveal">
            <p className="self-v2-direction-statement">
              I’m building a foundation in software, learning through real projects, and staying open to where curiosity leads next. I don’t have every answer yet. That is part of the point.
            </p>
            <div className="self-v2-direction-action">
              <Button href="/assets/Shahriar_Khan_CV.pdf" variant="outline" icon="↗" ariaLabel="Download Shahriar Khan's Curriculum Vitae as PDF">DOWNLOAD CV</Button>
            </div>
          </div>
          <p className="self-v2-closing reveal">Still observing. Still becoming.</p>
        </div>
      </section>
    </main>
  );
}
