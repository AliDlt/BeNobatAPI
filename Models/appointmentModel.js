const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true, default: Date.now },
  appointmentStatus: {
    type: String,
    enum: ["completed", "canceled", "notCompleted"],
    default: "notCompleted",
  },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserBase" },
  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentInformation",
  },
  note: { type: String },
  imageNames: [String],
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
