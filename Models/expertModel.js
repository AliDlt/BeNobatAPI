const mongoose = require("mongoose");
const UserBase = require("./userBaseModel");

const expertSchema = new mongoose.Schema({
  expertise: [{ type: Schema.Types.ObjectId, ref: "Expertise" }],
  resume: { type: String },
  rate: { type: Number },
  price: { type: Number },
  percent: { type: Number },
  time: { type: Number },
  profile: { type: String },
  name: { type: String },
});

module.exports = UserBase.discriminator("Expert", expertSchema);
