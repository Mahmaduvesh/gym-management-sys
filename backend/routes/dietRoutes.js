const express = require("express");
const router = express.Router();
const {
  addDiet,
  getDiets,
  updateDiet,
  deleteDiet,
} = require("../controllers/dietController");
const verifyToken = require("../middleware/verifyToken");

// Public
router.get("/", getDiets);

// Admin
router.post("/", verifyToken, addDiet);
router.put("/:id", verifyToken, updateDiet);
router.delete("/:id", verifyToken, deleteDiet);

module.exports = router;
