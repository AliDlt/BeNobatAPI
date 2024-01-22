const mongoose = require("mongoose");

const UserBase = require("./userBaseModel");

const secretarySchema = new mongoose.Schema({});

// Inherit from UserBase
const Secretary = UserBase.discriminator("Secretary", secretarySchema);

module.exports = Secretary;
