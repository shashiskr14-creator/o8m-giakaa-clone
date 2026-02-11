const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// CREATE must be strict
const createBlogValidators = [
  body("title").isString().trim().notEmpty().withMessage("Title is required"),
  body("content").isString().trim().notEmpty().withMessage("Content is required"),
  body("metaTitle").isString().trim().notEmpty().withMessage("Meta Title is required"),
  body("metaDescription")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Meta Description is required"),
  body("featuredImage").optional({ nullable: true }).isString(),
  body("isPublished").optional({ nullable: true }).custom((v) => {
    if (typeof v === "boolean") return true;
    if (typeof v === "string" && (v === "true" || v === "false")) return true;
    return true;
  }),
  validate,
];

// UPDATE allows partial updates (publish toggle sends only isPublished)
const updateBlogValidators = [
  body("title").optional().isString().trim().notEmpty().withMessage("Title is required"),
  body("content").optional().isString().trim().notEmpty().withMessage("Content is required"),
  body("metaTitle").optional().isString().trim().notEmpty().withMessage("Meta Title is required"),
  body("metaDescription")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Meta Description is required"),
  body("featuredImage").optional({ nullable: true }).isString(),
  body("isPublished").optional({ nullable: true }).custom((v) => {
    if (typeof v === "boolean") return true;
    if (typeof v === "string" && (v === "true" || v === "false")) return true;
    return true;
  }),
  validate,
];

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", createBlogValidators, createBlog);
router.put("/:id", updateBlogValidators, updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
