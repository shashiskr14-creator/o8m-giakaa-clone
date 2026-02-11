const Blog = require("../models/Blog");
const sanitizeHtml = require("sanitize-html");

function baseSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(title) {
  const slugBase = baseSlug(title);
  let slug = slugBase;
  let count = 1;

  while (await Blog.findOne({ slug })) {
    slug = `${slugBase}-${count}`;
    count++;
  }
  return slug;
}

function toBool(val) {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val.toLowerCase() === "true";
  return false;
}

exports.getBlogs = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === "true" ? {} : { isPublished: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const slug = await generateUniqueSlug(req.body.title);

    const cleanContent = sanitizeHtml(req.body.content || "", {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        a: ["href", "name", "target", "rel"],
        img: ["src", "alt"],
        "*": ["style"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });

    const blog = await Blog.create({
      title: req.body.title,
      slug,
      content: cleanContent,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      featuredImage: req.body.featuredImage || "",
      isPublished: toBool(req.body.isPublished),
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({
      message: "Create blog failed",
      error: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const cleanContent = sanitizeHtml(req.body.content || "", {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        a: ["href", "name", "target", "rel"],
        img: ["src", "alt"],
        "*": ["style"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, content: cleanContent, isPublished: toBool(req.body.isPublished) },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update blog failed", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
};
