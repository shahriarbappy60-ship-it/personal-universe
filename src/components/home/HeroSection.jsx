import React, { useEffect, useRef } from 'react';
import Button from '../common/Button';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const celestialStageRef = useRef(null);
  const celestialBodyRef = useRef(null);
  const ringRefs = useRef([]);

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

    // Touch events for full mobile responsiveness
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
      const deltaX = (touch.clientX - touchStartX) / (window.innerWidth * 0.4);
      const deltaY = (touch.clientY - touchStartY) / (window.innerHeight * 0.4);

      targetX = Math.max(-1.8, Math.min(1.8, deltaX));
      targetY = Math.max(-1.8, Math.min(1.8, deltaY));

      inertiaX = deltaX * 0.08;
      inertiaY = deltaY * 0.08;
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const stageEl = celestialStageRef.current;
    const heroEl = sectionRef.current;

    if (stageEl) {
      stageEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      stageEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      stageEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      stageEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    if (heroEl) {
      heroEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      heroEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      heroEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      heroEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    function animateParallax(now) {
      const elapsed = now - startTime;

      // Gentle organic cosmic idle breathing oscillation
      const idleX = Math.sin(elapsed * 0.0008) * 0.08;
      const idleY = Math.cos(elapsed * 0.0006) * 0.08;

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

      currentX += (activeTargetX - currentX) * 0.07;
      currentY += (activeTargetY - currentY) * 0.07;

      const isMobile = window.innerWidth <= 950;

      if (celestialStageRef.current) {
        if (isMobile) {
          celestialStageRef.current.style.transform = `translate3d(${currentX * 16}px, ${currentY * 16}px, 0) rotateX(${-currentY * 18}deg) rotateY(${currentX * 22}deg)`;
        } else {
          celestialStageRef.current.style.transform = `translate3d(calc(-50% + ${currentX * 20}px), calc(-50% + ${currentY * 20}px), 0) rotateX(${-currentY * 14}deg) rotateY(${currentX * 18}deg)`;
        }
      }

      if (celestialBodyRef.current) {
        celestialBodyRef.current.style.transform = `translate3d(${currentX * 12}px, ${currentY * 12}px, 0) rotateY(${currentX * 24}deg)`;
      }

      ringRefs.current.forEach((ring, index) => {
        if (ring) {
          const depthMultiplier = (index + 1) * 7;
          ring.style.transformOrigin = 'center center';
          ring.style.marginLeft = `${currentX * depthMultiplier}px`;
          ring.style.marginTop = `${currentY * depthMultiplier}px`;
        }
      });

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
      if (heroEl) {
        heroEl.removeEventListener('touchstart', handleTouchStart);
        heroEl.removeEventListener('touchmove', handleTouchMove);
        heroEl.removeEventListener('touchend', handleTouchEnd);
        heroEl.removeEventListener('touchcancel', handleTouchEnd);
      }
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="hero section-pad" id="home" ref={sectionRef}>
      <div className="hero-depth-ambient" aria-hidden="true" />

      {/* REFINED CELESTIAL PHENOMENON — TOUCH & MOUSE RESPONSIVE */}
      <div className="hero-celestial-stage" ref={celestialStageRef} aria-hidden="true">
        {/* Volumetric ambient starlight / corona glow */}
        <div className="celestial-corona-aura" />

        {/* Outer cosmic accretion dust ring */}
        <div className="celestial-ring ring-outer" ref={el => (ringRefs.current[0] = el)}>
          <span className="stellar-satellite node-outer-1" />
          <span className="stellar-satellite node-outer-2" />
        </div>

        {/* Mid astronomical accretion disk with dust lanes */}
        <div className="celestial-ring ring-accretion" ref={el => (ringRefs.current[1] = el)}>
          <div className="accretion-dust-texture" />
          <span className="stellar-satellite node-mid" />
        </div>

        {/* Inner photon orbital ring */}
        <div className="celestial-ring ring-inner" ref={el => (ringRefs.current[2] = el)}>
          <span className="stellar-satellite node-inner" />
        </div>

        {/* Central 3D Celestial Body */}
        <div className="celestial-body" ref={celestialBodyRef}>
          <div className="celestial-atmosphere" />
          <div className="celestial-inner-core" />
          <div className="celestial-rim-light" />
        </div>
      </div>

      <div className="hero-content">
        <div className="eyebrow reveal">PERSONAL UNIVERSE · 2026</div>

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

          <Button to="/connect" variant="outline">
            Get in touch
          </Button>
        </div>
      </div>

      <div className="hero-meta">
        <span>23° 48′ N</span>
        <span>90° 24′ E</span>
        <span>Dhaka · Bangladesh</span>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <i />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
