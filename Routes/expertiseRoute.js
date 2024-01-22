const express = require("express");
const router = express.Router();
const expertiseController = require("../Controllers/expertiseController");

router.post("/createExpertise", expertiseController.createExpertise);
router.post("/deleteExpertiseById", expertiseController.deleteExpertiseById);
router.post("/getAllExpertise", expertiseController.getAllExpertise);
router.post("/getExpertiseById", expertiseController.getExpertiseById);
router.post("/updateExpertiseById", expertiseController.updateExpertiseById);

module.exports = router;
