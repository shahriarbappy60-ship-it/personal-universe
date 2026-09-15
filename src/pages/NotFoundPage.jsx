import React, { useEffect } from 'react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 · Horizon Not Found — Shahriar";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="not-found-page" id="mainContent">
      <div className="not-found-inner">
        <span className="eyebrow">404 · HORIZON NOT FOUND</span>
        <h1>
          Beyond this<br />
          <em>coordinate.</em>
        </h1>
        <p className="not-found-copy">
          The fragment, inquiry, or archive path you are looking for does not exist in this chapter of the universe.
        </p>
        <div className="not-found-actions">
          <Button to="/" variant="solid">
            Back home
          </Button>
          <Button to="/observe" variant="outline">
            Explore the archive
          </Button>
        </div>
      </div>
    </main>
  );
}
