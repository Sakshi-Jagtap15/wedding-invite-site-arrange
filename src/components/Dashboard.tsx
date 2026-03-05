import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface RSVP {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  guests: number;
  attending: string;
  message: string;
}

export default function Dashboard() {
  const { slug } = useParams<{ slug: string }>();
  const [responses, setResponses] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (slug) {
    fetchResponses();
  }
}, [slug]);

  const fetchResponses = async () => {
    const { data, error } = await supabase
      .from("rsvp_responses")
      .select("*")
      .eq("invitation_slug", slug);

    if (!error && data) {
      setResponses(data as RSVP[]);
    }

    setLoading(false);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>RSVP Dashboard</h1>
      <h3>Wedding: {slug}</h3>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Attending</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {responses.map((r) => (
            <tr key={r.id}>
              <td>{r.guest_name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.guests}</td>
              <td>{r.attending}</td>
              <td>{r.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}