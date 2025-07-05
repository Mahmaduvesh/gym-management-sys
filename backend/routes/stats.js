const admin = require("../config/firebase");
const express = require("express");
const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const db = admin.database();

    const usersSnap = await db.ref("users").once("value");
    const membershipsSnap = await db.ref("memberships").once("value");
    const feedbacksSnap = await db.ref("feedbacks").once("value");
    const testimonialsSnap = await db.ref("testimonials").once("value");

    const users = usersSnap.val() || {};
    const memberships = membershipsSnap.val() || {};
    const feedbacks = feedbacksSnap.val() || {};
    const testimonials = testimonialsSnap.val() || {};

    res.json({
      users: Object.keys(users).length,
      memberships: Object.keys(memberships).length,
      feedbacks: Object.keys(feedbacks).length,
      testimonials: Object.keys(testimonials).length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
