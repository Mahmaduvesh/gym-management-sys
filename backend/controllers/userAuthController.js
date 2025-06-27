const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// 📌 Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 10);

    await admin.database().ref(`users/${id}`).set({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await admin.database().ref("users").once("value");
    const users = snapshot.val();

    const matched = Object.entries(users || {}).find(
      ([, user]) => user.email === email
    );

    if (!matched) return res.status(404).json({ error: "User not found" });

    const [id, user] = matched;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id, email }, SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Forgot Password (email check only – simulate logic)
exports.userForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const snapshot = await admin.database().ref("users").once("value");
    const users = snapshot.val();

    const matched = Object.entries(users || {}).find(
      ([, user]) => user.email === email
    );

    if (!matched) return res.status(404).json({ error: "User not found" });

    // NOTE: Replace this with actual email service integration.
    res.json({ message: "Reset link (mock) sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
