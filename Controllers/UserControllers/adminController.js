const Admin = require("../../Models/adminModel");
const {
  handleBadRequest,
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../../Utils/handlers");

const createAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    handleSuccess(res, "Admin created successfully.", newAdmin);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const admins = await Admin.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "Admins retrieved successfully.", admins);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Admin retrieved successfully.", admin);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Admin updated successfully.", updatedAdmin);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Admin deleted successfully.", deletedAdmin);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
