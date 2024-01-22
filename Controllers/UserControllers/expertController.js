const Expert = require("../../Models/expertModel");
const {
  handleBadRequest,
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../../Utils/handlers");

const createExpert = async (req, res) => {
  try {
    const newExpert = await Expert.create(req.body);
    handleSuccess(res, "Expert created successfully.", newExpert);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllExperts = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const experts = await Expert.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "Experts retrieved successfully.", experts);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Expert retrieved successfully.", expert);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateExpertById = async (req, res) => {
  try {
    const updatedExpert = await Expert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpert) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Expert updated successfully.", updatedExpert);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteExpertById = async (req, res) => {
  try {
    const deletedExpert = await Expert.findByIdAndDelete(req.params.id);
    if (!deletedExpert) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Expert deleted successfully.", deletedExpert);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createExpert,
  getAllExperts,
  getExpertById,
  updateExpertById,
  deleteExpertById,
};
