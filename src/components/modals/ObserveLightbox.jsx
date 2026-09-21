import React, { useState, useEffect, useRef } from 'react';
import ShareModal from './ShareModal';

export default function ObserveLightbox({
  photo,
  photos = [],
  currentIndex = -1,
  onClose,
  onPrev,
  onNext
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showExif, setShowExif] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const closeBtnRef = useRef(null);
  const lightboxRef = useRef(null);

  const activePhoto = (photos && photos.length > 0 && currentIndex >= 0 && currentIndex < photos.length)
    ? photos[currentIndex]
    : photo;

  const isOpen = Boolean(activePhoto);
  const currentPhoto = activePhoto;
  const hasMultiple = photos && photos.length > 1;

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

  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);

  const showToast = msg => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(''), 2400);
  };

  const handleShare = async e => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast('Link copied to clipboard');
    } catch {
      showToast('Link copied to clipboard');
    }
  };

  if (!isOpen || !currentPhoto) return null;

  const formattedCounter = hasMultiple && currentIndex >= 0
    ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`
    : '';

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
            type="button"
            className="observe-lightbox-btn"
            onClick={e => {
              e.stopPropagation();
              setIsShareOpen(true);
            }}
            aria-label="Share photocard"
            title="Share photocard"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

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

        {/* METADATA BAR / DOCKED FLOATING METADATA CARD */}
        <div className="observe-lightbox-info flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-0.5 min-w-0">
              <h2 id="observeLightboxTitle" className="font-sans text-base sm:text-lg font-medium text-white tracking-tight truncate m-0">
                {currentPhoto.title}
              </h2>
              <span id="observeLightboxCategory" className="font-sans text-xs text-zinc-400 tracking-wider uppercase">
                {(currentPhoto.category || 'STILLS').toUpperCase()}
              </span>
            </div>

            {formattedCounter && (
              <span className="lightbox-index-counter font-sans text-zinc-400 text-xs tracking-widest tabular-nums shrink-0">
                {formattedCounter}
              </span>
            )}
          </div>

          {currentPhoto.story && (
            <p className="lightbox-editorial-caption mt-1 text-xs sm:text-sm text-zinc-100 font-serif italic leading-relaxed tracking-wide opacity-95">
              “{currentPhoto.story}”
            </p>
          )}
        </div>

        {/* SHOT DETAILS & FIELD NOTE DRAWER */}
        {showExif && (
          <div className="observe-lightbox-exif-drawer">
            <div className="exif-grid">
              <div className="exif-cell">
                <span>CATEGORY</span>
                <strong>{(currentPhoto.category || 'SCENES').toUpperCase()}</strong>
              </div>

              <div className="exif-cell">
                <span>LOCATION</span>
                <strong>{(currentPhoto.location || 'DHAKA').toUpperCase()}</strong>
              </div>

              <div className="exif-cell">
                <span>YEAR</span>
                <strong>{currentPhoto.year || '2026'}</strong>
              </div>

              {currentPhoto.camera ? (
                <div className="exif-cell">
                  <span>CAMERA</span>
                  <strong>{currentPhoto.camera}</strong>
                </div>
              ) : (
                <div className="exif-cell">
                  <span>COLLECTION</span>
                  <strong>PERSONAL ARCHIVE</strong>
                </div>
              )}
            </div>

            {currentPhoto.story && (
              <div className="exif-story-block">
                <span>OBSERVATION NOTE</span>
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

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="lightbox-toast fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#121212]/95 text-zinc-100 border border-white/15 px-4 py-2 rounded-full text-xs font-mono shadow-2xl backdrop-blur-xl z-[10002] transition-all flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Rich Photocard Share Modal */}
      <ShareModal
        photo={currentPhoto}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
