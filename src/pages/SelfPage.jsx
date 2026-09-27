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
            <span className="self-v2-eyebrow">IDENTITY</span>
            <span className="self-v2-rule" aria-hidden="true" />
            <span>A GLIMPSE BEHIND THE WORK</span>
          </div>

          <div className="self-v2-hero-grid">
            <div className="self-v2-hero-copy reveal delay-1">
              <div className="self-v2-identity-mark">
                <h1 className="self-v2-name">SHAHRIAR <em>KHAN.</em></h1>
                <div className="self-v2-role">
                  <span>CSE UNDERGRADUATE</span>
                </div>
              </div>
              <p className="self-v2-lead">
                I’m drawn to what lies beneath the obvious — perception, creativity, technology, and the questions behind experience.
              </p>
              <p className="self-v2-lead-secondary">
                I build, observe, and question — through code, photography, and thought.
              </p>
            </div>

            <div className="self-v2-portrait reveal delay-2">
              <figure className="self-v2-portrait-frame">
                <div className="self-v2-photo-media">
                  <img src="/images/portrait.jpg" alt="Shahriar Khan — The Observer" />
                </div>
                <figcaption className="self-v2-portrait-caption">
                  <strong>THE OBSERVER</strong>
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
              <span className="self-v2-eyebrow">PERSPECTIVE</span>
              <h2>The way I <em>see things.</em></h2>
            </div>
            <p className="self-v2-section-intro">I’m interested in the space between what happens and how we experience it.</p>
          </div>
          <p className="self-v2-statement reveal">
            I tend to look a little longer than necessary. At people, places, ideas, and the things most of us pass without noticing. I’m fascinated by the gap between reality and perception — by how the same world can become completely different depending on the mind experiencing it. I question what feels obvious, not because I need everything to have an answer, but because the question itself can change the way I see.
          </p>
        </div>
      </section>

      <section className="self-v2-section" id="curiosity">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">CURIOSITY</span>
              <h2>What keeps me <em>curious.</em></h2>
            </div>
            <p className="self-v2-section-intro">Different subjects, one recurring impulse: look beneath the surface.</p>
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
              <span className="self-v2-eyebrow">LIFE</span>
              <h2>Beyond the <em>screen.</em></h2>
            </div>
          </div>
          <p className="self-v2-life-statement reveal">
            I’m drawn to quiet moments, music, photography, cinema, unfamiliar places, and conversations that go somewhere deeper than small talk. I like things that leave something behind — a feeling, an image, a question, a new way of looking. These are not side interests to me; they are part of the inner world I bring into everything I make.
          </p>
        </div>
      </section>

      <section className="self-v2-section" id="foundation">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">FOUNDATION</span>
              <h2>A foundation, not a <em>definition.</em></h2>
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


      <section className="self-v2-section" id="practice">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">PRACTICE</span>
              <h2>Learning through <em>practice.</em></h2>
            </div>
            <p className="self-v2-section-intro">A quiet look at what I’m learning, building, and working toward.</p>
          </div>

          <div className="self-v2-practice reveal">
            <p className="self-v2-practice-statement">
              I’m a CSE undergraduate building my foundation in software and web development through coursework and personal projects.
            </p>

            <div className="self-v2-practice-list">
              <div className="self-v2-practice-row">
                <span>WEB DEVELOPMENT</span>
                <p>HTML · CSS · JavaScript · React</p>
              </div>
              <div className="self-v2-practice-row">
                <span>BACKEND</span>
                <p>Python · Django · Databases</p>
              </div>
              <div className="self-v2-practice-row">
                <span>TOOLS</span>
                <p>Git · GitHub · Figma · Canva</p>
              </div>
            </div>

            <div className="self-v2-practice-foot">
              <div>
                <span>CURRENT FOCUS</span>
                <p>Web development · React · Full-stack fundamentals</p>
              </div>
              <Button to="/create" variant="outline" icon="↗" ariaLabel="Explore Shahriar Khan's projects">EXPLORE MY WORK</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="self-v2-section self-v2-direction-section" id="direction">
        <div className="self-v2-container">
          <div className="self-v2-section-head reveal">
            <div>
              <span className="self-v2-eyebrow">DIRECTION</span>
              <h2>Still <em>becoming.</em></h2>
            </div>
          </div>

          <div className="self-v2-direction reveal">
            <div className="self-v2-direction-narrative">
              <p>I used to move through life without asking much of it. Then I started asking different questions — about who I am, why I’m here, and what it means to experience life from inside one particular mind.</p>
              <p>I’m still learning, building, and questioning. I don’t think I need to have it all figured out yet.</p>
              <p className="self-v2-direction-closing">For now, I’m okay with not knowing.</p>
            </div>
            <div className="self-v2-direction-action">
              <div className="self-v2-socials" aria-label="Social profiles and CV">
                <a href="https://github.com/shahriarbappy60-ship-it" target="_blank" rel="noopener noreferrer" className="self-v2-social-link">GITHUB <span>↗</span></a>
                <a href="https://instagram.com/_shahriar.bappy_" target="_blank" rel="noopener noreferrer" className="self-v2-social-link">INSTAGRAM <span>↗</span></a>
                <a href="https://www.facebook.com/shahriarbappy2016" target="_blank" rel="noopener noreferrer" className="self-v2-social-link">FACEBOOK <span>↗</span></a>
                <a href="https://www.linkedin.com/in/shahriar-khan-7985742a9/" target="_blank" rel="noopener noreferrer" className="self-v2-social-link">LINKEDIN <span>↗</span></a>
                <Button href="/assets/Shahriar_Khan_CV.pdf" variant="outline" icon="↗" ariaLabel="Download Shahriar Khan's Curriculum Vitae as PDF">DOWNLOAD CV</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
 </main>
  );
}
