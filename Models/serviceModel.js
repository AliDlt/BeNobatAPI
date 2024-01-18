const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: String,
  cost: { type: Number, required: true },
  specialist: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
