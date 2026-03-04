import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { InvitationProvider, Invitation } from '@/contexts/InvitationContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import InvitationSection from '@/components/InvitationSection';
import CountdownSection from '@/components/CountdownSection';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import FamilySection from '@/components/FamilySection';
import RSVPSection from '@/components/RSVPSection';
import WeddingFooter from '@/components/WeddingFooter';

const InvitePage = () => {
  const { slug } = useParams();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      if (!slug) { setNotFound(true); setLoading(false); return; }

      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setInvitation(data as Invitation);
      }
      setLoading(false);
    };

    fetchInvitation();
  }, [slug]);

  // Scroll animation observer
  useEffect(() => {
    if (loading || notFound) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, notFound]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <div className="gold-divider mx-auto mb-6" />
          <p className="font-cormorant italic text-foreground/60 text-xl">Loading your invitation…</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory mandala-bg">
        <div className="text-center px-6">
          <h1 className="font-cormorant font-light text-foreground mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Invitation Not Found
          </h1>
          <div className="gold-divider mx-auto my-6" />
          <p className="font-cormorant italic text-foreground/60 text-xl mb-8">
            The invitation you're looking for doesn't exist or may have been removed.
          </p>
          <a href="/" className="font-lato text-xs tracking-[0.2em] uppercase text-gold hover:text-maroon transition-colors">
            ← Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <InvitationProvider value={invitation!}>
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

export default InvitePage;
