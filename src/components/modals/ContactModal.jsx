import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';

export default function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    const subject = encodeURIComponent(`Inquiry from ${trimmedName}`);
    const bodyText = encodeURIComponent(`Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`);
    window.location.href = `mailto:shahriarkhan.cse@gmail.com?subject=${subject}&body=${bodyText}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal open"
      id="contactModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contactModalTitle"
    >
      <div className="modal-backdrop" onClick={onClose} />

      <div className="contact-modal" onClick={e => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          className="modal-close"
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-header">
          <span className="eyebrow">DIRECT CONTACT</span>
          <h2 id="contactModalTitle">
            Let’s <em>talk.</em>
          </h2>
          <p className="modal-subtitle">
            Send an email inquiry directly to <a href="mailto:shahriarkhan.cse@gmail.com">shahriarkhan.cse@gmail.com</a>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form-modal">
          <div className="form-group">
            <label htmlFor="modalName">NAME</label>
            <input
              type="text"
              id="modalName"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="modalEmail">EMAIL</label>
            <input
              type="email"
              id="modalEmail"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="modalMessage">MESSAGE</label>
            <textarea
              id="modalMessage"
              rows="4"
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Share your inquiry or project..."
            />
          </div>

          <Button type="submit" variant="solid">
            Get in touch
          </Button>
        </form>
      </div>
    </div>
  );
}
