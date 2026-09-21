import React, { useState, useEffect, useRef } from 'react';
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
  const touchEndX = useRef(0);
  const toastTimeoutRef = useRef(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  const activePhoto = (photos.length > 0 && currentIndex >= 0 && currentIndex < photos.length)
    ? photos[currentIndex]
    : photo;

  const isOpen = Boolean(activePhoto);
  const hasMultiple = photos.length > 1;

  const showToast = msg => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(''), 2400);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('modal-open');
      setIsShareOpen(false);
    }
    return () => {
      document.body.classList.remove('modal-open');
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [isOpen]);

  // Reset share modal on index change
  useEffect(() => {
    setIsShareOpen(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = e => {
      if (isShareOpen) return; // Share modal handles its own ESC
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
  }, [isOpen, onClose, onPrev, onNext, hasMultiple, isShareOpen]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = e => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = e => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance && hasMultiple && onNext) {
      onNext();
    } else if (distance < -minSwipeDistance && hasMultiple && onPrev) {
      onPrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!isOpen || !activePhoto) return null;

  const formattedCounter = hasMultiple && currentIndex >= 0
    ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`
    : '';

  return (
    <>
      <div
        className="modal-lightbox-overlay fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
        id="lightboxModal"
        role="dialog"
        aria-modal="true"
        aria-label="Photograph viewer"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Floating Controls Bar */}
        <div className="lightbox-top-bar fixed top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2.5 z-[10002]">
          {/* Share Button beside Close Button */}
          <button
            className="lightbox-action-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 hover:border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
            type="button"
            onClick={e => {
              e.stopPropagation();
              setIsShareOpen(true);
            }}
            aria-label="Share photocard"
            title="Share photocard"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            ref={closeBtnRef}
            className="lightbox-action-btn lightbox-close-pill w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 hover:border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
            type="button"
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close image viewer (ESC)"
            title="Close (ESC)"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Floating Desktop Navigation Arrow Pills */}
        {hasMultiple && onPrev && (
          <button
            className="lightbox-nav-pill lightbox-nav-prev fixed left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/[0.06] border border-white/10 rounded-full hidden md:flex items-center justify-center backdrop-blur-md text-white hover:bg-white/[0.14] hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer"
            type="button"
            onClick={e => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photograph"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {hasMultiple && onNext && (
          <button
            className="lightbox-nav-pill lightbox-nav-next fixed right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/[0.06] border border-white/10 rounded-full hidden md:flex items-center justify-center backdrop-blur-md text-white hover:bg-white/[0.14] hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer"
            type="button"
            onClick={e => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photograph"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Dynamic Fluid Content Column: Natural Aspect Image + Docked Metadata Tray */}
        <div
          className="lightbox-fluid-content flex flex-col items-center justify-center max-w-full max-h-full"
          onClick={e => e.stopPropagation()}
        >
          {/* Naturally scaling image without rigid box walls */}
          <div className="lightbox-image-stage flex items-center justify-center max-w-full">
            <img
              id="lightboxImage"
              src={activePhoto.src}
              alt={activePhoto.title || activePhoto.alt || 'Photograph'}
              className="lightbox-fluid-image max-h-[66vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300 select-none"
            />
          </div>

          {/* Floating frosted glass metadata tray docked directly beneath the image */}
          <div className="lightbox-metadata-tray w-full max-w-xl sm:max-w-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-4 sm:p-5 mt-3 sm:mt-4 shadow-xl">
            {/* Top Row: Title & Category on Left, Pure Tabular Counter on Right */}
            <div className="lightbox-metadata-top flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-0.5 min-w-0">
                <h3 className="lightbox-title font-sans text-base sm:text-lg font-medium text-white tracking-tight truncate m-0">
                  {activePhoto.title}
                </h3>
                <span className="lightbox-category-tag font-sans text-xs text-zinc-400 tracking-wider uppercase">
                  {activePhoto.category || activePhoto.meta}
                </span>
              </div>

              {formattedCounter && (
                <span className="lightbox-index-counter font-sans text-zinc-400 text-xs tracking-widest tabular-nums shrink-0">
                  {formattedCounter}
                </span>
              )}
            </div>

            {/* Editorial italic reflection caption in high-contrast crisp off-white */}
            {activePhoto.story && (
              <p className="lightbox-editorial-caption mt-2.5 text-xs sm:text-sm text-zinc-100 font-serif italic leading-relaxed tracking-wide opacity-95">
                “{activePhoto.story}”
              </p>
            )}
          </div>
        </div>

        {/* Subtle Toast Feedback */}
        {toastMessage && (
          <div className="lightbox-toast fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#121212]/95 text-zinc-100 border border-white/15 px-4 py-2 rounded-full text-xs font-mono shadow-2xl backdrop-blur-xl z-[10002] transition-all flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Rich Photocard Share Modal */}
      <ShareModal
        photo={activePhoto}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </>
  );
}
