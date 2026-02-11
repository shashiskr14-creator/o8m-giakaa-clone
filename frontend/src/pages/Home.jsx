import { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{ padding: "28px 18px 10px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <HeroSlider />
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "34px 18px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, margin: "0 0 8px" }}>Our Services</h2>
          <p style={{ margin: "0 0 18px", color: "#555", maxWidth: 700, lineHeight: 1.6 }}>
            We build fast, modern web experiences — from design systems to scalable backends — with
            SEO foundations baked in.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            <Card
              title="UI/UX Design"
              desc="Clean, modern interfaces that feel premium and convert better."
              icon="🎨"
            />
            <Card
              title="Full-Stack Development"
              desc="React + Node + APIs with reliability, performance, and clean code."
              icon="⚡"
            />
            <Card
              title="SEO & Growth"
              desc="Meta tags, canonical URLs, sitemap.xml, and performance improvements."
              icon="📈"
            />
            <Card
              title="CMS Integration"
              desc="Update hero + blogs without code changes through admin CMS."
              icon="🧩"
            />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ padding: "34px 18px", background: "#fff", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, margin: "0 0 8px" }}>Why choose us</h2>
          <p style={{ margin: "0 0 18px", color: "#555", maxWidth: 720, lineHeight: 1.6 }}>
            A practical build — focused on what the assignment asks: CMS, SEO, clean APIs, and a
            production-ready structure.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <MiniCard
              title="Responsive by default"
              desc="Mobile-first layout with clean spacing and readable typography."
            />
            <MiniCard
              title="CMS powered"
              desc="Hero slider and blog content are fully admin-managed."
            />
            <MiniCard
              title="SEO ready"
              desc="Dynamic meta tags, canonical URLs, OG tags, and sitemap.xml."
            />
            <MiniCard
              title="Secure inputs"
              desc="Validation + sanitization reduces bad data and XSS risks."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "34px 18px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "linear-gradient(135deg, #111 0%, #2a2a2a 100%)",
            borderRadius: 18,
            padding: "22px 18px",
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ minWidth: 260 }}>
            <h3 style={{ margin: 0, fontSize: 22 }}>Explore the Blog</h3>
            <p style={{ margin: "6px 0 0", opacity: 0.85, lineHeight: 1.5 }}>
              Read SEO-friendly posts with clean URLs and dynamic meta tags.
            </p>
          </div>

          <a
            href="/blog"
            style={{
              textDecoration: "none",
              background: "white",
              color: "#111",
              padding: "10px 14px",
              borderRadius: 12,
              fontWeight: 700,
              boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
            }}
          >
            Go to Blog →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "18px 18px 28px", color: "#666" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          © {year} Giakaa Clone • o8m Labs Assignment
        </div>
      </footer>
    </div>
  );
}

function Card({ title, desc, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>
      <h3 style={{ margin: "10px 0 6px", fontSize: 18 }}>{title}</h3>
      <p style={{ margin: 0, color: "#555", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div
      style={{
        background: "#fafafa",
        border: "1px solid #eee",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{title}</h3>
      <p style={{ margin: 0, color: "#555", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}
