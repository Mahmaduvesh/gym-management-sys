const express = require("express");
const router = express.Router();
const {
  addDiet,
  getDiets,
  updateDiet,
  deleteDiet,
  getDietById,
} = require("../controllers/dietController");
const verifyToken = require("../middleware/verifyToken");

// Public
router.get("/", getDiets);
router.get("/:id", getDietById);

// Admin
router.post("/", addDiet);
router.put("/:id", updateDiet);
router.delete("/:id", deleteDiet);

module.exports = router;
