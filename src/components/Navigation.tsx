import { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { useInvitation } from '@/contexts/InvitationContext';

const Navigation = () => {
  const invitation = useInvitation();
  const [scrolled, setScrolled] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const initials = `${brideName.charAt(0)} & ${groomName.charAt(0)}`;

  useEffect(() => {
    const audio = new Audio('/music/Aaj Se Teri.mp3');
    audio.loop = true;
    audio.volume = 0.20;
    audioRef.current = audio;
    audio.muted = false;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.muted = false;
      audio.play().catch(() => {});
      fadeVolume(audio, 0, 0.35, 800);
    } else {
      fadeVolume(audio, audio.volume, 0, 600, () => {
        if (audioRef.current) audioRef.current.muted = true;
      });
    }
  }, [musicOn]);

  useEffect(() => {
  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;

    audio.play()
      .then(() => setMusicOn(true))
      .catch(() => {});

    window.removeEventListener("scroll", startMusic);
    window.removeEventListener("mousemove", startMusic);
    window.removeEventListener("touchstart", startMusic);
    document.removeEventListener("click", startMusic);
  };

  window.addEventListener("scroll", startMusic);
  window.addEventListener("mousemove", startMusic);
  window.addEventListener("touchstart", startMusic);
  document.addEventListener("click", startMusic);

  return () => {
    window.removeEventListener("scroll", startMusic);
    window.removeEventListener("mousemove", startMusic);
    window.removeEventListener("touchstart", startMusic);
    document.removeEventListener("click", startMusic);
  };
}, []);

  const navLinks = [
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled ? 'py-3 bg-foreground/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
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
  );
};

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
