import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

export const getHeroSlides = () => API.get("/hero-slides");
export const createHeroSlide = (data) => API.post("/hero-slides", data);
export const updateHeroSlide = (id, data) => API.put(`/hero-slides/${id}`, data);
export const deleteHeroSlide = (id) => API.delete(`/hero-slides/${id}`);

// Blogs
// Public: getBlogs() -> published only
// Admin:  getBlogs({ all: "true" }) -> drafts + published
export const getBlogs = (params = {}) => API.get("/blogs", { params });
export const getBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const createBlog = (data) => API.post("/blogs", data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export default API;
