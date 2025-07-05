const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// ✅ Add Training Plan
exports.addTraining = async (req, res) => {
  try {
    const trainingId = uuidv4();
    const data = req.body;

    await admin.database().ref(`trainings/${trainingId}`).set(data);
    res.status(201).json({ message: "Training plan added", trainingId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Training Plans
exports.getTrainings = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("trainings").once("value");
    const trainings = snapshot.val() || {};

    res
      .status(200)
      .json(Object.entries(trainings).map(([id, val]) => ({ id, ...val })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single
exports.getTrainingById = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await admin
      .database()
      .ref(`trainings/${id}`)
      .once("value");
    const data = snapshot.val();
    if (data) res.status(200).json(data);
    else res.status(404).json({ message: "Training not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update
exports.updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`trainings/${id}`).update(req.body);
    res.status(200).json({ message: "Training updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete
exports.deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`trainings/${id}`).remove();
    res.status(200).json({ message: "Training deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
