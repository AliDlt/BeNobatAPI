const express = require("express");
const router = express.Router();
const adminController = require("../../Controllers/UserControllers/adminController");

router.post("/createAdmin", adminController.createAdmin);
router.post("/deleteAdminById", adminController.deleteAdminById);
router.post("/getAdminById", adminController.getAdminById);
router.post("/getAllAdmins", adminController.getAllAdmins);
router.post("/updateAdminById", adminController.updateAdminById);

module.exports = router;
