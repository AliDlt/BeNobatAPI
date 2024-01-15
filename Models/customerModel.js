const mongoose = require("mongoose");
const UserBase = require("./userBaseModel");

const customerSchema = new mongoose.Schema({
  featureFlags: {
    type: Number,
    default: flagsFeatures.chat | flagsFeatures.onlineCourse,
  },
});

// Inherit from UserBase
const Customer = UserBase.discriminator("Customer", customerSchema);

module.exports = Customer;
