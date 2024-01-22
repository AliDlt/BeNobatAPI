const Expertise = require("../Models/expertiseModel");

// Create a new expertise
const createExpertise = async (req, res) => {
  try {
    const newExpertise = await Expertise.create(req.body);
    res.status(201).json({
      message: "Expertise created successfully.",
      data: newExpertise,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all expertise
const getAllExpertise = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const expertiseList = await Expertise.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Expertise retrieved successfully.",
      data: expertiseList,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get expertise by ID
const getExpertiseById = async (req, res) => {
  try {
    const expertise = await Expertise.findById(req.params.id);
    if (!expertise) {
      return res.status(404).json({
        message: "Expertise not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Expertise retrieved successfully.",
      data: expertise,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
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
      return res.status(404).json({
        message: "Expertise not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Expertise updated successfully.",
      data: updatedExpertise,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete expertise by ID
const deleteExpertiseById = async (req, res) => {
  try {
    const deletedExpertise = await Expertise.findByIdAndDelete(req.params.id);
    if (!deletedExpertise) {
      return res.status(404).json({
        message: "Expertise not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Expertise deleted successfully.",
      data: deletedExpertise,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createExpertise,
  getAllExpertise,
  getExpertiseById,
  updateExpertiseById,
  deleteExpertiseById,
};
