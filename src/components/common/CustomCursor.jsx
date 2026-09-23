import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ballRef = useRef(null);

  const [isTouchOrMobile, setIsTouchOrMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      window.innerWidth <= 768
    );
  });

  useEffect(() => {
    const updateTouchStatus = () => {
      setIsTouchOrMobile(
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches ||
        window.innerWidth <= 768
      );
    };

    window.addEventListener('resize', updateTouchStatus, { passive: true });
    return () => window.removeEventListener('resize', updateTouchStatus);
  }, []);

  useEffect(() => {
    if (isTouchOrMobile) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ball = ballRef.current;
    if (!ball) return;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ballX = cursorX;
    let ballY = cursorY;
    let velX = 0;
    let velY = 0;
    let isVisible = false;
    let animationFrame = null;

    const showCursor = () => {
      if (!isVisible) {
        isVisible = true;
        ball.classList.add('is-active');
        ball.style.opacity = '1';
      }
    };

    const hideCursor = () => {
      if (isVisible) {
        isVisible = false;
        ball.classList.remove('is-active');
        ball.style.opacity = '0';
      }
    };

    const handlePointerMove = event => {
      if (event.pointerType === 'touch') {
        hideCursor();
        return;
      }
      cursorX = event.clientX;
      cursorY = event.clientY;
      showCursor();
    };

    const handleMouseMove = event => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      showCursor();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', hideCursor);
    window.addEventListener('blur', hideCursor);

    function animateCursor() {
      const dx = cursorX - ballX;
      const dy = cursorY - ballY;

      // Tactile liquid spring physics
      velX = dx * 0.28;
      velY = dy * 0.28;
      ballX += velX;
      ballY += velY;

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.016, 0.22);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.55;

      ball.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

      animationFrame = requestAnimationFrame(animateCursor);
    }

    animationFrame = requestAnimationFrame(animateCursor);

    // Event delegation for interactive hover states
    const handleMouseOver = e => {
      const target = e.target.closest(
        'a, button, input, textarea, select, [role="button"], .photo-card-item, .observe-slider-card, .slider-arrow-btn, .lightbox-nav-btn, .project-card, .observe-card, .thought-item, .mobile-glass-capsule, .filter, .timeline-node, .skill-row, .minimal-skill-card, .minimal-project-card'
      );
      if (target && !target.closest('.theme-toggle')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      document.body.classList.remove('cursor-hover');
    };
  }, [isTouchOrMobile]);

  if (isTouchOrMobile) {
    return null;
  }

  return (
    <div className="cursor-glass-ball" ref={ballRef} aria-hidden="true">
      <span className="glass-ball-specular" />
      <span className="glass-ball-core" />
    </div>
  );
}
