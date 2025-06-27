const express = require("express");
const router = express.Router();
const {
  addContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const verifyToken = require("../middleware/verifyToken");

// Public (User sends message)
router.post("/", addContact);

// Admin
router.get("/", getContacts);
router.delete("/:id", deleteContact);

module.exports = router;
