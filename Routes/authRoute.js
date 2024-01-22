const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/change-password", authController.changePassword);

module.exports = router;
