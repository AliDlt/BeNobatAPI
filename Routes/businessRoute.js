const express = require("express");
const router = express.Router();
const businessController = require("../Controllers/businessController");

const { authenticationFunction } = require("../Middlewares/authMiddleware");

router.get("/business", businessController.getBusiness);
router.post(
  "/business",
  authenticationFunction(),
  businessController.createBusiness
);
router.put(
  "/business",
  authenticationFunction(),
  businessController.updateBusiness
);

module.exports = router;
