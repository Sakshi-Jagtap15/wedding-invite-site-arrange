import { createContext, useContext } from 'react';

export interface Invitation {
  id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue: string;
  story: string | null;
  image_url: string | null;
  mehendi_date: string | null;
  mehendi_time: string | null;
  mehendi_venue: string | null;
  haldi_date: string | null;
  haldi_time: string | null;
  haldi_venue: string | null;
  sangeet_date: string | null;
  sangeet_time: string | null;
  sangeet_venue: string | null;
  wedding_time: string | null;
  wedding_venue: string | null;
  reception_date: string | null;
  reception_time: string | null;
  reception_venue: string | null;
  bride_father: string | null;
  bride_mother: string | null;
  groom_father: string | null;
  groom_mother: string | null;
  rsvp_deadline: string | null;
  city: string | null;
}

export const InvitationContext = createContext<Invitation | null>(null);

export const InvitationProvider = InvitationContext.Provider;

/** Returns invitation data or null (safe for use outside provider) */
export const useInvitation = (): Invitation | null => {
  return useContext(InvitationContext);
};
