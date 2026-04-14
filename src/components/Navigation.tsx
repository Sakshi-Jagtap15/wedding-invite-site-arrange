import { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { useInvitation } from '@/contexts/InvitationContext';

// ─────────────────────────────────────────────────────────────────────────────
// Utility: smooth scroll with controllable speed
// ─────────────────────────────────────────────────────────────────────────────
function scrollToSection(href: string, durationMs = 35000) {
  const target = document.querySelector(href);
  if (!target) return;

  const start = window.scrollY;
  const end = (target as HTMLElement).getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  let startTime: number | null = null;

  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// ─────────────────────────────────────────────────────────────────────────────
// TapToEnter — full-screen splash shown only on mobile / when autoplay is blocked
// ─────────────────────────────────────────────────────────────────────────────
const TapToEnter = ({ onEnter }: { onEnter: () => void }) => (
  <div
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
    style={{ background: 'rgba(20,14,8,0.92)', backdropFilter: 'blur(6px)' }}
    onClick={onEnter}
    onTouchEnd={(e) => { e.preventDefault(); onEnter(); }}
  >
    <div
      className="mb-8"
      style={{
        width: 60,
        height: 1,
        background: 'linear-gradient(135deg, hsl(44,60%,70%), hsl(40,55%,52%), hsl(38,50%,38%))',
      }}
    />

    <p
      className="font-cormorant italic text-ivory/90 mb-2 text-center px-6"
      style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', letterSpacing: '0.04em' }}
    >
      Tap to Enter
    </p>

    <p className="font-lato font-light text-ivory/50 tracking-[0.25em] uppercase text-xs mb-10 text-center px-6">
      Sourabh &amp; Shweta
    </p>

    <div className="relative flex items-center justify-center">
      <span
        className="absolute w-16 h-16 rounded-full border border-gold/50 animate-ping"
        style={{ animationDuration: '1.8s' }}
      />
      <span
        className="absolute w-20 h-20 rounded-full border border-gold/20 animate-ping"
        style={{ animationDuration: '2.4s', animationDelay: '0.4s' }}
      />
      <span className="w-12 h-12 rounded-full bg-gold/10 border border-gold flex items-center justify-center">
        <Music size={18} className="text-gold" />
      </span>
    </div>

    <div
      className="mt-10"
      style={{
        width: 60,
        height: 1,
        background: 'linear-gradient(135deg, hsl(44,60%,70%), hsl(40,55%,52%), hsl(38,50%,38%))',
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────
const Navigation = () => {
  const invitation = useInvitation();
  const [scrolled, setScrolled] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const initials = `${brideName.charAt(0)} & ${groomName.charAt(0)}`;

  // ── Audio setup ────────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio('/music/Aaj Se Teri.mp3');
    audio.loop = true;
    audio.volume = 0.10;
    audioRef.current = audio;

    audio.play()
      .then(() => {
        setShowSplash(false);
      })
      .catch(() => {
        setShowSplash(true);
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // ── Handle "Tap to Enter" ─────────────────────────────────────────────────
  const handleEnter = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.20;
      audio.play().catch(() => { });
    }
    setShowSplash(false);
    setMusicOn(true);
  };

  // ── Toggle music on / off ──────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.muted = false;
      audio.play().catch(() => { });
      fadeVolume(audio, audio.volume, 0.35, 600);
    } else {
      fadeVolume(audio, audio.volume, 0, 400, () => {
        if (audioRef.current) audioRef.current.muted = true;
      });
    }
  }, [musicOn]);

  // ── Scroll detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <>
      {showSplash && <TapToEnter onEnter={handleEnter} />}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled ? 'py-3 bg-foreground/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero', 1000); }}
            className={`font-cormorant text-xl tracking-[0.2em] transition-colors duration-500 ${
              scrolled ? 'text-gold' : 'text-ivory'
            }`}
          >
            {initials}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href, 1000); }}
                className={`font-lato text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-gold ${
                  scrolled ? 'text-ivory/80' : 'text-ivory/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMusicOn((prev) => !prev)}
            className={`flex items-center gap-2 font-lato text-xs tracking-widest uppercase transition-all duration-300 group ${
              scrolled ? 'text-gold hover:text-gold-light' : 'text-ivory/70 hover:text-ivory'
            }`}
            title={musicOn ? 'Mute Music' : 'Play Music'}
          >
            <span
              className={`relative flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                musicOn
                  ? 'border-gold bg-gold/10 text-gold'
                  : scrolled
                    ? 'border-ivory/30 text-gold/70'
                    : 'border-ivory/30 text-ivory/60'
              }`}
            >
              {musicOn ? <Music size={11} /> : <VolumeX size={11} />}
              {musicOn && (
                <span className="absolute inset-0 rounded-full border border-gold animate-ping opacity-40" />
              )}
            </span>
            <span className="hidden sm:inline">
              {musicOn ? 'Music On' : 'Music Off'}
            </span>
          </button>

        </div>
      </nav>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Utility: smooth volume fade
// ─────────────────────────────────────────────────────────────────────────────
function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number,
  onDone?: () => void
) {
  const steps = 30;
  const interval = durationMs / steps;
  const delta = (to - from) / steps;
  let step = 0;
  audio.volume = Math.max(0, Math.min(1, from));

  const timer = setInterval(() => {
    step++;
    const next = from + delta * step;
    audio.volume = Math.max(0, Math.min(1, next));
    if (step >= steps) {
      clearInterval(timer);
      audio.volume = Math.max(0, Math.min(1, to));
      onDone?.();
    }
  }, interval);
}

export default Navigation;