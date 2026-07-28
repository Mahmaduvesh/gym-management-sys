const admin = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Submit Contact Message
exports.addContact = async (req, res) => {
  try {
    const id = uuidv4();

    const data = {
      ...req.body,
      createdAt: new Date().toISOString(), // Full timestamp
    };

    await admin.database().ref(`contacts/${id}`).set(data);

    res.status(201).json({
      message: "Contact message submitted",
      id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Contact Messages (Admin)
exports.getContacts = async (req, res) => {
  try {
    const snapshot = await admin.database().ref("contacts").once("value");
    const messages = snapshot.val() || {};

    const contacts = Object.entries(messages).map(([id, val]) => ({
      id,
      ...val,
    }));

    // Newest first
    contacts.sort((a, b) => {
      const timeA = new Date(a.createdAt || a.date || 0).getTime();
      const timeB = new Date(b.createdAt || b.date || 0).getTime();

      return timeB - timeA;
    });

    res.status(200).json(contacts);
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
