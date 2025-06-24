const express = require("express");
const router = express.Router();
const {
  addFeedback,
  getFeedbacks,
  deleteFeedback,
  markReviewed,
} = require("../controllers/feedbackController");
const verifyToken = require("../middleware/verifyToken");

// User: Add Feedback
router.post("/", addFeedback);

//
router.patch("/review/:id", markReviewed);

// Admin: View All Feedback
router.get("/", getFeedbacks);

// Optional: Admin delete
router.delete("/:id", deleteFeedback);

module.exports = router;
