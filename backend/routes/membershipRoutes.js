const express = require("express");
const router = express.Router();
const {
  addPlan,
  getPlans,
  updatePlan,
  deletePlan,
  getPlanById,
} = require("../controllers/membershipController");
const verifyToken = require("../middleware/verifyToken");

// Public: Get all plans
router.get("/", getPlans);
router.get("/:id", getPlanById); // ⬅️ Add this GET route for single plan

// Admin-only routes
router.post("/", addPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

module.exports = router;
