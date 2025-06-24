const express = require("express");
const router = express.Router();
const {
  addPlan,
  getPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/membershipController");
const verifyToken = require("../middleware/verifyToken");

// Public: Get all plans
router.get("/", getPlans);

// Admin-only routes
router.post("/", verifyToken, addPlan);
router.put("/:id", verifyToken, updatePlan);
router.delete("/:id", verifyToken, deletePlan);

module.exports = router;
