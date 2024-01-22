const Expert = require("../../Models/expertModel");

// Create a new expert
const createExpert = async (req, res) => {
  try {
    const newExpert = await Expert.create(req.body);
    res.status(201).json({
      message: "Expert created successfully.",
      data: newExpert,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all experts with pagination
const getAllExperts = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const experts = await Expert.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Experts retrieved successfully.",
      data: experts,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get expert by ID
const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({
        message: "Expert not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Expert retrieved successfully.",
      data: expert,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update expert by ID
const updateExpertById = async (req, res) => {
  try {
    const updatedExpert = await Expert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpert) {
      return res.status(404).json({
        message: "Expert not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Expert updated successfully.",
      data: updatedExpert,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete expert by ID
const deleteExpertById = async (req, res) => {
  try {
    const deletedExpert = await Expert.findByIdAndDelete(req.params.id);
    if (!deletedExpert) {
      return res.status(404).json({
        message: "Expert not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Expert deleted successfully.",
      data: deletedExpert,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createExpert,
  getAllExperts,
  getExpertById,
  updateExpertById,
  deleteExpertById,
};
