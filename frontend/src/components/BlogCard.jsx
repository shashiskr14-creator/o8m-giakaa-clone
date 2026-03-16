const BlogCard = ({ blog }) => {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 16,
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={blog.coverImage}
        alt={blog.title}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <h3 style={{ margin: "6px 0" }}>{blog.title}</h3>

      <p style={{ color: "#555", lineHeight: 1.6 }}>{blog.excerpt}</p>

      <a
        href={`/blogs/${blog.slug}`}
        style={{
          display: "inline-block",
          marginTop: 10,
          fontWeight: 700,
          color: "#111",
        }}
      >
        Read More →
      </a>
    </div>
  );
};

export default BlogCard;