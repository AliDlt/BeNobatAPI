const Appointment = require("../Models/appointmentModel");

const {
  handleBadRequest,
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../Utils/handlers");

const createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    handleSuccess(res, "Appointment created successfully.", newAppointment);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const appointments = await Appointment.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    handleSuccess(res, "Appointments retrieved successfully.", appointments);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllAppointmentsByExpertId = async (req, res) => {
  try {
    const { expertId, page = 1, limit = 10 } = req.query;

    if (!expertId) {
      return handleBadRequest(res, "Expert ID is required.");
    }

    const appointments = await Appointment.find({ expert: expertId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "Appointments retrieved successfully.", appointments);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Appointment retrieved successfully.", appointment);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllAppointmentsByUserId = async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;

    if (!userId) {
      return handleBadRequest(res, "User ID is required.");
    }

    const appointments = await Appointment.find({ user: userId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "Appointments retrieved successfully.", appointments);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateAppointmentById = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Appointment updated successfully.", updatedAppointment);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteAppointmentById = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return handleNotFound(res);
    }
    handleSuccess(res, "Appointment deleted successfully.", deletedAppointment);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAllAppointmentsByExpertId,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
  getAllAppointmentsByUserId,
};
