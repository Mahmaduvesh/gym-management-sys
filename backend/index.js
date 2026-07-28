// ✅ Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const admin = require("./config/firebase");

// Routes
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const dietRoutes = require("./routes/dietRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Membership Initializer
const {
  initializeDefaultMemberships,
} = require("./controllers/membershipController");

// User Routes
const userAuthRoutes = require("./routes/userAuthRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ==========================================
// CORS Configuration
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://gym-sys-uv.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);

      return callback(new Error("CORS Policy: Origin Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ==========================================
// Middleware
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Health Check
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gym Management Backend API is running 🚀",
  });
});

// ==========================================
// Firebase Test Route
// ==========================================

app.get("/test-db", async (req, res) => {
  try {
    await admin.database().ref("test").set({
      time: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "Firebase Connected Successfully ✅",
    });
  } catch (err) {
    console.error("Firebase Test Error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ==========================================
// API Routes
// ==========================================

app.use("/api/admin", adminAuthRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/contacts", contactRoutes);

app.use("/api/user", userAuthRoutes);
app.use("/api/users", userRoutes);

app.use("/api", require("./routes/stats"));

// ==========================================
// 404 Handler
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ==========================================
// Global Error Handler
// ==========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==========================================
// Start Server
// ==========================================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Create default membership plans only if none exist
    await initializeDefaultMemberships();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to initialize application:", err);
    process.exit(1);
  }
}

startServer();
