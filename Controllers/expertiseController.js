const Expertise = require("../Models/expertiseModel");
const {
  handleNotFound,
  handleSuccess,
  handleBadRequest,
  handleServerError,
} = require("../Utils/handlers");

// Create a new expertise
const createExpertise = async (req, res) => {
  try {
    const newExpertise = await Expertise.create(req.body);
    handleSuccess(res, "تخصص با موفقیت ساخته شده.", newExpertise);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get all expertise
const getAllExpertise = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const expertiseList = await Expertise.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "تخصص با موفقیت دریافت شد.", expertiseList);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get expertise by ID
const getExpertiseById = async (req, res) => {
  try {
    const expertise = await Expertise.findById(req.params.id);
    if (!expertise) {
      return handleNotFound(res, "تخصص یافت نشد.");
    }
    handleSuccess(res, "تخصص با موفقیت دریافت شد.", expertise);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Update expertise by ID
const updateExpertiseById = async (req, res) => {
  try {
    const updatedExpertise = await Expertise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpertise) {
      return handleNotFound(res, "تخصص یافت نشد.");
    }
    handleSuccess(res, "تخصص با موفقیت بروزرسانی شد.", updatedExpertise);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete expertise by ID
const deleteExpertiseById = async (req, res) => {
  try {
    const deletedExpertise = await Expertise.findByIdAndDelete(req.params.id);
    if (!deletedExpertise) {
      return handleNotFound(res, "تخصص یافت نشد");
    }
    handleSuccess(res, "تخصص با موفقیت حذف شد.", deletedExpertise);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createExpertise,
  getAllExpertise,
  getExpertiseById,
  updateExpertiseById,
  deleteExpertiseById,
};
