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
                I’m a Computer Science student, but I’ve never felt that technology is the whole story. I’m equally drawn to how people see, what we notice, what we overlook, and the questions that remain after the obvious answers are gone.
              </p>
              <p className="self-v2-lead-secondary">
                I build with code, photograph what catches my eye, think through ideas that stay with me, and keep learning by following my curiosity. Different forms, same instinct: to observe, understand, and create.
              </p>
            </div>

            <div className="self-v2-portrait reveal delay-2">
              <figure className="self-v2-portrait-frame">
                <div className="self-v2-photo-media">
                  <img src="/images/portrait.jpg" alt="Shahriar Khan — The Observer" />
                </div>
                <figcaption className="self-v2-portrait-caption">
                  <strong>THE OBSERVER</strong>
                  <span>SHAHRIAR KHAN</span>
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
            <p className="self-v2-section-intro">I’m interested in the space between what happens and how we experience it.</p>
          </div>
          <p className="self-v2-statement reveal">
            I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I question what feels obvious, try to see beyond a single perspective, and follow a thought even when it leads somewhere I did not expect. For me, observing is not standing outside life; it is a way of being present in it.
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
            <p className="self-v2-section-intro">Different subjects, one recurring impulse: understand what is beneath the surface.</p>
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
            I’m drawn to quiet moments, music, photography, cinema, unfamiliar places, and conversations that go somewhere deeper than small talk. These things shape how I notice, feel, question, and create. They are part of the same inner world that shows up in my work.
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
              I’m building a life around curiosity rather than a fixed definition of who I should become. Software gives me a way to build. Photography gives me a way to notice. Thought gives me a way to question. I’m still learning how these parts fit together — and I’m in no hurry to make them separate.
            </p>
            <div className="self-v2-direction-action">
              <div className="self-v2-socials" aria-label="Social profiles">
                <a href="https://github.com/shahriarbappy60-ship-it" target="_blank" rel="noopener noreferrer" className="self-v2-social-link">GITHUB <span>↗</span></a>
                <a href="https://instagram.com/_shahriar.bappy_" target="_blank" rel="noopener noreferrer" className="self-v2-social-link">INSTAGRAM <span>↗</span></a>
                <Button href="/assets/Shahriar_Khan_CV.pdf" variant="outline" icon="↗" ariaLabel="Download Shahriar Khan's Curriculum Vitae as PDF">DOWNLOAD CV</Button>
              </div>
            </div>
          </div>
          <p className="self-v2-closing reveal">Still observing. Still becoming.</p>
        </div>
      </section>
    </main>
  );
}
