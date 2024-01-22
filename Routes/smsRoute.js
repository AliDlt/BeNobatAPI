const express = require("express");
const router = express.Router();
const smsController = require("../Controllers/smsController");

router.post("/send", smsController.SendSMS);
router.post("/verify", smsController.VerifySMS);

module.exports = router;
