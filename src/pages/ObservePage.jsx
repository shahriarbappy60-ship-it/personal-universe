import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observePhotos } from '../data/observeData';
import PhotoCard from '../components/common/PhotoCard';
import LightboxModal from '../components/modals/LightboxModal';
import Button from '../components/common/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function ObservePage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState('masonry'); // 'grid' | 'masonry' | 'stream'
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useScrollReveal([filter, search, activeView]);
  useMagnetic([filter, search, activeView]);

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
      let matchesCategory = filter === 'all';
      if (filter === 'stills') {
        matchesCategory = normalize(photo.category) === 'stills' || normalize(photo.category) === 'architecture';
      } else if (filter === 'nocturne') {
        matchesCategory = normalize(photo.category) === 'monochrome' || (photo.title && photo.title.toLowerCase().includes('night'));
      } else if (filter === 'fragments') {
        matchesCategory = normalize(photo.category) === 'minimal' || normalize(photo.category) === 'stills';
      }

      if (!matchesCategory) return false;
      if (!search.trim()) return true;

      const searchable = [
        photo.title,
        photo.category,
        photo.location,
        photo.year,
        photo.camera,
        photo.story
      ].map(normalize).join(' ');

      return normalize(search).split(' ').filter(Boolean).every(w => searchable.includes(w));
    });
  }, [filter, search]);

  const categories = [
    { key: 'all', label: 'All', count: observePhotos.length },
    { key: 'stills', label: 'Stills', count: observePhotos.filter(p => normalize(p.category) === 'stills' || normalize(p.category) === 'architecture').length },
    { key: 'nocturne', label: 'Nocturne', count: observePhotos.filter(p => normalize(p.category) === 'monochrome' || (p.title && p.title.toLowerCase().includes('night'))).length },
    { key: 'fragments', label: 'Fragments', count: observePhotos.filter(p => normalize(p.category) === 'minimal' || normalize(p.category) === 'stills').length }
  ];

  const openLightboxForPhoto = (photo, idx) => {
    const foundIndex = filteredPhotos.findIndex(p => p.id === photo.id);
    setLightboxIndex(foundIndex !== -1 ? foundIndex : idx);
  };

  const handlePrev = () => {
    setLightboxIndex(prev => (prev <= 0 ? filteredPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex(prev => (prev >= filteredPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="observe-page" id="mainContent">
      {/* PHOTOGRAPHY-FIRST HERO */}
      <section className="observe-hero section-pad" id="observeHero">
        <div className="observe-hero-photo-backdrop" aria-hidden="true">
          <img
            src="/images/photo-01.jpg"
            alt="Cinematic street atmosphere"
            className="observe-hero-image"
          />
          <div className="observe-hero-scrim" />
        </div>

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
            <Button href="#archive" variant="solid" icon="↓">
              Explore the archive
            </Button>
            <span className="observe-status">VISUAL ARCHIVE · DHAKA</span>
          </div>
        </div>

        <div className="observe-hero-meta">
          <span>23° 48′ N</span>
          <span>90° 24′ E</span>
          <span>DHAKA · BANGLADESH</span>
        </div>
      </section>

      {/* EDITORIAL STATEMENT */}
      <section className="observe-intro section-pad">
        <div className="observe-intro-inner">
          <div className="observe-intro-index reveal">STATEMENT / 001</div>
          <div className="observe-intro-content">
            <blockquote className="reveal delay-1">
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

          {/* TOOLBAR: CATEGORIES & SEARCH */}
          <div className="archive-toolbar reveal">
            <div className="filter-categories" id="filterCategories">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  className={`filter-btn ${filter === cat.key ? 'active' : ''}`}
                  type="button"
                  onClick={() => setFilter(cat.key)}
                >
                  <span>{cat.label}</span>
                  <small>({cat.count})</small>
                </button>
              ))}
            </div>

            <div className="archive-tools">
              <label className="archive-search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16L21 21" />
                </svg>
                <input
                  type="search"
                  placeholder="Search title, place, camera..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* ALBUM VIEW MODE SWITCHER (GRID / ALBUM MASONRY / STREAM) */}
          <div className="observe-toolbar-extras reveal">
            <div className="observe-view-switch" role="group" aria-label="Gallery view mode">
              <button
                type="button"
                className={`observe-view-btn ${activeView === 'grid' ? 'active' : ''}`}
                onClick={() => setActiveView('grid')}
                aria-label="Grid layout"
              >
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span>Grid</span>
              </button>

              <button
                type="button"
                className={`observe-view-btn ${activeView === 'masonry' ? 'active' : ''}`}
                onClick={() => setActiveView('masonry')}
                aria-label="Album masonry layout"
              >
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="11" rx="1" />
                  <rect x="14" y="3" width="7" height="6" rx="1" />
                  <rect x="14" y="12" width="7" height="9" rx="1" />
                  <rect x="3" y="17" width="7" height="4" rx="1" />
                </svg>
                <span>Album</span>
              </button>

              <button
                type="button"
                className={`observe-view-btn ${activeView === 'stream' ? 'active' : ''}`}
                onClick={() => setActiveView('stream')}
                aria-label="Stream layout"
              >
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="6" rx="1" />
                  <rect x="3" y="14" width="18" height="6" rx="1" />
                </svg>
                <span>Stream</span>
              </button>
            </div>

            <div className="archive-visible">
              <span>{filteredPhotos.length}</span> photographs displayed
            </div>
          </div>

          {/* DYNAMIC PHOTO ARCHIVE GALLERY */}
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

          {/* OPEN EDITORIAL CLOSING (COMPLETELY BOXLESS & RESTRAINED) */}
          <div className="observe-open-gateway reveal">
            <span className="gateway-eyebrow">NEXT CHAPTER · 02 / WONDER</span>
            <h2 className="gateway-title">
              There is always something<br />
              <em>else to notice.</em>
            </h2>
            <p className="gateway-subtitle">
              From visual perception and passing light into the questions that refuse to leave.
            </p>
            <div className="gateway-actions">
              <Button to="/wonder" variant="solid">
                Read the archive
              </Button>
              <Button to="/" variant="outline">
                Back home
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LightboxModal
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </main>
  );
}
