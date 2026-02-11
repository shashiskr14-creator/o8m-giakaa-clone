const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

const {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} = require("../controllers/heroController");

const heroValidators = [
  body("title").isString().notEmpty(),
  body("description").isString().notEmpty(),
  body("mediaType").isIn(["image", "video"]),
  body("mediaUrl").isString().notEmpty(),
  body("ctaText").optional().isString(),
  body("ctaLink").optional().isString(),
  body("order").optional().isNumeric(),
  body("isActive").optional().isBoolean(),
  validate,
];

router.get("/", getHeroSlides);
router.post("/", heroValidators, createHeroSlide);
router.put("/:id", heroValidators, updateHeroSlide);
router.delete("/:id", deleteHeroSlide);

module.exports = router;
