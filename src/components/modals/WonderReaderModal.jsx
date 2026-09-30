import React, { useEffect, useRef } from 'react';

export default function WonderReaderModal({ article, isOpen, onClose }) {
  const readerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !article) return;
    requestAnimationFrame(() => {
      readerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [isOpen, article]);

  if (!isOpen || !article) return null;

  const imageCaptionTitle = article.imageCaption?.title || article.title;
  const imageCaptionMeta = article.imageCaption?.meta || `${article.tag || 'WRITING'} · ${article.date || '2026'}`;

  return (
    <div ref={readerRef} className="wonder-reader-drawer" role="region" aria-label={`Reading: ${article.title}`}>
      <div className="wonder-reader-drawer-bar">
        <div className="wonder-reader-drawer-meta">
          <span>{article.tag || 'WRITING'}</span>
          <span>{article.date || '2026'}</span>
          {article.time && <span>{article.time}</span>}
        </div>
        <div className="wonder-reader-drawer-actions">
          <button type="button" className="wonder-reader-share" onClick={async () => {
            const url = `${window.location.origin}/wonder#writing-${article.id}`;
            try {
              if (navigator.share) await navigator.share({ title: article.title, text: article.excerpt || '', url });
              else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
            } catch (error) {
              if (error?.name !== 'AbortError' && navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
            }
          }}>SHARE <span aria-hidden="true">↗</span></button>
          <button type="button" className="wonder-reader-close" onClick={onClose} aria-label="Close reading view">CLOSE <span aria-hidden="true">×</span></button>
        </div>
      </div>

      <div className="wonder-reader-drawer-content">
        <header className="wonder-reader-drawer-heading">
          <div className="wonder-reader-drawer-index">{article.number || '—'} / {article.tag || 'WRITING'}</div>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
        </header>

        {article.image && (
          <figure className="wonder-reader-drawer-image">
            <div className="wonder-reader-drawer-image-frame">
              <img src={article.image} alt={article.title} loading="lazy" />
            </div>
            <figcaption>
              <span>{imageCaptionTitle}</span>
              <small>{imageCaptionMeta}</small>
            </figcaption>
          </figure>
        )}

        <article className="wonder-reader-drawer-body" dangerouslySetInnerHTML={{ __html: article.body }} />

        <footer className="wonder-reader-drawer-end">
          <span>END OF ENTRY · {article.number || '—'}</span>
          <span>SHAHRIAR'S PERSONAL UNIVERSE</span>
        </footer>
      </div>
    </div>
  );
}
