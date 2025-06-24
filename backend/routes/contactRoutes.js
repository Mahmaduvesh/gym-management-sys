const express = require("express");
const router = express.Router();
const {
  addContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const verifyToken = require("../middleware/verifyToken");

// Public (User sends message)
router.post("/", verifyToken, addContact);

// Admin
router.get("/", verifyToken, getContacts);
router.delete("/:id", verifyToken, deleteContact);

module.exports = router;
