import React, { useEffect, useRef } from 'react';

export default function BlackHoleVisual() {
  const containerRef = useRef(null);
  const diskFrontRef = useRef(null);
  const shadowRef = useRef(null);
  const lensedArcsRef = useRef(null);
  const photonRingRef = useRef(null);

  useEffect(() => {
    const hoverCapable = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hoverCapable || reducedMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let animationFrame = null;

    const handlePointerMove = event => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    function animateRelativity() {
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Differential spacetime lensing parallax
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${mouseX * 10}px, ${mouseY * 8}px, 0)`;
      }

      if (photonRingRef.current) {
        photonRingRef.current.style.transform = `translate3d(${mouseX * 11}px, ${mouseY * 9}px, 0)`;
      }

      if (lensedArcsRef.current) {
        lensedArcsRef.current.style.transform = `translate3d(${mouseX * 5}px, ${mouseY * 4}px, 0) scale(${1 + Math.abs(mouseX) * 0.015})`;
      }

      if (diskFrontRef.current) {
        diskFrontRef.current.style.transform = `translate3d(${mouseX * 18}px, ${mouseY * 14}px, 0) rotate(${mouseX * 2}deg)`;
      }

      animationFrame = requestAnimationFrame(animateRelativity);
    }

    animateRelativity();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="blackhole-stage" ref={containerRef} aria-label="Physics-accurate Gravitational Black Hole">
      {/* 1. Volumetric Relativistic Corona & Ambient Space-Time Warp */}
      <div className="blackhole-ambient-warp" aria-hidden="true" />
      <div className="blackhole-corona-aura" aria-hidden="true" />
      
      {/* Subtle Electric Violet-Blue Relativistic Synchrotron Aura */}
      <div className="blackhole-synchrotron-aura" aria-hidden="true" />

      {/* 2. Gravitationally Lensed Upper and Lower Arcs (Background Rays bent over & under) */}
      <div className="blackhole-lensing-arcs" ref={lensedArcsRef} aria-hidden="true">
        <svg
          className="blackhole-svg-arcs"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Doppler-boosted Molten Orange Gradient for Upper Lensed Arch */}
            <linearGradient id="upperArcGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#fff2d6" stopOpacity="0.95" />
              <stop offset="18%" stopColor="#ff7a00" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#ff5500" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#ea580c" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#9a3412" stopOpacity="0.4" />
            </linearGradient>

            {/* Inverted Lower Lensed Arch Gradient */}
            <linearGradient id="lowerArcGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.9" />
              <stop offset="22%" stopColor="#ff6b00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#c2410c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.3" />
            </linearGradient>

            {/* Relativistic Violet/Blue Photon Ring Core */}
            <linearGradient id="photonRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
            </linearGradient>

            {/* Glow and Blur Filters for authentic plasma radiance */}
            <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="hotPlasmaBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Upper Einstein Lensing Arc (Spacetime bending rear disk over horizon) */}
          <path
            className="arc-path arc-upper-halo"
            d="M 110 300 C 110 160, 190 100, 300 100 C 410 100, 490 160, 490 300 C 480 185, 400 135, 300 135 C 200 135, 120 185, 110 300 Z"
            fill="url(#upperArcGrad)"
            filter="url(#arcGlow)"
          />

          {/* Upper Arc Fine White-Hot Caustic Ridge */}
          <path
            className="arc-path arc-upper-ridge"
            d="M 135 295 C 135 180, 205 125, 300 125 C 395 125, 465 180, 465 295"
            stroke="#fff8e7"
            strokeWidth="2.5"
            strokeOpacity="0.85"
            strokeLinecap="round"
            filter="url(#hotPlasmaBlur)"
          />

          {/* Lower Einstein Lensing Arc (Spacetime bending rear disk under horizon) */}
          <path
            className="arc-path arc-lower-halo"
            d="M 125 300 C 125 415, 200 475, 300 475 C 400 475, 475 415, 475 300 C 465 390, 395 445, 300 445 C 205 445, 135 390, 125 300 Z"
            fill="url(#lowerArcGrad)"
            filter="url(#arcGlow)"
          />

          {/* Lower Arc Fine Caustic Ridge */}
          <path
            className="arc-path arc-lower-ridge"
            d="M 148 300 C 148 395, 215 452, 300 452 C 385 452, 452 395, 452 300"
            stroke="#ffcc80"
            strokeWidth="2"
            strokeOpacity="0.75"
            strokeLinecap="round"
            filter="url(#hotPlasmaBlur)"
          />

          {/* Ultra-sharp Relativistic Photon Ring directly encircling the shadow */}
          <circle
            cx="300"
            cy="300"
            r="120"
            stroke="url(#photonRingGrad)"
            strokeWidth="3.2"
            strokeOpacity="0.9"
            filter="url(#hotPlasmaBlur)"
          />
          <circle
            cx="300"
            cy="300"
            r="121"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />
        </svg>
      </div>

      {/* 3. The Pitch-Black Event Horizon (Schwarzschild Shadow) */}
      <div className="blackhole-shadow" ref={shadowRef} aria-hidden="true">
        {/* Pitch-black interior */}
        <div className="blackhole-singularity-core" />
      </div>

      {/* 4. Relativistic Violet-Blue Photon Sphere Edge Layer */}
      <div className="blackhole-photon-edge" ref={photonRingRef} aria-hidden="true">
        <span className="photon-bead bead-left" />
        <span className="photon-bead bead-top" />
      </div>

      {/* 5. Front Relativistic Equatorial Accretion Disk (Passing across the Shadow) */}
      <div className="blackhole-disk-front" ref={diskFrontRef} aria-hidden="true">
        <div className="disk-equatorial-plasma">
          {/* Concentric luminous plasma lanes */}
          <div className="plasma-lane lane-1" />
          <div className="plasma-lane lane-2" />
          <div className="plasma-lane lane-3" />
          {/* Doppler beaming asymmetry: White-hot relativistic brilliance on left */}
          <div className="doppler-beaming-flare" />
        </div>
      </div>

      {/* 6. Orbital Relativistic Micro-Satellites / Accreting Infall Particles */}
      <div className="blackhole-orbiting-nodes" aria-hidden="true">
        <span className="infall-node node-1" />
        <span className="infall-node node-2" />
        <span className="infall-node node-3" />
      </div>
    </div>
  );
}
