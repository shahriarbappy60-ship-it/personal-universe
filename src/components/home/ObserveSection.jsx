import React, { useState, useRef, useMemo } from 'react';
import { observePhotos } from '../../data/observeData';
import PhotoCard from '../common/PhotoCard';
import Button from '../common/Button';

export default function ObserveSection({ onSelectPhoto }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3;

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'stills', label: 'Stills' },
    { key: 'monochrome', label: 'Monochrome' },
    { key: 'architecture', label: 'Architecture' },
    { key: 'minimal', label: 'Minimal' }
  ];

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'all') return observePhotos;
    return observePhotos.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / pageSize));
  const safePageIndex = Math.min(Math.max(0, pageIndex), totalPages - 1);

  const handleFilterChange = key => {
    setActiveFilter(key);
    setPageIndex(0);
  };

  const handlePrev = () => {
    if (safePageIndex > 0) {
      setPageIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleNext = () => {
    if (safePageIndex < totalPages - 1) {
      setPageIndex(prev => Math.min(prev + 1, totalPages - 1));
    }
  };

  // Touch swipe handlers
  const handleTouchStart = e => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = e => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const displayedPhotos = filteredPhotos.slice(
    safePageIndex * pageSize,
    safePageIndex * pageSize + pageSize
  );

  return (
    <section className="section section-pad" id="observe">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">01 / OBSERVE</div>
          <h2>
            What I <em>see.</em>
          </h2>
        </div>
        <p className="section-intro">
          Places, light, architecture, silence and the small moments that become difficult to forget.
        </p>
      </div>

      <div className="observe-slider-wrapper reveal">
        {/* FILTERS & DYNAMIC SLIDER CONTROLS ROW */}
        <div className="observe-slider-header">
          <div className="filter-bar" style={{ margin: 0 }} aria-label="Photography preview filters">
            {filters.map(f => (
              <button
                key={f.key}
                className={`filter ${activeFilter === f.key ? 'active' : ''}`}
                type="button"
                data-filter={f.key}
                aria-pressed={activeFilter === f.key}
                onClick={() => handleFilterChange(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="observe-slider-controls">
            <span className="slider-counter">
              {safePageIndex + 1} / {totalPages}
            </span>

            {/* ONLY SHOW BACK BUTTON AFTER SLIDING FORWARD (safePageIndex > 0) */}
            {safePageIndex > 0 && (
              <button
                className="slider-arrow-btn"
                type="button"
                onClick={handlePrev}
                aria-label="Previous photographs"
              >
                ←
              </button>
            )}

            {/* ONLY SHOW NEXT BUTTON IF NOT ON LAST PAGE */}
            {safePageIndex < totalPages - 1 && (
              <button
                className="slider-arrow-btn"
                type="button"
                onClick={handleNext}
                aria-label="Next photographs"
              >
                →
              </button>
            )}
          </div>
        </div>

        {/* 3-CARD EDITORIAL GALLERY GRID (UNIFORM EXACT SAME SIZE) */}
        <div
          className="photo-editorial-grid observe-page-grid"
          key={`${activeFilter}-${safePageIndex}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayedPhotos.map((photo, localIndex) => {
            const globalIndex = safePageIndex * pageSize + localIndex;
            return (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={localIndex}
                className="observe-featured-uniform"
                onClick={() => onSelectPhoto(photo, globalIndex, filteredPhotos)}
              />
            );
          })}
        </div>
      </div>

      {/* UNIFIED ARCHIVE CTA */}
      <div
        className="section-archive-link reveal"
        style={{
          marginTop: '45px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button to="/observe" variant="glass">
          Explore the archive
        </Button>
      </div>
    </section>
  );
}
