import { useState, useEffect } from 'react';
import countdownBg from '@/assets/countdown-bg.jpg';
import { useInvitation } from '@/contexts/InvitationContext';

const CountdownSection = () => {
  const invitation = useInvitation();
  const weddingDate = new Date(invitation?.wedding_date ?? '2026-12-12T00:00:00');

  const getTimeLeft = () => {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateLabel = () => {
    if (!invitation?.wedding_date) return '12 · December · 2026';
    const d = new Date(invitation.wedding_date);
    return `${d.getDate()} · ${d.toLocaleString('en', { month: 'long' })} · ${d.getFullYear()}`;
  };

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${countdownBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-6">
        <div className="flex items-center justify-center gap-4 mb-6 fade-up">
          <div className="gold-divider" />
          <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="hsl(var(--gold))"/>
          </svg>
          <div className="gold-divider" />
        </div>

        <h2
          className="font-cormorant font-light text-ivory mb-2 fade-up delay-100"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
        >
          Counting Down to
        </h2>
        <h2
          className="font-cormorant italic text-gradient-gold mb-12 fade-up delay-200"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          Our Forever
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 fade-up delay-300">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start gap-4 md:gap-8">
              <div className="text-center">
                <div
                  className="font-cormorant font-light text-ivory number-glow"
                  style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1 }}
                >
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="font-lato font-light tracking-[0.3em] uppercase text-xs text-gold-light mt-2">
                  {unit.label}
                </div>
              </div>
              {i < units.length - 1 && (
                <div
                  className="font-cormorant text-gold/60 self-start mt-3"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}
                >
                  :
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 fade-up delay-400">
          <div className="gold-divider" />
          <p className="font-lato font-light tracking-[0.25em] uppercase text-xs text-ivory/60">
            {formatDateLabel()}
          </p>
          <div className="gold-divider" />
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
