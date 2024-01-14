const express = require("express");
const router = express.Router();
const businessController = require("../Controllers/businessController");

router.get("/business", businessController.updateBusiness);
router.post("/business", businessController.createBusiness);
router.put("/business", businessController.updateBusiness);

module.exports = router;
