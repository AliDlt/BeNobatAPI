const Admin = require("../../Models/adminModel");

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.status(201).json({
      message: "Admin created successfully.",
      data: newAdmin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all admins with pagination
const getAllAdmins = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const admins = await Admin.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Admins retrieved successfully.",
      data: admins,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Admin retrieved successfully.",
      data: admin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update admin by ID
const updateAdminById = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({
        message: "Admin not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Admin updated successfully.",
      data: updatedAdmin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete admin by ID
const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({
        message: "Admin not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Admin deleted successfully.",
      data: deletedAdmin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
