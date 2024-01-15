const mongoose = require("mongoose");

const userBaseSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Customer"],
    default: "Customer",
  },
});

const UserBase = mongoose.model("UserBase", userBaseSchema);

module.exports = UserBase;
