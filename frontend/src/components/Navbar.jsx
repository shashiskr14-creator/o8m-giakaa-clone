import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#111" : "#444",
  fontWeight: isActive ? 800 : 600,
  padding: "10px 12px",
  borderRadius: 10,
  background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // close menu on route change (click link)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Brand */}
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "#111",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "linear-gradient(135deg,#111,#444)",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 900,
              letterSpacing: 0.5,
            }}
          >
            G
          </div>
          <div style={{ lineHeight: 1.05 }}>
            <div style={{ fontWeight: 900, fontSize: 14 }}>Giakaa Clone</div>
            <div style={{ fontSize: 12, color: "#666" }}>o8m Labs Assignment</div>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <nav
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>
            <NavLink to="/blog" style={linkStyle}>
              Blog
            </NavLink>
            <NavLink to="/admin" style={linkStyle}>
              Admin
            </NavLink>
          </div>

          <a
            href="/blog"
            style={{
              marginLeft: 8,
              textDecoration: "none",
              background: "#111",
              color: "white",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 800,
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            Explore →
          </a>
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            border: "1px solid #eee",
            background: "#fff",
            borderRadius: 12,
            padding: "10px 12px",
            fontWeight: 800,
            cursor: "pointer",
          }}
          className="nav-mobile-btn"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid #eee",
            background: "white",
          }}
          className="nav-mobile-menu"
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: 12, display: "grid", gap: 8 }}>
            <NavLink to="/" style={linkStyle} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/blog" style={linkStyle} onClick={() => setOpen(false)}>
              Blog
            </NavLink>
            <NavLink to="/admin" style={linkStyle} onClick={() => setOpen(false)}>
              Admin
            </NavLink>

            <a
              href="/blog"
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none",
                background: "#111",
                color: "white",
                padding: "12px 14px",
                borderRadius: 12,
                fontWeight: 800,
                textAlign: "center",
                marginTop: 6,
              }}
            >
              Explore Blog →
            </a>
          </div>
        </div>
      )}

      {/* Tiny responsive CSS without extra files */}
      <style>
        {`
          @media (max-width: 780px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-btn { display: inline-flex !important; }
          }
        `}
      </style>
    </header>
  );
}
