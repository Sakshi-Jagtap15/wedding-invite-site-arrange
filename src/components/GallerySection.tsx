import { useState } from 'react';

// Default mock images
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';

const DEFAULT_IMAGES = [
  { src: gallery1, alt: "Wedding moment 1" },
  { src: gallery2, alt: "Wedding moment 2" },
  { src: gallery3, alt: "Wedding moment 3" },
  { src: gallery4, alt: "Wedding moment 4" },
  { src: gallery5, alt: "Wedding moment 5" },
];

export interface InvitationData {
  gallery_images?: string[] | null;
}

const GallerySection = ({ invitation }: { invitation?: InvitationData | null }) => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  // ✅ Get images from invitation, otherwise fallback to defaults
  const dbImages = invitation?.gallery_images?.map((img: string) => ({
    src: img,
    alt: "Wedding moment",
  })) || [];

  const images = dbImages.length > 0 ? dbImages : DEFAULT_IMAGES;

  return (
    <section id="gallery" className="bg-foreground py-24">
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <div className="flex items-center justify-center gap-4 mb-6 fade-up">
          <div className="gold-divider" />
          <p className="font-lato tracking-[0.3em] uppercase text-xs text-gold">
            Captured Moments
          </p>
          <div className="gold-divider" />
        </div>

        <h2
          className="font-cormorant font-light text-ivory fade-up delay-200"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Our Gallery
        </h2>
      </div>

      {/* ❌ Optional: show message if no images */}
      {images.length === 0 && (
        <p className="text-center text-ivory/60">
          No images available
        </p>
      )}

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden cursor-pointer fade-up break-inside-avoid`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-500" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 border border-ivory/70 rounded-full flex items-center justify-center">
                  <span className="text-ivory text-xs">+</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-sm animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-ivory/60 hover:text-ivory text-2xl font-light transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;