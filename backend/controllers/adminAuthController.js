const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

const SECRET = process.env.JWT_SECRET;
console.log("JWT Secret:", process.env.JWT_SECRET);

// Register Admin
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await admin
      .database()
      .ref(`admins/${id}`)
      .set({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Admin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await admin.database().ref("admins").once("value");
    const admins = snapshot.val();

    const matched = Object.entries(admins || {}).find(
      ([, user]) => user.email === email
    );

    if (!matched) return res.status(404).json({ error: "Admin not found" });

    const [id, adminUser] = matched;
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id, email }, SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id, name: adminUser.name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
