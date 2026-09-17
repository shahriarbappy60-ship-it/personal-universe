import React from 'react';
import Button from '../common/Button';

export default function GetInTouchSection({ onOpenContact }) {
  return (
    <section className="section section-pad get-in-touch-section" id="get-in-touch">
      <div className="get-in-touch-container reveal">
        <div className="get-in-touch-eyebrow-wrap">
          <span className="eyebrow get-in-touch-eyebrow">GET IN TOUCH</span>
        </div>

        <div className="get-in-touch-heading-wrap">
          <h2 className="get-in-touch-title">
            You saw what I see.<br />
            <em>Tell me what you see.</em>
          </h2>
        </div>

        <div className="get-in-touch-middle">
          <span className="channel-label">EMAIL</span>
          <a
            href="mailto:khanshahriar102@gmail.com"
            className="channel-email-link"
            aria-label="Send email to khanshahriar102@gmail.com"
          >
            <span>khanshahriar102@gmail.com</span>
            <span className="channel-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="channel-meta">
            <span>DHAKA, BANGLADESH · GMT+6</span>
          </div>
        </div>

        <div className="get-in-touch-action">
          <Button
            variant="solid"
            className="get-in-touch-btn"
            onClick={onOpenContact}
          >
            START A CONVERSATION →
          </Button>
        </div>
      </div>
    </section>
  );
}
