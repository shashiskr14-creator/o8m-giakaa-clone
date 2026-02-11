import { useEffect, useMemo, useState } from "react";
import { getHeroSlides } from "../services/api";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const activeSlides = useMemo(() => {
    const list = Array.isArray(slides) ? slides : [];
    return list
      .filter((s) => s.isActive)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  }, [slides]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getHeroSlides();
        setSlides(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [activeSlides.length]);

  useEffect(() => {
    // reset idx if slides count changed
    if (idx >= activeSlides.length) setIdx(0);
  }, [activeSlides.length, idx]);

  const current = activeSlides[idx];

  const goPrev = () => {
    if (activeSlides.length === 0) return;
    setIdx((p) => (p - 1 + activeSlides.length) % activeSlides.length);
  };

  const goNext = () => {
    if (activeSlides.length === 0) return;
    setIdx((p) => (p + 1) % activeSlides.length);
  };

  if (loading) {
    return (
      <div
        style={{
          borderRadius: 18,
          border: "1px solid #eee",
          background: "#fff",
          padding: 18,
          boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
        }}
      >
        Loading hero...
      </div>
    );
  }

  if (!current) {
    return (
      <div
        style={{
          borderRadius: 18,
          border: "1px solid #eee",
          background: "#fff",
          padding: 18,
          boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
        }}
      >
        No hero slides available. Create one from <b>/admin</b>.
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 20,
        boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 0,
        }}
        className="hero-grid"
      >
        {/* Media */}
        <div style={{ position: "relative", background: "#f2f2f2", minHeight: 340 }}>
          {current.mediaType === "video" ? (
            <video
              src={current.mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={current.mediaUrl}
              alt={current.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          )}

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.10), rgba(0,0,0,0.0) 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Arrows */}
          {activeSlides.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                style={arrowBtn("left")}
              >
                ‹
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                style={arrowBtn("right")}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "22px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.6,
                color: "#666",
                textTransform: "uppercase",
              }}
            >
              Featured
            </span>

            <div style={{ fontWeight: 800, color: "#666", fontSize: 12 }}>
              {activeSlides.length > 0 ? `${idx + 1}/${activeSlides.length}` : "0/0"}
            </div>
          </div>

          <h1 style={{ margin: "10px 0 8px", fontSize: 40, lineHeight: 1.05, color: "#111" }}>
            {current.title}
          </h1>

          <p style={{ margin: 0, color: "#555", lineHeight: 1.7, fontSize: 15 }}>
            {current.description}
          </p>

          <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {current.ctaText && current.ctaLink ? (
              <a
                href={current.ctaLink}
                style={{
                  textDecoration: "none",
                  background: "#111",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  boxShadow: "0 10px 22px rgba(0,0,0,0.14)",
                }}
              >
                {current.ctaText} →
              </a>
            ) : (
              <a
                href="/blog"
                style={{
                  textDecoration: "none",
                  background: "#111",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  boxShadow: "0 10px 22px rgba(0,0,0,0.14)",
                }}
              >
                Explore Blog →
              </a>
            )}

            {activeSlides.length > 1 && (
              <button
                onClick={goNext}
                style={{
                  border: "1px solid #ddd",
                  background: "#fff",
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Next slide
              </button>
            )}
          </div>

          {/* Dots */}
          {activeSlides.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 16, alignItems: "center" }}>
              {activeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background: i === idx ? "#111" : "#d9d9d9",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @media (max-width: 860px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}
      </style>
    </div>
  );
}

function arrowBtn(side) {
  const base = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.7)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    fontSize: 28,
    fontWeight: 900,
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
  };
  return side === "left" ? { ...base, left: 12 } : { ...base, right: 12 };
}
