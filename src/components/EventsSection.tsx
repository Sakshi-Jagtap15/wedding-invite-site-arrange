import eventWedding from '@/assets/event-wedding.jpg';
import haldiImg from "@/assets/event-haldi.jpg";
import saptapadiImg from "@/assets/event-saptapadi.jpg";
import weddingImg from "@/assets/event-wedding.jpg";

interface EventType {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  gallery_images?: string[];
}

const EventsSection = ({ events }: { events: EventType[] }) => {

  console.log(events);

  // ✅ DEFAULT TEMPLATE EVENTS (fallback)
  const defaultEvents: EventType[] = [
    {
      id: "1",
      title: "Haldi Ceremony",
      date: "10 Dec 2026",
      time: "10:00 AM",
      location: "Bride's Home",
      description: "A joyful celebration filled with colors and love.",
    },
    {
      id: "2",
      title: "Saptapadi",
      date: "12 Dec 2026",
      time: "7:00 PM",
      location: "Wedding Venue",
      description: "The sacred vows around the holy fire.",
    },
    {
      id: "3",
      title: "Reception",
      date: "13 Dec 2026",
      time: "8:00 PM",
      location: "Grand Hall",
      description: "Celebrate the union with family and friends.",
    },
  ];

  // ✅ Decide which data to use
  const finalEvents = events && events.length > 0 ? events : defaultEvents;

  // ✅ Image logic
  const getEventImage = (title: string) => {
    const name = title.toLowerCase();

    if (name.includes("haldi")) return haldiImg;

    if (
      name.includes("saptapadi") ||
      name.includes("pheras") ||
      name.includes("phere")
    ) return saptapadiImg;

    if (
      name.includes("wedding") ||
      name.includes("marriage")
    ) return weddingImg;

    return weddingImg;
  };

  // ✅ Mapping (unchanged UI logic)
  const mappedEvents = finalEvents.map((event, index) => ({
    id: event.id,
    chapter: index + 1,
    name: event.title,
    tagline: event.description || "",
    date: event.date,
    time: event.time,
    venue: event.location,
    image: getEventImage(event.title),
    align: index % 2 === 0 ? 'left' : 'right',
    accent: 'hsl(var(--gold))',
  }));

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