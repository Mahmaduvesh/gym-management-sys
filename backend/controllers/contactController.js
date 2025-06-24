const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Submit Contact Message
exports.addContact = async (req, res) => {
  try {
    const id = uuidv4();
    const data = {
      ...req.body,
      date: new Date().toISOString().split("T")[0],
    };
    await admin.database().ref(`contacts/${id}`).set(data);
    res.status(201).json({ message: "Contact message submitted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Contact Messages (admin)
exports.getContacts = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("contacts").once("value");
    const messages = snapshot.val() || {};
    res
      .status(200)
      .json(Object.entries(messages).map(([id, val]) => ({ id, ...val })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: Delete Contact Message (admin)
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.database().ref(`contacts/${id}`).remove();
    res.status(200).json({ message: "Contact message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
