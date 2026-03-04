import { useInvitation } from '@/contexts/InvitationContext';

const InvitationSection = () => {
  const invitation = useInvitation();
  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const city = invitation?.city ?? 'Jaipur, Rajasthan';

  const formatDate = () => {
    if (!invitation?.wedding_date) return '12th December 2026';
    const d = new Date(invitation.wedding_date);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory mandala-bg relative overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12 fade-up">
          <div className="gold-divider" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0">
            <path d="M12 2L14.09 8.26L21 9L15.5 14.14L17.18 21L12 17.77L6.82 21L8.5 14.14L3 9L9.91 8.26L12 2Z" fill="hsl(var(--gold))" opacity="0.8"/>
          </svg>
          <div className="gold-divider" />
        </div>

        <p className="font-lato font-light tracking-[0.15em] uppercase text-xs text-gold mb-8 fade-up delay-100">
          A Wedding Invitation
        </p>

        <h2
          className="font-cormorant font-light text-foreground leading-tight mb-6 fade-up delay-200"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          With the blessings of their families,
        </h2>

        <p
          className="font-cormorant italic text-maroon fade-up delay-300"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
        >
          request the honour of your presence
        </p>

        <p
          className="font-cormorant font-light text-foreground mt-3 mb-10 fade-up delay-400"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
        >
          to celebrate their sacred wedding ceremony.
        </p>

        <div className="flex items-center justify-center gap-6 my-10 fade-up delay-500">
          <div className="gold-divider" />
          <p
            className="font-cormorant italic text-gradient-gold whitespace-nowrap"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            {brideName} & {groomName}
          </p>
          <div className="gold-divider" />
        </div>

        <p className="font-lato font-light tracking-widest uppercase text-xs text-muted-foreground fade-up delay-600">
          {formatDate()} · {city}
        </p>

        <div className="flex items-center justify-center gap-4 mt-12 fade-up delay-700">
          <div className="gold-divider-long opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
