import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';

export default function StarCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const isObserve = pathname === '/observe';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let stars = [];
    let canvasWidth = 0;
    let canvasHeight = 0;
    let canvasDpr = 1;
    let animationFrame = null;

    function createStars() {
      const density = isObserve
        ? (window.innerWidth < 700 ? 52 : 105)
        : (window.innerWidth < 700 ? 45 : 85);
      stars = Array.from({ length: density }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.1 + 0.15,
        alpha: Math.random() * 0.45 + 0.08,
        speed: Math.random() * 0.00025 + 0.00005
      }));
    }

    function resizeCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvasDpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = canvasWidth * canvasDpr;
      canvas.height = canvasHeight * canvasDpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(canvasDpr, 0, 0, canvasDpr, 0, 0);
      createStars();
    }

    const isLight = theme === 'light' || document.documentElement.dataset.theme === 'light';
    canvas.style.opacity = isLight
      ? (isObserve ? '.40' : '.32')
      : (isObserve ? '.82' : '.72');

    function drawStars(time) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = 1;
          star.x = Math.random();
        }

        const twinkle = star.alpha + Math.sin(time * 0.001 + star.x * 20) * 0.05;
        const alpha = Math.max(0.02, Math.min(0.65, twinkle));

        ctx.beginPath();
        ctx.arc(star.x * canvasWidth, star.y * canvasHeight, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(60,60,60,${alpha * 0.30})`
          : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    drawStars(performance.now());

    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [theme, isObserve]);

  return <canvas id="spaceCanvas" ref={canvasRef} aria-hidden="true" />;
}
