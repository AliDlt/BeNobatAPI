const Secretary = require("../../Models/secretaryModel");

// Create a new secretary
const createSecretary = async (req, res) => {
  try {
    const newSecretary = await Secretary.create(req.body);
    res.status(201).json({
      message: "Secretary created successfully.",
      data: newSecretary,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all secretarys with pagination
const getAllSecretarys = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const secretarys = await Secretary.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Secretarys retrieved successfully.",
      data: secretarys,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get secretary by ID
const getSecretaryById = async (req, res) => {
  try {
    const secretary = await Secretary.findById(req.params.id);
    if (!secretary) {
      return res.status(404).json({
        message: "Secretary not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Secretary retrieved successfully.",
      data: secretary,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update secretary by ID
const updateSecretaryById = async (req, res) => {
  try {
    const updatedSecretary = await Secretary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSecretary) {
      return res.status(404).json({
        message: "Secretary not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Secretary updated successfully.",
      data: updatedSecretary,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete secretary by ID
const deleteSecretaryById = async (req, res) => {
  try {
    const deletedSecretary = await Secretary.findByIdAndDelete(req.params.id);
    if (!deletedSecretary) {
      return res.status(404).json({
        message: "Secretary not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Secretary deleted successfully.",
      data: deletedSecretary,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createSecretary,
  getAllSecretarys,
  getSecretaryById,
  updateSecretaryById,
  deleteSecretaryById,
};
