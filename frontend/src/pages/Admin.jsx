import { useEffect, useMemo, useState } from "react";
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/api";

function getErrMsg(err) {
  try {
    if (err?.response?.data?.errors) {
      return err.response.data.errors.map((e) => e.msg).join(", ");
    }
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.message) return err.message;
  } catch {}
  return "Request failed";
}

export default function Admin() {
  const emptyHero = useMemo(
    () => ({
      title: "",
      description: "",
      mediaType: "image",
      mediaUrl: "",
      ctaText: "",
      ctaLink: "",
      order: 0,
      isActive: true,
    }),
    []
  );

  const [heroForm, setHeroForm] = useState(emptyHero);
  const [heroSlides, setHeroSlides] = useState([]);
  const [editingHeroId, setEditingHeroId] = useState(null);

  const emptyBlog = useMemo(
    () => ({
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      featuredImage: "",
      isPublished: false,
    }),
    []
  );

  const [blogForm, setBlogForm] = useState(emptyBlog);
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const loadHeroSlides = async () => {
    const res = await getHeroSlides();
    setHeroSlides(res.data || []);
  };

  const loadBlogs = async () => {
    const res = await getBlogs({ all: "true" });
    setBlogs(res.data || []);
  };

  useEffect(() => {
    loadHeroSlides().catch(console.error);
    loadBlogs().catch(console.error);
  }, []);

  const submitHero = async (e) => {
    e.preventDefault();
    try {
      if (editingHeroId) await updateHeroSlide(editingHeroId, heroForm);
      else await createHeroSlide(heroForm);

      setHeroForm(emptyHero);
      setEditingHeroId(null);
      await loadHeroSlides();
      alert("Hero saved ✅");
    } catch (err) {
      console.error(err);
      alert("Hero save failed ❌: " + getErrMsg(err));
    }
  };

  const startEditHero = (slide) => {
    setEditingHeroId(slide._id);
    setHeroForm({
      title: slide.title || "",
      description: slide.description || "",
      mediaType: slide.mediaType || "image",
      mediaUrl: slide.mediaUrl || "",
      ctaText: slide.ctaText || "",
      ctaLink: slide.ctaLink || "",
      order: Number(slide.order || 0),
      isActive: !!slide.isActive,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeHero = async (id) => {
    if (!confirm("Delete this hero slide?")) return;
    try {
      await deleteHeroSlide(id);
      await loadHeroSlides();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌: " + getErrMsg(err));
    }
  };

  const toggleHeroActive = async (slide) => {
    try {
      await updateHeroSlide(slide._id, { isActive: !slide.isActive });
      await loadHeroSlides();
    } catch (err) {
      console.error(err);
      alert("Toggle failed ❌: " + getErrMsg(err));
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    try {
      if (editingBlogId) await updateBlog(editingBlogId, blogForm);
      else await createBlog(blogForm);

      setBlogForm(emptyBlog);
      setEditingBlogId(null);
      await loadBlogs();
      alert("Blog saved ✅");
    } catch (err) {
      console.error(err);
      alert("Blog save failed ❌: " + getErrMsg(err));
    }
  };

  const startEditBlog = (b) => {
    setEditingBlogId(b._id);
    setBlogForm({
      title: b.title || "",
      content: b.content || "",
      metaTitle: b.metaTitle || "",
      metaDescription: b.metaDescription || "",
      featuredImage: b.featuredImage || "",
      isPublished: !!b.isPublished,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      await loadBlogs();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌: " + getErrMsg(err));
    }
  };

  const toggleBlogPublish = async (b) => {
    try {
      await updateBlog(b._id, { isPublished: !b.isPublished });
      await loadBlogs();
    } catch (err) {
      console.error(err);
      alert("Publish toggle failed ❌: " + getErrMsg(err));
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "0 auto" }}>
      <h1>Admin CMS</h1>

      <section style={{ marginTop: 24 }}>
        <h2>{editingHeroId ? "Edit Hero Slide" : "Create Hero Slide"}</h2>

        <form onSubmit={submitHero} style={{ display: "grid", gap: 10, maxWidth: 700 }}>
          <input
            placeholder="Title"
            value={heroForm.title}
            onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={heroForm.description}
            onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
            required
          />
          <select
            value={heroForm.mediaType}
            onChange={(e) => setHeroForm({ ...heroForm, mediaType: e.target.value })}
          >
            <option value="image">image</option>
            <option value="video">video</option>
          </select>
          <input
            placeholder="Media URL"
            value={heroForm.mediaUrl}
            onChange={(e) => setHeroForm({ ...heroForm, mediaUrl: e.target.value })}
            required
          />
          <input
            placeholder="CTA Text"
            value={heroForm.ctaText}
            onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
          />
          <input
            placeholder="CTA Link"
            value={heroForm.ctaLink}
            onChange={(e) => setHeroForm({ ...heroForm, ctaLink: e.target.value })}
          />
          <input
            placeholder="Order"
            type="number"
            value={heroForm.order}
            onChange={(e) => setHeroForm({ ...heroForm, order: Number(e.target.value) })}
          />
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={heroForm.isActive}
              onChange={(e) => setHeroForm({ ...heroForm, isActive: e.target.checked })}
            />
            Active
          </label>

          <button type="submit">{editingHeroId ? "Update Hero" : "Create Hero"}</button>
          {editingHeroId && (
            <button
              type="button"
              onClick={() => {
                setEditingHeroId(null);
                setHeroForm(emptyHero);
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: 24 }}>Existing Hero Slides</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {heroSlides.map((s) => (
            <div key={s._id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
              <b>{s.title}</b>
              <div style={{ opacity: 0.8 }}>{s.description}</div>
              <div style={{ marginTop: 6 }}>
                <small>
                  {s.mediaType} • order: {s.order} • {s.isActive ? "Active ✅" : "Inactive ❌"}
                </small>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <button onClick={() => startEditHero(s)}>Edit</button>
                <button onClick={() => removeHero(s._id)}>Delete</button>
                <button onClick={() => toggleHeroActive(s)}>
                  {s.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>{editingBlogId ? "Edit Blog" : "Create Blog"}</h2>

        <form onSubmit={submitBlog} style={{ display: "grid", gap: 10, maxWidth: 900 }}>
          <input
            placeholder="Title"
            value={blogForm.title}
            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
            required
          />
          <input
            placeholder="Meta Title"
            value={blogForm.metaTitle}
            onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
            required
          />
          <input
            placeholder="Meta Description"
            value={blogForm.metaDescription}
            onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
            required
          />
          <input
            placeholder="Featured Image URL (optional)"
            value={blogForm.featuredImage}
            onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
          />
          <textarea
            placeholder="Content (HTML allowed - sanitized in backend)"
            value={blogForm.content}
            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
            rows={8}
            required
          />
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={blogForm.isPublished}
              onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
            />
            Published
          </label>

          <button type="submit">{editingBlogId ? "Update Blog" : "Create Blog"}</button>
          {editingBlogId && (
            <button
              type="button"
              onClick={() => {
                setEditingBlogId(null);
                setBlogForm(emptyBlog);
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: 24 }}>All Blogs (Draft + Published)</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {blogs.map((b) => (
            <div key={b._id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
              <b>{b.title}</b>
              <div style={{ marginTop: 6 }}>
                <small>
                  slug: {b.slug} • {b.isPublished ? "Published ✅" : "Draft 📝"}
                </small>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <button onClick={() => startEditBlog(b)}>Edit</button>
                <button onClick={() => removeBlog(b._id)}>Delete</button>
                <button onClick={() => toggleBlogPublish(b)}>
                  {b.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
