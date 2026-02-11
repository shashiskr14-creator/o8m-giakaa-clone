const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const heroRoutes = require("./routes/heroRoutes");
const blogRoutes = require("./routes/blogRoutes");
const Blog = require("./models/Blog");

const app = express();
app.use(helmet());
app.use(express.json());

// ✅ CORS via env (supports multiple origins)
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, cb) {
      // allow non-browser tools (no origin)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

// preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use("/api/hero-slides", heroRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => res.send("API running"));

// ✅ Sitemap XML (published blogs only)
app.get("/sitemap.xml", async (req, res) => {
  try {
    const siteUrl = process.env.SITE_URL || "http://localhost:5173";

    const blogs = await Blog.find({ isPublished: true })
      .select("slug updatedAt")
      .sort({ updatedAt: -1 })
      .lean();

    const urls = [
      { loc: `${siteUrl}/`, lastmod: new Date().toISOString() },
      { loc: `${siteUrl}/blog`, lastmod: new Date().toISOString() },
      ...blogs.map((b) => ({
        loc: `${siteUrl}/blog/${b.slug}`,
        lastmod: (b.updatedAt ? new Date(b.updatedAt) : new Date()).toISOString(),
      })),
    ];

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      urls
        .map(
          (u) =>
            `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`
        )
        .join("") +
      `</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  } catch (e) {
    res.status(500).send("sitemap error");
  }
});

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo error:", err));
