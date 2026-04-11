const HeroSection = () => {
  const invitation = useInvitation();
  const [loaded, setLoaded] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const city = invitation?.city ?? 'Jaipur, Rajasthan';
  const heroImage = invitation?.hero_image ?? '/default-hero.jpg';

  // Format date
  const formatScratchDate = () => {
    if (!invitation?.wedding_date) return '12 · 12 · 2026';
    const d = new Date(invitation.wedding_date);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd} · ${mm} · ${yyyy}`;
  };

  // Load animation
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 300);
    const t2 = setTimeout(() => setShowScratch(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // 🎉 Confetti
  const handleRevealed = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
  }, []);

  // 🚀 AUTO SCROLL (NEW)
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startScroll = () => {
      timeout = setTimeout(() => {
        const nextSection = document.getElementById("invitation");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }
      }, 4500); // ⏱️ 4.5 sec
    };

    startScroll();

    const stopScroll = () => clearTimeout(timeout);

    window.addEventListener("wheel", stopScroll);
    window.addEventListener("touchstart", stopScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchstart", stopScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
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

        {/* Bride */}
        <h1
          className={`font-cormorant font-light text-ivory leading-none transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '0.3s',
            fontSize: "clamp(3.5rem, 9vw, 6rem)"
          }}
        >
          {brideName}
        </h1>

        {/* & */}
        <div
          className={`font-cormorant italic text-gold-light my-1 text-4xl sm:text-5xl md:text-6xl transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.7s' }}
        >
          &
        </div>

        {/* Groom */}
        <h1
          className={`font-cormorant font-light text-ivory leading-none transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '1.1s',
            fontSize: "clamp(3.5rem, 9vw, 6rem)"
          }}
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
          className={`font-lato font-light tracking-[0.3em] text-ivory/80 uppercase text-base md:text-sm mb-6 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1.6s' }}
        >
          Are Getting Married
        </p>

        {/* Scratch */}
        <div
          className={`flex justify-center mb-2 px-2 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1.9s' }}
        >
          <ScratchDate
            visible={showScratch}
            onRevealed={handleRevealed}
            dateLabel={formatScratchDate()}
          />
        </div>

        <p
          className={`font-lato font-light tracking-[0.2em] text-ivory/60 uppercase text-sm md:text-xs transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '2.1s' }}
        >
          {city.split(',').map(s => s.trim()).join(' · ')}
        </p>
      </div>

      {/* 🔥 SCROLL INDICATOR */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '2.5s' }}
      >
        <div className="flex flex-col items-center gap-1 animate-pulse">
          <span className="font-lato text-gold text-xs tracking-[0.3em] uppercase">
            Scroll
          </span>

          <div className="p-2 rounded-full border border-gold/40">
            <ChevronDown
              size={18}
              className="text-gold animate-bounce drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};