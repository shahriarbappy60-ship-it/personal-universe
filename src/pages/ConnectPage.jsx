import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { useDhakaClock } from '../hooks/useDhakaClock';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function ConnectPage() {
  const dhakaTime = useDhakaClock();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useScrollReveal([]);
  useMagnetic([]);

  useEffect(() => {
    document.title = "Connect — Shahriar Khan";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:shahriarkhan.cse@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="connect-page minimalist-contact" id="mainContent">
      <section className="section section-pad connect-single-stage">
        <div className="connect-container">
          {/* RESTRAINED EDITORIAL HEADER */}
          <div className="connect-editorial-header reveal">
            <div className="connect-header-top">
              <div className="eyebrow">05 / CONNECT</div>
              <div className="connect-clock-pill">
                <span className="clock-dot" />
                <span>{dhakaTime} · DHAKA</span>
              </div>
            </div>

            <h1 className="connect-editorial-title">
              Let’s <em>talk.</em>
            </h1>

            <p className="connect-editorial-lead">
              Open for thoughtful dialogue, software engineering collaborations,
              academic discourse, or simply a shared perspective.
            </p>
          </div>

          {/* BALANCED 2-COLUMN DOSSIER LAYOUT */}
          <div className="connect-editorial-grid reveal delay-1">
            {/* LEFT: DIRECT CHANNELS & PRESENCE */}
            <div className="connect-presence-col">
              <div className="presence-item">
                <span className="presence-label">DIRECT INQUIRY</span>
                <a href="mailto:shahriarkhan.cse@gmail.com" className="presence-email">
                  shahriarkhan.cse@gmail.com ↗
                </a>
                <p className="presence-note">
                  Primary channel for software collaborations, questions, and thoughtful discourse.
                </p>
              </div>

              <div className="presence-item">
                <span className="presence-label">PUBLIC CODE & NETWORKS</span>
                <div className="presence-pills">
                  <a
                    href="https://github.com/Shahriar-K"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="presence-link-pill"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="presence-link-pill"
                  >
                    LinkedIn ↗
                  </a>
                </div>
                <p className="presence-note">
                  Code repositories, curriculum vitae milestones, and professional network.
                </p>
              </div>

              <div className="presence-item">
                <span className="presence-label">LOCATION & CAMPUS</span>
                <strong className="presence-location">Dhaka, Bangladesh · GMT+6</strong>
                <p className="presence-note">
                  Department of Computer Science & Engineering · Southeast University
                </p>
              </div>
            </div>

            {/* RIGHT: MINIMAL DIRECT MESSAGE FORM */}
            <div className="connect-form-col">
              <form onSubmit={handleSubmit} className="connect-editorial-form">
                <div className="minimal-input-group">
                  <label htmlFor="name">YOUR NAME</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="minimal-input-group">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. elena@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="minimal-input-group">
                  <label htmlFor="message">YOUR MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    placeholder="Share your perspective or project inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-submit-row">
                  <Button type="submit" variant="solid">
                    Send message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
