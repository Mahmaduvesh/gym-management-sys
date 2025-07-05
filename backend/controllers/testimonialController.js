const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// ✅ Add Testimonial
exports.addTestimonial = async (req, res) => {
  try {
    const id = uuidv4();
    const { name, role, message, photo, rating = 5 } = req.body;

    const testimonial = {
      name,
      role: role || "",
      text: message, // ✅ correctly stored as `text`
      image: photo || "",
      rating,
      timestamp: Date.now(),
    };

    await admin.database().ref(`testimonials/${id}`).set(testimonial);
    res.status(201).json({ message: "Testimonial added", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("testimonials").once("value");
    const raw = snapshot.val() || {};

    const testimonials = Object.entries(raw).map(([id, val]) => ({
      id,
      ...val,
    }));

    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`testimonials/${id}`).remove();
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`testimonials/${id}`).update(req.body);
    res.status(200).json({ message: "Testimonial updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get One Testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await admin
      .database()
      .ref(`testimonials/${id}`)
      .once("value");
    const data = snapshot.val();
    if (data) res.status(200).json(data);
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
