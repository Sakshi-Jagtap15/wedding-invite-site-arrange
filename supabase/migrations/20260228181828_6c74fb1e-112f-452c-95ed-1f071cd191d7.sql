-- Create invitations table
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  venue TEXT NOT NULL,
  story TEXT,
  image_url TEXT,
  mehendi_date TEXT,
  mehendi_time TEXT,
  mehendi_venue TEXT,
  haldi_date TEXT,
  haldi_time TEXT,
  haldi_venue TEXT,
  sangeet_date TEXT,
  sangeet_time TEXT,
  sangeet_venue TEXT,
  wedding_time TEXT,
  wedding_venue TEXT,
  reception_date TEXT,
  reception_time TEXT,
  reception_venue TEXT,
  bride_father TEXT,
  bride_mother TEXT,
  groom_father TEXT,
  groom_mother TEXT,
  rsvp_deadline TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone with the slug can view)
CREATE POLICY "Anyone can view invitations by slug"
  ON public.invitations
  FOR SELECT
  USING (true);

-- Insert a sample invitation
INSERT INTO public.invitations (
  slug, bride_name, groom_name, wedding_date, venue, city,
  mehendi_date, mehendi_time, mehendi_venue,
  haldi_date, haldi_time, haldi_venue,
  sangeet_date, sangeet_time, sangeet_venue,
  wedding_time, wedding_venue,
  reception_date, reception_time, reception_venue,
  bride_father, bride_mother, groom_father, groom_mother,
  rsvp_deadline, story
) VALUES (
  'aanya-arjun', 'Aanya', 'Arjun', '2026-12-12', 'The Royal Palace, Jaipur', 'Jaipur, Rajasthan',
  '9th December 2026', '4:00 PM onwards', 'Poolside Lawn, The Royal Palace',
  '10th December 2026', '10:00 AM onwards', 'Garden Terrace, The Royal Palace',
  '11th December 2026', '7:00 PM onwards', 'Grand Ballroom, The Royal Palace',
  '11:00 AM onwards', 'Main Mandap, The Royal Palace',
  '12th December 2026', '7:30 PM onwards', 'Crystal Hall, The Royal Palace',
  'Mr. Rajesh Sharma', 'Mrs. Sunita Sharma', 'Mr. Vikram Mehta', 'Mrs. Priya Mehta',
  '1st November 2026', 'A beautiful journey of two souls coming together with the blessings of their families.'
);