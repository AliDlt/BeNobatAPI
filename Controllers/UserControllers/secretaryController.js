const Secretary = require("../../Models/secretaryModel");
const {
  handleBadRequest,
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../../Utils/handlers");

const createSecretary = async (req, res) => {
  try {
    const newSecretary = await Secretary.create(req.body);
    handleSuccess(res, "Secretary created successfully.", newSecretary);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllSecretaries = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const secretaries = await Secretary.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "Secretaries retrieved successfully.", secretaries);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getSecretaryById = async (req, res) => {
  try {
    const secretary = await Secretary.findById(req.params.id);
    if (!secretary) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Secretary retrieved successfully.", secretary);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateSecretaryById = async (req, res) => {
  try {
    const updatedSecretary = await Secretary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSecretary) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Secretary updated successfully.", updatedSecretary);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteSecretaryById = async (req, res) => {
  try {
    const deletedSecretary = await Secretary.findByIdAndDelete(req.params.id);
    if (!deletedSecretary) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Secretary deleted successfully.", deletedSecretary);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createSecretary,
  getAllSecretaries,
  getSecretaryById,
  updateSecretaryById,
  deleteSecretaryById,
};
