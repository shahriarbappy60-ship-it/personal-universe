import React, { useState } from 'react';

export default function PhotoCard({
  photo,
  index,
  onClick,
  className = '',
  priority = false
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article
      className={`photo-card-item tilt-card ${className}`.trim()}
      style={{ '--card-idx': index }}
      data-aspect={photo.aspectRatio || 'portrait'}
      tabIndex="0"
      onClick={() => onClick && onClick(photo, index)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(photo, index);
        }
      }}
      aria-label={`View ${photo.title || 'photograph'}`}
    >
      <div className="photo-frame">
        {!loaded && <div className="photo-skeleton" aria-hidden="true" />}
        <img
          loading={priority ? 'eager' : 'lazy'}
          src={photo.src}
          alt={photo.alt || photo.title || 'Photograph'}
          className={loaded ? 'is-loaded' : 'is-loading'}
          onLoad={() => setLoaded(true)}
        />
        <div className="photo-frame-overlay" aria-hidden="true" />

        {/* Integrated Luminous Overlay Caption — No Disconnected Bottom Box */}
        <div className="photo-integrated-caption">
          <div className="photo-caption-main">
            <span className="photo-title">{photo.title}</span>
            <small className="photo-meta">
              {photo.meta || [photo.category, photo.location || photo.year].filter(Boolean).join(' · ')}
            </small>
          </div>
          <span className="photo-arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </article>
  );
}
