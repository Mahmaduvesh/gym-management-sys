const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");

const generateToken = (uid, role) => {
  return jwt.sign({ uid, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
exports.register = async (req, res) => {
  const { email, password, role = "user" } = req.body;

  try {
    const user = await admin.auth().createUser({ email, password });
    await admin.auth().setCustomUserClaims(user.uid, { role });

    const token = generateToken(user.uid, role);
    res.status(201).json({ token, uid: user.uid, email, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { uidToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(uidToken);
    const token = generateToken(decodedToken.uid, decodedToken.role || "user");

    res
      .status(200)
      .json({ token, uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
