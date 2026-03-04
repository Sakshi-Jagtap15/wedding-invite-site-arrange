import eventMehendi from '@/assets/event-mehendi.jpg';
import eventHaldi from '@/assets/event-haldi.jpg';
import eventSangeet from '@/assets/event-sangeet.jpg';
import eventWedding from '@/assets/event-wedding.jpg';
import eventReception from '@/assets/event-reception.jpg';
import { useInvitation } from '@/contexts/InvitationContext';

const EventsSection = () => {
  const invitation = useInvitation();

  const events = [
    {
      id: 'mehendi',
      chapter: 'I',
      name: 'Mehendi',
      tagline: 'An evening adorned with henna, melody & graceful beginnings',
      date: invitation?.mehendi_date ?? '9th December, 2026',
      time: invitation?.mehendi_time ?? '4:00 PM Onwards',
      venue: invitation?.mehendi_venue ?? 'Samode Haveli, Jaipur',
      image: eventMehendi,
      align: 'left' as const,
      accent: 'hsl(var(--gold))',
    },
    {
      id: 'haldi',
      chapter: 'II',
      name: 'Haldi',
      tagline: 'A golden morning of ancestral blessings and heartfelt joy',
      date: invitation?.haldi_date ?? '10th December, 2026',
      time: invitation?.haldi_time ?? '10:00 AM Onwards',
      venue: invitation?.haldi_venue ?? 'Jai Mahal Palace, Jaipur',
      image: eventHaldi,
      align: 'right' as const,
      accent: 'hsl(var(--gold-light))',
    },
    {
      id: 'sangeet',
      chapter: 'III',
      name: 'Sangeet',
      tagline: 'An evening of music, dance & the celebration of two families becoming one',
      date: invitation?.sangeet_date ?? '10th December, 2026',
      time: invitation?.sangeet_time ?? '7:00 PM Onwards',
      venue: invitation?.sangeet_venue ?? 'Rajmahal Palace, Jaipur',
      image: eventSangeet,
      align: 'left' as const,
      accent: 'hsl(var(--maroon))',
    },
    {
      id: 'wedding',
      chapter: 'IV',
      name: 'Wedding Ceremony',
      tagline: 'The sacred union, solemnised in the presence of the divine and beloved',
      date: (() => {
        if (!invitation?.wedding_date) return '12th December, 2026';
        const d = new Date(invitation.wedding_date);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      })(),
      time: invitation?.wedding_time ?? '11:00 AM',
      venue: invitation?.wedding_venue ?? 'Rambagh Palace, Jaipur',
      image: eventWedding,
      align: 'right' as const,
      accent: 'hsl(var(--gold))',
    },
    {
      id: 'reception',
      chapter: 'V',
      name: 'Reception',
      tagline: 'An evening of grandeur to welcome the newly wed into a new chapter',
      date: invitation?.reception_date ?? '12th December, 2026',
      time: invitation?.reception_time ?? '7:30 PM Onwards',
      venue: invitation?.reception_venue ?? 'Rambagh Palace, Jaipur',
      image: eventReception,
      align: 'left' as const,
      accent: 'hsl(var(--dusty-rose))',
    },
  ];

  return (
    <section id="events">
      <div className="py-20 text-center bg-ivory mandala-bg">
        <div className="flex items-center justify-center gap-4 mb-6 fade-up">
          <div className="gold-divider" />
          <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold">Save the Dates</p>
          <div className="gold-divider" />
        </div>
        <h2
          className="font-cormorant font-light text-foreground fade-up delay-200"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Wedding Celebrations
        </h2>
        <p className="font-lato font-light text-muted-foreground text-sm mt-4 tracking-wider fade-up delay-300">
          Five days of celebration, rituals & eternal memories
        </p>
      </div>

      {events.map((event) => (
        <div
          key={event.id}
          id={`event-${event.id}`}
          className="min-h-screen relative flex items-center overflow-hidden"
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(12,8,4,0.62)' }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                event.align === 'left'
                  ? 'linear-gradient(to right, rgba(12,8,4,0.75) 0%, rgba(12,8,4,0.1) 65%, transparent 100%)'
                  : 'linear-gradient(to left, rgba(12,8,4,0.75) 0%, rgba(12,8,4,0.1) 65%, transparent 100%)',
            }}
          />

          <div
            className={`relative z-10 max-w-6xl mx-auto w-full px-8 md:px-16 flex ${
              event.align === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="max-w-xl py-24">
              <p
                className={`font-lato font-light tracking-[0.4em] uppercase text-xs mb-3 ${
                  event.align === 'right' ? 'slide-right text-right' : 'slide-left'
                }`}
                style={{ color: event.accent }}
              >
                Chapter {event.chapter}
              </p>

              <h2
                className={`font-cormorant font-light text-ivory leading-tight mb-4 ${
                  event.align === 'right' ? 'slide-right delay-100 text-right' : 'slide-left delay-100'
                }`}
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                {event.name}
              </h2>

              <div
                className={`gold-divider mb-5 ${
                  event.align === 'right' ? 'slide-right delay-200 ml-auto' : 'slide-left delay-200'
                }`}
              />

              <p
                className={`font-cormorant italic text-ivory/75 leading-relaxed mb-8 ${
                  event.align === 'right' ? 'slide-right delay-300 text-right' : 'slide-left delay-300'
                }`}
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
              >
                {event.tagline}
              </p>

              <div
                className={`space-y-2.5 mb-8 ${
                  event.align === 'right' ? 'slide-right delay-400' : 'slide-left delay-400'
                }`}
              >
                {[
                  { label: 'Date', value: event.date },
                  { label: 'Time', value: event.time },
                  { label: 'Venue', value: event.venue },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className={`flex items-start gap-4 ${event.align === 'right' ? 'justify-end' : ''}`}
                  >
                    {event.align !== 'right' && (
                      <span
                        className="font-lato text-xs tracking-widest uppercase mt-0.5 w-12 flex-shrink-0"
                        style={{ color: event.accent }}
                      >
                        {label}
                      </span>
                    )}
                    <span className="font-lato font-light text-sm text-ivory/80">{value}</span>
                    {event.align === 'right' && (
                      <span
                        className="font-lato text-xs tracking-widest uppercase mt-0.5 w-12 flex-shrink-0 text-right"
                        style={{ color: event.accent }}
                      >
                        {label}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className={event.align === 'right' ? 'slide-right delay-500 text-right' : 'slide-left delay-500'}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-lato text-xs tracking-[0.25em] uppercase pb-0.5 transition-colors duration-300"
                  style={{
                    color: event.accent,
                    borderBottom: `1px solid ${event.accent}66`,
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor = event.accent)
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor = `${event.accent}66`)
                  }
                >
                  View Location →
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EventsSection;
