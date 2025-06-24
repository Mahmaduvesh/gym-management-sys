const express = require("express");
const router = express.Router();
const {
  addTraining,
  getTrainings,
  updateTraining,
  deleteTraining,
} = require("../controllers/trainingController");
const verifyToken = require("../middleware/verifyToken");

// Public
router.get("/", getTrainings);

// Admin-only
router.post("/", verifyToken, addTraining);
router.put("/:id", verifyToken, updateTraining);
router.delete("/:id", verifyToken, deleteTraining);

module.exports = router;
