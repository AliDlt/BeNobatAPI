const express = require("express");
const router = express.Router();
const paymentInfoController = require("../Controllers/paymentInfoController");

router.post(
  "/createPaymentInformation",
  paymentInfoController.createPaymentInformation
);
router.post(
  "/deletePaymentInformationById",
  paymentInfoController.deletePaymentInformationById
);
router.post(
  "/getAllPaymentInformation",
  paymentInfoController.getAllPaymentInformation
);
router.post(
  "/getPaymentInformationById",
  paymentInfoController.getPaymentInformationById
);
router.post(
  "/updatePaymentInformationById",
  paymentInfoController.updatePaymentInformationById
);

module.exports = router;
