const express = require("express");
const router = express.Router();
const {
  addTestimonial,
  getTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const verifyToken = require("../middleware/verifyToken");

// Public
router.get("/", getTestimonials);

// Admin
router.post("/", verifyToken, addTestimonial);
router.delete("/:id", verifyToken, deleteTestimonial);

module.exports = router;
