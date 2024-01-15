const mongoose = require("mongoose");

const UserBase = require("./userBaseModel");

const flagsFeatures = require("../Config/flagsConfig");

const adminSchema = new mongoose.Schema({
  featureFlags: {
    type: Number,
    default: flagsFeatures.chat | flagsFeatures.onlineCourse,
  },
});

// Inherit from UserBase
const Admin = UserBase.discriminator("Admin", adminSchema);

module.exports = Admin;
