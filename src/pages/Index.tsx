import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  gallery_images?: string[];
};

const Index = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('invitations')
        .select('*');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        console.log('Fetched Events:', data);
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

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

        {/* ✅ SAME as before */}
        <EventsSection events={events} />

        {/* ✅ SAME as before */}
        <GallerySection events={events} />

        <FamilySection />
        <RSVPSection />
        <WeddingFooter />
      </div>
    </InvitationProvider>
  );
};

export default Index;