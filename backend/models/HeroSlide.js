const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    mediaUrl: { type: String, required: true },

    ctaText: { type: String, trim: true, default: "" },
    ctaLink: { type: String, trim: true, default: "" },

    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSlide", heroSlideSchema);
