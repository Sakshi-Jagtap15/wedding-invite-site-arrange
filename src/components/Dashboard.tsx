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
        margin: "60px auto",
        padding: "30px 20px",
        background: "white",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >

      {/* Title */}

      <h1
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(24px,4vw,34px)",
          marginBottom: "6px"
        }}
      >
        RSVP Dashboard
      </h1>

      <p style={{ color: "#777", marginBottom: "40px" }}>
        Wedding Invitation: <strong>{slug}</strong>
      </p>


      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
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
              border: "1px solid #eee"
            }}
          >
            <p style={{ color: "#777", fontSize: "14px" }}>{card.label}</p>
            <h2 style={{ marginTop: "8px" }}>{card.value}</h2>
          </div>
        ))}
      </div>


      {/* Download Button */}

      <button
        style={{
          padding: "12px 18px",
          background: "#111",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "25px"
        }}
      >
        Download Guest List
      </button>


      {/* Table */}

      <div
        style={{
          overflowX: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "700px",
            background: "white"
          }}
        >

          <thead style={{ background: "#f8f8f8" }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Guests</th>
              <th style={thStyle}>Attending</th>
              <th style={thStyle}>Message</th>
            </tr>
          </thead>

          <tbody>
            {responses.map((r) => (
              <tr key={r.id}>
                <td style={tdStyle}>{r.guest_name}</td>
                <td style={tdStyle}>{r.email}</td>
                <td style={tdStyle}>{r.phone}</td>
                <td style={tdStyle}>{r.guests}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: r.attending === "yes" ? "#d1fae5" : "#fee2e2",
                      color: r.attending === "yes" ? "#065f46" : "#7f1d1d",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      fontSize: "12px"
                    }}
                  >
                    {r.attending}
                  </span>
                </td>

                <td style={tdStyle}>{r.message}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}


const thStyle = {
  textAlign: "left" as const,
  padding: "12px",
  fontSize: "14px",
  borderBottom: "1px solid #eee"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px"
};