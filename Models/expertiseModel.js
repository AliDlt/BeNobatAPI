const mongoose = require("mongoose");

const expertiseSchema = new mongoose.Schema({
  category: { type: String },
  icon: { type: String },
  link: { type: String },
  count: { type: String },
});

module.exports = mongoose.model("Expertise", expertiseSchema);
