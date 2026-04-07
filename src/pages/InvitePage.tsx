import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InvitationSection from "@/components/InvitationSection";
import CountdownSection from "@/components/CountdownSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import FamilySection from "@/components/FamilySection";
import RSVPSection from "@/components/RSVPSection";
import WeddingFooter from "@/components/WeddingFooter";


// ✅ TYPES (fixes your error)
type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  invitation_id?: string;
};

type InvitationType = {
  id: string;
  city?: string;
  gallery_images?: string[];
  hero_image?: string;
};


const InvitePage = () => {
  const { slug } = useParams(); // 👉 for future use

  // ✅ STATE (no more 'any' error)
  const [events, setEvents] = useState<EventType[]>([]);
  const [invitation, setInvitation] = useState<InvitationType | null>(null);

  // ✅ FETCH EVENTS (timeline)
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("invitation_id", "4c09bb8"); // 👈 your current ID

      if (error) {
        console.error("Events error:", error);
      } else {
        console.log("Events:", data);
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  // ✅ FETCH INVITATION (gallery + hero)
  useEffect(() => {
    const fetchInvitation = async () => {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("id", "4c09bb8") // 👈 same ID
        .single();

      if (error) {
        console.error("Invitation error:", error);
      } else {
        console.log("Invitation:", data);
        setInvitation(data);
      }
    };

    fetchInvitation();
  }, []);

  return (
    <div className="relative">
      <Navigation />

      <HeroSection />
      <InvitationSection />
      <CountdownSection />

      {/* ✅ EVENTS */}
      <EventsSection events={events} />

      {/* ✅ GALLERY (correct data source) */}
      <GallerySection invitation={invitation} />

      <FamilySection />
      <RSVPSection />
      <WeddingFooter />
    </div>
  );
};

export default InvitePage;