import React, { useEffect } from 'react';
import GetInTouchSection from '../components/home/GetInTouchSection';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function ContactPage({ onOpenContact }) {
  useScrollReveal();
  useMagnetic();

  useEffect(() => {
    document.title = "Get In Touch — Shahriar's Personal Universe";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="contact-page" id="mainContent">
      <div className="contact-page-inner">
        <GetInTouchSection onOpenContact={onOpenContact} />
      </div>
    </main>
  );
}
