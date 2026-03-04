import { useInvitation } from '@/contexts/InvitationContext';

const WeddingFooter = () => {
  const invitation = useInvitation();
  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const city = invitation?.city ?? 'Jaipur, Rajasthan';

  const formatDate = () => {
    if (!invitation?.wedding_date) return '12 · December · 2026';
    const d = new Date(invitation.wedding_date);
    return `${d.getDate()} · ${d.toLocaleString('en', { month: 'long' })} · ${d.getFullYear()}`;
  };

  const hashtag = `#${brideName}Meets${groomName}`;

  return (
    <footer className="bg-foreground py-16 text-center">
      <div className="flex items-center justify-center gap-4 mb-6 fade-up">
        <div className="gold-divider" />
        <p
          className="font-cormorant italic text-gold"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          {brideName} & {groomName}
        </p>
        <div className="gold-divider" />
      </div>

      <p className="font-lato font-light tracking-[0.3em] uppercase text-xs text-ivory/40 mb-8 fade-up delay-100">
        {formatDate()} · {city}
      </p>

      <div className="mb-8 fade-up delay-200">
        <span className="font-cormorant italic text-gold/70 text-2xl">
          {hashtag}
        </span>
      </div>

      <div className="flex items-center justify-center gap-6 mb-10 fade-up delay-300">
        {[
          {
            label: 'Instagram',
            icon: (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            ),
          },
          {
            label: 'Facebook',
            icon: (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            ),
          },
          {
            label: 'YouTube',
            icon: (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
              </svg>
            ),
          },
        ].map(({ label, icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="text-ivory/30 hover:text-gold transition-colors duration-300"
          >
            {icon}
          </a>
        ))}
      </div>

      <div className="gold-divider mx-auto mb-6 opacity-20" />

      <p className="font-lato font-light text-xs text-ivory/25 tracking-widest">
        © {new Date().getFullYear()} {brideName} & {groomName}. Made with love.
      </p>
    </footer>
  );
};

export default WeddingFooter;
