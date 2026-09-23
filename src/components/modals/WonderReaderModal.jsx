import React, { useState, useEffect, useRef } from 'react';

export default function WonderReaderModal({ article, isOpen: isOpenProp, onClose }) {
  const [progress, setProgress] = useState(0);
  const readerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const isOpen = isOpenProp !== undefined ? (isOpenProp && Boolean(article)) : Boolean(article);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open', 'reader-open');
      setProgress(0);
      if (readerRef.current) readerRef.current.scrollTop = 0;
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('modal-open', 'reader-open');
    }
    return () => {
      document.body.classList.remove('modal-open', 'reader-open');
    };
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

  const handleScroll = () => {
    const el = readerRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }
    const currentProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    setProgress(currentProgress);
  };

  if (!isOpen || !article) return null;

  const imageCaptionTitle = article.imageCaption?.title || article.title;
  const imageCaptionMeta = article.imageCaption?.meta || `${article.category} · ${article.date || '2026'}`;

  return (
    <div
      className="reader open"
      id="reader"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-label={`Reading: ${article.title}`}
    >
      <div className="reader-backdrop" onClick={onClose} aria-hidden="true" />

      <div
        ref={readerRef}
        className="reader-panel"
        onScroll={handleScroll}
      >
        {/* Progress bar lives inside the panel so border-radius clips it cleanly */}
        <div className="reader-progress" aria-hidden="true">
          <span id="readerProgress" style={{ width: `${progress}%` }} />
        </div>

        <div className="reader-top">
          <div className="reader-meta">
            <span id="readerCategory">{article.category}</span>
            {article.time && <span id="readerTime">{article.time}</span>}
            {article.date && <span id="readerDate">{article.date}</span>}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="reader-close"
            id="readerClose"
            aria-label="Close reading view"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="reader-content">
          <div className="reader-heading">
            <span className="reader-number" id="readerNumber">
              {article.number}
            </span>
            <h2 id="readerTitle">{article.title}</h2>
            <p id="readerExcerpt">{article.excerpt}</p>
          </div>

          {article.image && (
            <div className="reader-photocard-wrap" id="readerImageWrap">
              <div className="reader-photocard-frame">
                <img id="readerImage" src={article.image} alt={article.title} loading="lazy" />
              </div>
              <div className="reader-photocard-caption">
                <span>{imageCaptionTitle}</span>
                <small>{imageCaptionMeta}</small>
              </div>
            </div>
          )}

          <article
            className="reader-body"
            id="readerBody"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          <div className="reader-end">
            <span>END OF ENTRY · {article.number}</span>
            <span>SHAHRIAR'S PERSONAL UNIVERSE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
