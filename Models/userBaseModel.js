const mongoose = require("mongoose");

const userBaseSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: String,
    nationalCode: String,
    passwordResetVersion: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    discriminatorKey: "role",
  }
);

const UserBase = mongoose.model("UserBase", userBaseSchema);

module.exports = UserBase;
