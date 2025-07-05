const admin = require("../config/firebase");

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("users").once("value");
    const raw = snapshot.val() || {};

    const users = Object.entries(raw).map(([id, user]) => ({
      id,
      ...user,
    }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    await admin.database().ref(`users/${id}`).update(updates);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await admin.database().ref(`users/${id}`).remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
