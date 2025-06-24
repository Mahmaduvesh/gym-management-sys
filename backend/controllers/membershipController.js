const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Add Membership Plan (Admin)
exports.addPlan = async (req, res) => {
  try {
    const planId = uuidv4();
    const data = req.body;

    await admin.database().ref(`memberships/${planId}`).set(data);

    res.status(201).json({ message: "Membership plan added", planId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Plans (User & Admin)
exports.getPlans = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("memberships").once("value");
    const plans = snapshot.val() || {};
    res
      .status(200)
      .json(Object.entries(plans).map(([id, val]) => ({ id, ...val })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Plan (Admin)
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`memberships/${id}`).update(req.body);
    res.status(200).json({ message: "Plan updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Plan (Admin)
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`memberships/${id}`).remove();
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
