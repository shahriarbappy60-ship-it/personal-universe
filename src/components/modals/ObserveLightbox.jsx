import React, { useState, useEffect, useRef } from 'react';

export default function ObserveLightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showExif, setShowExif] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const closeBtnRef = useRef(null);
  const lightboxRef = useRef(null);

  const isOpen = currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;
  const hasMultiple = photos.length > 1;

  // Reset zoom and info state when changing photo
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('modal-open');
      setIsZoomed(false);
      setShowExif(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setShowExif(prev => !prev);
      } else if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setIsZoomed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      ref={lightboxRef}
      className={`observe-lightbox open ${isFullscreen ? 'is-fullscreen' : ''}`}
      id="observeLightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      aria-hidden="false"
    >
      <div
        className="observe-lightbox-backdrop"
        id="observeLightboxBackdrop"
        onClick={onClose}
      />

      <div className="observe-lightbox-panel observe-lightbox-dialog">
        {/* TOP ACTIONS BAR */}
        <div className="observe-lightbox-actions-bar">
          <button
            className={`observe-lightbox-btn ${showExif ? 'active' : ''}`}
            type="button"
            title="Toggle Shot Info & EXIF (I)"
            aria-label="Toggle Shot Details"
            onClick={() => setShowExif(prev => !prev)}
          >
            ℹ
          </button>

          <button
            className={`observe-lightbox-btn ${isZoomed ? 'active' : ''}`}
            type="button"
            title="Toggle Zoom (Z)"
            aria-label="Toggle Zoom"
            onClick={() => setIsZoomed(prev => !prev)}
          >
            {isZoomed ? '⊖' : '⊕'}
          </button>

          <button
            className={`observe-lightbox-btn ${isFullscreen ? 'active' : ''}`}
            type="button"
            title="Toggle Fullscreen (F)"
            aria-label="Toggle Fullscreen"
            onClick={toggleFullscreen}
          >
            ⛶
          </button>

          <button
            ref={closeBtnRef}
            className="observe-lightbox-close"
            id="observeLightboxClose"
            type="button"
            aria-label="Close viewer (ESC)"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* IMAGE FRAME */}
        <div
          className={`observe-lightbox-image-wrap observe-lightbox-media ${isZoomed ? 'zoomed' : ''}`}
          onClick={() => setIsZoomed(prev => !prev)}
          title={isZoomed ? 'Click to zoom out' : 'Click to inspect details'}
        >
          <img
            id="observeLightboxImage"
            src={currentPhoto.src}
            alt={currentPhoto.alt || currentPhoto.title}
          />
        </div>

        {/* METADATA BAR */}
        <div className="observe-lightbox-info">
          <div>
            <span id="observeLightboxCategory">
              {(currentPhoto.category || 'STILLS').toUpperCase()}
            </span>
            <h2 id="observeLightboxTitle">{currentPhoto.title}</h2>
          </div>

          <div className="observe-lightbox-meta">
            <span id="observeLightboxLocation">
              {(currentPhoto.location || 'LOCATION').toUpperCase()}
            </span>
            <span id="observeLightboxYear">{currentPhoto.year}</span>
          </div>
        </div>

        {/* EXIF INSPECTOR DRAWER */}
        {showExif && (
          <div className="observe-lightbox-exif-drawer">
            <div className="exif-grid">
              <div className="exif-cell">
                <span>CAMERA</span>
                <strong>{currentPhoto.camera || 'Custom 35mm'}</strong>
              </div>

              <div className="exif-cell">
                <span>LENS</span>
                <strong>{currentPhoto.lens || 'Prime Lens'}</strong>
              </div>

              <div className="exif-cell">
                <span>EXPOSURE</span>
                <strong>
                  {currentPhoto.shutter} · {currentPhoto.aperture} · {currentPhoto.iso}
                </strong>
              </div>

              <div className="exif-cell">
                <span>FILM RECIPE</span>
                <strong>{currentPhoto.filmProfile || 'Natural Color'}</strong>
              </div>
            </div>

            {currentPhoto.story && (
              <div className="exif-story-block">
                <span>FIELD NOTE</span>
                <p>“{currentPhoto.story}”</p>
              </div>
            )}
          </div>
        )}

        {/* KEYBOARD SHORTCUTS HINTS */}
        <div className="observe-lightbox-hints">
          <span><kbd>←</kbd> <kbd>→</kbd> Navigate</span>
          <span><kbd>Z</kbd> Zoom</span>
          <span><kbd>I</kbd> Shot Details</span>
          <span><kbd>F</kbd> Fullscreen</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>

        {/* ARROWS */}
        <button
          className="observe-lightbox-nav observe-lightbox-prev"
          id="observeLightboxPrev"
          type="button"
          aria-label="Previous image"
          disabled={!hasMultiple}
          onClick={e => {
            e.stopPropagation();
            onPrev();
          }}
        >
          ←
        </button>
        <button
          className="observe-lightbox-nav observe-lightbox-next"
          id="observeLightboxNext"
          type="button"
          aria-label="Next image"
          disabled={!hasMultiple}
          onClick={e => {
            e.stopPropagation();
            onNext();
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
