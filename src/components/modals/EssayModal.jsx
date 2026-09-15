import React, { useEffect, useRef } from 'react';

export default function EssayModal({ isOpen, onClose }) {
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

  return (
    <div
      className={`modal ${isOpen ? 'open' : ''}`}
      id="essayModal"
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="essayModalTitle"
    >
      <div className="modal-backdrop" onClick={onClose} />

      <div className="content-modal">
        <button
          ref={closeBtnRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close field note"
        >
          ×
        </button>

        <div className="eyebrow">FIELD NOTE / 001</div>
        <h2 id="essayModalTitle">Notes from an unfinished mind.</h2>

        <div className="essay-body">
          <p>
            I don't think every question is asking to be solved. Some questions simply change the person who keeps carrying them.
          </p>
          <p>
            The more I observe myself, the more difficult it becomes to separate the observer from the thing being observed.
          </p>
          <p>
            Maybe understanding does not always arrive as an answer. Sometimes it arrives as a quieter way of looking.
          </p>
          <p>
            This archive is still unfinished. Perhaps that is the point.
          </p>
        </div>
      </div>
    </div>
  );
}
