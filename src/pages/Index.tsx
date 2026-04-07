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


// ✅ TYPES
type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  invitation_id?: string;
};

type InvitationType = {
  id: string;
  city?: string;
  gallery_images?: string[];
  hero_image?: string;
};


const Index = () => {
  // ✅ STATE
  const [events, setEvents] = useState<EventType[]>([]);
  const [invitation, setInvitation] = useState<InvitationType | null>(null);

  // ✅ FETCH EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('invitation_id', '4c09bb8'); // 👈 your id

      if (error) {
        console.error('Events error:', error);
      } else {
        console.log('Events:', data);
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  // ✅ FETCH INVITATION (for gallery)
  useEffect(() => {
    const fetchInvitation = async () => {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', '4c09bb8') // 👈 same id
        .single();

      if (error) {
        console.error('Invitation error:', error);
      } else {
        console.log('Invitation:', data);
        setInvitation(data);
      }
    };

    fetchInvitation();
  }, []);

  // ✅ ANIMATION (unchanged)
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

        {/* ✅ EVENTS */}
        <EventsSection events={events} />

        {/* ✅ FIXED: now using invitation */}
        <GallerySection invitation={invitation} />

        <FamilySection />
        <RSVPSection />
        <WeddingFooter />
      </div>
    </InvitationProvider>
  );
};

export default Index;