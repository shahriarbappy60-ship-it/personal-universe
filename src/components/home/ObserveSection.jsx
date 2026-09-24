import React, { useState, useRef, useMemo, useEffect } from 'react';
import { observePhotos } from '../../data/observeData';
import PhotoCard from '../common/PhotoCard';
import Button from '../common/Button';

export default function ObserveSection({ onSelectPhoto }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageSize = isMobile ? 1 : 3;

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'scenes', label: 'Scenes' },
    { key: 'moments', label: 'Moments' },
    { key: 'atmosphere', label: 'Atmosphere' }
  ];

  const filteredPhotos = useMemo(() => {
    const featuredList = observePhotos.filter(p => p.featured === true);
    if (activeFilter === 'all') return featuredList;
    return featuredList.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / pageSize));
  const safePageIndex = Math.min(Math.max(0, pageIndex), totalPages - 1);

  const handleFilterChange = key => {
    setActiveFilter(key);
    setPageIndex(0);
  };

  const changePage = (newIndex) => {
    if (newIndex === safePageIndex || isFading) return;
    if (isMobile) {
      setIsFading(true);
      setTimeout(() => {
        setPageIndex(newIndex);
        setIsFading(false);
      }, 220);
    } else {
      setPageIndex(newIndex);
    }
  };

  const handlePrev = () => {
    if (safePageIndex > 0) {
      changePage(Math.max(safePageIndex - 1, 0));
    }
  };

  const handleNext = () => {
    if (safePageIndex < totalPages - 1) {
      changePage(Math.min(safePageIndex + 1, totalPages - 1));
    }
  };

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
    <section className="section section-pad pt-32 md:pt-36 scroll-mt-28" id="observe">
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
        <div className={`observe-slider-header ${isMobile ? 'mobile-centered' : ''}`}>
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

          {!isMobile && (
            <div className="observe-slider-controls">
              <span className="slider-counter">
                {safePageIndex + 1} / {totalPages}
              </span>
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
          )}
        </div>

        {/* GALLERY GRID */}
        <div
          className={`photo-editorial-grid observe-page-grid ${isFading ? 'fading' : ''} ${isMobile ? 'swipe-hint-nudge' : ''}`}
          key={`${activeFilter}-${isMobile ? 'mobile' : safePageIndex}`}
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

        {/* MOBILE DOT PAGINATION */}
        {isMobile && totalPages > 1 && (
          <nav className="wonder-thought-index mobile-observe-dots" aria-label="Photo pagination">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isActive = idx === safePageIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`wonder-index-item ${isActive ? 'is-active' : ''}`}
                  aria-selected={isActive}
                  onClick={() => changePage(idx)}
                >
                  <span className="wonder-index-title">Page {idx + 1}</span>
                </button>
              );
            })}
          </nav>
        )}
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
