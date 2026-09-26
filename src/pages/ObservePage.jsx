import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observePhotos, observeAlbums } from '../data/observeData';
import PhotoCard from '../components/common/PhotoCard';
import LightboxModal from '../components/modals/LightboxModal';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function ObservePage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState('grid'); // 'grid' | 'album' | 'stream'
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useScrollReveal([filter, search, activeView, selectedAlbumId]);
  useMagnetic([filter, search, activeView, selectedAlbumId]);

  useEffect(() => {
    document.title = "Observe — Shahriar's Visual Archive";
    window.scrollTo(0, 0);
  }, []);

  const normalize = val =>
    String(val || '')
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ');

  const filteredPhotos = useMemo(() => {
    return observePhotos.filter(photo => {
      const matchesCategory = filter === 'all' || photo.category === filter;
      if (!matchesCategory) return false;
      if (!search.trim()) return true;

      const searchable = [
        photo.title,
        photo.category,
        photo.location,
        photo.year,
        photo.story
      ].map(normalize).join(' ');

      return normalize(search).split(' ').filter(Boolean).every(w => searchable.includes(w));
    });
  }, [filter, search]);

  const categories = [
    { key: 'all', label: 'All', count: observePhotos.length },
    { key: 'scenes', label: 'Scenes', count: observePhotos.filter(p => p.category === 'scenes').length },
    { key: 'moments', label: 'Moments', count: observePhotos.filter(p => p.category === 'moments').length },
    { key: 'atmosphere', label: 'Atmosphere', count: observePhotos.filter(p => p.category === 'atmosphere').length }
  ];

  const filteredAlbums = useMemo(() => {
    return observeAlbums.filter(album => {
      const matchesCategory = filter === 'all' || album.category === filter;
      if (!matchesCategory) return false;
      if (!search.trim()) return true;

      const searchable = [
        album.title,
        album.subtitle,
        album.description,
        album.category
      ].map(normalize).join(' ');

      return normalize(search).split(' ').filter(Boolean).every(w => searchable.includes(w));
    });
  }, [filter, search]);

  const activeAlbum = useMemo(() => {
    if (!selectedAlbumId) return null;
    return observeAlbums.find(a => a.id === selectedAlbumId) || null;
  }, [selectedAlbumId]);

  const activeAlbumPhotos = useMemo(() => {
    if (!activeAlbum) return [];
    return observePhotos.filter(p => activeAlbum.photoIds.includes(p.id));
  }, [activeAlbum]);

  const currentPhotosList = activeView === 'album' && activeAlbum ? activeAlbumPhotos : filteredPhotos;

  const viewModes = {
    grid: {
      name: 'Grid',
      nextName: 'Album',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    },
    album: {
      name: 'Album',
      nextName: 'Stream',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="7" height="11" rx="1.5" />
          <rect x="14" y="3" width="7" height="6" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="17" width="7" height="4" rx="1.5" />
        </svg>
      )
    },
    stream: {
      name: 'Stream',
      nextName: 'Grid',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
        </svg>
      )
    }
  };

  const currentView = viewModes[activeView] || viewModes.grid;

  const handleCycleView = () => {
    setSelectedAlbumId(null);
    setActiveView(prev => {
      if (prev === 'grid') return 'album';
      if (prev === 'album') return 'stream';
      return 'grid';
    });
  };

  const openLightboxForPhoto = (photo, idx) => {
    const foundIndex = currentPhotosList.findIndex(p => p.id === photo.id);
    setLightboxIndex(foundIndex !== -1 ? foundIndex : idx);
  };

  const handlePrev = () => {
    setLightboxIndex(prev => (prev <= 0 ? currentPhotosList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex(prev => (prev >= currentPhotosList.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="observe-page" id="mainContent">
      {/* PHOTOGRAPHY-FIRST HERO */}
      <section className="observe-hero section-pad" id="observeHero">
        <div className="observe-shell">
          <div className="observe-hero-content">
            <div className="eyebrow reveal">01 / OBSERVE</div>
            <h1 className="reveal delay-1">
              The world, as I<br />
              <em>notice it.</em>
            </h1>
            <p className="observe-hero-copy reveal delay-2">
              Places, light, architecture, silence and passing moments —
              collected before they disappear into memory.
            </p>
            <div className="observe-hero-actions reveal delay-2">
              <Button href="#archive" variant="glass" icon="↓">
                EXPLORE
              </Button>
              <span className="observe-status">VISUAL ARCHIVE</span>
            </div>
          </div>

          <div className="observe-hero-meta">
            <span>23° 48′ N</span>
            <span>90° 24′ E</span>
            <span>DHAKA · BANGLADESH</span>
          </div>
        </div>
      </section>

      {/* EDITORIAL STATEMENT */}
      <section className="observe-intro section-pad">
        <div className="observe-intro-inner">
          <div className="observe-intro-content">
            <blockquote className="reveal">
              “Photography is not always about capturing something extraordinary.
              Sometimes it is simply about noticing what was already there.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* ARCHIVE EXPLORATION */}
      <section className="archive-section section-pad" id="archive">
        <div className="archive-container">
          <div className="archive-heading reveal">
            <div>
              <div className="eyebrow">THE VISUAL ARCHIVE</div>
              <h2>
                Ways of <em>seeing.</em>
              </h2>
            </div>
            <div className="archive-heading-meta">
              <span>CURATED FRAGMENTS</span>
              <strong id="totalCountDisplay">
                {String(filteredPhotos.length).padStart(2, '0')}
              </strong>
            </div>
          </div>

          {/* ARCHIVE TOOLBAR: FILTERS (LEFT) · GROUPED CONTROLS (RIGHT: VIEW SWITCHER + SEARCH GAP-3) */}
          <div className="archive-toolbar reveal flex justify-between items-center mt-6">
            <div className="filter-categories" id="filterCategories">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  className={`filter-btn ${filter === cat.key ? 'active' : ''}`}
                  type="button"
                  onClick={() => setFilter(cat.key)}
                >
                  <span>{cat.label.toUpperCase()}</span>
                  <small>({cat.count})</small>
                </button>
              ))}
            </div>

            <div className="archive-controls-right flex items-center gap-3">
              <div className="observe-view-switch-single">
                <button
                  type="button"
                  className={`observe-dynamic-view-btn mode-${activeView} font-sans text-xs tracking-wider uppercase font-medium text-zinc-300`}
                  onClick={handleCycleView}
                  aria-label={`Layout view: VIEW ${currentView.name.toUpperCase()}. Click to switch to VIEW ${currentView.nextName.toUpperCase()}`}
                  title={`Click to switch to VIEW ${currentView.nextName.toUpperCase()}`}
                >
                  <span className="view-btn-icon-box">
                    {currentView.icon}
                  </span>
                  <span className="view-btn-label">
                    <strong className="view-btn-current font-sans text-xs tracking-wider uppercase font-medium text-zinc-300">VIEW {currentView.name.toUpperCase()}</strong>
                  </span>
                  <span className="view-btn-cycle-hint" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="cycle-indicator-icon">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="archive-tools">
                <label className="archive-search">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M16 16L21 21" />
                  </svg>
                  <input
                    type="search"
                    className="font-sans text-sm font-normal text-zinc-200 placeholder:text-zinc-500"
                    placeholder="Search title, place..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* DYNAMIC PHOTO ARCHIVE GALLERY / ALBUMS */}
          {activeView === 'album' ? (
            !selectedAlbumId ? (
              /* ALBUMS COLLECTION GRID */
              <div className="observe-albums-grid reveal" id="albumsGrid">
                {filteredAlbums.map((album, idx) => {
                  const albumPhotos = observePhotos.filter(p => album.photoIds.includes(p.id));
                  return (
                    <article
                      key={album.id}
                      className="observe-album-card"
                      style={{ '--card-idx': idx }}
                      onClick={() => setSelectedAlbumId(album.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedAlbumId(album.id);
                        }
                      }}
                      tabIndex="0"
                      role="button"
                      aria-label={`Open album: ${album.title} (${albumPhotos.length} photographs)`}
                    >
                      <div className="album-card-stack">
                        <div className="album-stack-layer layer-back" aria-hidden="true" />
                        <div className="album-stack-layer layer-mid" aria-hidden="true" />
                        <div className="album-cover-frame">
                          <img src={album.cover} alt={album.title} loading="lazy" />
                          <div className="album-cover-overlay" />
                          <span className="album-count-badge">
                            {albumPhotos.length} Photos
                          </span>
                        </div>
                      </div>

                      <div className="album-card-info">
                        <div className="album-meta-row">
                          <span className="album-category-tag">{album.category.toUpperCase()}</span>
                          <span className="album-year">{album.year}</span>
                        </div>
                        <h3 className="album-title">{album.title}</h3>
                        <p className="album-subtitle">{album.subtitle}</p>
                        <div className="album-card-action">
                          <span>Open Collection</span>
                          <span className="album-arrow-icon" aria-hidden="true">→</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* OPENED ALBUM DETAIL VIEW */
              <div className="observe-album-detail reveal" id="albumDetail">
                <div className="album-detail-header">
                  <button
                    type="button"
                    className="album-back-btn"
                    onClick={() => setSelectedAlbumId(null)}
                    aria-label="Back to all albums"
                  >
                    <span aria-hidden="true" className="btn-icon">←</span>
                    <span>Back to all albums</span>
                  </button>

                  <div className="album-detail-info">
                    <div className="album-detail-eyebrow">
                      ALBUM · {activeAlbum?.category.toUpperCase()} · {activeAlbum?.year}
                    </div>
                    <h3 className="album-detail-title">{activeAlbum?.title}</h3>
                    <p className="album-detail-description">{activeAlbum?.description}</p>
                    <span className="album-detail-count">
                      {activeAlbumPhotos.length} photographs in this collection
                    </span>
                  </div>
                </div>

                {/* Photos inside this album */}
                <div className="observe-gallery mode-grid" id="albumPhotoGrid">
                  {activeAlbumPhotos.map((photo, idx) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      index={idx}
                      onClick={() => openLightboxForPhoto(photo, idx)}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            /* REGULAR PHOTO ARCHIVE GALLERY (GRID OR STREAM) */
            <div className={`observe-gallery mode-${activeView}`} id="galleryGrid">
              {filteredPhotos.map((photo, idx) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={idx}
                  onClick={() => openLightboxForPhoto(photo, idx)}
                />
              ))}
            </div>
          )}

          {/* IMMERSIVE EDITORIAL CHAPTER TRANSITION */}
          <div className="observe-chapter-transition reveal">
            <span className="transition-eyebrow">01 / TRANSITION</span>
            <h2 className="transition-title">
              You observed the silent fragments.
            </h2>
            <p className="transition-subtitle">
              Now enter the realm of thought.
            </p>
            <div className="transition-actions">
              <Button
                to="/wonder"
                variant="glass"
              >
                READ WONDER
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LightboxModal
        photos={currentPhotosList}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </main>
  );
}
