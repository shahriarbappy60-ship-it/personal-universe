import { useEffect } from 'react';

export function useMagnetic(dependencies = []) {
  useEffect(() => {
    const hoverCapable = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hoverCapable || reducedMotion) return;

    const magnetics = document.querySelectorAll('.magnetic, .button, .connect-button, .theme-toggle');

    const cleanups = [];

    magnetics.forEach(el => {
      const handleMouseMove = e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
      };

      const handleMouseLeave = () => {
        el.style.transform = 'translate3d(0, 0, 0)';
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, dependencies);
}
