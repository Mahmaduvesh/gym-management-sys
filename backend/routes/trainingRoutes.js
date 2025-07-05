const express = require("express");
const router = express.Router();
const {
  addTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} = require("../controllers/trainingController");

router.get("/", getTrainings);
router.get("/:id", getTrainingById);
router.post("/", addTraining);
router.put("/:id", updateTraining);
router.delete("/:id", deleteTraining);

module.exports = router;
