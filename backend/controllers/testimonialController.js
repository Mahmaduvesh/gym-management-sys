const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Add Testimonial (Admin only)
exports.addTestimonial = async (req, res) => {
  try {
    const id = uuidv4();
    const data = req.body;
    await admin.database().ref(`testimonials/${id}`).set(data);
    res.status(201).json({ message: "Testimonial added", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Testimonials (User view)
exports.getTestimonials = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("testimonials").once("value");
    const list = snapshot.val() || {};
    res
      .status(200)
      .json(Object.entries(list).map(([id, val]) => ({ id, ...val })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Testimonial (Admin only)
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`testimonials/${id}`).remove();
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
