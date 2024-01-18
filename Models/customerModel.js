const mongoose = require("mongoose");

const UserBase = require("./userBaseModel");

const customerSchema = new mongoose.Schema({});

// Inherit from UserBase
const Customer = UserBase.discriminator("Customer", customerSchema);

module.exports = Customer;
