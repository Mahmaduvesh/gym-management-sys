const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Add Training Plan (Admin)
exports.addTraining = async (req, res) => {
  try {
    const id = uuidv4();
    const data = req.body;

    await admin.database().ref(`trainingPlans/${id}`).set(data);
    res.status(201).json({ message: "Training plan added", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Training Plans (User/Admin)
exports.getTrainings = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("trainingPlans").once("value");
    const plans = snapshot.val() || {};
    res
      .status(200)
      .json(Object.entries(plans).map(([id, val]) => ({ id, ...val })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Training Plan (Admin)
exports.updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`trainingPlans/${id}`).update(req.body);
    res.status(200).json({ message: "Training plan updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Training Plan (Admin)
exports.deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`trainingPlans/${id}`).remove();
    res.status(200).json({ message: "Training plan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
