const express = require("express");
const router = express.Router();
const serviceController = require("../Controllers/serviceController");

router.post("/createService", serviceController.createService);
router.post("/deleteServiceById", serviceController.deleteServiceById);
router.post("/getAllServices", serviceController.getAllServices);
router.post(
  "/getAllServicesByExpertId",
  serviceController.getAllServicesByExpertId
);
router.post("/getServiceById", serviceController.getServiceById);
router.post("/updateServiceById", serviceController.updateServiceById);

module.exports = router;
