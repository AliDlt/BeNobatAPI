const express = require("express");
const router = express.Router();
const secretaryController = require("../../Controllers/UserControllers/secretaryController");

router.post("/createSecretary", secretaryController.createSecretary);
router.post("/deleteSecretaryById", secretaryController.deleteSecretaryById);
router.post("/getAllSecretaries", secretaryController.getAllSecretaries);
router.post("/getSecretaryById", secretaryController.getSecretaryById);
router.post("/updateSecretaryById", secretaryController.updateSecretaryById);

module.exports = router;
