const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: String,
  cost: { type: Number, required: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
  dateTime: [{ type: Date }],
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
