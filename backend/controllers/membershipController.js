const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Add Membership Plan (Admin)
exports.addPlan = async (req, res) => {
  try {
    const planId = uuidv4();
    const data = { id: planId, ...req.body };

    await admin.database().ref(`memberships/${planId}`).set(data);

    res.status(201).json({ message: "Membership plan added", planId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await admin
      .database()
      .ref(`memberships/${id}`)
      .once("value");
    const plan = snapshot.val();

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Membership Plans (Admin + User)
exports.getPlans = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("memberships").once("value");
    const plans = snapshot.val() || {};

    const formattedPlans = Object.entries(plans).map(([id, val]) => ({
      id,
      ...val,
    }));

    res.status(200).json(formattedPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Membership Plan (Admin)
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body, id };

    await admin.database().ref(`memberships/${id}`).update(data);

    res.status(200).json({ message: "Plan updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Membership Plan (Admin)
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    await admin.database().ref(`memberships/${id}`).remove();

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
