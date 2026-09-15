import React, { useEffect, useRef } from 'react';

export default function SaturnVisual() {
  const containerRef = useRef(null);
  const planetRef = useRef(null);
  const ringsRef = useRef(null);

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
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetMouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    function animateSaturn() {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (planetRef.current) {
        planetRef.current.style.transform = `translate3d(${mouseX * 8}px, ${mouseY * 6}px, 0)`;
      }

      if (ringsRef.current) {
        ringsRef.current.style.transform = `translate3d(${mouseX * 14}px, ${mouseY * 10}px, 0) rotate(-26.7deg) rotateY(${mouseX * 4}deg)`;
      }

      animationFrame = requestAnimationFrame(animateSaturn);
    }

    animateSaturn();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="saturn-stage" ref={containerRef} aria-label="High-Definition 3D Saturn System">
      {/* 1. Volumetric Ambient Golden Corona */}
      <div className="saturn-ambient-haze" aria-hidden="true" />

      {/* 2. Saturn Ring System (Back Plane — behind the planet) */}
      <div className="saturn-rings-assembly saturn-rings-back" ref={ringsRef} aria-hidden="true">
        <svg
          className="saturn-rings-svg"
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Multi-zone Photometric Ring Gradient */}
            <radialGradient id="saturnRingGrad" cx="50%" cy="50%" r="50%">
              {/* Inner gap */}
              <stop offset="0%" stopColor="transparent" />
              <stop offset="44%" stopColor="transparent" />
              {/* Ring C: Translucent Crepe Ring */}
              <stop offset="46%" stopColor="#7a6245" stopOpacity="0.32" />
              <stop offset="52%" stopColor="#967e5a" stopOpacity="0.45" />
              {/* Inner B Gap */}
              <stop offset="53%" stopColor="#554432" stopOpacity="0.2" />
              {/* Ring B: Luminous Dense Multi-Band */}
              <stop offset="54%" stopColor="#f3e6cf" stopOpacity="0.95" />
              <stop offset="62%" stopColor="#e8d5b5" stopOpacity="0.92" />
              <stop offset="69%" stopColor="#d8be98" stopOpacity="0.88" />
              <stop offset="72%" stopColor="#eddab9" stopOpacity="0.95" />
              {/* CASSINI DIVISION (Iconic Dark Gap) */}
              <stop offset="73.5%" stopColor="#08090d" stopOpacity="0.92" />
              <stop offset="76.5%" stopColor="#08090d" stopOpacity="0.92" />
              {/* Ring A: Outer Ring */}
              <stop offset="77.5%" stopColor="#d5bf9b" stopOpacity="0.85" />
              <stop offset="83%" stopColor="#baa17d" stopOpacity="0.75" />
              {/* Encke Gap hairline */}
              <stop offset="84%" stopColor="#0b0d12" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#baa17d" stopOpacity="0.7" />
              <stop offset="89%" stopColor="#9b8364" stopOpacity="0.5" />
              {/* Outer boundary */}
              <stop offset="91%" stopColor="transparent" />
            </radialGradient>

            {/* Shadow cast by Saturn's Sphere onto Rear Rings */}
            <linearGradient id="saturnRearRingShadow" x1="48%" y1="50%" x2="75%" y2="28%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.96" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Full Elliptical Ring Base */}
          <ellipse
            cx="270"
            cy="270"
            rx="250"
            ry="78"
            fill="url(#saturnRingGrad)"
          />

          {/* Realistic Shadow Cast by Planet across Rear Rings (upper right sector) */}
          <path
            d="M 270 270 L 370 195 A 250 78 0 0 0 270 192 Z"
            fill="url(#saturnRearRingShadow)"
          />
        </svg>
      </div>

      {/* 3. Central 3D Planetary Sphere with Atmospheric Bands */}
      <div className="saturn-globe-wrap" ref={planetRef} aria-hidden="true">
        <div className="saturn-globe">
          {/* Atmospheric Banding: Golden Amber, Honey, Cream, and Slate Polar Storms */}
          <div className="saturn-atmosphere-bands" />
          {/* Ring Shadow cast across Saturn's Northern Hemisphere */}
          <div className="saturn-ring-shadow-on-planet" />
          {/* 3D Volumetric Terminator & Spherical Shading */}
          <div className="saturn-terminator-shadow" />
          {/* Stratospheric Limb Atmospheric Glow */}
          <div className="saturn-limb-glow" />
        </div>
      </div>

      {/* 4. Saturn Ring System (Front Plane — passing in front of planet's southern half) */}
      <div className="saturn-rings-assembly saturn-rings-front" aria-hidden="true">
        <svg
          className="saturn-rings-svg"
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Clip path to only render the FRONT lower half of rings passing in front of the globe */}
          <clipPath id="saturnFrontRingClip">
            <rect x="0" y="268" width="540" height="272" />
          </clipPath>

          <g clipPath="url(#saturnFrontRingClip)">
            <ellipse
              cx="270"
              cy="270"
              rx="250"
              ry="78"
              fill="url(#saturnRingGrad)"
            />
          </g>
        </svg>
      </div>

      {/* 5. Major Saturnian Moons (Titan & Enceladus) */}
      <div className="saturn-satellites" aria-hidden="true">
        <span className="saturn-moon moon-titan" title="Titan" />
        <span className="saturn-moon moon-enceladus" title="Enceladus" />
      </div>
    </div>
  );
}
