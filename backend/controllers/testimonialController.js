const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// ✅ Add Testimonial (Admin only)
exports.addTestimonial = async (req, res) => {
  try {
    const id = uuidv4();
    const { name, message, role, photo } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const newTestimonial = {
      name,
      message,
      role: role || "User",
      photo: photo || "",
      timestamp: new Date().toISOString(),
    };

    await admin.database().ref(`testimonials/${id}`).set(newTestimonial);
    res.status(201).json({ message: "Testimonial added", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Testimonials (User View)
exports.getTestimonials = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("testimonials").once("value");
    const list = snapshot.val() || {};

    const testimonials = Object.entries(list)
      .map(([id, val]) => ({ id, ...val }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Optional: newest first

    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Testimonial (Admin only)
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const ref = admin.database().ref(`testimonials/${id}`);
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    await ref.remove();
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
