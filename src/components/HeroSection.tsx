import { useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInvitation } from '@/contexts/InvitationContext';

const HeroSection = () => {
  const invitation = useInvitation();

  const [loaded, setLoaded] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const city = invitation?.city ?? 'Jaipur, Rajasthan';
  const heroImage = invitation?.hero_image ?? '/default-hero.jpg';

  // 📅 Format Date
  const formatDate = () => {
    if (!invitation?.wedding_date) return '12 · December · 2026';
    const d = new Date(invitation.wedding_date);
    return `${d.getDate()} · ${d.toLocaleString('en', {
      month: 'long',
    })} · ${d.getFullYear()}`;
  };

  // ✨ Animation trigger
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 300);
    const t2 = setTimeout(() => setShowScratch(true), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // 🎉 Confetti (optional)
  const handleRevealed = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
  }, []);

  // 🚀 AUTO SCROLL (FINAL FIXED)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextSection = document.getElementById('invitation');

      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }
    }, 4500);

    // stop if user interacts
    const stopScroll = () => clearTimeout(timeout);

    window.addEventListener('wheel', stopScroll);
    window.addEventListener('touchstart', stopScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('wheel', stopScroll);
      window.removeEventListener('touchstart', stopScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Names */}
        <h1
          className={`font-cormorant text-ivory transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
        >
          {brideName}
        </h1>

        <div className="text-gold text-4xl my-2">&</div>

        <h1
          className={`font-cormorant text-ivory transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
        >
          {groomName}
        </h1>

        {/* Date */}
        <p className="text-gold mt-6 text-lg tracking-wide">
          {formatDate()}
        </p>

        {/* City */}
        <p className="text-ivory/70 mt-2 text-sm uppercase tracking-widest">
          {city}
        </p>
      </div>

      {/* 🔥 Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="text-gold text-sm font-semibold uppercase tracking-[0.3em]">
            Scroll
          </span>

          <div className="p-3 rounded-full border border-gold/50">
            <ChevronDown
              size={24}
              className="text-gold animate-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;