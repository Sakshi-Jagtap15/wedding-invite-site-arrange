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
      {/* Names */}
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

      {/* Date & City */}
      <p className="font-lato font-light tracking-[0.3em] uppercase text-xs text-ivory/40 mb-8 fade-up delay-100">
        {formatDate()} · {city}
      </p>

      {/* Hashtag */}
      <div className="mb-8 fade-up delay-200">
        <span className="font-cormorant italic text-gold/70 text-2xl">
          {hashtag}
        </span>
      </div>

      {/* 🔥 SOCIAL LINKS (UPDATED) */}
      <div className="flex items-center justify-center gap-6 mb-10 fade-up delay-300">
        {[
  {
    label: 'Website',
    url: 'https://shotai.vercel.app/#contact', // 🔁 replace with your actual domain
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/shotai.co?igsh=eGRpZmFmaXE2YXh5',
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
    url: 'https://facebook.com/yourprofile',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
].map(({ label, icon, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
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