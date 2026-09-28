import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ShareModal from './ShareModal';

export default function LightboxModal({
  photo,
  photos = [],
  currentIndex = -1,
  onClose,
  onPrev,
  onNext
}) {
  const closeBtnRef = useRef(null);
  const touchStartX = useRef(0);
  const slideTimerRef = useRef(null);
  const [slide, setSlide] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [imageRatio, setImageRatio] = useState(4 / 3);

  const activePhoto = photos.length && currentIndex >= 0 && currentIndex < photos.length
    ? photos[currentIndex]
    : photo;
  const isOpen = Boolean(activePhoto);
  const hasMultiple = photos.length > 1;
  
  useEffect(() => {
    const fallback = activePhoto?.aspectRatio === 'portrait' ? 3 / 4 : activePhoto?.aspectRatio === 'square' ? 1 : 4 / 3;
    setImageRatio(fallback);
  }, [activePhoto?.id]);



  const counter = hasMultiple && currentIndex >= 0
    ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`
    : '';

  const finishSlide = direction => {
    if (direction === 'next') onNext?.();
    else onPrev?.();
    setSlide(null);
  };

  const triggerSlide = direction => {
    if (slide || !hasMultiple) return;

    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % photos.length
      : (currentIndex - 1 + photos.length) % photos.length;

    const incoming = photos[nextIndex];
    if (!incoming) return;

    clearTimeout(slideTimerRef.current);
    setSlide({ direction, photo: incoming });
    slideTimerRef.current = setTimeout(() => finishSlide(direction), 420);
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove('modal-open');
      setSlide(null);
      setIsShareOpen(false);
      return undefined;
    }

    document.body.classList.add('modal-open');
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 60);

    return () => {
      clearTimeout(focusTimer);
      clearTimeout(slideTimerRef.current);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

 }, [activePhoto?.id, currentIndex]);;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = event => {
      if (isShareOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft' && hasMultiple) {
        event.preventDefault();
        triggerSlide('prev');
      } else if (event.key === 'ArrowRight' && hasMultiple) {
        event.preventDefault();
        triggerSlide('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isShareOpen, hasMultiple, currentIndex, photos.length, onClose, onPrev, onNext, slide]);

  const handleTouchStart = event => {
    touchStartX.current = event.touches[0]?.clientX || 0;
  };

  const handleTouchEnd = event => {
    if (!touchStartX.current) return;
    const endX = event.changedTouches[0]?.clientX || touchStartX.current;
    const distance = touchStartX.current - endX;
    touchStartX.current = 0;

    if (Math.abs(distance) < 45 || !hasMultiple) return;
    triggerSlide(distance > 0 ? 'next' : 'prev');
  };

  if (!isOpen || !activePhoto || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div
        id="lightboxModal"
        className="modal-lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Photograph viewer"
        onClick={event => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="lightbox-top-bar" onClick={event => event.stopPropagation()}>
          <button
            type="button"
            className="lightbox-action-btn"
            aria-label="Share photograph"
            onClick={() => setIsShareOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5" fill="none" />
            </svg>
          </button>

          <button
            ref={closeBtnRef}
            type="button"
            className="lightbox-action-btn"
            aria-label="Close image viewer"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" fill="none" />
            </svg>
          </button>
        </div>

        <div
          className="lightbox-viewer"
          onClick={event => event.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`lightbox-image-stage ${slide ? `is-sliding slide-${slide.direction}` : ''}`} style={{ '--lightbox-ratio': imageRatio }}>
            <div className="lightbox-slide-track">
              <img
                className="lightbox-slide-image lightbox-slide-current"
                src={activePhoto.src}
                alt={activePhoto.title || activePhoto.alt || 'Photograph'}
                draggable="false"
                onLoad={event => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth && naturalHeight) {
                    const ratio = naturalWidth / naturalHeight;
                    setImageRatio(previous => Math.abs(previous - ratio) < 0.001 ? previous : ratio);
                  }
                }}
              />
              {slide && (
                <img
                  className="lightbox-slide-image lightbox-slide-incoming"
                  src={slide.photo.src}
                  alt={slide.photo.title || slide.photo.alt || 'Photograph'}
                  draggable="false"
                />
              )}
            </div>

            {hasMultiple && (
              <div className="lightbox-nav-layer" aria-label="Photograph navigation">
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-nav-prev"
                  aria-label="Previous photograph"
                  onClick={() => triggerSlide('prev')}
                  disabled={Boolean(slide)}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-nav-next"
                  aria-label="Next photograph"
                  onClick={() => triggerSlide('next')}
                  disabled={Boolean(slide)}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}


            {counter && (
              <div className="lightbox-slide-counter" aria-hidden="true">
                {counter}
              </div>
            )}
          </div>

          <div className="lightbox-metadata-tray">
            <div className="lightbox-metadata-top">
              <div className="lightbox-title-group">
                <h3 className="lightbox-title">{activePhoto.title}</h3>
                <span className="lightbox-category-tag">
                  {activePhoto.category || activePhoto.meta || 'STILLS'}
                </span>
              </div>
            </div>

            {activePhoto.story && (
              <p className="lightbox-editorial-caption">“{activePhoto.story}”</p>
            )}
          </div>
        </div>

      </div>

      <ShareModal
        photo={activePhoto}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </>,
    document.body
  );
}