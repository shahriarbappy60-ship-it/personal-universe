import React, { useEffect, useRef } from 'react';

export default function LightboxModal({
  photo,
  photos = [],
  currentIndex = -1,
  onClose,
  onPrev,
  onNext
}) {
  const closeBtnRef = useRef(null);
  const activePhoto = (photos.length > 0 && currentIndex >= 0 && currentIndex < photos.length)
    ? photos[currentIndex]
    : photo;

  const isOpen = Boolean(activePhoto);
  const hasMultiple = photos.length > 1;

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
    if (!isOpen) return;
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultiple && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasMultiple && onNext) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, hasMultiple]);

  if (!isOpen || !activePhoto) return null;

  return (
    <div
      className="modal open"
      id="lightboxModal"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
    >
      <div className="modal-backdrop" onClick={onClose} />

      <div className="lightbox-panel" onClick={e => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          ×
        </button>

        <div className="lightbox-image-wrap">
          {hasMultiple && onPrev && (
            <button
              className="lightbox-nav-btn prev"
              type="button"
              onClick={e => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous photograph"
            >
              ←
            </button>
          )}

          <img
            id="lightboxImage"
            src={activePhoto.src}
            alt={activePhoto.title || activePhoto.alt || 'Photograph'}
          />

          {hasMultiple && onNext && (
            <button
              className="lightbox-nav-btn next"
              type="button"
              onClick={e => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next photograph"
            >
              →
            </button>
          )}
        </div>

        <div className="lightbox-info">
          <div className="lightbox-info-header">
            <h3 id="lightboxTitle">{activePhoto.title}</h3>
            {hasMultiple && currentIndex >= 0 && (
              <span className="lightbox-counter">
                {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </span>
            )}
          </div>
          <p id="lightboxMeta">
            {activePhoto.meta || [activePhoto.camera, activePhoto.location, activePhoto.year].filter(Boolean).join(' · ')}
          </p>
          {activePhoto.story && <p className="lightbox-story">{activePhoto.story}</p>}
        </div>
      </div>
    </div>
  );
}
