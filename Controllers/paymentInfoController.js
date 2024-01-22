const PaymentInformation = require("../models/paymentInformationModel");
const {
  handleNotFound,
  handleSuccess,
  handleBadRequest,
  handleServerError,
} = require("../utils/handlers");

// Create a new payment information
const createPaymentInformation = async (req, res) => {
  try {
    const newPaymentInfo = await PaymentInformation.create(req.body);
    handleSuccess(
      res,
      "Payment information created successfully.",
      newPaymentInfo
    );
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get all payment information
const getAllPaymentInformation = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const paymentInfoList = await PaymentInformation.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(
      res,
      "Payment information retrieved successfully.",
      paymentInfoList
    );
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get payment information by ID
const getPaymentInformationById = async (req, res) => {
  try {
    const paymentInfo = await PaymentInformation.findById(req.params.id);
    if (!paymentInfo) {
      return handleNotFound(res, "Payment information not found.");
    }
    handleSuccess(
      res,
      "Payment information retrieved successfully.",
      paymentInfo
    );
  } catch (error) {
    handleServerError(res, error);
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
      return handleNotFound(res, "Payment information not found.");
    }
    handleSuccess(
      res,
      "Payment information updated successfully.",
      updatedPaymentInfo
    );
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete payment information by ID
const deletePaymentInformationById = async (req, res) => {
  try {
    const deletedPaymentInfo = await PaymentInformation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPaymentInfo) {
      return handleNotFound(res, "Payment information not found.");
    }
    handleSuccess(
      res,
      "Payment information deleted successfully.",
      deletedPaymentInfo
    );
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createPaymentInformation,
  getAllPaymentInformation,
  getPaymentInformationById,
  updatePaymentInformationById,
  deletePaymentInformationById,
};
