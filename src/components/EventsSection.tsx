import eventWedding from '@/assets/event-wedding.jpg';

interface EventType {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
}

const EventsSection = ({ events }: { events: EventType[] }) => {

  // ✅ Map DB data to your luxury UI format
  const mappedEvents = events.map((event, index) => ({
    id: event.id,
    chapter: index + 1,
    name: event.title,
    tagline: event.description || "",
    date: event.date,
    time: event.time,
    venue: event.location,
    image: eventWedding, // later you can make dynamic
    align: index % 2 === 0 ? 'left' : 'right',
    accent: 'hsl(var(--gold))',
  }));

  // ✅ Empty state
  if (mappedEvents.length === 0) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">No events added yet</p>
      </section>
    );
  }

  return (
    <section id="events">
      <div className="py-20 text-center bg-ivory mandala-bg">
        <div className="flex items-center justify-center gap-4 mb-6 fade-up">
          <div className="gold-divider" />
          <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold">
            Save the Dates
          </p>
          <div className="gold-divider" />
        </div>

        <h2
          className="font-cormorant font-light text-foreground fade-up delay-200"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Wedding Celebrations
        </h2>

        <p className="font-lato font-light text-muted-foreground text-sm mt-4 tracking-wider fade-up delay-300">
          Celebrate love through beautiful moments
        </p>
      </div>

      {/* 🔥 IMPORTANT FIX HERE */}
      {mappedEvents.map((event) => (
        <div
          key={event.id}
          className="min-h-screen relative flex items-center overflow-hidden"
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                event.align === 'left'
                  ? 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)'
                  : 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)',
            }}
          />

          <div
            className={`relative z-10 max-w-6xl mx-auto w-full px-8 md:px-16 flex ${
              event.align === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="max-w-xl py-24">

              {/* Chapter */}
              <p
                className={`uppercase text-xs tracking-[0.4em] mb-3 ${
                  event.align === 'right' ? 'text-right' : ''
                }`}
                style={{ color: event.accent }}
              >
                Chapter {event.chapter}
              </p>

              {/* Title */}
              <h2
                className={`text-ivory mb-4 ${
                  event.align === 'right' ? 'text-right' : ''
                }`}
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                {event.name}
              </h2>

              <div className="gold-divider mb-5" />

              {/* Tagline */}
              <p
                className={`italic text-ivory/75 mb-8 ${
                  event.align === 'right' ? 'text-right' : ''
                }`}
              >
                {event.tagline}
              </p>

              {/* Details */}
              <div className={`space-y-2 mb-8 ${event.align === 'right' ? 'text-right' : ''}`}>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>

              {/* Location */}
              <div className={event.align === 'right' ? 'text-right' : ''}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase text-xs tracking-[0.25em]"
                  style={{ color: event.accent }}
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