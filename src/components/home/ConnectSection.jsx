import React from 'react';
import Button from '../common/Button';

export default function ConnectSection() {
  return (
    <section className="section section-pad connect-section" id="connect">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">08 / CONNECT</div>
          <h2>
            Where connection<br />
            <em>begins.</em>
          </h2>
        </div>
        <p className="section-intro">
          Open for thoughtful dialogue, software engineering collaborations,
          university discourse, or simply a shared perspective.
        </p>
      </div>

      <div className="connect-editorial-grid reveal delay-1">
        <div className="connect-editorial-col">
          <span className="connect-channel-label">EMAIL</span>
          <a href="mailto:shahriarkhan.cse@gmail.com" className="connect-channel-val email-link">
            <span>shahriarkhan.cse@gmail.com</span>
            <span aria-hidden="true">↗</span>
          </a>
          <div className="connect-channel-meta">
            <span>DHAKA, BANGLADESH · GMT+6</span>
          </div>
        </div>

        <div className="connect-editorial-col">
          <span className="connect-channel-label">NETWORKS</span>
          <div className="connect-links-row">
            <a href="https://github.com/Shahriar-K" target="_blank" rel="noopener noreferrer" className="connect-link-pill">
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="connect-link-pill">
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="connect-channel-meta">
            <span>SYSTEM ARCHITECTURE &amp; FULL-STACK</span>
          </div>
        </div>

        <div className="connect-editorial-action">
          <Button to="/connect" variant="solid" className="connect-main-cta">
            Get in touch
          </Button>
        </div>
      </div>

      <div className="connect-editorial-meta reveal delay-2">
        <span>SHAHRIAR'S PERSONAL UNIVERSE</span>
        <span>OBSERVE · WONDER · CREATE · SELF · CONNECT</span>
      </div>
    </section>
  );
}