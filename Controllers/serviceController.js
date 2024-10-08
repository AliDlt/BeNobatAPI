const Service = require("../Models/serviceModel");
const Expert = require("../Models/expertModel");
const {
  handleNotFound,
  handleSuccess,
  handleServerError,
} = require("../Utils/handlers");

// Create a new service
const createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    handleSuccess(res, "سرویس با موفقیت افزوده شد.", newService);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const services = await Service.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "سرویس ها با موفقیت دریافت شدند.", services);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get all services by expert id
const getAllServicesByExpertId = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.body;

    const expert = await Expert.findById(id)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!expert) {
      return handleNotFound(res, "تخصص پیدا نشد.");
    }

    const services = expert.services; // Assuming Expert model has a 'services' field

    handleSuccess(res, "سرویس ها با موفقیت دریافت شدند.", services);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return handleNotFound(res, "سرویس پیدا نشد.");
    }
    handleSuccess(res, "سرویس ها با موفقیت دریافت شدند.", service);
  } catch (error) {
    handleServerError(res, error);
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
      return handleNotFound(res, "سرویس یافت نشد.");
    }
    handleSuccess(res, "سرویس با موفقیت بروزرسانی شد.", updatedService);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete service by ID
const deleteServiceById = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return handleNotFound(res, "سرویس پیدا نشد");
    }
    handleSuccess(res, "سرویس با موفقیت حذف شد.", deletedService);
  } catch (error) {
    handleServerError(res, error);
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
