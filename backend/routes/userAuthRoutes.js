const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userForgotPassword,
} = require("../controllers/userAuthController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", userForgotPassword);
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "User Auth Route Working"
  });
});
module.exports = router;
