import React, { useState, useRef, useEffect } from 'react';

export const resonanceData = [
  {
    id: "01",
    title: "Anchor",
    creator: "Novo Amor",
    type: "Music",
    cover: "/images/anchor-cover.jpg",
    link: "https://open.spotify.com/track/7qH9Z4dJEN0l9bidizW7fq",
    reflection: "The quiet weight of drifting, and the calm that follows."
  },
  {
    id: "02",
    title: "Dark",
    creator: "Baran bo Odar · Series",
    type: "Series",
    cover: "/images/dark-cover.jpg",
    link: "https://www.imdb.com/title/tt5753856/",
    reflection: "A loop of grief and origin. Does time trap us, or do we trap time?"
  },
  {
    id: "03",
    title: "Faasle",
    creator: "Kaavish · Music",
    type: "Music",
    cover: "/images/faasle-cover.jpg",
    link: "https://open.spotify.com/search/Faasle%20Kaavish",
    reflection: "The song I've returned to most over the past two years."
  },
  {
    id: "04",
    title: "Forever Young",
    creator: "Alphaville · Music",
    type: "Music",
    cover: "/images/foreveryoung-cover.jpg",
    link: "https://open.spotify.com/search/Forever%20Young%20Alphaville",
    reflection: "A fragile prayer against time, realizing everything slips away."
  },
  {
    id: "05",
    title: "High Hopes",
    creator: "Pink Floyd · Music",
    type: "Music",
    cover: "/images/high-hopes-cover.jpg",
    link: "https://open.spotify.com/search/High%20Hopes%20Pink%20Floyd",
    reflection: "The grass was greener, the light was brighter, the endless river forever."
  },
  {
    id: "06",
    title: "Holocene",
    creator: "Bon Iver · Music",
    type: "Music",
    cover: "/images/holocene-cover.jpg",
    link: "https://open.spotify.com/track/4MEBGW7kKbENSzjPTv7eBQ",
    reflection: "A reminder of how small we are, and how that can be a relief."
  },
  {
    id: "07",
    title: "Interstellar",
    creator: "Christopher Nolan · Film",
    type: "Film",
    cover: "/images/interstellar-cover.jpg",
    link: "https://www.imdb.com/title/tt0816692/",
    reflection: "Time as a physical dimension, and love as the only gravity that crosses it."
  },
  {
    id: "08",
    title: "Into the Wild",
    creator: "Sean Penn · Film",
    type: "Film",
    cover: "/images/into-the-wild-cover.jpg",
    link: "https://www.imdb.com/title/tt0758758/",
    reflection: "A quiet reflection on solitude, truth, and letting go."
  },
  {
    id: "09",
    title: "Ontario",
    creator: "Novo Amor & Ed Tullett · Music",
    type: "Music",
    cover: "/images/ontario-cover.jpg",
    link: "https://open.spotify.com/search/Ontario%20Novo%20Amor%20Ed%20Tullett",
    reflection: "A song I keep coming back to when everything feels quieter."
  },
  {
    id: "10",
    title: "Runaway",
    creator: "AURORA · Music",
    type: "Music",
    cover: "/images/runaway-cover.jpg",
    link: "https://open.spotify.com/track/0TCmhnbMpw5zwPsTvlXTJi",
    reflection: "An ache for home, even when you're not sure where home is."
  },
  {
    id: "11",
    title: "Shohorer Duita Gaan",
    creator: "Hatirpool Sessions · Music",
    type: "Music",
    cover: "/images/shohorer-duita-gaan-cover.jpg",
    link: "https://open.spotify.com/search/Shohorer%20Duita%20Gaan%20Hatirpool%20Sessions",
    reflection: "Late night Dhaka nostalgia, unhurried melodies, and familiar streets."
  },
  {
    id: "12",
    title: "The Truman Show",
    creator: "Peter Weir · Film",
    type: "Film",
    cover: "/images/the truman show cover.jpg",
    link: "https://www.imdb.com/title/tt0120382/",
    reflection: "What happens when you realize the world you live in was never built for you?"
  }
];

function SpotifyIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="resonance-brand-svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14.8c2.5-.9 5.5-.9 8 0" />
      <path d="M7 11.8c3.2-1.2 6.8-1.2 10 0" />
      <path d="M6.3 8.8c3.8-1.4 7.6-1.4 11.4 0" />
    </svg>
  );
}

function ImdbIcon({ size = 16 }) {
  return (
    <svg
      width={Math.round(size * 1.75)}
      height={size}
      viewBox="0 0 28 16"
      fill="none"
      stroke="currentColor"
      className="resonance-brand-svg"
      aria-hidden="true"
    >
      <rect x="0.75" y="0.75" width="26.5" height="14.5" rx="3" strokeWidth="1.4" />
      <text
        x="14"
        y="8.3"
        dominantBaseline="central"
        fill="currentColor"
        stroke="none"
        fontSize="9.4"
        fontWeight="800"
        fontFamily="var(--font-mono), monospace"
        textAnchor="middle"
        letterSpacing="0.4px"
      >
        IMDb
      </text>
    </svg>
  );
}

export default function ResonanceSection() {
  const initialItem = resonanceData.find(item => item.title === 'Holocene') || resonanceData[0];
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [previewItem, setPreviewItem] = useState(null);
  const [cardHeight, setCardHeight] = useState(null);
  const [itemHeight, setItemHeight] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const previewCardRef = useRef(null);
  const listRef = useRef(null);

  const displayItem = previewItem || selectedItem;

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth > 900 && previewCardRef.current) {
        const cHeight = previewCardRef.current.offsetHeight;
        // Exactly 5 items visible, perfectly locking right container height to left featured card
        const calculatedItemHeight = cHeight > 0 ? (cHeight / 5) : null;

        setCardHeight(cHeight);
        setItemHeight(calculatedItemHeight);
      } else {
        setCardHeight(null);
        setItemHeight(null);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (previewCardRef.current) {
      resizeObserver.observe(previewCardRef.current);
    }
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleScroll = (e) => {
    setIsScrolled(e.currentTarget.scrollTop > 8);
  };

  const badgeLabel = displayItem.type === 'Film' || displayItem.type === 'Series'
    ? 'IMDb ↗'
    : 'SPOTIFY ↗';

  const getSubLabel = (item) => {
    return item.creator.includes('·') ? item.creator : `${item.creator} · ${item.type}`;
  };

  return (
    <section className="section section-pad resonance-section pt-32 md:pt-36 scroll-mt-28" id="resonance">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">RESONANCE</div>
          <h2>
            What stays <em>with me.</em>
          </h2>
        </div>
        <p className="section-intro">
          The sounds, stories, and fragments I keep returning to.
        </p>
      </div>

      <div className="resonance-composition reveal delay-1">
        {/* LEFT: GLASSY PHOTOCARD WITH 1:1 COVER & TOP-RIGHT CORNER BADGE */}
        <div className="resonance-featured-card" ref={previewCardRef}>
          <div className="resonance-feature-frame">
            <img
              key={displayItem.cover}
              src={displayItem.cover}
              alt={`${displayItem.title} by ${displayItem.creator}`}
              className="resonance-fade-in"
              loading="lazy"
            />
            <div className="resonance-visual-scrim" aria-hidden="true" />
            <a
              href={displayItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resonance-link-chip absolute top-4 right-4 z-20 px-3.5 py-1.5"
              title={`Open ${displayItem.title} on ${displayItem.type === 'Film' || displayItem.type === 'Series' ? 'IMDb' : 'Spotify'} ↗`}
              aria-label={`Open ${displayItem.title} on ${displayItem.type === 'Film' || displayItem.type === 'Series' ? 'IMDb' : 'Spotify'}`}
            >
              <span>{badgeLabel}</span>
            </a>
          </div>

          <div className="resonance-feature-content" key={displayItem.id}>
            <h3 className="resonance-featured-title resonance-fade-in">
              {displayItem.title}
            </h3>
            <p className="resonance-featured-artist resonance-fade-in">
              {getSubLabel(displayItem)}
            </p>
            <p className="resonance-featured-note resonance-fade-in">
              {displayItem.reflection}
            </p>
          </div>
        </div>

        {/* RIGHT: SECONDARY LIST WITH CLICK-TO-LOCK & CLEAN METADATA */}
        <div
          className="resonance-returning"
          style={
            cardHeight
              ? {
                  height: `${cardHeight}px`,
                  '--item-h': itemHeight ? `${itemHeight}px` : undefined
                }
              : undefined
          }
        >
          <div
            ref={listRef}
            className={`resonance-returning-list resonance-scroll ${isScrolled ? 'is-scrolled' : ''}`}
            onScroll={handleScroll}
            onMouseLeave={() => setPreviewItem(null)}
          >
            {resonanceData.map(item => {
              const isSelected = selectedItem.id === item.id;
              const isPreviewed = displayItem.id === item.id;
              const isFilmOrSeries = item.type === 'Film' || item.type === 'Series';

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className={`resonance-item-row ${isSelected ? 'is-selected bg-black/[0.08] rounded-2xl border-l-2 border-l-neutral-900 border-t-0 border-r-0 border-b-0 backdrop-blur-md' : 'border-b border-black/[0.06]'} ${isPreviewed ? 'is-active' : ''}`}
                  onClick={() => {
                    setSelectedItem(item);
                    setPreviewItem(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedItem(item);
                      setPreviewItem(null);
                    }
                  }}
                  onMouseEnter={() => setPreviewItem(item)}
                  onFocus={() => setPreviewItem(item)}
                  aria-label={`Select ${item.title} (${item.type}) by ${item.creator}`}
                >
                  <span className="resonance-item-idx">{item.id}</span>

                  <div className="resonance-item-thumb">
                    <img src={item.cover} alt={item.title} loading="lazy" />
                  </div>

                  <div className="resonance-item-info">
                    <h4 className="resonance-item-title">{item.title}</h4>
                    <span className="resonance-item-creator">{getSubLabel(item)}</span>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resonance-row-brand-link"
                    title={`Open ${item.title} on ${isFilmOrSeries ? 'IMDb' : 'Spotify'} ↗`}
                    aria-label={`Open ${item.title} on ${isFilmOrSeries ? 'IMDb' : 'Spotify'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {isFilmOrSeries ? <ImdbIcon /> : <SpotifyIcon />}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EDITORIAL FOOTER QUOTE: BELOW THE GRID (CENTERED HORIZONTALLY) */}
      <div className="resonance-footer-quote reveal delay-2">
        <p className="resonance-closing-thought">
          “Some things become part of you without asking to.”
        </p>
      </div>
    </section>
  );
}
