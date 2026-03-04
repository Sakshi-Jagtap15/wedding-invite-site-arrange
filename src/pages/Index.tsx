import { useEffect } from 'react';
import { InvitationProvider } from '@/contexts/InvitationContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import InvitationSection from '@/components/InvitationSection';
import CountdownSection from '@/components/CountdownSection';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import FamilySection from '@/components/FamilySection';
import RSVPSection from '@/components/RSVPSection';
import WeddingFooter from '@/components/WeddingFooter';

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(
      '.fade-up, .fade-in, .slide-left, .slide-right'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <InvitationProvider value={null}>
      <div className="relative">
        <Navigation />
        <HeroSection />
        <InvitationSection />
        <CountdownSection />
        <EventsSection />
        <GallerySection />
        <FamilySection />
        <RSVPSection />
        <WeddingFooter />
      </div>
    </InvitationProvider>
  );
};

export default Index;
