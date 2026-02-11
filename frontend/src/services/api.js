import axios from "axios";

// Production backend URL (Render)
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://o8m-giakaa-clone.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
});

// ---------------- HERO ----------------
export const getHeroSlides = () => API.get("/hero-slides");
export const createHeroSlide = (data) => API.post("/hero-slides", data);
export const updateHeroSlide = (id, data) =>
  API.put(`/hero-slides/${id}`, data);
export const deleteHeroSlide = (id) =>
  API.delete(`/hero-slides/${id}`);

// ---------------- BLOGS ----------------
// Public: published only
// Admin: drafts + published
export const getBlogs = (params = {}) =>
  API.get("/blogs", { params });

export const getBlogBySlug = (slug) =>
  API.get(`/blogs/${slug}`);

export const createBlog = (data) =>
  API.post("/blogs", data);

export const updateBlog = (id, data) =>
  API.put(`/blogs/${id}`, data);

export const deleteBlog = (id) =>
  API.delete(`/blogs/${id}`);

export default API;
