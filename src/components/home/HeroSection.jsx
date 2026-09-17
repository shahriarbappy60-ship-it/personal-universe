import React, { useEffect, useRef } from 'react';
import Button from '../common/Button';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const celestialStageRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let touchStartX = 0;
    let touchStartY = 0;
    let isTouching = false;
    let inertiaX = 0;
    let inertiaY = 0;

    let animationFrame = null;
    let startTime = performance.now();

    // Mouse / trackpad pointer movement
    const handlePointerMove = event => {
      if (event.pointerType === 'touch') return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    // Touch events for mobile: conservative range without page scroll interference
    const handleTouchStart = event => {
      if (!event.touches || event.touches.length === 0) return;
      isTouching = true;
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      inertiaX = 0;
      inertiaY = 0;
    };

    const handleTouchMove = event => {
      if (!event.touches || event.touches.length === 0) return;
      const touch = event.touches[0];
      const deltaX = (touch.clientX - touchStartX) / (window.innerWidth * 0.8);
      const deltaY = (touch.clientY - touchStartY) / (window.innerHeight * 0.8);

      // Clamp touch influence strictly to avoid extreme displacements
      targetX = Math.max(-0.4, Math.min(0.4, deltaX));
      targetY = Math.max(-0.4, Math.min(0.4, deltaY));

      inertiaX = deltaX * 0.03;
      inertiaY = deltaY * 0.03;
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const stageEl = celestialStageRef.current;

    // Attach touch handlers strictly to stage element to prevent interfering with main page scrolling
    if (stageEl) {
      stageEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      stageEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      stageEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      stageEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    function animateParallax(now) {
      const elapsed = now - startTime;

      // Gentle organic cosmic idle breathing oscillation (subtle micro-drift)
      const idleX = Math.sin(elapsed * 0.0006) * 0.04;
      const idleY = Math.cos(elapsed * 0.0005) * 0.04;

      if (!isTouching) {
        // Apply smooth inertia damping when finger is released
        targetX += inertiaX;
        targetY += inertiaY;
        inertiaX *= 0.92;
        inertiaY *= 0.92;
        // Slowly return toward idle center
        targetX *= 0.96;
        targetY *= 0.96;
      }

      const activeTargetX = targetX + idleX;
      const activeTargetY = targetY + idleY;

      currentX += (activeTargetX - currentX) * 0.06;
      currentY += (activeTargetY - currentY) * 0.06;

      const isMobile = window.innerWidth <= 950;

      // Complete celestial system translates together as ONE unified object
      // All rings and the ball share one exact geometric center and never drift apart
      if (celestialStageRef.current) {
        if (isMobile) {
          celestialStageRef.current.style.transform = `translate3d(${currentX * 2}px, ${currentY * 2}px, 0)`;
        } else {
          celestialStageRef.current.style.transform = `translate3d(calc(-50% + ${currentX * 5}px), calc(-50% + ${currentY * 5}px), 0)`;
        }
      }

      animationFrame = requestAnimationFrame(animateParallax);
    }

    animationFrame = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (stageEl) {
        stageEl.removeEventListener('touchstart', handleTouchStart);
        stageEl.removeEventListener('touchmove', handleTouchMove);
        stageEl.removeEventListener('touchend', handleTouchEnd);
        stageEl.removeEventListener('touchcancel', handleTouchEnd);
      }
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="hero section-pad" id="home" ref={sectionRef}>
      <div className="hero-depth-ambient" aria-hidden="true" />

      {/* UNIFIED CELESTIAL PHENOMENON — 3D ORBITAL DEPTH SYSTEM */}
      <div className="hero-celestial-stage" ref={celestialStageRef} aria-hidden="true">
        {/* Volumetric ambient starlight / corona glow */}
        <div className="celestial-corona-aura" />

        {/* REAR ORBITAL RINGS LAYER — Sits BEHIND the celestial sphere (z-index: 2) */}
        <div className="celestial-rings-layer celestial-rings-rear" aria-hidden="true">
          <div className="celestial-ring ring-outer">
            <span className="stellar-satellite node-outer-1" />
            <span className="stellar-satellite node-outer-2" />
          </div>

          <div className="celestial-ring ring-accretion">
            <div className="accretion-dust-texture" />
            <span className="stellar-satellite node-mid" />
          </div>

          <div className="celestial-ring ring-inner">
            <span className="stellar-satellite node-inner" />
          </div>
        </div>

        {/* CENTRAL 3D CELESTIAL BODY — Layered between rear and front rings (z-index: 5) */}
        <div className="celestial-body">
          <div className="celestial-atmosphere" />
          <div className="celestial-inner-core" />
          <div className="celestial-rim-light" />
        </div>

        {/* FRONT ORBITAL RINGS LAYER — Passes IN FRONT OF the celestial sphere (z-index: 8) */}
        <div className="celestial-rings-layer celestial-rings-front" aria-hidden="true">
          <div className="celestial-ring ring-outer">
            <span className="stellar-satellite node-outer-1" />
            <span className="stellar-satellite node-outer-2" />
          </div>

          <div className="celestial-ring ring-accretion">
            <div className="accretion-dust-texture" />
            <span className="stellar-satellite node-mid" />
          </div>

          <div className="celestial-ring ring-inner">
            <span className="stellar-satellite node-inner" />
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="eyebrow reveal">SHAHRIAR'S PERSONAL UNIVERSE · 2026</div>

        <h1 className="reveal delay-1">
          A place for<br />
          everything <em>I am.</em>
        </h1>

        <p className="hero-copy reveal delay-2">
          I observe the world, wonder about what it means,
          build things from curiosity, and keep becoming.
        </p>

        <div className="hero-actions reveal delay-2">
          <Button href="#observe" variant="solid" icon="↓">
            Explore the archive
          </Button>
        </div>
      </div>

      <div className="hero-meta">
        <span className="coord-group">
          <span>23° 48′ N</span>
          <span className="coord-divider">·</span>
          <span>90° 24′ E</span>
        </span>
        <span className="coord-place">Dhaka · Bangladesh</span>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <i />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
