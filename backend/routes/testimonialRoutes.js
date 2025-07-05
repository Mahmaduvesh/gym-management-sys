const express = require("express");
const router = express.Router();

const {
  addTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", addTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
