import React, { useState, useEffect, useRef } from 'react';

export default function WonderReaderModal({ article, isOpen: isOpenProp, onClose }) {
  const [progress, setProgress] = useState(0);
  const [displayArticle, setDisplayArticle] = useState(article || null);
  const [visible, setVisible] = useState(Boolean(isOpenProp !== undefined ? (isOpenProp && Boolean(article)) : Boolean(article)));
  const readerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const isOpen = isOpenProp !== undefined ? (isOpenProp && Boolean(article)) : Boolean(article);

  useEffect(() => {
    let closeTimer;

    if (isOpen && article) {
      setDisplayArticle(article);
      setVisible(true);
      document.body.classList.add('modal-open', 'reader-open');
      setProgress(0);

      requestAnimationFrame(() => {
        if (readerRef.current) readerRef.current.scrollTop = 0;
        closeBtnRef.current?.focus();
      });
    } else if (!isOpen) {
      document.body.classList.remove('modal-open', 'reader-open');
      setVisible(false);
      closeTimer = window.setTimeout(() => setDisplayArticle(null), 520);
    }

    return () => {
      if (closeTimer) window.clearTimeout(closeTimer);
      document.body.classList.remove('modal-open', 'reader-open');
    };
  }, [isOpen, article]);

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

  if (!visible || !displayArticle) return null;

  const activeArticle = displayArticle;
  const imageCaptionTitle = activeArticle.imageCaption?.title || activeArticle.title;
  const imageCaptionMeta = activeArticle.imageCaption?.meta || `${activeArticle.tag || activeArticle.category || 'WRITING'} · ${activeArticle.date || '2026'}`;

  const handleShare = async () => {
    const url = `${window.location.origin}/wonder#writing-${activeArticle.id}`;
    const shareData = { title: activeArticle.title, text: activeArticle.excerpt || '', url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      if (error?.name !== 'AbortError' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    }
  };

  return (
    <div
      className={`reader${visible ? ' open' : ''}`}
      id="reader"
      aria-hidden={!visible}
      role="dialog"
      aria-modal="true"
      aria-label={`Reading: ${activeArticle.title}`}
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
            <span id="readerCategory">{activeArticle.tag || activeArticle.category || 'WRITING'}</span>
            {activeArticle.time && <span id="readerTime">{activeArticle.time}</span>}
            {activeArticle.date && <span id="readerDate">{activeArticle.date}</span>}
          </div>

          <div className="reader-top-actions">
            <button type="button" className="reader-share" onClick={handleShare} aria-label={`Share: ${activeArticle.title}`}>
              SHARE <span aria-hidden="true">↗</span>
            </button>
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
        </div>

        <div className="reader-content">
          <div className="reader-heading">
            <span className="reader-number" id="readerNumber">
              {activeArticle.number}
            </span>
            <h2 id="readerTitle">{activeArticle.title}</h2>
            <p id="readerExcerpt">{activeArticle.excerpt}</p>
          </div>

          {activeArticle.image && (
            <div className="reader-photocard-wrap" id="readerImageWrap">
              <div className="reader-photocard-frame">
                <img id="readerImage" src={activeArticle.image} alt={activeArticle.title} loading="lazy" />
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
            dangerouslySetInnerHTML={{ __html: activeArticle.body }}
          />

          <div className="reader-end">
            <span>END OF ENTRY · {activeArticle.number}</span>
            <span>SHAHRIAR'S PERSONAL UNIVERSE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
