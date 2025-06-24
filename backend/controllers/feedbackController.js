const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Add feedback
exports.addFeedback = async (req, res) => {
  try {
    const id = uuidv4();
    const data = req.body;
    await admin
      .database()
      .ref(`feedbacks/${id}`)
      .set({ ...data, reviewed: false });
    res.status(201).json({ message: "Feedback submitted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all feedback
exports.getFeedbacks = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("feedbacks").once("value");
    const feedbacks = snapshot.val() || {};
    res
      .status(200)
      .json(Object.entries(feedbacks).map(([id, val]) => ({ id, ...val })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as reviewed
exports.markReviewed = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`feedbacks/${id}`).update({ reviewed: true });
    res.status(200).json({ message: "Marked as reviewed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`feedbacks/${id}`).remove();
    res.status(200).json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
