import storyMeet from '@/assets/story-meet.jpg';
import storyJourney from '@/assets/story-journey.jpg';
import storyProposal from '@/assets/story-proposal.jpg';

const stories = [
  {
    id: 1,
    chapter: 'Chapter I',
    title: 'How We Met',
    text: 'In the golden corridors of a Jaipur haveli, two souls crossed paths under the warmth of a setting sun. What began as a chance encounter blossomed into something neither of us could have imagined.',
    image: storyMeet,
    align: 'left',
  },
  {
    id: 2,
    chapter: 'Chapter II',
    title: 'Our First Journey',
    text: 'We wandered through rose gardens and ancient palaces, learning each other\'s silences and laughter. Every road we walked became a memory etched into the story of us.',
    image: storyJourney,
    align: 'right',
  },
  {
    id: 3,
    chapter: 'Chapter III',
    title: 'The Proposal',
    text: 'On a terrace overlooking the pink city at dusk, with all of Jaipur as witness, Arjun knelt and asked the question that would change everything. Aanya said yes.',
    image: storyProposal,
    align: 'left',
  },
];

const StorySection = () => {
  return (
    <section id="story" className="bg-ivory">
      {/* Section Header */}
      <div className="py-20 text-center mandala-bg">
        <div className="flex items-center justify-center gap-4 mb-6 fade-up">
          <div className="gold-divider" />
          <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold">Our Love Story</p>
          <div className="gold-divider" />
        </div>
        <h2
          className="font-cormorant font-light text-foreground fade-up delay-200"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Written in the Stars
        </h2>
      </div>

      {/* Story Chapters */}
      {stories.map((story) => (
        <div
          key={story.id}
          className="min-h-screen relative flex items-center overflow-hidden"
          style={{
            backgroundImage: `url(${story.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Full overlay */}
          <div className="absolute inset-0 bg-foreground/65" />

          {/* Content */}
          <div
            className={`relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 flex ${
              story.align === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="max-w-lg py-20">
              <p
                className={`font-lato font-light tracking-[0.3em] uppercase text-xs text-gold mb-4 ${
                  story.align === 'right' ? 'slide-right' : 'slide-left'
                }`}
              >
                {story.chapter}
              </p>
              <h3
                className={`font-cormorant font-light text-ivory mb-6 leading-tight ${
                  story.align === 'right' ? 'slide-right delay-100' : 'slide-left delay-100'
                }`}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
              >
                {story.title}
              </h3>

              {/* Gold divider */}
              <div
                className={`gold-divider mb-6 ${
                  story.align === 'right' ? 'slide-right delay-200 ml-auto' : 'slide-left delay-200'
                }`}
              />

              <p
                className={`font-lato font-light text-ivory/80 leading-relaxed text-base ${
                  story.align === 'right' ? 'slide-right delay-300 text-right' : 'slide-left delay-300'
                }`}
              >
                {story.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StorySection;
