import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { useInvitation } from '@/contexts/InvitationContext';

/* ─── Confetti Particle System ─── */
const GOLD_COLORS  = ['#e8c96a', '#f5dfa0', '#c9a84c', '#f0d080', '#d4a820', '#fce27a'];
const ROSE_COLORS  = ['#e8a0b0', '#d4687c', '#f0b8c8', '#c96080', '#f5c6d0', '#e07090'];
const ALL_COLORS   = [...GOLD_COLORS, ...ROSE_COLORS];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  rotation: number; rotationSpeed: number;
  color: string;
  width: number; height: number;
  opacity: number; fade: number;
  shape: 'rect' | 'circle' | 'ribbon';
}

const ConfettiCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  const spawn = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = 180;
    particles.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      vx: (Math.random() - 0.5) * 5,
      vy: 2.5 + Math.random() * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      color: ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)],
      width:  6 + Math.random() * 10,
      height: 10 + Math.random() * 16,
      opacity: 1,
      fade: 0.004 + Math.random() * 0.006,
      shape: (['rect', 'circle', 'ribbon'] as const)[Math.floor(Math.random() * 3)],
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    for (const p of particles.current) {
      if (p.opacity <= 0) continue;
      alive = true;

      p.x        += p.vx;
      p.y        += p.vy;
      p.vy       += 0.08;
      p.vx       += (Math.random() - 0.5) * 0.3;
      p.rotation += p.rotationSpeed;
      p.opacity  -= p.fade;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'ribbon') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.width / 2, p.height / 4, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      }
      ctx.restore();
    }

    if (alive) {
      animRef.current = requestAnimationFrame(draw);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!active) return;
    cancelAnimationFrame(animRef.current);
    spawn();
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, spawn, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

/* ─── Scratch Card Component ─── */
const ScratchDate = ({
  visible,
  onRevealed,
  dateLabel,
}: {
  visible: boolean;
  onRevealed: () => void;
  dateLabel: string;
}) => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const isDrawing  = useRef(false);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0,   '#e8c96a');
    grad.addColorStop(0.25,'#fdf0b0');
    grad.addColorStop(0.5, '#c9a84c');
    grad.addColorStop(0.75,'#f0d080');
    grad.addColorStop(1,   '#a87c2a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const x = (canvas.width / 7) * (i + 1);
      ctx.moveTo(x - 20, 0);
      ctx.lineTo(x + 20, canvas.height);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(100, 65, 5, 0.65)';
    ctx.font = 'bold 11px Lato, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦  SCRATCH TO REVEAL  ✦', canvas.width / 2, canvas.height / 2);
  }, [visible]);

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src = 'touches' in e ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  };

  const scratch = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) cleared++;
    }
    const pct = cleared / (canvas.width * canvas.height);
    if (pct > 0.55 && !hasRevealedRef.current) {
      hasRevealedRef.current = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setRevealed(true);
      onRevealed();
    }
  };

  return (
    <div
      className="relative inline-block select-none"
      style={{ cursor: revealed ? 'default' : 'crosshair' }}
    >
      <p
        className="font-cormorant italic text-gold-light tracking-wider"
        style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)' }}
      >
        {dateLabel}
      </p>

      {!revealed && visible && (
        <canvas
          ref={canvasRef}
          width={340}
          height={70}
          className="absolute inset-0 w-full h-full touch-none"
          style={{ borderRadius: '4px' }}
          onMouseDown={(e) => { isDrawing.current = true; setScratching(true); scratch(e); }}
          onMouseMove={scratch}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={(e) => { isDrawing.current = true; setScratching(true); scratch(e); }}
          onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
          onTouchEnd={() => { isDrawing.current = false; }}
        />
      )}

      {!scratching && !revealed && visible && (
        <span
          className="absolute -top-5 left-1/2 -translate-x-1/2 text-gold/70 animate-bounce pointer-events-none font-lato"
          style={{ fontSize: '9px', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}
        >
          ✦ scratch me ✦
        </span>
      )}

      {revealed && (
        <span
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold pointer-events-none font-lato animate-bounce"
          style={{ fontSize: '10px', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}
        >
          ✦ see you there ✦
        </span>
      )}
    </div>
  );
};

/* ─── Hero Section ─── */
const HeroSection = () => {
  const invitation = useInvitation();
  const [loaded,     setLoaded]     = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [confetti,   setConfetti]   = useState(false);

  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const city = invitation?.city ?? 'Jaipur, Rajasthan';

  // Format date for scratch card
  const formatScratchDate = () => {
    if (!invitation?.wedding_date) return '12 · 12 · 2026';
    const d = new Date(invitation.wedding_date);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd} · ${mm} · ${yyyy}`;
  };

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true),     300);
    const t2 = setTimeout(() => setShowScratch(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleRevealed = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
  }, []);

  const initials = `${brideName.charAt(0)} & ${groomName.charAt(0)}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      <ConfettiCanvas active={confetti} />

      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />

      <div className="relative z-10 text-center px-6">
        <div
          className={`mx-auto mb-8 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 w-16' : 'opacity-0 w-0'
          }`}
          style={{ height: '1px', background: 'var(--gradient-gold)' }}
        />

        <h1
          className={`font-cormorant font-light tracking-[0.12em] text-ivory leading-none transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', transitionDelay: '0.3s' }}
        >
          {brideName}
        </h1>

        <div
          className={`font-cormorant italic text-gold-light my-1 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)', transitionDelay: '0.7s' }}
        >
          &
        </div>

        <h1
          className={`font-cormorant font-light tracking-[0.12em] text-ivory leading-none transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', transitionDelay: '1.1s' }}
        >
          {groomName}
        </h1>

        <div
          className={`mx-auto my-6 gold-divider transition-all duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.5s' }}
        />

        <p
          className={`font-lato font-light tracking-[0.3em] text-ivory/80 uppercase text-sm mb-6 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1.6s' }}
        >
          Are Getting Married
        </p>

        <div
          className={`flex justify-center mb-2 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1.9s' }}
        >
          <ScratchDate visible={showScratch} onRevealed={handleRevealed} dateLabel={formatScratchDate()} />
        </div>

        <p
          className={`font-lato font-light tracking-[0.2em] text-ivory/60 uppercase text-xs transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '2.1s' }}
        >
          {city.split(',').map(s => s.trim()).join(' · ')}
        </p>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '2.5s' }}
      >
        <span className="font-lato text-ivory/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-gold scroll-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
