const express = require("express");
const router = express.Router();
const {
  addTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} = require("../controllers/trainingController");

// All Trainings
router.get("/", getTrainings);

// Single Training by ID
router.get("/:id", getTrainingById);

// Add Training
router.post("/", addTraining);

// Update
router.put("/:id", updateTraining);

// Delete
router.delete("/:id", deleteTraining);

module.exports = router;
