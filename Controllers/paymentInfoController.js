const PaymentInformation = require("../models/paymentInformationModel");

// Create a new payment information
const createPaymentInformation = async (req, res) => {
  try {
    const newPaymentInfo = await PaymentInformation.create(req.body);
    res.status(201).json({
      message: "Payment information created successfully.",
      data: newPaymentInfo,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all payment information
const getAllPaymentInformation = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const paymentInfoList = await PaymentInformation.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Payment information retrieved successfully.",
      data: paymentInfoList,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get payment information by ID
const getPaymentInformationById = async (req, res) => {
  try {
    const paymentInfo = await PaymentInformation.findById(req.params.id);
    if (!paymentInfo) {
      return res.status(404).json({
        message: "Payment information not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Payment information retrieved successfully.",
      data: paymentInfo,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update payment information by ID
const updatePaymentInformationById = async (req, res) => {
  try {
    const updatedPaymentInfo = await PaymentInformation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPaymentInfo) {
      return res.status(404).json({
        message: "Payment information not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Payment information updated successfully.",
      data: updatedPaymentInfo,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete payment information by ID
const deletePaymentInformationById = async (req, res) => {
  try {
    const deletedPaymentInfo = await PaymentInformation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPaymentInfo) {
      return res.status(404).json({
        message: "Payment information not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Payment information deleted successfully.",
      data: deletedPaymentInfo,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createPaymentInformation,
  getAllPaymentInformation,
  getPaymentInformationById,
  updatePaymentInformationById,
  deletePaymentInformationById,
};
