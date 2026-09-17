import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setStatus('idle');
      setErrorMessage('');
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    const trimmedName = formData.name.trim();

    if (!trimmedEmail || !trimmedMessage) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      // Prepared for Django REST / API endpoint POST /api/messages/
      const response = await fetch('/api/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName || 'Anonymous',
          email: trimmedEmail,
          message: trimmedMessage
        })
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      // Graceful fallback to mailto: if API endpoint is not yet connected
      console.warn('API unavailable, activating mailto fallback:', err);
      const subject = encodeURIComponent(trimmedName ? `Message from ${trimmedName}` : 'Personal Universe Inquiry');
      const body = encodeURIComponent(
        `Name: ${trimmedName || 'Not specified'}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`
      );
      window.location.href = `mailto:khanshahriar102@gmail.com?subject=${subject}&body=${body}`;
      setStatus('sent');
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal open conversation-modal-wrapper"
      id="contactModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conversationModalTitle"
    >
      <div className="modal-backdrop" onClick={onClose} />

      <div className="conversation-modal-panel" onClick={e => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          className="modal-close conversation-close-btn"
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>

        <div className="conversation-modal-header">
          <h2 id="conversationModalTitle" className="conversation-modal-title">
            WRITE SOMETHING
          </h2>
        </div>

        {status === 'sent' ? (
          <div className="conversation-sent-state">
            <span className="sent-indicator" aria-hidden="true">✓</span>
            <p>Your message has been initiated. Thank you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="conversation-modal-form">
            <div className="conversation-field">
              <label htmlFor="modalName">
                YOUR NAME <span className="field-optional">Optional</span>
              </label>
              <input
                type="text"
                id="modalName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
                autoComplete="name"
              />
            </div>

            <div className="conversation-field">
              <label htmlFor="modalEmail">YOUR EMAIL</label>
              <input
                type="email"
                id="modalEmail"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                autoComplete="email"
              />
            </div>

            <div className="conversation-field">
              <label htmlFor="modalMessage">YOUR MESSAGE</label>
              <textarea
                id="modalMessage"
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder=""
              />
            </div>

            {status === 'error' && (
              <div className="conversation-error-state">
                {errorMessage || 'Unable to submit message. Please try again.'}
              </div>
            )}

            <div className="conversation-actions">
              <Button
                type="submit"
                variant="solid"
                className="conversation-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE →'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
