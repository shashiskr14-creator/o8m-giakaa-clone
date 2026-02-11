import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const res = await getBlogs();
        setBlogs(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", padding: "28px 18px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, margin: "0 0 8px" }}>Blog</h1>
        <p style={{ margin: "0 0 18px", color: "#555", maxWidth: 720, lineHeight: 1.6 }}>
          SEO-friendly blog posts with clean slugs, dynamic meta tags, and sitemap support.
        </p>

        {loading && <p>Loading...</p>}

        {!loading && blogs.length === 0 && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 16,
              padding: 18,
            }}
          >
            No published blogs yet. Create and publish one from <b>/admin</b>.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 10,
          }}
        >
          {blogs.map((b) => (
            <Link
              key={b._id || b.id || b.slug}
              to={`/blog/${b.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ height: 170, background: "#f0f0f0" }}>
                  {b.featuredImage ? (
                    <img
                      src={b.featuredImage}
                      alt={b.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ padding: 16, color: "#777" }}>No image</div>
                  )}
                </div>

                <div style={{ padding: 14 }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{b.title}</h3>
                  <p style={{ margin: 0, color: "#666", lineHeight: 1.6 }}>
                    {b.metaDescription || "Read the full blog post →"}
                  </p>

                  <div style={{ marginTop: 12, fontWeight: 700 }}>Read →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
