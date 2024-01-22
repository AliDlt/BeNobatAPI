const express = require("express");
const router = express.Router();
const customerController = require("../../Controllers/UserControllers/customerController");

router.post("/createCustomer", customerController.createCustomer);
router.post("/deleteCustomerById", customerController.deleteCustomerById);
router.post("/getAllCustomers", customerController.getAllCustomers);
router.post("/getCustomerById", customerController.getCustomerById);
router.post("/updateCustomerById", customerController.updateCustomerById);

module.exports = router;
