const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  dateTime: { type: Date, default: Date.now },
  appointmentStatus: {
    type: String,
    enum: ["completed", "canceled", "notCompleted"],
    default: "notCompleted",
  },
  specialist: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserBase" },
  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentInformation",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
