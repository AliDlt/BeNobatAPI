const express = require("express");
const router = express.Router();
const featureController = require("./featureController");

// Endpoint to update feature flags
router.post("/update-feature-flags", featureController.updateFeatureFlags);

module.exports = router;
