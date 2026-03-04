import { useInvitation } from '@/contexts/InvitationContext';

const FamilySection = () => {
  const invitation = useInvitation();

  const brideFather = invitation?.bride_father ?? 'Mr. Rajesh Kumar Sharma';
  const brideMother = invitation?.bride_mother ?? 'Mrs. Sunita Sharma';
  const groomFather = invitation?.groom_father ?? 'Mr. Vikram Singh Rathore';
  const groomMother = invitation?.groom_mother ?? 'Mrs. Priya Rathore';

  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory mandala-bg py-24">
      <div className="max-w-5xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6 fade-up">
            <div className="gold-divider" />
            <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold">With Blessings Of</p>
            <div className="gold-divider" />
          </div>
          <h2
            className="font-cormorant font-light text-foreground fade-up delay-200"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Our Families
          </h2>
        </div>

        {/* Family layout */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-0 md:gap-0">
          {/* Bride's Family */}
          <div className="flex-1 text-center px-8 py-10 slide-left">
            <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold mb-6">Bride's Family</p>
            <h3
              className="font-cormorant font-light text-foreground mb-2 leading-snug"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              {brideFather}
            </h3>
            <p className="font-lato font-light text-muted-foreground text-sm mb-1">&</p>
            <h3
              className="font-cormorant font-light text-foreground mb-6 leading-snug"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              {brideMother}
            </h3>
            <div className="gold-divider mx-auto mb-4 opacity-60" />
            <p className="font-lato font-light text-xs text-muted-foreground tracking-wider">
              Request the pleasure of your company
            </p>
          </div>

          {/* Gold vertical divider */}
          <div className="hidden md:flex flex-col items-center self-center h-72 gap-0 fade-in delay-300">
            <div className="flex-1 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent" />
            <div className="my-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4L16 12H24L17.5 17L20 25L14 20L8 25L10.5 17L4 12H12Z" fill="hsl(var(--gold))" opacity="0.7"/>
              </svg>
            </div>
            <div className="flex-1 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent" />
          </div>

          {/* Mobile divider */}
          <div className="md:hidden w-full flex items-center gap-4 my-4 px-8">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M14 4L16 12H24L17.5 17L20 25L14 20L8 25L10.5 17L4 12H12Z" fill="hsl(var(--gold))" opacity="0.7"/>
            </svg>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Groom's Family */}
          <div className="flex-1 text-center px-8 py-10 slide-right">
            <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold mb-6">Groom's Family</p>
            <h3
              className="font-cormorant font-light text-foreground mb-2 leading-snug"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              {groomFather}
            </h3>
            <p className="font-lato font-light text-muted-foreground text-sm mb-1">&</p>
            <h3
              className="font-cormorant font-light text-foreground mb-6 leading-snug"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              {groomMother}
            </h3>
            <div className="gold-divider mx-auto mb-4 opacity-60" />
            <p className="font-lato font-light text-xs text-muted-foreground tracking-wider">
              Joyfully invite you to share in their happiness
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilySection;
