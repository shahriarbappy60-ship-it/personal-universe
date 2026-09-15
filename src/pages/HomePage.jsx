import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ObserveSection from '../components/home/ObserveSection';
import WonderSection from '../components/home/WonderSection';
import CreateSection from '../components/home/CreateSection';
import SelfSection from '../components/home/SelfSection';
import ResonanceSection from '../components/home/ResonanceSection';
import BecomingSection from '../components/home/BecomingSection';
import ConnectSection from '../components/home/ConnectSection';
import LightboxModal from '../components/modals/LightboxModal';
import EssayModal from '../components/modals/EssayModal';
import { observePhotos } from '../data/observeData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';

export default function HomePage({ onOpenContact, setActiveSection }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1);
  const [activePhotoList, setActivePhotoList] = useState(observePhotos);
  const [isEssayOpen, setIsEssayOpen] = useState(false);

  useScrollReveal([]);
  useMagnetic([]);

  useEffect(() => {
    document.title = "Shahriar — Personal Universe";
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.35, 0.55],
        rootMargin: '-10% 0px -35% 0px'
      }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [setActiveSection]);

  const handleSelectPhoto = (photo, index, list) => {
    setSelectedPhoto(photo);
    setSelectedPhotoIndex(typeof index === 'number' ? index : 0);
    if (list && list.length) {
      setActivePhotoList(list);
    } else {
      setActivePhotoList(observePhotos);
    }
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex(prev => {
      const nextIdx = prev > 0 ? prev - 1 : activePhotoList.length - 1;
      setSelectedPhoto(activePhotoList[nextIdx]);
      return nextIdx;
    });
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex(prev => {
      const nextIdx = prev < activePhotoList.length - 1 ? prev + 1 : 0;
      setSelectedPhoto(activePhotoList[nextIdx]);
      return nextIdx;
    });
  };

  return (
    <main>
      <HeroSection onOpenContact={onOpenContact} />
      <ObserveSection onSelectPhoto={handleSelectPhoto} />
      <WonderSection onOpenEssay={() => setIsEssayOpen(true)} />
      <CreateSection />
      <SelfSection />
      <BecomingSection />
      <ResonanceSection />
      <ConnectSection onOpenContact={onOpenContact} />

      <LightboxModal
        photo={selectedPhoto}
        photos={activePhotoList}
        currentIndex={selectedPhotoIndex}
        onClose={() => {
          setSelectedPhoto(null);
          setSelectedPhotoIndex(-1);
        }}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
      />

      <EssayModal
        isOpen={isEssayOpen}
        onClose={() => setIsEssayOpen(false)}
      />
    </main>
  );
}
