const mongoose = require("mongoose");

const paymentInfoSchema = new mongoose.Schema({
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["creditCard", "cardToCard", "cash"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserBase" },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const PaymentInformation = mongoose.model(
  "PaymentInformation",
  paymentInfoSchema
);

module.exports = PaymentInformation;
