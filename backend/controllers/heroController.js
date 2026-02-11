const HeroSlide = require("../models/HeroSlide");

exports.getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.create(req.body);
    res.status(201).json(slide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateHeroSlide = async (req, res) => {
  try {
    const updated = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Slide not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteHeroSlide = async (req, res) => {
  try {
    const deleted = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Slide not found" });
    res.status(200).json({ message: "Slide deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
