import { supabase } from "@/integrations/supabase/client";
import { useState } from 'react';
import rsvpBg from '@/assets/rsvp-bg.jpg';
import { useInvitation } from '@/contexts/InvitationContext';
import { useParams } from "react-router-dom";

const RSVPSection = () => {
  const invitation = useInvitation();
  const { slug } = useParams<{ slug: string }>();
  const brideName = invitation?.bride_name ?? 'Aanya';
  const groomName = invitation?.groom_name ?? 'Arjun';
  const rsvpDeadline = invitation?.rsvp_deadline ?? '1st November, 2026';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    attending: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { error } = await db
    .from("rsvp_responses")
    .insert([
      {
        invitation_slug: slug,
        guest_name: form.name,
        email: form.email,
        phone: form.phone,
        guests: Number(form.guests),
        attending: form.attending,
        message: form.message
      }
    ]);

  if (!error) {
    setSubmitted(true);
  } else {
    alert("Something went wrong. Please try again.");
  }
};

  const inputClass =
    'w-full bg-white/60 border border-foreground/10 rounded-sm px-4 py-3 font-lato font-light text-foreground text-sm outline-none transition-all duration-300 placeholder:text-foreground/30 focus:border-gold focus:bg-white/80';

  const selectClass =
    'w-full bg-white/60 border border-foreground/10 rounded-sm px-4 py-3 font-lato font-light text-foreground text-sm outline-none transition-all duration-300 cursor-pointer focus:border-gold focus:bg-white/80 appearance-none';

  const labelClass =
    'block font-lato text-xs tracking-[0.2em] uppercase text-foreground/50 mb-2';

  return (
    <section
      id="rsvp"
      className="min-h-screen flex items-center justify-center relative py-24"
      style={{
        backgroundImage: `url(${rsvpBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(250,246,240,0.93)' }} />

      <div className="relative z-10 w-full max-w-xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-5 fade-up">
            <div className="gold-divider" />
            <p className="font-lato tracking-[0.28em] uppercase text-xs text-gold">Kindly Reply By</p>
            <div className="gold-divider" />
          </div>
          <h2
            className="font-cormorant font-light text-foreground fade-up delay-100"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1 }}
          >
            RSVP
          </h2>
          <p className="font-lato font-light text-muted-foreground text-xs tracking-widest mt-3 fade-up delay-200">
            {rsvpDeadline}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="fade-up delay-300">
            <div className="bg-white/50 backdrop-blur-sm border border-foreground/8 rounded-sm p-8 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.08)] space-y-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Number of Guests</label>
                  <div className="relative">
                    <select name="guests" value={form.guests} onChange={handleChange} className={selectClass}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 text-xs">▾</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Will You Attend? *</label>
                  <div className="relative">
                    <select name="attending" value={form.attending} onChange={handleChange} required className={selectClass}>
                      <option value="">Please select</option>
                      <option value="yes">Joyfully Accept</option>
                      <option value="no">Regretfully Decline</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 text-xs">▾</span>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Message for the Couple</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} className={inputClass + ' resize-none'} placeholder={`Share your wishes with ${brideName} & ${groomName}…`} />
              </div>

              <div className="pt-2 text-center">
                <button type="submit" className="relative inline-block px-12 py-3.5 font-lato text-xs tracking-[0.3em] uppercase overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-gold transition-opacity duration-300" />
                  <span className="absolute inset-0 bg-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative text-ivory z-10">Confirm Your Presence</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-16 fade-in visible">
            <div className="text-5xl mb-8">💕</div>
            <h3 className="font-cormorant font-light text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              Thank You, {form.name}!
            </h3>
            <div className="gold-divider mx-auto my-6" />
            <p className="font-cormorant italic text-foreground/70 text-xl leading-relaxed">
              "We can't wait to celebrate with you."
            </p>
            <p className="font-lato font-light text-muted-foreground text-sm mt-4 tracking-wider">
              — {brideName} & {groomName}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
