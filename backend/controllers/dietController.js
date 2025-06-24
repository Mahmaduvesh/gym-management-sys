const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Add diet plan
exports.addDiet = async (req, res) => {
  try {
    const id = uuidv4();
    const data = req.body;

    await admin.database().ref(`dietPlans/${id}`).set(data);
    res.status(201).json({ message: "Diet plan added", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all diet plans
exports.getDiets = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("dietPlans").once("value");
    const diets = snapshot.val() || {};
    res
      .status(200)
      .json(Object.entries(diets).map(([id, val]) => ({ id, ...val })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update diet plan
exports.updateDiet = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`dietPlans/${id}`).update(req.body);
    res.status(200).json({ message: "Diet plan updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete diet plan
exports.deleteDiet = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`dietPlans/${id}`).remove();
    res.status(200).json({ message: "Diet plan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
