const Service = require("../Models/serviceModel");
const Expert = require("../Models/expertModel");

// Create a new service
const createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json({
      message: "Service created successfully.",
      data: newService,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const services = await Service.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Services retrieved successfully.",
      data: services,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all services by expert id
const getAllServicesByExpertId = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { id } = req.body;

    const services = await Expert.find(id)
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Services retrieved successfully.",
      data: services,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};
// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Service retrieved successfully.",
      data: service,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update service by ID
const updateServiceById = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Service updated successfully.",
      data: updatedService,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete service by ID
const deleteServiceById = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Service deleted successfully.",
      data: deletedService,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createService,
  getAllServices,
  getAllServicesByExpertId,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
