// ✅ Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const adminAuthRoutes = require("./routes/adminAuthRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const dietRoutes = require("./routes/dietRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ✅ User routes
const userAuthRoutes = require("./routes/userAuthRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/contacts", contactRoutes);

// ✅ User authentication routes
app.use("/api/user", userAuthRoutes);

app.use("/api", require("./routes/stats"));

// Routes fect all users
app.use("/api/users", userRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
