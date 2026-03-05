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
  console.log("Slug from URL:", slug);
  const [responses, setResponses] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!slug) return;

  fetchResponses();
}, [slug]);

  const fetchResponses = async () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

    const { data, error } = await db
    .from("rsvp_responses")
    .select("*")
    .eq("invitation_slug", slug)
    .order("created_at", { ascending: false });

   console.log("Fetching for slug:", slug);
   console.log("Fetched data:", data);
   console.log("Error:", error);

  if (!error && data) {
    setResponses(data);
  }

  setLoading(false);
};
const total = responses.length;

const attending = responses.filter(
  r => r.attending === "yes"
).length;

const guests = responses.reduce(
  (sum, r) => sum + r.guests,
  0
);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div
    style={{
    maxWidth: "1100px",
    margin: "80px auto",
    padding: "40px",
    background: "white",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  }}
>
    <h1
    style={{
    fontFamily: "Playfair Display, serif",
    fontSize: "34px",
    marginBottom: "8px",
  }}
>
    RSVP Dashboard
    </h1>

    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  }}
>
  {[ 
    { label: "Total RSVPs", value: total },
    { label: "Attending Guests", value: attending },
    { label: "Total Guests", value: guests }
  ].map((card, i) => (
    <div
      key={i}
      style={{
        padding: "25px",
        borderRadius: "12px",
        background: "#fafafa",
        border: "1px solid #eee",
      }}
    >
      <p style={{ color: "#777", fontSize: "14px" }}>{card.label}</p>
      <h2 style={{ marginTop: "8px" }}>{card.value}</h2>
    </div>
  ))}
</div>

<p style={{ color: "#777", marginBottom: "40px" }}>
  Wedding Invitation: <strong>{slug}</strong>
</p>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "40px",
  }}
>
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    }}
  >
    <h4>Total RSVPs</h4>
    <h2>{total}</h2>
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    }}
  >
    <h4>Attending</h4>
    <h2>{attending}</h2>
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    }}
  >
    <h4>Total Guests</h4>
    <h2>{guests}</h2>
  </div>
</div>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
        <p><strong>Total RSVPs:</strong> {total}</p>
        <p><strong>Attending:</strong> {attending}</p>
        <p><strong>Total Guests:</strong> {guests}</p>
    </div>

    <button
        style={{
            padding: "10px 16px",
            background: "#111",
            color: "white",
            borderRadius: "6px",
            marginBottom: "20px",
        }}
        >
        Download Guest List
    </button>
      <table
        style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
    >
        <thead style={{ background: "#f8f8f8" }}>
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
              <td>
                <span
                    style={{
                    background: r.attending === "yes" ? "#d1fae5" : "#fee2e2",
                    color: r.attending === "yes" ? "#065f46" : "#7f1d1d",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    }}
                >
                    {r.attending}
                </span>
                </td>
              <td>{r.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}