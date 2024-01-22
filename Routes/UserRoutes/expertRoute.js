const express = require("express");
const router = express.Router();
const expertController = require("../../Controllers/UserControllers/expertController");

router.post("/createExpert", expertController.createExpert);
router.post("/deleteExpertById", expertController.deleteExpertById);
router.post("/getAllExperts", expertController.getAllExperts);
router.post("/getExpertById", expertController.getExpertById);
router.post("/updateExpertById", expertController.updateExpertById);

module.exports = router;
