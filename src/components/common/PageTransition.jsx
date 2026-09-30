import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState('idle');
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (
      location.pathname === displayLocation.pathname &&
      location.search === displayLocation.search &&
      location.hash === displayLocation.hash
    ) {
      return;
    }

    setPhase('exit');

    const swapTimer = window.setTimeout(() => {
      setDisplayLocation(location);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('enter'));
      });
    }, 140);

    return () => window.clearTimeout(swapTimer);
  }, [location, displayLocation]);

  useEffect(() => {
    if (previousPath.current !== displayLocation.pathname) {
      previousPath.current = displayLocation.pathname;
    }
  }, [displayLocation.pathname]);

  const routes = useRoutes(children, displayLocation);

  return (
    <div className={`page-transition page-transition--${phase}`} data-route={displayLocation.pathname}>
      <div className="page-transition__veil" aria-hidden="true">
        <span className="page-transition__chapter">
          {getChapterLabel(displayLocation.pathname)}
        </span>
      </div>

      <div className="page-transition__stage">
        {routes}
      </div>
    </div>
  );
}

function getChapterLabel(pathname) {
  const chapters = {
    '/observe': '01 / OBSERVE',
    '/wonder': '02 / THINK',
    '/create': '03 / CREATE',
    '/identity': '04 / IDENTITY',
    '/contact': '05 / CONNECT',
    '/get-in-touch': '05 / CONNECT',
  };

  return chapters[pathname] || '';
}
