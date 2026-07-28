const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// ======================================
// Default Membership Plans
// ======================================

const defaultPlans = [
  {
    title: "Basic",
    monthlyPrice: 999,
    yearlyPrice: 9999,
    timing: "1 Month",
    features: [
      "Gym Access",
      "Locker Facility",
      "Free WiFi",
    ],
  },
  {
    title: "Premium",
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    timing: "1 Month",
    features: [
      "Gym Access",
      "Personal Trainer",
      "Diet Plan",
      "Cardio Zone",
      "Locker Facility",
    ],
  },
  {
    title: "Elite",
    monthlyPrice: 2999,
    yearlyPrice: 29999,
    timing: "1 Month",
    features: [
      "Everything in Premium",
      "Steam Bath",
      "Unlimited Classes",
      "Nutrition Support",
      "VIP Locker",
    ],
  },
];

// ======================================
// Initialize Default Plans
// ======================================

exports.initializeDefaultMemberships = async () => {
  try {
    const ref = admin.database().ref("memberships");
    const snapshot = await ref.once("value");

    if (snapshot.exists()) {
      console.log("✅ Membership plans already exist.");
      return;
    }

    const data = {};

    defaultPlans.forEach((plan) => {
      const id = uuidv4();

      data[id] = {
        id,
        ...plan,
      };
    });

    await ref.set(data);

    console.log("✅ Default membership plans created.");
  } catch (err) {
    console.error("❌ Error creating default memberships:", err.message);
  }
};

// ======================================
// Add Membership
// ======================================

exports.addPlan = async (req, res) => {
  try {
    const id = uuidv4();

    const plan = {
      id,
      title: req.body.title || "",
      monthlyPrice: Number(req.body.monthlyPrice) || 0,
      yearlyPrice: Number(req.body.yearlyPrice) || 0,
      timing: req.body.timing || "",
      features: req.body.features || [],
    };

    await admin.database().ref(`memberships/${id}`).set(plan);

    res.status(201).json({
      success: true,
      message: "Membership plan added successfully.",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Get All Memberships
// ======================================

// ======================================
// Get All Memberships
// ======================================

exports.getPlans = async (req, res) => {
  try {
    const ref = admin.database().ref("memberships");

    let snapshot = await ref.once("value");

    // If no memberships exist, create default plans
    if (!snapshot.exists()) {
      const data = {};

      defaultPlans.forEach((plan) => {
        const id = uuidv4();

        data[id] = {
          id,
          ...plan,
        };
      });

      await ref.set(data);

      // Read again after inserting defaults
      snapshot = await ref.once("value");

      console.log("✅ Default membership plans created.");
    }

    const memberships = Object.values(snapshot.val() || {});

    res.status(200).json(memberships);
  } catch (error) {
    console.error("Get Membership Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Get Membership By ID
// ======================================

exports.getPlanById = async (req, res) => {
  try {
    const snapshot = await admin
      .database()
      .ref(`memberships/${req.params.id}`)
      .once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found.",
      });
    }

    res.status(200).json(snapshot.val());
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Update Membership
// ======================================

exports.updatePlan = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedPlan = {
      id,
      title: req.body.title,
      monthlyPrice: Number(req.body.monthlyPrice),
      yearlyPrice: Number(req.body.yearlyPrice),
      timing: req.body.timing,
      features: req.body.features,
    };

    await admin
      .database()
      .ref(`memberships/${id}`)
      .update(updatedPlan);

    res.status(200).json({
      success: true,
      message: "Membership updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================================
// Delete Membership
// ======================================

exports.deletePlan = async (req, res) => {
  try {
    await admin
      .database()
      .ref(`memberships/${req.params.id}`)
      .remove();

    res.status(200).json({
      success: true,
      message: "Membership deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};