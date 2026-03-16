import { useEffect, useMemo, useState } from "react";
import { getHeroSlides } from "../services/api";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeSlides = useMemo(() => {
    const list = Array.isArray(slides) ? slides : [];
    return list
      .filter((s) => s.isActive)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  }, [slides]);

  useEffect(() => {
    let isMounted = true;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchSlides = async (attempt = 1) => {
      try {
        const res = await getHeroSlides();

        if (!isMounted) return;
        setSlides(res.data || []);
        setError("");
        setLoading(false);
      } catch (err) {
        console.error(`Hero fetch error (attempt ${attempt}):`, err);

        if (attempt < 3) {
          await wait(4000);
          return fetchSlides(attempt + 1);
        }

        if (!isMounted) return;
        setError("Server is waking up. Please refresh in a few seconds.");
        setLoading(false);
      }
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [activeSlides.length]);

  useEffect(() => {
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
          }}
          className="hero-grid"
        >
          <div
            style={{
              minHeight: 340,
              background: "linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
            }}
          />

          <div style={{ padding: "22px 18px" }}>
            <div
              style={{
                width: 80,
                height: 12,
                borderRadius: 8,
                background: "#ececec",
                marginBottom: 14,
              }}
            />
            <div
              style={{
                width: "75%",
                height: 42,
                borderRadius: 10,
                background: "#ececec",
                marginBottom: 12,
              }}
            />
            <div
              style={{
                width: "95%",
                height: 14,
                borderRadius: 8,
                background: "#f0f0f0",
                marginBottom: 10,
              }}
            />
            <div
              style={{
                width: "85%",
                height: 14,
                borderRadius: 8,
                background: "#f0f0f0",
                marginBottom: 10,
              }}
            />
            <div
              style={{
                width: "70%",
                height: 14,
                borderRadius: 8,
                background: "#f0f0f0",
                marginBottom: 20,
              }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 130,
                  height: 42,
                  borderRadius: 12,
                  background: "#e8e8e8",
                }}
              />
              <div
                style={{
                  width: 110,
                  height: 42,
                  borderRadius: 12,
                  background: "#f2f2f2",
                  border: "1px solid #e5e5e5",
                }}
              />
            </div>
          </div>
        </div>

        <style>
          {`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }

            @media (max-width: 860px) {
              .hero-grid { grid-template-columns: 1fr !important; }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          borderRadius: 18,
          border: "1px solid #f3d9a7",
          background: "#fff8e6",
          padding: 18,
          color: "#8a6116",
          boxShadow: "0 10px 26px rgba(0,0,0,0.04)",
        }}
      >
        {error}
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

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.10), rgba(0,0,0,0.0) 55%)",
              pointerEvents: "none",
            }}
          />

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