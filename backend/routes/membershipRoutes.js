const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");

// Admin
router.post("/", membershipController.addPlan);
router.put("/:id", membershipController.updatePlan);
router.delete("/:id", membershipController.deletePlan);

// Shared
router.get("/", membershipController.getPlans);
router.get("/:id", membershipController.getPlanById);

module.exports = router;
