const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: String,
  cost: { type: Number, required: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
  timePeriod: {
    recurring: [
      {
        dayOfWeek: {
          type: String,
          enum: [
            "شنبه",
            "یک شنبه",
            "دو شنبه",
            "سه شنبه",
            "چهار شنبه",
            "پنج شنبه",
            "جمعه",
          ],
        },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    dates: [
      {
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
  },
  paymentMethod: {
    type: String,
  },
  imageName: String,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
