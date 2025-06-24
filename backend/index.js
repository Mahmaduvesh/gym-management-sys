const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const dietRoutes = require("./routes/dietRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/memberships", membershipRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
